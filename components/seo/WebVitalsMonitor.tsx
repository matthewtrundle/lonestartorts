'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

/**
 * Web Vitals Monitor - Automatically tracks Core Web Vitals
 * Reports metrics to analytics and optionally to a backend endpoint
 */
export default function WebVitalsMonitor() {
  useEffect(() => {
    // Only run in production or when analytics is enabled
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
      return;
    }

    const reportMetric = async (metric: Metric) => {
      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Optionally send to backend for storage and analysis
      try {
        await fetch('/api/admin/seo/vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
            url: window.location.pathname,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.debug('Failed to report Web Vital:', error);
      }
    };

    // Dynamically import web-vitals library
    import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      onCLS(reportMetric);
      onINP(reportMetric);
      onLCP(reportMetric);
      onFCP(reportMetric);
      onTTFB(reportMetric);
    }).catch((error) => {
      console.debug('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
}
