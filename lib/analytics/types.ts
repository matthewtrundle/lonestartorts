/**
 * Analytics Intelligence Report Types
 * Type definitions for metrics, sessions, funnel stages, anomalies, and reports
 */

// ===========================================
// RAW DATA TYPES
// ===========================================

export interface AnalyticsEventRow {
  id: string;
  receivedAt: Date;
  eventType: string;
  eventName: string | null;
  timestamp: bigint;
  path: string | null;
  route: string | null;
  origin: string | null;
  referrer: string | null;
  queryParams: string | null;
  sessionId: bigint | null;
  deviceId: bigint | null;
  country: string | null;
  region: string | null;
  city: string | null;
  osName: string | null;
  clientName: string | null;
  deviceType: string | null;
  rawJson: unknown;
}

// ===========================================
// SESSION TYPES
// ===========================================

export interface ReconstructedSession {
  id: string;
  deviceId: string;
  startTime: Date;
  endTime: Date;
  durationSeconds: number;
  pageViews: number;
  events: SessionEvent[];
  entryPage: string;
  exitPage: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  country: string | null;
  deviceType: string | null;
  clientName: string | null;
  hadConversion: boolean;
  conversionType: string | null;
  bounced: boolean;
}

export interface SessionEvent {
  eventType: string;
  eventName: string | null;
  path: string | null;
  timestamp: Date;
}

// ===========================================
// METRICS TYPES
// ===========================================

export interface DailyMetrics {
  date: Date;
  pageviews: number;
  uniqueVisitors: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  newVisitors: number;
  returningVisitors: number;
}

export interface BaselineMetrics {
  sevenDayAverage: {
    pageviews: number;
    visitors: number;
    sessions: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  thirtyDayAverage: {
    pageviews: number;
    visitors: number;
    sessions: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
}

export interface TopPage {
  path: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

export interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  visitors: number;
  bounceRate: number;
  conversionRate: number;
}

export interface ConversionEvent {
  eventName: string;
  count: number;
  uniqueUsers: number;
}

// ===========================================
// FUNNEL TYPES
// ===========================================

export type FunnelStage =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'purchase';

export interface FunnelStageData {
  stage: FunnelStage;
  label: string;
  count: number;
  conversionFromPrevious: number | null;
  conversionFromTop: number;
}

export interface FunnelAnalysis {
  stages: FunnelStageData[];
  overallConversionRate: number;
  biggestDropOff: {
    from: FunnelStage;
    to: FunnelStage;
    dropOffPercent: number;
  } | null;
}

// ===========================================
// SESSION QUALITY TYPES
// ===========================================

export interface SessionQualityScore {
  sessionId: string;
  score: number; // 0-100
  factors: {
    depth: number;        // Pages visited (0-30 points)
    duration: number;     // Time spent (0-30 points)
    engagement: number;   // Events triggered (0-25 points)
    conversion: number;   // Conversion events (0-15 points)
  };
  classification: 'low' | 'medium' | 'high' | 'excellent';
}

export interface SessionQualityDistribution {
  low: number;      // 0-25
  medium: number;   // 26-50
  high: number;     // 51-75
  excellent: number; // 76-100
  averageScore: number;
}

// ===========================================
// ANOMALY DETECTION TYPES
// ===========================================

export type AnomalySeverity = 'info' | 'warning' | 'critical';
export type AnomalyDirection = 'increase' | 'decrease';

export interface Anomaly {
  metric: string;
  currentValue: number;
  baselineValue: number;
  percentChange: number;
  direction: AnomalyDirection;
  severity: AnomalySeverity;
  description: string;
}

// ===========================================
// CONVERSION PATH TYPES
// ===========================================

export interface ConversionPath {
  path: string[];
  conversions: number;
  avgTimeToConvert: number;
}

export interface HighIntentSession {
  sessionId: string;
  deviceId: string;
  entryPage: string;
  pagesVisited: string[];
  engagementScore: number;
  lastSeen: Date;
  missedConversionStage: FunnelStage;
}

// ===========================================
// GOOGLE ADS TYPES
// ===========================================

export interface GoogleAdsMetrics {
  spend: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  conversions: number;
  conversionValue: number;
  roas: number;
  campaigns: GoogleAdsCampaign[];
}

export interface GoogleAdsCampaign {
  id: string;
  name: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  roas: number;
}

// ===========================================
// AI SYNTHESIS TYPES
// ===========================================

export interface AIInsights {
  executiveSummary: string;
  keyInsights: string[];
  recommendations: string[];
  risksAndOpportunities: {
    risks: string[];
    opportunities: string[];
  };
}

// ===========================================
// FINAL REPORT TYPE
// ===========================================

export interface IntelligenceReport {
  generatedAt: Date;
  reportDate: Date;

  // Core metrics
  dailyMetrics: DailyMetrics;
  baselineMetrics: BaselineMetrics;

  // Detailed analysis
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  conversions: ConversionEvent[];

  // Funnel & sessions
  funnelAnalysis: FunnelAnalysis;
  sessionQuality: SessionQualityDistribution;

  // Anomalies
  anomalies: Anomaly[];

  // Conversion intelligence
  topConversionPaths: ConversionPath[];
  highIntentSessions: HighIntentSession[];

  // Optional Google Ads
  googleAds: GoogleAdsMetrics | null;

  // AI analysis
  aiInsights: AIInsights;
}
