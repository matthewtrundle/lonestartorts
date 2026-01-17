const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = await prisma.analyticsEvent.findMany({
    where: {
      receivedAt: { gte: today },
      country: { not: null }
    },
    orderBy: { receivedAt: 'desc' }
  });

  console.log('=== UTM ANALYSIS ===');
  console.log('Total events:', events.length);
  console.log('');

  // Check queryParams field
  const withQueryParams = events.filter(e => e.queryParams && e.queryParams.length > 0);
  console.log('Events with queryParams:', withQueryParams.length);

  if (withQueryParams.length > 0) {
    console.log('Query params found:');
    withQueryParams.forEach(e => {
      console.log('  ' + e.path + ': ' + e.queryParams);
    });
  }
  console.log('');

  // Check rawJson for any UTM fields or query strings
  console.log('=== CHECKING RAW PAYLOADS ===');
  let utmFound = 0;
  events.forEach(e => {
    const raw = e.rawJson;
    // Check origin for query strings
    if (raw.origin && raw.origin.includes('?')) {
      utmFound++;
      console.log('Event:', e.path);
      console.log('  Full URL:', raw.origin);
    }
    // Check for explicit UTM fields
    if (raw.utm_source || raw.utmSource) {
      utmFound++;
      console.log('Event:', e.path);
      console.log('  utm_source:', raw.utm_source || raw.utmSource);
    }
  });

  if (utmFound === 0) {
    console.log('No UTM parameters found in todays events.');
  }

  console.log('');
  console.log('=== TRAFFIC SOURCE BREAKDOWN ===');

  // Categorize by referrer
  const sources = {
    'Google': 0,
    'Bing': 0,
    'Yahoo': 0,
    'DuckDuckGo': 0,
    'Social': 0,
    'Direct': 0,
    'Other': 0
  };

  const details = [];

  events.forEach(e => {
    const ref = (e.referrer || '').toLowerCase();
    if (ref === '' || ref === null) {
      sources['Direct']++;
    } else if (ref.includes('google')) {
      sources['Google']++;
      details.push({ source: 'Google', path: e.path, referrer: e.referrer });
    } else if (ref.includes('bing')) {
      sources['Bing']++;
      details.push({ source: 'Bing', path: e.path, referrer: e.referrer });
    } else if (ref.includes('yahoo')) {
      sources['Yahoo']++;
      details.push({ source: 'Yahoo', path: e.path, referrer: e.referrer });
    } else if (ref.includes('duckduckgo')) {
      sources['DuckDuckGo']++;
      details.push({ source: 'DuckDuckGo', path: e.path, referrer: e.referrer });
    } else if (ref.includes('facebook') || ref.includes('twitter') || ref.includes('instagram') || ref.includes('tiktok')) {
      sources['Social']++;
      details.push({ source: 'Social', path: e.path, referrer: e.referrer });
    } else {
      sources['Other']++;
      details.push({ source: 'Other', path: e.path, referrer: e.referrer });
    }
  });

  Object.entries(sources).filter(([k,v]) => v > 0).forEach(([src, count]) => {
    const pct = Math.round(count / events.length * 100);
    console.log('  ' + src + ': ' + count + ' (' + pct + '%)');
  });

  console.log('');
  console.log('=== SEARCH ENGINE VISITS (detail) ===');
  details.filter(d => ['Google', 'Bing', 'Yahoo', 'DuckDuckGo'].includes(d.source)).forEach(d => {
    console.log('  ' + d.source + ' -> ' + d.path);
  });

  console.log('');
  console.log('NOTE: Without UTM parameters, we cannot distinguish Google Paid vs Organic.');
  console.log('Google Ads clicks should have ?gclid= or ?utm_source=google&utm_medium=cpc');

  await prisma.$disconnect();
}

analyze().catch(console.error);
