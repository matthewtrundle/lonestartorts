import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Virginia',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Virginia. Fast 2-3 day delivery to Virginia Beach, Richmond, Arlington and all VA cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/virginia' },
}

const cities = [
  { name: 'Virginia Beach', slug: 'virginia-beach', population: '459K', region: 'Hampton Roads' },
  { name: 'Norfolk', slug: 'norfolk', population: '238K', region: 'Hampton Roads' },
  { name: 'Richmond', slug: 'richmond', population: '226K', region: 'State Capital' },
  { name: 'Arlington', slug: 'arlington', population: '238K', region: 'Northern Virginia' },
  { name: 'Alexandria', slug: 'alexandria', population: '159K', region: 'Northern Virginia' },
  { name: 'Chesapeake', slug: 'chesapeake', population: '249K', region: 'Hampton Roads' },
]

export default function VirginiaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Virginia' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Virginia</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the Old Dominion.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Virginia" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Virginia Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/virginia/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">{city.name}</h3>
              <p className="text-charcoal-600 text-sm mb-1">Population: {city.population}</p>
              <p className="text-charcoal-600 text-sm mb-3">{city.region}</p>
              <span className="text-sunset-600 font-semibold">View Delivery Info →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Virginia Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All Virginia zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why Virginia Loves Texas Tortillas</h2>
        <p>Northern Virginia's tech corridor and proximity to DC have attracted Texas transplants working in government, defense, and technology. From the Pentagon to Amazon's HQ2, Virginians with Texas roots know real tortillas. We deliver that authentic Texas taste to the Old Dominion.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
