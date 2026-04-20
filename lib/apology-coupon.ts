/**
 * Shared helper for creating $10 apology discount codes.
 *
 * Used by:
 *   - scripts/shipping-apology.ts (original 3/31 incident backfill)
 *   - scripts/backfill-shipping-notifications-2026-04-14.ts (4/14 incident backfill)
 *   - app/api/admin/fulfillment/missed-notifications/[orderId]/send/route.ts
 *
 * Idempotent: re-running with the same customer returns the existing code.
 */

import type { PrismaClient } from '@prisma/client';

export function getLastNameUpper(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1].toUpperCase();
}

export interface ApologyCouponOptions {
  customerName: string;
  orderNumber: string;
  /** Defaults to $10 in cents. */
  amountCents?: number;
  /** Defaults to 90 days. */
  expiresInDays?: number;
  /** When true, only logs what would happen. */
  dryRun?: boolean;
}

/**
 * Create (or return existing) SORRY-[LASTNAME] discount code for a customer.
 */
export async function createApologyCoupon(
  prisma: PrismaClient,
  opts: ApologyCouponOptions
): Promise<string> {
  const {
    customerName,
    orderNumber,
    amountCents = 1000,
    expiresInDays = 90,
    dryRun = false,
  } = opts;
  const code = `SORRY-${getLastNameUpper(customerName)}`;

  if (dryRun) {
    console.log(
      `  [DRY RUN] Would create discount code: ${code} ($${(amountCents / 100).toFixed(
        2
      )} off, expires in ${expiresInDays} days)`
    );
    return code;
  }

  const existing = await prisma.discountCode.findFirst({
    where: { code: code.toUpperCase() },
  });
  if (existing) {
    console.log(`  Discount code ${code} already exists, skipping creation`);
    return code;
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  await prisma.discountCode.create({
    data: {
      code: code.toUpperCase(),
      name: `Shipping Apology - ${customerName}`,
      description: `$${(amountCents / 100).toFixed(
        2
      )} off apology for missed shipping notification on order ${orderNumber}`,
      source: 'SYSTEM',
      isActive: true,
      expiresAt,
      maxUsageTotal: 1,
      maxUsagePerEmail: 1,
      firstOrderOnly: false,
      stackable: false,
      priority: 0,
      rules: {
        create: [
          {
            type: 'FIXED_AMOUNT',
            value: amountCents,
            priority: 0,
          },
        ],
      },
    },
  });

  console.log(`  Created discount code: ${code}`);
  return code;
}
