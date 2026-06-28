-- Replacement / comp orders created by CoreLinq ("Resend order" from an escalation).
-- Idempotent (IF NOT EXISTS) so `prisma migrate deploy` self-heals a DB where the
-- columns were hot-fixed in by hand (see incident 2026-06-26: this migration
-- shipped without `migrate deploy` in the build, breaking order creation).
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "scheduledShipDate" TIMESTAMP(3);
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "replacementOfOrderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "sourceIdempotencyKey" TEXT;

-- Dedupe replacement creates (one order per idempotency key).
CREATE UNIQUE INDEX IF NOT EXISTS "Order_sourceIdempotencyKey_key" ON "Order"("sourceIdempotencyKey");

-- Fulfillment queue filters on the scheduled ship date.
CREATE INDEX IF NOT EXISTS "Order_scheduledShipDate_idx" ON "Order"("scheduledShipDate");
