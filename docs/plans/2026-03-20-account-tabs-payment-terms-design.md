# Account Page Tabs + Payment Terms Progression + ACH Payments

**Date:** 2026-03-20
**Status:** Approved

---

## Overview

Three interconnected features:
1. **Account page tab toggle** — separate Personal and Wholesale views
2. **Net terms progression** — automated trust-building ladder for wholesale payment terms
3. **ACH payment support** — bank transfer option for wholesale customers

---

## 1. Account Page — Personal/Wholesale Tab Toggle

### Layout
- Pill toggle at top of account page: `Personal | Wholesale`
- Only visible if `customer.isWholesale === true`
- Non-wholesale customers see current page unchanged (no toggle)
- Default tab: Personal (or Wholesale if URL has `?tab=wholesale`)

### Personal Tab (existing content, reorganized)
- Recent retail orders
- Active subscriptions
- Loyalty points
- Quick actions (edit profile, manage addresses)

### Wholesale Tab
- **Business Header**: Business name, account status badge, current pricing tier
- **Payment Terms Card**: Current terms level with progression indicator
  - Shows current level name (e.g., "Trusted — NET_7")
  - Stepper visualization: `New → Trusted → Established → Premium`
  - Progress text: "2 more on-time orders to unlock NET_15"
  - Visual checkmarks for completed milestones
- **Outstanding Invoices**: Unpaid invoices with status, due dates, amounts, "Pay Now" links
- **Order History**: Wholesale orders with invoice numbers, dates, amounts, payment status
- **Place New Order** button → links to `/wholesale`

---

## 2. Net Terms Progression System

### Progression Ladder

| Level | Name | Required | Payment Terms | Auto-Promote? |
|-------|------|----------|---------------|---------------|
| 0 | New | Default | DUE_ON_RECEIPT | — |
| 1 | Trusted | 3 on-time paid orders | NET_7 | Yes |
| 2 | Established | 6 on-time paid orders | NET_15 | Yes |
| 3 | Premium | 10 on-time + admin approval | NET_30 | Admin approves |

### Database Changes

Add to `WholesaleClient` model in Prisma:
```prisma
paymentTermsLevel    String    @default("NEW")     // NEW, TRUSTED, ESTABLISHED, PREMIUM
termsAutoPromoted    Boolean   @default(true)       // false = admin manually set terms
latePaymentCount     Int       @default(0)
onTimePaymentCount   Int       @default(0)
termsLockedUntil     DateTime?                      // freeze after late payment
lastTermsChange      DateTime?
```

### Promotion Logic (runs on `invoice.payment_succeeded` webhook)
1. Check if order was paid on or before `dueDate`
2. If on-time: increment `onTimePaymentCount`
3. If `termsLockedUntil` is set and not expired: skip promotion check
4. If eligible for next level AND `termsAutoPromoted` is true:
   - NEW → TRUSTED or TRUSTED → ESTABLISHED: auto-promote, update `paymentTerms`
   - ESTABLISHED → PREMIUM: create admin notification, do NOT auto-promote
5. Update `lastTermsChange` timestamp

### Demotion Logic (runs on `invoice.payment_failed` webhook)
1. Increment `latePaymentCount`
2. If `latePaymentCount == 1`: freeze promotions (`termsLockedUntil` = now + 90 days)
3. If `latePaymentCount >= 2`: downgrade one level, reset `onTimePaymentCount` to (current level threshold - 1)

### Admin Override
- Admin can manually set any terms level via admin panel
- Sets `termsAutoPromoted = false` so system doesn't override
- Admin can re-enable auto-progression by toggling `termsAutoPromoted` back to true

---

## 3. ACH Payment Support

### Checkout API Change
```typescript
payment_method_types: hasWholesaleItems
  ? ['card', 'us_bank_account']
  : ['card']
```

- ACH only offered to wholesale customers (retail stays card-only)
- Stripe handles bank verification via hosted checkout
- No custom bank account UI needed

### Invoice Payments
- Stripe Invoices already support ACH natively
- When invoice is sent, customer sees both card and bank transfer on Stripe's hosted invoice page
- Enable ACH in Stripe Dashboard invoice settings (no code change for invoice flow)

### ACH Webhook Handling
- ACH payments are asynchronous (3-5 business days)
- Add handler for `payment_intent.processing` → set order status to `PROCESSING`
- Existing `payment_intent.succeeded` and `payment_intent.payment_failed` handlers cover completion

---

## File Plan

### New Files
1. `lib/wholesale/terms-progression.ts` — centralized progression logic
   - `evaluateTermsPromotion(clientId)` — check if client qualifies for upgrade
   - `applyTermsDemotion(clientId)` — handle late payment downgrade
   - `getTermsProgress(clientId)` — return current level, next level, orders needed, progress %
   - `adminOverrideTerms(clientId, newTerms)` — manual override with flag
2. `components/account/AccountTabs.tsx` — pill toggle component
3. `components/account/WholesaleTab.tsx` — wholesale tab content
4. `components/account/PersonalTab.tsx` — personal tab content (extracted from current page)
5. `components/account/TermsProgressCard.tsx` — visual terms progression stepper

### Modified Files
1. `prisma/schema.prisma` — add terms progression fields to WholesaleClient
2. `app/account/page.tsx` — integrate tab toggle, delegate to tab components
3. `app/api/checkout/route.ts` — add `us_bank_account` payment method for wholesale
4. `app/api/webhook/route.ts` — add promotion/demotion calls on payment events, add `payment_intent.processing` handler

### No Deleted Files

---

## Verification
1. Account page shows toggle only for wholesale customers
2. Personal tab shows retail orders, subscriptions, loyalty
3. Wholesale tab shows business info, terms progression, invoices, wholesale orders
4. Terms progression card shows correct level and progress
5. New wholesale client starts at DUE_ON_RECEIPT
6. After 3 on-time payments, auto-promotes to NET_7
7. After 6 on-time payments, auto-promotes to NET_15
8. At 10 on-time payments, admin gets notification for NET_30 approval
9. Late payment freezes promotions; 2 late payments demotes
10. Wholesale checkout offers card + ACH options
11. ACH payment shows processing state before completion
12. `npx tsc --noEmit` passes
