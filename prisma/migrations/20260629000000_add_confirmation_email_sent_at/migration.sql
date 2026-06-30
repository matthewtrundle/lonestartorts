-- Track whether the order-confirmation email actually sent. Additive, nullable,
-- pooler-safe (no table rewrite). The Stripe webhook stamps this on a successful
-- send and alerts admins on failure, so a swallowed Resend error stops being
-- invisible (mirrors the shippedEmailSentAt "missed notifications" pattern).
ALTER TABLE "Order" ADD COLUMN "confirmationEmailSentAt" TIMESTAMP(3);

-- Backfill: assume every pre-existing order already received its confirmation
-- historically, so old orders don't show up as "missed" in any future audit.
-- New orders from here are tracked precisely by the webhook.
UPDATE "Order"
SET "confirmationEmailSentAt" = "createdAt"
WHERE "createdAt" < '2026-06-29';
