const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Revenue-by-channel report against the Order table (the missing P&L view).
 *
 * Channel logic (first-touch, mirrors scripts/utm-report.js buckets):
 *   - gclid/gbraid/wbraid present            -> "Google Paid"   (definitive)
 *   - utmSource='google' (cpc/no click id)   -> "Google Paid"   (proxy)
 *   - referrer ~ google                      -> "Google Organic"
 *   - referrer ~ bing/yahoo/duckduckgo       -> "Other Search"
 *   - referrer ~ fb/ig/tiktok/twitter/...    -> "Social"
 *   - utmSource set (non-google)             -> that source
 *   - else                                   -> "Direct / Unknown"
 *
 * Usage: node scripts/order-channel-report.js [--since=YYYY-MM-DD]
 * Read-only. Revenue is total/100 (cents -> USD).
 */
function classify(o) {
  if (o.gclid || o.gbraid || o.wbraid) return 'Google Paid';
  const src = (o.utmSource || '').toLowerCase();
  const ref = (o.referrer || '').toLowerCase();
  if (src === 'google') return 'Google Paid';
  if (src && src !== 'google') return `Other: ${src}`;
  if (ref.includes('google')) return 'Google Organic';
  if (ref.includes('bing') || ref.includes('yahoo') || ref.includes('duckduckgo')) return 'Other Search';
  if (/(facebook|instagram|tiktok|twitter|t\.co|pinterest|youtube)/.test(ref)) return 'Social';
  return 'Direct / Unknown';
}

async function run() {
  const sinceArg = process.argv.find((a) => a.startsWith('--since='));
  const since = sinceArg ? new Date(sinceArg.split('=')[1]) : null;

  const orders = await prisma.order.findMany({
    where: { paymentStatus: 'SUCCEEDED', ...(since && { createdAt: { gte: since } }) },
    select: {
      total: true, utmSource: true, referrer: true,
      gclid: true, gbraid: true, wbraid: true, createdAt: true,
    },
  });

  const buckets = {};
  let gclidCount = 0;
  for (const o of orders) {
    const ch = classify(o);
    const b = (buckets[ch] = buckets[ch] || { orders: 0, revenue: 0, gclid: 0 });
    b.orders += 1;
    b.revenue += o.total / 100;
    if (o.gclid || o.gbraid || o.wbraid) { b.gclid += 1; gclidCount += 1; }
  }

  const totalOrders = orders.length;
  const totalRev = orders.reduce((s, o) => s + o.total / 100, 0);

  console.log(`=== REVENUE BY CHANNEL (paid orders${since ? ` since ${since.toISOString().slice(0, 10)}` : ', all-time'}) ===`);
  console.log(`Total: ${totalOrders} orders, $${totalRev.toFixed(0)} revenue, $${(totalRev / (totalOrders || 1)).toFixed(2)} AOV`);
  console.log(`Orders with a Google click id: ${gclidCount} (${Math.round((100 * gclidCount) / (totalOrders || 1))}%)\n`);
  console.log('channel'.padEnd(22) + 'orders'.padStart(8) + 'revenue'.padStart(12) + 'AOV'.padStart(9) + '%rev'.padStart(7) + 'w/gclid'.padStart(9));
  for (const [ch, b] of Object.entries(buckets).sort((a, b2) => b2[1].revenue - a[1].revenue)) {
    console.log(
      ch.padEnd(22) +
      String(b.orders).padStart(8) +
      `$${b.revenue.toFixed(0)}`.padStart(12) +
      `$${(b.revenue / b.orders).toFixed(0)}`.padStart(9) +
      `${Math.round((100 * b.revenue) / (totalRev || 1))}%`.padStart(7) +
      String(b.gclid).padStart(9)
    );
  }

  // Sanity check: buckets must reconcile to the raw totals.
  const sumOrders = Object.values(buckets).reduce((s, b) => s + b.orders, 0);
  console.log(`\n[reconciliation] bucket orders ${sumOrders} == raw ${totalOrders}: ${sumOrders === totalOrders ? 'OK' : 'MISMATCH'}`);

  await prisma.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
