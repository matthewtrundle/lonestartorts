/**
 * Verification Script - Confirm Database is Ready for Production
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying database is ready for production...\n');

  try {
    // Check all tables
    const counts = {
      // Should be ZERO (deleted)
      orders: await prisma.order.count(),
      orderItems: await prisma.orderItem.count(),
      customers: await prisma.customer.count(),
      addresses: await prisma.address.count(),

      // Should be PRESERVED
      waitlistEntries: await prisma.waitlistEntry.count(),
      users: await prisma.user.count(),
      sessions: await prisma.session.count(),
      notes: await prisma.note.count(),
      emailLogs: await prisma.emailLog.count(),
    };

    console.log('📊 Current Database State:\n');
    console.log('🗑️  DELETED (should be 0):');
    console.log(`   Orders:      ${counts.orders}`);
    console.log(`   OrderItems:  ${counts.orderItems}`);
    console.log(`   Customers:   ${counts.customers}`);
    console.log(`   Addresses:   ${counts.addresses}\n`);

    console.log('✅ PRESERVED (may have data):');
    console.log(`   Waitlist:    ${counts.waitlistEntries}`);
    console.log(`   Users:       ${counts.users}`);
    console.log(`   Sessions:    ${counts.sessions}`);
    console.log(`   Notes:       ${counts.notes}`);
    console.log(`   EmailLogs:   ${counts.emailLogs}\n`);

    // Verification
    const isClean = counts.orders === 0 &&
                    counts.orderItems === 0 &&
                    counts.customers === 0 &&
                    counts.addresses === 0;

    if (isClean) {
      console.log('✅ SUCCESS: Database is clean and ready for production!');
      console.log('🚀 You can now start accepting real orders.\n');

      // Check if we have admin user
      if (counts.users === 0) {
        console.log('⚠️  WARNING: No admin users found! You may need to create one to access the admin panel.\n');
      } else {
        console.log(`✓ ${counts.users} admin user(s) configured`);
      }

      if (counts.sessions > 0) {
        console.log(`✓ ${counts.sessions} active session(s) - you'll stay logged in\n`);
      }

    } else {
      console.error('❌ FAILED: Database still contains test data!');
      console.error('   Please run cleanup script again.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
