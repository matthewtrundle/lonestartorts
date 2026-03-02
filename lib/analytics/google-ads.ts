/**
 * Google Ads API Integration
 * Optional integration - returns null gracefully if not configured
 */

import type { GoogleAdsMetrics, GoogleAdsCampaign } from './types';

// Check if Google Ads is configured
export function isGoogleAdsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_ADS_CLIENT_ID &&
    process.env.GOOGLE_ADS_CLIENT_SECRET &&
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
    process.env.GOOGLE_ADS_REFRESH_TOKEN &&
    process.env.GOOGLE_ADS_CUSTOMER_ID
  );
}

/**
 * Get Google Ads metrics for a date range
 * Returns null if Google Ads is not configured
 */
export async function getGoogleAdsMetrics(
  startDate: Date,
  endDate: Date
): Promise<GoogleAdsMetrics | null> {
  if (!isGoogleAdsConfigured()) {
    console.log('Google Ads not configured - skipping metrics fetch');
    return null;
  }

  try {
    // Dynamic import to avoid build errors when not configured
    const { GoogleAdsApi, enums } = await import('google-ads-api');

    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    });

    // Remove dashes from customer ID if present
    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, '');
    const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, '');

    const customer = client.Customer({
      customer_id: customerId,
      login_customer_id: loginCustomerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    });

    // Format dates for GAQL
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '');
    };

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);

    // Query for account-level metrics
    const accountQuery = `
      SELECT
        metrics.cost_micros,
        metrics.clicks,
        metrics.impressions,
        metrics.conversions,
        metrics.conversions_value
      FROM customer
      WHERE segments.date BETWEEN '${startDateStr}' AND '${endDateStr}'
    `;

    // Query for campaign-level metrics
    const campaignQuery = `
      SELECT
        campaign.id,
        campaign.name,
        metrics.cost_micros,
        metrics.clicks,
        metrics.impressions,
        metrics.conversions,
        metrics.conversions_value
      FROM campaign
      WHERE segments.date BETWEEN '${startDateStr}' AND '${endDateStr}'
        AND campaign.status = 'ENABLED'
      ORDER BY metrics.cost_micros DESC
      LIMIT 10
    `;

    const [accountResults, campaignResults] = await Promise.all([
      customer.query(accountQuery),
      customer.query(campaignQuery),
    ]);

    // Aggregate account metrics
    let totalSpend = 0;
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalConversions = 0;
    let totalConversionValue = 0;

    for (const row of accountResults) {
      totalSpend += Number(row.metrics?.cost_micros || 0);
      totalClicks += Number(row.metrics?.clicks || 0);
      totalImpressions += Number(row.metrics?.impressions || 0);
      totalConversions += Number(row.metrics?.conversions || 0);
      totalConversionValue += Number(row.metrics?.conversions_value || 0);
    }

    // Convert micros to dollars
    const spend = totalSpend / 1_000_000;

    // Calculate derived metrics
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const cpc = totalClicks > 0 ? spend / totalClicks : 0;
    const roas = spend > 0 ? totalConversionValue / spend : 0;

    // Process campaign data
    const campaigns: GoogleAdsCampaign[] = campaignResults.map((row) => {
      const campaignSpend = Number(row.metrics?.cost_micros || 0) / 1_000_000;
      const campaignConversionValue = Number(row.metrics?.conversions_value || 0);

      return {
        id: String(row.campaign?.id || 'unknown'),
        name: String(row.campaign?.name || 'Unknown Campaign'),
        spend: Math.round(campaignSpend * 100) / 100,
        clicks: Number(row.metrics?.clicks || 0),
        impressions: Number(row.metrics?.impressions || 0),
        conversions: Number(row.metrics?.conversions || 0),
        roas: campaignSpend > 0 ? Math.round((campaignConversionValue / campaignSpend) * 100) / 100 : 0,
      };
    });

    return {
      spend: Math.round(spend * 100) / 100,
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: Math.round(ctr * 100) / 100,
      cpc: Math.round(cpc * 100) / 100,
      conversions: Math.round(totalConversions * 10) / 10,
      conversionValue: Math.round(totalConversionValue * 100) / 100,
      roas: Math.round(roas * 100) / 100,
      campaigns,
    };
  } catch (error) {
    console.error('Error fetching Google Ads metrics:', error);

    // Return null instead of throwing - graceful degradation
    return null;
  }
}

/**
 * Get Google Ads configuration status for debugging
 */
export function getGoogleAdsConfigStatus(): {
  configured: boolean;
  missingKeys: string[];
} {
  const requiredKeys = [
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
  ];

  const missingKeys = requiredKeys.filter((key) => !process.env[key]);

  return {
    configured: missingKeys.length === 0,
    missingKeys,
  };
}
