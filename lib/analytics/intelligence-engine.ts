/**
 * Analytics Intelligence Engine
 * Analysis algorithms for funnel, session quality, anomalies, and conversion paths
 */

import type {
  ReconstructedSession,
  DailyMetrics,
  BaselineMetrics,
  FunnelAnalysis,
  FunnelStage,
  FunnelStageData,
  SessionQualityScore,
  SessionQualityDistribution,
  Anomaly,
  AnomalySeverity,
  ConversionPath,
  HighIntentSession,
} from './types';

// ===========================================
// FUNNEL ANALYSIS
// ===========================================

const FUNNEL_STAGES: { stage: FunnelStage; label: string }[] = [
  { stage: 'page_view', label: 'Page Views' },
  { stage: 'product_view', label: 'Product Views' },
  { stage: 'add_to_cart', label: 'Add to Cart' },
  { stage: 'begin_checkout', label: 'Begin Checkout' },
  { stage: 'purchase', label: 'Purchase' },
];

/**
 * Analyze conversion funnel from sessions
 */
export function analyzeFunnel(sessions: ReconstructedSession[]): FunnelAnalysis {
  // Count unique devices at each stage
  const stageCounts: Record<FunnelStage, Set<string>> = {
    page_view: new Set(),
    product_view: new Set(),
    add_to_cart: new Set(),
    begin_checkout: new Set(),
    purchase: new Set(),
  };

  for (const session of sessions) {
    // Everyone with a pageview event counts for page_view stage
    if (session.pageViews > 0) {
      stageCounts.page_view.add(session.deviceId);
    }

    // Check for each conversion event in the session
    for (const event of session.events) {
      if (event.eventName === 'product_view') {
        stageCounts.product_view.add(session.deviceId);
      }
      if (event.eventName === 'add_to_cart') {
        stageCounts.add_to_cart.add(session.deviceId);
      }
      if (event.eventName === 'begin_checkout') {
        stageCounts.begin_checkout.add(session.deviceId);
      }
      if (event.eventName === 'purchase') {
        stageCounts.purchase.add(session.deviceId);
      }
    }
  }

  // Build funnel stages with conversion rates
  const stages: FunnelStageData[] = FUNNEL_STAGES.map((funnelStage, index) => {
    const count = stageCounts[funnelStage.stage].size;
    const topCount = stageCounts.page_view.size;

    let conversionFromPrevious: number | null = null;
    if (index > 0) {
      const prevCount = stageCounts[FUNNEL_STAGES[index - 1].stage].size;
      conversionFromPrevious = prevCount > 0 ? Math.round((count / prevCount) * 100 * 100) / 100 : 0;
    }

    const conversionFromTop = topCount > 0 ? Math.round((count / topCount) * 100 * 100) / 100 : 0;

    return {
      stage: funnelStage.stage,
      label: funnelStage.label,
      count,
      conversionFromPrevious,
      conversionFromTop,
    };
  });

  // Calculate overall conversion rate
  const pageViewCount = stageCounts.page_view.size;
  const purchaseCount = stageCounts.purchase.size;
  const overallConversionRate =
    pageViewCount > 0 ? Math.round((purchaseCount / pageViewCount) * 100 * 100) / 100 : 0;

  // Find biggest drop-off
  let biggestDropOff: FunnelAnalysis['biggestDropOff'] = null;
  let maxDropOff = 0;

  for (let i = 1; i < FUNNEL_STAGES.length; i++) {
    const prevCount = stageCounts[FUNNEL_STAGES[i - 1].stage].size;
    const currCount = stageCounts[FUNNEL_STAGES[i].stage].size;

    if (prevCount > 0) {
      const dropOffPercent = ((prevCount - currCount) / prevCount) * 100;
      if (dropOffPercent > maxDropOff) {
        maxDropOff = dropOffPercent;
        biggestDropOff = {
          from: FUNNEL_STAGES[i - 1].stage,
          to: FUNNEL_STAGES[i].stage,
          dropOffPercent: Math.round(dropOffPercent * 100) / 100,
        };
      }
    }
  }

  return {
    stages,
    overallConversionRate,
    biggestDropOff,
  };
}

// ===========================================
// SESSION QUALITY SCORING
// ===========================================

/**
 * Score a single session's quality (0-100)
 */
