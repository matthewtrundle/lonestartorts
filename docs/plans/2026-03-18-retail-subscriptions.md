# Retail Subscription System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a retail subscription system where customers can subscribe to recurring tortilla deliveries, with a customer account portal for managing subscriptions, and Stripe Customer Portal handling billing/payment management.

**Architecture:** Three-tier account model: Guest checkout (unchanged), Subscription accounts (email+password login, Stripe Subscriptions with automatic card charging), Wholesale accounts (admin-managed, invoice-based). Customer auth uses the same cookie-based pattern as admin auth but with a separate `customer_auth` cookie and Customer model. Stripe Customer Portal handles subscription modifications to minimize custom UI.

**Tech Stack:** Next.js 14 App Router, Prisma, Stripe Subscriptions (card-based `charge_automatically`), Stripe Customer Portal, bcryptjs, cookie-based auth tokens.

---

## Task 1: Database Schema — Add Auth Fields to Customer + RetailSubscription Model

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add password and auth fields to Customer model**

In `prisma/schema.prisma`, update the Customer model (around line 32):

```prisma
model Customer {
  id              String    @id
  clerkUserId     String    @unique
  email           String    @unique
  passwordHash    String?
  firstName       String?
  lastName        String?
  stripeCustomerId String?  @unique
  lastLoginAt     DateTime?
  signupSource    String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime
  privateMetadata Json?
  publicMetadata  Json?
  Address         Address[]
  Order           Order[]
  RetailSubscription RetailSubscription[]

  @@index([clerkUserId])
  @@index([email])
  @@index([stripeCustomerId])
}
```

**Step 2: Add RetailSubscription model**

Add after the Customer model:

```prisma
model RetailSubscription {
  id                   String             @id @default(uuid())
  customerId           String

  // Stripe references
  stripeSubscriptionId String?            @unique
  stripePriceId        String?
  stripeProductId      String?

  // Subscription details
  name                 String             // e.g., "Monthly Tortilla Box"
  status               SubscriptionStatus @default(ACTIVE)

  // Billing cycle
  interval             BillingInterval    @default(MONTHLY)
  intervalCount        Int                @default(1)

  // Dates
  nextBillingDate      DateTime?
  lastBilledAt         DateTime?
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?

  // Items (JSON: array of {sku, name, quantity, unitPrice})
  items                Json

  // Totals in cents
  subtotal             Int
  shipping             Int                @default(0)
  tax                  Int                @default(0)
  total                Int

  // Management
  pausedUntil          DateTime?
  cancelledAt          DateTime?
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  // Relations
  customer             Customer           @relation(fields: [customerId], references: [id])

  @@index([customerId])
  @@index([stripeSubscriptionId])
  @@index([status])
}
```

**Step 3: Run migration**

Run: `npx prisma migrate dev --name add-retail-subscriptions`
Expected: Migration succeeds, new table created, Customer model updated.

**Step 4: Verify schema**

Run: `npx prisma generate`
Expected: Prisma client regenerated successfully.

**Step 5: Commit**

```bash
git add prisma/
git commit -m "feat: add RetailSubscription model and Customer auth fields"
```

---

## Task 2: Customer Auth Library

**Files:**
- Create: `lib/customer-auth.ts`

**Step 1: Create customer auth module**

```typescript
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'customer_auth';
const TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days for customers (longer than admin 24h)

interface CustomerToken {
  customerId: string;
  email: string;
  timestamp: number;
}

export function createCustomerToken(customerId: string, email: string): string {
  const payload: CustomerToken = { customerId, email, timestamp: Date.now() };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function validateCustomerToken(token: string): CustomerToken | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString()) as CustomerToken;
    const age = (Date.now() - payload.timestamp) / 1000;
    if (age > TOKEN_MAX_AGE) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = validateCustomerToken(token);
  if (!payload) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: payload.customerId },
    include: {
      RetailSubscription: true,
      Order: { orderBy: { createdAt: 'desc' }, take: 10 },
      Address: true,
    },
  });

  return customer;
}

export async function setCustomerAuthCookie(customerId: string, email: string) {
  const token = createCustomerToken(customerId, email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function clearCustomerAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
```

