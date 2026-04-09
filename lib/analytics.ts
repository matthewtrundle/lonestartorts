/**
 * Vercel Analytics tracking utilities
 * Centralized analytics tracking for Lonestar Tortillas
 */

import { track } from '@vercel/analytics';

// ============================================
// CLIENT FINGERPRINT FOR BETTER USER TRACKING
// ============================================

let clientFingerprint: string | null = null;

/** Generate a simple client fingerprint for better user tracking */
const getClientFingerprint = (): string => {
  if (clientFingerprint) return clientFingerprint;

  if (typeof window === 'undefined') return 'server';

  // Create fingerprint from browser characteristics
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 'unknown',
  ];

  // Simple hash function
  const hash = components.join('|').split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  clientFingerprint = Math.abs(hash).toString(36);
  return clientFingerprint;
};

/** Get traffic source info from URL */
const getTrafficSource = (): { source: string; medium: string; campaign: string; gclid: string | null } => {
  if (typeof window === 'undefined') {
    return { source: 'server', medium: 'none', campaign: 'none', gclid: null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || 'direct',
    medium: params.get('utm_medium') || 'none',
    campaign: params.get('utm_campaign') || 'none',
    gclid: params.get('gclid'),
  };
};

/** Enhanced track function with fingerprint and traffic source */
const enhancedTrack = (eventName: string, properties: Record<string, unknown>) => {
  const trafficSource = getTrafficSource();
  track(eventName, {
    ...properties,
    _fingerprint: getClientFingerprint(),
    _source: trafficSource.source,
    _medium: trafficSource.medium,
    _hasGclid: trafficSource.gclid ? 'yes' : 'no',
    _timestamp: Date.now(),
  });
};

// ============================================
// GA4 E-COMMERCE HELPERS
// ============================================

/** Map product type / category to a GA4-friendly category label */
export const getGA4Category = (productType?: string, category?: string): string => {
  if (productType === 'sauce') return 'Sauces';
  if (productType === 'salsa') return 'Salsas';
  if (productType === 'chips') return 'Chips';
  if (productType === 'seasoning') return 'Seasonings';
  if (productType === 'tortilla') {
    if (category === 'flour') return 'Tortillas - Flour';
    if (category === 'corn') return 'Tortillas - Corn';
    if (category === 'wheat') return 'Tortillas - Wheat';
    return 'Tortillas';
  }
  if (productType === 'wholesale') return 'Wholesale';
  return category || 'Uncategorized';
};

/** Map brand identifier to display brand name */
export const getGA4Brand = (brand?: string): string => {
  if (brand === 'mission') return 'Mission';
  if (brand === 'la-banderita') return 'La Banderita';
  // Default: all products on this site are H-E-B products
  return 'H-E-B';
};

/** GA4 item shape per Google's e-commerce spec */
interface GA4Item {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_brand?: string;
  price: number;
  quantity: number;
}

/** Convert product data to a GA4-compliant item object */
const toGA4Item = (item: {
  productId: string;
  name: string;
  price: number; // dollars
  quantity: number;
  category?: string;
  brand?: string;
}): GA4Item => ({
  item_id: item.productId,
  item_name: item.name,
  item_category: item.category || 'Uncategorized',
  item_brand: item.brand || 'H-E-B',
  price: item.price,
  quantity: item.quantity,
});

/** Fire a GA4 e-commerce event via gtag */
const fireGA4EcommerceEvent = (
  eventName: string,
  params: Record<string, unknown>,
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// ============================================
// E-COMMERCE EVENTS
// ============================================

export interface ProductData {
  productId: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
}

export interface CartItemData {
  productId: string;
  name: string;
  price: number; // dollars
  quantity: number;
  category?: string;
  brand?: string;
  isBundle?: boolean;
}

export interface CartData {
  itemCount: number;
  cartTotal: number; // dollars
  items?: CartItemData[];
}

export interface PurchaseData {
  orderId: string;
  total: number; // dollars
  itemCount: number;
  items?: CartItemData[];
}

/** Track when a user views a product */
export const trackProductView = (product: ProductData) => {
  enhancedTrack('product_view', {
    productId: product.productId,
    name: product.name,
    price: product.price,
    category: product.category || 'uncategorized',
  });

  // GA4 view_item event
  fireGA4EcommerceEvent('view_item', {
    currency: 'USD',
    value: product.price,
    items: [toGA4Item({ ...product, quantity: 1 })],
  });
};

/** Track when a user adds an item to cart */
export const trackAddToCart = (item: CartItemData) => {
  enhancedTrack('add_to_cart', {
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    isBundle: item.isBundle || false,
  });

  // GA4 add_to_cart event
  fireGA4EcommerceEvent('add_to_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [toGA4Item(item)],
  });
};

/** Track when a user removes an item from cart */
export const trackRemoveFromCart = (item: {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  brand?: string;
}) => {
  track('remove_from_cart', {
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
  });

  // GA4 remove_from_cart event
  fireGA4EcommerceEvent('remove_from_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [toGA4Item(item)],
  });
};

