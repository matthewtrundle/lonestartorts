const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Subscription pipeline health check (the recovery verification view).
 *
 * New subscriptions are saved INCOMPLETE and only flipped to ACTIVE by the
 * 'invoice.paid' webhook (-> ensureOrderForPaidInvoice). When events are
 * missed, subs get stuck INCOMPLETE with no fulfillment Order. This report
 * surfaces those recovery candidates and lets you confirm a recovery run
 * (the subscription-reconcile cron) actually cleared them.
 *
 * Prints:
 *   - one line per RetailSubscription (status / interval / total / lastBilledAt)
 *   - count by status
 *   - count of Orders linked via retailSubscriptionId
 *   - recovery candidates: INCOMPLETE subs that DO have a stripeSubscriptionId
 *
 * Usage: node scripts/subscription-health.js
 * READ-ONLY. Performs no writes — safe to run against production.
 */
function fmtMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function fmtDate(d) {
  return d ? new Date(d).toISOString().slice(0, 10) : '—';
}

async function run() {
  const subs = await prisma.retailSubscription.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      interval: true,
      intervalCount: true,
      total: true,
      lastBilledAt: true,
      nextBillingDate: true,
      stripeSubscriptionId: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  // Orders linked back to a subscription (the fulfillment side of the pipeline)
  const linkedOrders = await prisma.order.count({
    where: { retailSubscriptionId: { not: null } },
  });

  console.log('=== SUBSCRIPTION HEALTH (read-only) ===\n');
  console.log(`Subscriptions: ${subs.length}`);
  console.log(`Orders linked via retailSubscriptionId: ${linkedOrders}\n`);

  // Per-subscription detail
  console.log(
    'status'.padEnd(12) +
    'interval'.padEnd(16) +
    'total'.padStart(10) +
    'lastBilledAt'.padStart(14) +
    'stripe'.padStart(8) +
    '  name'
  );
  for (const s of subs) {
    const interval = `${s.intervalCount > 1 ? s.intervalCount + 'x ' : ''}${s.interval}`;
    console.log(
      String(s.status).padEnd(12) +
      interval.padEnd(16) +
      fmtMoney(s.total).padStart(10) +
      fmtDate(s.lastBilledAt).padStart(14) +
      (s.stripeSubscriptionId ? 'yes' : 'no').padStart(8) +
      '  ' + s.name
    );
  }

  // Count by status
  const byStatus = {};
  for (const s of subs) {
    byStatus[s.status] = (byStatus[s.status] || 0) + 1;
  }
  console.log('\n=== COUNT BY STATUS ===');
  for (const [status, count] of Object.entries(byStatus).sort()) {
    console.log(`${status.padEnd(12)} ${count}`);
  }

  // Recovery candidates: INCOMPLETE but with a Stripe subscription id.
  // These were charged in Stripe but never activated locally — exactly what
  // the subscription-reconcile cron is meant to heal.
  const candidates = subs.filter(
    (s) => s.status === 'INCOMPLETE' && s.stripeSubscriptionId
  );
  const stuckValue = candidates.reduce((sum, s) => sum + s.total, 0);

  console.log('\n=== RECOVERY CANDIDATES (INCOMPLETE + stripeSubscriptionId set) ===');
  if (candidates.length === 0) {
    console.log('None — no stuck subscriptions. Pipeline is healthy.');
  } else {
    console.log(
      `${candidates.length} stuck subscription(s), ${fmtMoney(stuckValue)} of recurring billing at stake:\n`
    );
    for (const s of candidates) {
      console.log(
        `  ${s.id}  ${fmtMoney(s.total)}/${s.interval.toLowerCase()}  ` +
        `created ${fmtDate(s.createdAt)}  stripe=${s.stripeSubscriptionId}`
      );
    }
    console.log(
      '\n  -> Run the subscription-reconcile cron in PRODUCTION to recover ' +
      'these (see docs/plans/SUBSCRIPTION-RECOVERY.md).'
    );
  }

  // Subscriptions with NO Stripe id are a different problem (never reached
  // Stripe) and are NOT reconcile-recoverable — call them out separately.
  const orphans = subs.filter((s) => !s.stripeSubscriptionId);
  if (orphans.length > 0) {
    console.log(
      `\n[note] ${orphans.length} subscription(s) have no stripeSubscriptionId ` +
      '— these are NOT recoverable via reconcile (they never reached Stripe).'
    );
  }

  await prisma.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
