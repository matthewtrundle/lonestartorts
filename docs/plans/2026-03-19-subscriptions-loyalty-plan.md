# Subscription Management & Loyalty Points Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full subscription lifecycle management (webhook sync, admin controls, customer self-service) and a simple loyalty points system (2 pts/$1, 200 pts = $5 off).

**Architecture:** Extends existing Stripe webhook handler for subscription events and points earning. Adds admin and customer-facing APIs for subscription CRUD. Loyalty uses new Prisma models that integrate with the existing DiscountCode system for redemption.

**Tech Stack:** Next.js 14 App Router, Prisma/PostgreSQL, Stripe API (subscriptions, pause_collection, customer portal), TypeScript, Tailwind CSS.

---

### Task 1: Add Loyalty Models to Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add LOYALTY to DiscountSource enum and new models**

Add to `prisma/schema.prisma` after the `DiscountSource` enum (currently at line ~861):

```prisma
// In the existing DiscountSource enum, add LOYALTY:
enum DiscountSource {
  ADMIN
  SPIN_WHEEL
  FEEDBACK
  DRIP_CAMPAIGN
  SYSTEM
  LOYALTY
}
```

Add these models after the `ExitSurveyResponse` model (end of file):

```prisma
// ===========================================
// LOYALTY POINTS SYSTEM
// ===========================================

model LoyaltyAccount {
  id               String               @id @default(uuid())
  customerId       String               @unique
  balance          Int                  @default(0)
  lifetimeEarned   Int                  @default(0)
  lifetimeRedeemed Int                  @default(0)
  createdAt        DateTime             @default(now())
  updatedAt        DateTime             @updatedAt

  customer         Customer             @relation(fields: [customerId], references: [id])
  transactions     LoyaltyTransaction[]

  @@index([customerId])
}

model LoyaltyTransaction {
  id               String              @id @default(uuid())
  loyaltyAccountId String
  type             LoyaltyTransactionType
  points           Int                 // positive for earn, negative for redeem
  description      String
  orderId          String?             // optional link to order
  createdAt        DateTime            @default(now())

  account          LoyaltyAccount      @relation(fields: [loyaltyAccountId], references: [id])

  @@index([loyaltyAccountId])
  @@index([createdAt])
}

enum LoyaltyTransactionType {
  EARN
  REDEEM
  EXPIRE
  ADJUST
}
```

Also add the relation on the Customer model (line ~32 area). Add after the `RetailSubscription` relation:

```prisma
  LoyaltyAccount   LoyaltyAccount?
```

**Step 2: Run database migration**

Run: `npx prisma db push`

Expected: Schema synced, no errors.

**Step 3: Regenerate Prisma client**

Run: `npx prisma generate`

Expected: Generated Prisma Client.

**Step 4: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

Expected: No new errors (existing stale LSP errors are fine).

**Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add LoyaltyAccount and LoyaltyTransaction models to schema

Add LOYALTY to DiscountSource enum. Models support earn/redeem/expire/adjust
transactions with customer and order links.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Add Stripe Subscription Helpers (Pause/Resume/Cancel)

**Files:**
- Modify: `lib/subscription/stripe.ts`

**Step 1: Add pause, resume, and cancel functions**

Add these functions to `lib/subscription/stripe.ts` after the existing `mapStripeIntervalToDb` function (line 112):

```typescript
export async function pauseSubscription(stripeSubscriptionId: string) {
  return stripe.subscriptions.update(stripeSubscriptionId, {
    pause_collection: {
      behavior: 'void',
    },
  });
}

export async function resumeSubscription(stripeSubscriptionId: string) {
  return stripe.subscriptions.update(stripeSubscriptionId, {
    pause_collection: '',
  });
}

export async function cancelSubscription(stripeSubscriptionId: string) {
  return stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function reactivateSubscription(stripeSubscriptionId: string) {
  return stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: false,
  });
}
```

**Step 2: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

Expected: No new errors.

**Step 3: Commit**

