const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyzeUserJourneys() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  console.log('='.repeat(70));
  console.log('USER JOURNEY ANALYSIS - Last 7 Days');
  console.log('='.repeat(70));

  // Get all events
  const events = await prisma.analyticsEvent.findMany({
    where: { receivedAt: { gte: sevenDaysAgo } },
    orderBy: { receivedAt: 'asc' },
  });

  // Group events by deviceId
  const deviceJourneys = {};
  events.forEach(e => {
    if (!e.deviceId) return;
    const did = e.deviceId.toString();
    if (!deviceJourneys[did]) {
      deviceJourneys[did] = [];
    }
    deviceJourneys[did].push(e);
  });

  // Categorize users
  const purchasedUsers = [];
  const checkoutStartedNotCompleted = [];
  const checkoutViewedOnly = [];
  const addedToCartOnly = [];
  const browsedOnly = [];

  Object.entries(deviceJourneys).forEach(([deviceId, userEvents]) => {
    const eventNames = userEvents.map(e => e.eventName).filter(Boolean);
    const hasPurchase = eventNames.includes('purchase');
    const hasBeginCheckout = eventNames.includes('begin_checkout');
    const hasCheckoutViewed = eventNames.includes('checkout_page_viewed');
    const hasAddToCart = eventNames.includes('add_to_cart');

    const userData = {
      deviceId,
      events: userEvents,
      eventCount: userEvents.length,
      source: userEvents[0]?.rawJson?._source || 'direct',
      deviceType: userEvents[0]?.rawJson?.deviceType || 'unknown',
    };

    if (hasPurchase) {
      purchasedUsers.push(userData);
    } else if (hasBeginCheckout) {
      checkoutStartedNotCompleted.push(userData);
    } else if (hasCheckoutViewed) {
      checkoutViewedOnly.push(userData);
    } else if (hasAddToCart) {
      addedToCartOnly.push(userData);
    } else {
      browsedOnly.push(userData);
    }
  });

  // Summary
  console.log('\n📊 USER FUNNEL SUMMARY');
  console.log('-'.repeat(50));
  console.log(`Total unique users (by device): ${Object.keys(deviceJourneys).length}`);
  console.log(`  ✅ Purchased: ${purchasedUsers.length}`);
  console.log(`  🚫 Started checkout, abandoned: ${checkoutStartedNotCompleted.length}`);
  console.log(`  👀 Viewed checkout page only: ${checkoutViewedOnly.length}`);
  console.log(`  🛒 Added to cart only: ${addedToCartOnly.length}`);
  console.log(`  📄 Browsed only: ${browsedOnly.length}`);

  // Conversion rates
  const totalWithCart = purchasedUsers.length + checkoutStartedNotCompleted.length +
                        checkoutViewedOnly.length + addedToCartOnly.length;
  console.log('\n📈 CONVERSION RATES');
  console.log('-'.repeat(50));
  if (totalWithCart > 0) {
    console.log(`Cart → Purchase: ${((purchasedUsers.length / totalWithCart) * 100).toFixed(1)}%`);
  }
  if (checkoutStartedNotCompleted.length + purchasedUsers.length > 0) {
    const checkoutStarted = checkoutStartedNotCompleted.length + purchasedUsers.length;
    console.log(`Checkout Started → Purchase: ${((purchasedUsers.length / checkoutStarted) * 100).toFixed(1)}%`);
  }

  // PURCHASED USERS - Full journeys
  console.log('\n' + '='.repeat(70));
  console.log('✅ PURCHASED USERS - Full Journeys');
  console.log('='.repeat(70));

  if (purchasedUsers.length === 0) {
    console.log('No purchases in the last 7 days.');
  } else {
    purchasedUsers.forEach((user, i) => {
      console.log(`\n[User ${i + 1}] Device: ${user.deviceId.substring(0, 12)}...`);
      console.log(`Source: ${user.source} | Device: ${user.deviceType} | Events: ${user.eventCount}`);
      console.log('Journey:');
      user.events.forEach((e, j) => {
        const name = e.eventName || `pageview`;
        const path = e.path || '';
        const time = e.receivedAt ? new Date(e.receivedAt).toLocaleTimeString() : '';
        console.log(`  ${j + 1}. ${name}${path ? ' @ ' + path : ''} (${time})`);
      });
    });
  }

  // CHECKOUT ABANDONED - Highest priority leak
  console.log('\n' + '='.repeat(70));
  console.log('🚫 CHECKOUT ABANDONERS - Started but did not complete');
  console.log('='.repeat(70));

  if (checkoutStartedNotCompleted.length === 0) {
    console.log('No checkout abandoners found.');
  } else {
    checkoutStartedNotCompleted.forEach((user, i) => {
      console.log(`\n[Abandoner ${i + 1}] Device: ${user.deviceId.substring(0, 12)}...`);
      console.log(`Source: ${user.source} | Device: ${user.deviceType} | Events: ${user.eventCount}`);
      console.log('Journey:');
      user.events.forEach((e, j) => {
        const name = e.eventName || `pageview`;
        const path = e.path || '';
        const time = e.receivedAt ? new Date(e.receivedAt).toLocaleTimeString() : '';
        console.log(`  ${j + 1}. ${name}${path ? ' @ ' + path : ''} (${time})`);
      });
    });
  }

  // CART ABANDONERS - Added to cart but never went to checkout
  console.log('\n' + '='.repeat(70));
  console.log('🛒 CART ABANDONERS - Added to cart but never started checkout');
  console.log('='.repeat(70));

  if (addedToCartOnly.length === 0) {
    console.log('No cart-only abandoners found.');
  } else {
    // Show first 5
    addedToCartOnly.slice(0, 5).forEach((user, i) => {
      console.log(`\n[Cart Abandoner ${i + 1}] Device: ${user.deviceId.substring(0, 12)}...`);
      console.log(`Source: ${user.source} | Device: ${user.deviceType} | Events: ${user.eventCount}`);
      console.log('Journey:');
      user.events.forEach((e, j) => {
        const name = e.eventName || `pageview`;
        const path = e.path || '';
        console.log(`  ${j + 1}. ${name}${path ? ' @ ' + path : ''}`);
      });
    });
    if (addedToCartOnly.length > 5) {
      console.log(`\n... and ${addedToCartOnly.length - 5} more cart abandoners`);
    }
  }

  // TRAFFIC SOURCE ANALYSIS
  console.log('\n' + '='.repeat(70));
  console.log('🚦 TRAFFIC SOURCE → CONVERSION ANALYSIS');
  console.log('='.repeat(70));

  const sourceStats = {};
  Object.values(deviceJourneys).forEach(userEvents => {
    const source = userEvents[0]?.rawJson?._source || 'direct';
    const eventNames = userEvents.map(e => e.eventName).filter(Boolean);

    if (!sourceStats[source]) {
      sourceStats[source] = { total: 0, addedToCart: 0, startedCheckout: 0, purchased: 0 };
    }
    sourceStats[source].total++;
    if (eventNames.includes('add_to_cart')) sourceStats[source].addedToCart++;
    if (eventNames.includes('begin_checkout')) sourceStats[source].startedCheckout++;
    if (eventNames.includes('purchase')) sourceStats[source].purchased++;
  });

  console.log('\nSource | Users | Cart | Checkout | Purchase | Cart% | Checkout% | Purchase%');
  console.log('-'.repeat(80));
  Object.entries(sourceStats)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([source, stats]) => {
      const cartPct = ((stats.addedToCart / stats.total) * 100).toFixed(1);
      const checkoutPct = ((stats.startedCheckout / stats.total) * 100).toFixed(1);
      const purchasePct = ((stats.purchased / stats.total) * 100).toFixed(1);
      console.log(`${source.padEnd(12)} | ${String(stats.total).padStart(5)} | ${String(stats.addedToCart).padStart(4)} | ${String(stats.startedCheckout).padStart(8)} | ${String(stats.purchased).padStart(8)} | ${cartPct.padStart(5)}% | ${checkoutPct.padStart(9)}% | ${purchasePct.padStart(9)}%`);
    });

  // DEVICE TYPE ANALYSIS
  console.log('\n' + '='.repeat(70));
  console.log('📱 DEVICE TYPE → CONVERSION ANALYSIS');
  console.log('='.repeat(70));

  const deviceStats = {};
  Object.values(deviceJourneys).forEach(userEvents => {
    const device = userEvents[0]?.rawJson?.deviceType || 'unknown';
    const eventNames = userEvents.map(e => e.eventName).filter(Boolean);

    if (!deviceStats[device]) {
      deviceStats[device] = { total: 0, addedToCart: 0, startedCheckout: 0, purchased: 0 };
    }
    deviceStats[device].total++;
    if (eventNames.includes('add_to_cart')) deviceStats[device].addedToCart++;
    if (eventNames.includes('begin_checkout')) deviceStats[device].startedCheckout++;
    if (eventNames.includes('purchase')) deviceStats[device].purchased++;
  });

  console.log('\nDevice  | Users | Cart | Checkout | Purchase | Cart% | Checkout% | Purchase%');
  console.log('-'.repeat(80));
  Object.entries(deviceStats)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([device, stats]) => {
      const cartPct = ((stats.addedToCart / stats.total) * 100).toFixed(1);
      const checkoutPct = ((stats.startedCheckout / stats.total) * 100).toFixed(1);
      const purchasePct = ((stats.purchased / stats.total) * 100).toFixed(1);
      console.log(`${device.padEnd(8)} | ${String(stats.total).padStart(5)} | ${String(stats.addedToCart).padStart(4)} | ${String(stats.startedCheckout).padStart(8)} | ${String(stats.purchased).padStart(8)} | ${cartPct.padStart(5)}% | ${checkoutPct.padStart(9)}% | ${purchasePct.padStart(9)}%`);
    });

  // TIME ANALYSIS - When do conversions happen?
  console.log('\n' + '='.repeat(70));
  console.log('🕐 TIME ANALYSIS - Purchase Timing');
  console.log('='.repeat(70));

  const purchaseEvents = events.filter(e => e.eventName === 'purchase');
  if (purchaseEvents.length > 0) {
    const hourCounts = {};
    const dayCounts = {};
    purchaseEvents.forEach(e => {
      const date = new Date(e.receivedAt);
      const hour = date.getHours();
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    console.log('\nPurchases by hour:');
    Object.entries(hourCounts).sort((a, b) => a[0] - b[0]).forEach(([hour, count]) => {
      console.log(`  ${hour}:00 - ${count} purchases`);
    });

    console.log('\nPurchases by day:');
    Object.entries(dayCounts).forEach(([day, count]) => {
      console.log(`  ${day}: ${count} purchases`);
    });
  } else {
    console.log('No purchase events to analyze timing.');
  }

  // KEY INSIGHTS
  console.log('\n' + '='.repeat(70));
  console.log('💡 KEY INSIGHTS');
  console.log('='.repeat(70));

  const dropOffAtCart = addedToCartOnly.length;
  const dropOffAtCheckout = checkoutStartedNotCompleted.length;
  const totalDropOffs = dropOffAtCart + dropOffAtCheckout;

  if (totalDropOffs > 0) {
    console.log(`\n🔴 BIGGEST LEAK: ${dropOffAtCart > dropOffAtCheckout ? 'Cart page' : 'Checkout page'}`);
    console.log(`   - ${dropOffAtCart} users abandoned AT cart (never clicked checkout)`);
    console.log(`   - ${dropOffAtCheckout} users abandoned DURING checkout`);
  }

  // Source quality
  const bestSource = Object.entries(sourceStats)
    .filter(([_, s]) => s.total >= 5)
    .sort((a, b) => (b[1].purchased / b[1].total) - (a[1].purchased / a[1].total))[0];

  if (bestSource) {
    console.log(`\n✅ BEST CONVERTING SOURCE: ${bestSource[0]}`);
    console.log(`   - ${bestSource[1].purchased}/${bestSource[1].total} users purchased (${((bestSource[1].purchased / bestSource[1].total) * 100).toFixed(1)}%)`);
  }

  // Device recommendation
  const mobileStats = deviceStats['mobile'] || { total: 0, purchased: 0 };
  const desktopStats = deviceStats['desktop'] || { total: 0, purchased: 0 };

  if (mobileStats.total > 0 && desktopStats.total > 0) {
    const mobileRate = mobileStats.purchased / mobileStats.total;
    const desktopRate = desktopStats.purchased / desktopStats.total;

    if (mobileRate < desktopRate && mobileStats.total > desktopStats.total) {
      console.log(`\n⚠️  MOBILE CONVERSION GAP`);
      console.log(`   - Mobile: ${(mobileRate * 100).toFixed(1)}% conversion (${mobileStats.total} users)`);
      console.log(`   - Desktop: ${(desktopRate * 100).toFixed(1)}% conversion (${desktopStats.total} users)`);
      console.log(`   - Mobile has more traffic but lower conversion - optimize mobile checkout`);
    }
  }

  // Exit survey correlation
  const exitSurveys = await prisma.exitSurveyResponse.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  if (exitSurveys.length > 0) {
    console.log(`\n📝 EXIT SURVEY INSIGHTS (${exitSurveys.length} responses):`);
    const reasons = {};
    exitSurveys.forEach(s => {
      reasons[s.reason] = (reasons[s.reason] || 0) + 1;
    });
    Object.entries(reasons).sort((a, b) => b[1] - a[1]).forEach(([reason, count]) => {
      const pct = ((count / exitSurveys.length) * 100).toFixed(0);
      console.log(`   - ${reason}: ${count} (${pct}%)`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('END OF USER JOURNEY ANALYSIS');
  console.log('='.repeat(70));

  await prisma.$disconnect();
}

analyzeUserJourneys().catch(e => {
  console.error('Error:', e);
  prisma.$disconnect();
  process.exit(1);
});
