import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Modesto',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Modesto, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast 2-3 day shipping to the Central Valley.',
  keywords: 'tortillas Modesto, Texas tortillas Central Valley, H-E-B tortillas delivery California, authentic Mexican tortillas Modesto, fresh tortillas shipped Stanislaus County',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/modesto',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to Modesto | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to Modesto. Experience the taste of Texas in the Central Valley.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tortilla delivery take to Modesto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver authentic H-E-B tortillas to Modesto in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship same day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver tortillas throughout the Central Valley?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver to all Central Valley cities including Modesto, Stockton, Fresno, Sacramento, Bakersfield, and surrounding areas.',
      },
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - Modesto Delivery',
  description: 'Authentic Texas tortillas delivered to Modesto and the Central Valley',
  areaServed: {
    '@type': 'City',
    name: 'Modesto',
    containedInPlace: {
      '@type': 'State',
      name: 'California',
    },
  },
  url: 'https://lonestartortillas.com/locations/california/modesto',
  priceRange: '$$',
}

export default function ModestoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: 'California', href: '/locations/california' },
                { label: 'Modesto' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to Modesto
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in Modesto and throughout Stanislaus County. Experience the authentic taste of Texas.
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
              alt="Fresh authentic Texas tortillas delivered to Modesto"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Modesto Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">
              Modesto, the heart of California's Central Valley, is a community built on agriculture and family values. The region's strong Hispanic heritage means residents know good tortillas when they taste them - and there's nothing quite like authentic Texas-style tortillas.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              H-E-B has been perfecting their tortilla recipes in Texas for over a century, creating products that have earned a devoted following. Now, Modesto residents can enjoy these same premium tortillas without making the long drive to the Lone Star State.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              Whether you're hosting a family gathering, preparing for a community event, or just want better tortillas for your weekly meal prep, we deliver authentic Texas quality right to your Central Valley doorstep.
            </p>
          </section>

          {/* Shipping Info */}
          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">Modesto Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
              <li><strong>Coverage:</strong> All Modesto and Stanislaus County ZIP codes</li>
            </ul>
          </section>

          {/* Local Connection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Central Valley Families</h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              The Central Valley is known for producing much of America's food, so it's fitting that residents here appreciate quality ingredients. Our Texas tortillas complement the region's farm-fresh produce perfectly.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              From Ceres to Turlock, Riverbank to Oakdale, we serve the entire Modesto metro area. Stock up for the whole family - our shelf-stable tortillas stay fresh for weeks and are perfect for busy households.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">2-3</div>
                <div className="text-charcoal-600">Days to Modesto</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">$45+</div>
                <div className="text-charcoal-600">Free Shipping</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">30+</div>
                <div className="text-charcoal-600">Day Shelf Life</div>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section className="my-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos, enchiladas, and tostadas.</p>
                <span className="text-sunset-600 font-semibold">Shop Corn Tortillas →</span>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos, wraps, quesadillas, and fajitas.</p>
                <span className="text-sunset-600 font-semibold">Shop Flour Tortillas →</span>
              </Link>
              <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish. A true Texas favorite.</p>
                <span className="text-sunset-600 font-semibold">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Modesto?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to your Central Valley address.
            </p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
            </Link>
          </section>

          {/* Related Cities */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/locations/california/stockton" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Stockton</Link>
              <Link href="/locations/california/fresno" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Fresno</Link>
              <Link href="/locations/california/sacramento" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Sacramento</Link>
              <Link href="/locations/california/bakersfield" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Bakersfield</Link>
              <Link href="/locations/california/oakland" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Oakland</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
