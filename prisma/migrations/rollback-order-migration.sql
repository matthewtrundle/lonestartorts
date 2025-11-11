-- Rollback script for Order schema migration
-- Run this if you need to restore the original schema

-- 1. Find your backup table
SELECT tablename FROM pg_tables WHERE tablename LIKE 'Order_backup_%';

-- 2. Replace <backup_table_name> with the actual backup table name from step 1
-- DROP TABLE "OrderItem";
-- DROP TABLE "Order";
-- ALTER TABLE "<backup_table_name>" RENAME TO "Order";

-- Note: This will restore the original Order table with customerName, shippingAddress, billingAddress, and items as JSON
