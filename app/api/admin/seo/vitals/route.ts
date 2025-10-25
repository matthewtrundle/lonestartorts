import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for collecting Web Vitals metrics
 * In production, this should store metrics in a database for analysis
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating: string;
  delta: number;
  id: string;
  navigationType: string;
  url: string;
  timestamp: string;
}

// In-memory storage for demo (replace with database in production)
const metrics: WebVitalMetric[] = [];
const MAX_METRICS = 1000; // Keep last 1000 metrics

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Validate metric data
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Store metric (in production, save to database)
    metrics.push(metric);

    // Keep only last MAX_METRICS entries
    if (metrics.length > MAX_METRICS) {
      metrics.shift();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing Web Vital:', error);
    return NextResponse.json(
      { error: 'Failed to store metric' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7', 10);
    const metricName = searchParams.get('metric');

    // Calculate date threshold
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    // Filter metrics
    let filtered = metrics.filter(
      (m) => new Date(m.timestamp) >= threshold
    );

    if (metricName) {
      filtered = filtered.filter((m) => m.name === metricName);
    }

    // Calculate aggregates
    const aggregated = calculateAggregates(filtered);

    return NextResponse.json({
      metrics: filtered,
      aggregates: aggregated,
      count: filtered.length,
    });
  } catch (error) {
    console.error('Error fetching Web Vitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

function calculateAggregates(metrics: WebVitalMetric[]) {
  const byName: Record<string, { values: number[]; ratings: string[] }> = {};

  metrics.forEach((metric) => {
    if (!byName[metric.name]) {
      byName[metric.name] = { values: [], ratings: [] };
    }
    byName[metric.name].values.push(metric.value);
    byName[metric.name].ratings.push(metric.rating);
  });

  const aggregates: Record<string, any> = {};

  Object.entries(byName).forEach(([name, data]) => {
    const values = data.values;
    const sortedValues = [...values].sort((a, b) => a - b);

    aggregates[name] = {
      avg: values.reduce((sum, v) => sum + v, 0) / values.length,
      median: sortedValues[Math.floor(sortedValues.length / 2)],
      p75: sortedValues[Math.floor(sortedValues.length * 0.75)],
      p95: sortedValues[Math.floor(sortedValues.length * 0.95)],
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
      good: data.ratings.filter((r) => r === 'good').length,
      needsImprovement: data.ratings.filter((r) => r === 'needs-improvement').length,
      poor: data.ratings.filter((r) => r === 'poor').length,
    };
  });

  return aggregates;
}
