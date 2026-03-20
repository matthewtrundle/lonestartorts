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

    const { items, interval, intervalCount, preferredShippingDay } = await request.json();

    if (!items?.length) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
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
    const stripeInterval = (interval === 'biweekly' || interval === 'weekly') ? 'week' : 'month';
    const stripeIntervalCount = interval === 'biweekly' ? 2 : interval === 'quarterly' ? 3 : intervalCount || 1;

    const result = await createRetailSubscription({
      stripeCustomerId: customer.stripeCustomerId,
      items: validatedItems,
      interval: stripeInterval,
      intervalCount: stripeIntervalCount,
      shipping: shipping + tax, // Include tax in Stripe price
    });

    // Save to database
    const subscription = await prisma.retailSubscription.create({
      data: {
        customerId: customer.id,
        stripeSubscriptionId: result.subscription.id,
        stripePriceId: result.price.id,
        stripeProductId: result.product.id,
        name: `${interval === 'biweekly' ? 'Biweekly' : interval === 'weekly' ? 'Weekly' : interval === 'quarterly' ? 'Quarterly' : 'Monthly'} Tortilla Subscription`,
        status: 'PAUSED', // Starts as PAUSED until first payment confirmed via webhook
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
        preferredShippingDay: preferredShippingDay || null,
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
