import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Anaheim',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Anaheim, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast shipping, premium quality.',
  keywords: 'tortillas Anaheim, Texas tortillas California, H-E-B tortillas delivery, authentic Mexican tortillas Anaheim, fresh tortillas shipped',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/anaheim',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to Anaheim | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to Anaheim. Experience the taste of Texas.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does shipping take to Anaheim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most orders arrive in 2-3 business days. We ship via refrigerated carriers to ensure freshness.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I store my tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keep them frozen for up to 6 months! Thaw at room temperature or warm directly on a skillet. [Link to: /guides/how-to-store-tortillas]',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your corn tortillas gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our corn tortillas are 100% gluten-free and made in a dedicated facility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What’s the minimum order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No minimum! Order 1 pack or 100—we’ve got you covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you ship to Los Angeles or San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We ship throughout California (except Texas).',
      },
    }
  ],
}

export default function AnaheimPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: 'California', href: '/locations/california' },
                { label: 'Anaheim' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to Anaheim
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in Anaheim, California. Experience the authentic taste of Texas.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Fresh authentic Texas tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl prose prose-lg">
          {/* Main content will be rendered from MDX or inserted here */}

          {/* Products Section */}
          <section className="my-12 not-prose">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos and enchiladas.</p>
                <span className="text-sunset-600 font-semibold">Shop Corn Tortillas &rarr;</span>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos, wraps, and quesadillas.</p>
                <span className="text-sunset-600 font-semibold">Shop Flour Tortillas &rarr;</span>
              </Link>
              <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish. A Texas favorite.</p>
                <span className="text-sunset-600 font-semibold">Shop Butter Tortillas &rarr;</span>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8 not-prose">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center not-prose">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to Anaheim.
            </p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
            </Link>
          </section>

          {/* Related Cities */}
          <section className="mt-12 not-prose">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/locations/california/los-angeles" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm">
                Los Angeles
              </Link>
              <Link href="/locations/california/santa-ana" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm">
                Santa Ana
              </Link>
              <Link href="/locations/california/irvine" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm">
                Irvine
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
