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
