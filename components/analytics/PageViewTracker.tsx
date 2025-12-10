'use client';

import { useEffect } from 'react';
import { trackPageView, trackViewProduct, trackContentEngagement, type PageType } from '@/lib/analytics';

interface PageViewTrackerProps {
  pageType: PageType;
  pageName?: string;
}

/**
 * Client component to track page views in server components
 * Add this component to any server component page that needs view tracking
 */
export function PageViewTracker({ pageType, pageName }: PageViewTrackerProps) {
  useEffect(() => {
    trackPageView(pageType, pageName);
  }, [pageType, pageName]);

  return null;
}

interface ProductViewTrackerProps {
  productId: string;
  productName: string;
  category: string;
  price: number;
}

/**
 * Client component to track product detail page views
 */
export function ProductViewTracker({ productId, productName, category, price }: ProductViewTrackerProps) {
  useEffect(() => {
    trackPageView('product_detail', productName);
    trackViewProduct({
      id: productId,
      name: productName,
      category,
      price,
    });
  }, [productId, productName, category, price]);

  return null;
}

interface ContentViewTrackerProps {
  contentType: 'blog' | 'guide' | 'recipe';
  contentId: string;
  contentTitle: string;
}

/**
 * Client component to track blog/guide/recipe content views with scroll tracking
 */
export function ContentViewTracker({ contentType, contentId, contentTitle }: ContentViewTrackerProps) {
  useEffect(() => {
    // Track initial view
    trackPageView(contentType === 'blog' ? 'blog_article' : contentType, contentTitle);
    trackContentEngagement(contentType, contentId, 'start');

    // Set up scroll tracking
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      for (const threshold of scrollThresholds) {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackContentEngagement(
            contentType,
            contentId,
            `scroll_${threshold}` as 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_100'
          );
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [contentType, contentId, contentTitle]);

  return null;
}
