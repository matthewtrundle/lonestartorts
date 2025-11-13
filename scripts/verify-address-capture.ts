/**
 * Address Capture Verification Script
 * Run this after placing test orders to confirm Customer and Address tables are being populated
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying address capture from orders...\n');

  try {
    // Get all orders with their related data
    const orders = await prisma.order.findMany({
      include: {
        OrderItem: true,
        Customer: {
          include: {
            Address: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Last 10 orders
    });

    console.log(`📦 Found ${orders.length} recent orders\n`);

    if (orders.length === 0) {
      console.log('⚠️  No orders found. Place a test order to verify address capture.\n');
      return;
    }

    // Analyze each order
    for (const order of orders) {
      console.log('─'.repeat(60));
      console.log(`\n📋 Order: ${order.orderNumber}`);
      console.log(`   Email: ${order.email}`);
      console.log(`   Date: ${order.createdAt.toLocaleString()}`);
      console.log(`   Status: ${order.status}`);
      console.log(`   Total: $${(order.total / 100).toFixed(2)}\n`);

      // Check shipping address in order
      console.log('📍 Shipping Address (from Order table):');
      console.log(`   ${order.shippingName}`);
      console.log(`   ${order.shippingAddress1}`);
      if (order.shippingAddress2) {
        console.log(`   ${order.shippingAddress2}`);
      }
      console.log(`   ${order.shippingCity}, ${order.shippingState} ${order.shippingZip}`);
      console.log(`   ${order.shippingCountry}`);
      if (order.shippingPhone) {
        console.log(`   Phone: ${order.shippingPhone}`);
      }

      // Check customer record
      if (order.customerId && order.Customer) {
        console.log(`\n👤 Customer Record: ${order.customerId}`);
        console.log(`   Clerk ID: ${order.Customer.clerkUserId}`);
        console.log(`   Name: ${order.Customer.firstName} ${order.Customer.lastName}`);
        console.log(`   Email: ${order.Customer.email}`);
        console.log(`   Source: ${order.Customer.signupSource}`);
        console.log(`   Created: ${order.Customer.createdAt.toLocaleString()}`);

        // Check addresses
        if (order.Customer.Address && order.Customer.Address.length > 0) {
          console.log(`\n🏠 Saved Addresses (${order.Customer.Address.length}):`);
          order.Customer.Address.forEach((addr, idx) => {
            console.log(`   Address ${idx + 1}:`);
            console.log(`     ${addr.firstName} ${addr.lastName}`);
            console.log(`     ${addr.street}`);
            if (addr.street2) console.log(`     ${addr.street2}`);
            console.log(`     ${addr.city}, ${addr.state} ${addr.zip}`);
            console.log(`     ${addr.country}`);
            if (addr.phone) console.log(`     Phone: ${addr.phone}`);
            console.log(`     Type: ${addr.type} | Default: ${addr.isDefault ? 'Yes' : 'No'}`);
          });
          console.log(`   ✅ Address capture WORKING`);
        } else {
          console.log(`\n   ⚠️  No addresses saved for this customer`);
        }
      } else {
        console.log(`\n   ⚠️  No customer record linked (customerId: ${order.customerId})`);
      }

      console.log('\n' + '─'.repeat(60) + '\n');
    }

    // Summary statistics
    console.log('\n📊 Summary Statistics:\n');

    const totalCustomers = await prisma.customer.count();
    const totalAddresses = await prisma.address.count();
    const ordersWithCustomer = orders.filter(o => o.customerId).length;
    const ordersWithAddresses = orders.filter(o => o.Customer?.Address && o.Customer.Address.length > 0).length;

    console.log(`   Total Orders: ${orders.length}`);
    console.log(`   Orders with Customer: ${ordersWithCustomer}/${orders.length}`);
    console.log(`   Orders with Address: ${ordersWithAddresses}/${orders.length}`);
    console.log(`   Total Customers: ${totalCustomers}`);
    console.log(`   Total Addresses: ${totalAddresses}\n`);

    // Verdict
    if (ordersWithCustomer === orders.length && ordersWithAddresses === orders.length) {
      console.log('✅ ADDRESS CAPTURE WORKING PERFECTLY!\n');
    } else if (ordersWithCustomer > 0) {
      console.log('⚠️  ADDRESS CAPTURE PARTIALLY WORKING - Some orders missing customer or address records\n');
    } else {
      console.log('❌ ADDRESS CAPTURE NOT WORKING - No customer records being created\n');
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
