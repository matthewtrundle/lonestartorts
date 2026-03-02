/**
 * Intelligence Report Email Template
 * Professional HTML email for daily analytics report
 */

import type { IntelligenceReport } from '@/lib/analytics/types';

// Color constants
const COLORS = {
  primary: '#d97706', // Amber/Lonestar orange
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  text: '#1c1917',
  textMuted: '#78716c',
  textLight: '#a8a29e',
  background: '#fafaf9',
  white: '#ffffff',
  border: '#e7e5e4',
};

/**
 * Generate the complete HTML email for the intelligence report
 */
export function generateIntelligenceReportEmail(report: IntelligenceReport): {
  subject: string;
  html: string;
} {
  const dateStr = report.reportDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const subject = `📊 Daily Intelligence Report - ${dateStr}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Intelligence Report - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.background};">
    <tr>
      <td style="padding: 24px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 700px; margin: 0 auto; background-color: ${COLORS.white}; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          ${renderHeader(dateStr)}
          ${renderExecutiveSummary(report)}
          ${renderKeyMetrics(report)}
          ${renderFunnelVisualization(report)}
          ${renderAnomalies(report)}
          ${report.googleAds ? renderGoogleAds(report) : ''}
          ${renderAIInsights(report)}
          ${renderTopPages(report)}
          ${renderTrafficSources(report)}
          ${renderFooter()}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
}

function renderHeader(dateStr: string): string {
  return `
<!-- Header -->
<tr>
  <td style="padding: 32px; background: linear-gradient(135deg, #1c1917 0%, #292524 100%); text-align: center;">
    <div style="margin-bottom: 16px;">
      <span style="display: inline-block; width: 48px; height: 48px; background-color: ${COLORS.primary}; border-radius: 50%; line-height: 48px; font-size: 24px;">⭐</span>
    </div>
    <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: ${COLORS.white};">Daily Intelligence Report</h1>
    <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">${dateStr}</p>
  </td>
</tr>`;
}

function renderExecutiveSummary(report: IntelligenceReport): string {
  return `
<!-- Executive Summary -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">Executive Summary</h2>
    <p style="margin: 0; font-size: 15px; color: ${COLORS.textMuted}; line-height: 1.6;">
      ${report.aiInsights.executiveSummary}
    </p>
  </td>
</tr>`;
}

function renderKeyMetrics(report: IntelligenceReport): string {
  const m = report.dailyMetrics;
  const b = report.baselineMetrics.sevenDayAverage;

  const calculateChange = (current: number, baseline: number) => {
    if (baseline === 0) return 0;
    return Math.round(((current - baseline) / baseline) * 100);
  };

  const formatChange = (change: number, inverted: boolean = false) => {
    const isPositive = inverted ? change < 0 : change > 0;
    const color = isPositive ? COLORS.success : change === 0 ? COLORS.textMuted : COLORS.danger;
    const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→';
    return `<span style="color: ${color}; font-size: 12px;">${arrow} ${Math.abs(change)}%</span>`;
  };

  const metrics = [
    {
      label: 'Pageviews',
      value: m.pageviews.toLocaleString(),
      change: calculateChange(m.pageviews, b.pageviews),
    },
    {
      label: 'Visitors',
      value: m.uniqueVisitors.toLocaleString(),
      change: calculateChange(m.uniqueVisitors, b.visitors),
    },
    {
      label: 'Sessions',
      value: m.sessions.toLocaleString(),
      change: calculateChange(m.sessions, b.sessions),
    },
    {
      label: 'Bounce Rate',
      value: `${m.bounceRate}%`,
      change: calculateChange(m.bounceRate, b.bounceRate),
      inverted: true,
    },
  ];

  return `
<!-- Key Metrics -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">Key Metrics</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${metrics.map(metric => `
        <td style="padding: 16px; text-align: center; background-color: ${COLORS.background}; border-radius: 6px; width: 25%;">
          <div style="font-size: 24px; font-weight: 700; color: ${COLORS.text}; margin-bottom: 4px;">${metric.value}</div>
          <div style="font-size: 12px; color: ${COLORS.textMuted}; margin-bottom: 4px;">${metric.label}</div>
          ${formatChange(metric.change, metric.inverted)}
        </td>
        `).join('<td style="width: 8px;"></td>')}
      </tr>
    </table>
    <p style="margin: 12px 0 0 0; font-size: 11px; color: ${COLORS.textLight}; text-align: center;">Compared to 7-day average</p>
  </td>
</tr>`;
}

