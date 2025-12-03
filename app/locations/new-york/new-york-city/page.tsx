import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to NYC',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to New York City. Fresh flour & corn tortillas delivered to Manhattan, Brooklyn, Queens, Bronx & Staten Island. Fast 2-3 day shipping.',
  keywords: 'tortillas NYC, Texas tortillas New York City, H-E-B tortillas delivery Manhattan, authentic Mexican tortillas Brooklyn, fresh tortillas shipped Queens',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/new-york/new-york-city',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to NYC | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to all five boroughs. Experience the taste of Texas in New York City.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tortilla delivery take to NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver authentic H-E-B tortillas to all five NYC boroughs in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship same day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver to all NYC boroughs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver to Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, plus surrounding areas like Yonkers, New Rochelle, and Long Island.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get Texas tortillas delivered to my NYC apartment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We ship to any residential address in NYC. Our shelf-stable tortillas are perfect for apartment living - no refrigeration needed during shipping.',
      },
    },
  ],
}

export default function NYCPage() {
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
                { label: 'New York', href: '/locations/new-york' },
                { label: 'New York City' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to NYC
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door anywhere in New York City. All five boroughs served with fast 2-3 day delivery.
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
              alt="Fresh authentic Texas tortillas delivered to New York City"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why NYC Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">
              New York City is the melting pot of the world, home to incredible food from every corner of the globe. Yet among the city's 8 million residents are thousands of Texans who know that authentic tortillas are nearly impossible to find in the five boroughs.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              H-E-B has been perfecting their tortilla recipes in Texas for over a century. These aren't your standard grocery store tortillas - they're the real deal, beloved by generations of Texans. Now, whether you're in a Manhattan high-rise, a Brooklyn brownstone, or a Queens walk-up, you can enjoy authentic Texas tortillas.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              From taco nights in Tribeca to family dinners in the Bronx, our tortillas bring authentic Texas flavor to the Big Apple. Perfect for New Yorkers who refuse to compromise on quality.
            </p>
          </section>

          {/* Borough Coverage */}
          <section className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Deliver to All Five Boroughs</h2>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-masa-50 rounded-lg">
                <div className="font-bold text-charcoal-950">Manhattan</div>
                <div className="text-sm text-charcoal-600">All neighborhoods</div>
              </div>
              <div className="text-center p-4 bg-masa-50 rounded-lg">
                <div className="font-bold text-charcoal-950">Brooklyn</div>
                <div className="text-sm text-charcoal-600">All neighborhoods</div>
              </div>
              <div className="text-center p-4 bg-masa-50 rounded-lg">
                <div className="font-bold text-charcoal-950">Queens</div>
                <div className="text-sm text-charcoal-600">All neighborhoods</div>
              </div>
              <div className="text-center p-4 bg-masa-50 rounded-lg">
                <div className="font-bold text-charcoal-950">The Bronx</div>
                <div className="text-sm text-charcoal-600">All neighborhoods</div>
              </div>
              <div className="text-center p-4 bg-masa-50 rounded-lg">
                <div className="font-bold text-charcoal-950">Staten Island</div>
                <div className="text-sm text-charcoal-600">All neighborhoods</div>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">NYC Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
              <li><strong>Apartment Friendly:</strong> Ships to any residential address</li>
            </ul>
          </section>

          {/* NYC Specific Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for NYC Apartment Living</h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              We get it - NYC apartments aren't known for their spacious kitchens. Our shelf-stable tortillas are perfect for city living. They don't require refrigeration, so you can stock up without sacrificing precious fridge space.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Plus, with doorman buildings, package rooms, and USPS holding options, getting your Texas tortillas delivered is easier than ever. No more settling for whatever your corner bodega stocks.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">2-3</div>
                <div className="text-charcoal-600">Days to NYC</div>
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

          {/* FAQ Section */}
          <section className="my-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal-950 mb-2">How long does delivery take to NYC?</h3>
                <p className="text-charcoal-700">We deliver to all five boroughs in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship the same day.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal-950 mb-2">Can I get tortillas delivered to my apartment building?</h3>
                <p className="text-charcoal-700">Absolutely! We ship via USPS, so your tortillas can be delivered to your mailroom, doorman, or held at your local post office.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal-950 mb-2">Do the tortillas need refrigeration?</h3>
                <p className="text-charcoal-700">No! Our shelf-stable tortillas ship safely without refrigeration and stay fresh for 30+ days. Perfect for NYC apartments.</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in NYC?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to your New York City address.
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
              <Link href="/locations/new-york/yonkers" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Yonkers</Link>
              <Link href="/locations/new-york/new-rochelle" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">New Rochelle</Link>
              <Link href="/locations/new-york/mount-vernon" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Mount Vernon</Link>
              <Link href="/locations/new-york/albany" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Albany</Link>
              <Link href="/locations/new-york/buffalo" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Buffalo</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
