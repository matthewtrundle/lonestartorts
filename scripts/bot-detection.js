const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function detectBots() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } },
    orderBy: { receivedAt: 'asc' }
  });

  console.log('=== BOT DETECTION ANALYSIS ===\n');
  console.log('Analyzing', events.length, 'events from last 7 days\n');

  // Group events by sessionId
  const sessions = {};
  events.forEach(e => {
    const visitorId = e.deviceId?.toString() || e.sessionId?.toString() || 'unknown';
    if (!sessions[visitorId]) {
      sessions[visitorId] = {
        events: [],
        firstSeen: e.receivedAt,
        lastSeen: e.receivedAt,
        paths: new Set(),
        addToCarts: 0,
        pageviews: 0,
        userAgent: e.rawJson?.userAgent || 'unknown',
        hasGclid: false,
      };
    }
    sessions[visitorId].events.push(e);
    sessions[visitorId].lastSeen = e.receivedAt;
    if (e.path) sessions[visitorId].paths.add(e.path);
    if (e.rawJson?.eventName === 'add_to_cart') sessions[visitorId].addToCarts++;
    if (e.eventType === 'pageview') sessions[visitorId].pageviews++;

    const origin = (e.rawJson?.origin || '').toLowerCase();
    const qp = (e.queryParams || '').toLowerCase();
    if (origin.includes('gclid') || qp.includes('gclid')) {
      sessions[visitorId].hasGclid = true;
    }
  });

  console.log('Total unique sessions:', Object.keys(sessions).length, '\n');

  // Detect suspicious patterns
  const suspiciousSessions = [];

  Object.entries(sessions).forEach(([visitorId, data]) => {
    const flags = [];
    const sessionDuration = (new Date(data.lastSeen) - new Date(data.firstSeen)) / 1000 / 60; // minutes

    // Flag 1: Too many pageviews for session duration (more than 20 per minute)
    if (data.pageviews > 20 && sessionDuration > 0) {
      const rate = data.pageviews / sessionDuration;
      if (rate > 20) {
        flags.push(`High pageview rate: ${rate.toFixed(1)}/min`);
      }
    }

    // Flag 2: Many add_to_carts but no checkout
    if (data.addToCarts > 5 && !Array.from(data.paths).some(p => p === '/checkout')) {
      flags.push(`${data.addToCarts} add_to_carts but no checkout`);
    }

    // Flag 3: Only visits /shop repeatedly
    if (data.pageviews > 10 && data.paths.size === 1 && data.paths.has('/shop')) {
      flags.push(`${data.pageviews} pageviews but only visited /shop`);
    }

    // Flag 4: Unusually long session with repetitive behavior
    if (sessionDuration > 60 && data.pageviews > 50) {
      flags.push(`Long session (${sessionDuration.toFixed(0)}min) with ${data.pageviews} pageviews`);
    }

    // Flag 5: Google Ads traffic with no conversion intent
    if (data.hasGclid && data.pageviews > 10 && data.addToCarts === 0) {
      flags.push(`Google Ads traffic: ${data.pageviews} pageviews, 0 add_to_carts`);
    }

    if (flags.length > 0) {
      suspiciousSessions.push({
        visitorId,
        flags,
        pageviews: data.pageviews,
        addToCarts: data.addToCarts,
        duration: sessionDuration,
        paths: Array.from(data.paths),
        hasGclid: data.hasGclid,
      });
    }
  });

  console.log('=== SUSPICIOUS SESSIONS ===\n');
  if (suspiciousSessions.length === 0) {
    console.log('No suspicious sessions detected!');
  } else {
    console.log('Found', suspiciousSessions.length, 'suspicious sessions:\n');
    suspiciousSessions.forEach((s, idx) => {
      console.log(`Session ${idx + 1}:`);
      console.log(`  ID: ${s.visitorId}`);
      console.log(`  Pageviews: ${s.pageviews}`);
      console.log(`  Add to carts: ${s.addToCarts}`);
      console.log(`  Duration: ${s.duration.toFixed(1)} minutes`);
      console.log(`  Google Ads: ${s.hasGclid ? 'YES' : 'No'}`);
      console.log(`  Paths visited: ${s.paths.slice(0, 5).join(', ')}${s.paths.length > 5 ? '...' : ''}`);
      console.log(`  FLAGS:`);
      s.flags.forEach(f => console.log(`    - ${f}`));
      console.log('');
    });
  }

  // Summary stats
  console.log('\n=== TRAFFIC QUALITY SUMMARY ===\n');

  const gclidSessions = Object.values(sessions).filter(s => s.hasGclid);
  const organicSessions = Object.values(sessions).filter(s => !s.hasGclid);

  const gclidWithCheckout = gclidSessions.filter(s => Array.from(s.paths).includes('/checkout'));
  const organicWithCheckout = organicSessions.filter(s => Array.from(s.paths).includes('/checkout'));

  const gclidWithAddToCart = gclidSessions.filter(s => s.addToCarts > 0);
  const organicWithAddToCart = organicSessions.filter(s => s.addToCarts > 0);

  console.log('Google Ads Sessions:');
  console.log(`  Total: ${gclidSessions.length}`);
  console.log(`  Added to cart: ${gclidWithAddToCart.length} (${(gclidSessions.length > 0 ? gclidWithAddToCart.length/gclidSessions.length*100 : 0).toFixed(1)}%)`);
  console.log(`  Reached checkout: ${gclidWithCheckout.length} (${(gclidSessions.length > 0 ? gclidWithCheckout.length/gclidSessions.length*100 : 0).toFixed(1)}%)`);

  console.log('\nOrganic Sessions:');
  console.log(`  Total: ${organicSessions.length}`);
  console.log(`  Added to cart: ${organicWithAddToCart.length} (${(organicSessions.length > 0 ? organicWithAddToCart.length/organicSessions.length*100 : 0).toFixed(1)}%)`);
  console.log(`  Reached checkout: ${organicWithCheckout.length} (${(organicSessions.length > 0 ? organicWithCheckout.length/organicSessions.length*100 : 0).toFixed(1)}%)`);

  // Check for click fraud indicators
  console.log('\n=== CLICK FRAUD INDICATORS ===\n');

  const gclidTotalPageviews = gclidSessions.reduce((sum, s) => sum + s.pageviews, 0);
  const avgGclidPageviews = gclidSessions.length > 0 ? gclidTotalPageviews / gclidSessions.length : 0;

  const organicTotalPageviews = organicSessions.reduce((sum, s) => sum + s.pageviews, 0);
  const avgOrganicPageviews = organicSessions.length > 0 ? organicTotalPageviews / organicSessions.length : 0;

  console.log(`Avg pageviews per session:`);
  console.log(`  Google Ads: ${avgGclidPageviews.toFixed(1)}`);
  console.log(`  Organic: ${avgOrganicPageviews.toFixed(1)}`);

  if (avgGclidPageviews > avgOrganicPageviews * 3) {
    console.log('\n⚠️  WARNING: Google Ads traffic has abnormally high pageviews per session');
    console.log('   This could indicate bot activity or click fraud');
  }

  if (gclidSessions.length > 0 && gclidWithCheckout.length === 0) {
    console.log('\n⚠️  WARNING: Zero Google Ads sessions reached checkout');
    console.log('   Consider checking Google Ads for invalid click activity');
  }

  await prisma.$disconnect();
}

detectBots().catch(console.error);
