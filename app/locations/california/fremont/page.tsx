import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Authentic Texas Tortillas Delivered to Fremont | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Fremont, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast 2-3 day shipping to the Bay Area.',
  keywords: 'tortillas Fremont, Texas tortillas Bay Area, H-E-B tortillas delivery California, authentic Mexican tortillas Fremont, fresh tortillas shipped East Bay',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/fremont',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to Fremont | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to Fremont. Experience the taste of Texas in the East Bay.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tortilla delivery take to Fremont?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver authentic H-E-B tortillas to Fremont in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship same day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver tortillas throughout the East Bay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver to all East Bay and Bay Area cities including Fremont, Oakland, San Jose, Hayward, Union City, Newark, and surrounding areas.',
      },
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - Fremont Delivery',
  description: 'Authentic Texas tortillas delivered to Fremont and the East Bay',
  areaServed: {
    '@type': 'City',
    name: 'Fremont',
    containedInPlace: {
      '@type': 'State',
      name: 'California',
    },
  },
  url: 'https://lonestartortillas.com/locations/california/fremont',
  priceRange: '$$',
}

export default function FremontPage() {
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
                { label: 'Fremont' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to Fremont
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in Fremont and throughout the East Bay. Experience the authentic taste of Texas.
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
              alt="Fresh authentic Texas tortillas delivered to Fremont"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Fremont Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">
              Fremont is one of the Bay Area's most diverse cities, home to a thriving tech community and people from all over the world. Among them are countless Texans who moved to the East Bay for careers in Silicon Valley but never lost their love for authentic Texas flavors.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              H-E-B tortillas have been a Texas staple since 1905, and now you don't have to wait for your next trip home to enjoy them. Whether you're in the Warm Springs district, Niles, or anywhere in Fremont, we ship authentic Texas tortillas right to your doorstep.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              From taco Tuesday with coworkers to weekend family brunches, our tortillas bring that authentic Texas quality to every meal. The Bay Area has incredible food diversity, and now you can add genuine Lone Star tortillas to the mix.
            </p>
          </section>

          {/* Shipping Info */}
          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">Fremont Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
              <li><strong>Coverage:</strong> All Fremont ZIP codes (94536-94539, 94555)</li>
            </ul>
          </section>

          {/* Local Connection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Bay Area Living</h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Fremont's tech-driven population includes many transplants from Texas who work at companies throughout Silicon Valley. If you're one of them, you know that authentic tortillas are hard to find in California - until now.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Our shelf-stable tortillas ship easily to any Bay Area address and arrive fresh, ready to transform your home cooking. Perfect for meal prepping, entertaining, or just satisfying that craving for real Texas tortillas.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">2-3</div>
                <div className="text-charcoal-600">Days to Fremont</div>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Fremont?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to your East Bay address.
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
              <Link href="/locations/california/oakland" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Oakland</Link>
              <Link href="/locations/california/san-jose" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">San Jose</Link>
              <Link href="/locations/california/san-francisco" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">San Francisco</Link>
              <Link href="/locations/california/stockton" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Stockton</Link>
              <Link href="/locations/california/sacramento" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Sacramento</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
