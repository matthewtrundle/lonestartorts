import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Minnesota',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Minnesota. Fast 2-3 day delivery to Minneapolis, Saint Paul, Rochester and all MN cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/minnesota' },
}

const cities = [
  { name: 'Minneapolis', slug: 'minneapolis', population: '429K', region: 'Twin Cities' },
  { name: 'Saint Paul', slug: 'saint-paul', population: '311K', region: 'State Capital' },
  { name: 'Rochester', slug: 'rochester', population: '121K', region: 'Southeast Minnesota' },
  { name: 'Bloomington', slug: 'bloomington', population: '89K', region: 'Twin Cities Metro' },
  { name: 'Duluth', slug: 'duluth', population: '90K', region: 'Northeast Minnesota' },
  { name: 'Brooklyn Park', slug: 'brooklyn-park', population: '86K', region: 'Twin Cities Metro' },
]

export default function MinnesotaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Minnesota' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Minnesota</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the North Star State.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Minnesota" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Minnesota Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/minnesota/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Minnesota Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All Minnesota zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why Minnesota Loves Texas Tortillas</h2>
        <p>Minneapolis-Saint Paul's thriving corporate headquarters—Target, Best Buy, 3M, UnitedHealth—have attracted talent from across the country, including Texas. Even in the frozen North, those who've experienced authentic Tex-Mex crave the real thing. We deliver that Texas warmth to Minnesota kitchens.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
