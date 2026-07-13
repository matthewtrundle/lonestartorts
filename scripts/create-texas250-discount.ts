/**
 * Create TEXAS250 Discount Code
 *
 * America's 250th "second chance" win-back campaign (July 2026).
 * 15% off, one use per email, capped at $25, expires 2026-07-27 (end of day CT).
 *
 * Usage:
 *   npx tsx scripts/create-texas250-discount.ts
 *
 * Idempotent: exits if the code already exists.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CODE = 'TEXAS250';

async function main() {
  const existing = await prisma.discountCode.findUnique({
    where: { code: CODE },
    include: { rules: true },
  });

  if (existing) {
    console.log(`✅ ${CODE} already exists (id=${existing.id}, active=${existing.isActive}, expires=${existing.expiresAt?.toISOString()})`);
    return;
  }

  const discount = await prisma.discountCode.create({
    data: {
      code: CODE,
      name: "America's 250th — Second Chance",
      description: '15% off for past customers who missed the July 4th 250th celebration. One use per email.',
      source: 'ADMIN',
      isActive: true,
      startsAt: new Date(),
      // End of day July 27, 2026 Central (CDT = UTC-5)
      expiresAt: new Date('2026-07-28T04:59:59.000Z'),
      minOrderAmount: null,
      maxDiscountAmount: 2500, // cap total discount at $25
      maxUsageTotal: null,
      maxUsagePerEmail: 1,
      firstOrderOnly: false,
      stackable: false,
      priority: 10,
      createdBy: 'claude-250th-winback',
      rules: {
        create: [
          {
            type: 'PERCENTAGE',
            value: 15,
            maxDiscount: 2500,
            priority: 0,
          },
        ],
      },
    },
    include: { rules: true },
  });

  console.log(`✅ Created ${discount.code} (id=${discount.id})`);
  console.log(`   15% off, max $25, 1 use/email, expires ${discount.expiresAt?.toISOString()}`);
}

main()
  .catch((e) => {
    console.error('❌ Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
