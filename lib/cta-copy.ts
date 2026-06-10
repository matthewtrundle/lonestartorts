/**
 * Copy variants for the bottom-of-page CTA banner. One place to write like a
 * human instead of stamping "Ready to Order?" on 200 pages.
 */
export type CtaVariant = 'order' | 'shipping' | 'bundle' | 'guide' | 'recipe' | 'location';

export interface CtaCopy {
  headline: string;
  sub: string;
  buttonText: string;
  buttonHref: string;
}

export const ctaCopy: Record<CtaVariant, CtaCopy> = {
  order: {
    headline: 'Taste what Texas already knows',
    sub: 'Authentic H-E-B tortillas, shipped fresh to your door anywhere in the US.',
    buttonText: 'Shop Tortillas',
    buttonHref: '/shop',
  },
  shipping: {
    headline: 'Fresh from Texas, 2–4 days to you',
    sub: 'Orders ship every Tuesday so your tortillas never sit over a weekend. Free shipping on $80+.',
    buttonText: 'Start Your Order',
    buttonHref: '/shop',
  },
  bundle: {
    headline: 'Stock the pantry, skip the shipping fee',
    sub: 'Bundle your favorites — orders over $80 ship free, anywhere in the country.',
    buttonText: 'Browse Bundles',
    buttonHref: '/shop#bundles',
  },
  guide: {
    headline: 'Put this guide to work',
    sub: 'The right tortilla makes the dish. Get the real thing delivered this week.',
    buttonText: 'Shop H-E-B Tortillas',
    buttonHref: '/shop',
  },
  recipe: {
    headline: 'This recipe deserves real tortillas',
    sub: 'Skip the grocery-aisle imitations — cook with the tortillas Texans actually use.',
    buttonText: 'Get the Tortillas',
    buttonHref: '/shop',
  },
  location: {
    headline: 'Texas flavor, delivered to your neighborhood',
    sub: 'Fresh H-E-B tortillas ship to your door in 2–4 business days.',
    buttonText: 'Order Now',
    buttonHref: '/shop',
  },
};
