const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze2DayAnalytics() {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  console.log('='.repeat(60));
  console.log('ANALYTICS REPORT: Last 2 Days');
  console.log(`From: ${twoDaysAgo.toISOString()}`);
  console.log(`To: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  // 1. Total events and event types
  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: twoDaysAgo } },
    orderBy: { receivedAt: 'desc' },
  });

  console.log(`\n📊 TOTAL EVENTS: ${events.length}\n`);

  // Group by event type
  const eventTypes = {};
  const eventNames = {};
  events.forEach(e => {
    eventTypes[e.eventType] = (eventTypes[e.eventType] || 0) + 1;
    if (e.eventName) {
      eventNames[e.eventName] = (eventNames[e.eventName] || 0) + 1;
    }
  });

  console.log('📋 EVENT TYPES:');
  Object.entries(eventTypes).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  console.log('\n📋 CUSTOM EVENT NAMES:');
  Object.entries(eventNames).sort((a, b) => b[1] - a[1]).forEach(([name, count]) => {
    console.log(`  ${name}: ${count}`);
  });

  // 2. Session Analysis (using deviceId since Vercel sessionId is broken)
  console.log('\n' + '='.repeat(60));
  console.log('🔍 USER/DEVICE ANALYSIS');
  console.log('='.repeat(60));

  // Note: Vercel sends sessionId=0 for all events (known bug), so we use deviceId
  const uniqueDevices = new Set(events.filter(e => e.deviceId).map(e => e.deviceId.toString()));
  const nonZeroSessions = events.filter(e => e.sessionId && e.sessionId.toString() !== '0');

  console.log(`\nUnique Devices (users): ${uniqueDevices.size}`);
  console.log(`Events per device avg: ${(events.length / Math.max(uniqueDevices.size, 1)).toFixed(1)}`);
  console.log(`Note: sessionId is broken (Vercel sends 0), using deviceId for tracking`);

  // 3. Traffic Sources
  console.log('\n' + '='.repeat(60));
  console.log('🚦 TRAFFIC SOURCES');
  console.log('='.repeat(60));

  const sources = {};
  events.forEach(e => {
    // Check rawJson for _source or queryParams for utm_source
    const source = e.rawJson?._source ||
                   (e.queryParams?.includes('utm_source') ?
                     new URLSearchParams(e.queryParams).get('utm_source') : 'direct');
    sources[source || 'unknown'] = (sources[source || 'unknown'] || 0) + 1;
  });

  Object.entries(sources).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
    console.log(`  ${source}: ${count} events`);
  });

  // 4. Top Pages
  console.log('\n' + '='.repeat(60));
  console.log('📄 TOP PAGES (pageviews)');
  console.log('='.repeat(60));

  const pageviews = events.filter(e => e.eventType === 'pageview');
  const pages = {};
  pageviews.forEach(e => {
    const path = e.path || 'unknown';
    pages[path] = (pages[path] || 0) + 1;
  });

  Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([page, count]) => {
    console.log(`  ${page}: ${count}`);
  });

  // 5. E-commerce Funnel
  console.log('\n' + '='.repeat(60));
  console.log('🛒 E-COMMERCE FUNNEL');
  console.log('='.repeat(60));

  const shopPageviews = pageviews.filter(e => e.path === '/shop' || e.path?.startsWith('/shop')).length;
  const addToCart = eventNames['add_to_cart'] || 0;
  const cartSidebarOpened = eventNames['cart_sidebar_opened'] || 0;
  const beginCheckout = eventNames['begin_checkout'] || 0;
  const checkoutPageViewed = eventNames['checkout_page_viewed'] || 0;
  const purchases = eventNames['purchase'] || 0;

  console.log(`\n  Shop Page Views: ${shopPageviews}`);
  console.log(`  Add to Cart: ${addToCart}`);
  console.log(`  Cart Sidebar Opened: ${cartSidebarOpened}`);
  console.log(`  Begin Checkout: ${beginCheckout}`);
  console.log(`  Checkout Page Viewed: ${checkoutPageViewed}`);
  console.log(`  Purchases: ${purchases}`);

  if (shopPageviews > 0) {
    console.log(`\n  Conversion Rates:`);
    console.log(`    Shop → Add to Cart: ${((addToCart / shopPageviews) * 100).toFixed(1)}%`);
    if (addToCart > 0) {
      console.log(`    Add to Cart → Begin Checkout: ${((beginCheckout / addToCart) * 100).toFixed(1)}%`);
    }
    if (beginCheckout > 0) {
      console.log(`    Begin Checkout → Purchase: ${((purchases / beginCheckout) * 100).toFixed(1)}%`);
    }
    console.log(`    Overall Shop → Purchase: ${((purchases / shopPageviews) * 100).toFixed(1)}%`);
  }

  // 6. Cart Abandonment Analysis
  console.log('\n' + '='.repeat(60));
  console.log('🚫 CART ABANDONMENT ANALYSIS');
  console.log('='.repeat(60));

  const cartAbandoned = eventNames['checkout_abandoned'] || 0;
  const cartSidebarClosed = eventNames['cart_sidebar_closed'] || 0;
  const exitSurveyResponse = eventNames['exit_survey_response'] || 0;

  console.log(`\n  Cart Sidebar Closed (without checkout): ${cartSidebarClosed}`);
  console.log(`  Checkout Abandoned: ${cartAbandoned}`);
  console.log(`  Exit Survey Responses: ${exitSurveyResponse}`);

  // Get exit survey data from database
  const exitSurveys = await prisma.exitSurveyResponse.findMany({
    where: { createdAt: { gte: twoDaysAgo } },
    orderBy: { createdAt: 'desc' },
  });

  if (exitSurveys.length > 0) {
    console.log(`\n  Exit Survey Reasons (${exitSurveys.length} total):`);
    const reasons = {};
    exitSurveys.forEach(s => {
      reasons[s.reason] = (reasons[s.reason] || 0) + 1;
    });
    Object.entries(reasons).sort((a, b) => b[1] - a[1]).forEach(([reason, count]) => {
      console.log(`    ${reason}: ${count}`);
    });

    // Other text responses
    const otherResponses = exitSurveys.filter(s => s.otherText);
    if (otherResponses.length > 0) {
      console.log(`\n  "Other" Responses:`);
      otherResponses.forEach(s => {
        console.log(`    - "${s.otherText}" (${s.page}, $${(s.total / 100).toFixed(2)} cart)`);
      });
    }
  }

  // 7. Device Distribution
  console.log('\n' + '='.repeat(60));
  console.log('📱 DEVICE DISTRIBUTION');
  console.log('='.repeat(60));

  const devices = {};
  events.forEach(e => {
    const device = e.deviceType || 'unknown';
    devices[device] = (devices[device] || 0) + 1;
  });

  Object.entries(devices).sort((a, b) => b[1] - a[1]).forEach(([device, count]) => {
    const pct = ((count / events.length) * 100).toFixed(1);
    console.log(`  ${device}: ${count} (${pct}%)`);
  });

  // 8. Geographic Distribution
  console.log('\n' + '='.repeat(60));
  console.log('🌍 TOP LOCATIONS');
  console.log('='.repeat(60));

  const countries = {};
  const regions = {};
  events.forEach(e => {
    if (e.country) countries[e.country] = (countries[e.country] || 0) + 1;
    if (e.region) regions[`${e.region}, ${e.country}`] = (regions[`${e.region}, ${e.country}`] || 0) + 1;
  });

  console.log('\n  Countries:');
  Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([country, count]) => {
    console.log(`    ${country}: ${count}`);
  });

  console.log('\n  Regions:');
  Object.entries(regions).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([region, count]) => {
    console.log(`    ${region}: ${count}`);
  });

  // 9. Referrers
  console.log('\n' + '='.repeat(60));
  console.log('🔗 TOP REFERRERS');
  console.log('='.repeat(60));

  const referrers = {};
  events.forEach(e => {
    if (e.referrer) {
      try {
        const url = new URL(e.referrer);
        referrers[url.hostname] = (referrers[url.hostname] || 0) + 1;
      } catch {
        referrers[e.referrer] = (referrers[e.referrer] || 0) + 1;
      }
    }
  });

  Object.entries(referrers).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([ref, count]) => {
    console.log(`  ${ref}: ${count}`);
  });

  // 10. Recent Orders for context
  console.log('\n' + '='.repeat(60));
  console.log('💰 ORDERS (Last 2 Days)');
  console.log('='.repeat(60));

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: twoDaysAgo } },
    orderBy: { createdAt: 'desc' },
    include: { OrderItem: true },
  });

  console.log(`\n  Total Orders: ${orders.length}`);
  if (orders.length > 0) {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    console.log(`  Total Revenue: $${(totalRevenue / 100).toFixed(2)}`);
    console.log(`  Avg Order Value: $${(totalRevenue / orders.length / 100).toFixed(2)}`);

    console.log('\n  Recent Orders:');
    orders.slice(0, 5).forEach(o => {
      console.log(`    ${o.orderNumber}: $${(o.total / 100).toFixed(2)} - ${o.status} - ${o.createdAt.toISOString().split('T')[0]}`);
    });
  }

  // 11. User Journey Examples (by deviceId)
  console.log('\n' + '='.repeat(60));
  console.log('🧭 SAMPLE USER JOURNEYS (by device)');
  console.log('='.repeat(60));

  // Get devices with add_to_cart events
  const devicesWithCart = events.filter(e => e.eventName === 'add_to_cart' && e.deviceId);
  const cartDeviceIds = [...new Set(devicesWithCart.map(e => e.deviceId?.toString()))].slice(0, 3);

  for (const did of cartDeviceIds) {
    if (!did) continue;
    const deviceEvents = events
      .filter(e => e.deviceId?.toString() === did)
      .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

    console.log(`\n  Device ${did.substring(0, 8)}... (${deviceEvents.length} events):`);
    deviceEvents.forEach(e => {
      const eventDisplay = e.eventName || e.eventType;
      const pathDisplay = e.path ? ` @ ${e.path}` : '';
      console.log(`    - ${eventDisplay}${pathDisplay}`);
    });
  }

  // Show devices that added to cart but didn't purchase
  console.log('\n  📊 Cart Abandonment by Device:');
  const purchaseDevices = new Set(events.filter(e => e.eventName === 'purchase').map(e => e.deviceId?.toString()));
  const cartDevices = new Set(events.filter(e => e.eventName === 'add_to_cart').map(e => e.deviceId?.toString()));
  const abandonedDevices = [...cartDevices].filter(d => d && !purchaseDevices.has(d));
  console.log(`    Devices that added to cart: ${cartDevices.size}`);
  console.log(`    Devices that purchased: ${purchaseDevices.size}`);
  console.log(`    Devices that abandoned cart: ${abandonedDevices.length}`);

  console.log('\n' + '='.repeat(60));
  console.log('END OF REPORT');
  console.log('='.repeat(60));

  await prisma.$disconnect();
}

analyze2DayAnalytics().catch(e => {
  console.error('Error:', e);
  prisma.$disconnect();
});
