-- AlterTable
ALTER TABLE "WholesaleClient" ADD COLUMN     "paymentTermsLevel" TEXT NOT NULL DEFAULT 'NEW',
ADD COLUMN     "termsAutoPromoted" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "onTimePaymentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "latePaymentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "termsLockedUntil" TIMESTAMP(3),
ADD COLUMN     "lastTermsChange" TIMESTAMP(3);
