# Loyalty Checkout + Post-Purchase Upsell + Renewal Email Design

**Date:** 2026-03-19
**Status:** Approved

---

## Feature 1: Loyalty Points Redemption at Checkout

**Goal:** Let logged-in customers redeem loyalty points directly in the checkout flow instead of manually generating codes from the account page.

**Approach:** Auto-apply. Show points balance at checkout. One-click "Use 200 points for $5 off" button generates a LOYAL-XXXXXX code behind the scenes and applies it to the discount field.

**Constraint:** Only one discount code per order (Stripe limitation). If a promo code is already applied, loyalty redemption is disabled with clear messaging.

**Flow:**
1. Checkout page detects logged-in customer with loyalty account
2. If balance >= 200, show redemption card in discount section
3. "Apply" button calls `/api/customer/loyalty/redeem`
4. Generated code auto-fills the discount field
5. Existing discount validation pipeline handles the rest

**Files:** `app/checkout/page.tsx` (UI only — existing APIs work as-is)

---

## Feature 2: Subscription Renewal Confirmation Email

**Goal:** Send transactional email when a subscription auto-renews and creates an order.

**Trigger:** `invoice.paid` webhook handler, after creating the renewal Order record.

**Email content:**
- Subject: "Your Lonestar Tortillas subscription order is on its way!"
- Order number, items with quantities, total charged
- Estimated ship date (next Tuesday)
- CTAs: "Track Your Order" and "Manage Subscription"

**Files:**
- `lib/email.ts` — Add `sendSubscriptionRenewalEmail()` template
- `app/api/webhook/route.ts` — Call after renewal order creation (~line 460)

---

## Feature 3: Post-Purchase Upsell on Success Page

**Goal:** Convert the confirmation-only success page into a revenue-generating touchpoint.

### Section A: Loyalty Points Earned
- Logged-in customer: "You earned {points} points! {X} points from your next $5 reward"
- Guest: "Create an account to start earning rewards" with CTA to `/account/register`

### Section B: Smart Cross-Sell (2-3 product cards)
- Tortilla-only orders → suggest sauces/salsas
- Sauce-only orders → suggest best-selling tortillas
- Mixed orders → suggest complementary items not in order
- Each card: image, name, price, link to `/shop`

### Section C: Subscription Pitch
- "Love these tortillas? Never run out."
- Highlights: free shipping, save on every delivery, flexible schedule
- CTA: "Start a Subscription" → `/subscribe`
- Hidden for subscription renewal orders

**Files:**
- `app/success/page.tsx` — Three new sections below timeline
- `app/api/success/route.ts` — Return customerId + loyalty data
- `lib/products.ts` — Add `getComplementaryProducts()` helper
