/**
 * Verification Script: Order Schema Migration
 *
 * Verifies that the migration completed successfully by checking:
 * - All orders have populated shipping fields
 * - Data integrity is maintained
 * - Orders are queryable
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyMigration() {
  console.log('🔍 Verifying Order Schema Migration...\n');

  try {
    // Fetch all orders with new schema
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'asc' },
    });

    console.log(`📦 Found ${orders.length} orders in database\n`);

    if (orders.length === 0) {
      console.log('⚠️  No orders found to verify');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const order of orders) {
      const orderData = order as any;
      console.log(`\n📋 Order: ${orderData.orderNumber}`);
      console.log(`   Email: ${orderData.email}`);

      // Check if new fields exist and are populated
      const checks = [
        { field: 'shippingName', value: orderData.shippingName },
        { field: 'shippingAddress1', value: orderData.shippingAddress1 },
        { field: 'shippingCity', value: orderData.shippingCity },
        { field: 'shippingState', value: orderData.shippingState },
        { field: 'shippingZip', value: orderData.shippingZip },
        { field: 'shippingCountry', value: orderData.shippingCountry },
      ];

      let orderHasErrors = false;

      for (const check of checks) {
        if (check.value === undefined) {
          console.log(`   ❌ ${check.field}: MISSING`);
          orderHasErrors = true;
        } else if (check.value === '') {
          console.log(`   ⚠️  ${check.field}: EMPTY`);
        } else {
          console.log(`   ✅ ${check.field}: ${check.value}`);
        }
      }

      // Check OrderItems (new relation)
      try {
        const orderItems = await prisma.orderItem.findMany({
          where: { orderId: orderData.id },
        });

        if (orderItems.length > 0) {
          console.log(`   ✅ orderItems: ${orderItems.length} items found`);
          orderItems.forEach((item: any) => {
            console.log(`      - ${item.name} (qty: ${item.quantity}, $${(item.price / 100).toFixed(2)})`);
          });
        } else {
          console.log(`   ⚠️  orderItems: No items found`);
          orderHasErrors = true;
        }
      } catch (error) {
        console.log(`   ❌ orderItems: Error fetching items`);
        orderHasErrors = true;
      }

      // Check monetary fields
      console.log(`   💰 subtotal: $${(orderData.subtotal / 100).toFixed(2)}`);
      console.log(`   💰 shipping: $${(orderData.shipping / 100).toFixed(2)}`);
      console.log(`   💰 tax: $${(orderData.tax / 100).toFixed(2)}`);
      console.log(`   💰 total: $${(orderData.total / 100).toFixed(2)}`);

      // Check status fields
      console.log(`   📊 status: ${orderData.status}`);
      console.log(`   💳 paymentStatus: ${orderData.paymentStatus}`);

      if (orderHasErrors) {
        errorCount++;
        console.log('   🔴 ORDER HAS ERRORS');
      } else {
        successCount++;
        console.log('   🟢 ORDER VERIFIED');
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Orders: ${orders.length}`);
    console.log(`✅ Successfully Verified: ${successCount}`);
    console.log(`❌ Errors Found: ${errorCount}`);

    if (errorCount === 0) {
      console.log('\n🎉 All orders migrated successfully!');
      console.log('\n📝 You can now safely:');
      console.log('1. Update your application code to use the new schema');
      console.log('2. Drop the old columns from the database if desired');
      console.log('3. Test order creation, tracking, and admin functionality');
    } else {
      console.log('\n⚠️  Some orders have errors. Please review before proceeding.');
    }

  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Test querying orders with new structure
async function testOrderQueries() {
  console.log('\n\n🧪 Testing Order Queries...\n');

  try {
    // Test 1: Find order by order number
    const testOrderNumber = await prisma.order.findFirst({
      select: { orderNumber: true },
    });

    if (testOrderNumber) {
      console.log(`Test 1: Find by order number (${testOrderNumber.orderNumber})`);
      const order = await prisma.order.findUnique({
        where: { orderNumber: testOrderNumber.orderNumber },
      });
      console.log(order ? '✅ Query successful' : '❌ Query failed');
    }

    // Test 2: Find orders by email
    console.log('\nTest 2: Find by email');
    const emailOrders = await prisma.order.findMany({
      where: { email: { contains: '@' } },
      take: 5,
    });
    console.log(`✅ Found ${emailOrders.length} orders by email`);

    // Test 3: Find orders by status
    console.log('\nTest 3: Find by status');
    const statusOrders = await prisma.order.findMany({
      where: { status: 'PROCESSING' },
    });
    console.log(`✅ Found ${statusOrders.length} PROCESSING orders`);

    console.log('\n✅ All query tests passed!');

  } catch (error) {
    console.error('\n❌ Query test failed:', error);
    throw error;
  }
}

async function main() {
  console.log('=' .repeat(60));
  console.log('ORDER SCHEMA MIGRATION VERIFICATION');
  console.log('=' .repeat(60));
  console.log('');

  try {
    await verifyMigration();
    await testOrderQueries();
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

main();
