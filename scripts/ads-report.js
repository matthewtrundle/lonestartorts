const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyze() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);
  threeDaysAgo.setHours(0, 0, 0, 0);

  const events = await prisma.analyticsEvent.findMany({
    where: {
      receivedAt: { gte: threeDaysAgo },
      country: { not: null }
    },
    orderBy: { receivedAt: 'desc' }
  });

  console.log('=== PAID TRAFFIC ANALYSIS (Last 7 Days) ===');
  console.log('Total pageviews:', events.length);
  console.log('');

  // Check for gclid (Google Ads) in queryParams or rawJson
  const googleAds = [];
  const utmTagged = [];
  const sources = {
    'Google Organic': 0,
    'Google Ads': 0,
    'Bing': 0,
    'TikTok': 0,
    'Facebook': 0,
    'Instagram': 0,
    'Direct': 0,
    'Other Referral': 0
  };

  events.forEach(e => {
    const raw = e.rawJson || {};
    const ref = (e.referrer || '').toLowerCase();
    const origin = (raw.origin || '').toLowerCase();
    const queryParams = e.queryParams || '';
    
    // Check for Google Ads (gclid parameter)
    const hasGclid = origin.includes('gclid=') || queryParams.includes('gclid');
    const hasUtmCpc = origin.includes('utm_medium=cpc') || queryParams.includes('utm_medium=cpc');
    
    // Check for UTM parameters
    const hasUtm = origin.includes('utm_') || queryParams.includes('utm_');
    
    if (hasGclid || hasUtmCpc) {
      sources['Google Ads']++;
      googleAds.push({
        date: new Date(e.receivedAt).toLocaleDateString(),
        path: e.path,
        origin: raw.origin
      });
    } else if (hasUtm) {
      utmTagged.push({
        date: new Date(e.receivedAt).toLocaleDateString(),
        path: e.path,
        origin: raw.origin,
        params: queryParams
      });
      // Try to categorize UTM traffic
      if (origin.includes('utm_source=tiktok') || origin.includes('tiktok')) {
        sources['TikTok']++;
      } else if (origin.includes('utm_source=facebook') || origin.includes('facebook')) {
        sources['Facebook']++;
      } else if (origin.includes('utm_source=instagram') || origin.includes('instagram')) {
        sources['Instagram']++;
      } else if (ref.includes('google')) {
        sources['Google Organic']++;
      } else {
        sources['Other Referral']++;
      }
    } else if (ref.includes('google')) {
      sources['Google Organic']++;
    } else if (ref.includes('bing')) {
      sources['Bing']++;
    } else if (ref.includes('tiktok')) {
      sources['TikTok']++;
    } else if (ref.includes('facebook')) {
      sources['Facebook']++;
    } else if (ref.includes('instagram')) {
      sources['Instagram']++;
    } else if (ref === '' || !e.referrer) {
      sources['Direct']++;
    } else {
      sources['Other Referral']++;
    }
  });

  console.log('=== TRAFFIC SOURCES ===');
  Object.entries(sources).filter(([k,v]) => v > 0).sort((a,b) => b[1] - a[1]).forEach(([src, count]) => {
    const pct = Math.round(count / events.length * 100);
    console.log('  ' + src + ': ' + count + ' (' + pct + '%)');
  });

  console.log('');
  console.log('=== GOOGLE ADS CLICKS ===');
  if (googleAds.length === 0) {
    console.log('  No Google Ads clicks detected (no gclid or utm_medium=cpc found)');
  } else {
    googleAds.forEach(a => {
      console.log('  ' + a.date + ': ' + a.path);
    });
  }

  console.log('');
  console.log('=== UTM-TAGGED VISITS ===');
  if (utmTagged.length === 0) {
    console.log('  No UTM-tagged visits found');
  } else {
    utmTagged.slice(0, 20).forEach(u => {
      console.log('  ' + u.date + ': ' + u.path);
      if (u.origin) console.log('    URL: ' + u.origin);
    });
    if (utmTagged.length > 20) {
      console.log('  ... and ' + (utmTagged.length - 20) + ' more');
    }
  }

  // Check referrers in detail
  console.log('');
  console.log('=== ALL REFERRERS (unique) ===');
  const refs = {};
  events.forEach(e => {
    if (e.referrer) {
      try {
        const host = new URL(e.referrer).hostname;
        refs[host] = (refs[host] || 0) + 1;
      } catch {
        refs[e.referrer] = (refs[e.referrer] || 0) + 1;
      }
    }
  });
  Object.entries(refs).sort((a,b) => b[1] - a[1]).forEach(([r, c]) => {
    console.log('  ' + r + ': ' + c);
  });

  await prisma.$disconnect();
}

analyze().catch(console.error);
