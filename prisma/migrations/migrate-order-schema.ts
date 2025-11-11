/**
 * Migration Script: Order Schema Migration
 *
 * Transforms Order schema from:
 * - customerName + shippingAddress (Json) + billingAddress (Json) + items (Json)
 * To:
 * - shippingName + individual address fields + items (OrderItem relation)
 *
 * IMPORTANT: Run this BEFORE updating the Prisma schema and running db push
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OldAddress {
  line1?: string;
  line2?: string | null;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface OldOrderItem {
  sku?: string;
  name: string;
  price: number;
  quantity: number;
}

interface OldOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  shippingAddress: OldAddress | Record<string, never>;
  billingAddress: OldAddress | Record<string, never>;
  items: OldOrderItem[];
}

async function migrateOrders() {
  console.log('🚀 Starting Order Schema Migration...\n');

  try {
    // Fetch all existing orders
    const orders = await prisma.order.findMany();
    console.log(`📦 Found ${orders.length} orders to migrate\n`);

    if (orders.length === 0) {
      console.log('✅ No orders to migrate. Exiting.');
      return;
    }

    // Create temporary backup table name
    const backupTableName = `Order_backup_${Date.now()}`;

    // Create backup of Order table (raw SQL)
    console.log(`💾 Creating backup table: ${backupTableName}...`);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "${backupTableName}" AS
      SELECT * FROM "Order"
    `);
    console.log('✅ Backup created\n');

    // Step 1: Add new columns to the Order table
    console.log('📝 Step 1: Adding new columns to Order table...');

    try {
      // Check if columns already exist
      const columnCheck = await prisma.$queryRawUnsafe<any[]>(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'Order' AND column_name = 'shippingName'
      `);

      if (columnCheck.length === 0) {
        // Add new columns
        await prisma.$executeRawUnsafe(`
          ALTER TABLE "Order"
          ADD COLUMN IF NOT EXISTS "shippingName" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingAddress1" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingAddress2" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingCity" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingState" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingZip" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingCountry" TEXT,
          ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT,
          ADD COLUMN IF NOT EXISTS "labelUrl" TEXT
        `);
        console.log('✅ New columns added\n');
      } else {
        console.log('✅ Columns already exist, skipping creation\n');
      }
    } catch (error) {
      console.error('Error adding columns:', error);
      throw error;
    }

    // Step 1.5: Create OrderItem table if it doesn't exist
    console.log('📝 Step 1.5: Creating OrderItem table if needed...');

    try {
      const tableCheck = await prisma.$queryRawUnsafe<any[]>(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'OrderItem'
      `);

      if (tableCheck.length === 0) {
        await prisma.$executeRawUnsafe(`
          CREATE TABLE "OrderItem" (
            "id" TEXT PRIMARY KEY,
            "orderId" TEXT NOT NULL,
            "sku" TEXT,
            "name" TEXT NOT NULL,
            "price" INTEGER NOT NULL,
            "quantity" INTEGER NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId")
              REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE
          )
        `);

        await prisma.$executeRawUnsafe(`
          CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId")
        `);

        console.log('✅ OrderItem table created\n');
      } else {
        console.log('✅ OrderItem table already exists\n');
      }
    } catch (error) {
      console.error('Error creating OrderItem table:', error);
      throw error;
    }

    // Step 2: Process each order and populate new columns
    for (const order of orders as unknown as OldOrder[]) {
      console.log(`Processing order: ${order.orderNumber}`);

      // Determine which address to use (prefer shippingAddress, fallback to billingAddress)
      const hasShippingData = order.shippingAddress &&
        Object.keys(order.shippingAddress).length > 0;

      const addressSource: OldAddress = hasShippingData
        ? order.shippingAddress
        : order.billingAddress || {};

      // Extract address fields
      const shippingAddress1 = addressSource.line1 || '';
      const shippingAddress2 = addressSource.line2 || '';
      const shippingCity = addressSource.city || '';
      const shippingState = addressSource.state || '';
      const shippingZip = addressSource.postal_code || '';
      const shippingCountry = addressSource.country || 'US';

      // Transform customerName to shippingName
      const shippingName = order.customerName;

      // Prepare items data (will be stored as JSON temporarily)
      const items = order.items || [];

      console.log(`  - Name: ${shippingName}`);
      console.log(`  - Address: ${shippingAddress1}, ${shippingCity}, ${shippingState} ${shippingZip}`);
      console.log(`  - Items: ${items.length} items`);

      // Update the order with transformed data
      await prisma.$executeRaw`
        UPDATE "Order"
        SET
          "shippingName" = ${shippingName},
          "shippingAddress1" = ${shippingAddress1},
          "shippingAddress2" = ${shippingAddress2},
          "shippingCity" = ${shippingCity},
          "shippingState" = ${shippingState},
          "shippingZip" = ${shippingZip},
          "shippingCountry" = ${shippingCountry},
          "shippingPhone" = ''
        WHERE id = ${order.id}
      `;

      console.log(`✅ Order ${order.orderNumber} migrated\n`);
    }

    // Step 3: Migrate items to OrderItem table
    console.log('\n📝 Step 3: Migrating items to OrderItem table...');

    for (const order of orders as unknown as OldOrder[]) {
      const items = order.items || [];

      console.log(`Processing items for order: ${order.orderNumber} (${items.length} items)`);

      for (const item of items) {
        // Generate a unique ID for the OrderItem
        const itemId = `item_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

        await prisma.$executeRaw`
          INSERT INTO "OrderItem" (id, "orderId", sku, name, price, quantity, "createdAt", "updatedAt")
          VALUES (
            ${itemId},
            ${order.id},
            ${item.sku || ''},
            ${item.name},
            ${item.price},
            ${item.quantity},
            NOW(),
            NOW()
          )
        `;

        console.log(`  ✅ Added item: ${item.name} (qty: ${item.quantity})`);
      }

      console.log(`✅ Items migrated for order ${order.orderNumber}\n`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`\n📝 Summary:`);
    console.log(`   - Orders migrated: ${orders.length}`);
    console.log(`   - New columns added to Order table`);
    console.log(`   - OrderItem table created`);
    console.log(`   - Order items migrated to OrderItem table`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Drop old columns from Order table (customerName, shippingAddress, billingAddress, items)`);
    console.log(`2. Run: npx prisma generate (to update Prisma Client)`);
    console.log(`3. Run verification script: npx ts-node prisma/migrations/verify-migration.ts`);
    console.log(`4. Test your application`);
    console.log(`\n💡 Backup table created: ${backupTableName}`);
    console.log(`   To rollback: DROP TABLE "Order"; DROP TABLE "OrderItem"; ALTER TABLE "${backupTableName}" RENAME TO "Order";`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Create rollback script
async function createRollbackScript() {
  const rollbackScript = `-- Rollback script for Order schema migration
-- Run this if you need to restore the original schema

-- 1. Find your backup table
SELECT tablename FROM pg_tables WHERE tablename LIKE 'Order_backup_%';

-- 2. Replace <backup_table_name> with the actual backup table name from step 1
-- DROP TABLE "OrderItem";
-- DROP TABLE "Order";
-- ALTER TABLE "<backup_table_name>" RENAME TO "Order";

-- Note: This will restore the original Order table with customerName, shippingAddress, billingAddress, and items as JSON
`;

  const { writeFileSync } = await import('fs');
  const { join, dirname } = await import('path');
  const { fileURLToPath } = await import('url');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const rollbackPath = join(__dirname, 'rollback-order-migration.sql');
  writeFileSync(rollbackPath, rollbackScript);
  console.log(`\n📄 Rollback script created at: ${rollbackPath}`);
}

// Main execution
async function main() {
  console.log('=' .repeat(60));
  console.log('LONESTAR TORTILLAS - ORDER SCHEMA MIGRATION');
  console.log('=' .repeat(60));
  console.log('\n⚠️  WARNING: This will modify your database!');
  console.log('⚠️  A backup table will be created automatically.\n');

  try {
    await createRollbackScript();
    await migrateOrders();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
