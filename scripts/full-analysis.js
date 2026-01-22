const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { createdAt: 'desc' }
  });
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentOrders = orders.filter(o => o.createdAt >= sevenDaysAgo);
  
  const totalRevenue30 = orders.reduce((sum, o) => sum + o.total, 0) / 100;
  const totalRevenue7 = recentOrders.reduce((sum, o) => sum + o.total, 0) / 100;
  const avgOrder30 = orders.length > 0 ? totalRevenue30 / orders.length : 0;
  const avgOrder7 = recentOrders.length > 0 ? totalRevenue7 / recentOrders.length : 0;
  
  console.log('=== ORDER METRICS (Last 30 Days) ===');
  console.log('Total Orders:', orders.length);
  console.log('Total Revenue: $' + totalRevenue30.toFixed(2));
  console.log('Avg Order Value: $' + avgOrder30.toFixed(2));
  console.log('Unique Customers:', new Set(orders.map(o => o.email)).size);
  
  console.log('\n=== ORDER METRICS (Last 7 Days) ===');
  console.log('Total Orders:', recentOrders.length);
  console.log('Total Revenue: $' + totalRevenue7.toFixed(2));
  console.log('Avg Order Value: $' + avgOrder7.toFixed(2));
  
  console.log('\n=== DAILY BREAKDOWN (Last 7 Days) ===');
  const byDay = {};
  recentOrders.forEach(o => {
    const day = o.createdAt.toISOString().split('T')[0];
    if (!byDay[day]) byDay[day] = { orders: 0, revenue: 0 };
    byDay[day].orders++;
    byDay[day].revenue += o.total / 100;
  });
  Object.entries(byDay).sort((a,b) => b[0].localeCompare(a[0])).forEach(([day, data]) => {
    console.log('  ' + day + ': ' + data.orders + ' orders, $' + data.revenue.toFixed(2));
  });
  
  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } }
  });
  
  console.log('\n=== ANALYTICS EVENTS (Last 7 Days) ===');
  const eventCounts = {};
  events.forEach(e => {
    eventCounts[e.eventType] = (eventCounts[e.eventType] || 0) + 1;
  });
  Object.entries(eventCounts).sort((a,b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log('  ' + type + ': ' + count);
  });
  
  const discountOrders = orders.filter(o => o.discountCode);
  console.log('\n=== DISCOUNT CODE USAGE (Last 30 Days) ===');
  console.log('Orders with discount:', discountOrders.length, '(' + (orders.length > 0 ? Math.round(discountOrders.length/orders.length*100) : 0) + '%)');
  const discountCodes = {};
  discountOrders.forEach(o => {
    discountCodes[o.discountCode] = (discountCodes[o.discountCode] || 0) + 1;
  });
  Object.entries(discountCodes).sort((a,b) => b[1] - a[1]).slice(0, 10).forEach(([code, count]) => {
    console.log('  ' + code + ': ' + count);
  });
  
  // Conversion rate calculation
  const pageviews = events.filter(e => e.eventType === 'pageview').length;
  const addToCart = events.filter(e => e.rawJson && e.rawJson.eventName === 'add_to_cart').length;
  const checkoutStarts = events.filter(e => e.rawJson && e.rawJson.eventName === 'begin_checkout').length;
  const purchases = recentOrders.length;
  
  console.log('\n=== CONVERSION FUNNEL (Last 7 Days) ===');
  console.log('Pageviews:', pageviews);
  console.log('Add to Cart events:', addToCart);
  console.log('Checkout Starts:', checkoutStarts);
  console.log('Purchases:', purchases);
  console.log('Overall Conversion Rate:', (pageviews > 0 ? (purchases/pageviews*100).toFixed(2) : 0) + '%');
  
  // Top pages
  console.log('\n=== TOP PAGES (Last 7 Days) ===');
  const pageCounts = {};
  events.filter(e => e.eventType === 'pageview').forEach(e => {
    pageCounts[e.path] = (pageCounts[e.path] || 0) + 1;
  });
  Object.entries(pageCounts).sort((a,b) => b[1] - a[1]).slice(0,10).forEach(([path, count]) => {
    console.log('  ' + path + ': ' + count);
  });
  
  await prisma.$disconnect();
}

analyze().catch(console.error);
