# Loyalty Checkout + Post-Purchase Upsell + Renewal Email Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire loyalty points redemption into checkout, add post-purchase upsell sections to the success page, and send confirmation emails on subscription renewal.

**Architecture:** Leverage existing loyalty redemption API (generates LOYAL-XXXXXX discount codes) and discount validation pipeline. Success page upsells are client-side sections using order data already available. Renewal email uses existing Resend infrastructure with a new template.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion (success page), Resend email, existing cart/loyalty/discount APIs

---

## Context

### Loyalty System (existing)
- Earn: 2 points per $1 (awarded in webhook after payment)
- Redeem: 200 points → $5 off (creates `LOYAL-XXXXXX` DiscountCode via `/api/customer/loyalty/redeem`)
- Account page already has redeem UI
- Checkout has discount code input (email + code fields) — works with any DiscountCode
- **Constraint:** Only one discount per Stripe session. Loyalty code replaces any existing discount.

### Success Page (existing)
- Fetches order via `/api/success?session_id=X`
- Shows: order number, ship date, summary, shipping address, timeline, action buttons
- Has Framer Motion animations, gradient backgrounds
- No upsell, cross-sell, or loyalty display

### Subscription Renewal (existing)
- `invoice.paid` webhook creates Order automatically (~line 409 in webhook/route.ts)
- Awards loyalty points (~line 457)
- Does NOT send any email notification to customer

---

## Tasks

### Task 1: Loyalty Points Redemption in Checkout UI

**Problem:** Customers must go to Account page → Redeem → copy code → paste at checkout. Should be one-click at checkout.

**Files:**
- Modify: `app/checkout/page.tsx`

**Changes:**
- Add state for loyalty: `loyaltyBalance`, `loyaltyLoading`, `loyaltyRedeemLoading`, `loyaltyCode`
- On mount, if not a wholesale-only order, fetch `/api/customer/me` to check loyalty balance (reuse the existing wholesale auth fetch when possible)
- If `loyaltyBalance >= 200` and no discount is currently applied, show a loyalty card below the discount code section
- Card UI: purple/gold gradient banner — "You have {balance} points! Use 200 for $5 off"
- "Apply $5 Reward" button calls `/api/customer/loyalty/redeem`, gets back `{ code, value }`
- Auto-fill `discountCode` state with the returned code and `email` with customer email
- Trigger `handleApplyDiscount()` to validate and apply it through existing flow
- If a discount code is already applied, show disabled state: "Remove current discount to use points"
- After successful loyalty redemption, update loyalty display to show new balance

**Step 1:** Add loyalty state variables after the existing discount state block (after line 59).

```typescript
// Loyalty points state
const [loyaltyBalance, setLoyaltyBalance] = useState<number>(0);
const [loyaltyLoading, setLoyaltyLoading] = useState(false);
const [loyaltyRedeemLoading, setLoyaltyRedeemLoading] = useState(false);
const [customerEmail, setCustomerEmail] = useState<string>('');
```

**Step 2:** Add loyalty data fetch. Modify the existing `/api/customer/me` effect (lines 30-46) to also capture loyalty data when it fetches for wholesale auth. Add a separate fetch for non-wholesale orders.

```typescript
// Fetch loyalty data for logged-in customers
React.useEffect(() => {
  if (!hasWholesaleItems) {
    // For non-wholesale orders, check if logged in and fetch loyalty
    fetch('/api/customer/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.loyaltyData) {
          setLoyaltyBalance(data.loyaltyData.balance);
        }
        if (data?.customer?.email) {
          setCustomerEmail(data.customer.email);
        }
      })
      .catch(() => {});
  }
}, [hasWholesaleItems]);
```

Also update the wholesale auth effect to capture loyalty data:
```typescript
// Inside existing wholesale auth effect, after setting wholesaleCustomer:
if (data?.loyaltyData) {
  setLoyaltyBalance(data.loyaltyData.balance);
}
if (data?.customer?.email) {
  setCustomerEmail(data.customer.email);
}
```

**Step 3:** Add loyalty redemption handler.

