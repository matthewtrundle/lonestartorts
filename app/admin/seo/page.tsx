'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';
import { getVitalRating, formatMetricValue, WEB_VITALS_THRESHOLDS } from '@/lib/seo-metrics';

interface WebVitalsData {
  aggregates: Record<string, {
    avg: number;
    median: number;
    p75: number;
    p95: number;
    good: number;
    needsImprovement: number;
    poor: number;
    count: number;
  }>;
  count: number;
}

export default function SEODashboard() {
  const router = useRouter();
  const [vitalsData, setVitalsData] = useState<WebVitalsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState(7);

  const fetchVitalsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/seo/vitals?days=${days}`);

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setVitalsData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitalsData();
  }, [days]);

  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
    }
  };

  const getRatingBadge = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return 'Good';
      case 'needs-improvement':
        return 'Needs Improvement';
      case 'poor':
        return 'Poor';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LogoFull className="text-charcoal-950 mx-auto mb-4" />
          <p className="text-charcoal-600">Loading SEO dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-charcoal-600">{error}</p>
          <button
            onClick={() => fetchVitalsData()}
            className="mt-4 px-4 py-2 bg-sunset-500 text-white rounded hover:bg-sunset-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const vitals = vitalsData?.aggregates || {};
  const hasData = vitalsData && vitalsData.count > 0;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <LogoFull className="text-charcoal-950" />
              <nav className="flex gap-4">
                <Link
                  href="/admin"
                  className="text-charcoal-600 hover:text-charcoal-950 transition-colors"
                >
                  Waitlist
                </Link>
                <Link
                  href="/admin/seo"
                  className="text-charcoal-950 font-medium border-b-2 border-sunset-500"
                >
                  SEO Monitor
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500"
              >
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasData ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">
              No Performance Data Yet
            </h2>
            <p className="text-charcoal-600 mb-6">
              Web Vitals data will appear here once users visit your site.
              Make sure analytics is enabled and users are accessing the site.
            </p>
            <div className="bg-cream-50 border border-charcoal-200 rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-charcoal-950 mb-3">
                What are Web Vitals?
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-700">
                <li>
                  <strong>LCP (Largest Contentful Paint):</strong> Measures loading performance. Good: &lt;2.5s
                </li>
                <li>
                  <strong>FID (First Input Delay):</strong> Measures interactivity. Good: &lt;100ms
                </li>
                <li>
                  <strong>CLS (Cumulative Layout Shift):</strong> Measures visual stability. Good: &lt;0.1
                </li>
                <li>
                  <strong>FCP (First Contentful Paint):</strong> Measures perceived load speed. Good: &lt;1.8s
                </li>
                <li>
                  <strong>TTFB (Time to First Byte):</strong> Measures server responsiveness. Good: &lt;800ms
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-charcoal-600 mb-2">
                  Total Measurements
                </h3>
                <p className="text-3xl font-bold text-charcoal-950">
                  {vitalsData.count}
                </p>
                <p className="text-sm text-charcoal-500 mt-1">
                  Last {days} {days === 1 ? 'day' : 'days'}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-charcoal-600 mb-2">
                  Overall Score
                </h3>
                <p className="text-3xl font-bold text-sunset-600">
                  {calculateOverallScore(vitals)}
                </p>
                <p className="text-sm text-charcoal-500 mt-1">
                  Based on Core Web Vitals
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-charcoal-600 mb-2">
                  Performance Status
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {getOverallStatus(vitals) === 'good' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      Excellent
                    </span>
                  )}
                  {getOverallStatus(vitals) === 'needs-improvement' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700">
                      Needs Work
                    </span>
                  )}
                  {getOverallStatus(vitals) === 'poor' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                      Critical
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-charcoal-200">
                <h2 className="text-xl font-bold text-charcoal-950">
                  Core Web Vitals
                </h2>
                <p className="text-sm text-charcoal-600 mt-1">
                  Key metrics that affect user experience and SEO rankings
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['LCP', 'FID', 'CLS'].map((metric) => {
                    const data = vitals[metric];
                    if (!data) return null;

                    const rating = getVitalRating(
                      metric.toLowerCase() as keyof typeof WEB_VITALS_THRESHOLDS,
                      data.p75
                    );

                    return (
                      <div key={metric} className="border border-charcoal-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-charcoal-950">{metric}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(
                              rating
                            )}`}
                          >
                            {getRatingBadge(rating)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-2xl font-bold text-charcoal-950">
                              {formatMetricValue(
                                metric.toLowerCase() as keyof typeof WEB_VITALS_THRESHOLDS,
                                data.p75
                              )}
                            </p>
                            <p className="text-xs text-charcoal-500">75th percentile</p>
                          </div>

                          <div className="pt-3 border-t border-charcoal-100">
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div>
                                <p className="font-semibold text-green-600">{data.good}</p>
                                <p className="text-charcoal-500">Good</p>
                              </div>
                              <div>
                                <p className="font-semibold text-yellow-600">
                                  {data.needsImprovement}
                                </p>
                                <p className="text-charcoal-500">Needs Work</p>
                              </div>
                              <div>
                                <p className="font-semibold text-red-600">{data.poor}</p>
                                <p className="text-charcoal-500">Poor</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Vitals */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-charcoal-200">
                <h2 className="text-xl font-bold text-charcoal-950">
                  Additional Performance Metrics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['FCP', 'TTFB'].map((metric) => {
                    const data = vitals[metric];
                    if (!data) return null;

                    const rating = getVitalRating(
                      metric.toLowerCase() as keyof typeof WEB_VITALS_THRESHOLDS,
                      data.p75
                    );

                    return (
                      <div key={metric} className="border border-charcoal-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-charcoal-950">{metric}</h3>
                            <p className="text-xs text-charcoal-500">
                              {metric === 'FCP'
                                ? 'First Contentful Paint'
                                : 'Time to First Byte'}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(
                              rating
                            )}`}
                          >
                            {getRatingBadge(rating)}
                          </span>
                        </div>

                        <p className="text-2xl font-bold text-charcoal-950">
                          {formatMetricValue(
                            metric.toLowerCase() as keyof typeof WEB_VITALS_THRESHOLDS,
                            data.p75
                          )}
                        </p>
                        <p className="text-xs text-charcoal-500">75th percentile</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SEO Resources */}
            <div className="mt-8 bg-cream-50 border border-charcoal-200 rounded-lg p-6">
              <h3 className="font-semibold text-charcoal-950 mb-3">
                SEO Monitoring Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-charcoal-900 mb-2">
                    External Tools
                  </h4>
                  <ul className="space-y-1 text-charcoal-700">
                    <li>
                      <a
                        href="https://search.google.com/search-console"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sunset-600 hover:text-sunset-700 underline"
                      >
                        Google Search Console
                      </a>{' '}
                      - Monitor rankings and indexing
                    </li>
                    <li>
                      <a
                        href="https://analytics.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sunset-600 hover:text-sunset-700 underline"
                      >
                        Google Analytics
                      </a>{' '}
                      - Track organic traffic
                    </li>
                    <li>
                      <a
                        href="https://pagespeed.web.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sunset-600 hover:text-sunset-700 underline"
                      >
                        PageSpeed Insights
                      </a>{' '}
                      - Detailed performance analysis
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-900 mb-2">
                    Next Steps
                  </h4>
                  <ul className="space-y-1 text-charcoal-700">
                    <li>• Set up Google Search Console integration</li>
                    <li>• Configure automated weekly reports</li>
                    <li>• Monitor keyword rankings</li>
                    <li>• Track backlink profile growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function calculateOverallScore(vitals: Record<string, any>): string {
  const lcp = vitals.LCP?.p75;
  const fid = vitals.FID?.p75;
  const cls = vitals.CLS?.p75;

  if (!lcp || !fid || !cls) return 'N/A';

  let score = 0;
  if (getVitalRating('lcp', lcp) === 'good') score += 33;
  else if (getVitalRating('lcp', lcp) === 'needs-improvement') score += 17;

  if (getVitalRating('fid', fid) === 'good') score += 33;
  else if (getVitalRating('fid', fid) === 'needs-improvement') score += 17;

  if (getVitalRating('cls', cls) === 'good') score += 34;
  else if (getVitalRating('cls', cls) === 'needs-improvement') score += 17;

  return `${Math.round(score)}/100`;
}

function getOverallStatus(
  vitals: Record<string, any>
): 'good' | 'needs-improvement' | 'poor' {
  const lcp = vitals.LCP?.p75;
  const fid = vitals.FID?.p75;
  const cls = vitals.CLS?.p75;

  if (!lcp || !fid || !cls) return 'poor';

  const lcpRating = getVitalRating('lcp', lcp);
  const fidRating = getVitalRating('fid', fid);
  const clsRating = getVitalRating('cls', cls);

  if (
    lcpRating === 'good' &&
    fidRating === 'good' &&
    clsRating === 'good'
  ) {
    return 'good';
  }

  if (
    lcpRating === 'poor' ||
    fidRating === 'poor' ||
    clsRating === 'poor'
  ) {
    return 'poor';
  }

  return 'needs-improvement';
}
