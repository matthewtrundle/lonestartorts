import type { Metadata } from 'next';
import Image from 'next/image';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Shop Texas Tortillas',
  description: 'Browse and order premium Texas tortillas delivered straight to your door. Fresh flour and corn tortillas made the Lone Star way.',
};
import { StickyCartBar } from '@/components/shop/StickyCartBar';
import { ShipsTodayCountdown } from '@/components/shop/ShipsTodayCountdown';
import { TexMexExtrasSection } from '@/components/shop/TexMexExtrasSection';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { ShopFAQ } from '@/components/shop/ShopFAQ';
import { MariaCTA } from '@/components/chat/MariaCTA';
import { Truck, Shield, ArrowRight, Check, RefreshCw, Calendar, Pause, Wheat, Star, Package } from 'lucide-react';
import Link from 'next/link';
import { products as allProducts } from '@/lib/products';

// Filter tortilla products by collection at module level
const bakeryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'bakery');
const pantryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'pantry');
const texasBrandsProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'texas-brands');

// All tortilla products for schema
const allTortillaProducts = allProducts.filter(p => p.productType === 'tortilla');

// ItemList schema for product collection rich snippets
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Premium Texas Tortillas',
  description: 'Shop authentic H-E-B tortillas and Texas-born brands shipped nationwide. FREE shipping on orders $80+.',
  numberOfItems: allTortillaProducts.length,
  itemListElement: allTortillaProducts.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: `https://lonestartortillas.com${product.image}`,
      url: `https://lonestartortillas.com/shop#${product.sku}`,
      offers: {
        '@type': 'Offer',
        price: (product.price / 100).toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Lonestar Tortillas'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'USD',
            description: 'Free shipping on orders $80+. Flat $12.99 under $80.'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 3,
              unitCode: 'DAY'
            }
          }
        }
      }
    }
  }))
};

