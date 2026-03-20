# Account Tabs + Payment Terms Progression + ACH Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Personal/Wholesale tab toggle on account page, implement automated net terms progression for wholesale customers, and enable ACH payments for wholesale checkout.

**Architecture:** Prisma schema gets new fields on WholesaleClient for terms progression tracking. A centralized service (`lib/wholesale/terms-progression.ts`) handles promotion/demotion logic, called from webhooks. The account page splits into tab components. Checkout API adds `us_bank_account` for wholesale orders.

**Tech Stack:** Next.js 14 App Router, Prisma ORM, Stripe Invoicing + ACH, Tailwind CSS, TypeScript

---

### Task 1: Add Terms Progression Fields to Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma:434-489` (WholesaleClient model)

**Step 1: Add new fields to WholesaleClient model**

In `prisma/schema.prisma`, add these fields to the `WholesaleClient` model after the `creditLimit` field (line 449):

```prisma
  // Payment terms progression
  paymentTermsLevel   String    @default("NEW")       // NEW, TRUSTED, ESTABLISHED, PREMIUM
  termsAutoPromoted   Boolean   @default(true)         // false if admin manually overrode terms
  onTimePaymentCount  Int       @default(0)
  latePaymentCount    Int       @default(0)
  termsLockedUntil    DateTime?                        // freeze promotions after late payment
  lastTermsChange     DateTime?
```

**Step 2: Generate and run migration**

Run: `npx prisma migrate dev --name add-terms-progression-fields`
Expected: Migration created and applied successfully.

**Step 3: Verify schema**

Run: `npx prisma generate`
Expected: Prisma Client generated successfully.

**Step 4: Commit**

```bash
git add prisma/
git commit -m "feat: add payment terms progression fields to WholesaleClient schema"
```

---

### Task 2: Create Terms Progression Service

**Files:**
- Create: `lib/wholesale/terms-progression.ts`

**Step 1: Create the terms progression service**

Create `lib/wholesale/terms-progression.ts` with the following:

