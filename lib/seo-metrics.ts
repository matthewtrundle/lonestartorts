/**
 * SEO Performance Metrics and Monitoring Utilities
 */

export interface WebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
}

export interface SEOMetrics {
  timestamp: string;
  url: string;
  webVitals: Partial<WebVitals>;
  performance: {
    loadTime: number;
    domContentLoaded: number;
    resourceCount: number;
  };
  seo: {
    hasTitle: boolean;
    hasDescription: boolean;
    hasCanonical: boolean;
    hasStructuredData: boolean;
    imageCount: number;
    internalLinks: number;
    externalLinks: number;
  };
}

export interface KeywordRanking {
  keyword: string;
  position: number;
  url: string;
  searchVolume?: number;
  lastUpdated: string;
}

export interface SEOReport {
  period: string;
  metrics: {
    organicTraffic: number;
    avgPosition: number;
    totalClicks: number;
    totalImpressions: number;
    ctr: number;
  };
  topKeywords: KeywordRanking[];
  webVitalsHistory: Array<{
    date: string;
    lcp: number;
    fid: number;
    cls: number;
  }>;
  issues: Array<{
    severity: 'critical' | 'warning' | 'info';
    type: string;
    message: string;
    url?: string;
  }>;
}

/**
 * Web Vitals rating thresholds (Google standards)
 */
export const WEB_VITALS_THRESHOLDS = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 800, needsImprovement: 1800 },
  fcp: { good: 1800, needsImprovement: 3000 },
} as const;

/**
 * Get rating for a Web Vital metric
 */
export function getVitalRating(
  metric: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(
  metric: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): string {
  if (metric === 'cls') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * Calculate average Web Vitals from history
 */
export function calculateAverageVitals(
  history: Array<{ lcp?: number; fid?: number; cls?: number }>
): Partial<WebVitals> {
  if (history.length === 0) return {};

  const sum = history.reduce<{ lcp: number; fid: number; cls: number }>(
    (acc, item) => ({
      lcp: acc.lcp + (item.lcp || 0),
      fid: acc.fid + (item.fid || 0),
      cls: acc.cls + (item.cls || 0),
    }),
    { lcp: 0, fid: 0, cls: 0 }
  );

  return {
    lcp: sum.lcp / history.length,
    fid: sum.fid / history.length,
    cls: sum.cls / history.length,
  };
}

/**
 * Generate SEO health score (0-100)
 */
export function calculateSEOHealthScore(metrics: Partial<SEOMetrics>): number {
  let score = 0;
  let maxScore = 0;

  // Web Vitals (40 points)
  if (metrics.webVitals) {
    const vitals = metrics.webVitals;
    if (vitals.lcp !== undefined) {
      maxScore += 15;
      if (getVitalRating('lcp', vitals.lcp) === 'good') score += 15;
      else if (getVitalRating('lcp', vitals.lcp) === 'needs-improvement') score += 8;
    }
    if (vitals.fid !== undefined) {
      maxScore += 10;
      if (getVitalRating('fid', vitals.fid) === 'good') score += 10;
      else if (getVitalRating('fid', vitals.fid) === 'needs-improvement') score += 5;
    }
    if (vitals.cls !== undefined) {
      maxScore += 15;
      if (getVitalRating('cls', vitals.cls) === 'good') score += 15;
      else if (getVitalRating('cls', vitals.cls) === 'needs-improvement') score += 8;
    }
  }

  // SEO basics (60 points)
  if (metrics.seo) {
    maxScore += 60;
    if (metrics.seo.hasTitle) score += 15;
    if (metrics.seo.hasDescription) score += 15;
    if (metrics.seo.hasCanonical) score += 10;
    if (metrics.seo.hasStructuredData) score += 20;
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}

/**
 * Identify SEO issues from metrics
 */
export function identifySEOIssues(metrics: Partial<SEOMetrics>): SEOReport['issues'] {
  const issues: SEOReport['issues'] = [];

  // Check Web Vitals
  if (metrics.webVitals) {
    const { lcp, fid, cls } = metrics.webVitals;

    if (lcp && getVitalRating('lcp', lcp) === 'poor') {
      issues.push({
        severity: 'critical',
        type: 'performance',
        message: `LCP is poor (${formatMetricValue('lcp', lcp)}). Target: <2.5s`,
        url: metrics.url,
      });
    }

    if (fid && getVitalRating('fid', fid) === 'poor') {
      issues.push({
        severity: 'warning',
        type: 'performance',
        message: `FID needs improvement (${formatMetricValue('fid', fid)}). Target: <100ms`,
        url: metrics.url,
      });
    }

    if (cls && getVitalRating('cls', cls) === 'poor') {
      issues.push({
        severity: 'critical',
        type: 'performance',
        message: `CLS is poor (${formatMetricValue('cls', cls)}). Target: <0.1`,
        url: metrics.url,
      });
    }
  }

  // Check SEO basics
  if (metrics.seo) {
    if (!metrics.seo.hasTitle) {
      issues.push({
        severity: 'critical',
        type: 'seo',
        message: 'Missing page title',
        url: metrics.url,
      });
    }

    if (!metrics.seo.hasDescription) {
      issues.push({
        severity: 'warning',
        type: 'seo',
        message: 'Missing meta description',
        url: metrics.url,
      });
    }

    if (!metrics.seo.hasStructuredData) {
      issues.push({
        severity: 'info',
        type: 'seo',
        message: 'No structured data found',
        url: metrics.url,
      });
    }
  }

  return issues;
}