**Step 2: Commit**

```bash
git add lib/customer-auth.ts
git commit -m "feat: add customer authentication library"
```

---

## Task 3: Customer Register & Login API Routes

**Files:**
- Create: `app/api/customer/register/route.ts`
- Create: `app/api/customer/login/route.ts`
- Create: `app/api/customer/logout/route.ts`
- Create: `app/api/customer/me/route.ts`

**Step 1: Create register route**

`app/api/customer/register/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { hashPassword, setCustomerAuthCookie } from '@/lib/customer-auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if customer exists
    const existing = await prisma.customer.findUnique({ where: { email } });

    if (existing?.passwordHash) {
      return NextResponse.json({ error: 'An account with this email already exists. Please log in.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email,
      name: [firstName, lastName].filter(Boolean).join(' ') || undefined,
      metadata: { type: 'retail_subscription' },
    });

    let customer;
    if (existing) {
      // Upgrade guest account to full account
      customer = await prisma.customer.update({
        where: { email },
        data: {
          passwordHash,
          firstName: firstName || existing.firstName,
          lastName: lastName || existing.lastName,
          stripeCustomerId: stripeCustomer.id,
          signupSource: existing.signupSource === 'checkout' ? 'checkout_upgraded' : 'subscription',
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          id: randomUUID(),
          clerkUserId: `sub_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          email,
          passwordHash,
          firstName: firstName || null,
          lastName: lastName || null,
          stripeCustomerId: stripeCustomer.id,
          signupSource: 'subscription',
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    await setCustomerAuthCookie(customer.id, customer.email);

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
```

**Step 2: Create login route**

`app/api/customer/login/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, setCustomerAuthCookie } from '@/lib/customer-auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const customer = await prisma.customer.findUnique({ where: { email } });

    if (!customer || !customer.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await prisma.customer.update({
      where: { id: customer.id },
      data: { lastLoginAt: new Date(), updatedAt: new Date() },
    });

    await setCustomerAuthCookie(customer.id, customer.email);

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
```

**Step 3: Create logout route**

`app/api/customer/logout/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { clearCustomerAuthCookie } from '@/lib/customer-auth';

export async function POST() {
  await clearCustomerAuthCookie();
  return NextResponse.json({ success: true });
}
```

**Step 4: Create me route (get current customer)**

`app/api/customer/me/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

export async function GET() {
  const customer = await getAuthenticatedCustomer();

  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({
    customer: {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      stripeCustomerId: customer.stripeCustomerId,
      subscriptions: customer.RetailSubscription.map(sub => ({
        id: sub.id,
        name: sub.name,
        status: sub.status,
        interval: sub.interval,
        nextBillingDate: sub.nextBillingDate,
        items: sub.items,
        total: sub.total,
      })),
      recentOrders: customer.Order.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.orderStatus,
        total: order.total,
        createdAt: order.createdAt,
      })),
    },
  });
}
```

**Step 5: Commit**

```bash
git add app/api/customer/
git commit -m "feat: add customer register, login, logout, and me API routes"
```

---

## Task 4: Stripe Subscription Helpers

**Files:**
- Create: `lib/subscription/stripe.ts`

**Step 1: Create retail subscription Stripe helpers**

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number; // cents
}

interface CreateSubscriptionParams {
  stripeCustomerId: string;
  items: SubscriptionItem[];
  interval: 'week' | 'month';
  intervalCount: number;
  shipping: number; // cents
  paymentMethodId: string;
}

export async function createRetailSubscription({
  stripeCustomerId,
  items,
  interval,
  intervalCount,
  shipping,
  paymentMethodId,
}: CreateSubscriptionParams) {
  // Attach payment method to customer
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: stripeCustomerId,
  });

  // Set as default payment method
  await stripe.customers.update(stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  // Calculate total per billing cycle
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const total = subtotal + shipping;

  // Create a product for this subscription bundle
  const product = await stripe.products.create({
    name: `Lonestar Tortillas - ${interval === 'week' ? 'Weekly' : 'Monthly'} Subscription`,
    metadata: {
      type: 'retail_subscription',
      items: JSON.stringify(items.map(i => ({ sku: i.sku, qty: i.quantity }))),
    },
  });

  // Create a recurring price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: total,
    currency: 'usd',
    recurring: {
      interval,
      interval_count: intervalCount,
    },
  });

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: price.id }],
    collection_method: 'charge_automatically',
    payment_behavior: 'default_incomplete',
    payment_settings: {
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      type: 'retail',
      items: JSON.stringify(items),
      shipping: String(shipping),
    },
  });

  return {
    subscription,
    product,
    price,
    clientSecret: (
      (subscription.latest_invoice as Stripe.Invoice)
        ?.payment_intent as Stripe.PaymentIntent
    )?.client_secret,
  };
}

export async function createCustomerPortalSession(
  stripeCustomerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });
  return session;
}

export async function getCustomerSubscriptions(stripeCustomerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: 'all',
    limit: 10,
    expand: ['data.default_payment_method'],
  });
  return subscriptions.data;
}

export function mapStripeIntervalToDb(interval: string): 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY' {
  switch (interval) {
    case 'week': return 'WEEKLY';
    case 'month': return 'MONTHLY';
    default: return 'MONTHLY';
  }
}
```

