/**
 * Google Analytics 4 and GTM tracking utilities
 * Centralized analytics tracking for Lonestar Tortillas
 */

// Event types for type safety
export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export type ConversionEvent = {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    price: number;
  }>;
};

// Check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' &&
         typeof window !== 'undefined';
};

// Google Analytics pageview tracking
export const pageview = (url: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
    page_path: url,
  });
};

// Track custom events
export const event = ({ action, category, label, value }: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track e-commerce conversion (purchase event)
export const trackPurchase = ({
  transaction_id,
  value,
  currency,
  items
}: ConversionEvent): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'purchase', {
    transaction_id,
    value,
    currency,
    items,
  });
};

// Track add to cart events
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price * product.quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      quantity: product.quantity,
      price: product.price,
    }],
  });
};

// Track begin checkout
export const trackBeginCheckout = (value: number, items: Array<any>): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'begin_checkout', {
    currency: 'USD',
    value,
    items,
  });
};

// Track product views
export const trackViewProduct = (product: {
  id: string;
  name: string;
  category: string;
  price: number;
}): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
    }],
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'form_submission', {
    event_category: 'Form',
    event_label: formName,
  });
};

// Track outbound link clicks
export const trackOutboundLink = (url: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'click', {
    event_category: 'outbound',
    event_label: url,
  });
};

// Track CTA button clicks
export const trackCTAClick = (buttonName: string, location: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'cta_click', {
    event_category: 'CTA',
    event_label: `${buttonName} - ${location}`,
  });
};

// Track search queries
export const trackSearch = (searchTerm: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'search', {
    search_term: searchTerm,
  });
};

// Track page views with page type context
export type PageType =
  | 'homepage'
  | 'shop'
  | 'product_detail'
  | 'product_category'
  | 'cart'
  | 'checkout'
  | 'blog'
  | 'blog_article'
  | 'guide'
  | 'recipe'
  | 'wholesale'
  | 'about'
  | 'other';

export const trackPageView = (pageType: PageType, pageName?: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'page_view_custom', {
    page_type: pageType,
    page_name: pageName || pageType,
  });
};

// Track content engagement (scroll depth, time on page)
export const trackContentEngagement = (contentType: string, contentId: string, action: 'start' | 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_100' | 'complete'): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'content_engagement', {
    content_type: contentType,
    content_id: contentId,
    engagement_action: action,
  });
};

// Track product category view
export const trackViewCategory = (category: string, productCount?: number): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'view_item_list', {
    item_list_id: category,
    item_list_name: category,
    items_count: productCount,
  });
};

// Track newsletter signup
export const trackNewsletterSignup = (location: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'newsletter_signup', {
    event_category: 'Lead Generation',
    event_label: location,
  });
};

// Track cart view
export const trackViewCart = (value: number, itemCount: number): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'view_cart', {
    currency: 'USD',
    value,
    items_count: itemCount,
  });
};

// Track remove from cart
export const trackRemoveFromCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'remove_from_cart', {
    currency: 'USD',
    value: product.price * product.quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      quantity: product.quantity,
      price: product.price,
    }],
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
