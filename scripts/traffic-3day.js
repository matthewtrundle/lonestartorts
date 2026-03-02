const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  threeDaysAgo.setHours(0, 0, 0, 0);

  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: threeDaysAgo } },
    orderBy: { receivedAt: 'desc' }
  });

  console.log('=== TRAFFIC REPORT (Last 3 Days) ===');
  console.log('Total events:', events.length);
  
  const realEvents = events.filter(e => e.country);
  console.log('Real pageviews:', realEvents.length);
  
  const byDate = {};
  realEvents.forEach(e => {
    const date = new Date(e.receivedAt).toLocaleDateString();
    if (!byDate[date]) byDate[date] = { views: 0, sessions: new Set() };
    byDate[date].views++;
    if (e.sessionId) byDate[date].sessions.add(e.sessionId);
  });

  console.log('');
  console.log('=== BY DATE ===');
  Object.entries(byDate).forEach(([date, data]) => {
    console.log(date + ': ' + data.views + ' pageviews, ' + data.sessions.size + ' sessions');
  });

  const pages = {};
  realEvents.forEach(e => { pages[e.path] = (pages[e.path] || 0) + 1; });
  
  console.log('');
  console.log('=== TOP PAGES ===');
  Object.entries(pages).sort((a,b) => b[1] - a[1]).slice(0, 8).forEach(([p, c]) => {
    console.log('  ' + p + ': ' + c);
  });

  const devices = {};
  realEvents.forEach(e => { devices[e.deviceType || 'unknown'] = (devices[e.deviceType || 'unknown'] || 0) + 1; });
  console.log('');
  console.log('=== DEVICES ===');
  Object.entries(devices).forEach(([d, c]) => {
    console.log('  ' + d + ': ' + c + ' (' + Math.round(c/realEvents.length*100) + '%)');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