```typescript
import { prisma } from '@/lib/prisma';
import { PaymentTerms } from '@prisma/client';

// Terms progression ladder
export const TERMS_LEVELS = {
  NEW: { name: 'New', terms: 'DUE_ON_RECEIPT' as PaymentTerms, requiredOnTimeOrders: 0, autoPromote: true },
  TRUSTED: { name: 'Trusted', terms: 'NET_7' as PaymentTerms, requiredOnTimeOrders: 3, autoPromote: true },
  ESTABLISHED: { name: 'Established', terms: 'NET_15' as PaymentTerms, requiredOnTimeOrders: 6, autoPromote: true },
  PREMIUM: { name: 'Premium', terms: 'NET_30' as PaymentTerms, requiredOnTimeOrders: 10, autoPromote: false },
} as const;

export type TermsLevel = keyof typeof TERMS_LEVELS;

const LEVEL_ORDER: TermsLevel[] = ['NEW', 'TRUSTED', 'ESTABLISHED', 'PREMIUM'];

function getNextLevel(current: TermsLevel): TermsLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  return idx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[idx + 1] : null;
}

function getPreviousLevel(current: TermsLevel): TermsLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  return idx > 0 ? LEVEL_ORDER[idx - 1] : null;
}

/**
 * Get current terms progress for a wholesale client.
 * Returns info for displaying the progress card on the account page.
 */
export async function getTermsProgress(clientId: string) {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
    select: {
      paymentTermsLevel: true,
      paymentTerms: true,
      onTimePaymentCount: true,
      latePaymentCount: true,
      termsLockedUntil: true,
      termsAutoPromoted: true,
      lastTermsChange: true,
    },
  });

  if (!client) return null;

  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;
  const currentLevelInfo = TERMS_LEVELS[currentLevel];
  const nextLevel = getNextLevel(currentLevel);
  const nextLevelInfo = nextLevel ? TERMS_LEVELS[nextLevel] : null;

  const isLocked = client.termsLockedUntil && new Date(client.termsLockedUntil) > new Date();

  return {
    currentLevel,
    currentLevelName: currentLevelInfo.name,
    currentTerms: client.paymentTerms,
    onTimePaymentCount: client.onTimePaymentCount,
    latePaymentCount: client.latePaymentCount,
    isLocked,
    termsLockedUntil: client.termsLockedUntil,
    termsAutoPromoted: client.termsAutoPromoted,
    nextLevel,
    nextLevelName: nextLevelInfo?.name || null,
    nextLevelTerms: nextLevelInfo?.terms || null,
    ordersToNextLevel: nextLevelInfo
      ? Math.max(0, nextLevelInfo.requiredOnTimeOrders - client.onTimePaymentCount)
      : 0,
    nextLevelRequiresApproval: nextLevelInfo ? !nextLevelInfo.autoPromote : false,
    // For progress bar: how far through current level toward next
    progressPercent: nextLevelInfo
      ? Math.min(100, Math.round(
          ((client.onTimePaymentCount - currentLevelInfo.requiredOnTimeOrders) /
          (nextLevelInfo.requiredOnTimeOrders - currentLevelInfo.requiredOnTimeOrders)) * 100
        ))
      : 100,
    levels: LEVEL_ORDER.map(level => ({
      id: level,
      ...TERMS_LEVELS[level],
      isComplete: LEVEL_ORDER.indexOf(level) < LEVEL_ORDER.indexOf(currentLevel),
      isCurrent: level === currentLevel,
    })),
  };
}

/**
 * Evaluate and apply terms promotion after a successful on-time payment.
 * Called from invoice.payment_succeeded webhook.
 * Returns the new level if promoted, null otherwise.
 */
export async function evaluateTermsPromotion(
  clientId: string,
  orderDueDate: Date | null,
  paidAt: Date,
): Promise<{ promoted: boolean; newLevel?: TermsLevel; requiresApproval?: boolean }> {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
  });

  if (!client) return { promoted: false };

  // Check if payment was on time (paid before or on due date, or no due date = DUE_ON_RECEIPT)
  const isOnTime = !orderDueDate || paidAt <= orderDueDate;

  if (!isOnTime) {
    return { promoted: false };
  }

  // Increment on-time count
  const newOnTimeCount = client.onTimePaymentCount + 1;
  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: { onTimePaymentCount: newOnTimeCount },
  });

  // Don't promote if admin manually set terms
  if (!client.termsAutoPromoted) return { promoted: false };

  // Don't promote if locked from late payments
  if (client.termsLockedUntil && new Date(client.termsLockedUntil) > new Date()) {
    return { promoted: false };
  }

  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;
  const nextLevel = getNextLevel(currentLevel);
  if (!nextLevel) return { promoted: false };

  const nextLevelInfo = TERMS_LEVELS[nextLevel];

  // Check if they've hit the threshold
  if (newOnTimeCount < nextLevelInfo.requiredOnTimeOrders) {
    return { promoted: false };
  }

  // PREMIUM requires admin approval — don't auto-promote
  if (!nextLevelInfo.autoPromote) {
    return { promoted: false, requiresApproval: true, newLevel: nextLevel };
  }

  // Auto-promote
  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: {
      paymentTermsLevel: nextLevel,
      paymentTerms: nextLevelInfo.terms,
      lastTermsChange: new Date(),
    },
  });

  return { promoted: true, newLevel: nextLevel };
}

/**
 * Apply terms demotion after a failed/overdue payment.
 * Called from invoice.payment_failed webhook.
 */
export async function applyTermsDemotion(clientId: string): Promise<void> {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
  });

  if (!client) return;

  const newLateCount = client.latePaymentCount + 1;
  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;

  if (newLateCount >= 2) {
    // Downgrade one level
    const prevLevel = getPreviousLevel(currentLevel);
    if (prevLevel) {
      const prevLevelInfo = TERMS_LEVELS[prevLevel];
      await prisma.wholesaleClient.update({
        where: { id: clientId },
        data: {
          latePaymentCount: newLateCount,
          paymentTermsLevel: prevLevel,
          paymentTerms: prevLevelInfo.terms,
          // Set on-time count to just below current level threshold so they have to earn it back
          onTimePaymentCount: Math.max(0, prevLevelInfo.requiredOnTimeOrders),
          lastTermsChange: new Date(),
          termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90-day freeze
        },
      });
    } else {
      // Already at NEW, just update counts and freeze
      await prisma.wholesaleClient.update({
        where: { id: clientId },
        data: {
          latePaymentCount: newLateCount,
          termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });
    }
  } else {
    // First late payment: freeze promotions for 90 days
    await prisma.wholesaleClient.update({
      where: { id: clientId },
      data: {
        latePaymentCount: newLateCount,
        termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    });
  }
}

/**
 * Admin override: manually set a client's terms level.
 * Sets termsAutoPromoted to false so the system doesn't override.
 */
export async function adminOverrideTerms(
  clientId: string,
  newLevel: TermsLevel,
): Promise<void> {
  const levelInfo = TERMS_LEVELS[newLevel];
  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: {
      paymentTermsLevel: newLevel,
      paymentTerms: levelInfo.terms,
      termsAutoPromoted: false,
      lastTermsChange: new Date(),
    },
  });
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to terms-progression.ts

**Step 3: Commit**

```bash
git add lib/wholesale/terms-progression.ts
git commit -m "feat: add terms progression service with promotion/demotion logic"
```

---

### Task 3: Wire Terms Progression into Webhooks

**Files:**
- Modify: `app/api/webhook/route.ts:490-545` (invoice.payment_succeeded and invoice.payment_failed handlers)

**Step 1: Add terms progression import at top of webhook file**

Add after the existing imports at the top of `app/api/webhook/route.ts`:

```typescript
import { evaluateTermsPromotion, applyTermsDemotion } from '@/lib/wholesale/terms-progression';
```

**Step 2: Add promotion logic to invoice.payment_succeeded handler**

In the `invoice.payment_succeeded` case, after the existing block that updates the wholesale order to PAID (around line 497-504), add terms evaluation:

Find this block (approx lines 496-505):
```typescript
          if (paidOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: paidOrder.id },
              data: {
                paymentStatus: 'PAID',
                paidAt: new Date(),
              },
            });
            // TODO: Send payment confirmation email
          }
