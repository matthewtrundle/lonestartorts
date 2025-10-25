/**
 * SEO Reporting System
 * Generates comprehensive SEO performance reports
 */

import type { SEOReport, WebVitals } from './seo-metrics';
import type { KeywordRanking } from './keyword-tracker';

export interface ReportConfig {
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  includeKeywords: boolean;
  includeWebVitals: boolean;
  includeTraffic: boolean;
}

export interface SEOReportData {
  period: string;
  generatedAt: string;
  summary: {
    overallScore: number;
    trend: 'improving' | 'declining' | 'stable';
    highlights: string[];
    concerns: string[];
  };
  traffic?: {
    organicSessions: number;
    organicPageviews: number;
    avgSessionDuration: number;
    bounceRate: number;
    conversions: number;
    conversionRate: number;
    change: {
      sessions: number;
      pageviews: number;
      conversions: number;
    };
  };
  keywords?: {
    totalTracked: number;
    inTop3: number;
    inTop10: number;
    inTop20: number;
    improved: number;
    declined: number;
    topGainers: Array<{
      keyword: string;
      position: number;
      change: number;
    }>;
    topDecliners: Array<{
      keyword: string;
      position: number;
      change: number;
    }>;
  };
  webVitals?: {
    lcp: { avg: number; rating: string; change: number };
    fid: { avg: number; rating: string; change: number };
    cls: { avg: number; rating: string; change: number };
    passRate: number;
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    impact: string;
  }>;
}

/**
 * Generate SEO report for specified period
 */
export async function generateSEOReport(
  config: ReportConfig
): Promise<SEOReportData> {
  const report: SEOReportData = {
    period: `${config.startDate.toISOString().split('T')[0]} to ${config.endDate.toISOString().split('T')[0]}`,
    generatedAt: new Date().toISOString(),
    summary: {
      overallScore: 0,
      trend: 'stable',
      highlights: [],
      concerns: [],
    },
    recommendations: [],
  };

  // Add section placeholders based on config
  if (config.includeTraffic) {
    report.traffic = {
      organicSessions: 0,
      organicPageviews: 0,
      avgSessionDuration: 0,
      bounceRate: 0,
      conversions: 0,
      conversionRate: 0,
      change: {
        sessions: 0,
        pageviews: 0,
        conversions: 0,
      },
    };
  }

  if (config.includeKeywords) {
    report.keywords = {
      totalTracked: 0,
      inTop3: 0,
      inTop10: 0,
      inTop20: 0,
      improved: 0,
      declined: 0,
      topGainers: [],
      topDecliners: [],
    };
  }

  if (config.includeWebVitals) {
    report.webVitals = {
      lcp: { avg: 0, rating: 'good', change: 0 },
      fid: { avg: 0, rating: 'good', change: 0 },
      cls: { avg: 0, rating: 'good', change: 0 },
      passRate: 0,
    };
  }

  // Generate recommendations
  report.recommendations = generateRecommendations(report);

  return report;
}

/**
 * Generate actionable recommendations based on report data
 */
