import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Tucson',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Tucson, Arizona. Fresh flour & corn tortillas. Fast 2-3 day shipping to Southern Arizona.',
  keywords: 'tortillas Tucson, Texas tortillas Southern Arizona, H-E-B tortillas delivery Tucson',
  alternates: { canonical: 'https://lonestartortillas.com/locations/arizona/tucson' },
}

export default function TucsonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Arizona', href: '/locations/arizona' }, { label: 'Tucson' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Texas Tortillas Delivered to Tucson</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Get fresh H-E-B tortillas shipped directly to your door in Tucson and Southern Arizona.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image src="/images/generated/hero-tortillas.webp" alt="Fresh authentic Texas tortillas delivered to Tucson" fill className="object-cover" priority />
        </div>
      </section>
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <section className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Tucson Loves Texas Tortillas</h2>
          <p className="text-charcoal-700 leading-relaxed">Tucson is a UNESCO City of Gastronomy, known for its incredible Mexican and Sonoran cuisine. Locals here appreciate authentic flavors, and H-E-B's Texas tortillas are the perfect addition to the region's food culture.</p>
          <p className="text-charcoal-700 leading-relaxed">University of Arizona brings students and faculty from Texas who know H-E-B quality. Now the whole Tucson community can enjoy these beloved tortillas.</p>
        </section>
        <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Tucson Shipping Details</h2>
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
              <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free.</p>
              <span className="text-sunset-600 font-semibold">Shop Corn Tortillas →</span>
            </Link>
            <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
              <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos.</p>
              <span className="text-sunset-600 font-semibold">Shop Flour Tortillas →</span>
            </Link>
            <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
              <p className="text-charcoal-700 text-sm mb-4">Rich, buttery Texas favorite.</p>
              <span className="text-sunset-600 font-semibold">Shop Butter Tortillas →</span>
            </Link>
          </div>
        </section>
        <section className="my-12 grid md:grid-cols-3 gap-6"><Link href="/guides/how-to-store-tortillas" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Storage Guide</h3><p className="text-sm text-charcoal-600">Keep tortillas fresh</p></Link><Link href="/guides/best-tortillas-for-tacos" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Taco Guide</h3><p className="text-sm text-charcoal-600">Choose the right tortilla</p></Link><Link href="/recipes" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Recipes</h3><p className="text-sm text-charcoal-600">Tortilla inspiration</p></Link></section>
        <p className="text-sm text-charcoal-500 italic mt-8">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Tucson?</h2>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/locations/arizona/phoenix" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Phoenix</Link>
            <Link href="/locations/arizona/mesa" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Mesa</Link>
            <Link href="/locations/arizona/tempe" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Tempe</Link>
          </div>
        </section>
      </article>
    </div>
  )
}