export function scoreSessionQuality(session: ReconstructedSession): SessionQualityScore {
  const factors = {
    depth: 0,        // Max 30 points
    duration: 0,     // Max 30 points
    engagement: 0,   // Max 25 points
    conversion: 0,   // Max 15 points
  };

  // Depth score: based on unique pages visited (0-30)
  const uniquePages = new Set(
    session.events.filter((e) => e.path).map((e) => e.path)
  ).size;
  factors.depth = Math.min(30, uniquePages * 6);

  // Duration score: based on time spent (0-30)
  if (session.durationSeconds >= 300) {
    factors.duration = 30; // 5+ minutes
  } else if (session.durationSeconds >= 180) {
    factors.duration = 25; // 3-5 minutes
  } else if (session.durationSeconds >= 60) {
    factors.duration = 20; // 1-3 minutes
  } else if (session.durationSeconds >= 30) {
    factors.duration = 15; // 30-60 seconds
  } else if (session.durationSeconds >= 10) {
    factors.duration = 10; // 10-30 seconds
  } else {
    factors.duration = 5; // < 10 seconds
  }

  // Engagement score: based on non-pageview events (0-25)
  const engagementEvents = session.events.filter(
    (e) => e.eventType === 'event' && e.eventName
  ).length;
  factors.engagement = Math.min(25, engagementEvents * 5);

  // Conversion score: based on conversion events (0-15)
  if (session.conversionType === 'purchase') {
    factors.conversion = 15;
  } else if (session.conversionType === 'begin_checkout') {
    factors.conversion = 12;
  } else if (session.conversionType === 'add_to_cart') {
    factors.conversion = 9;
  } else if (session.hadConversion) {
    factors.conversion = 6;
  }

  const score = factors.depth + factors.duration + factors.engagement + factors.conversion;

  let classification: SessionQualityScore['classification'];
  if (score >= 76) {
    classification = 'excellent';
  } else if (score >= 51) {
    classification = 'high';
  } else if (score >= 26) {
    classification = 'medium';
  } else {
    classification = 'low';
  }

  return {
    sessionId: session.id,
    score,
    factors,
    classification,
  };
}

/**
 * Get session quality distribution across all sessions
 */
export function getSessionQualityDistribution(
  sessions: ReconstructedSession[]
): SessionQualityDistribution {
  const distribution = {
    low: 0,
    medium: 0,
    high: 0,
    excellent: 0,
    averageScore: 0,
  };

  if (sessions.length === 0) {
    return distribution;
  }

  let totalScore = 0;

  for (const session of sessions) {
    const quality = scoreSessionQuality(session);
    totalScore += quality.score;

    switch (quality.classification) {
      case 'low':
        distribution.low++;
        break;
      case 'medium':
        distribution.medium++;
        break;
      case 'high':
        distribution.high++;
        break;
      case 'excellent':
        distribution.excellent++;
        break;
    }
  }

  distribution.averageScore = Math.round((totalScore / sessions.length) * 10) / 10;

  return distribution;
}

// ===========================================
// ANOMALY DETECTION
// ===========================================

/**
 * Detect anomalies by comparing daily metrics to baseline
 * Threshold: >20% deviation flags an anomaly
 */
