/**
 * One-shot batch-proration for orders missing shippingCost.
 *
 * Source data: 6 batch label charges from Pirate Ship XLSX
 * (Transactions (1).xlsx, label rows where description starts with
 * "pirate-ship-..." or "Untitled spreadsheet"). Each batch has a known total
 * cost and a known label count, so per-label cost is real money.
 *
 * For each Order where shippingCost IS NULL AND shippedAt IS NOT NULL,
 * pick the batch whose date is the closest <= shippedAt and write that
 * batch's per-label cost into Order.shippingCost.
 *
 * Usage:
 *   DRY_RUN=true npx tsx scripts/prorate-batch-shipping-once.ts
 *   npx tsx scripts/prorate-batch-shipping-once.ts
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

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
      /* ok */
    }
  }
}
loadEnv();

// Batches sourced from Pirate Ship transaction history XLSX, label rows.
// dateStr is YYYY-MM-DD in America/Chicago (the batch charge date).
const BATCHES = [
  { dateStr: '2026-03-24', labels: 13, totalCents: 13819, perLabelCents: Math.round(13819 / 13) },
  { dateStr: '2026-03-31', labels: 10, totalCents: 11055, perLabelCents: Math.round(11055 / 10) },
  { dateStr: '2026-04-07', labels: 13, totalCents: 13909, perLabelCents: Math.round(13909 / 13) },
  { dateStr: '2026-04-14', labels: 11, totalCents: 13884, perLabelCents: Math.round(13884 / 11) },
  { dateStr: '2026-04-21', labels: 5,  totalCents: 5535,  perLabelCents: Math.round(5535 / 5) },
  { dateStr: '2026-04-28', labels: 10, totalCents: 15318, perLabelCents: Math.round(15318 / 10) },
];

function ctDateStr(d: Date): string {
  // The shippedAt column is `timestamp WITHOUT time zone`. The stored wall-clock
  // value represents Chicago local time (matches postgres behavior in the rest
  // of this codebase: `(ts AT TIME ZONE 'America/Chicago')::date`). Prisma
  // returns it as a JS Date interpreted as UTC, so we read the UTC components
  // to recover the original wall-clock date.
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function pickBatch(shippedAt: Date) {
  // Closest batch dateStr <= ship date (both in CT). Returns null if order
  // shipped before any batch existed (we won't impute those).
  const shipDateStr = ctDateStr(shippedAt);
  const eligible = BATCHES.filter((b) => b.dateStr <= shipDateStr);
  if (eligible.length === 0) return null;
  return eligible[eligible.length - 1];
}

async function main() {
  const dryRun = process.env.DRY_RUN === 'true';
  console.log(`Mode: ${dryRun ? 'DRY RUN (no writes)' : 'LIVE'}\n`);
  console.log('Batch per-label rates (cents):');
  for (const b of BATCHES) {
    console.log(
      `  ${b.dateStr}: $${(b.perLabelCents / 100).toFixed(2)}/label (${b.labels} labels, $${(b.totalCents / 100).toFixed(2)} total)`
    );
  }
  console.log();

  const prisma = new PrismaClient();

  const targets = await prisma.order.findMany({
    where: {
      paymentStatus: 'SUCCEEDED',
      shippingCost: null,
      shippedAt: { not: null },
    },
    select: { id: true, orderNumber: true, shippingName: true, shippedAt: true, createdAt: true },
    orderBy: { shippedAt: 'asc' },
  });

  console.log(`Eligible orders (shippingCost IS NULL, shippedAt IS NOT NULL): ${targets.length}\n`);

  const plan: { id: string; cost: number; orderNumber: string; shippedAt: Date; batchDate: string }[] = [];
  const skippedPreBatch: { orderNumber: string; shippedAt: Date }[] = [];
  let totalCents = 0;
  for (const o of targets) {
    if (!o.shippedAt) continue;
    const batch = pickBatch(o.shippedAt);
    if (!batch) {
      skippedPreBatch.push({ orderNumber: o.orderNumber, shippedAt: o.shippedAt });
      continue;
    }
    plan.push({
      id: o.id,
      cost: batch.perLabelCents,
      orderNumber: o.orderNumber,
      shippedAt: o.shippedAt,
      batchDate: batch.dateStr,
    });
    totalCents += batch.perLabelCents;
  }
  if (skippedPreBatch.length) {
    console.log(`Skipped (shipped before any batch): ${skippedPreBatch.length}`);
    for (const s of skippedPreBatch) {
      console.log(`  ${s.orderNumber} shipped ${ctDateStr(s.shippedAt)}`);
    }
    console.log();
  }

  console.log('Plan summary by batch:');
  const byBatch = new Map<string, { count: number; cents: number }>();
  for (const p of plan) {
    const e = byBatch.get(p.batchDate) ?? { count: 0, cents: 0 };
    e.count++;
    e.cents += p.cost;
    byBatch.set(p.batchDate, e);
  }
  for (const [d, e] of [...byBatch.entries()].sort()) {
    console.log(`  Batch ${d}: ${e.count} orders, $${(e.cents / 100).toFixed(2)} total`);
  }
  console.log(`\nTotal to write: $${(totalCents / 100).toFixed(2)} across ${plan.length} orders`);
  console.log(`Avg per order: $${(totalCents / plan.length / 100).toFixed(2)}\n`);

  if (dryRun) {
    console.log('DRY RUN — no writes performed.');
    await prisma.$disconnect();
    return;
  }

  console.log('Writing updates...');
  await prisma.$transaction(
    plan.map((p) =>
      prisma.order.update({
        where: { id: p.id },
        data: { shippingCost: p.cost },
      })
    )
  );
  console.log(`Done. ${plan.length} orders updated.\n`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
