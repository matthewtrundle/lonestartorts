-- AlterTable
ALTER TABLE "Order" ADD COLUMN "shippedEmailSentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WholesaleOrder" ADD COLUMN "shippedEmailSentAt" TIMESTAMP(3);

-- Backfill: assume all already-shipped orders DID receive their email historically.
-- This prevents them from appearing in the new "missed notifications" admin view.
-- The backfill script for the 2026-04-14 incident will explicitly set this timestamp
-- after sending its apology emails, so affected orders will be covered correctly.
UPDATE "Order"
SET "shippedEmailSentAt" = "shippedAt"
WHERE "status" IN ('SHIPPED', 'DELIVERED')
  AND "shippedAt" IS NOT NULL
  AND "shippedAt" < '2026-04-13';

UPDATE "WholesaleOrder"
SET "shippedEmailSentAt" = "shippedAt"
WHERE "orderStatus" IN ('SHIPPED', 'DELIVERED')
  AND "shippedAt" IS NOT NULL
  AND "shippedAt" < '2026-04-13';