export function detectAnomalies(
  dailyMetrics: DailyMetrics,
  baselineMetrics: BaselineMetrics
): Anomaly[] {
  const anomalies: Anomaly[] = [];
  const THRESHOLD = 0.20; // 20% deviation

  const metrics = [
    {
      name: 'Pageviews',
      current: dailyMetrics.pageviews,
      baseline: baselineMetrics.sevenDayAverage.pageviews,
    },
    {
      name: 'Unique Visitors',
      current: dailyMetrics.uniqueVisitors,
      baseline: baselineMetrics.sevenDayAverage.visitors,
    },
    {
      name: 'Sessions',
      current: dailyMetrics.sessions,
      baseline: baselineMetrics.sevenDayAverage.sessions,
    },
    {
      name: 'Bounce Rate',
      current: dailyMetrics.bounceRate,
      baseline: baselineMetrics.sevenDayAverage.bounceRate,
      invertDirection: true, // Higher bounce rate is bad
    },
    {
      name: 'Avg Session Duration',
      current: dailyMetrics.avgSessionDuration,
      baseline: baselineMetrics.sevenDayAverage.avgSessionDuration,
    },
  ];

  for (const metric of metrics) {
    if (metric.baseline === 0) continue;

    const percentChange = (metric.current - metric.baseline) / metric.baseline;
    const absChange = Math.abs(percentChange);

    if (absChange >= THRESHOLD) {
      let direction: Anomaly['direction'] = percentChange > 0 ? 'increase' : 'decrease';
      if (metric.invertDirection) {
        direction = direction === 'increase' ? 'decrease' : 'increase';
      }

      // Determine severity
      let severity: AnomalySeverity;
      if (absChange >= 0.5) {
        severity = 'critical';
      } else if (absChange >= 0.3) {
        severity = 'warning';
      } else {
        severity = 'info';
      }

      // For bounce rate, swap severity interpretation
      if (metric.name === 'Bounce Rate' && direction === 'decrease') {
        // Higher bounce rate is bad, so increase is negative
        severity = severity === 'info' ? 'warning' : severity === 'warning' ? 'critical' : severity;
      }

      const percentStr = Math.round(absChange * 100);
      const isPositive =
        (direction === 'increase' && metric.name !== 'Bounce Rate') ||
        (direction === 'decrease' && metric.name === 'Bounce Rate');

      anomalies.push({
        metric: metric.name,
        currentValue: Math.round(metric.current * 100) / 100,
        baselineValue: Math.round(metric.baseline * 100) / 100,
        percentChange: Math.round(percentChange * 100 * 100) / 100,
        direction,
        severity,
        description: `${metric.name} ${direction === 'increase' ? 'increased' : 'decreased'} by ${percentStr}% ${isPositive ? '(positive)' : '(needs attention)'}`,
      });
    }
  }

  // Sort by severity (critical first)
  const severityOrder: Record<AnomalySeverity, number> = {
    critical: 0,
    warning: 1,
    info: 2,
  };

  return anomalies.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

// ===========================================
// CONVERSION PATH ANALYSIS
// ===========================================

/**
 * Analyze common paths to conversion
 */
export function analyzeConversionPaths(
  sessions: ReconstructedSession[],
  limit: number = 5
): ConversionPath[] {
  // Filter to sessions that had a purchase conversion
  const convertedSessions = sessions.filter((s) => s.conversionType === 'purchase');

  if (convertedSessions.length === 0) {
    return [];
  }

  // Extract page paths for each converted session
  const pathCounts = new Map<
    string,
    {
      count: number;
      totalTime: number;
    }
  >();

  for (const session of convertedSessions) {
    // Get unique pages in order
    const pages = session.events
      .filter((e) => e.eventType === 'pageview' && e.path)
      .map((e) => e.path as string);

    // Create path key (max 5 pages)
    const pathKey = pages.slice(0, 5).join(' → ');

    const stats = pathCounts.get(pathKey) || { count: 0, totalTime: 0 };
    stats.count++;
    stats.totalTime += session.durationSeconds;
    pathCounts.set(pathKey, stats);
  }

  // Convert to array and sort
  const paths: ConversionPath[] = Array.from(pathCounts.entries())
    .map(([pathKey, stats]) => ({
      path: pathKey.split(' → '),
      conversions: stats.count,
      avgTimeToConvert: Math.round(stats.totalTime / stats.count),
    }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, limit);

  return paths;
}

// ===========================================
// HIGH INTENT SESSION IDENTIFICATION
// ===========================================

/**
 * Identify high-intent sessions that didn't convert
 * These are sessions that showed buying signals but didn't complete purchase
 */
export function identifyHighIntentSessions(
  sessions: ReconstructedSession[],
  limit: number = 10
): HighIntentSession[] {
  // Filter to non-converting sessions with some engagement
  const nonConvertingSessions = sessions.filter(
    (s) => s.conversionType !== 'purchase' && !s.bounced
  );

  const highIntentSessions: HighIntentSession[] = [];

  for (const session of nonConvertingSessions) {
    const quality = scoreSessionQuality(session);

    // Only consider medium quality or higher
    if (quality.score < 26) continue;

    // Determine the furthest funnel stage reached
    let missedStage: FunnelStage = 'page_view';
    const hasProductView = session.events.some((e) => e.eventName === 'product_view');
    const hasAddToCart = session.events.some((e) => e.eventName === 'add_to_cart');
    const hasBeginCheckout = session.events.some((e) => e.eventName === 'begin_checkout');

    if (hasBeginCheckout) {
      missedStage = 'purchase';
    } else if (hasAddToCart) {
      missedStage = 'begin_checkout';
    } else if (hasProductView) {
      missedStage = 'add_to_cart';
    } else {
      missedStage = 'product_view';
    }

    // Get unique pages visited
    const pagesVisited = Array.from(
      new Set(
        session.events.filter((e) => e.path).map((e) => e.path as string)
      )
    );

    highIntentSessions.push({
      sessionId: session.id,
      deviceId: session.deviceId,
      entryPage: session.entryPage,
      pagesVisited,
      engagementScore: quality.score,
      lastSeen: session.endTime,
      missedConversionStage: missedStage,
    });
  }

  // Sort by engagement score (highest first) and take top N
  return highIntentSessions
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, limit);
}