**Step 2: Commit**

```bash
git add lib/subscription/
git commit -m "feat: add retail subscription Stripe helpers"
```

---

## Task 5: Subscribe API Route (Create Subscription)

**Files:**
- Create: `app/api/customer/subscribe/route.ts`

**Step 1: Create subscribe endpoint**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { createRetailSubscription, mapStripeIntervalToDb } from '@/lib/subscription/stripe';
import { getProductBySku } from '@/lib/products';

const TAX_RATE = 0.0825;

export async function POST(request: NextRequest) {
  try {
    const customer = await getAuthenticatedCustomer();
    if (!customer) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!customer.stripeCustomerId) {
      return NextResponse.json({ error: 'No payment profile found' }, { status: 400 });
    }

    const { items, interval, intervalCount, paymentMethodId } = await request.json();

    if (!items?.length || !paymentMethodId) {
      return NextResponse.json({ error: 'Items and payment method are required' }, { status: 400 });
    }

    // Validate items against product catalog
    const validatedItems = items.map((item: { sku: string; quantity: number }) => {
      const product = getProductBySku(item.sku);
      if (!product) throw new Error(`Invalid product: ${item.sku}`);
      return {
        sku: product.sku,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    const subtotal = validatedItems.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice,
      0
    );
    const shipping = 0; // Free shipping
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    // Create Stripe subscription
    const stripeInterval = interval === 'biweekly' ? 'week' : interval === 'weekly' ? 'week' : 'month';
    const stripeIntervalCount = interval === 'biweekly' ? 2 : intervalCount || 1;

    const result = await createRetailSubscription({
      stripeCustomerId: customer.stripeCustomerId,
      items: validatedItems,
      interval: stripeInterval,
      intervalCount: stripeIntervalCount,
      shipping: shipping + tax, // Include tax in Stripe price
      paymentMethodId,
    });

    // Save to database
    const subscription = await prisma.retailSubscription.create({
      data: {
        customerId: customer.id,
        stripeSubscriptionId: result.subscription.id,
        stripePriceId: result.price.id,
        stripeProductId: result.product.id,
        name: `${interval === 'biweekly' ? 'Biweekly' : interval === 'weekly' ? 'Weekly' : 'Monthly'} Tortilla Subscription`,
        status: 'ACTIVE',
        interval: mapStripeIntervalToDb(interval),
        intervalCount: stripeIntervalCount,
        nextBillingDate: new Date(result.subscription.current_period_end * 1000),
        currentPeriodStart: new Date(result.subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(result.subscription.current_period_end * 1000),
        items: validatedItems,
        subtotal,
        shipping,
        tax,
        total,
      },
    });

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        clientSecret: result.clientSecret,
      },
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add app/api/customer/subscribe/
git commit -m "feat: add subscription creation API endpoint"
```

---

## Task 6: Stripe Customer Portal API Route

**Files:**
- Create: `app/api/customer/portal/route.ts`

**Step 1: Create portal session endpoint**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { createCustomerPortalSession } from '@/lib/subscription/stripe';

export async function POST(request: NextRequest) {
  try {
    const customer = await getAuthenticatedCustomer();
    if (!customer) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!customer.stripeCustomerId) {
      return NextResponse.json({ error: 'No payment profile found' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://lonestartortillas.com';
    const session = await createCustomerPortalSession(
      customer.stripeCustomerId,
      `${origin}/account`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add app/api/customer/portal/
git commit -m "feat: add Stripe Customer Portal session endpoint"
```

---

## Task 7: Webhook Handler — Add Retail Subscription Events

**Files:**
- Modify: `app/api/webhook/route.ts`

**Step 1: Add retail subscription webhook handling**

Add these cases to the existing switch statement in the webhook handler, alongside the existing wholesale subscription handling:

```typescript
// Inside the existing switch(event.type) block, add to the
// 'customer.subscription.updated' case:

case 'customer.subscription.updated': {
  const subscription = event.data.object as Stripe.Subscription;

  // Check if it's a retail subscription
  const retailSub = await prisma.retailSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (retailSub) {
    // Handle retail subscription update
    const statusMap: Record<string, string> = {
      active: 'ACTIVE',
      past_due: 'PAST_DUE',
      canceled: 'CANCELLED',
      paused: 'PAUSED',
    };

    await prisma.retailSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: (statusMap[subscription.status] || 'ACTIVE') as any,
        nextBillingDate: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null,
        currentPeriodStart: subscription.current_period_start
          ? new Date(subscription.current_period_start * 1000)
          : null,
        currentPeriodEnd: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null,
      },
    });
    break;
  }

  // Existing wholesale subscription handling follows...
}

case 'customer.subscription.deleted': {
  const subscription = event.data.object as Stripe.Subscription;

  const retailSub = await prisma.retailSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (retailSub) {
    await prisma.retailSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });
    break;
  }

  // Existing wholesale subscription handling follows...
}
```

Also handle `invoice.paid` for retail subscription renewals — create an Order record each time:

```typescript
// Inside the 'invoice.paid' case, add before the existing wholesale logic:

case 'invoice.paid': {
  const invoice = event.data.object as Stripe.Invoice;

  // Check if this is a retail subscription invoice
  if (invoice.subscription) {
    const retailSub = await prisma.retailSubscription.findFirst({
      where: { stripeSubscriptionId: invoice.subscription as string },
      include: { customer: { include: { Address: true } } },
    });

    if (retailSub) {
      // Create an order for this billing cycle
      const orderNumber = `LST-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
      const items = retailSub.items as Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
      const shippingAddress = retailSub.customer.Address[0];

      await prisma.order.create({
        data: {
          id: randomUUID(),
          orderNumber,
          customerId: retailSub.customerId,
          email: retailSub.customer.email,
          stripePaymentId: invoice.payment_intent as string,
          subtotal: retailSub.subtotal,
          shipping: retailSub.shipping,
          tax: retailSub.tax,
          total: retailSub.total,
          paymentStatus: 'SUCCEEDED',
          orderStatus: 'PROCESSING',
          shippingName: [retailSub.customer.firstName, retailSub.customer.lastName].filter(Boolean).join(' '),
          shippingAddress1: shippingAddress?.address1 || '',
          shippingCity: shippingAddress?.city || '',
          shippingState: shippingAddress?.state || '',
          shippingZip: shippingAddress?.zip || '',
          shippingCountry: shippingAddress?.country || 'US',
          createdAt: new Date(),
          updatedAt: new Date(),
          items: {
            create: items.map(item => ({
              id: randomUUID(),
              sku: item.sku,
              name: item.name,
              quantity: item.quantity,
              price: item.unitPrice,
            })),
          },
        },
      });

      await prisma.retailSubscription.update({
        where: { id: retailSub.id },
        data: { lastBilledAt: new Date() },
      });

      // TODO: Send subscription renewal confirmation email
      break;
    }
  }

  // Existing wholesale invoice.paid handling follows...
}
```

**Step 2: Commit**

```bash
git add app/api/webhook/route.ts
git commit -m "feat: add retail subscription webhook handling for renewals and status changes"
```

---

## Task 8: Customer Login Page

**Files:**
- Create: `app/account/login/page.tsx`

**Step 1: Create login page following admin login pattern**

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/account');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-7 h-7 text-sunset-600" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-950">Welcome Back</h1>
            <p className="text-charcoal-600 mt-1">Sign in to manage your subscription</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-charcoal-600">
              Don&apos;t have an account?{' '}
              <Link href="/subscribe" className="text-sunset-600 font-medium hover:text-sunset-700">
                Start a subscription
              </Link>
            </p>
            <p className="text-sm text-charcoal-500">
              <Link href="/track" className="hover:text-charcoal-700">
                Just tracking an order? Use our order tracker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/account/login/
git commit -m "feat: add customer login page"
```

