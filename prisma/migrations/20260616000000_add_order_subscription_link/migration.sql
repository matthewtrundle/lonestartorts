-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "retailSubscriptionId" TEXT;

-- CreateIndex
CREATE INDEX "Order_retailSubscriptionId_idx" ON "Order"("retailSubscriptionId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_retailSubscriptionId_fkey" FOREIGN KEY ("retailSubscriptionId") REFERENCES "RetailSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
