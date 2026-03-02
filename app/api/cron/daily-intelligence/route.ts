/**
 * Daily Analytics Intelligence Cron Job
 *
 * Runs daily at noon to generate and send an AI-powered analytics report.
 * Schedule: 0 12 * * * (12 PM daily)
 *
 * Features:
 * - Extracts analytics from PostgreSQL (AnalyticsEvent table)
 * - Reconstructs sessions from deviceId (since sessionId is always 0)
 * - Analyzes conversion funnel and session quality
 * - Detects anomalies vs 7-day baseline
 * - Optionally includes Google Ads metrics
 * - Generates AI insights using Claude
 * - Sends professional HTML email via Resend
 *
 * Supports ?test=true query param for testing without sending emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Analytics modules
import {
  reconstructSessions,
  getDailyMetrics,
  getBaselineMetrics,
  getTopPages,
  getTrafficSources,
  getConversions,
} from '@/lib/analytics/data-extraction';
import {
  analyzeFunnel,
  getSessionQualityDistribution,
  detectAnomalies,
  analyzeConversionPaths,
  identifyHighIntentSessions,
} from '@/lib/analytics/intelligence-engine';
import { getGoogleAdsMetrics, isGoogleAdsConfigured } from '@/lib/analytics/google-ads';
import { synthesizeInsights } from '@/lib/analytics/ai-synthesis';
import { generateIntelligenceReportEmail } from '@/lib/email/templates/intelligence-report';
import type { IntelligenceReport } from '@/lib/analytics/types';

// ===========================================
// CONFIGURATION
// ===========================================

// Lazy-load Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// Get recipients from environment variable
function getRecipients(): string[] {
  const recipients = process.env.ANALYTICS_EMAIL_RECIPIENTS;
  if (!recipients) {
    console.warn('ANALYTICS_EMAIL_RECIPIENTS not set, using default');
    return ['matthewtrundle@gmail.com'];
  }
  return recipients.split(',').map((email) => email.trim()).filter(Boolean);
}

// ===========================================
// AUTHORIZATION
// ===========================================

/**
 * Verify request is from Vercel Cron or authorized source
 */
function isAuthorized(req: NextRequest): boolean {
  // Allow in development
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Check test mode
  const url = new URL(req.url);
  if (url.searchParams.get('test') === 'true') {
    // Still require auth for test mode in production
    const authHeader = req.headers.get('authorization');
    if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
      return true;
    }
  }

  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  // Check Vercel cron header
  const cronSecret = req.headers.get('x-vercel-cron-secret');
  if (cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  return false;
}

// ===========================================
// MAIN HANDLER
// ===========================================

