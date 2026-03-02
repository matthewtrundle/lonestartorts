/**
 * AI-Powered Analytics Synthesis
 * Uses Claude to generate insights and recommendations from analytics data
 */

import Anthropic from '@anthropic-ai/sdk';
import type {
  DailyMetrics,
  BaselineMetrics,
  FunnelAnalysis,
  SessionQualityDistribution,
  Anomaly,
  TopPage,
  TrafficSource,
  ConversionEvent,
  GoogleAdsMetrics,
  AIInsights,
} from './types';

// Lazy-load Anthropic client
let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

/**
 * Generate AI-powered insights from analytics data
 */
export async function synthesizeInsights(data: {
  dailyMetrics: DailyMetrics;
  baselineMetrics: BaselineMetrics;
  funnelAnalysis: FunnelAnalysis;
  sessionQuality: SessionQualityDistribution;
  anomalies: Anomaly[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  conversions: ConversionEvent[];
  googleAds: GoogleAdsMetrics | null;
}): Promise<AIInsights> {
  const client = getAnthropicClient();

  // Build context for Claude
  const contextPrompt = buildContextPrompt(data);

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: contextPrompt,
        },
      ],
    });

    // Extract text content
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the response
    return parseAIResponse(textContent.text);
  } catch (error) {
    console.error('Error generating AI insights:', error);

    // Return fallback insights
    return generateFallbackInsights(data);
  }
}

/**
 * Build the prompt with analytics context
 */
