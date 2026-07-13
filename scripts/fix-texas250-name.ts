/**
 * Shorten TEXAS250 display name.
 *
 * Checkout builds a Stripe coupon named "<name> - TEXAS250"; Stripe caps
 * coupon names at 40 chars and the original name pushed it to 42, which
 * made session creation fail. "250th Second Chance - TEXAS250" = 30 chars.
 *
 * Usage: npx tsx scripts/fix-texas250-name.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.discountCode.update({
    where: { code: 'TEXAS250' },
    data: { name: '250th Second Chance' },
  });
  console.log(`✅ Renamed to "${updated.name}" (coupon label: "${updated.name} - TEXAS250", ${(updated.name + ' - TEXAS250').length} chars)`);
}

main()
  .catch((e) => {
    console.error('❌ Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