function renderFunnelVisualization(report: IntelligenceReport): string {
  const funnel = report.funnelAnalysis;
  const maxCount = Math.max(...funnel.stages.map(s => s.count), 1);

  return `
<!-- Funnel -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">Conversion Funnel</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${funnel.stages.map((stage, index) => {
        const barWidth = maxCount > 0 ? Math.max(5, (stage.count / maxCount) * 100) : 5;
        const barColor = index === funnel.stages.length - 1 ? COLORS.success : COLORS.primary;

        return `
      <tr>
        <td style="padding: 8px 0; width: 120px;">
          <span style="font-size: 13px; color: ${COLORS.textMuted};">${stage.label}</span>
        </td>
        <td style="padding: 8px 0;">
          <div style="background-color: ${COLORS.background}; border-radius: 4px; height: 24px; position: relative; overflow: hidden;">
            <div style="background-color: ${barColor}; height: 100%; width: ${barWidth}%; border-radius: 4px; min-width: 40px;">
              <span style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); font-size: 12px; font-weight: 600; color: ${barWidth > 15 ? COLORS.white : COLORS.text};">${stage.count}</span>
            </div>
          </div>
        </td>
        <td style="padding: 8px 0 8px 12px; width: 60px; text-align: right;">
          ${stage.conversionFromPrevious !== null ? `<span style="font-size: 12px; color: ${COLORS.textMuted};">${stage.conversionFromPrevious}%</span>` : ''}
        </td>
      </tr>`;
      }).join('')}
    </table>
    <p style="margin: 12px 0 0 0; font-size: 13px; color: ${COLORS.textMuted};">
      Overall Conversion Rate: <strong style="color: ${COLORS.text};">${funnel.overallConversionRate}%</strong>
      ${funnel.biggestDropOff ? ` • Biggest drop-off: <strong style="color: ${COLORS.danger};">${funnel.biggestDropOff.from} → ${funnel.biggestDropOff.to} (${funnel.biggestDropOff.dropOffPercent}%)</strong>` : ''}
    </p>
  </td>
</tr>`;
}

function renderAnomalies(report: IntelligenceReport): string {
  if (report.anomalies.length === 0) {
    return '';
  }

  const severityColors = {
    critical: COLORS.danger,
    warning: COLORS.warning,
    info: COLORS.info,
  };

  const severityBgColors = {
    critical: '#fef2f2',
    warning: '#fffbeb',
    info: '#eff6ff',
  };

  return `
<!-- Anomalies -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">⚠️ Anomalies Detected</h2>
    ${report.anomalies.map(anomaly => `
    <div style="padding: 12px 16px; margin-bottom: 8px; background-color: ${severityBgColors[anomaly.severity]}; border-left: 4px solid ${severityColors[anomaly.severity]}; border-radius: 0 6px 6px 0;">
      <span style="display: inline-block; padding: 2px 6px; background-color: ${severityColors[anomaly.severity]}; color: white; font-size: 10px; font-weight: 600; border-radius: 4px; text-transform: uppercase; margin-right: 8px;">${anomaly.severity}</span>
      <span style="font-size: 14px; color: ${COLORS.text};">${anomaly.description}</span>
    </div>
    `).join('')}
  </td>
</tr>`;
}