/** Track when a user opens/views the cart */
export const trackViewCart = (data: CartData) => {
  track('view_cart', {
    itemCount: data.itemCount,
    cartTotal: data.cartTotal,
  });

  // GA4 view_cart event
  if (data.items && data.items.length > 0) {
    fireGA4EcommerceEvent('view_cart', {
      currency: 'USD',
      value: data.cartTotal,
      items: data.items.map((item) => toGA4Item(item)),
    });
  }
};

/** Track when a user begins checkout */
export const trackBeginCheckout = (data: CartData) => {
  enhancedTrack('begin_checkout', {
    itemCount: data.itemCount,
    cartTotal: data.cartTotal,
  });

  // GA4 begin_checkout event
  if (data.items && data.items.length > 0) {
    fireGA4EcommerceEvent('begin_checkout', {
      currency: 'USD',
      value: data.cartTotal,
      items: data.items.map((item) => toGA4Item(item)),
    });
  }
};

/** Track completed purchase */
export const trackPurchase = (data: PurchaseData) => {
  enhancedTrack('purchase', {
    orderId: data.orderId,
    total: data.total,
    itemCount: data.itemCount,
  });

  // GA4 purchase event
  fireGA4EcommerceEvent('purchase', {
    transaction_id: data.orderId,
    currency: 'USD',
    value: data.total,
    items: data.items
      ? data.items.map((item) => toGA4Item(item))
      : [],
  });
};

// ============================================
// CONTENT ENGAGEMENT EVENTS
// ============================================

export interface ContentData {
  slug: string;
  title: string;
  category?: string;
}

/** Track blog post view */
export const trackBlogView = (post: ContentData) => {
  track('blog_view', {
    slug: post.slug,
    title: post.title,
    category: post.category || 'blog',
  });
};

/** Track guide page view */
export const trackGuideView = (guide: ContentData) => {
  track('guide_view', {
    slug: guide.slug,
    title: guide.title,
  });
};

/** Track recipe page view */
export const trackRecipeView = (recipe: ContentData) => {
  track('recipe_view', {
    slug: recipe.slug,
    title: recipe.title,
  });
};

// ============================================
// VIDEO ENGAGEMENT EVENTS
// ============================================

export interface VideoData {
  videoTitle: string;
  videoSrc?: string;
}

export interface VideoCompleteData extends VideoData {
  watchTime?: number;
  completed: boolean;
}

/** Track video play start */
export const trackVideoPlay = (video: VideoData) => {
  track('video_play', {
    videoTitle: video.videoTitle,
  });
};

/** Track video completion or end */
export const trackVideoComplete = (video: VideoCompleteData) => {
  track('video_complete', {
    videoTitle: video.videoTitle,
    completed: video.completed,
    watchTime: video.watchTime || 0,
  });
};

// ============================================
// LEAD GENERATION EVENTS
// ============================================

export interface WholesaleFormData {
  businessType: string;
  volumeRange: string;
}

export interface WaitlistData {
  interests: string;
  quantity?: string;
}

/** Track wholesale form submission */
export const trackWholesaleSubmit = (data: WholesaleFormData) => {
  track('wholesale_form_submit', {
    businessType: data.businessType,
    volumeRange: data.volumeRange,
  });
};

