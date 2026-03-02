/**
 * Analytics Data Extraction
 * Prisma queries for extracting analytics data from AnalyticsEvent table
 */

import { prisma } from '@/lib/prisma';
import type {
  AnalyticsEventRow,
  ReconstructedSession,
  SessionEvent,
  DailyMetrics,
  BaselineMetrics,
  TopPage,
  TrafficSource,
  ConversionEvent,
} from './types';

// Session gap threshold in milliseconds (30 minutes)
const SESSION_GAP_MS = 30 * 60 * 1000;

// Conversion event names
const CONVERSION_EVENTS = [
  'purchase',
  'begin_checkout',
  'add_to_cart',
  'form_submit',
  'phone_click',
  'contact_submit',
  'wholesale_form_submit',
  'waitlist_signup',
];

// ===========================================
// RAW EVENT QUERIES
// ===========================================

/**
 * Get raw events for a date range
 */
export async function getEventsForDateRange(
  startDate: Date,
  endDate: Date
): Promise<AnalyticsEventRow[]> {
  const events = await prisma.analyticsEvent.findMany({
    where: {
      receivedAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: [{ deviceId: 'asc' }, { timestamp: 'asc' }],
  });

  return events as AnalyticsEventRow[];
}

/**
 * Parse UTM parameters from queryParams string
 */
function parseUtmParams(queryParams: string | null): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
} {
  if (!queryParams) {
    return { utmSource: null, utmMedium: null, utmCampaign: null };
  }

  try {
    const params = new URLSearchParams(queryParams);
    return {
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
    };
  } catch {
    return { utmSource: null, utmMedium: null, utmCampaign: null };
  }
}

// ===========================================
// SESSION RECONSTRUCTION
// ===========================================

/**
 * Reconstruct sessions from deviceId + timestamp gaps
 * Since Vercel's sessionId is always 0, we build sessions ourselves
 */
export async function reconstructSessions(
  startDate: Date,
  endDate: Date
): Promise<ReconstructedSession[]> {
  const events = await getEventsForDateRange(startDate, endDate);

  if (events.length === 0) {
    return [];
  }

  const sessions: ReconstructedSession[] = [];
  let currentSession: {
    events: AnalyticsEventRow[];
    deviceId: string;
  } | null = null;

  for (const event of events) {
    const deviceId = event.deviceId?.toString() || 'unknown';
    const eventTime = new Date(Number(event.timestamp));

    // Check if this event belongs to current session or starts a new one
    if (currentSession === null) {
      // First event, start new session
      currentSession = { events: [event], deviceId };
    } else if (deviceId !== currentSession.deviceId) {
      // Different device, finalize current session and start new
      sessions.push(finalizeSession(currentSession.events));
      currentSession = { events: [event], deviceId };
    } else {
      // Same device, check time gap
      const lastEvent = currentSession.events[currentSession.events.length - 1];
      const lastTime = new Date(Number(lastEvent.timestamp));
      const gap = eventTime.getTime() - lastTime.getTime();

      if (gap > SESSION_GAP_MS) {
        // Gap too large, finalize and start new session
        sessions.push(finalizeSession(currentSession.events));
        currentSession = { events: [event], deviceId };
      } else {
        // Add to current session
        currentSession.events.push(event);
      }
    }
  }

  // Finalize last session
  if (currentSession && currentSession.events.length > 0) {
    sessions.push(finalizeSession(currentSession.events));
  }

  return sessions;
}

/**
 * Convert raw events into a finalized session object
 */
function finalizeSession(events: AnalyticsEventRow[]): ReconstructedSession {
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];

  const startTime = new Date(Number(firstEvent.timestamp));
  const endTime = new Date(Number(lastEvent.timestamp));
  const durationSeconds = Math.max(0, (endTime.getTime() - startTime.getTime()) / 1000);

  const utmParams = parseUtmParams(firstEvent.queryParams);

  const pageViews = events.filter((e) => e.eventType === 'pageview').length;
  const entryPage = firstEvent.path || '/';
  const exitPage = lastEvent.path || entryPage;

  // Check for conversions
  const conversionEvent = events.find(
    (e) => e.eventName && CONVERSION_EVENTS.includes(e.eventName)
  );

  const sessionEvents: SessionEvent[] = events.map((e) => ({
    eventType: e.eventType,
    eventName: e.eventName,
    path: e.path,
    timestamp: new Date(Number(e.timestamp)),
  }));

  return {
    id: `${firstEvent.deviceId?.toString() || 'unknown'}-${startTime.getTime()}`,
    deviceId: firstEvent.deviceId?.toString() || 'unknown',
    startTime,
    endTime,
    durationSeconds,
    pageViews,
    events: sessionEvents,
    entryPage,
    exitPage,
    utmSource: utmParams.utmSource,
    utmMedium: utmParams.utmMedium,
    utmCampaign: utmParams.utmCampaign,
    country: firstEvent.country,
    deviceType: firstEvent.deviceType,
    clientName: firstEvent.clientName,
    hadConversion: !!conversionEvent,
    conversionType: conversionEvent?.eventName || null,
    bounced: pageViews <= 1 && durationSeconds < 10,
  };
}