function renderGoogleAds(report: IntelligenceReport): string {
  const ads = report.googleAds!;

  return `
<!-- Google Ads -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">📈 Google Ads Performance</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="padding: 12px; background-color: ${COLORS.background}; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: 700; color: ${COLORS.text};">$${ads.spend.toLocaleString()}</div>
          <div style="font-size: 11px; color: ${COLORS.textMuted};">Spend</div>
        </td>
        <td style="width: 8px;"></td>
        <td style="padding: 12px; background-color: ${COLORS.background}; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: 700; color: ${COLORS.text};">${ads.clicks.toLocaleString()}</div>
          <div style="font-size: 11px; color: ${COLORS.textMuted};">Clicks</div>
        </td>
        <td style="width: 8px;"></td>
        <td style="padding: 12px; background-color: ${COLORS.background}; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: 700; color: ${COLORS.text};">${ads.ctr}%</div>
          <div style="font-size: 11px; color: ${COLORS.textMuted};">CTR</div>
        </td>
        <td style="width: 8px;"></td>
        <td style="padding: 12px; background-color: ${COLORS.background}; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: 700; color: ${ads.roas >= 1 ? COLORS.success : COLORS.danger};">${ads.roas}x</div>
          <div style="font-size: 11px; color: ${COLORS.textMuted};">ROAS</div>
        </td>
      </tr>
    </table>
    ${ads.campaigns.length > 0 ? `
    <h3 style="margin: 16px 0 8px 0; font-size: 13px; font-weight: 600; color: ${COLORS.textMuted};">Top Campaigns</h3>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 12px;">
      <tr style="background-color: ${COLORS.background};">
        <td style="padding: 8px; font-weight: 600; color: ${COLORS.textMuted};">Campaign</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Spend</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Conv.</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">ROAS</td>
      </tr>
      ${ads.campaigns.slice(0, 5).map(c => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid ${COLORS.border};">${c.name.length > 30 ? c.name.slice(0, 30) + '...' : c.name}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">$${c.spend}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">${c.conversions}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border}; color: ${c.roas >= 1 ? COLORS.success : COLORS.danger};">${c.roas}x</td>
      </tr>
      `).join('')}
    </table>
    ` : ''}
  </td>
</tr>`;
}

function renderAIInsights(report: IntelligenceReport): string {
  const insights = report.aiInsights;

  return `
<!-- AI Insights -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">🤖 AI-Powered Insights</h2>

    ${insights.keyInsights.length > 0 ? `
    <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: ${COLORS.textMuted};">Key Insights</h3>
    <ul style="margin: 0 0 16px 0; padding-left: 20px;">
      ${insights.keyInsights.map(insight => `
      <li style="font-size: 14px; color: ${COLORS.text}; margin-bottom: 8px; line-height: 1.5;">${insight}</li>
      `).join('')}
    </ul>
    ` : ''}

    ${insights.recommendations.length > 0 ? `
    <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: ${COLORS.textMuted};">Recommendations</h3>
    <ul style="margin: 0 0 16px 0; padding-left: 20px;">
      ${insights.recommendations.map(rec => `
      <li style="font-size: 14px; color: ${COLORS.text}; margin-bottom: 8px; line-height: 1.5;">${rec}</li>
      `).join('')}
    </ul>
    ` : ''}

    ${(insights.risksAndOpportunities.risks.length > 0 || insights.risksAndOpportunities.opportunities.length > 0) ? `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${insights.risksAndOpportunities.risks.length > 0 ? `
        <td style="vertical-align: top; padding: 12px; background-color: #fef2f2; border-radius: 6px; width: 48%;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: ${COLORS.danger};">⚠️ Risks</h4>
          <ul style="margin: 0; padding-left: 16px;">
            ${insights.risksAndOpportunities.risks.map(risk => `
            <li style="font-size: 13px; color: ${COLORS.text}; margin-bottom: 4px;">${risk}</li>
            `).join('')}
          </ul>
        </td>
        ` : ''}
        ${insights.risksAndOpportunities.risks.length > 0 && insights.risksAndOpportunities.opportunities.length > 0 ? '<td style="width: 4%;"></td>' : ''}
        ${insights.risksAndOpportunities.opportunities.length > 0 ? `
        <td style="vertical-align: top; padding: 12px; background-color: #ecfdf5; border-radius: 6px; width: 48%;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: ${COLORS.success};">✨ Opportunities</h4>
          <ul style="margin: 0; padding-left: 16px;">
            ${insights.risksAndOpportunities.opportunities.map(opp => `
            <li style="font-size: 13px; color: ${COLORS.text}; margin-bottom: 4px;">${opp}</li>
            `).join('')}
          </ul>
        </td>
        ` : ''}
      </tr>
    </table>
    ` : ''}
  </td>
</tr>`;
}

function renderTopPages(report: IntelligenceReport): string {
  if (report.topPages.length === 0) {
    return '';
  }

  return `
<!-- Top Pages -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">📄 Top Pages</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 12px;">
      <tr style="background-color: ${COLORS.background};">
        <td style="padding: 8px; font-weight: 600; color: ${COLORS.textMuted};">Page</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Views</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Visitors</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Bounce</td>
      </tr>
      ${report.topPages.slice(0, 5).map(page => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid ${COLORS.border}; font-family: monospace; font-size: 11px;">${page.path.length > 35 ? page.path.slice(0, 35) + '...' : page.path}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">${page.views}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">${page.uniqueVisitors}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">${page.bounceRate}%</td>
      </tr>
      `).join('')}
    </table>
  </td>
</tr>`;
}

function renderTrafficSources(report: IntelligenceReport): string {
  if (report.trafficSources.length === 0) {
    return '';
  }

  return `
<!-- Traffic Sources -->
<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${COLORS.text}; text-transform: uppercase; letter-spacing: 0.5px;">🌐 Traffic Sources</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 12px;">
      <tr style="background-color: ${COLORS.background};">
        <td style="padding: 8px; font-weight: 600; color: ${COLORS.textMuted};">Source / Medium</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Sessions</td>
        <td style="padding: 8px; text-align: right; font-weight: 600; color: ${COLORS.textMuted};">Conv. Rate</td>
      </tr>
      ${report.trafficSources.slice(0, 5).map(source => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid ${COLORS.border};">${source.source} / ${source.medium}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border};">${source.sessions}</td>
        <td style="padding: 8px; text-align: right; border-bottom: 1px solid ${COLORS.border}; color: ${source.conversionRate > 0 ? COLORS.success : COLORS.textMuted};">${source.conversionRate}%</td>
      </tr>
      `).join('')}
    </table>
  </td>
</tr>`;
}

function renderFooter(): string {
  return `
<!-- Footer -->
<tr>
  <td style="padding: 32px; text-align: center; background-color: #1c1917;">
    <div style="margin-bottom: 12px;">
      <span style="display: inline-block; width: 32px; height: 32px; background-color: ${COLORS.primary}; border-radius: 50%; line-height: 32px; font-size: 16px;">⭐</span>
    </div>
    <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: ${COLORS.white};">Lonestar Tortillas</h3>
    <p style="margin: 0 0 16px 0; font-size: 12px; color: ${COLORS.textLight};">Premium Texas Tortillas</p>
    <p style="margin: 0; font-size: 11px; color: ${COLORS.textMuted};">
      This automated report was generated by the Lonestar Intelligence Engine.
      <br>
      Questions? Reply to this email.
    </p>
  </td>
</tr>`;
}