```

Replace with:
```typescript
          if (paidOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: paidOrder.id },
              data: {
                paymentStatus: 'PAID',
                paidAt: new Date(),
              },
            });

            // Evaluate terms progression
            try {
              const promotion = await evaluateTermsPromotion(
                paidOrder.clientId,
                paidOrder.dueDate,
                new Date(),
              );
              if (promotion.promoted) {
                console.log(`Wholesale client ${paidOrder.clientId} promoted to ${promotion.newLevel}`);
              }
              if (promotion.requiresApproval) {
                console.log(`Wholesale client ${paidOrder.clientId} eligible for ${promotion.newLevel} — requires admin approval`);
                // TODO: Send admin notification email
              }
            } catch (termsError) {
              console.error('Failed to evaluate terms progression:', termsError);
            }

            // TODO: Send payment confirmation email
          }
```

**Step 3: Add demotion logic to invoice.payment_failed handler**

In the `invoice.payment_failed` case, after the existing wholesale order update to OVERDUE (around line 535-542), add demotion:

Find this block (approx lines 531-542):
```typescript
          const failedOrder = await prisma.wholesaleOrder.findUnique({
            where: { stripeInvoiceId: failedInvoice.id },
          });

          if (failedOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: failedOrder.id },
              data: {
                paymentStatus: 'OVERDUE',
              },
            });
          }
```

Replace with:
```typescript
          const failedOrder = await prisma.wholesaleOrder.findUnique({
            where: { stripeInvoiceId: failedInvoice.id },
          });

          if (failedOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: failedOrder.id },
              data: {
                paymentStatus: 'OVERDUE',
              },
            });

            // Apply terms demotion
            try {
              await applyTermsDemotion(failedOrder.clientId);
              console.log(`Wholesale client ${failedOrder.clientId} — late payment recorded`);
            } catch (termsError) {
              console.error('Failed to apply terms demotion:', termsError);
            }
          }
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No new errors

**Step 5: Commit**

```bash
git add app/api/webhook/route.ts
git commit -m "feat: wire terms progression into payment webhooks"
```

---

### Task 4: Add ACH Payment to Wholesale Checkout

**Files:**
- Modify: `app/api/checkout/route.ts:427-428`

**Step 1: Update payment_method_types for wholesale**

Find line 428:
```typescript
      payment_method_types: ['card'],
```

Replace with:
```typescript
      payment_method_types: isWholesaleOrder ? ['card', 'us_bank_account'] : ['card'],
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add app/api/checkout/route.ts
git commit -m "feat: enable ACH bank transfer for wholesale checkout"
```

---

### Task 5: Update /api/customer/me to Return Terms Progress

**Files:**
- Modify: `app/api/customer/me/route.ts`

**Step 1: Add terms progress data to the API response**

Add import at top:
```typescript
import { getTermsProgress } from '@/lib/wholesale/terms-progression';
```

In the wholesale data section (around line 14-47), after fetching the wholesaleClient, also fetch terms progress. Replace the wholesaleData construction:

Find the block where `wholesaleData` is built (lines 26-47):
```typescript
    if (wholesaleClient) {
      wholesaleData = {
        businessName: wholesaleClient.businessName,
        pricingTier: wholesaleClient.pricingTier,
        paymentTerms: wholesaleClient.paymentTerms,
        status: wholesaleClient.status,
        orders: wholesaleClient.orders.map(order => ({
```

Add terms progress after fetching wholesaleClient. Insert after `if (wholesaleClient) {` and before the wholesaleData assignment:

