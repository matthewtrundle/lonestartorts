import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompactHeader } from '@/components/layout/CompactHeader';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { RestaurantHero } from '@/components/restaurant/RestaurantHero';
import { PainPointGrid } from '@/components/restaurant/PainPointGrid';
import { FeatureGrid } from '@/components/restaurant/FeatureGrid';
import { TrustSignalsGrid } from '@/components/restaurant/TrustSignalsGrid';
import { TestimonialSection } from '@/components/restaurant/TestimonialSection';
import { FinalCTA } from '@/components/restaurant/FinalCTA';
import { ProductCard } from '@/components/product/ProductCard';
import { getRestaurantContent, getAllRestaurantSlugs } from '@/lib/restaurant-content';
import { products } from '@/lib/products';

interface RestaurantPageProps {
  params: {
    type: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllRestaurantSlugs();
  return slugs.map((slug) => ({
    type: slug,
  }));
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const content = getRestaurantContent(params.type);

  if (!content) {
    return {
      title: 'Restaurant Not Found',
    };
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: [content.hero.image],
      type: 'website',
    },
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const content = getRestaurantContent(params.type);

  if (!content) {
    notFound();
  }

  // Filter products to show only the 3 main tortilla products
  const tortillaProducts = products.filter((p) => p.productType === 'tortilla');

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.seo.title,
    description: content.seo.description,
    url: `https://lonestartortillas.com/restaurants/${params.type}`,
    image: content.hero.image,
    publisher: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lonestartortillas.com/images/logo.png',
      },
    },
    mainEntity: {
      '@type': 'Product',
      name: 'H-E-B Tortillas for Restaurants',
      description: content.seo.description,
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '20.00',
        highPrice: '20.00',
        priceCurrency: 'USD',
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <CompactHeader />

      {/* Hero Section */}
      <RestaurantHero
        headline={content.hero.headline}
        subhead={content.hero.subhead}
        image={content.hero.image}
        cta={content.hero.cta}
      />

      {/* Pain Points Section */}
      <PainPointGrid painPoints={content.painPoints} />

      {/* Solution/Features Section */}
      <FeatureGrid
        headline={content.solution.headline}
        subhead={content.solution.subhead}
        features={content.solution.features}
        image={content.solution.image}
      />

      {/* Product Showcase Section */}
      <section id="products" className="py-10 md:py-12 bg-cream-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-950 mb-3">
              Restaurant-Grade H-E-B Tortillas
            </h2>
            <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
              Choose from our premium selection with Smart Shipping nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tortillaProducts.map((product) => (
              <ProductCard
                key={product.sku}
                {...product}
              />
            ))}
          </div>

          {/* Shipping Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-charcoal-700">
              <strong>Smart Shipping:</strong> 1 pack: $10.60 • 2-3 packs: $18.40 • 4-5 packs: $22.65
            </p>
            <p className="text-xs text-charcoal-600 mt-2">
              All tortillas are shelf-stable with 60-day freshness guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <TrustSignalsGrid signals={content.trustSignals} />

      {/* Testimonials Section */}
      <TestimonialSection testimonials={content.testimonials} />

      {/* Final CTA Section */}
      <FinalCTA
        headline={content.finalCTA.headline}
        subhead={content.finalCTA.subhead}
        buttonText={content.finalCTA.buttonText}
      />

      {/* Restaurant Type Details Section - SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
            Why H-E-B Tortillas for {content.displayName}
          </h2>
          <div className="prose prose-charcoal max-w-none">
            <p className="text-charcoal-700 mb-4">
              For {content.displayName.toLowerCase()} looking to differentiate themselves in a competitive market,
              tortilla quality can make all the difference. H-E-B tortillas have been a staple in Texas kitchens
              for generations, known for their authentic taste, consistent texture, and reliable performance
              under demanding restaurant conditions.
            </p>
            <p className="text-charcoal-700 mb-4">
              Unlike generic wholesale tortillas that vary batch to batch, H-E-B maintains strict quality
              standards that professional kitchens depend on. Whether you&apos;re serving during a lunch rush
              or prepping for a catering event, these tortillas perform consistently every time.
            </p>
            <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">
              Shelf-Stable Convenience for Professional Kitchens
            </h3>
            <p className="text-charcoal-700 mb-4">
              One of the biggest advantages for {content.displayName.toLowerCase()} is the 60-day shelf life
              of H-E-B tortillas. This shelf-stable format eliminates the need for refrigerated storage,
              reduces waste from spoilage, and allows you to maintain consistent inventory without daily
              deliveries. Order what you need, store at room temperature, and focus on what matters most:
              serving great food to your customers.
            </p>
            <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">
              Smart Shipping Nationwide
            </h3>
            <p className="text-charcoal-700 mb-4">
              We ship H-E-B tortillas to {content.displayName.toLowerCase()} across all 50 states with our
              Smart Shipping program. Orders typically arrive in 2-3 business days via USPS Priority Mail.
              Our volume-based shipping rates reward larger orders, making it economical to stock up and
              reduce per-unit costs.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant FAQ Section - SEO Content */}
      <section className="py-12 bg-cream-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
            Frequently Asked Questions for {content.displayName}
          </h2>
          <div className="space-y-4">
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden" open>
              <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What quantities are available for restaurants?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-cream-50 border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We offer multi-pack options that provide bulk savings of 5-15% depending on quantity.
                  Each pack contains approximately 20 tortillas. For very large orders or ongoing restaurant
                  accounts, contact us directly for custom pricing and delivery schedules.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How long do H-E-B tortillas stay fresh?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-cream-50 border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  H-E-B tortillas are shelf-stable with a 60-day freshness guarantee from production date.
                  They don&apos;t require refrigeration before opening. Once opened, store in an airtight
                  container or resealable bag for best results. For restaurant use, most operators find
                  opened packs stay fresh for 1-2 weeks under normal kitchen conditions.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What types of tortillas do you offer?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-cream-50 border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We carry the full range of H-E-B tortillas: corn tortillas (perfect for street tacos,
                  enchiladas, and tostadas), flour tortillas (ideal for burritos, quesadillas, and fajitas),
                  and the popular butter flour tortillas (a Texas favorite, especially for breakfast tacos).
                  All varieties are restaurant-grade quality and ship fresh nationwide.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How fast is shipping for restaurant orders?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-cream-50 border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Most orders arrive within 2-3 business days anywhere in the continental US via USPS
                  Priority Mail. Orders placed before 2 PM CT Monday-Friday ship the same day. Alaska
                  and Hawaii orders typically take 4-7 business days. We recommend keeping a 1-2 week
                  buffer stock for restaurant operations.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Do you offer wholesale pricing?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-cream-50 border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! Our multi-pack pricing provides built-in bulk discounts. The more you order,
                  the more you save per pack. We also offer free shipping on orders over $45. For
                  high-volume restaurant accounts with recurring needs, contact us to discuss custom
                  pricing arrangements.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <DisclaimerBanner />
    </>
  );
}
