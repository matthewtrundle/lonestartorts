/**
 * Shipping Apology Script
 *
 * Sends apology emails to 10 customers who never received shipping notifications
 * for orders shipped on 3/31. All orders are confirmed delivered.
 *
 * Usage:
 *   DRY_RUN=true npx tsx scripts/shipping-apology.ts          # Preview only
 *   TEST_EMAIL=matthewtrundle@gmail.com npx tsx scripts/shipping-apology.ts  # Send test to self
 *   npx tsx scripts/shipping-apology.ts                        # Send for real
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import { sendShippingApologyEmail } from '../lib/email';

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
        // Strip surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
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

interface AffectedCustomer {
  orderNumber: string;
  customerName: string;
  email: string;
  trackingNumber: string;
  deliveredDate: string;
}

const AFFECTED_CUSTOMERS: AffectedCustomer[] = [
  { orderNumber: 'LST-877229OF', customerName: 'Elizabeth Hursey', email: 'eahursey@gmail.com', trackingNumber: '1Z106BD40329321091', deliveredDate: 'April 2, 2026' },
  { orderNumber: 'LST-203433BJ', customerName: 'Alejandro Lara', email: 'sadarapsagrev@gmail.com', trackingNumber: '1Z106BD40311104322', deliveredDate: 'April 2, 2026' },
  { orderNumber: 'LST-599601PH', customerName: 'TauShaun Casasola', email: 'trinityfredericks4@gmail.com', trackingNumber: '1Z106BD40331712306', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-038423HO', customerName: 'Christian T Palmer', email: 'christianpalmer22@gmail.com', trackingNumber: '1Z106BD40302592349', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-529068F0', customerName: 'Maxwell Heiden', email: 'max@catalystios.com', trackingNumber: '1Z106BD40331804332', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-47457501', customerName: 'Alisha Benjamin', email: 'alishabenjamin0406@gmail.com', trackingNumber: '1Z106BD40316184317', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-49852305', customerName: 'Theresa Skrien', email: 'mackeyatc@gmail.com', trackingNumber: '1Z106BD40318040334', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-132329YV', customerName: 'Jenness Sposito', email: 'js456911@live.com', trackingNumber: '1Z106BD40337445915', deliveredDate: 'April 7, 2026' },
  { orderNumber: 'LST-836389KT', customerName: 'Janice K Plowman', email: 'aplowman9742@comcast.net', trackingNumber: '1Z106BD40339577921', deliveredDate: 'April 3, 2026' },
  { orderNumber: 'LST-377003J6', customerName: 'Cindy Dawn Hutzler', email: 'cynthiadawn@aol.com', trackingNumber: '1Z106BD40310360351', deliveredDate: 'April 3, 2026' },
];

function getLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1].toUpperCase();
}

async function createDiscountCode(customer: AffectedCustomer): Promise<string> {
  const code = `SORRY-${getLastName(customer.customerName)}`;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create discount code: ${code} ($10 off, expires ${expiresAt.toISOString().split('T')[0]})`);
    return code;
  }

  // Check if code already exists (idempotent re-runs)
  const existing = await prisma.discountCode.findFirst({ where: { code: code.toUpperCase() } });
  if (existing) {
    console.log(`  Discount code ${code} already exists, skipping creation`);
    return code;
  }

  await prisma.discountCode.create({
    data: {
      code: code.toUpperCase(),
      name: `Shipping Apology - ${customer.customerName}`,
      description: `$10 off apology for missed shipping notification on order ${customer.orderNumber}`,
      source: 'SYSTEM',
      isActive: true,
      expiresAt,
      maxUsageTotal: 1,
      maxUsagePerEmail: 1,
      firstOrderOnly: false,
      stackable: false,
      priority: 0,
      rules: {
        create: [{
          type: 'FIXED_AMOUNT',
          value: 1000, // $10 in cents
          priority: 0,
        }],
      },
    },
  });

  console.log(`  Created discount code: ${code}`);
  return code;
}

async function updateOrderToDelivered(customer: AffectedCustomer): Promise<void> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would update order ${customer.orderNumber} to DELIVERED with tracking ${customer.trackingNumber}`);
    return;
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber: customer.orderNumber },
  });

  if (!order) {
    console.error(`  WARNING: Order ${customer.orderNumber} not found in database!`);
    return;
  }

  if (order.status === 'DELIVERED') {
    console.log(`  Order ${customer.orderNumber} already DELIVERED, updating tracking info only`);
  }

  await prisma.order.update({
    where: { orderNumber: customer.orderNumber },
    data: {
      status: 'DELIVERED',
      trackingNumber: customer.trackingNumber,
      carrier: 'UPS',
      shippedAt: order.shippedAt || new Date('2026-03-31'),
      deliveredAt: order.deliveredAt || new Date(customer.deliveredDate),
    },
  });

  console.log(`  Updated order ${customer.orderNumber} to DELIVERED`);
}

async function main() {
  console.log('='.repeat(60));
  console.log('Shipping Apology Script');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : TEST_EMAIL ? `TEST (sending to ${TEST_EMAIL})` : 'LIVE'}`);
  console.log(`Customers: ${AFFECTED_CUSTOMERS.length}`);
  console.log('='.repeat(60));
  console.log('');

  let successes = 0;
  let failures = 0;

  for (const customer of AFFECTED_CUSTOMERS) {
    console.log(`\nProcessing: ${customer.customerName} (${customer.orderNumber})`);

    try {
      // Step 1: Create discount code
      const couponCode = await createDiscountCode(customer);

      // Step 2: Update order status
      await updateOrderToDelivered(customer);

      // Step 3: Send apology email
      const emailTo = TEST_EMAIL || customer.email;

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would send apology email to ${customer.email}`);
        console.log(`  [DRY RUN] Coupon: ${couponCode}, Tracking: ${customer.trackingNumber}`);
        successes++;
        continue;
      }

      const result = await sendShippingApologyEmail({
        to: emailTo,
        orderNumber: customer.orderNumber,
        customerName: customer.customerName,
        trackingNumber: customer.trackingNumber,
        carrier: 'UPS',
        deliveredDate: customer.deliveredDate,
        couponCode,
      });

      if (result.success) {
        console.log(`  Sent apology email to ${emailTo}`);
        successes++;
      } else {
        console.error(`  FAILED to send email to ${emailTo}:`, result.error);
        failures++;
      }
    } catch (error) {
      console.error(`  ERROR processing ${customer.customerName}:`, error);
      failures++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${successes} succeeded, ${failures} failed`);
  console.log('='.repeat(60));

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  prisma.$disconnect();
  process.exit(1);
});
