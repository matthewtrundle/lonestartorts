const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } },
    orderBy: { receivedAt: 'desc' }
  });
  
  console.log('=== CUSTOM EVENTS BY NAME (rawJson.eventName) ===');
  const customEvents = {};
  events.forEach(e => {
    if (e.rawJson && e.rawJson.eventName) {
      customEvents[e.rawJson.eventName] = (customEvents[e.rawJson.eventName] || 0) + 1;
    }
  });
  if (Object.keys(customEvents).length === 0) {
    console.log('  No custom events found');
  } else {
    Object.entries(customEvents).sort((a,b) => b[1] - a[1]).forEach(([event, count]) => {
      console.log('  ' + event + ': ' + count);
    });
  }
  
  // Specific search for add_to_cart events
  console.log('\n=== SEARCHING FOR ADD_TO_CART EVENTS ===');
  const addToCartEvents = events.filter(e => {
    const raw = e.rawJson || {};
    return raw.eventName === 'add_to_cart' || 
           raw.event === 'add_to_cart' ||
           (raw.eventData && raw.eventData.includes('add_to_cart'));
  });
  console.log('add_to_cart events found:', addToCartEvents.length);
  
  // Search for begin_checkout
  const checkoutEvents = events.filter(e => {
    const raw = e.rawJson || {};
    return raw.eventName === 'begin_checkout' || 
           raw.event === 'begin_checkout';
  });
  console.log('begin_checkout events found:', checkoutEvents.length);
  
  // Search for purchase events
  const purchaseEvents = events.filter(e => {
    const raw = e.rawJson || {};
    return raw.eventName === 'purchase' || 
           raw.event === 'purchase';
  });
  console.log('purchase events found:', purchaseEvents.length);
  
  // Funnel using pageviews
  console.log('\n=== PAGEVIEW FUNNEL (Last 7 Days) ===');
  const homeViews = events.filter(e => e.eventType === 'pageview' && e.path === '/').length;
  const shopViews = events.filter(e => e.eventType === 'pageview' && e.path === '/shop').length;
  const checkoutViews = events.filter(e => e.eventType === 'pageview' && e.path === '/checkout').length;
  const successViews = events.filter(e => e.eventType === 'pageview' && e.path && e.path.startsWith('/success')).length;
  
  console.log('Homepage views:', homeViews);
  console.log('Shop views:', shopViews);
  console.log('Checkout views:', checkoutViews);
  console.log('Success/Thank you views:', successViews);
  
  console.log('\n=== DROP-OFF ANALYSIS ===');
  console.log('Shop -> Checkout: ' + (shopViews > 0 ? (checkoutViews/shopViews*100).toFixed(1) : 0) + '% (' + checkoutViews + '/' + shopViews + ')');
  console.log('Checkout -> Success: ' + (checkoutViews > 0 ? (successViews/checkoutViews*100).toFixed(1) : 0) + '% (' + successViews + '/' + checkoutViews + ')');
  console.log('Overall Shop -> Success: ' + (shopViews > 0 ? (successViews/shopViews*100).toFixed(1) : 0) + '%');
  
  // Google Ads specific
  console.log('\n=== GOOGLE ADS FUNNEL ===');
  const googleAdsEvents = events.filter(e => {
    const raw = e.rawJson || {};
    const origin = (raw.origin || '').toLowerCase();
    const qp = (e.queryParams || '').toLowerCase();
    return origin.includes('gclid') || qp.includes('gclid') || origin.includes('utm_medium=cpc');
  });
  
  const gadsShop = googleAdsEvents.filter(e => e.path === '/shop').length;
  const gadsCheckout = googleAdsEvents.filter(e => e.path === '/checkout').length;
  const gadsSuccess = googleAdsEvents.filter(e => e.path && e.path.startsWith('/success')).length;
  
  console.log('Google Ads -> /shop:', gadsShop);
  console.log('Google Ads -> /checkout:', gadsCheckout);
  console.log('Google Ads -> /success:', gadsSuccess);
  console.log('Google Ads Shop -> Checkout: ' + (gadsShop > 0 ? (gadsCheckout/gadsShop*100).toFixed(1) : 0) + '%');
  
  await prisma.$disconnect();
}

audit().catch(console.error);
