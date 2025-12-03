import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Moreno Valley',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Moreno Valley, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast 2-3 day shipping to the Inland Empire.',
  keywords: 'tortillas Moreno Valley, Texas tortillas Inland Empire, H-E-B tortillas delivery California, authentic Mexican tortillas Moreno Valley, fresh tortillas shipped Riverside County',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/moreno-valley',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to Moreno Valley | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to Moreno Valley. Experience the taste of Texas in the Inland Empire.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tortilla delivery take to Moreno Valley?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver authentic H-E-B tortillas to Moreno Valley in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship same day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver tortillas throughout the Inland Empire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver to all Inland Empire cities including Moreno Valley, Riverside, San Bernardino, Corona, Perris, and surrounding areas.',
      },
    },
  ],
}

export default function MorenoValleyPage() {
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
                { label: 'Moreno Valley' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to Moreno Valley
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in Moreno Valley and throughout Riverside County. Experience the authentic taste of Texas.
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
              alt="Fresh authentic Texas tortillas delivered to Moreno Valley"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Moreno Valley Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">
              Moreno Valley is one of the Inland Empire's fastest-growing cities, attracting families from across the country with its affordability and community spirit. Among the new residents are many Texas transplants who miss the authentic flavors of home.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              H-E-B tortillas have been a beloved Texas tradition since 1905. These aren't mass-produced generic tortillas - they're the result of over a century of perfecting recipes that deliver genuine Texas flavor and quality.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              Whether you're a former Texan craving the taste of home or a Moreno Valley native looking to upgrade your taco game, our tortillas bring authentic Lone Star quality to your kitchen.
            </p>
          </section>

          {/* Shipping Info */}
          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">Moreno Valley Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
              <li><strong>Coverage:</strong> All Moreno Valley ZIP codes (92551-92557)</li>
            </ul>
          </section>

          {/* Local Connection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Growing Families</h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Moreno Valley is known for its young, family-oriented population. Our tortillas are perfect for families who appreciate quality food and go through tortillas quickly. Stock up and save with free shipping on orders over $45.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              The Inland Empire's sunny weather is great for outdoor living, and our shelf-stable tortillas are designed to handle the climate. They ship safely without refrigeration and stay fresh for weeks after arrival.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">2-3</div>
                <div className="text-charcoal-600">Days to Moreno Valley</div>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Moreno Valley?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to your Inland Empire address.
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
              <Link href="/locations/california/riverside" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Riverside</Link>
              <Link href="/locations/california/san-bernardino" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">San Bernardino</Link>
              <Link href="/locations/california/fontana" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Fontana</Link>
              <Link href="/locations/california/los-angeles" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Los Angeles</Link>
              <Link href="/locations/california/anaheim" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Anaheim</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
