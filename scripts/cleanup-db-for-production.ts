/**
 * Database Cleanup Script for Go-Live
 *
 * This script deletes ALL test/development data to prepare for production launch.
 *
 * What gets deleted:
 * - ALL Order records (cascades to OrderItem automatically)
 * - ALL Customer records (cascades to Address automatically)
 *
 * What gets preserved:
 * - WaitlistEntry (pre-launch marketing list)
 * - User (admin accounts)
 * - Session (admin sessions - stay logged in)
 * - Note (admin comments)
 * - EmailLog (compliance records)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting database cleanup for production launch...\n');

  try {
    // Step 1: Count existing records before deletion
    console.log('📊 Current database state:');
    const orderCount = await prisma.order.count();
    const orderItemCount = await prisma.orderItem.count();
    const customerCount = await prisma.customer.count();
    const addressCount = await prisma.address.count();

    console.log(`   Orders: ${orderCount}`);
    console.log(`   OrderItems: ${orderItemCount}`);
    console.log(`   Customers: ${customerCount}`);
    console.log(`   Addresses: ${addressCount}\n`);

    if (orderCount === 0 && customerCount === 0) {
      console.log('✅ Database is already clean! No data to delete.\n');
      return;
    }

    // Step 2: Delete all orders (cascades to OrderItem)
    console.log('🗑️  Deleting all orders...');
    const deletedOrders = await prisma.order.deleteMany({});
    console.log(`   ✓ Deleted ${deletedOrders.count} orders\n`);

    // Step 3: Delete all customers (cascades to Address)
    console.log('🗑️  Deleting all customers...');
    const deletedCustomers = await prisma.customer.deleteMany({});
    console.log(`   ✓ Deleted ${deletedCustomers.count} customers\n`);

    // Step 4: Verify deletion
    console.log('🔍 Verifying deletion...');
    const finalOrderCount = await prisma.order.count();
    const finalOrderItemCount = await prisma.orderItem.count();
    const finalCustomerCount = await prisma.customer.count();
    const finalAddressCount = await prisma.address.count();

    console.log(`   Orders: ${finalOrderCount}`);
    console.log(`   OrderItems: ${finalOrderItemCount}`);
    console.log(`   Customers: ${finalCustomerCount}`);
    console.log(`   Addresses: ${finalAddressCount}\n`);

    if (finalOrderCount === 0 && finalCustomerCount === 0 && finalOrderItemCount === 0 && finalAddressCount === 0) {
      console.log('✅ Database cleanup completed successfully!\n');
      console.log('📝 Preserved data:');
      const waitlistCount = await prisma.waitlistEntry.count();
      const userCount = await prisma.user.count();
      const noteCount = await prisma.note.count();
      const emailLogCount = await prisma.emailLog.count();

      console.log(`   WaitlistEntry: ${waitlistCount}`);
      console.log(`   User: ${userCount}`);
      console.log(`   Note: ${noteCount}`);
      console.log(`   EmailLog: ${emailLogCount}\n`);

      console.log('🚀 Your database is now ready for production!');
    } else {
      console.error('❌ Cleanup verification failed! Some records may still exist.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
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
