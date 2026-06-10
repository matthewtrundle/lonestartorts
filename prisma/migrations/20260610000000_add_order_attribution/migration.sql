-- Add first-touch attribution fields to Order (all nullable — additive only)
ALTER TABLE "Order" ADD COLUMN "landingPath" TEXT;
ALTER TABLE "Order" ADD COLUMN "referrer" TEXT;
ALTER TABLE "Order" ADD COLUMN "utmSource" TEXT;
ALTER TABLE "Order" ADD COLUMN "utmMedium" TEXT;
ALTER TABLE "Order" ADD COLUMN "utmCampaign" TEXT;
ALTER TABLE "Order" ADD COLUMN "firstVisitAt" TIMESTAMP(3);
