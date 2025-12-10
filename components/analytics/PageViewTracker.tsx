'use client';

import { useEffect } from 'react';
import { trackBlogView, trackGuideView, trackRecipeView } from '@/lib/analytics';

interface PageViewTrackerProps {
  type: 'blog' | 'guide' | 'recipe';
  slug: string;
  title: string;
  category?: string;
}

/**
 * Client component for tracking content page views
 * Add this to blog, guide, and recipe pages to track engagement
 */
export function PageViewTracker({ type, slug, title, category }: PageViewTrackerProps) {
  useEffect(() => {
    // Track page view based on content type
    switch (type) {
      case 'blog':
        trackBlogView({ slug, title, category });
        break;
      case 'guide':
        trackGuideView({ slug, title });
        break;
      case 'recipe':
        trackRecipeView({ slug, title });
        break;
    }
  }, [type, slug, title, category]);

  // This component doesn't render anything visible
  return null;
}
