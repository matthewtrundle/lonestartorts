import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Georgia',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Georgia. Fast delivery to Atlanta, Savannah, Augusta & more.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/georgia' },
}

const cities = [
  { name: 'Atlanta', slug: 'atlanta', population: '498K', region: 'Metro Atlanta' },
  { name: 'Augusta', slug: 'augusta', population: '202K', region: 'East Georgia' },
  { name: 'Columbus', slug: 'columbus', population: '206K', region: 'West Georgia' },
  { name: 'Macon', slug: 'macon', population: '157K', region: 'Central Georgia' },
  { name: 'Savannah', slug: 'savannah', population: '147K', region: 'Coastal Georgia' },
  { name: 'Athens', slug: 'athens', population: '127K', region: 'Northeast Georgia' },
]

export default function GeorgiaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Georgia' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Georgia</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped directly to the Peach State. From Atlanta to Savannah, we bring the taste of Texas to Georgia.</p>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Georgia" fill className="object-cover" priority /></div></section>
      <section className="container mx-auto px-6 py-12 max-w-6xl">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Cities We Serve in Georgia</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/georgia/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-1">{city.name}</h3>
              <p className="text-charcoal-600 text-sm mb-2">Population: {city.population}</p>
              <span className="text-sunset-600 font-semibold">View Details →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Georgia Shipping Information</h2>
          <ul className="text-charcoal-700 space-y-2">
            <li><strong>Delivery Time:</strong> 2-3 business days</li>
            <li><strong>Free Shipping:</strong> On orders over $45</li>
          </ul>
        </div>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </section>
      <section className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </div>
      </section>
    </div>
  )
}
