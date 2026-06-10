/**
 * One-shot shipping cost import for Pirate Ship XLSX.
 *
 * Mirrors the logic in app/api/admin/analytics/import-shipping/route.ts so we
 * can run it from the CLI without an admin session cookie. After running and
 * verifying, delete this file.
 *
 * Usage:
 *   DRY_RUN=true npx tsx scripts/import-shipping-once.ts <path-to-xlsx>
 *   npx tsx scripts/import-shipping-once.ts <path-to-xlsx>
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

function loadEnv() {
  for (const envFile of ['.env.local', '.env']) {
    try {
      const envPath = resolve(__dirname, '..', envFile);
      const content = readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      /* file missing is fine */
    }
  }
}

loadEnv();

const NAME_CORRECTIONS: Record<string, string> = {
  'Desiree Phew': 'Desiree Plew',
};

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

function parseDateString(raw: string): Date {
  const cleaned = raw.replace(/\s+(CDT|CST)$/i, '').trim();
  return new Date(cleaned);
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: npx tsx scripts/import-shipping-once.ts <xlsx-path>');
    process.exit(1);
  }
  const dryRun = process.env.DRY_RUN === 'true';
  console.log(`Mode: ${dryRun ? 'DRY RUN (no writes)' : 'LIVE (will update Order.shippingCost)'}`);
  console.log(`File: ${filePath}\n`);

  const buffer = readFileSync(filePath);
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

  const labelNameRegex = /^(.+?):\s*\d+\s*Label/;
  const labelRows: { name: string; cost: number; date: Date; raw: string }[] = [];

  for (const row of rows) {
    const type = (row['Type'] || '').trim();
    if (type !== 'Label') continue;
    const description = row['Description'] || '';
    const match = description.match(labelNameRegex);
    if (!match) continue;
    let customerName = match[1].trim();
    if (NAME_CORRECTIONS[customerName]) {
      customerName = NAME_CORRECTIONS[customerName];
    }
    // Skip batch rows (e.g. "pirate-ship-2026-04-28")
    if (/pirate-ship|spreadsheet/i.test(customerName)) continue;
    const costStr = String(row['Total'] ?? '0').replace(/[^0-9.\-]/g, '');
    const costDollars = Math.abs(parseFloat(costStr) || 0);
    const costCents = Math.round(costDollars * 100);
    const dateStr = row['Date'] || '';
    const date = dateStr ? parseDateString(dateStr) : new Date();
    labelRows.push({ name: customerName, cost: costCents, date, raw: description });
  }

  console.log(`Per-customer label rows parsed: ${labelRows.length}\n`);

  const prisma = new PrismaClient();
  const orders = await prisma.order.findMany({
    select: { id: true, shippingName: true, shippingCost: true, createdAt: true },
  });

  const ordersByName = new Map<string, typeof orders>();
  for (const order of orders) {
    if (!order.shippingName) continue;
    const key = normalizeName(order.shippingName);
    if (!ordersByName.has(key)) ordersByName.set(key, []);
    ordersByName.get(key)!.push(order);
  }

  const usedOrderIds = new Set<string>();
  const updates: { id: string; cost: number; name: string }[] = [];
  const skippedAlreadySet: string[] = [];
  const unmatched: string[] = [];

  for (const label of labelRows) {
    const key = normalizeName(label.name);
    const candidates = ordersByName.get(key);
    if (!candidates || candidates.length === 0) {
      unmatched.push(label.name);
      continue;
    }
    const available = candidates.filter(
      (o) => !usedOrderIds.has(o.id) && (!o.shippingCost || o.shippingCost === 0)
    );
    if (available.length === 0) {
      skippedAlreadySet.push(label.name);
      continue;
    }
    const labelTime = label.date.getTime();
    available.sort(
      (a, b) =>
        Math.abs(a.createdAt.getTime() - labelTime) -
        Math.abs(b.createdAt.getTime() - labelTime)
    );
    const best = available[0];
    usedOrderIds.add(best.id);
    updates.push({ id: best.id, cost: label.cost, name: label.name });
  }

  console.log(`Will update:        ${updates.length}`);
  console.log(`Skipped (had cost): ${skippedAlreadySet.length}`);
  console.log(`Unmatched:          ${unmatched.length}`);
  if (unmatched.length) {
    console.log(`  Names: ${[...new Set(unmatched)].join(', ')}`);
  }
  console.log();

  if (dryRun) {
    console.log('DRY RUN — no writes performed.');
    await prisma.$disconnect();
    return;
  }

  console.log('Writing updates...');
  await prisma.$transaction(
    updates.map((u) =>
      prisma.order.update({
        where: { id: u.id },
        data: { shippingCost: u.cost },
      })
    )
  );
  console.log(`Done. ${updates.length} orders updated.`);

  // Sanity check
  const updated = await prisma.order.aggregate({
    where: { id: { in: updates.map((u) => u.id) } },
    _avg: { shippingCost: true },
    _min: { shippingCost: true },
    _max: { shippingCost: true },
  });
  console.log('\nSanity check on the orders we just wrote:');
  console.log(`  Avg shippingCost: $${((updated._avg.shippingCost || 0) / 100).toFixed(2)}`);
  console.log(`  Min: $${((updated._min.shippingCost || 0) / 100).toFixed(2)}`);
  console.log(`  Max: $${((updated._max.shippingCost || 0) / 100).toFixed(2)}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