function generateRecommendations(report: SEOReportData): SEOReportData['recommendations'] {
  const recommendations: SEOReportData['recommendations'] = [];

  // Web Vitals recommendations
  if (report.webVitals) {
    if (report.webVitals.lcp.rating === 'poor') {
      recommendations.push({
        priority: 'high',
        category: 'Performance',
        title: 'Optimize Largest Contentful Paint (LCP)',
        description: 'LCP is above 4.0s. Optimize images, reduce server response time, and eliminate render-blocking resources.',
        impact: 'Improving LCP can increase rankings and reduce bounce rate',
      });
    }

    if (report.webVitals.cls.rating === 'poor') {
      recommendations.push({
        priority: 'high',
        category: 'Performance',
        title: 'Fix Layout Shifts (CLS)',
        description: 'CLS is above 0.25. Add size attributes to images and embeds, avoid inserting content above existing content.',
        impact: 'Better CLS improves user experience and SEO rankings',
      });
    }

    if (report.webVitals.passRate < 75) {
      recommendations.push({
        priority: 'medium',
        category: 'Performance',
        title: 'Improve Core Web Vitals Pass Rate',
        description: `Only ${report.webVitals.passRate}% of page loads meet Core Web Vitals thresholds. Focus on mobile optimization.`,
        impact: 'Higher pass rate directly impacts search rankings',
      });
    }
  }

  // Keyword recommendations
  if (report.keywords) {
    if (report.keywords.inTop10 < report.keywords.totalTracked * 0.3) {
      recommendations.push({
        priority: 'high',
        category: 'Content',
        title: 'Improve Keyword Rankings',
        description: 'Less than 30% of tracked keywords rank in top 10. Create more targeted content and improve on-page SEO.',
        impact: 'Top 10 rankings drive 90% of organic traffic',
      });
    }

    if (report.keywords.declined > report.keywords.improved) {
      recommendations.push({
        priority: 'medium',
        category: 'Content',
        title: 'Address Declining Keywords',
        description: `${report.keywords.declined} keywords declined this period. Review and update content for declining pages.`,
        impact: 'Prevent traffic loss from declining rankings',
      });
    }
  }

  // Traffic recommendations
  if (report.traffic) {
    if (report.traffic.bounceRate > 60) {
      recommendations.push({
        priority: 'medium',
        category: 'Engagement',
        title: 'Reduce Bounce Rate',
        description: `Bounce rate is ${report.traffic.bounceRate}%. Improve page speed, content relevance, and calls-to-action.`,
        impact: 'Lower bounce rate improves engagement signals',
      });
    }

    if (report.traffic.conversionRate < 2) {
      recommendations.push({
        priority: 'high',
        category: 'Conversion',
        title: 'Optimize Conversion Funnel',
        description: `Conversion rate is ${report.traffic.conversionRate}%. Test different CTAs, simplify forms, and add trust signals.`,
        impact: 'Higher conversion rate increases ROI from organic traffic',
      });
    }
  }

  // Always include these general recommendations
  recommendations.push({
    priority: 'low',
    category: 'Monitoring',
    title: 'Set Up Google Search Console Integration',
    description: 'Connect Google Search Console API for automatic keyword tracking and indexing insights.',
    impact: 'Enables automated reporting and earlier issue detection',
  });

  recommendations.push({
    priority: 'low',
    category: 'Content',
    title: 'Create Fresh Content',
    description: 'Publish new blog posts, guides, or landing pages targeting long-tail keywords.',
    impact: 'Fresh content attracts more organic traffic and builds authority',
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Format report as email HTML
 */
export function formatReportAsHTML(report: SEOReportData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #f97316; border-bottom: 3px solid #f97316; padding-bottom: 10px; }
    h2 { color: #2d3748; margin-top: 30px; }
    .summary { background: #fff5f0; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0; }
    .metric { display: inline-block; margin: 10px 20px 10px 0; }
    .metric-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .metric-value { font-size: 24px; font-weight: bold; color: #f97316; }
    .recommendation { background: #f7fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #4299e1; }
    .priority-high { border-left-color: #f56565; }
    .priority-medium { border-left-color: #ed8936; }
    .priority-low { border-left-color: #48bb78; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <h1>🌟 Lonestar Tortillas SEO Report</h1>
  <p><strong>Report Period:</strong> ${report.period}</p>
  <p><strong>Generated:</strong> ${new Date(report.generatedAt).toLocaleString()}</p>

  <div class="summary">
    <h2>Executive Summary</h2>
    <p><strong>Overall SEO Score:</strong> ${report.summary.overallScore}/100</p>
    <p><strong>Trend:</strong> ${report.summary.trend}</p>
  </div>

  ${report.traffic ? `
  <h2>📊 Traffic Metrics</h2>
  <div class="metric">
    <div class="metric-label">Organic Sessions</div>
    <div class="metric-value">${report.traffic.organicSessions.toLocaleString()}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Conversions</div>
    <div class="metric-value">${report.traffic.conversions}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Conversion Rate</div>
    <div class="metric-value">${report.traffic.conversionRate.toFixed(2)}%</div>
  </div>
  ` : ''}

  ${report.keywords ? `
  <h2>🔑 Keyword Performance</h2>
  <div class="metric">
    <div class="metric-label">Top 10 Rankings</div>
    <div class="metric-value">${report.keywords.inTop10}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Improved</div>
    <div class="metric-value" style="color: #48bb78;">${report.keywords.improved}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Declined</div>
    <div class="metric-value" style="color: #f56565;">${report.keywords.declined}</div>
  </div>
  ` : ''}

  ${report.webVitals ? `
  <h2>⚡ Core Web Vitals</h2>
  <div class="metric">
    <div class="metric-label">LCP</div>
    <div class="metric-value">${report.webVitals.lcp.avg.toFixed(0)}ms</div>
  </div>
  <div class="metric">
    <div class="metric-label">FID</div>
    <div class="metric-value">${report.webVitals.fid.avg.toFixed(0)}ms</div>
  </div>
  <div class="metric">
    <div class="metric-label">CLS</div>
    <div class="metric-value">${report.webVitals.cls.avg.toFixed(3)}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Pass Rate</div>
    <div class="metric-value">${report.webVitals.passRate.toFixed(1)}%</div>
  </div>
  ` : ''}

  <h2>💡 Recommendations</h2>
  ${report.recommendations.map(rec => `
    <div class="recommendation priority-${rec.priority}">
      <h3>${rec.title} <span style="font-size: 12px; color: #666;">[${rec.priority.toUpperCase()}]</span></h3>
      <p><strong>Category:</strong> ${rec.category}</p>
      <p>${rec.description}</p>
      <p><em>Impact: ${rec.impact}</em></p>
    </div>
  `).join('')}

  <div class="footer">
    <p>This is an automated SEO report generated by Lonestar Tortillas monitoring system.</p>
    <p>View detailed metrics in the <a href="https://lonestartortillas.com/admin/seo">SEO Dashboard</a></p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Schedule automated reports
 * In production, use a cron job or scheduled task
 */
export async function scheduleReports() {
  // Weekly report - every Monday at 9 AM
  // Monthly report - 1st of each month at 9 AM

  // Implementation would use a task scheduler like:
  // - Vercel Cron Jobs
  // - AWS EventBridge
  // - Node-cron
  // - GitHub Actions

  console.log('Report scheduling should be implemented via cron job or task scheduler');
}
