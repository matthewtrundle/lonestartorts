const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get all events
  const events = await prisma.analyticsEvent.findMany({
    where: {
      receivedAt: { gte: today },
      country: { not: null }
    },
    orderBy: { timestamp: 'asc' }
  });

  console.log('=== E-COMMERCE FUNNEL ===');

  // Count event types
  const pageviews = events.filter(e => e.eventType === 'pageview');
  const customEvents = events.filter(e => e.eventType !== 'pageview');

  console.log('Pageviews:', pageviews.length);
  console.log('Custom events (add_to_cart, checkout, etc):', customEvents.length);

  if (customEvents.length > 0) {
    console.log('');
    console.log('Custom events breakdown:');
    const eventCounts = {};
    customEvents.forEach(e => {
      const key = e.eventName || e.eventType;
      eventCounts[key] = (eventCounts[key] || 0) + 1;
    });
    Object.entries(eventCounts).forEach(([k, v]) => {
      console.log('  ' + k + ': ' + v);
    });
  }

  console.log('');
  console.log('=== SHOP VISITOR JOURNEYS ===');

  // Find all device IDs that visited /shop
  const shopEvents = events.filter(e => e.path === '/shop' || (e.path && e.path.startsWith('/shop/')));
  const shopDeviceIds = [...new Set(shopEvents.map(e => String(e.deviceId)))];

  console.log('Unique visitors to /shop:', shopDeviceIds.length);
  console.log('');

  let addedCartCount = 0;
  let checkoutCount = 0;
  let purchaseCount = 0;

  shopDeviceIds.forEach((deviceId, idx) => {
    const deviceEvents = events.filter(e => String(e.deviceId) === deviceId);

    console.log('--- Visitor ' + (idx + 1) + ' ---');

    // Profile
    const first = deviceEvents[0];
    console.log('Device:', first.rawJson.deviceType, '|', first.rawJson.osName);
    console.log('Browser:', first.rawJson.clientName);
    console.log('Entry:', first.referrer || 'Direct');

    // Journey
    console.log('Journey:');
    deviceEvents.forEach((e, i) => {
      const time = new Date(e.receivedAt).toLocaleTimeString();
      const eventLabel = e.eventType !== 'pageview' ? ' [' + (e.eventName || e.eventType) + ']' : '';
      console.log('  ' + (i + 1) + '. ' + e.path + eventLabel);
    });

    // Did they take actions?
    const addedToCart = deviceEvents.some(e => e.eventType === 'event' && e.eventName === 'add_to_cart');
    const startedCheckout = deviceEvents.some(e => e.path === '/checkout' || e.eventName === 'begin_checkout');
    const purchased = deviceEvents.some(e => e.path === '/success' || e.eventName === 'purchase');

    if (addedToCart) addedCartCount++;
    if (startedCheckout) checkoutCount++;
    if (purchased) purchaseCount++;

    console.log('Added to cart:', addedToCart ? 'YES' : 'No');
    console.log('Started checkout:', startedCheckout ? 'YES' : 'No');
    console.log('Purchased:', purchased ? 'YES' : 'No');

    // Drop-off point
    if (!addedToCart) {
      console.log('DROP-OFF: Left without adding to cart');
    } else if (!startedCheckout) {
      console.log('DROP-OFF: Added to cart but abandoned');
    } else if (!purchased) {
      console.log('DROP-OFF: Started checkout but didn\'t complete');
    }

    console.log('');
  });

  // Summary
  console.log('=== FUNNEL SUMMARY ===');
  console.log('Visited /shop:    ' + shopDeviceIds.length);
  console.log('Added to cart:    ' + addedCartCount);
  console.log('Started checkout: ' + checkoutCount);
  console.log('Purchased:        ' + purchaseCount);
  console.log('');

  if (shopDeviceIds.length > 0) {
    const shopToCartRate = Math.round((addedCartCount / shopDeviceIds.length) * 100);
    console.log('Shop → Cart rate: ' + shopToCartRate + '%');
  }

  await prisma.$disconnect();
}

analyze().catch(console.error);