```typescript
    if (wholesaleClient) {
      const termsProgress = await getTermsProgress(wholesaleClient.id);

      wholesaleData = {
        businessName: wholesaleClient.businessName,
        pricingTier: wholesaleClient.pricingTier,
        paymentTerms: wholesaleClient.paymentTerms,
        status: wholesaleClient.status,
        termsProgress,
        orders: wholesaleClient.orders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          createdAt: order.createdAt,
          dueDate: order.dueDate,
          stripeInvoiceUrl: order.stripeInvoiceUrl,
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        })),
      };
    }
```

Note: also add `dueDate` and `stripeInvoiceUrl` to the order mapping — these are needed for the wholesale tab.

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add app/api/customer/me/route.ts
git commit -m "feat: include terms progress and invoice URLs in customer API response"
```

---

### Task 6: Create Account Tab Components — PersonalTab

**Files:**
- Create: `components/account/PersonalTab.tsx`

**Step 1: Create PersonalTab component**

Extract the existing subscriptions, loyalty, and recent orders sections from `app/account/page.tsx` into a standalone component. This component receives the customer data as props and renders the Personal view.

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, CreditCard, Star, Gift, Truck, Copy, Check } from 'lucide-react';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
  preferredShippingDay?: string | null;
  pausedUntil?: string | null;
  items: Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
  total: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

interface LoyaltyTransaction {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

interface LoyaltyData {
  balance: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  canRedeem: boolean;
  nextRedemptionAt: number;
  recentTransactions: LoyaltyTransaction[];
}

interface PersonalTabProps {
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
  loyalty?: LoyaltyData | null;
  stripeCustomerId: string | null;
  onManageSubscription: () => void;
  portalLoading: boolean;
  onRefresh: () => void;
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PAST_DUE: 'bg-orange-100 text-orange-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-green-100 text-green-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  CANCELLED: 'Cancelled',
  PAST_DUE: 'Past Due',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  PENDING: 'Pending',
  PAID: 'Paid',
  FAILED: 'Failed',
};

function formatStatus(status: string): string {
  return statusLabels[status] || status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function PersonalTab({
  subscriptions,
  recentOrders,
  loyalty,
  stripeCustomerId,
  onManageSubscription,
  portalLoading,
  onRefresh,
}: PersonalTabProps) {
  const { showToast } = useToast();
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ code: string; expiresAt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRedeem = async () => {
    setRedeemLoading(true);
    try {
      const res = await fetch('/api/customer/loyalty/redeem', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to redeem points');
        return;
      }
      setRedeemResult({ code: data.code, expiresAt: data.expiresAt });
      showToast('Points redeemed! Your discount code is ready.', 'success');
      onRefresh();
    } catch {
      showToast('Failed to redeem points');
    } finally {
      setRedeemLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscriptions */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
            <Package className="w-5 h-5 text-sunset-600" />
            My Subscriptions
          </h2>
          {stripeCustomerId && (
            <button
              onClick={onManageSubscription}
              disabled={portalLoading}
              className="text-sm text-charcoal-500 hover:text-charcoal-700 font-medium flex items-center gap-1"
            >
              <CreditCard className="w-4 h-4" />
              {portalLoading ? 'Opening...' : 'Manage Billing'}
            </button>
          )}
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-charcoal-500 mb-4">No subscriptions yet</p>
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
            >
              Start a Subscription
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map(sub => (
              <SubscriptionCard key={sub.id} subscription={sub} onUpdate={onRefresh} />
            ))}
          </div>
        )}
      </div>

      {/* Loyalty Points */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-sunset-600" />
          Loyalty Points
        </h2>

        {!loyalty ? (
          <div className="text-center py-6">
            <p className="text-charcoal-500 mb-2">Start earning points with every order!</p>
            <p className="text-sm text-charcoal-400">Earn 2 points per $1 spent. Redeem 200 points for $5 off.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-charcoal-950">{loyalty.balance.toLocaleString()}</p>
                <p className="text-sm text-charcoal-500">points available</p>
              </div>
              {loyalty.canRedeem ? (
                <button
                  onClick={handleRedeem}
                  disabled={redeemLoading}
                  className="flex items-center gap-2 px-4 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                >
                  <Gift className="w-4 h-4" />
                  {redeemLoading ? 'Redeeming...' : 'Redeem $5 Off'}
                </button>
              ) : (
                <div className="text-right">
                  <p className="text-sm text-charcoal-500">{loyalty.nextRedemptionAt} more to redeem</p>
                  <div className="w-32 bg-charcoal-100 rounded-full h-2 mt-1">
                    <div
                      className="bg-sunset-500 rounded-full h-2 transition-all"
                      style={{ width: `${Math.min(100, ((200 - loyalty.nextRedemptionAt) / 200) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {redeemResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-green-800 mb-1">Your discount code:</p>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-bold text-green-700">{redeemResult.code}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(redeemResult.code);
                      setCopied(true);
                      showToast('Discount code copied!', 'success');
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-1.5 rounded-md hover:bg-green-100 text-green-600 transition-colors"
                    aria-label="Copy discount code"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Valid until {new Date(redeemResult.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            )}

            {loyalty.recentTransactions.length > 0 && (
              <div className="border-t border-charcoal-100 pt-3 mt-3">
                <p className="text-sm font-semibold text-charcoal-700 mb-2">Recent Activity</p>
                <div className="space-y-2">
                  {loyalty.recentTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between text-sm">
                      <span className="text-charcoal-600">{tx.description}</span>
                      <span className={`font-medium ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.points > 0 ? '+' : ''}{tx.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 text-xs text-charcoal-400">
              Lifetime earned: {loyalty.lifetimeEarned.toLocaleString()} pts &bull; Redeemed: {loyalty.lifetimeRedeemed.toLocaleString()} pts
            </div>
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-sunset-600" />
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-charcoal-500 py-4 text-center">No orders yet</p>
        ) : (
          <div className="divide-y divide-charcoal-100">
            {recentOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                  <p className="text-sm text-charcoal-500">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {formatStatus(order.status)}
                  </span>
                  <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add components/account/PersonalTab.tsx
git commit -m "feat: extract PersonalTab component from account page"
```

---

### Task 7: Create TermsProgressCard Component

**Files:**
- Create: `components/account/TermsProgressCard.tsx`

**Step 1: Create the terms progress card**

```typescript
'use client';

import React from 'react';
import { Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface TermsLevel {
  id: string;
  name: string;
  terms: string;
  requiredOnTimeOrders: number;
  autoPromote: boolean;
  isComplete: boolean;
  isCurrent: boolean;
}

interface TermsProgressData {
  currentLevel: string;
  currentLevelName: string;
  currentTerms: string;
  onTimePaymentCount: number;
  latePaymentCount: number;
  isLocked: boolean;
  termsLockedUntil: string | null;
  termsAutoPromoted: boolean;
  nextLevel: string | null;
  nextLevelName: string | null;
  nextLevelTerms: string | null;
  ordersToNextLevel: number;
  nextLevelRequiresApproval: boolean;
  progressPercent: number;
  levels: TermsLevel[];
}

interface TermsProgressCardProps {
  termsProgress: TermsProgressData;
}

const termsDisplayMap: Record<string, string> = {
  DUE_ON_RECEIPT: 'Due on Receipt',
  NET_7: 'Net 7 Days',
  NET_15: 'Net 15 Days',
  NET_30: 'Net 30 Days',
  NET_45: 'Net 45 Days',
  NET_60: 'Net 60 Days',
};

export default function TermsProgressCard({ termsProgress }: TermsProgressCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-sunset-600" />
        Payment Terms
      </h2>

      {/* Current Level */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-charcoal-500">Current Level</p>
          <p className="text-xl font-bold text-charcoal-950">{termsProgress.currentLevelName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-charcoal-500">Payment Terms</p>
          <p className="text-lg font-semibold text-sunset-600">
            {termsDisplayMap[termsProgress.currentTerms] || termsProgress.currentTerms}
          </p>
        </div>
      </div>

      {/* Level Stepper */}
      <div className="flex items-center gap-1 mb-4">
        {termsProgress.levels.map((level, i) => (
          <React.Fragment key={level.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  level.isComplete
                    ? 'bg-green-100 text-green-700'
                    : level.isCurrent
                      ? 'bg-sunset-100 text-sunset-700 ring-2 ring-sunset-500'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {level.isComplete ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[10px] mt-1 text-center leading-tight ${
                level.isCurrent ? 'font-bold text-charcoal-950' : 'text-charcoal-400'
              }`}>
                {level.name}
              </span>
              <span className={`text-[9px] text-center ${
                level.isCurrent ? 'text-sunset-600' : 'text-charcoal-300'
              }`}>
                {termsDisplayMap[level.terms] || level.terms}
              </span>
            </div>
            {i < termsProgress.levels.length - 1 && (
              <ArrowRight className={`w-3 h-3 flex-shrink-0 mt-[-16px] ${
                level.isComplete ? 'text-green-400' : 'text-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress to Next Level */}
      {termsProgress.nextLevel && (
        <div className="bg-cream-50 rounded-lg p-3">
          {termsProgress.isLocked ? (
            <div className="flex items-center gap-2 text-amber-700">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">
                Promotions frozen until {new Date(termsProgress.termsLockedUntil!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-charcoal-700">
                  {termsProgress.ordersToNextLevel} more on-time order{termsProgress.ordersToNextLevel !== 1 ? 's' : ''} to unlock <span className="font-bold">{termsProgress.nextLevelName}</span>
                </p>
                <span className="text-xs text-charcoal-500">{termsProgress.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-sunset-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${termsProgress.progressPercent}%` }}
                />
              </div>
              {termsProgress.nextLevelRequiresApproval && (
                <p className="text-xs text-charcoal-400 mt-1.5">* Requires approval for {termsProgress.nextLevelName} tier</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-charcoal-100 text-xs text-charcoal-400">
        <span>{termsProgress.onTimePaymentCount} on-time payment{termsProgress.onTimePaymentCount !== 1 ? 's' : ''}</span>
        {termsProgress.latePaymentCount > 0 && (
          <span className="text-amber-500">{termsProgress.latePaymentCount} late</span>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add components/account/TermsProgressCard.tsx
git commit -m "feat: create TermsProgressCard component for account page"
```

---

### Task 8: Create WholesaleTab Component

**Files:**
- Create: `components/account/WholesaleTab.tsx`

**Step 1: Create WholesaleTab component**

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ShoppingBag, FileText, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import TermsProgressCard from './TermsProgressCard';

interface WholesaleOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface WholesaleOrder {
  id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  dueDate?: string | null;
  stripeInvoiceUrl?: string | null;
  items: WholesaleOrderItem[];
}

interface TermsProgressData {
  currentLevel: string;
  currentLevelName: string;
  currentTerms: string;
  onTimePaymentCount: number;
  latePaymentCount: number;
  isLocked: boolean;
  termsLockedUntil: string | null;
  termsAutoPromoted: boolean;
  nextLevel: string | null;
  nextLevelName: string | null;
  nextLevelTerms: string | null;
  ordersToNextLevel: number;
  nextLevelRequiresApproval: boolean;
  progressPercent: number;
  levels: Array<{
    id: string;
    name: string;
    terms: string;
    requiredOnTimeOrders: number;
    autoPromote: boolean;
    isComplete: boolean;
    isCurrent: boolean;
  }>;
}

interface WholesaleData {
  businessName: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  termsProgress?: TermsProgressData | null;
  orders: WholesaleOrder[];
}

interface WholesaleTabProps {
  wholesale: WholesaleData;
}

const paymentStatusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PENDING: 'bg-blue-100 text-blue-700',
  PAID: 'bg-green-100 text-green-700',
  OVERDUE: 'bg-red-100 text-red-700',
  VOID: 'bg-gray-100 text-gray-500',
  PARTIAL: 'bg-yellow-100 text-yellow-700',
};

const tierDisplayMap: Record<string, string> = {
  STANDARD: 'Standard',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  CUSTOM: 'Custom',
};

function formatPaymentStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function WholesaleTab({ wholesale }: WholesaleTabProps) {
  // Split orders into outstanding (unpaid) and history
  const outstandingOrders = wholesale.orders.filter(o =>
    ['PENDING', 'OVERDUE', 'PARTIAL'].includes(o.paymentStatus)
  );
  const orderHistory = wholesale.orders.filter(o =>
    !['PENDING', 'OVERDUE', 'PARTIAL'].includes(o.paymentStatus)
  );

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sunset-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-sunset-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal-950">{wholesale.businessName}</h2>
              <p className="text-sm text-charcoal-500">
                {tierDisplayMap[wholesale.pricingTier] || wholesale.pricingTier} Tier
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            wholesale.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {wholesale.status}
          </span>
        </div>
      </div>

      {/* Terms Progress */}
      {wholesale.termsProgress && (
        <TermsProgressCard termsProgress={wholesale.termsProgress} />
      )}

      {/* Outstanding Invoices */}
      {outstandingOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-sunset-600" />
            Outstanding Invoices
          </h2>
          <div className="divide-y divide-charcoal-100">
            {outstandingOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                  <p className="text-sm text-charcoal-500">
                    {order.dueDate
                      ? `Due ${new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : 'Due on receipt'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentStatusColors[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                    {formatPaymentStatus(order.paymentStatus)}
                  </span>
                  <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                  {order.stripeInvoiceUrl && (
                    <a
                      href={order.stripeInvoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sunset-600 hover:text-sunset-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sunset-600" />
            Wholesale Orders
          </h2>
        </div>

        {wholesale.orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-charcoal-500 mb-4">No wholesale orders yet</p>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
            >
              <ShoppingBag className="w-4 h-4" />
              Place Wholesale Order
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-charcoal-100">
              {orderHistory.map(order => (
                <div key={order.id} className="py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                      <p className="text-sm text-charcoal-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentStatusColors[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {formatPaymentStatus(order.paymentStatus)}
                      </span>
                      <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                      {order.stripeInvoiceUrl && (
                        <a
                          href={order.stripeInvoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sunset-600 hover:text-sunset-700"
                          title="View Invoice"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-charcoal-500">
                    {order.items.map((item, i) => (
                      <span key={i}>{i > 0 ? ', ' : ''}{item.quantity}x {item.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-charcoal-100">
              <Link
                href="/wholesale"
                className="text-sm text-sunset-600 hover:text-sunset-700 font-medium"
              >
                Place another wholesale order →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add components/account/WholesaleTab.tsx
git commit -m "feat: create WholesaleTab component with terms progress and invoice links"
```

---

### Task 9: Create AccountTabs Toggle Component

**Files:**
- Create: `components/account/AccountTabs.tsx`

**Step 1: Create AccountTabs component**

```typescript
'use client';

import React from 'react';
import { User, Building2 } from 'lucide-react';

interface AccountTabsProps {
  activeTab: 'personal' | 'wholesale';
  onTabChange: (tab: 'personal' | 'wholesale') => void;
  isWholesale: boolean;
}

export default function AccountTabs({ activeTab, onTabChange, isWholesale }: AccountTabsProps) {
  if (!isWholesale) return null;

  return (
    <div className="flex items-center gap-1 bg-charcoal-100 rounded-lg p-1 mb-6">
      <button
        onClick={() => onTabChange('personal')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
          activeTab === 'personal'
            ? 'bg-white text-charcoal-950 shadow-sm'
            : 'text-charcoal-500 hover:text-charcoal-700'
        }`}
      >
        <User className="w-4 h-4" />
        Personal
      </button>
      <button
        onClick={() => onTabChange('wholesale')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
          activeTab === 'wholesale'
            ? 'bg-white text-charcoal-950 shadow-sm'
            : 'text-charcoal-500 hover:text-charcoal-700'
        }`}
      >
        <Building2 className="w-4 h-4" />
        Wholesale
      </button>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Commit**

```bash
git add components/account/AccountTabs.tsx
git commit -m "feat: create AccountTabs toggle component"
```

---

### Task 10: Integrate Tabs into Account Page

**Files:**
- Modify: `app/account/page.tsx`

**Step 1: Rewrite account page to use tab components**

Replace the entire contents of `app/account/page.tsx` with the refactored version that uses the new tab components. The page keeps the header, sidebar, and quick actions but delegates the main content area to PersonalTab or WholesaleTab based on the active tab.

Key changes:
- Import `AccountTabs`, `PersonalTab`, `WholesaleTab`
- Add `activeTab` state (defaults to 'personal', or 'wholesale' if URL has `?tab=wholesale`)
- Read `?tab=wholesale` from URL search params on mount
- Replace the `md:col-span-2` content area with conditional rendering based on active tab
- Pass appropriate props to each tab component
- Remove the inline subscription/loyalty/orders/wholesale JSX (now in tab components)
- Keep the sidebar (Quick Actions + Help) — it shows on both tabs
- Add wholesale-specific quick actions when on wholesale tab

The new structure of the return JSX:
```
<div bg-cream-50>
  <div max-w-4xl>
    {/* Header (same) */}
    {/* AccountTabs toggle (new) */}
    <div grid md:grid-cols-3>
      <div md:col-span-2>
        {activeTab === 'personal' ? <PersonalTab /> : <WholesaleTab />}
      </div>
      <div sidebar>
        {/* Quick Actions (same, with wholesale additions) */}
        {/* Help (same) */}
      </div>
    </div>
  </div>
</div>
```

Remove: all `statusColors`, `statusLabels`, `formatStatus` constants (moved to PersonalTab). Remove `redeemLoading`, `redeemResult`, `copied` state (moved to PersonalTab). Remove the `handleRedeem` function (moved to PersonalTab).

Keep: `fetchCustomer`, `handleManageSubscription`, `handleLogout`, `loading` state, `customer` state, `portalLoading` state.

Add: `activeTab` state with `useSearchParams()` initialization.

Full replacement for `app/account/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Package, CreditCard, LogOut, Clock, ExternalLink, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import AccountTabs from '@/components/account/AccountTabs';
import PersonalTab from '@/components/account/PersonalTab';
import WholesaleTab from '@/components/account/WholesaleTab';

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
  preferredShippingDay?: string | null;
  pausedUntil?: string | null;
  items: Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
  total: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

interface WholesaleOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface WholesaleOrder {
  id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  dueDate?: string | null;
  stripeInvoiceUrl?: string | null;
  items: WholesaleOrderItem[];
}

interface WholesaleData {
  businessName: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  termsProgress?: any;
  orders: WholesaleOrder[];
}

interface LoyaltyTransaction {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

interface LoyaltyData {
  balance: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  canRedeem: boolean;
  nextRedemptionAt: number;
  recentTransactions: LoyaltyTransaction[];
}

interface CustomerData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  stripeCustomerId: string | null;
  isWholesale?: boolean;
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
  wholesale?: WholesaleData;
  loyalty?: LoyaltyData;
}

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'wholesale'>(
    searchParams.get('tab') === 'wholesale' ? 'wholesale' : 'personal'
  );
  const { showToast } = useToast();

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await fetch('/api/customer/me');
      if (!res.ok) {
        router.push('/account/login');
        return;
      }
      const data = await res.json();
      setCustomer(data.customer);
    } catch {
      router.push('/account/login');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/customer/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      showToast('Failed to open subscription management. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/customer/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600"></div>
      </div>
    );
  }

  if (!customer) return null;

  const activeSubscriptions = customer.subscriptions.filter(s => s.status !== 'CANCELLED');

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-950">
              Howdy{customer.firstName ? `, ${customer.firstName}` : ''}!
            </h1>
            <p className="text-charcoal-600 mt-1">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-700"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Tab Toggle */}
        <AccountTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isWholesale={!!customer.isWholesale}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'personal' ? (
              <PersonalTab
                subscriptions={customer.subscriptions}
                recentOrders={customer.recentOrders}
                loyalty={customer.loyalty}
                stripeCustomerId={customer.stripeCustomerId}
                onManageSubscription={handleManageSubscription}
                portalLoading={portalLoading}
                onRefresh={fetchCustomer}
              />
            ) : customer.wholesale ? (
              <WholesaleTab wholesale={customer.wholesale} />
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-first md:order-none">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {activeTab === 'personal' ? (
                  <>
                    {customer.stripeCustomerId && (
                      <button
                        onClick={handleManageSubscription}
                        disabled={portalLoading}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100 text-left"
                      >
                        <CreditCard className="w-5 h-5 text-charcoal-600" />
                        <div>
                          <p className="font-medium text-charcoal-950 text-sm">Payment & Billing</p>
                          <p className="text-xs text-charcoal-500">Update card, view invoices</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-charcoal-400 ml-auto" />
                      </button>
                    )}
                    <Link
                      href="/track"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100"
                    >
                      <Clock className="w-5 h-5 text-charcoal-600" />
                      <div>
                        <p className="font-medium text-charcoal-950 text-sm">Track an Order</p>
                        <p className="text-xs text-charcoal-500">Check delivery status</p>
                      </div>
                    </Link>
                    <Link
                      href="/subscribe"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100"
                    >
                      <Package className="w-5 h-5 text-charcoal-600" />
                      <div>
                        <p className="font-medium text-charcoal-950 text-sm">
                          {activeSubscriptions.length > 0 ? 'Add Subscription' : 'Start Subscribing'}
                        </p>
                        <p className="text-xs text-charcoal-500">Never run out of tortillas</p>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/wholesale"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-sunset-50 rounded-lg hover:bg-sunset-100 border border-sunset-200"
                    >
                      <ShoppingBag className="w-5 h-5 text-sunset-600" />
                      <div>
                        <p className="font-medium text-charcoal-950 text-sm">Place Wholesale Order</p>
                        <p className="text-xs text-charcoal-500">Build your next order</p>
                      </div>
                    </Link>
                    <Link
                      href="/track"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100"
                    >
                      <Clock className="w-5 h-5 text-charcoal-600" />
                      <div>
                        <p className="font-medium text-charcoal-950 text-sm">Track an Order</p>
                        <p className="text-xs text-charcoal-500">Check delivery status</p>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-3">Need Help?</h2>
              <div className="space-y-2 text-sm">
                <a href="tel:+15128946823" className="block text-charcoal-600 hover:text-sunset-600">
                  (512) 894-6823
                </a>
                <a href="mailto:howdy@lonestartortillas.com" className="block text-charcoal-600 hover:text-sunset-600">
                  howdy@lonestartortillas.com
                </a>
                <Link href="/faq" className="block text-charcoal-600 hover:text-sunset-600">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

**Step 3: Verify the page renders**

Run: `curl -s http://localhost:3000/account 2>&1 | head -5`
Expected: HTML response (page renders without crash)

**Step 4: Commit**

```bash
git add app/account/page.tsx
git commit -m "feat: integrate Personal/Wholesale tab toggle into account page"
```

---

### Task 11: Final Verification

**Step 1: Run full TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 2: Run linter if available**

Run: `npx next lint 2>&1 | tail -20`
Expected: No new errors

**Step 3: Verify all files are committed**

Run: `git status`
Expected: Clean working tree

**Step 4: Create final summary commit if any loose changes**

Only if there are uncommitted fixes from verification steps.
