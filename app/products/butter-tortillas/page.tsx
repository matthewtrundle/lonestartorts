import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { productHeroes } from '@/lib/hero-images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { CTABanner } from '@/components/ui/CTABanner';

export const metadata: Metadata = {
  title: 'HEB Butter Tortillas Shipped Nationwide',
  description: 'Get H-E-B® butter flour tortillas shipped to your door. Rich, buttery Texas tortillas delivered in 2-4 days. Perfect for quesadillas and wraps. FREE shipping!',
  keywords: 'HEB butter tortillas shipped, buy butter tortillas online, H-E-B butter flour tortillas, Texas butter tortillas delivery, premium butter tortillas',
  alternates: {
    canonical: 'https://lonestartortillas.com/products/butter-tortillas',
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'H-E-B® Butter Flour Tortillas',
  description: 'Premium butter flour tortillas with rich, buttery taste. Soft, pliable, and perfect for all your favorite Mexican dishes.',
  brand: { '@type': 'Brand', name: 'H-E-B' },
  image: 'https://lonestartortillas.com/images/flour-tortillas.webp',
  offers: {
    '@type': 'Offer',
    price: '16.99',
    priceCurrency: 'USD',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/PreOrder',
    seller: { '@type': 'Organization', name: 'Lonestar Tortillas' }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '89',
    bestRating: '5',
    worstRating: '1'
  }
};

export default function ButterTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <PageHero
          image={productHeroes.butter.image}
          imageAlt={productHeroes.butter.alt}
          eyebrow="Premium H-E-B®"
          title="Premium H-E-B Butter Flour Tortillas"
          sub="Rich • Buttery • Premium"
          breadcrumbs={
            <nav className="text-sm">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-cream-50 transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/shop" className="hover:text-cream-50 transition">Products</Link></li>
                <li>/</li>
                <li className="text-cream-50 font-medium">Butter Tortillas</li>
              </ol>
            </nav>
          }
        />

        <section className="container mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-masa-100 to-cream-200 shadow-large">
                <Image src="/images/flour-tortillas.webp" alt="H-E-B Premium Butter Flour Tortillas - Rich buttery Texas tortillas delivered nationwide" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-charcoal-700 leading-relaxed">
                  Experience premium quality with H-E-B® butter flour tortillas. Made with real butter for a rich, indulgent flavor, these tortillas elevate any dish. Perfect for quesadillas, wraps, and when you want that extra touch of Texas luxury.
                </p>

                <h2 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-4">Product Specifications</h2>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Type:</strong> Butter Flour Tortillas</li>
                  <li><strong>Brand:</strong> H-E-B®</li>
                  <li><strong>Size:</strong> 10-inch diameter</li>
                  <li><strong>Count:</strong> 8 tortillas per package</li>
                  <li><strong>Weight:</strong> 20 oz per package</li>
                  <li><strong>Shelf Life:</strong> 30+ days unopened (shelf-stable)</li>
                  <li><strong>Key Ingredient:</strong> Real butter for authentic flavor</li>
                  <li><strong>Best For:</strong> Quesadillas, wraps, premium tacos, fajitas</li>
                </ul>

                <h2 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-4">Why Choose H-E-B® Butter Tortillas?</h2>
                <ul className="space-y-3 text-charcoal-700">
                  <li>✓ <strong>Real Butter:</strong> Made with genuine butter for rich flavor</li>
                  <li>✓ <strong>Premium Quality:</strong> The finest H-E-B® tortilla variety</li>
                  <li>✓ <strong>Perfect Texture:</strong> Soft, pliable, and delicious</li>
                  <li>✓ <strong>Restaurant Quality:</strong> Professional-grade tortillas at home</li>
                  <li>✓ <strong>Versatile Use:</strong> Great for any occasion</li>
                </ul>
              </div>

              <div className="bg-cream-100 border-2 border-masa-200 rounded-xl p-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-black text-charcoal-950">$16.99</span>
                  <span className="text-lg text-charcoal-600">per package</span>
                </div>
                <p className="text-charcoal-600 mb-6">FREE shipping on orders $80+</p>
                <Link href="/pre-sale" className="block w-full bg-sunset-500 hover:bg-sunset-600 text-cream-50 text-center px-8 py-4 rounded-full font-bold text-lg tracking-wider uppercase transition-colors shadow-soft hover:shadow-medium">
                  Join Pre-Sale Waitlist
                </Link>
              </div>

              <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-950 mb-6">About H-E-B® Butter Tortillas</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p>
                H-E-B® butter flour tortillas represent the premium tier of Texas tortilla excellence. Made with real butter, these tortillas offer a rich, slightly sweet flavor that elevates any dish from good to extraordinary.
              </p>
              <p>
                Perfect for quesadillas where you want that extra buttery goodness, or for wraps where flavor matters. The butter adds not just taste but also contributes to the soft, pliable texture that makes these tortillas a joy to work with in the kitchen.
              </p>
              <p>
                Order H-E-B® butter tortillas online through Lonestar Tortillas and experience premium Texas quality delivered to your door, no matter where in the United States you live.
              </p>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-display font-bold text-charcoal-950 mb-6">Complete Your Order</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/products/corn-tortillas" className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Corn Tortillas →</h4>
                  <p className="text-charcoal-600 mt-2">Traditional corn tortillas for authentic tacos</p>
                </Link>
                <Link href="/products/flour-tortillas" className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Flour Tortillas →</h4>
                  <p className="text-charcoal-600 mt-2">Soft and versatile for burritos and wraps</p>
                </Link>
                <Link href="/products/specialty-tortillas" className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Specialty Varieties →</h4>
                  <p className="text-charcoal-600 mt-2">Whole wheat, spinach-herb, and more</p>
                </Link>
              </div>
            </div>
          </div>

          {/* How it ships */}
          <div className="mt-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <SectionHeader
                eyebrow="Freshness First"
                title="How it ships"
                sub="From a Texas H-E-B to your door"
              />
            </div>
            <div className="md:col-span-8">
              <StepList
                direction="vertical"
                steps={[
                  {
                    title: 'Order by Monday night',
                    description: 'Orders lock in for the weekly Tuesday shipment.',
                  },
                  {
                    title: 'Packed fresh Tuesday morning',
                    description: 'We buy your tortillas fresh and pack them for transit the same day.',
                  },
                  {
                    title: 'At your door in 2–4 days',
                    description: 'Shelf-stable in transit — 7-10 days fresh on the counter, months in the freezer.',
                  },
                ]}
              />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16">
            <CTABanner variant="shipping" />
          </div>
        </section>
      </div>
    </>
  );
}
