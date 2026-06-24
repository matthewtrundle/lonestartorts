-- Replacement / comp orders created by CoreLinq ("Resend order" from an escalation).
ALTER TABLE "Order" ADD COLUMN     "scheduledShipDate" TIMESTAMP(3);
ALTER TABLE "Order" ADD COLUMN     "replacementOfOrderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN     "sourceIdempotencyKey" TEXT;

-- Dedupe replacement creates (one order per idempotency key).
CREATE UNIQUE INDEX "Order_sourceIdempotencyKey_key" ON "Order"("sourceIdempotencyKey");

-- Fulfillment queue filters on the scheduled ship date.
CREATE INDEX "Order_scheduledShipDate_idx" ON "Order"("scheduledShipDate");
