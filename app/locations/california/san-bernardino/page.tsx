import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to San Bernardino',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to San Bernardino, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast 2-3 day shipping to the Inland Empire.',
  keywords: 'tortillas San Bernardino, Texas tortillas Inland Empire, H-E-B tortillas delivery California, authentic Mexican tortillas San Bernardino, fresh tortillas shipped IE',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/san-bernardino',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to San Bernardino | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to San Bernardino. Experience the taste of Texas in the Inland Empire.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tortilla delivery take to San Bernardino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver authentic H-E-B tortillas to San Bernardino in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship same day.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver tortillas throughout the Inland Empire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver to all Inland Empire cities including San Bernardino, Riverside, Fontana, Ontario, Rancho Cucamonga, and surrounding areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are these the same tortillas sold at H-E-B stores in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we ship authentic H-E-B brand tortillas directly from Texas. These are the same premium tortillas beloved by Texans for generations.',
      },
    },
  ],
}

export default function SanBernardinoPage() {
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
                { label: 'San Bernardino' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to San Bernardino
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in San Bernardino and throughout the Inland Empire. Experience the authentic taste of Texas.
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
              alt="Fresh authentic Texas tortillas delivered to San Bernardino"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why San Bernardino Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">
              San Bernardino sits at the heart of the Inland Empire, a region known for its rich cultural diversity and appreciation for authentic Mexican cuisine. While the IE has fantastic local food, there's something special about genuine Texas-style tortillas that you simply can't find in California grocery stores.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              H-E-B has been perfecting tortilla recipes in Texas since 1905, creating products that balance the perfect texture, flavor, and versatility. Whether you're a former Texan who relocated to San Bernardino for work, or a local foodie looking to elevate your taco nights, our tortillas deliver that authentic Lone Star taste.
            </p>
            <p className="text-charcoal-700 leading-relaxed">
              From family gatherings in Redlands to weekend barbecues in Highland, our tortillas bring people together around the table. We ship directly from Texas to your San Bernardino address, ensuring you get the freshest possible product.
            </p>
          </section>

          {/* Shipping Info */}
          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">San Bernardino Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
              <li><strong>Coverage:</strong> All San Bernardino ZIP codes (92401-92427)</li>
            </ul>
          </section>

          {/* Local Connection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Inland Empire Living</h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              The Inland Empire's growing population includes thousands of Texas transplants who miss the flavors of home. Whether you moved to San Bernardino for Cal State's programs, the region's affordability, or career opportunities, you don't have to give up authentic Texas tortillas.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Our shelf-stable tortillas are perfect for the IE's warm climate - they arrive fresh and ready to enjoy without requiring refrigerated shipping. Stock up for family taco nights, meal prep for the week, or keep them on hand for impromptu quesadillas.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-sunset-600">2-3</div>
                <div className="text-charcoal-600">Days to San Bernardino</div>
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
                <h3 className="font-bold text-charcoal-950 mb-2">How long does delivery take to San Bernardino?</h3>
                <p className="text-charcoal-700">We deliver to San Bernardino in 2-3 business days via USPS Priority Mail. Orders placed by 2 PM CT ship the same day.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal-950 mb-2">Do you deliver throughout the Inland Empire?</h3>
                <p className="text-charcoal-700">Yes! We deliver to all IE cities including San Bernardino, Riverside, Fontana, Ontario, Rancho Cucamonga, Corona, and more.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal-950 mb-2">Do tortillas need to be refrigerated during shipping?</h3>
                <p className="text-charcoal-700">No! Our shelf-stable tortillas are designed for safe shipping without refrigeration. They arrive fresh with 30+ days of shelf life.</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in San Bernardino?</h2>
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
              <Link href="/locations/california/fontana" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Fontana</Link>
              <Link href="/locations/california/moreno-valley" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Moreno Valley</Link>
              <Link href="/locations/california/los-angeles" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Los Angeles</Link>
              <Link href="/locations/california/anaheim" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Anaheim</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
