/**
 * Backfill Shipping Notifications — 2026-04-14 Tuesday shipment
 *
 * 11 customers shipped 4/14/26 via UPS (Pirate Ship batch) but never received
 * shipping notification emails. This is the 2nd incident in 3 weeks; the first
 * was handled by scripts/shipping-apology.ts on 3/31.
 *
 * For each affected customer this script:
 *   1. Looks up their order in the DB by email (within 4/13 – 4/20 window).
 *   2. Updates the order to SHIPPED (or DELIVERED if UPS confirmed delivery), sets tracking.
 *   3. Creates a $10 SORRY-[LASTNAME] discount code (90-day expiry, single-use).
 *   4. Sends the shipping apology email with tracking + coupon.
 *   5. Sets shippedEmailSentAt so the new "missed notifications" dashboard shows 0.
 *
 * Idempotent: customers with shippedEmailSentAt already set are skipped.
 *
 * Usage:
 *   DRY_RUN=true npx tsx scripts/backfill-shipping-notifications-2026-04-14.ts
 *   TEST_EMAIL=matthewtrundle@gmail.com npx tsx scripts/backfill-shipping-notifications-2026-04-14.ts
 *   CONFIRM=true npx tsx scripts/backfill-shipping-notifications-2026-04-14.ts
 *
 * The CONFIRM=true gate prevents accidental live sends — DRY_RUN is not enough.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import { sendShippingApologyEmail } from '../lib/email';
import { createApologyCoupon } from '../lib/apology-coupon';

// Load .env.local (Next.js convention) since we're running outside of Next
function loadEnv() {
  for (const envFile of ['.env.local', '.env']) {
    try {
      const envPath = resolve(__dirname, '..', envFile);
      const content = readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    } catch {
      // File doesn't exist, skip
    }
  }
}
loadEnv();

const prisma = new PrismaClient();

const DRY_RUN = process.env.DRY_RUN === 'true';
const TEST_EMAIL = process.env.TEST_EMAIL || null;
const CONFIRM = process.env.CONFIRM === 'true';
const LIVE = !DRY_RUN && !TEST_EMAIL && CONFIRM;

interface AffectedCustomer {
  customerName: string;
  email: string;
  trackingNumber: string;
  trackingStatus: 'DELIVERED' | 'IN_TRANSIT';
  deliveredDate: string | null; // Human-readable for the email; null if still in transit
}

// Source: Pirate Ship export for 4/14/26 batch (UPS Ground)
const AFFECTED_CUSTOMERS: AffectedCustomer[] = [
  { customerName: 'Adam Foster',       email: 'adam_d_foster@yahoo.com',     trackingNumber: '1Z106BD40335180437', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Christina Lei',     email: 'lei.christina@gmail.com',     trackingNumber: '1Z106BD40335021242', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Dana Battaglia',    email: 'boltndame22@gmail.com',       trackingNumber: '1Z106BD40308992441', trackingStatus: 'IN_TRANSIT', deliveredDate: null },
  { customerName: 'James D Burgess',   email: 'jdburgess99@gmail.com',       trackingNumber: '1Z106BD40320646079', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Maddison Gruenig',  email: 'mbe12sam@yahoo.com',          trackingNumber: '1Z106BD40316920459', trackingStatus: 'DELIVERED',  deliveredDate: 'April 16, 2026' },
  { customerName: 'Melissa MacDonald', email: 'melissa@mmacdonald.net',      trackingNumber: '1Z106BD40305184427', trackingStatus: 'IN_TRANSIT', deliveredDate: null },
  { customerName: 'Karen Carpenter',   email: 'kcarpenter@epm1.net',         trackingNumber: '1Z106BD40325628455', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Jacob Kleinbaum',   email: 'jake.kleinbaum@gmail.com',    trackingNumber: '1Z106BD40330618063', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Gerry Henderson',   email: 'gerry.henderson2@gmail.com',  trackingNumber: '1Z106BD40331008489', trackingStatus: 'DELIVERED',  deliveredDate: 'April 20, 2026' },
  { customerName: 'Jennifer Roossien', email: 'jenroossien512@gmail.com',    trackingNumber: '1Z106BD40323241296', trackingStatus: 'DELIVERED',  deliveredDate: 'April 17, 2026' },
  { customerName: 'Caroline Heitmann', email: 'caroline.heitmann1@gmail.com', trackingNumber: '1Z106BD40300280439', trackingStatus: 'DELIVERED',  deliveredDate: 'April 16, 2026' },
];

const SHIPPED_AT = new Date('2026-04-14T17:13:00Z'); // 12:13 PM CDT = 17:13 UTC

/**
 * Find the order for a customer. Matches by email, shippedAt within the 4/14 window,
 * falling back to most recent non-CANCELLED order by email if no window match.
 */
