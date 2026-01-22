const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyzeGoogleAds() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } },
    orderBy: { receivedAt: 'desc' }
  });

  // Identify Google Ads traffic
  const googleAdsEvents = events.filter(e => {
    const raw = e.rawJson || {};
    const origin = (raw.origin || '').toLowerCase();
    const qp = (e.queryParams || '').toLowerCase();
    return origin.includes('gclid') || qp.includes('gclid') || origin.includes('utm_medium=cpc');
  });

  console.log('=== GOOGLE ADS DEEP DIVE ===');
  console.log('Total Google Ads events:', googleAdsEvents.length);

  // What pages are they visiting?
  console.log('\n=== Pages Visited by Google Ads Traffic ===');
  const pageCounts = {};
  googleAdsEvents.filter(e => e.eventType === 'pageview').forEach(e => {
    pageCounts[e.path] = (pageCounts[e.path] || 0) + 1;
  });
  Object.entries(pageCounts).sort((a,b) => b[1] - a[1]).forEach(([path, count]) => {
    console.log('  ' + path + ': ' + count);
  });

  // What events are they triggering?
  console.log('\n=== Events Triggered by Google Ads Traffic ===');
  const eventCounts = {};
  googleAdsEvents.forEach(e => {
    if (e.rawJson && e.rawJson.eventName) {
      eventCounts[e.rawJson.eventName] = (eventCounts[e.rawJson.eventName] || 0) + 1;
    }
  });
  if (Object.keys(eventCounts).length === 0) {
    console.log('  NO CUSTOM EVENTS from Google Ads traffic!');
  } else {
    Object.entries(eventCounts).sort((a,b) => b[1] - a[1]).forEach(([event, count]) => {
      console.log('  ' + event + ': ' + count);
    });
  }

  // Group by session to understand user journeys
  console.log('\n=== Session Analysis ===');
  const sessions = {};
  googleAdsEvents.forEach(e => {
    const visitorId = e.deviceId?.toString() || e.sessionId?.toString() || 'unknown';
    if (!sessions[visitorId]) {
      sessions[visitorId] = [];
    }
    sessions[visitorId].push({
      type: e.eventType,
      path: e.path,
      event: e.rawJson?.eventName,
      time: e.receivedAt
    });
  });

  console.log('Unique Google Ads sessions:', Object.keys(sessions).length);

  // Categorize sessions by how far they got
  let shopOnly = 0;
  let viewedOther = 0;
  let addedToCart = 0;
  let reachedCheckout = 0;

  Object.values(sessions).forEach(events => {
    const hasShop = events.some(e => e.path === '/shop');
    const hasOtherPage = events.some(e => e.path && e.path !== '/shop' && !e.path.includes('gclid'));
    const hasAddToCart = events.some(e => e.event === 'add_to_cart');
    const hasCheckout = events.some(e => e.path === '/checkout');

    if (hasCheckout) reachedCheckout++;
    else if (hasAddToCart) addedToCart++;
    else if (hasOtherPage) viewedOther++;
    else if (hasShop) shopOnly++;
  });

  console.log('\nSession Journey Breakdown:');
  console.log('  Bounced (shop only):', shopOnly);
  console.log('  Browsed other pages:', viewedOther);
  console.log('  Added to cart:', addedToCart);
  console.log('  Reached checkout:', reachedCheckout);

  // Show sample sessions to understand behavior
  console.log('\n=== Sample Google Ads User Journeys ===');
  const sampleSessions = Object.entries(sessions).slice(0, 5);
  sampleSessions.forEach(([sessionId, events], idx) => {
    console.log('\nSession ' + (idx + 1) + ':');
    events.sort((a, b) => new Date(a.time) - new Date(b.time)).forEach(e => {
      const eventStr = e.event ? ' [' + e.event + ']' : '';
      console.log('  ' + e.type + ': ' + e.path + eventStr);
    });
  });

  // Compare with non-Google Ads traffic
  console.log('\n=== COMPARISON: Google Ads vs Organic ===');
  const organicEvents = events.filter(e => {
    const raw = e.rawJson || {};
    const origin = (raw.origin || '').toLowerCase();
    const qp = (e.queryParams || '').toLowerCase();
    return !origin.includes('gclid') && !qp.includes('gclid') && !origin.includes('utm_medium=cpc');
  });

  const organicAddToCart = organicEvents.filter(e => e.rawJson?.eventName === 'add_to_cart').length;
  const organicCheckout = organicEvents.filter(e => e.path === '/checkout' && e.eventType === 'pageview').length;
  const organicShop = organicEvents.filter(e => e.path === '/shop' && e.eventType === 'pageview').length;

  const gadsAddToCart = googleAdsEvents.filter(e => e.rawJson?.eventName === 'add_to_cart').length;
  const gadsCheckout = googleAdsEvents.filter(e => e.path === '/checkout' && e.eventType === 'pageview').length;
  const gadsShop = googleAdsEvents.filter(e => e.path === '/shop' && e.eventType === 'pageview').length;

  console.log('\nGoogle Ads Traffic:');
  console.log('  Shop views:', gadsShop);
  console.log('  Add to cart events:', gadsAddToCart);
  console.log('  Checkout views:', gadsCheckout);
  console.log('  Shop -> Cart rate:', (gadsShop > 0 ? (gadsAddToCart/gadsShop*100).toFixed(1) : 0) + '%');
  console.log('  Shop -> Checkout rate:', (gadsShop > 0 ? (gadsCheckout/gadsShop*100).toFixed(1) : 0) + '%');

  console.log('\nOrganic Traffic:');
  console.log('  Shop views:', organicShop);
  console.log('  Add to cart events:', organicAddToCart);
  console.log('  Checkout views:', organicCheckout);
  console.log('  Shop -> Cart rate:', (organicShop > 0 ? (organicAddToCart/organicShop*100).toFixed(1) : 0) + '%');
  console.log('  Shop -> Checkout rate:', (organicShop > 0 ? (organicCheckout/organicShop*100).toFixed(1) : 0) + '%');

  await prisma.$disconnect();
}

analyzeGoogleAds().catch(console.error);