// Ad traffic (utm_source=tiktok|google, gclid) is rewritten to /shop/ad by
// middleware so this page never reads searchParams and stays fully static.
export default function ShopPage() {
  // Main shop page - conversion-focused design
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="min-h-screen bg-white pb-24 md:pb-0">
      {/* Hero Section - Compact on mobile, proper spacing on desktop */}
      <section className="text-white pt-24 pb-6 md:pt-24 md:pb-8 overflow-hidden relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/campaigns/hero-hook-em.webp"
            alt="Texas sunset skyline"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Shop treatment: warm, consumer/dinnertime mood — sunset-tinted duotone */}
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950/85 via-sunset-900/55 to-masa-800/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-charcoal-950/40" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
              Premium H-E-B® Tortillas
              <br className="hidden md:block" />
              <span className="text-sunset-400">Shipped Nationwide</span>
            </h1>
            <p className="text-sm md:text-lg text-white/90 mb-2 md:mb-4">
              Authentic Texas tortillas delivered fresh to your door
            </p>
            <p className="text-[10px] md:text-xs text-white/60 mb-2">
              *Product images are illustrative representations
            </p>
            {/* Free Shipping CTA */}
            <div className="inline-flex items-center gap-2 bg-sunset-600 text-white py-2 px-4 md:py-3 md:px-5 rounded-lg font-bold text-sm md:text-lg shadow-lg">
              <Truck className="w-4 h-4 md:w-5 md:h-5" />
              FREE Shipping
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Compact on mobile */}
      <div className="bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-xs md:text-sm text-charcoal-700">
            <ShipsTodayCountdown />
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Featured band — breaks the grid rhythm before the collections */}
        <div className="relative rounded-2xl overflow-hidden mb-10 min-h-[260px] grid md:grid-cols-2">
          <div className="relative min-h-[200px] md:min-h-0">
            <Image
              src="/images/brand/band-kitchen.webp"
              alt="Tortillas in a cloth-lined basket beside a sizzling skillet"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="bg-charcoal-950 text-cream-50 p-8 md:p-10 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-sunset-400 mb-2">Straight from Texas</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-balance">
              The tortillas Texans won&apos;t move away from
            </h2>
            <p className="text-cream-300 mb-5 max-w-md">
              Picked up fresh from H-E-B, packed Tuesday morning, at your door in 2&ndash;4 days.
            </p>
            <div>
              <a href="#bakery" className="inline-block bg-sunset-600 hover:bg-sunset-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                Shop Bakery Fresh
              </a>
            </div>
          </div>
        </div>

        {/* Section Header — left-aligned editorial */}
        <SectionHeader
          eyebrow="The Lineup"
          title="Shop Our Tortillas"
          sub="FREE shipping on orders $80+"
          className="mb-6 md:mb-8"
        />

        {/* Bakery Fresh Collection */}
        <div className="mb-12" id="bakery">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="font-display text-2xl font-bold text-charcoal-950">Bakery Fresh Collection</h3>
            <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
          </div>
          <p className="text-sm text-charcoal-600 mb-4">Handcrafted daily. No preservatives.</p>
          <ProductGrid products={bakeryProducts} />
        </div>

        {/* Pantry Staples */}
        <div className="mb-12">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="font-display text-2xl font-bold text-charcoal-950">Pantry Staples</h3>
            <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
          </div>
          <p className="text-sm text-charcoal-600 mb-4">Shelf-stable Texas favorites</p>
          <ProductGrid products={pantryProducts} cols={4} />
        </div>

        {/* Texas-Born Favorites */}
        <div className="mb-12">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="font-display text-2xl font-bold text-charcoal-950">Texas-Born Favorites</h3>
            <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
          </div>
          <p className="text-sm text-charcoal-600 mb-4">Premium brands from the Lone Star State</p>
          <ProductGrid products={texasBrandsProducts} />
        </div>
      </div>

      {/* Tex-Mex Extras Section */}
      <TexMexExtrasSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Best Value Banner - More prominent */}
        <div className="mt-10 bg-sunset-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold mb-1">Best Value: Order $80+</h2>
              <p className="text-white">
                Get FREE shipping on your order
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-charcoal-950/25 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4" />
                80+ tortillas
              </div>
              <div className="flex items-center gap-1.5 bg-charcoal-950/25 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4" />
                ~$1/tortilla
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe & Save Banner */}
        <div className="mt-10 bg-gradient-to-r from-charcoal-950 to-charcoal-800 text-white rounded-xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-sunset-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                <RefreshCw className="w-3.5 h-3.5" />
                Subscribe & Save
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Never Run Out of Tortillas</h2>
              <p className="text-charcoal-300 text-sm md:text-base mb-4">
                Get your favorites delivered on a schedule you choose. Free shipping on every delivery, and you can change, pause, or cancel anytime.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0 mb-5">
                <div className="flex items-center gap-2 text-sm text-charcoal-200">
                  <Truck className="w-4 h-4 text-sunset-400 flex-shrink-0" />
                  <span>Free shipping always</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-200">
                  <Calendar className="w-4 h-4 text-sunset-400 flex-shrink-0" />
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-200">
                  <Pause className="w-4 h-4 text-sunset-400 flex-shrink-0" />
                  <span>Pause or skip deliveries</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-200">
                  <Check className="w-4 h-4 text-sunset-400 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 bg-sunset-700 hover:bg-sunset-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-soft"
              >
                Start a Subscription
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Other Products + Wholesale - Inline */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <Link
            href="/shop/heb-products"
            className="inline-flex items-center gap-2 text-charcoal-700 hover:text-sunset-600 font-medium transition-colors group"
          >
            Shop Other H-E-B Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="hidden sm:block text-charcoal-300">|</span>
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 text-charcoal-700 hover:text-sunset-600 font-medium transition-colors group"
          >
            Wholesale Pricing
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact - Compact */}
        <div className="mt-8 text-center text-sm text-charcoal-500">
          Questions? <a href="tel:+15128946823" className="text-sunset-600 hover:underline">(512) 894-6823</a>
          {' \u2022 '}
          <a href="mailto:howdy@lonestartortillas.com" className="text-sunset-600 hover:underline">howdy@lonestartortillas.com</a>
        </div>

        {/* Why Our Tortillas - Trust/Education Section */}
        <section className="mt-10 bg-gradient-to-r from-masa-50 to-cream-50 rounded-xl p-6 md:p-8 border border-masa-200">
          <h2 className="text-xl md:text-2xl font-bold text-charcoal-950 mb-4 text-center">Why Texans Trust H-E-B Tortillas</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-masa-100 text-masa-700 mb-2">
                <Wheat className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Quality Ingredients</h3>
              <p className="text-sm text-charcoal-600">Simple recipes with no artificial preservatives in our bakery-fresh line.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sunset-100 text-sunset-700 mb-2">
                <Star className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Texas Favorite</h3>
              <p className="text-sm text-charcoal-600">H-E-B has been a Texas staple since 1905. Their tortillas are legendary.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-200 text-charcoal-700 mb-2">
                <Package className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Ships Fresh</h3>
              <p className="text-sm text-charcoal-600">We ship Tuesdays to ensure your tortillas arrive fresh.</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-charcoal-600 mb-3">Want to learn more? Check out our guides:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/guides/tortilla-nutrition" className="text-sm text-sunset-700 hover:text-sunset-800 underline">Nutrition Facts</Link>
              <span className="text-charcoal-300">|</span>
              <Link href="/guides/how-to-store-tortillas" className="text-sm text-sunset-700 hover:text-sunset-800 underline">Storage Tips</Link>
              <span className="text-charcoal-300">|</span>
              <Link href="/guides/corn-vs-flour-tortillas" className="text-sm text-sunset-700 hover:text-sunset-800 underline">Corn vs Flour</Link>
              <span className="text-charcoal-300">|</span>
              <Link href="/guides" className="text-sm text-sunset-700 hover:text-sunset-800 underline">All Guides</Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ShopFAQ />

        {/* Talk to Maria CTA */}
        <div className="mt-12">
          <MariaCTA
            heading="Need help choosing?"
            description="Maria can help you pick the perfect tortillas for your meal. Ask about products, prices, or shipping."
            variant="banner"
          />
        </div>
      </div>

      {/* Social Proof */}
      <SocialProofSection className="mt-8" />

      {/* Sticky Cart Bar - Mobile only */}
      <StickyCartBar />
    </div>
    </>
  );
}
