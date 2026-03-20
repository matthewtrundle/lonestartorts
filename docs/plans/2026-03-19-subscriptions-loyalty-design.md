# Subscription Management & Loyalty Points System Design

**Date:** 2026-03-19
**Status:** Approved

## Overview

Two features built together:
1. **Full subscription lifecycle management** — webhook sync, admin controls, customer self-service
2. **Loyalty points** — simple earn-and-burn (2 pts/$1, 200 pts = $5 off)

---

## 1. Subscription Webhook Sync

Extend `app/api/webhook/route.ts` to handle Stripe subscription events:

| Event | Action |
|-------|--------|
| `invoice.payment_succeeded` | Update `lastBilledAt`, `nextBillingDate`, set status `ACTIVE`, award loyalty points |
| `invoice.payment_failed` | Set status `PAST_DUE` |
| `customer.subscription.updated` | Sync `currentPeriodStart/End`, status changes, cancellation |
| `customer.subscription.deleted` | Set status `CANCELLED`, set `cancelledAt` |

Match events to DB via `stripeSubscriptionId`. No new files — extends existing webhook.

---

## 2. Admin Subscription Management

**New API:** `app/api/admin/subscriptions/[id]/route.ts`
- `GET` — Single subscription with full details
- `PATCH` — Pause (set `pausedUntil`, Stripe `pause_collection`), resume, cancel (end of period), update shipping day

**New Stripe helpers** in `lib/subscription/stripe.ts`:
- `pauseSubscription(stripeSubId)` — `pause_collection` on Stripe
- `resumeSubscription(stripeSubId)` — Remove `pause_collection`
- `cancelSubscription(stripeSubId)` — Cancel at period end

**Admin UI** (`app/admin/subscriptions/page.tsx`):
- Action dropdown per row: Pause / Resume / Cancel / Edit Shipping Day
- Confirmation modal for cancel
- Click row to expand details

---

## 3. Customer Self-Service

**New API:** `app/api/customer/subscription/[id]/route.ts`
- `GET` — Fetch own subscription
- `PATCH` — Change shipping day, change frequency, pause (30 days max), cancel
- Ownership validation (customers can only modify their own)

**NOT supporting item changes** — requires new Stripe price/product. Cancel and resubscribe instead.

**Account page** (`app/account/page.tsx`):
- Replace "Manage" button with inline management
- Each sub card: Edit Shipping Day, Change Frequency, Pause/Resume, Cancel
- Keep Stripe portal as secondary "Manage Billing" for payment methods

**New component:** `components/account/SubscriptionCard.tsx`
- Subscription display + action buttons
- Optimistic UI + confirmation modals

---

## 4. Loyalty Points System

**Economics:** 2 points per $1 spent. 200 points = $5 discount code. Effective return rate: 5%.

### New Prisma Models

```
LoyaltyAccount
- id, customerId (unique), balance, lifetimeEarned, lifetimeRedeemed, createdAt

LoyaltyTransaction
- id, loyaltyAccountId, type (EARN/REDEEM/EXPIRE/ADJUST), points,
  description, orderId? (optional), createdAt
```

### Earning
- Webhook: on `invoice.payment_succeeded`, calculate `floor(amountPaid / 100) * 2` points
- Credit to LoyaltyAccount (auto-create on first earn)
- LoyaltyTransaction with description

### Redeeming
- API: `app/api/customer/loyalty/redeem/route.ts`
- Exchanges 200 points for single-use $5 DiscountCode (30-day expiry, source `LOYALTY`)
- Reuses existing DiscountCode model

### Customer UI (account page)
- Points balance with animated counter
- "Redeem $5 Off" button (enabled at 200+ points)
- Recent transaction history

### Admin
- Points column on admin customer/subscription views
- No admin editing (keep simple)

---

## Key Files

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Add LoyaltyAccount, LoyaltyTransaction models |
| `app/api/webhook/route.ts` | Subscription event handlers + points earning |
| `lib/subscription/stripe.ts` | pause/resume/cancel helpers |
| `app/api/admin/subscriptions/[id]/route.ts` | New — admin CRUD |
| `app/admin/subscriptions/page.tsx` | Add actions, expand, modals |
| `app/api/customer/subscription/[id]/route.ts` | New — customer self-service |
| `app/account/page.tsx` | Inline sub management + loyalty display |
| `components/account/SubscriptionCard.tsx` | New — sub card with actions |
| `app/api/customer/loyalty/redeem/route.ts` | New — points redemption |