export async function GET(req: NextRequest) {
  const startTime = Date.now();

  // Check authorization
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check for test mode
  const url = new URL(req.url);
  const isTestMode = url.searchParams.get('test') === 'true';

  console.log(`[Intelligence Report] Starting${isTestMode ? ' (TEST MODE)' : ''}...`);

  try {
    // Determine report date (yesterday for a full day of data)
    const reportDate = new Date();
    reportDate.setDate(reportDate.getDate() - 1);
    reportDate.setHours(0, 0, 0, 0);

    const startOfDay = new Date(reportDate);
    const endOfDay = new Date(reportDate);
    endOfDay.setHours(23, 59, 59, 999);

    console.log(`[Intelligence Report] Report date: ${reportDate.toISOString().split('T')[0]}`);

    // ===========================================
    // DATA EXTRACTION (Parallel where possible)
    // ===========================================

    console.log('[Intelligence Report] Extracting data...');

    // Reconstruct sessions first (needed for funnel and quality analysis)
    const sessions = await reconstructSessions(startOfDay, endOfDay);
    console.log(`[Intelligence Report] Reconstructed ${sessions.length} sessions`);

    // Run parallel queries
    const [dailyMetrics, baselineMetrics, topPages, trafficSources, conversions, googleAdsMetrics] =
      await Promise.all([
        getDailyMetrics(reportDate),
        getBaselineMetrics(reportDate),
        getTopPages(startOfDay, endOfDay, 10),
        getTrafficSources(startOfDay, endOfDay),
        getConversions(startOfDay, endOfDay),
        isGoogleAdsConfigured() ? getGoogleAdsMetrics(startOfDay, endOfDay) : Promise.resolve(null),
      ]);

    console.log(`[Intelligence Report] Daily metrics: ${JSON.stringify(dailyMetrics)}`);
    console.log(`[Intelligence Report] Google Ads configured: ${isGoogleAdsConfigured()}`);

    // ===========================================
    // ANALYSIS
    // ===========================================

    console.log('[Intelligence Report] Running analysis...');

    const funnelAnalysis = analyzeFunnel(sessions);
    const sessionQuality = getSessionQualityDistribution(sessions);
    const anomalies = detectAnomalies(dailyMetrics, baselineMetrics);
    const topConversionPaths = analyzeConversionPaths(sessions, 5);
    const highIntentSessions = identifyHighIntentSessions(sessions, 10);

    console.log(`[Intelligence Report] Funnel conversion: ${funnelAnalysis.overallConversionRate}%`);
    console.log(`[Intelligence Report] Anomalies detected: ${anomalies.length}`);
    console.log(`[Intelligence Report] Session quality avg: ${sessionQuality.averageScore}`);

    // ===========================================
    // AI SYNTHESIS
    // ===========================================

    console.log('[Intelligence Report] Generating AI insights...');

    const aiInsights = await synthesizeInsights({
      dailyMetrics,
      baselineMetrics,
      funnelAnalysis,
      sessionQuality,
      anomalies,
      topPages,
      trafficSources,
      conversions,
      googleAds: googleAdsMetrics,
    });

    console.log('[Intelligence Report] AI insights generated');

    // ===========================================
    // BUILD REPORT
    // ===========================================

    const report: IntelligenceReport = {
      generatedAt: new Date(),
      reportDate,
      dailyMetrics,
      baselineMetrics,
      topPages,
      trafficSources,
      conversions,
      funnelAnalysis,
      sessionQuality,
      anomalies,
      topConversionPaths,
      highIntentSessions,
      googleAds: googleAdsMetrics,
      aiInsights,
    };

    // ===========================================
    // SEND EMAIL
    // ===========================================

    if (isTestMode) {
      const duration = Date.now() - startTime;
      console.log(`[Intelligence Report] Test mode - skipping email send (${duration}ms)`);

      return NextResponse.json({
        success: true,
        testMode: true,
        duration: `${duration}ms`,
        report: {
          date: reportDate.toISOString().split('T')[0],
          sessions: sessions.length,
          pageviews: dailyMetrics.pageviews,
          visitors: dailyMetrics.uniqueVisitors,
          bounceRate: dailyMetrics.bounceRate,
          funnelConversion: funnelAnalysis.overallConversionRate,
          anomalyCount: anomalies.length,
          sessionQualityAvg: sessionQuality.averageScore,
          googleAdsIncluded: !!googleAdsMetrics,
          aiSummary: aiInsights.executiveSummary,
        },
      });
    }

    console.log('[Intelligence Report] Generating email...');

    const { subject, html } = generateIntelligenceReportEmail(report);
    const recipients = getRecipients();

    console.log(`[Intelligence Report] Sending to ${recipients.length} recipients...`);

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject,
      html,
    });

    if (error) {
      console.error('[Intelligence Report] Email send failed:', error);
      throw new Error(`Email send failed: ${error.message}`);
    }

    const duration = Date.now() - startTime;
    console.log(`[Intelligence Report] Complete! Email sent (${duration}ms)`);

    return NextResponse.json({
      success: true,
      duration: `${duration}ms`,
      emailId: data?.id,
      recipients: recipients.length,
      report: {
        date: reportDate.toISOString().split('T')[0],
        sessions: sessions.length,
        pageviews: dailyMetrics.pageviews,
        visitors: dailyMetrics.uniqueVisitors,
        anomalyCount: anomalies.length,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[Intelligence Report] Error after ${duration}ms:`, error);

    return NextResponse.json(
      {
        error: 'Failed to generate intelligence report',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}

// Support POST for manual triggering
export async function POST(req: NextRequest) {
  return GET(req);
}
