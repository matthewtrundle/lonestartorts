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
              Choose from our premium selection. Free shipping on 4+ packs.
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

      {/* Disclaimer Banner */}
      <DisclaimerBanner />
    </>
  );
}
