import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Texas Tortillas Delivered to New Jersey | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in New Jersey. Fast 2-3 day delivery to Newark, Jersey City, Trenton and all NJ cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/new-jersey' },
}

const cities = [
  { name: 'Newark', slug: 'newark', population: '311K', region: 'Essex County' },
  { name: 'Jersey City', slug: 'jersey-city', population: '292K', region: 'Hudson County' },
  { name: 'Paterson', slug: 'paterson', population: '159K', region: 'Passaic County' },
  { name: 'Elizabeth', slug: 'elizabeth', population: '137K', region: 'Union County' },
  { name: 'Trenton', slug: 'trenton', population: '90K', region: 'State Capital' },
  { name: 'Clifton', slug: 'clifton', population: '89K', region: 'Passaic County' },
]

export default function NewJerseyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'New Jersey' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to New Jersey</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the Garden State.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to New Jersey" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">New Jersey Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/new-jersey/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">New Jersey Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All New Jersey zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why New Jersey Loves Texas Tortillas</h2>
        <p>New Jersey's diverse population and proximity to New York City create a melting pot of culinary influences. Texas transplants in Jersey City, the shore towns, and suburban communities know the difference authentic tortillas make. We bring that Texas taste across the Hudson to the Garden State.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
