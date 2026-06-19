-- Add Google Ads click identifiers to Order (all nullable — additive only,
-- pooler-safe, no table rewrite). Enables offline conversion import and
-- paid-vs-organic Google attribution.
ALTER TABLE "Order" ADD COLUMN "gclid" TEXT;
ALTER TABLE "Order" ADD COLUMN "gbraid" TEXT;
ALTER TABLE "Order" ADD COLUMN "wbraid" TEXT;
