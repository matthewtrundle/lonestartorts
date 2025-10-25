import { NextRequest, NextResponse } from 'next/server';
import { TARGET_KEYWORDS, calculateTrend, calculateChange } from '@/lib/keyword-tracker';
import type { KeywordRanking } from '@/lib/keyword-tracker';

/**
 * API endpoint for keyword ranking data
 * In production, this would integrate with Google Search Console API
 */

// In-memory storage for demo (replace with database in production)
const rankings: KeywordRanking[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    // Calculate date threshold
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    // Filter rankings by date
    const filtered = rankings.filter(
      (r) => new Date(r.checkedAt) >= threshold
    );

    // Get latest ranking for each keyword
    const latestByKeyword = new Map<string, KeywordRanking>();
    filtered.forEach((ranking) => {
      const existing = latestByKeyword.get(ranking.keyword);
      if (!existing || new Date(ranking.checkedAt) > new Date(existing.checkedAt)) {
        latestByKeyword.set(ranking.keyword, ranking);
      }
    });

    // Calculate metrics
    const metrics = Array.from(latestByKeyword.values()).map((ranking) => {
      const history = filtered
        .filter((r) => r.keyword === ranking.keyword)
        .sort((a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime());

      const positions = history.map((r) => r.position);
      const bestPosition = Math.min(...positions);
      const averagePosition = positions.reduce((sum, p) => sum + p, 0) / positions.length;

      return {
        keyword: ranking.keyword,
        currentPosition: ranking.position,
        previousPosition: ranking.previousPosition,
        change: ranking.change,
        trend: calculateTrend(ranking.position, ranking.previousPosition),
        bestPosition,
        averagePosition: Math.round(averagePosition),
        url: ranking.url,
        lastChecked: ranking.checkedAt,
      };
    });

    return NextResponse.json({
      keywords: metrics,
      count: metrics.length,
      targetKeywords: TARGET_KEYWORDS,
    });
  } catch (error) {
    console.error('Error fetching keyword rankings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: Omit<KeywordRanking, 'keywordId' | 'previousPosition' | 'change'> = await request.json();

    // Validate data
    if (!data.keyword || typeof data.position !== 'number') {
      return NextResponse.json(
        { error: 'Invalid ranking data' },
        { status: 400 }
      );
    }

    // Find previous ranking for this keyword
    const previousRankings = rankings
      .filter((r) => r.keyword === data.keyword)
      .sort((a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime());

    const previousRanking = previousRankings[0];

    // Create new ranking entry
    const ranking: KeywordRanking = {
      ...data,
      keywordId: `${data.keyword}-${Date.now()}`,
      previousPosition: previousRanking?.position,
      change: calculateChange(data.position, previousRanking?.position),
    };

    rankings.push(ranking);

    // Keep only last 1000 rankings per keyword
    const keywordRankings = rankings.filter((r) => r.keyword === data.keyword);
    if (keywordRankings.length > 1000) {
      const toRemove = keywordRankings
        .sort((a, b) => new Date(a.checkedAt).getTime() - new Date(b.checkedAt).getTime())
        .slice(0, keywordRankings.length - 1000);

      toRemove.forEach((r) => {
        const index = rankings.indexOf(r);
        if (index > -1) rankings.splice(index, 1);
      });
    }

    return NextResponse.json({ success: true, ranking });
  } catch (error) {
    console.error('Error storing keyword ranking:', error);
    return NextResponse.json(
      { error: 'Failed to store ranking' },
      { status: 500 }
    );
  }
}

/**
 * TODO: Integrate with Google Search Console API
 *
 * To enable automatic keyword tracking:
 * 1. Set up Google Search Console for lonestartortillas.com
 * 2. Create a service account in Google Cloud Console
 * 3. Grant access to Search Console property
 * 4. Add credentials to environment variables:
 *    - GOOGLE_SEARCH_CONSOLE_KEY_FILE
 *    - GOOGLE_SEARCH_CONSOLE_SITE_URL
 * 5. Implement automatic daily fetching via cron job
 *
 * Example using Google Search Console API:
 *
 * import { google } from 'googleapis';
 *
 * const searchconsole = google.searchconsole('v1');
 *
 * const response = await searchconsole.searchanalytics.query({
 *   siteUrl: process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL,
 *   requestBody: {
 *     startDate: '2024-01-01',
 *     endDate: '2024-01-31',
 *     dimensions: ['query', 'page'],
 *     rowLimit: 1000,
 *   },
 * });
 */
