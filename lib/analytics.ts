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
// E-COMMERCE EVENTS
// ============================================

export interface ProductData {
  productId: string;
  name: string;
  price: number;
  category?: string;
}

export interface CartItemData {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartData {
  itemCount: number;
  cartTotal: number;
}

export interface PurchaseData {
  orderId: string;
  total: number;
  itemCount: number;
  items?: string; // JSON string of items for reference
}

/** Track when a user views a product */
export const trackProductView = (product: ProductData) => {
  enhancedTrack('product_view', {
    productId: product.productId,
    name: product.name,
    price: product.price,
    category: product.category || 'uncategorized',
  });
};

/** Track when a user adds an item to cart */
export const trackAddToCart = (item: CartItemData) => {
  enhancedTrack('add_to_cart', {
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  });
};

/** Track when a user removes an item from cart */
export const trackRemoveFromCart = (item: { productId: string; name: string; quantity: number }) => {
  track('remove_from_cart', {
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
  });
};

/** Track when a user opens/views the cart */
export const trackViewCart = (data: CartData) => {
  track('view_cart', {
    itemCount: data.itemCount,
    cartTotal: data.cartTotal,
  });
};

/** Track when a user begins checkout */
export const trackBeginCheckout = (data: CartData) => {
  enhancedTrack('begin_checkout', {
    itemCount: data.itemCount,
    cartTotal: data.cartTotal,
  });
};

/** Track completed purchase */
export const trackPurchase = (data: PurchaseData) => {
  enhancedTrack('purchase', {
    orderId: data.orderId,
    total: data.total,
    itemCount: data.itemCount,
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