// ===========================================
// DAILY METRICS
// ===========================================

/**
 * Get aggregated daily metrics
 */
export async function getDailyMetrics(date: Date): Promise<DailyMetrics> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Get sessions for the day
  const sessions = await reconstructSessions(startOfDay, endOfDay);

  // Count pageviews
  const pageviews = sessions.reduce((sum, s) => sum + s.pageViews, 0);

  // Count unique visitors by deviceId
  const uniqueDevices = new Set(sessions.map((s) => s.deviceId));
  const uniqueVisitors = uniqueDevices.size;

  // Calculate bounce rate
  const bouncedSessions = sessions.filter((s) => s.bounced).length;
  const bounceRate = sessions.length > 0 ? (bouncedSessions / sessions.length) * 100 : 0;

  // Calculate average session duration
  const totalDuration = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  const avgSessionDuration = sessions.length > 0 ? totalDuration / sessions.length : 0;

  // Get previous day sessions for returning visitor calculation
  const prevDayStart = new Date(startOfDay);
  prevDayStart.setDate(prevDayStart.getDate() - 30);

  const prevSessions = await reconstructSessions(prevDayStart, startOfDay);
  const prevDevices = new Set(prevSessions.map((s) => s.deviceId));

  let returningVisitors = 0;
  let newVisitors = 0;

  uniqueDevices.forEach((deviceId) => {
    if (prevDevices.has(deviceId)) {
      returningVisitors++;
    } else {
      newVisitors++;
    }
  });

  return {
    date,
    pageviews,
    uniqueVisitors,
    sessions: sessions.length,
    bounceRate: Math.round(bounceRate * 100) / 100,
    avgSessionDuration: Math.round(avgSessionDuration),
    newVisitors,
    returningVisitors,
  };
}

// ===========================================
// BASELINE METRICS
// ===========================================

/**
 * Get baseline metrics for comparison (7-day and 30-day averages)
 */
export async function getBaselineMetrics(endDate: Date): Promise<BaselineMetrics> {
  const getAverageMetrics = async (days: number) => {
    const metrics = {
      pageviews: 0,
      visitors: 0,
      sessions: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    };

    for (let i = 1; i <= days; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);

      const dayMetrics = await getDailyMetrics(date);
      metrics.pageviews += dayMetrics.pageviews;
      metrics.visitors += dayMetrics.uniqueVisitors;
      metrics.sessions += dayMetrics.sessions;
      metrics.bounceRate += dayMetrics.bounceRate;
      metrics.avgSessionDuration += dayMetrics.avgSessionDuration;
    }

    return {
      pageviews: Math.round(metrics.pageviews / days),
      visitors: Math.round(metrics.visitors / days),
      sessions: Math.round(metrics.sessions / days),
      bounceRate: Math.round((metrics.bounceRate / days) * 100) / 100,
      avgSessionDuration: Math.round(metrics.avgSessionDuration / days),
    };
  };

  const [sevenDayAverage, thirtyDayAverage] = await Promise.all([
    getAverageMetrics(7),
    getAverageMetrics(30),
  ]);

  return { sevenDayAverage, thirtyDayAverage };
}

// ===========================================
// TOP PAGES
// ===========================================

/**
 * Get top pages by view count
 */
