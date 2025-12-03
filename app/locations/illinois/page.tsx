import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Illinois',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Illinois. Fast delivery to Chicago, Aurora, Naperville & more.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/illinois' },
}

const cities = [
  { name: 'Chicago', slug: 'chicago', population: '2.7M', region: 'Chicagoland' },
  { name: 'Aurora', slug: 'aurora', population: '180K', region: 'Chicagoland' },
  { name: 'Naperville', slug: 'naperville', population: '149K', region: 'Chicagoland' },
  { name: 'Joliet', slug: 'joliet', population: '150K', region: 'Chicagoland' },
  { name: 'Rockford', slug: 'rockford', population: '148K', region: 'Northern Illinois' },
  { name: 'Springfield', slug: 'springfield', population: '114K', region: 'Central Illinois' },
  { name: 'Elgin', slug: 'elgin', population: '112K', region: 'Chicagoland' },
  { name: 'Peoria', slug: 'peoria', population: '113K', region: 'Central Illinois' },
]

const regions = [
  { name: 'Chicagoland', cities: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Elgin'] },
  { name: 'Central Illinois', cities: ['Springfield', 'Peoria'] },
  { name: 'Northern Illinois', cities: ['Rockford'] },
]

export default function IllinoisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Illinois' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Illinois</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped directly to the Prairie State. From Chicago to Springfield, we bring the taste of Texas to Illinois.</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Illinois" fill className="object-cover" priority />
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 max-w-6xl">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Cities We Serve in Illinois</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/illinois/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-1">{city.name}</h3>
              <p className="text-charcoal-600 text-sm mb-2">Population: {city.population}</p>
              <span className="text-sunset-600 font-semibold">View Details →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-masa-100 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Illinois Regions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <div key={region.name} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">{region.name}</h3>
                <ul className="space-y-2">
                  {region.cities.map((city) => {
                    const cityData = cities.find(c => c.name === city)
                    return (
                      <li key={city}>
                        <Link href={`/locations/illinois/${cityData?.slug}`} className="text-sunset-600 hover:text-sunset-700">{city}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Illinois Shipping Information</h2>
          <ul className="text-charcoal-700 space-y-2">
            <li><strong>Delivery Time:</strong> 2-3 business days to most Illinois cities</li>
            <li><strong>Free Shipping:</strong> On orders over $45</li>
            <li><strong>Coverage:</strong> All Illinois ZIP codes</li>
          </ul>
        </div>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </section>

      <section className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-cream-200 mb-6">Get authentic Texas tortillas delivered anywhere in Illinois.</p>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </div>
      </section>
    </div>
  )
}