function buildContextPrompt(data: {
  dailyMetrics: DailyMetrics;
  baselineMetrics: BaselineMetrics;
  funnelAnalysis: FunnelAnalysis;
  sessionQuality: SessionQualityDistribution;
  anomalies: Anomaly[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  conversions: ConversionEvent[];
  googleAds: GoogleAdsMetrics | null;
}): string {
  const {
    dailyMetrics,
    baselineMetrics,
    funnelAnalysis,
    sessionQuality,
    anomalies,
    topPages,
    trafficSources,
    conversions,
    googleAds,
  } = data;

  // Format metrics change
  const pageviewChange = baselineMetrics.sevenDayAverage.pageviews > 0
    ? ((dailyMetrics.pageviews - baselineMetrics.sevenDayAverage.pageviews) /
        baselineMetrics.sevenDayAverage.pageviews * 100).toFixed(1)
    : '0';

  const visitorChange = baselineMetrics.sevenDayAverage.visitors > 0
    ? ((dailyMetrics.uniqueVisitors - baselineMetrics.sevenDayAverage.visitors) /
        baselineMetrics.sevenDayAverage.visitors * 100).toFixed(1)
    : '0';

  let prompt = `You are an expert e-commerce analytics analyst for Lonestar Tortillas, a premium Texas tortilla brand. Analyze the following daily analytics data and provide actionable insights.

IMPORTANT GUIDELINES:
- This is a small but growing e-commerce business selling tortillas
- Low numbers are NORMAL for a niche product - do NOT assume features are "broken" because counts are low
- Focus on trends and relative changes, not absolute numbers
- Be specific and actionable in recommendations
- Consider seasonality and day-of-week effects
- If conversion numbers are zero or very low, suggest ways to IMPROVE conversions rather than assuming something is broken

---

## DAILY METRICS (${dailyMetrics.date.toLocaleDateString()})

- **Pageviews**: ${dailyMetrics.pageviews} (${pageviewChange}% vs 7-day avg)
- **Unique Visitors**: ${dailyMetrics.uniqueVisitors} (${visitorChange}% vs 7-day avg)
- **Sessions**: ${dailyMetrics.sessions}
- **Bounce Rate**: ${dailyMetrics.bounceRate}%
- **Avg Session Duration**: ${dailyMetrics.avgSessionDuration}s
- **New vs Returning**: ${dailyMetrics.newVisitors} new, ${dailyMetrics.returningVisitors} returning

## 7-DAY BASELINE
- Avg Pageviews: ${baselineMetrics.sevenDayAverage.pageviews}
- Avg Visitors: ${baselineMetrics.sevenDayAverage.visitors}
- Avg Bounce Rate: ${baselineMetrics.sevenDayAverage.bounceRate}%

## CONVERSION FUNNEL
${funnelAnalysis.stages.map(s => `- ${s.label}: ${s.count} users${s.conversionFromPrevious !== null ? ` (${s.conversionFromPrevious}% from previous)` : ''}`).join('\n')}
- Overall Conversion Rate: ${funnelAnalysis.overallConversionRate}%
${funnelAnalysis.biggestDropOff ? `- Biggest Drop-off: ${funnelAnalysis.biggestDropOff.from} → ${funnelAnalysis.biggestDropOff.to} (${funnelAnalysis.biggestDropOff.dropOffPercent}% lost)` : ''}

## SESSION QUALITY DISTRIBUTION
- Low (0-25): ${sessionQuality.low} sessions
- Medium (26-50): ${sessionQuality.medium} sessions
- High (51-75): ${sessionQuality.high} sessions
- Excellent (76-100): ${sessionQuality.excellent} sessions
- Average Score: ${sessionQuality.averageScore}/100

## TOP PAGES
${topPages.slice(0, 5).map(p => `- ${p.path}: ${p.views} views, ${p.bounceRate}% bounce`).join('\n')}

## TRAFFIC SOURCES
${trafficSources.slice(0, 5).map(s => `- ${s.source}/${s.medium}: ${s.sessions} sessions, ${s.conversionRate}% conv rate`).join('\n')}

## CONVERSION EVENTS
${conversions.length > 0 ? conversions.map(c => `- ${c.eventName}: ${c.count} (${c.uniqueUsers} unique users)`).join('\n') : '- No conversion events recorded today'}

## ANOMALIES DETECTED
${anomalies.length > 0 ? anomalies.map(a => `- [${a.severity.toUpperCase()}] ${a.description}`).join('\n') : '- No significant anomalies detected'}`;

  // Add Google Ads section if available
  if (googleAds) {
    prompt += `

## GOOGLE ADS PERFORMANCE
- **Spend**: $${googleAds.spend}
- **Clicks**: ${googleAds.clicks}
- **Impressions**: ${googleAds.impressions}
- **CTR**: ${googleAds.ctr}%
- **CPC**: $${googleAds.cpc}
- **Conversions**: ${googleAds.conversions}
- **ROAS**: ${googleAds.roas}x

### Top Campaigns
${googleAds.campaigns.slice(0, 5).map(c => `- ${c.name}: $${c.spend} spend, ${c.conversions} conversions, ${c.roas}x ROAS`).join('\n')}`;
  }

  prompt += `

---

Based on this data, provide your analysis in the following JSON format:

{
  "executiveSummary": "2-3 sentence high-level summary of site performance",
  "keyInsights": ["insight 1", "insight 2", "insight 3"],
  "recommendations": ["actionable recommendation 1", "actionable recommendation 2", "actionable recommendation 3"],
  "risksAndOpportunities": {
    "risks": ["risk 1", "risk 2"],
    "opportunities": ["opportunity 1", "opportunity 2"]
  }
}

Respond with ONLY the JSON object, no additional text.`;

  return prompt;
}

/**
 * Parse Claude's response into structured insights
 */
function parseAIResponse(responseText: string): AIInsights {
  try {
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (
      !parsed.executiveSummary ||
      !Array.isArray(parsed.keyInsights) ||
      !Array.isArray(parsed.recommendations)
    ) {
      throw new Error('Invalid response structure');
    }

    return {
      executiveSummary: String(parsed.executiveSummary),
      keyInsights: parsed.keyInsights.map(String).slice(0, 5),
      recommendations: parsed.recommendations.map(String).slice(0, 5),
      risksAndOpportunities: {
        risks: Array.isArray(parsed.risksAndOpportunities?.risks)
          ? parsed.risksAndOpportunities.risks.map(String).slice(0, 3)
          : [],
        opportunities: Array.isArray(parsed.risksAndOpportunities?.opportunities)
          ? parsed.risksAndOpportunities.opportunities.map(String).slice(0, 3)
          : [],
      },
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    console.error('Raw response:', responseText);

    // Return a simple fallback
    return {
      executiveSummary: 'Unable to generate AI summary. Please review the metrics directly.',
      keyInsights: ['AI analysis temporarily unavailable'],
      recommendations: ['Review the metrics sections below for insights'],
      risksAndOpportunities: {
        risks: [],
        opportunities: [],
      },
    };
  }
}

/**
 * Generate fallback insights when AI is unavailable
 */
function generateFallbackInsights(data: {
  dailyMetrics: DailyMetrics;
  baselineMetrics: BaselineMetrics;
  funnelAnalysis: FunnelAnalysis;
  sessionQuality: SessionQualityDistribution;
  anomalies: Anomaly[];
}): AIInsights {
  const { dailyMetrics, baselineMetrics, funnelAnalysis, anomalies } = data;

  const insights: string[] = [];
  const recommendations: string[] = [];
  const risks: string[] = [];
  const opportunities: string[] = [];

  // Generate basic insights from data
  const pvChange = baselineMetrics.sevenDayAverage.pageviews > 0
    ? ((dailyMetrics.pageviews - baselineMetrics.sevenDayAverage.pageviews) /
        baselineMetrics.sevenDayAverage.pageviews * 100)
    : 0;

  if (pvChange > 20) {
    insights.push(`Traffic increased ${pvChange.toFixed(0)}% compared to 7-day average`);
    opportunities.push('Capitalize on increased traffic with targeted promotions');
  } else if (pvChange < -20) {
    insights.push(`Traffic decreased ${Math.abs(pvChange).toFixed(0)}% compared to 7-day average`);
    risks.push('Traffic decline may require attention');
  }

  if (funnelAnalysis.biggestDropOff) {
    insights.push(
      `Biggest funnel drop-off at ${funnelAnalysis.biggestDropOff.from} → ${funnelAnalysis.biggestDropOff.to}`
    );
    recommendations.push(
      `Optimize the ${funnelAnalysis.biggestDropOff.from} to ${funnelAnalysis.biggestDropOff.to} transition`
    );
  }

  if (dailyMetrics.bounceRate > 70) {
    insights.push(`High bounce rate of ${dailyMetrics.bounceRate}% needs attention`);
    recommendations.push('Review landing pages for relevance and load speed');
  }

  // Add anomaly-based insights
  for (const anomaly of anomalies.slice(0, 2)) {
    if (anomaly.severity === 'critical') {
      risks.push(anomaly.description);
    }
  }

  // Ensure we have at least some content
  if (insights.length === 0) {
    insights.push('Site metrics are within normal ranges');
  }
  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring key metrics');
  }

  return {
    executiveSummary: `Today saw ${dailyMetrics.pageviews} pageviews and ${dailyMetrics.uniqueVisitors} unique visitors with a ${dailyMetrics.bounceRate}% bounce rate. ${funnelAnalysis.overallConversionRate > 0 ? `Conversion rate was ${funnelAnalysis.overallConversionRate}%.` : 'Focus on improving conversion funnel.'}`,
    keyInsights: insights,
    recommendations,
    risksAndOpportunities: {
      risks,
      opportunities,
    },
  };
}
