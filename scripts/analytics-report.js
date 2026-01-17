const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: today } },
    orderBy: { receivedAt: 'desc' }
  });

  console.log('=== TODAYS ANALYTICS (' + new Date().toLocaleDateString() + ') ===');
  console.log('Total Events:', events.length);

  const realEvents = events.filter(e => e.country !== null);
  console.log('Real Visitors:', realEvents.length);
  console.log('Test Events:', events.length - realEvents.length);
  console.log('');

  // By hour
  const byHour = {};
  realEvents.forEach(e => {
    const hour = new Date(e.receivedAt).getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;
  });
  console.log('=== TRAFFIC BY HOUR ===');
  Object.entries(byHour).sort((a,b) => Number(a[0]) - Number(b[0])).forEach(([h, c]) => {
    const ampm = Number(h) >= 12 ? 'PM' : 'AM';
    const hour12 = Number(h) % 12 || 12;
    console.log(`  ${hour12} ${ampm}: ${c} pageviews`);
  });
  console.log('');

  // Top pages
  const pageCount = {};
  realEvents.forEach(e => {
    pageCount[e.path] = (pageCount[e.path] || 0) + 1;
  });
  console.log('=== TOP PAGES ===');
  Object.entries(pageCount).sort((a,b) => b[1] - a[1]).forEach(([p, c]) => {
    console.log(`  ${p}: ${c}`);
  });
  console.log('');

  // Device breakdown
  const devices = {};
  realEvents.forEach(e => {
    const d = e.deviceType || 'unknown';
    devices[d] = (devices[d] || 0) + 1;
  });
  console.log('=== DEVICES ===');
  Object.entries(devices).forEach(([d, c]) => {
    const pct = Math.round(c / realEvents.length * 100);
    console.log(`  ${d}: ${c} (${pct}%)`);
  });
  console.log('');

  // Browsers
  const browsers = {};
  realEvents.forEach(e => {
    const b = e.rawJson.clientName || 'unknown';
    browsers[b] = (browsers[b] || 0) + 1;
  });
  console.log('=== BROWSERS ===');
  Object.entries(browsers).sort((a,b) => b[1] - a[1]).forEach(([b, c]) => {
    console.log(`  ${b}: ${c}`);
  });
  console.log('');

  // Referrers
  const refs = realEvents.filter(e => e.referrer).map(e => e.referrer);
  console.log('=== REFERRERS ===');
  if (refs.length === 0) {
    console.log('  All direct traffic');
  } else {
    const refCount = {};
    refs.forEach(r => { refCount[r] = (refCount[r] || 0) + 1; });
    Object.entries(refCount).forEach(([r, c]) => {
      console.log(`  ${r}: ${c}`);
    });
  }
  console.log('');

  // OS breakdown
  const os = {};
  realEvents.forEach(e => {
    const o = e.rawJson.osName + ' ' + (e.rawJson.osVersion || '');
    os[o] = (os[o] || 0) + 1;
  });
  console.log('=== OPERATING SYSTEMS ===');
  Object.entries(os).sort((a,b) => b[1] - a[1]).forEach(([o, c]) => {
    console.log(`  ${o.trim()}: ${c}`);
  });

  await prisma.$disconnect();
}

analyze().catch(console.error);