---

## Task 9: Customer Account Dashboard Page

**Files:**
- Create: `app/account/page.tsx`

**Step 1: Create account dashboard**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, CreditCard, Settings, LogOut, Clock, CheckCircle, Truck, Calendar, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
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

interface CustomerData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  stripeCustomerId: string | null;
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
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

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

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
      alert('Failed to open subscription management. Please try again.');
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

  const activeSubscriptions = customer.subscriptions.filter(s => s.status === 'ACTIVE');

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Subscriptions */}
          <div className="md:col-span-2 space-y-6">
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
                    className="text-sm text-sunset-600 hover:text-sunset-700 font-medium flex items-center gap-1"
                  >
                    <Settings className="w-4 h-4" />
                    {portalLoading ? 'Opening...' : 'Manage'}
                  </button>
                )}
              </div>

              {activeSubscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-charcoal-500 mb-4">No active subscriptions</p>
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                  >
                    Start a Subscription
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSubscriptions.map(sub => (
                    <div key={sub.id} className="border border-charcoal-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-charcoal-950">{sub.name}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${statusColors[sub.status] || 'bg-gray-100 text-gray-600'}`}>
                            {sub.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-charcoal-950">{formatPrice(sub.total)}</p>
                          <p className="text-xs text-charcoal-500">per {sub.interval.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="text-sm text-charcoal-600 space-y-1">
                        {(sub.items as Array<{ name: string; quantity: number }>).map((item, i) => (
                          <p key={i}>{item.quantity}x {item.name}</p>
                        ))}
                      </div>
                      {sub.nextBillingDate && (
                        <div className="mt-3 pt-3 border-t border-charcoal-100 flex items-center gap-2 text-sm text-charcoal-500">
                          <Calendar className="w-4 h-4" />
                          Next delivery: {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-sunset-600" />
                Recent Orders
              </h2>

              {customer.recentOrders.length === 0 ? (
                <p className="text-charcoal-500 py-4 text-center">No orders yet</p>
              ) : (
                <div className="divide-y divide-charcoal-100">
                  {customer.recentOrders.map(order => (
                    <div key={order.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                        <p className="text-sm text-charcoal-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                        <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-4">Quick Actions</h2>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-3">Need Help?</h2>
              <div className="space-y-2 text-sm">
                <a href="sms:+17372280037" className="block text-charcoal-600 hover:text-sunset-600">
                  Text us: (737) 228-0037
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

**Step 2: Commit**

```bash
git add app/account/page.tsx
git commit -m "feat: add customer account dashboard with subscription management"
```

---

## Task 10: Subscribe Page (Product Selection + Checkout)

**Files:**
- Create: `app/subscribe/page.tsx`

**Step 1: Create subscription landing/signup page**

This is the main entry point — product selection, frequency picker, account creation, and payment in one flow. This is a large component (will be the main subscription UX).

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Minus, Plus, Package, Truck, Calendar, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { products, formatPrice as formatPriceFn } from '@/lib/products';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Filter to subscribable products (non-bundle, non-wholesale)
const subscribableProducts = products.filter(
  p => !p.bundleOnly && !p.sku.startsWith('WHOLESALE-')
);

const frequencies = [
  { id: 'biweekly', label: 'Every 2 Weeks', description: 'For tortilla-lovers who go through packs fast' },
  { id: 'monthly', label: 'Monthly', description: 'The most popular choice' },
  { id: 'quarterly', label: 'Every 3 Months', description: 'Stock up and save on shipping' },
];

type Step = 'products' | 'frequency' | 'account' | 'payment';

interface SelectedItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export default function SubscribePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('products');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [frequency, setFrequency] = useState('monthly');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Check if already logged in
    fetch('/api/customer/me').then(res => {
      if (res.ok) setIsLoggedIn(true);
    });
  }, []);

  const addItem = (product: typeof subscribableProducts[0]) => {
    const existing = selectedItems.find(i => i.sku === product.sku);
    if (existing) {
      setSelectedItems(selectedItems.map(i =>
        i.sku === product.sku ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, {
        sku: product.sku,
        name: product.name,
        quantity: 1,
        unitPrice: product.price,
        image: product.image,
      }]);
    }
  };

  const updateQuantity = (sku: string, delta: number) => {
    setSelectedItems(selectedItems
      .map(i => i.sku === sku ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
      .filter(i => i.quantity > 0)
    );
  };

  const subtotal = selectedItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const tax = Math.round(subtotal * 0.0825);
  const total = subtotal + tax;

  const handleAccountStep = async () => {
    if (isLoggedIn) {
      // Already logged in, skip to payment
      await createSubscription();
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Try to register
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Account exists, try login
        const loginRes = await fetch('/api/customer/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) {
          const loginData = await loginRes.json();
          setError(loginData.error || 'Account exists but login failed. Check your password.');
          return;
        }
      } else if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      setIsLoggedIn(true);
      await createSubscription();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async () => {
    setLoading(true);
    setError('');

    try {
      // For now, we'll use Stripe Checkout for the initial subscription
      // This redirects to Stripe's hosted page for card collection
      const res = await fetch('/api/customer/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems.map(i => ({ sku: i.sku, quantity: i.quantity })),
          interval: frequency,
          intervalCount: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create subscription');
        return;
      }

      if (data.subscription?.clientSecret) {
        setClientSecret(data.subscription.clientSecret);
        setStep('payment');
      }
    } catch {
      setError('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Never Run Out of Tortillas
          </h1>
          <p className="text-xl text-charcoal-300 max-w-2xl mx-auto">
            Subscribe and get authentic H-E-B tortillas delivered on your schedule. Free shipping, cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sunset-500" />
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sunset-500" />
              Flexible Schedule
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sunset-500" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          {(['products', 'frequency', 'account', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s ? 'bg-sunset-600 text-white' :
                (['products', 'frequency', 'account', 'payment'].indexOf(step) > i) ? 'bg-green-500 text-white' :
                'bg-charcoal-200 text-charcoal-500'
              }`}>
                {(['products', 'frequency', 'account', 'payment'].indexOf(step) > i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:inline ${step === s ? 'text-charcoal-950 font-medium' : 'text-charcoal-500'}`}>
                {s === 'products' ? 'Choose Items' : s === 'frequency' ? 'Schedule' : s === 'account' ? 'Account' : 'Payment'}
              </span>
              {i < 3 && <div className="w-8 h-px bg-charcoal-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Product Selection */}
        {step === 'products' && (
          <div>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Choose Your Tortillas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscribableProducts.filter(p => p.productType === 'tortilla').map(product => {
                const selected = selectedItems.find(i => i.sku === product.sku);
                return (
                  <div key={product.sku} className={`bg-white rounded-xl p-4 border-2 transition-colors ${selected ? 'border-sunset-500' : 'border-transparent shadow-soft'}`}>
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-charcoal-50">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-charcoal-950 text-sm">{product.name}</h3>
                    {product.tortillaCount > 0 && (
                      <p className="text-xs text-charcoal-500">{product.tortillaCount} count</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-charcoal-950">{formatPriceFn(product.price)}</span>
                      {selected ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(product.sku, -1)} className="w-8 h-8 rounded-full bg-charcoal-100 flex items-center justify-center hover:bg-charcoal-200">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-6 text-center">{selected.quantity}</span>
                          <button onClick={() => updateQuantity(product.sku, 1)} className="w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center hover:bg-sunset-200 text-sunset-700">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(product)}
                          className="px-3 py-1.5 bg-sunset-600 text-white rounded-lg text-sm font-medium hover:bg-sunset-700"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sauces, Salsas, Seasonings as add-ons */}
            <h3 className="text-lg font-bold text-charcoal-950 mt-10 mb-4">Add Extras</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {subscribableProducts.filter(p => p.productType !== 'tortilla').map(product => {
                const selected = selectedItems.find(i => i.sku === product.sku);
                return (
                  <div key={product.sku} className={`bg-white rounded-lg p-3 border-2 transition-colors ${selected ? 'border-sunset-500' : 'border-transparent shadow-soft'}`}>
                    <h4 className="font-medium text-charcoal-950 text-sm">{product.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold">{formatPriceFn(product.price)}</span>
                      {selected ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(product.sku, -1)} className="w-6 h-6 rounded-full bg-charcoal-100 flex items-center justify-center text-xs">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{selected.quantity}</span>
                          <button onClick={() => updateQuantity(product.sku, 1)} className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center text-xs text-sunset-700">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addItem(product)} className="text-xs px-2 py-1 bg-sunset-600 text-white rounded font-medium hover:bg-sunset-700">
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary & Continue */}
            {selectedItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal-200 shadow-xl p-4 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <div>
                    <p className="text-sm text-charcoal-600">{selectedItems.reduce((sum, i) => sum + i.quantity, 0)} items</p>
                    <p className="text-lg font-bold text-charcoal-950">{formatPriceFn(subtotal)}/delivery</p>
                  </div>
                  <button
                    onClick={() => setStep('frequency')}
                    className="px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2"
                  >
                    Choose Schedule <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Frequency Selection */}
        {step === 'frequency' && (
          <div>
            <button onClick={() => setStep('products')} className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to products
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">How Often?</h2>
            <div className="space-y-3 max-w-lg">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-colors ${
                    frequency === freq.id ? 'border-sunset-500 bg-sunset-50' : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-charcoal-950">{freq.label}</p>
                      <p className="text-sm text-charcoal-500 mt-0.5">{freq.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      frequency === freq.id ? 'border-sunset-500 bg-sunset-500' : 'border-charcoal-300'
                    }`}>
                      {frequency === freq.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white rounded-xl shadow-soft p-6 max-w-lg">
              <h3 className="font-semibold text-charcoal-950 mb-3">Your Subscription</h3>
              <div className="space-y-2 text-sm">
                {selectedItems.map(item => (
                  <div key={item.sku} className="flex justify-between">
                    <span className="text-charcoal-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium">{formatPriceFn(item.quantity * item.unitPrice)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-charcoal-100 flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-medium">{formatPriceFn(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Tax (8.25%)</span>
                  <span className="font-medium">{formatPriceFn(tax)}</span>
                </div>
                <div className="pt-2 border-t border-charcoal-200 flex justify-between text-base">
                  <span className="font-bold text-charcoal-950">Total per delivery</span>
                  <span className="font-bold text-sunset-600">{formatPriceFn(total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(isLoggedIn ? 'payment' : 'account')}
              className="mt-6 px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2"
            >
              {isLoggedIn ? 'Continue to Payment' : 'Create Account'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 3: Account Creation */}
        {step === 'account' && !isLoggedIn && (
          <div>
            <button onClick={() => setStep('frequency')} className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2">Create Your Account</h2>
            <p className="text-charcoal-600 mb-6">You&apos;ll use this to manage your subscription, track orders, and update preferences.</p>

            <div className="max-w-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleAccountStep}
                disabled={loading || !email || !password}
                className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Setting up...' : 'Continue to Payment'} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-charcoal-500">
                Already have an account?{' '}
                <Link href="/account/login" className="text-sunset-600 font-medium">Sign in</Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Payment (Stripe Elements) */}
        {step === 'payment' && clientSecret && (
          <div>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Payment Details</h2>
            <div className="max-w-lg">
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <PaymentForm
                  onSuccess={() => router.push('/account?subscribed=true')}
                  onError={(msg) => setError(msg)}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentForm({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account?subscribed=true`,
      },
    });

    if (error) {
      onError(error.message || 'Payment failed');
    } else {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Start Subscription'}
      </button>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add app/subscribe/
git commit -m "feat: add subscription signup page with product selection, frequency picker, and Stripe payment"
```

---

## Task 11: Add Navigation Links

**Files:**
- Modify: `components/layout/HeaderWrapper.tsx` or relevant nav component
- Modify: `components/layout/Footer.tsx`

**Step 1: Add "Subscribe" and "Account" links to header navigation**

Find the navigation links in the header component and add:
- "Subscribe" link pointing to `/subscribe`
- "Account" link pointing to `/account` (or `/account/login` if not authenticated)

**Step 2: Add "My Account" and "Subscribe" links to footer**

In the Footer component, add links under the appropriate section:
- Under "Shop": Add "Subscribe & Save" → `/subscribe`
- Under "Support": Add "My Account" → `/account`

**Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: add subscription and account navigation links"
```

---

## Task 12: Configure Stripe Customer Portal

**Files:**
- This is a Stripe Dashboard configuration task, not a code task

**Step 1: Configure in Stripe Dashboard**

Go to Stripe Dashboard → Settings → Customer Portal and enable:
- Subscription cancellation (at period end)
- Subscription pausing (up to 3 months)
- Payment method updating
- Invoice history viewing

**Step 2: Document the configuration**

Add a note in the plan or project docs that the Stripe Customer Portal needs to be configured in the Stripe Dashboard for the feature to work.

---

## Task 13: Integration Testing

**Step 1: Test registration flow**
- Navigate to `/subscribe`
- Select products, choose frequency
- Create account with email/password
- Verify customer created in database with `stripeCustomerId`

**Step 2: Test login flow**
- Navigate to `/account/login`
- Log in with created account
- Verify redirect to `/account` dashboard

**Step 3: Test subscription creation**
- Complete full subscribe flow with Stripe test card (4242 4242 4242 4242)
- Verify `RetailSubscription` record created in database
- Verify Stripe subscription created

**Step 4: Test account dashboard**
- Log in and verify subscriptions display
- Verify recent orders display
- Test "Manage Subscription" button opens Stripe Customer Portal

**Step 5: Test webhook handling**
- Use Stripe CLI to trigger `customer.subscription.updated` event
- Verify `RetailSubscription` status updates in database
- Trigger `invoice.paid` event and verify Order record created

**Step 6: Commit any test fixes**

```bash
git commit -m "fix: integration test fixes for retail subscriptions"
```

---

## Summary of All Files

### New Files (10):
1. `lib/customer-auth.ts` — Customer authentication library
2. `lib/subscription/stripe.ts` — Retail subscription Stripe helpers
3. `app/api/customer/register/route.ts` — Registration endpoint
4. `app/api/customer/login/route.ts` — Login endpoint
5. `app/api/customer/logout/route.ts` — Logout endpoint
6. `app/api/customer/me/route.ts` — Current customer endpoint
7. `app/api/customer/subscribe/route.ts` — Create subscription endpoint
8. `app/api/customer/portal/route.ts` — Stripe Customer Portal session endpoint
9. `app/account/login/page.tsx` — Customer login page
10. `app/account/page.tsx` — Customer account dashboard
11. `app/subscribe/page.tsx` — Subscription signup flow

### Modified Files (3):
1. `prisma/schema.prisma` — Add RetailSubscription model, Customer auth fields
2. `app/api/webhook/route.ts` — Add retail subscription event handling
3. Navigation components (Header, Footer) — Add subscribe/account links
