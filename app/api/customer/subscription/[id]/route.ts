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
