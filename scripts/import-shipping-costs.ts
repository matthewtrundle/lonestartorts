import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';

const prisma = new PrismaClient();

const TYPO_CORRECTIONS: Record<string, string> = {
  'Desiree Phew': 'Desiree Plew',
};

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

function namesMatch(xlsxName: string, orderName: string): boolean {
  const a = normalizeName(xlsxName);
  const b = normalizeName(orderName);

  // Exact match
  if (a === b) return true;

  // Partial match: last names match and 2+ name parts overlap
  const aParts = a.split(' ');
  const bParts = b.split(' ');

  if (aParts.length === 0 || bParts.length === 0) return false;

  const aLast = aParts[aParts.length - 1];
  const bLast = bParts[bParts.length - 1];

  if (aLast !== bLast) return false;

  const overlap = aParts.filter(p => bParts.includes(p));
  return overlap.length >= 2;
}

interface LabelRow {
  name: string;
  costCents: number;
  date: Date;
}

async function main() {
  const xlsxPath = path.resolve('/Users/matthewrundle/Downloads/Transactions.xlsx');
  const workbook = XLSX.readFile(xlsxPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

  // Filter to Label rows and extract data
  const labels: LabelRow[] = [];
  for (const row of rows) {
    if (row['Type'] !== 'Label') continue;

    const desc = String(row['Description'] || '');
    const match = desc.match(/^(.+?):\s*\d+\s*Label/);
    if (!match) {
      console.log(`  [skip] Could not parse description: "${desc}"`);
      continue;
    }

    let name = match[1].trim();
    if (TYPO_CORRECTIONS[name]) {
      console.log(`  [typo] "${name}" -> "${TYPO_CORRECTIONS[name]}"`);
      name = TYPO_CORRECTIONS[name];
    }

    const total = parseFloat(row['Total']);
    if (isNaN(total)) {
      console.log(`  [skip] Invalid total for "${name}": ${row['Total']}`);
      continue;
    }
    const costCents = Math.round(Math.abs(total) * 100);

    // Parse date - remove CDT/CST suffix
    let dateStr = String(row['Date'] || '').replace(/\s*(CDT|CST)$/i, '').trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.log(`  [skip] Invalid date for "${name}": ${row['Date']}`);
      continue;
    }

    labels.push({ name, costCents, date });
  }

  console.log(`\nFound ${labels.length} label rows in XLSX\n`);

  // Load all non-cancelled orders
  const orders = await prisma.order.findMany({
    where: {
      status: { notIn: ['CANCELLED', 'REFUNDED'] },
    },
    select: {
      id: true,
      shippingName: true,
      createdAt: true,
      shippingCost: true,
      orderNumber: true,
    },
  });

  console.log(`Loaded ${orders.length} orders from DB\n`);

  const usedOrderIds = new Set<string>();
  let matchedCount = 0;
  let skippedCount = 0;
  const unmatched: string[] = [];

  for (const label of labels) {
    // Find matching orders by name
    const candidates = orders.filter(o => {
      if (!o.shippingName) return false;
      return namesMatch(label.name, o.shippingName);
    });

    // Remove already-used orders
    const available = candidates.filter(o => !usedOrderIds.has(o.id));

    if (available.length === 0) {
      unmatched.push(label.name);
      continue;
    }

    // Pick closest by date
    available.sort((a, b) => {
      const diffA = Math.abs(a.createdAt.getTime() - label.date.getTime());
      const diffB = Math.abs(b.createdAt.getTime() - label.date.getTime());
      return diffA - diffB;
    });

    const best = available[0];

    // Skip if already has shipping cost
    if (best.shippingCost && best.shippingCost > 0) {
      console.log(`  [skip] Order ${best.orderNumber} (${best.shippingName}) already has shippingCost=${best.shippingCost}`);
      skippedCount++;
      usedOrderIds.add(best.id);
      continue;
    }

    await prisma.order.update({
      where: { id: best.id },
      data: { shippingCost: label.costCents },
    });

    console.log(`  [match] "${label.name}" -> Order ${best.orderNumber} | $${(label.costCents / 100).toFixed(2)}`);
    usedOrderIds.add(best.id);
    matchedCount++;
  }

  console.log(`\n--- Results ---`);
  console.log(`Matched: ${matchedCount}`);
  console.log(`Skipped (already had cost): ${skippedCount}`);
  console.log(`Unmatched: ${unmatched.length}`);
  if (unmatched.length > 0) {
    console.log(`Unmatched names:`);
    for (const name of unmatched) {
      console.log(`  - ${name}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