/** Track wholesale CTA click */
export const trackWholesaleClick = (location: string) => {
  track('wholesale_click', {
    location,
  });
};

/** Track contact form submission */
export const trackContactSubmit = (topic: string) => {
  track('contact_form_submit', {
    topic,
  });
};

/** Track waitlist/pre-sale signup */
export const trackWaitlistSignup = (data: WaitlistData) => {
  track('waitlist_signup', {
    interests: data.interests,
    quantity: data.quantity || 'not_specified',
  });
};

// ============================================
// GENERAL CTA TRACKING
// ============================================

/** Track general CTA button clicks */
export const trackCTAClick = (buttonName: string, location: string) => {
  track('cta_click', {
    button: buttonName,
    location,
  });
};

/** Track outbound link clicks */
export const trackOutboundLink = (url: string, linkText?: string) => {
  track('outbound_link', {
    url,
    linkText: linkText || 'unknown',
  });
};

// ============================================
// SPIN WHEEL FUNNEL EVENTS
// ============================================

export interface SpinWheelPrizeData {
  prizeId: string;
  prizeName: string;
  prizeType: string;
  code?: string;
}

/** Track when spin wheel modal is shown */
export const trackSpinWheelShown = (utmSource?: string) => {
  track('spin_wheel_shown', {
    utmSource: utmSource || 'direct',
  });
};

/** Track when user clicks the spin button */
export const trackSpinWheelSpin = () => {
  track('spin_wheel_spin', {});
};

/** Track the spin result/prize won */
export const trackSpinWheelResult = (prize: SpinWheelPrizeData) => {
  track('spin_wheel_result', {
    prizeId: prize.prizeId,
    prizeName: prize.prizeName,
    prizeType: prize.prizeType,
  });
};

/** Track when user submits email to claim prize */
export const trackSpinWheelEmailSubmit = (prizeId: string) => {
  track('spin_wheel_email_submit', {
    prizeId,
  });
};

/** Track when prize is claimed and applied to cart */
export const trackSpinWheelClaim = (prize: SpinWheelPrizeData) => {
  track('spin_wheel_claim', {
    prizeId: prize.prizeId,
    prizeName: prize.prizeName,
    prizeType: prize.prizeType,
    code: prize.code || '',
  });
};

// ============================================
// CART ABANDONMENT FUNNEL EVENTS
// ============================================

export interface CartFunnelData {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  hasDiscount?: boolean;
  discountType?: string;
}

/** Track when cart sidebar is opened (user sees shipping cost) */
export const trackCartSidebarOpened = (data: CartFunnelData) => {
  enhancedTrack('cart_sidebar_opened', {
    itemCount: data.itemCount,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    shippingShown: data.shipping > 0 ? 'paid' : 'free',
  });
};

/** Track when cart sidebar is closed without proceeding to checkout */
export const trackCartSidebarClosed = (data: CartFunnelData & { proceedToCheckout: boolean }) => {
  enhancedTrack('cart_sidebar_closed', {
    itemCount: data.itemCount,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    proceedToCheckout: data.proceedToCheckout,
  });
};

/** Track when checkout page is viewed */
export const trackCheckoutPageViewed = (data: CartFunnelData) => {
  enhancedTrack('checkout_page_viewed', {
    itemCount: data.itemCount,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
  });
};

/** Track when user abandons checkout page */
export const trackCheckoutAbandoned = (data: CartFunnelData & { timeOnPage: number }) => {
  enhancedTrack('checkout_abandoned', {
    itemCount: data.itemCount,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    timeOnPageSeconds: Math.round(data.timeOnPage / 1000),
  });
};

/** Track exit intent survey response */
export const trackExitSurveyResponse = (data: {
  reason: string;
  page: 'cart' | 'checkout';
  itemCount: number;
  cartTotal: number;
}) => {
  enhancedTrack('exit_survey_response', {
    reason: data.reason,
    page: data.page,
    itemCount: data.itemCount,
    cartTotal: data.cartTotal,
  });
};