```typescript
const handleLoyaltyRedeem = async () => {
  setLoyaltyRedeemLoading(true);
  try {
    const res = await fetch('/api/customer/loyalty/redeem', { method: 'POST' });
    const data = await res.json();
    if (!res.ok) {
      setDiscountError(data.error || 'Failed to redeem points');
      return;
    }
    // Auto-apply the loyalty code
    setEmail(customerEmail);
    setDiscountCode(data.code);
    setLoyaltyBalance(data.remainingBalance);
    // Trigger discount validation
    setTimeout(() => {
      // Set states directly since we know the code is valid
      setDiscountApplied(true);
      setDiscountType('fixed_amount');
      setDiscountAmount(data.value); // 500 cents
      setDiscountMessage(`$${(data.value / 100).toFixed(2)} loyalty reward applied!`);
      setDiscountOpen(true);
    }, 100);
  } catch {
    setDiscountError('Failed to redeem points');
  } finally {
    setLoyaltyRedeemLoading(false);
  }
};
```

**Step 4:** Add loyalty card UI. Insert below the discount code section (after line 466), before the trust indicators.

```tsx
{/* Loyalty Points Redemption */}
{loyaltyBalance >= 200 && (
  <div className="border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
      </svg>
      <span className="text-sm font-semibold text-amber-900">
        {loyaltyBalance} Loyalty Points
      </span>
    </div>
    {discountApplied ? (
      <p className="text-xs text-amber-700">
        Remove current discount to use loyalty points
      </p>
    ) : (
      <button
        onClick={handleLoyaltyRedeem}
        disabled={loyaltyRedeemLoading}
        className="w-full mt-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded transition-colors disabled:bg-amber-400"
      >
        {loyaltyRedeemLoading ? 'Applying...' : 'Use 200 Points for $5 Off'}
      </button>
    )}
  </div>
)}
```

**Step 5:** Handle the fixed_amount discount type in the display calculations. The existing code handles `percentage` and `free_shipping`. Add `fixed_amount` support.

Update the display total calculations (around lines 108-115):
```typescript
const isFixedAmountDiscount = discountApplied && discountType === 'fixed_amount';
const fixedDiscountValue = isFixedAmountDiscount ? discountAmount : 0;
const displaySubtotalAfterDiscount = isPercentageDiscount
  ? subtotal - percentageDiscountValue
  : isFixedAmountDiscount
    ? subtotal - fixedDiscountValue
    : subtotal;
```

Also add the fixed amount discount display line in the price breakdown (after the percentage discount line ~line 371):
```tsx
{isFixedAmountDiscount && (
  <div className="flex justify-between items-center text-green-600">
    <span>Loyalty Reward</span>
    <span className="font-medium">-{formatPrice(fixedDiscountValue)}</span>
  </div>
)}
```

**Step 6:** Commit.

---

### Task 2: Subscription Renewal Confirmation Email

**Problem:** When a subscription auto-renews and creates an order, the customer gets no notification.

**Files:**
- Modify: `lib/email-templates.ts`
- Modify: `lib/email.ts`
- Modify: `app/api/webhook/route.ts`

**Step 1:** Add the renewal email template to `lib/email-templates.ts`. Add at the end of the file, following the same table-based HTML pattern as existing templates.

```typescript
interface SubscriptionRenewalData {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedShipDate: string;
  nextBillingDate: string;
}

export function generateSubscriptionRenewalEmail(data: SubscriptionRenewalData): string {
  // Follow same HTML structure as generateOrderConfirmationEmail
  // Subject-appropriate header: "Your Subscription Order Is Confirmed"
  // Show order number, items, totals, ship date
  // CTA: "Track Your Order" and "Manage Subscription"
  // Include next billing date for transparency
}
```