export async function getTopPages(
  startDate: Date,
  endDate: Date,
  limit: number = 10
): Promise<TopPage[]> {
  const sessions = await reconstructSessions(startDate, endDate);

  // Aggregate page stats
  const pageStats = new Map<
    string,
    {
      views: number;
      visitors: Set<string>;
      totalTime: number;
      bounces: number;
      entrySessions: number;
    }
  >();

  for (const session of sessions) {
    const sessionPages = session.events
      .filter((e) => e.eventType === 'pageview' && e.path)
      .map((e) => e.path as string);

    // Track entry page for bounce rate calculation
    const entryPage = sessionPages[0];
    if (entryPage) {
      const stats = pageStats.get(entryPage) || {
        views: 0,
        visitors: new Set<string>(),
        totalTime: 0,
        bounces: 0,
        entrySessions: 0,
      };
      stats.entrySessions++;
      if (session.bounced) {
        stats.bounces++;
      }
      pageStats.set(entryPage, stats);
    }

    // Process each page
    for (let i = 0; i < sessionPages.length; i++) {
      const path = sessionPages[i];
      const stats = pageStats.get(path) || {
        views: 0,
        visitors: new Set<string>(),
        totalTime: 0,
        bounces: 0,
        entrySessions: 0,
      };

      stats.views++;
      stats.visitors.add(session.deviceId);

      // Calculate time on page
      const pageEvent = session.events.find(
        (e) => e.eventType === 'pageview' && e.path === path
      );
      const nextPageIndex = session.events.findIndex(
        (e, idx) =>
          e.eventType === 'pageview' && e.path !== path && session.events[idx - 1]?.path === path
      );

      if (pageEvent && nextPageIndex > 0) {
        const timeOnPage =
          session.events[nextPageIndex].timestamp.getTime() - pageEvent.timestamp.getTime();
        stats.totalTime += timeOnPage / 1000;
      }

      pageStats.set(path, stats);
    }
  }

  // Convert to array and sort
  const pages: TopPage[] = Array.from(pageStats.entries())
    .map(([path, stats]) => ({
      path,
      views: stats.views,
      uniqueVisitors: stats.visitors.size,
      avgTimeOnPage: stats.views > 0 ? Math.round(stats.totalTime / stats.views) : 0,
      bounceRate:
        stats.entrySessions > 0
          ? Math.round((stats.bounces / stats.entrySessions) * 100 * 100) / 100
          : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);

  return pages;
}

// ===========================================
// TRAFFIC SOURCES
// ===========================================

/**
 * Get traffic sources breakdown
 */
export async function getTrafficSources(
  startDate: Date,
  endDate: Date
): Promise<TrafficSource[]> {
  const sessions = await reconstructSessions(startDate, endDate);

  // Aggregate by source + medium
  const sourceStats = new Map<
    string,
    {
      source: string;
      medium: string;
      sessions: number;
      visitors: Set<string>;
      bounces: number;
      conversions: number;
    }
  >();

  for (const session of sessions) {
    const source = session.utmSource || 'direct';
    const medium = session.utmMedium || '(none)';
    const key = `${source}|${medium}`;

    const stats = sourceStats.get(key) || {
      source,
      medium,
      sessions: 0,
      visitors: new Set<string>(),
      bounces: 0,
      conversions: 0,
    };

    stats.sessions++;
    stats.visitors.add(session.deviceId);
    if (session.bounced) stats.bounces++;
    if (session.hadConversion) stats.conversions++;

    sourceStats.set(key, stats);
  }

  // Convert to array and sort
  const sources: TrafficSource[] = Array.from(sourceStats.values())
    .map((stats) => ({
      source: stats.source,
      medium: stats.medium,
      sessions: stats.sessions,
      visitors: stats.visitors.size,
      bounceRate:
        stats.sessions > 0
          ? Math.round((stats.bounces / stats.sessions) * 100 * 100) / 100
          : 0,
      conversionRate:
        stats.sessions > 0
          ? Math.round((stats.conversions / stats.sessions) * 100 * 100) / 100
          : 0,
    }))
    .sort((a, b) => b.sessions - a.sessions);

  return sources;
}

// ===========================================
// CONVERSIONS
// ===========================================

/**
 * Get conversion events breakdown
 */
export async function getConversions(
  startDate: Date,
  endDate: Date
): Promise<ConversionEvent[]> {
  const events = await prisma.analyticsEvent.findMany({
    where: {
      receivedAt: {
        gte: startDate,
        lt: endDate,
      },
      eventName: {
        in: CONVERSION_EVENTS,
      },
    },
    select: {
      eventName: true,
      deviceId: true,
    },
  });

  // Aggregate by event name
  const conversionStats = new Map<
    string,
    {
      count: number;
      devices: Set<string>;
    }
  >();

  for (const event of events) {
    const eventName = event.eventName || 'unknown';
    const deviceId = event.deviceId?.toString() || 'unknown';

    const stats = conversionStats.get(eventName) || {
      count: 0,
      devices: new Set<string>(),
    };

    stats.count++;
    stats.devices.add(deviceId);
    conversionStats.set(eventName, stats);
  }

  // Convert to array and sort
  const conversions: ConversionEvent[] = Array.from(conversionStats.entries())
    .map(([eventName, stats]) => ({
      eventName,
      count: stats.count,
      uniqueUsers: stats.devices.size,
    }))
    .sort((a, b) => b.count - a.count);

  return conversions;
}

// ===========================================
// UTILITY EXPORTS
// ===========================================

export { CONVERSION_EVENTS };
