import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import {
  ensureOrderForPaidInvoice,
  mapStripeSubStatus,
} from '@/lib/subscription/order-sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' }) : null;

/**
 * Daily safety net for the subscription pipeline.
 *
 * The webhook (invoice.paid) is the primary path for creating fulfillment
 * orders when a subscription bills, but if events are missed (endpoint not
 * subscribed to the event, downtime, handler error) subscribers get charged
 * with no order ever reaching fulfillment. This cron walks every subscription
 * with a Stripe ID, syncs its status/billing dates from Stripe, and creates
 * any missing orders for paid invoices — idempotently, so it never duplicates
 * what the webhook already handled.
 */
export async function GET(req: NextRequest) {
  // Same auth pattern as the other crons: Vercel cron header or explicit secret
  const authHeader = req.headers.get('authorization');
  const cronSecret = req.nextUrl.searchParams.get('cron_secret');
  const authorized =
    authHeader === `Bearer ${process.env.CRON_SECRET}` ||
    cronSecret === process.env.CRON_SECRET;

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }

  const subs = await prisma.retailSubscription.findMany({
    where: { stripeSubscriptionId: { not: null } },
    include: { customer: { include: { Address: true } } },
  });

  const results: Array<Record<string, unknown>> = [];
  let ordersCreated = 0;

  for (const sub of subs) {
    const summary: Record<string, unknown> = {
      subscriptionId: sub.id,
      stripeSubscriptionId: sub.stripeSubscriptionId,
      dbStatus: sub.status,
    };

    try {
      const stripeSub = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId!);

      // 1. Sync status + billing period from Stripe (source of truth)
      const syncedStatus = mapStripeSubStatus(stripeSub.status, sub.status);
      if (
        syncedStatus !== sub.status ||
        sub.currentPeriodEnd?.getTime() !== stripeSub.current_period_end * 1000
      ) {
        await prisma.retailSubscription.update({
          where: { id: sub.id },
          data: {
            status: syncedStatus,
            nextBillingDate: new Date(stripeSub.current_period_end * 1000),
            currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
            ...(stripeSub.status === 'canceled' && !sub.cancelledAt
              ? { cancelledAt: new Date() }
              : {}),
          },
        });
        summary.statusSynced = `${sub.status} -> ${syncedStatus}`;
      }

      // 2. Ensure an order exists for every paid invoice
      const invoices = await stripe.invoices.list({
        subscription: sub.stripeSubscriptionId!,
        limit: 24,
      });

      const created: string[] = [];
      let latestPaidAt: Date | null = null;

      for (const invoice of invoices.data) {
        if (!invoice.paid || invoice.amount_paid <= 0) continue;
        const paidAt = new Date(invoice.created * 1000);
        if (!latestPaidAt || paidAt > latestPaidAt) latestPaidAt = paidAt;

        const result = await ensureOrderForPaidInvoice(stripe, sub, invoice);
        if (result.created) {
          created.push(result.orderNumber);
          ordersCreated++;
        }
      }

      if (latestPaidAt && (!sub.lastBilledAt || latestPaidAt > sub.lastBilledAt)) {
        await prisma.retailSubscription.update({
          where: { id: sub.id },
          data: { lastBilledAt: latestPaidAt },
        });
      }

      summary.paidInvoices = invoices.data.filter((i) => i.paid && i.amount_paid > 0).length;
      summary.ordersCreated = created;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // Test-mode strays / deleted subs: record and move on
      summary.error = message.slice(0, 160);
    }

    results.push(summary);
  }

  // When the safety net actually catches something, the webhook path missed
  // events and should be investigated (check the endpoint's enabled events).
  if (ordersCreated > 0) {
    console.warn(
      `[subscription-reconcile] Created ${ordersCreated} missed subscription order(s) — webhook events are being missed.`
    );
  }

  return NextResponse.json({
    checked: subs.length,
    ordersCreated,
    results,
  });
}
