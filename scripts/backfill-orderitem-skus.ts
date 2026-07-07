/**
 * One-time backfill: give existing OrderItem rows their canonical catalog SKU.
 *
 * Background: retail checkout orders were saved with an empty SKU because the
 * webhook read the SKU from the Stripe *price* metadata while checkout wrote it
 * to the *product* metadata. Subscription orders were unaffected (they carry the
 * SKU directly). Empty SKUs made the fulfillment buy-list split one product into
 * multiple rows (e.g. butter tortillas showing as "15" and "5"). The webhook is
 * now fixed for new orders; this cleans up the historical rows.
 *
 * Strategy: only touch rows whose SKU is empty/null. Resolve the catalog product
 * by exact name and write its SKU. Never overwrites a non-empty SKU, so valid
 * retail and wholesale SKUs are left alone.
 *
 * Usage:
 *   npx tsx scripts/backfill-orderitem-skus.ts           # dry run (no writes)
 *   npx tsx scripts/backfill-orderitem-skus.ts --commit   # apply updates
 */
import { PrismaClient } from '@prisma/client';
import { products } from '../lib/products';

const prisma = new PrismaClient();

const COMMIT = process.argv.includes('--commit');

// Exact-name → canonical SKU lookup from the catalog.
const skuByName = new Map<string, string>();
for (const p of products) {
  skuByName.set(p.name, p.sku);
}

async function main() {
  // Rows with no usable SKU. Excludes the synthetic SHIPPING line just in case.
  const blanks = await prisma.orderItem.findMany({
    where: {
      OR: [{ sku: null }, { sku: '' }],
      NOT: { name: { contains: 'Sales Tax' } },
    },
    select: { id: true, name: true, sku: true },
  });

  console.log(`Found ${blanks.length} order item(s) with a blank SKU.\n`);

  let updated = 0;
  const unmatched = new Map<string, number>();

  for (const item of blanks) {
    if (item.name === 'SHIPPING') continue;
    const canonical = skuByName.get(item.name);
    if (!canonical) {
      unmatched.set(item.name, (unmatched.get(item.name) || 0) + 1);
      continue;
    }
    if (COMMIT) {
      await prisma.orderItem.update({
        where: { id: item.id },
        data: { sku: canonical },
      });
    }
    updated++;
  }

  console.log(`${COMMIT ? 'Updated' : 'Would update'} ${updated} order item(s).`);

  if (unmatched.size > 0) {
    console.log(`\nSkipped — no exact catalog name match (${unmatched.size} distinct name(s)):`);
    for (const [name, count] of [...unmatched.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${count}×  "${name}"`);
    }
  }

  if (!COMMIT) {
    console.log('\nDry run only. Re-run with --commit to apply.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