```bash
git add lib/subscription/stripe.ts
git commit -m "feat: add pause/resume/cancel Stripe subscription helpers

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Add Loyalty Points Earning to Webhook

**Files:**
- Modify: `app/api/webhook/route.ts`

**Step 1: Add loyalty points helper function**

Add this function inside the webhook file, after the imports (around line 10):

```typescript
async function awardLoyaltyPoints(customerId: string, amountInCents: number, description: string, orderId?: string) {
  const points = Math.floor(amountInCents / 100) * 2; // 2 points per dollar
  if (points <= 0) return;

  // Upsert loyalty account
  const account = await prisma.loyaltyAccount.upsert({
    where: { customerId },
    create: {
      customerId,
      balance: points,
      lifetimeEarned: points,
    },
    update: {
      balance: { increment: points },
      lifetimeEarned: { increment: points },
    },
  });

  // Create transaction record
  await prisma.loyaltyTransaction.create({
    data: {
      loyaltyAccountId: account.id,
      type: 'EARN',
      points,
      description,
      orderId,
    },
  });
}
```

**Step 2: Award points in the `checkout.session.completed` handler**

In the existing `checkout.session.completed` handler, after the `backgroundWork` call (around line 337), add loyalty points for one-time orders:

```typescript
          // Award loyalty points for one-time orders
          if (customerId) {
            try {
              await awardLoyaltyPoints(customerId, subtotal, `Order ${orderNumber}`, order.id);
            } catch (loyaltyError) {
              console.error('Failed to award loyalty points:', loyaltyError);
            }
          }
```

**Step 3: Award points in the `invoice.paid` handler for subscriptions**

In the existing `invoice.paid` handler, after the `retailSubscription.update` call (around line 414), add:

```typescript
              // Award loyalty points for subscription renewal
              try {
                await awardLoyaltyPoints(retailSub.customerId, retailSub.subtotal, `Subscription renewal`, undefined);
              } catch (loyaltyError) {
                console.error('Failed to award loyalty points for subscription:', loyaltyError);
              }
```

**Step 4: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

Expected: No new errors.

**Step 5: Commit**

```bash
git add app/api/webhook/route.ts
git commit -m "feat: award loyalty points on order completion and subscription renewal

2 points per dollar spent. Auto-creates loyalty account on first earn.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Create Admin Subscription Management API

**Files:**
- Create: `app/api/admin/subscriptions/[id]/route.ts`

**Step 1: Create the admin subscription CRUD API**

Create `app/api/admin/subscriptions/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import {
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
} from '@/lib/subscription/stripe';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscription = await prisma.retailSubscription.findUnique({
      where: { id: params.id },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            stripeCustomerId: true,
          },
        },
      },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, preferredShippingDay } = body;

    const subscription = await prisma.retailSubscription.findUnique({
      where: { id: params.id },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    switch (action) {
      case 'pause': {
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await pauseSubscription(subscription.stripeSubscriptionId);
        const pausedUntil = new Date();
        pausedUntil.setDate(pausedUntil.getDate() + 30);
        await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'PAUSED', pausedUntil },
        });
        return NextResponse.json({ success: true, status: 'PAUSED' });
      }

      case 'resume': {
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await resumeSubscription(subscription.stripeSubscriptionId);
        await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'ACTIVE', pausedUntil: null },
        });
        return NextResponse.json({ success: true, status: 'ACTIVE' });
      }

      case 'cancel': {
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await cancelSubscription(subscription.stripeSubscriptionId);
        await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'CANCELLED', cancelledAt: new Date() },
        });
        return NextResponse.json({ success: true, status: 'CANCELLED' });
      }

      case 'update_shipping_day': {
        if (!preferredShippingDay) {
          return NextResponse.json({ error: 'preferredShippingDay required' }, { status: 400 });
        }
        await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { preferredShippingDay },
        });
        return NextResponse.json({ success: true, preferredShippingDay });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
```

**Step 2: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 3: Commit**