The template should follow the exact same table-based email structure as the existing `generateOrderConfirmationEmail` — same brand colors (#d97706, #ea580c), same 600px max width, same inline styles. Differentiate with:
- Header text: "Subscription Order Confirmed" instead of "Order Confirmed"
- Subtitle: "Your recurring order has been placed and is being prepared."
- Add "Next billing date: {date}" below the order summary
- CTA buttons: "Track Your Order" + "Manage Subscription" (links to `/track` and `/account`)

**Step 2:** Add `sendSubscriptionRenewalEmail()` to `lib/email.ts`.

```typescript
interface SubscriptionRenewalEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedShipDate: string;
  nextBillingDate: string;
}

export async function sendSubscriptionRenewalEmail(props: SubscriptionRenewalEmailProps) {
  const html = generateSubscriptionRenewalEmail({
    orderNumber: props.orderNumber,
    customerName: props.customerName,
    items: props.items,
    subtotal: props.subtotal,
    shipping: props.shipping,
    tax: props.tax,
    total: props.total,
    estimatedShipDate: props.estimatedShipDate,
    nextBillingDate: props.nextBillingDate,
  });

  const resend = getResendClient();
  await resend.emails.send({
    from: `Lonestar Tortillas <${fromEmail}>`,
    to: [props.to],
    subject: `Your subscription order ${props.orderNumber} is confirmed!`,
    html,
  });
}
```

**Step 3:** Call the new email function in the webhook handler. In `app/api/webhook/route.ts`, after the loyalty points award (~line 460), add:

```typescript
// Send subscription renewal confirmation email
try {
  const { sendSubscriptionRenewalEmail } = await import('@/lib/email');
  const { getNextShipDate, formatShipDate } = await import('@/lib/shipping-schedule');
  const shipDate = getNextShipDate();
  const estimatedShipDate = formatShipDate(shipDate);
  const nextBillingDate = new Date(stripeSub.current_period_end * 1000)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  await sendSubscriptionRenewalEmail({
    to: retailSub.customer.email,
    orderNumber,
    customerName: [retailSub.customer.firstName, retailSub.customer.lastName].filter(Boolean).join(' ') || 'Valued Customer',
    items: items.map(item => ({ name: item.name, quantity: item.quantity, price: item.unitPrice })),
    subtotal: retailSub.subtotal,
    shipping: retailSub.shipping,
    tax: retailSub.tax,
    total: retailSub.total,
    estimatedShipDate,
    nextBillingDate,
  });
} catch (emailError) {
  console.error('Failed to send subscription renewal email:', emailError);
}
```

**Step 4:** Commit.

---

### Task 3: Complementary Products Helper

**Problem:** Success page needs to suggest products the customer didn't buy.

**Files:**
- Modify: `lib/products.ts`

**Step 1:** Add `getComplementaryProducts()` function at the end of the file.

```typescript
/**
 * Get complementary product suggestions based on what was ordered.
 * - If order has only tortillas → suggest sauces/salsas
 * - If order has only sauces/salsas → suggest best-selling tortillas
 * - If order has both → suggest items from categories not in order
 * Returns up to 3 products.
 */
export function getComplementaryProducts(orderSkus: string[]): Product[] {
  const orderedProducts = orderSkus
    .map(sku => {
      // Handle wholesale SKUs
      const retailSku = sku.startsWith('WHOLESALE-') ? sku.replace('WHOLESALE-', '') : sku;
      return products.find(p => p.sku === retailSku);
    })
    .filter(Boolean) as Product[];

  const orderedTypes = new Set(orderedProducts.map(p => p.productType));
  const orderedSkus = new Set(orderSkus.map(sku =>
    sku.startsWith('WHOLESALE-') ? sku.replace('WHOLESALE-', '') : sku
  ));

  let suggestions: Product[] = [];

  if (orderedTypes.has('tortilla') && !orderedTypes.has('sauce') && !orderedTypes.has('salsa')) {
    // Ordered only tortillas → suggest sauces and salsas
    suggestions = products.filter(p =>
      (p.productType === 'sauce' || p.productType === 'salsa') && !orderedSkus.has(p.sku)
    );
  } else if (!orderedTypes.has('tortilla') && (orderedTypes.has('sauce') || orderedTypes.has('salsa'))) {
    // Ordered only sauces/salsas → suggest best-selling tortillas
    suggestions = products.filter(p =>
      p.productType === 'tortilla' && p.isBestSeller && !orderedSkus.has(p.sku)
    );
    if (suggestions.length < 3) {
      // Pad with other tortillas
      const more = products.filter(p =>
        p.productType === 'tortilla' && !p.isBestSeller && !orderedSkus.has(p.sku)
      );
      suggestions = [...suggestions, ...more];
    }
  } else {
    // Mixed order → suggest items from categories not in order
    suggestions = products.filter(p => !orderedTypes.has(p.productType) && !orderedSkus.has(p.sku));
    if (suggestions.length === 0) {
      // All categories covered → suggest items not in this order
      suggestions = products.filter(p => !orderedSkus.has(p.sku) && p.productType !== 'wholesale');
    }
  }

  return suggestions.slice(0, 3);
}
```

**Step 2:** Commit.

---

### Task 4: Success Page API — Return Loyalty + Customer Data

**Problem:** Success page needs customer loyalty data and customerId to show points earned and cross-sell.

**Files:**
- Modify: `app/api/success/route.ts`

**Changes:**
- If the order has a `customerId`, fetch loyalty account data
- Return `customerId`, `loyaltyPointsEarned` (2 points per dollar of subtotal), `loyaltyBalance`, and `isSubscriptionOrder` flag
- Return order item SKUs for complementary product logic (already available via OrderItem)

**Step 1:** Update the success API to include loyalty and customer data.

After fetching the order (line 31), add:

```typescript
// Fetch loyalty data if customer is logged in
let loyaltyData = null;
let isSubscriptionOrder = false;

if (order.customerId) {
  try {
    const loyaltyAccount = await prisma.loyaltyAccount.findUnique({
      where: { customerId: order.customerId },
    });
    if (loyaltyAccount) {
      const pointsEarned = Math.floor(order.subtotal / 100) * 2;
      loyaltyData = {
        pointsEarned,
        balance: loyaltyAccount.balance,
        nextRedemptionAt: Math.max(0, 200 - loyaltyAccount.balance),
      };
    }
  } catch (e) {
    console.error('Failed to fetch loyalty data for success page:', e);
  }

  // Check if this order came from a subscription
  // Subscription orders have a customerId and were created by webhook
  // We can check if there's a matching retail subscription
  try {
    const sub = await prisma.retailSubscription.findFirst({
      where: { customerId: order.customerId, status: 'ACTIVE' },
    });
    isSubscriptionOrder = !!sub;
  } catch (e) {
    // Non-critical
  }
}
```

Add to the response object (after `shippingAddress`):

```typescript
customerId: order.customerId || null,
loyaltyData,
isSubscriptionOrder,
```

**Step 2:** Commit.

---

### Task 5: Success Page — Loyalty Points Section

**Problem:** Success page doesn't show points earned or encourage account creation.

**Files:**
- Modify: `app/success/page.tsx`

**Step 1:** Add the loyalty points section after the "Email Confirmation Notice" section (after line 366), before the action buttons.

```tsx
{/* Loyalty Points Earned */}
{orderDetails.loyaltyData ? (
  <motion.div
    variants={itemVariants}
    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg border border-amber-200/50 p-6 md:p-8"
  >
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-amber-200">
        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Loyalty Rewards</p>
        <p className="text-2xl md:text-3xl font-bold text-charcoal-950">
          You earned {orderDetails.loyaltyData.pointsEarned} points!
        </p>
        {orderDetails.loyaltyData.nextRedemptionAt > 0 ? (
          <p className="text-sm text-charcoal-600 mt-1">
            {orderDetails.loyaltyData.nextRedemptionAt} more points until your next $5 reward
          </p>
        ) : (
          <p className="text-sm text-green-600 font-medium mt-1">
            You have enough points to redeem a $5 reward!
          </p>
        )}
      </div>
    </div>
  </motion.div>
) : orderDetails.customerId ? null : (
  <motion.div
    variants={itemVariants}
    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg border border-amber-200/50 p-6 text-center"
  >
    <svg className="w-10 h-10 text-amber-600 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
    </svg>
    <p className="text-lg font-bold text-charcoal-950 mb-1">Start Earning Rewards</p>
    <p className="text-sm text-charcoal-600 mb-4">
      Create an account to earn 2 points per $1 spent. Redeem 200 points for $5 off!
    </p>
    <Link
      href="/account/register"
      className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
    >
      Create Account
      <ArrowRight className="w-4 h-4" />
    </Link>
  </motion.div>
)}
```

**Step 2:** Commit.

---

### Task 6: Success Page — Smart Cross-Sell Section

**Problem:** No product recommendations after purchase.

**Files:**
- Modify: `app/success/page.tsx`

**Step 1:** Import `getComplementaryProducts` and `formatPrice` at the top of the file. Add Image import if not already present.

```typescript
import Image from 'next/image';
import { getComplementaryProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
```

**Step 2:** Compute complementary products inside SuccessContent, after orderDetails is loaded. Use `useMemo`:

```typescript
import { useMemo } from 'react';

// Inside SuccessContent, after orderDetails state:
const complementaryProducts = useMemo(() => {
  if (!orderDetails?.items) return [];
  const skus = orderDetails.items.map((item: any) => item.sku).filter(Boolean);
  return getComplementaryProducts(skus);
}, [orderDetails]);
```

**Step 3:** Add cross-sell section after the loyalty section, before action buttons.

```tsx
{/* Smart Cross-Sell */}
{complementaryProducts.length > 0 && (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-2xl shadow-lg border border-charcoal-100 p-6 md:p-8"
  >
    <h2 className="text-2xl font-bold text-charcoal-950 mb-2">Complete Your Kitchen</h2>
    <p className="text-charcoal-600 mb-6">These pair perfectly with your order</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {complementaryProducts.map((product) => (
        <Link
          key={product.sku}
          href="/shop"
          className="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-sunset-300 hover:shadow-md transition-all"
        >
          <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-3 bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="80px"
            />
          </div>
          <p className="text-sm font-semibold text-charcoal-950 text-center leading-tight mb-1">
            {product.name}
          </p>
          <p className="text-sunset-600 font-bold">{formatPrice(product.price)}</p>
        </Link>
      ))}
    </div>
  </motion.div>
)}
```

**Step 4:** Commit.

---

### Task 7: Success Page — Subscription Pitch Section

**Problem:** No subscription offer after one-time purchase.

**Files:**
- Modify: `app/success/page.tsx`

**Step 1:** Add subscription pitch after cross-sell section, before action buttons. Only show for non-subscription orders.

```tsx
{/* Subscription Pitch */}
{!orderDetails.isSubscriptionOrder && (
  <motion.div
    variants={itemVariants}
    className="bg-gradient-to-r from-sunset-50 to-amber-50 rounded-2xl shadow-lg border border-sunset-200/50 p-6 md:p-8 text-center"
  >
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal-950 mb-2">
        Never Run Out of Tortillas
      </h2>
      <p className="text-charcoal-600 mb-6">
        Subscribe and get fresh tortillas delivered on your schedule. Free shipping on every delivery, cancel anytime.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2 text-charcoal-700">
          <Truck className="w-4 h-4 text-sunset-600" />
          <span>Free shipping always</span>
        </div>
        <div className="flex items-center gap-2 text-charcoal-700">
          <Calendar className="w-4 h-4 text-sunset-600" />
          <span>Flexible schedule</span>
        </div>
        <div className="flex items-center gap-2 text-charcoal-700">
          <CheckCircle2 className="w-4 h-4 text-sunset-600" />
          <span>Cancel anytime</span>
        </div>
      </div>
      <Link
        href="/subscribe"
        className="inline-flex items-center gap-2 bg-sunset-600 hover:bg-sunset-700 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl"
      >
        Start a Subscription
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  </motion.div>
)}
```

**Step 2:** Commit.

---

## Verification

1. **Loyalty at Checkout:**
   - Log in as a customer with 200+ loyalty points
   - Go to `/checkout` with items in cart
   - Verify loyalty card appears below discount section
   - Click "Use 200 Points for $5 Off" — verify discount applies
   - Verify total updates with $5 discount
   - Try with a promo code already applied — verify loyalty button is disabled
   - Try as guest (not logged in) — verify no loyalty card appears

2. **Subscription Renewal Email:**
   - Check email template renders correctly (view HTML in browser)
   - Verify email is sent after subscription renewal in webhook handler
   - Confirm order number, items, ship date, and next billing date are correct

3. **Success Page Upsells:**
   - Complete a test purchase, land on `/success`
   - Verify loyalty points section shows (logged in) or account creation CTA (guest)
   - Verify complementary products appear (buy tortillas → see sauces)
   - Verify subscription pitch appears for one-time orders
   - Verify subscription pitch does NOT appear for subscription renewal orders

4. **Edge Cases:**
   - Customer with < 200 loyalty points — no redemption card at checkout
   - Customer with 0 points — no loyalty section at checkout
   - Order with all product types — cross-sell still shows something
   - Wholesale order success page — verify no subscription pitch

## Key Files
- `app/checkout/page.tsx` — Loyalty redemption UI at checkout
- `lib/email-templates.ts` — Subscription renewal email template
- `lib/email.ts` — `sendSubscriptionRenewalEmail()` function
- `app/api/webhook/route.ts` — Send renewal email after order creation
- `lib/products.ts` — `getComplementaryProducts()` helper
- `app/api/success/route.ts` — Return loyalty + customer data
- `app/success/page.tsx` — Loyalty, cross-sell, subscription pitch sections

## Reuse
- `useCart()` from `lib/cart-context.tsx`
- `formatPrice()` from `lib/utils`
- `/api/customer/me` — already returns loyaltyData
- `/api/customer/loyalty/redeem` — existing redemption API
- Existing email template patterns from `lib/email-templates.ts`
- Framer Motion `itemVariants` already defined in success page
