import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Authentic Texas Tortillas Delivered to Rochester | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Rochester, New York. Fresh flour & corn tortillas for tacos, burritos & more. Fast 2-3 day shipping.',
  keywords: 'tortillas Rochester, Texas tortillas Rochester NY, H-E-B tortillas delivery, authentic Mexican tortillas Rochester, fresh tortillas shipped',
  alternates: { canonical: 'https://lonestartortillas.com/locations/new-york/rochester' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - Rochester Delivery',
  description: 'Authentic Texas tortillas delivered to Rochester, New York',
  areaServed: { '@type': 'City', name: 'Rochester', containedInPlace: { '@type': 'State', name: 'New York' } },
  url: 'https://lonestartortillas.com/locations/new-york/rochester', priceRange: '$$',
}

export default function RochesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'New York', href: '/locations/new-york' }, { label: 'Rochester' }]} className="mb-6 text-cream-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Texas Tortillas Delivered to Rochester</h1>
            <p className="text-xl text-cream-200 max-w-3xl">Get fresh H-E-B tortillas shipped directly to your door in Rochester and the Finger Lakes region.</p>
            <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/generated/hero-tortillas.webp" alt="Fresh authentic Texas tortillas delivered to Rochester" fill className="object-cover" priority />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Rochester Loves Texas Tortillas</h2>
            <p className="text-charcoal-700 leading-relaxed">Rochester's diverse community includes food lovers who appreciate authentic flavors. The city's universities and tech companies have attracted Texans who miss the taste of home - especially genuine Texas tortillas.</p>
            <p className="text-charcoal-700 leading-relaxed">H-E-B tortillas have been a Texas staple for over a century. Now Rochester residents can enjoy these premium tortillas delivered right to their door.</p>
          </section>

          <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-bold text-charcoal-950 mb-2">Rochester Shipping Details</h2>
            <ul className="text-charcoal-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days via USPS Priority Mail</li>
              <li><strong>Same-Day Shipping:</strong> Orders placed by 2 PM CT</li>
              <li><strong>Free Shipping:</strong> On orders over $45</li>
            </ul>
          </section>

          <section className="my-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos and enchiladas.</p>
                <span className="text-sunset-600 font-semibold">Shop Corn Tortillas →</span>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos and quesadillas.</p>
                <span className="text-sunset-600 font-semibold">Shop Flour Tortillas →</span>
              </Link>
              <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish.</p>
                <span className="text-sunset-600 font-semibold">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          <p className="text-sm text-charcoal-500 italic mt-8">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Rochester?</h2>
            <p className="text-lg mb-6 text-cream-200">Order authentic H-E-B tortillas delivered fresh to your door.</p>
            <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/locations/new-york/buffalo" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Buffalo</Link>
              <Link href="/locations/new-york/syracuse" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Syracuse</Link>
              <Link href="/locations/new-york/new-york-city" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">New York City</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