async function findOrder(customer: AffectedCustomer) {
  const email = customer.email.toLowerCase().trim();

  // Prefer orders where shippedAt is in the 4/13 – 4/20 window
  const windowed = await prisma.order.findMany({
    where: {
      email: { equals: email, mode: 'insensitive' },
      shippedAt: {
        gte: new Date('2026-04-13T00:00:00Z'),
        lte: new Date('2026-04-21T00:00:00Z'),
      },
      paymentStatus: 'SUCCEEDED',
    },
    orderBy: { createdAt: 'desc' },
    take: 1,
  });
  if (windowed.length > 0) return windowed[0];

  // Fallback: most recent paid, non-cancelled order by email
  const recent = await prisma.order.findMany({
    where: {
      email: { equals: email, mode: 'insensitive' },
      paymentStatus: 'SUCCEEDED',
      status: { not: 'CANCELLED' },
    },
    orderBy: { createdAt: 'desc' },
    take: 1,
  });
  return recent[0] ?? null;
}

async function updateOrderShipping(
  orderId: string,
  customer: AffectedCustomer
): Promise<void> {
  if (DRY_RUN) {
    console.log(
      `  [DRY RUN] Would update order ${orderId} → ${
        customer.trackingStatus === 'DELIVERED' ? 'DELIVERED' : 'SHIPPED'
      }, tracking ${customer.trackingNumber}`
    );
    return;
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return;

  const newStatus = customer.trackingStatus === 'DELIVERED' ? 'DELIVERED' : 'SHIPPED';

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: newStatus,
      trackingNumber: customer.trackingNumber,
      carrier: 'UPS',
      shippedAt: order.shippedAt ?? SHIPPED_AT,
      deliveredAt:
        customer.deliveredDate && !order.deliveredAt
          ? new Date(customer.deliveredDate)
          : order.deliveredAt,
    },
  });
}

async function markEmailSent(orderId: string): Promise<void> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would set shippedEmailSentAt for order ${orderId}`);
    return;
  }
  await prisma.order.update({
    where: { id: orderId },
    data: { shippedEmailSentAt: new Date() },
  });
}

async function main() {
  console.log('='.repeat(70));
  console.log('Backfill Shipping Notifications — 2026-04-14 shipment');
  console.log(
    `Mode: ${DRY_RUN ? 'DRY RUN' : TEST_EMAIL ? `TEST (→ ${TEST_EMAIL})` : LIVE ? 'LIVE' : 'GATED (set CONFIRM=true to send)'}`
  );
  console.log(`Customers: ${AFFECTED_CUSTOMERS.length}`);
  console.log('='.repeat(70));

  if (!DRY_RUN && !TEST_EMAIL && !CONFIRM) {
    console.log(
      '\nRefusing to send live. Re-run with DRY_RUN=true, TEST_EMAIL=<you>, or CONFIRM=true.'
    );
    await prisma.$disconnect();
    process.exit(1);
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  const notFound: string[] = [];

  for (const customer of AFFECTED_CUSTOMERS) {
    console.log(`\n${customer.customerName} <${customer.email}>`);

    try {
      const order = await findOrder(customer);
      if (!order) {
        console.error(`  NOT FOUND in DB — skipping`);
        notFound.push(`${customer.customerName} <${customer.email}>`);
        failed++;
        continue;
      }

      console.log(
        `  Matched order ${order.orderNumber} (status=${order.status}, shippedAt=${order.shippedAt?.toISOString() ?? 'null'})`
      );

      // Idempotency: skip if notification already recorded
      if (order.shippedEmailSentAt) {
        console.log(
          `  shippedEmailSentAt already set (${order.shippedEmailSentAt.toISOString()}) — skipping`
        );
        skipped++;
        continue;
      }

      // 1. Bring order DB state into alignment with UPS reality
      await updateOrderShipping(order.id, customer);

      // 2. Create $10 apology coupon
      const couponCode = await createApologyCoupon(prisma, {
        customerName: customer.customerName,
        orderNumber: order.orderNumber,
        dryRun: DRY_RUN,
      });

      // 3. Send the apology email
      const emailTo = TEST_EMAIL || customer.email;
      const deliveredDateForEmail =
        customer.deliveredDate ?? 'your package is still in transit — track it below';

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would send apology email to ${customer.email}`);
        console.log(`    coupon=${couponCode} tracking=${customer.trackingNumber}`);
        sent++;
        continue;
      }

      const result = await sendShippingApologyEmail({
        to: emailTo,
        orderNumber: order.orderNumber,
        customerName: customer.customerName,
        trackingNumber: customer.trackingNumber,
        carrier: 'UPS',
        deliveredDate: deliveredDateForEmail,
        couponCode,
      });

      if (!result.success) {
        console.error(`  FAILED to send email: ${result.error}`);
        failed++;
        continue;
      }

      console.log(`  Sent apology email to ${emailTo}`);

      // 4. Record that the notification went out (only when sending to the real customer,
      //    not when testing against TEST_EMAIL)
      if (!TEST_EMAIL) {
        await markEmailSent(order.id);
      }

      sent++;
    } catch (err) {
      console.error(`  ERROR:`, err);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`Sent: ${sent}   Skipped (already sent): ${skipped}   Failed: ${failed}`);
  if (notFound.length > 0) {
    console.log('\nCustomers NOT FOUND in DB (need manual review):');
    for (const n of notFound) console.log(`  - ${n}`);
  }
  console.log('='.repeat(70));

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('Fatal error:', err);
  await prisma.$disconnect();
  process.exit(1);
});