```bash
git add "app/api/admin/subscriptions/[id]/route.ts"
git commit -m "feat: add admin subscription management API (pause/resume/cancel/update shipping)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Add Admin Subscription UI Actions

**Files:**
- Modify: `app/admin/subscriptions/page.tsx`

**Step 1: Add action handlers and modal state**

Add state variables after existing state declarations (around line 50):

```typescript
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: string; name: string } | null>(null);
  const [editShippingDay, setEditShippingDay] = useState<{ id: string; current: string | null } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
```

Add action handler function after `fetchSubscriptions`:

```typescript
  const handleAction = async (id: string, action: string, extraData?: Record<string, string>) => {
    setActionLoading(id);
    try {
      const response = await fetch(`/api/admin/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extraData }),
      });
      if (!response.ok) {
        const err = await response.json();
        alert(err.error || 'Action failed');
        return;
      }
      await fetchSubscriptions();
    } catch {
      alert('Failed to perform action');
    } finally {
      setActionLoading(null);
      setConfirmAction(null);
      setEditShippingDay(null);
    }
  };
```

**Step 2: Add action buttons column to table**

Add a new table header after the "Created" column:

```tsx
<th className="text-right px-4 py-3 font-semibold text-charcoal-700">Actions</th>
```

Add action buttons cell in each row after the Created date `<td>`:

```tsx
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {sub.status === 'ACTIVE' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: sub.id, action: 'pause', name: 'Pause' }); }}
                            disabled={actionLoading === sub.id}
                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                          >
                            Pause
                          </button>
                        )}
                        {sub.status === 'PAUSED' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(sub.id, 'resume'); }}
                            disabled={actionLoading === sub.id}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            Resume
                          </button>
                        )}
                        {(sub.status === 'ACTIVE' || sub.status === 'PAUSED') && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmAction({ id: sub.id, action: 'cancel', name: 'Cancel' }); }}
                            disabled={actionLoading === sub.id}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditShippingDay({ id: sub.id, current: sub.preferredShippingDay }); }}
                          disabled={actionLoading === sub.id}
                          className="px-2 py-1 text-xs bg-charcoal-100 text-charcoal-700 rounded hover:bg-charcoal-200"
                        >
                          Ship Day
                        </button>
                      </div>
                    </td>
```

Make rows clickable to expand:

Change the `<tr>` to:
```tsx
<tr key={sub.id} className="hover:bg-cream-50 cursor-pointer" onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}>
```

Add expanded detail row after each `</tr>`:

```tsx
                  {expandedId === sub.id && (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 bg-cream-50 border-b border-charcoal-100">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-charcoal-700 mb-2">Items</p>
                            {(sub.items as SubscriptionItem[]).map((item, i) => (
                              <p key={i} className="text-charcoal-600">{item.quantity}x {item.name} — {formatPrice(item.unitPrice)}</p>
                            ))}
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal-700 mb-2">Pricing</p>
                            <p className="text-charcoal-600">Subtotal: {formatPrice(sub.subtotal)}</p>
                            <p className="text-charcoal-600">Shipping: {formatPrice(sub.shipping)}</p>
                            <p className="text-charcoal-600">Tax: {formatPrice(sub.tax)}</p>
                            <p className="font-semibold text-charcoal-950">Total: {formatPrice(sub.total)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
```

**Step 3: Add confirmation modal and shipping day modal**

Add before the closing `</div>` of the component (just before the final return's closing div):

```tsx
      {/* Confirm Action Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setConfirmAction(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-charcoal-950 mb-2">{confirmAction.name} Subscription?</h3>
            <p className="text-sm text-charcoal-600 mb-6">
              {confirmAction.action === 'cancel'
                ? 'This will cancel the subscription at the end of the current billing period. This cannot be undone.'
                : 'This will pause the subscription for 30 days. You can resume it at any time.'}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(confirmAction.id, confirmAction.action)}
                disabled={!!actionLoading}
                className={`px-4 py-2 text-sm text-white rounded-lg ${
                  confirmAction.action === 'cancel' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                {actionLoading ? 'Processing...' : confirmAction.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Shipping Day Modal */}
      {editShippingDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditShippingDay(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-charcoal-950 mb-4">Update Shipping Day</h3>
            <div className="space-y-2 mb-6">
              {['1st_tuesday', '2nd_tuesday', '3rd_tuesday', '4th_tuesday'].map(day => (
                <button
                  key={day}
                  onClick={() => handleAction(editShippingDay.id, 'update_shipping_day', { preferredShippingDay: day })}
                  className={`w-full px-4 py-3 text-left rounded-lg border text-sm ${
                    editShippingDay.current === day
                      ? 'border-sunset-500 bg-sunset-50 text-sunset-700 font-medium'
                      : 'border-charcoal-200 hover:bg-charcoal-50 text-charcoal-700'
                  }`}
                >
                  {shippingDayLabels[day]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setEditShippingDay(null)}
              className="w-full px-4 py-2 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
```

**Step 4: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 5: Commit**

```bash
git add app/admin/subscriptions/page.tsx
git commit -m "feat: add subscription actions (pause/resume/cancel/edit ship day) to admin UI

Includes confirmation modals, expandable row details, and shipping day picker.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Create Customer Subscription Self-Service API

**Files:**
- Create: `app/api/customer/subscription/[id]/route.ts`

**Step 1: Create the customer subscription API**

Create `app/api/customer/subscription/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import {
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
} from '@/lib/subscription/stripe';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const subscription = await prisma.retailSubscription.findUnique({
      where: { id: params.id },
    });

    if (!subscription || subscription.customerId !== customer.id) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, preferredShippingDay } = body;

    const subscription = await prisma.retailSubscription.findUnique({
      where: { id: params.id },
    });

    if (!subscription || subscription.customerId !== customer.id) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    switch (action) {
      case 'pause': {
        if (subscription.status !== 'ACTIVE') {
          return NextResponse.json({ error: 'Can only pause active subscriptions' }, { status: 400 });
        }
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await pauseSubscription(subscription.stripeSubscriptionId);
        const pausedUntil = new Date();
        pausedUntil.setDate(pausedUntil.getDate() + 30);
        const updated = await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'PAUSED', pausedUntil },
        });
        return NextResponse.json({ success: true, subscription: updated });
      }

      case 'resume': {
        if (subscription.status !== 'PAUSED') {
          return NextResponse.json({ error: 'Can only resume paused subscriptions' }, { status: 400 });
        }
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await resumeSubscription(subscription.stripeSubscriptionId);
        const updated = await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'ACTIVE', pausedUntil: null },
        });
        return NextResponse.json({ success: true, subscription: updated });
      }

      case 'cancel': {
        if (subscription.status === 'CANCELLED') {
          return NextResponse.json({ error: 'Subscription already cancelled' }, { status: 400 });
        }
        if (!subscription.stripeSubscriptionId) {
          return NextResponse.json({ error: 'No Stripe subscription linked' }, { status: 400 });
        }
        await cancelSubscription(subscription.stripeSubscriptionId);
        const updated = await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { status: 'CANCELLED', cancelledAt: new Date() },
        });
        return NextResponse.json({ success: true, subscription: updated });
      }

      case 'update_shipping_day': {
        const validDays = ['1st_tuesday', '2nd_tuesday', '3rd_tuesday', '4th_tuesday'];
        if (!preferredShippingDay || !validDays.includes(preferredShippingDay)) {
          return NextResponse.json({ error: 'Invalid shipping day' }, { status: 400 });
        }
        const updated = await prisma.retailSubscription.update({
          where: { id: params.id },
          data: { preferredShippingDay },
        });
        return NextResponse.json({ success: true, subscription: updated });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
```

**Step 2: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 3: Commit**

```bash
git add "app/api/customer/subscription/[id]/route.ts"
git commit -m "feat: add customer self-service subscription API (pause/resume/cancel/update ship day)

Validates ownership - customers can only modify their own subscriptions.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: Create Loyalty Points Customer APIs

**Files:**
- Create: `app/api/customer/loyalty/route.ts`
- Create: `app/api/customer/loyalty/redeem/route.ts`

**Step 1: Create loyalty balance/history API**

Create `app/api/customer/loyalty/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

export async function GET() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const account = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!account) {
      return NextResponse.json({
        balance: 0,
        lifetimeEarned: 0,
        lifetimeRedeemed: 0,
        transactions: [],
        canRedeem: false,
        nextRedemptionAt: 200,
      });
    }

    return NextResponse.json({
      balance: account.balance,
      lifetimeEarned: account.lifetimeEarned,
      lifetimeRedeemed: account.lifetimeRedeemed,
      transactions: account.transactions.map(t => ({
        id: t.id,
        type: t.type,
        points: t.points,
        description: t.description,
        createdAt: t.createdAt,
      })),
      canRedeem: account.balance >= 200,
      nextRedemptionAt: Math.max(0, 200 - account.balance),
    });
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return NextResponse.json({ error: 'Failed to fetch loyalty data' }, { status: 500 });
  }
}
```

**Step 2: Create loyalty redemption API**

Create `app/api/customer/loyalty/redeem/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { randomUUID } from 'crypto';

const REDEEM_COST = 200; // points
const REDEEM_VALUE = 500; // $5.00 in cents
const REDEEM_EXPIRY_DAYS = 30;

function generateRedeemCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LOYAL-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const account = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
    });

    if (!account || account.balance < REDEEM_COST) {
      return NextResponse.json(
        { error: `Need at least ${REDEEM_COST} points to redeem. Current balance: ${account?.balance || 0}` },
        { status: 400 }
      );
    }

    // Generate unique code
    let code = generateRedeemCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await prisma.discountCode.findUnique({ where: { code } });
      if (!existing) break;
      code = generateRedeemCode();
      attempts++;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REDEEM_EXPIRY_DAYS);

    // Create discount code and deduct points in a transaction
    const [discountCode] = await prisma.$transaction([
      prisma.discountCode.create({
        data: {
          code,
          name: 'Loyalty Reward - $5 Off',
          description: `Redeemed ${REDEEM_COST} loyalty points`,
          source: 'LOYALTY',
          isActive: true,
          expiresAt,
          maxUsageTotal: 1,
          maxUsagePerEmail: 1,
          rules: {
            create: {
              type: 'FIXED_AMOUNT',
              value: REDEEM_VALUE,
            },
          },
        },
      }),
      prisma.loyaltyAccount.update({
        where: { customerId: customer.id },
        data: {
          balance: { decrement: REDEEM_COST },
          lifetimeRedeemed: { increment: REDEEM_COST },
        },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          loyaltyAccountId: account.id,
          type: 'REDEEM',
          points: -REDEEM_COST,
          description: `Redeemed for $5 discount code: ${code}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      code: discountCode.code,
      value: REDEEM_VALUE,
      expiresAt: discountCode.expiresAt,
      remainingBalance: account.balance - REDEEM_COST,
    });
  } catch (error) {
    console.error('Error redeeming loyalty points:', error);
    return NextResponse.json({ error: 'Failed to redeem points' }, { status: 500 });
  }
}
```

**Step 3: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 4: Commit**

```bash
git add app/api/customer/loyalty/route.ts app/api/customer/loyalty/redeem/route.ts
git commit -m "feat: add loyalty points balance, history, and redemption APIs

200 points = $5 discount code (LOYAL-XXXXXX). 30-day expiry, single use.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8: Create SubscriptionCard Component

**Files:**
- Create: `components/account/SubscriptionCard.tsx`

**Step 1: Create the subscription management card**

Create `components/account/SubscriptionCard.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Calendar, Pause, Play, X, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface SubscriptionData {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
  preferredShippingDay?: string | null;
  pausedUntil?: string | null;
  items: SubscriptionItem[];
  total: number;
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PAST_DUE: 'bg-orange-100 text-orange-700',
};

const shippingDayLabels: Record<string, string> = {
  '1st_tuesday': '1st Tuesday',
  '2nd_tuesday': '2nd Tuesday',
  '3rd_tuesday': '3rd Tuesday',
  '4th_tuesday': '4th Tuesday',
};

interface Props {
  subscription: SubscriptionData;
  onUpdate: () => void;
}

export default function SubscriptionCard({ subscription: sub, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState<'pause' | 'cancel' | null>(null);
  const [showShipDay, setShowShipDay] = useState(false);

  const handleAction = async (action: string, extraData?: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customer/subscription/${sub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extraData }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to update subscription');
        return;
      }
      onUpdate();
    } catch {
      alert('Failed to update subscription');
    } finally {
      setLoading(false);
      setShowConfirm(null);
      setShowShipDay(false);
    }
  };

  return (
    <div className="border border-charcoal-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-cream-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-charcoal-950">{sub.name}</h3>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[sub.status] || 'bg-gray-100 text-gray-600'}`}>
              {sub.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-charcoal-950">{formatPrice(sub.total)}</p>
              <p className="text-xs text-charcoal-500">per {sub.interval.toLowerCase()}</p>
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-charcoal-400" /> : <ChevronDown className="w-4 h-4 text-charcoal-400" />}
          </div>
        </div>

        <div className="text-sm text-charcoal-600">
          {(sub.items as SubscriptionItem[]).map((item, i) => (
            <span key={i}>{i > 0 ? ', ' : ''}{item.quantity}x {item.name}</span>
          ))}
        </div>

        {sub.nextBillingDate && sub.status === 'ACTIVE' && (
          <div className="mt-2 flex items-center gap-2 text-sm text-charcoal-500">
            <Calendar className="w-4 h-4" />
            Next delivery: {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        )}

        {sub.status === 'PAUSED' && sub.pausedUntil && (
          <div className="mt-2 flex items-center gap-2 text-sm text-yellow-600">
            <Pause className="w-4 h-4" />
            Paused until {new Date(sub.pausedUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Expanded Actions */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-charcoal-100 pt-4 space-y-3">
          {/* Shipping Day */}
          {sub.preferredShippingDay && (
            <div className="flex items-center gap-2 text-sm text-charcoal-600">
              <Truck className="w-4 h-4" />
              Ships: {shippingDayLabels[sub.preferredShippingDay] || sub.preferredShippingDay}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {sub.status === 'ACTIVE' && (
              <>
                <button
                  onClick={() => setShowConfirm('pause')}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100"
                >
                  <Pause className="w-3.5 h-3.5" />
                  Pause (30 days)
                </button>
                <button
                  onClick={() => setShowConfirm('cancel')}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </>
            )}
            {sub.status === 'PAUSED' && (
              <button
                onClick={() => handleAction('resume')}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100"
              >
                <Play className="w-3.5 h-3.5" />
                {loading ? 'Resuming...' : 'Resume'}
              </button>
            )}
            {(sub.status === 'ACTIVE' || sub.status === 'PAUSED') && (
              <button
                onClick={() => setShowShipDay(true)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-charcoal-50 text-charcoal-700 border border-charcoal-200 rounded-lg hover:bg-charcoal-100"
              >
                <Truck className="w-3.5 h-3.5" />
                Change Shipping Day
              </button>
            )}
          </div>

          {/* Confirm Pause */}
          {showConfirm === 'pause' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 mb-3">Pause your subscription for 30 days? You can resume anytime.</p>
              <div className="flex gap-2">
                <button onClick={() => handleAction('pause')} disabled={loading} className="px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  {loading ? 'Pausing...' : 'Yes, Pause'}
                </button>
                <button onClick={() => setShowConfirm(null)} className="px-3 py-1.5 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50">
                  Never mind
                </button>
              </div>
            </div>
          )}

          {/* Confirm Cancel */}
          {showConfirm === 'cancel' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 mb-3">Cancel your subscription? It will remain active until the end of this billing period.</p>
              <div className="flex gap-2">
                <button onClick={() => handleAction('cancel')} disabled={loading} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
                  {loading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
                <button onClick={() => setShowConfirm(null)} className="px-3 py-1.5 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50">
                  Keep Subscription
                </button>
              </div>
            </div>
          )}

          {/* Shipping Day Picker */}
          {showShipDay && (
            <div className="bg-charcoal-50 border border-charcoal-200 rounded-lg p-4">
              <p className="text-sm text-charcoal-700 mb-3 font-medium">Pick your shipping Tuesday:</p>
              <div className="grid grid-cols-2 gap-2">
                {['1st_tuesday', '2nd_tuesday', '3rd_tuesday', '4th_tuesday'].map(day => (
                  <button
                    key={day}
                    onClick={() => handleAction('update_shipping_day', { preferredShippingDay: day })}
                    disabled={loading}
                    className={`px-3 py-2 text-sm rounded-lg border ${
                      sub.preferredShippingDay === day
                        ? 'border-sunset-500 bg-sunset-50 text-sunset-700 font-medium'
                        : 'border-charcoal-200 hover:bg-white text-charcoal-700'
                    }`}
                  >
                    {shippingDayLabels[day]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowShipDay(false)}
                className="mt-2 text-sm text-charcoal-500 hover:text-charcoal-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 3: Commit**

```bash
git add components/account/SubscriptionCard.tsx
git commit -m "feat: add SubscriptionCard component for customer self-service

Pause/resume/cancel with confirmations, shipping day picker, expandable details.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: Update Account Page with Subscription Management & Loyalty

**Files:**
- Modify: `app/account/page.tsx`
- Modify: `app/api/customer/me/route.ts`

**Step 1: Update customer/me API to include loyalty data and subscription details**

In `app/api/customer/me/route.ts`, add loyalty data fetch after the wholesale data section (around line 48). Add before the return statement:

```typescript
  // Fetch loyalty data
  let loyaltyData = null;
  try {
    const loyaltyAccount = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
    if (loyaltyAccount) {
      loyaltyData = {
        balance: loyaltyAccount.balance,
        lifetimeEarned: loyaltyAccount.lifetimeEarned,
        lifetimeRedeemed: loyaltyAccount.lifetimeRedeemed,
        canRedeem: loyaltyAccount.balance >= 200,
        nextRedemptionAt: Math.max(0, 200 - loyaltyAccount.balance),
        recentTransactions: loyaltyAccount.transactions.map(t => ({
          id: t.id,
          type: t.type,
          points: t.points,
          description: t.description,
          createdAt: t.createdAt,
        })),
      };
    }
  } catch (loyaltyError) {
    console.error('Failed to fetch loyalty data:', loyaltyError);
  }
```

Update the subscription mapping in the return to include more fields (replace the existing subscriptions map around line 58):

```typescript
      subscriptions: customer.RetailSubscription.map(sub => ({
        id: sub.id,
        name: sub.name,
        status: sub.status,
        interval: sub.interval,
        nextBillingDate: sub.nextBillingDate,
        preferredShippingDay: sub.preferredShippingDay,
        pausedUntil: sub.pausedUntil,
        items: sub.items,
        total: sub.total,
      })),
```

Add loyalty to the response:

```typescript
      ...(loyaltyData && { loyalty: loyaltyData }),
```

**Step 2: Update account page to use SubscriptionCard and show loyalty**

Replace the imports in `app/account/page.tsx`:

```typescript
import { Package, CreditCard, Settings, LogOut, Clock, Truck, Calendar, ExternalLink, Building2, ShoppingBag, Star, Gift, ArrowRight } from 'lucide-react';
import SubscriptionCard from '@/components/account/SubscriptionCard';
```

Update the `Subscription` interface to include new fields:

```typescript
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
```

Add loyalty interfaces:

```typescript
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
```

Add to `CustomerData`:

```typescript
  loyalty?: LoyaltyData;
```

Add loyalty redeem state in the component:

```typescript
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ code: string; expiresAt: string } | null>(null);
```

Add redeem handler:

```typescript
  const handleRedeem = async () => {
    setRedeemLoading(true);
    try {
      const res = await fetch('/api/customer/loyalty/redeem', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to redeem points');
        return;
      }
      setRedeemResult({ code: data.code, expiresAt: data.expiresAt });
      fetchCustomer(); // Refresh data
    } catch {
      alert('Failed to redeem points');
    } finally {
      setRedeemLoading(false);
    }
  };
```

Replace the subscriptions section (lines ~153-213) to show ALL subscriptions (not just active) and use SubscriptionCard:

```tsx
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
                  <Package className="w-5 h-5 text-sunset-600" />
                  My Subscriptions
                </h2>
                {customer.stripeCustomerId && (
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="text-sm text-charcoal-500 hover:text-charcoal-700 font-medium flex items-center gap-1"
                  >
                    <CreditCard className="w-4 h-4" />
                    {portalLoading ? 'Opening...' : 'Manage Billing'}
                  </button>
                )}
              </div>

              {customer.subscriptions.length === 0 ? (
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
                  {customer.subscriptions.map(sub => (
                    <SubscriptionCard
                      key={sub.id}
                      subscription={sub}
                      onUpdate={fetchCustomer}
                    />
                  ))}
                </div>
              )}
            </div>
```

Add loyalty section after subscriptions, before "Recent Orders":

```tsx
            {/* Loyalty Points */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-sunset-600" />
                Loyalty Points
              </h2>

              {!customer.loyalty ? (
                <div className="text-center py-6">
                  <p className="text-charcoal-500 mb-2">Start earning points with every order!</p>
                  <p className="text-sm text-charcoal-400">Earn 2 points per $1 spent. Redeem 200 points for $5 off.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-charcoal-950">{customer.loyalty.balance.toLocaleString()}</p>
                      <p className="text-sm text-charcoal-500">points available</p>
                    </div>
                    {customer.loyalty.canRedeem ? (
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
                        <p className="text-sm text-charcoal-500">{customer.loyalty.nextRedemptionAt} more to redeem</p>
                        <div className="w-32 bg-charcoal-100 rounded-full h-2 mt-1">
                          <div
                            className="bg-sunset-500 rounded-full h-2 transition-all"
                            style={{ width: `${Math.min(100, ((200 - customer.loyalty.nextRedemptionAt) / 200) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {redeemResult && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-green-800 mb-1">Your discount code:</p>
                      <code className="text-lg font-bold text-green-700">{redeemResult.code}</code>
                      <p className="text-xs text-green-600 mt-1">
                        Valid until {new Date(redeemResult.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  )}

                  {customer.loyalty.recentTransactions.length > 0 && (
                    <div className="border-t border-charcoal-100 pt-3 mt-3">
                      <p className="text-sm font-semibold text-charcoal-700 mb-2">Recent Activity</p>
                      <div className="space-y-2">
                        {customer.loyalty.recentTransactions.map(tx => (
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
                    Lifetime earned: {customer.loyalty.lifetimeEarned.toLocaleString()} pts &bull; Redeemed: {customer.loyalty.lifetimeRedeemed.toLocaleString()} pts
                  </div>
                </>
              )}
            </div>
```

**Step 3: Update `activeSubscriptions` filter to show all non-cancelled for the sidebar count**

Change the `activeSubscriptions` variable:

```typescript
  const activeSubscriptions = customer.subscriptions.filter(s => s.status !== 'CANCELLED');
```

**Step 4: Verify compilation**

Run: `npx tsc --noEmit 2>&1 | head -5`

**Step 5: Commit**

```bash
git add app/account/page.tsx app/api/customer/me/route.ts
git commit -m "feat: add subscription self-service and loyalty points to account page

Customers can pause/resume/cancel subs, change shipping day.
Loyalty points display with balance, progress bar, redemption, and transaction history.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 10: Final Verification

**Step 1: Run full TypeScript check**

Run: `npx tsc --noEmit`

Expected: 0 errors (or only pre-existing stale LSP errors).

**Step 2: Run dev server to verify pages load**

Run: `npx next build 2>&1 | tail -20`

Expected: Build succeeds with all pages compiled.

**Step 3: Commit any fixes if needed, then final summary commit if multiple fixes were needed**

No commit needed if everything passes.
