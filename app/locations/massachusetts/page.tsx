import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Massachusetts',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Massachusetts. Fast 2-3 day delivery to Boston, Cambridge, Worcester and all MA cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/massachusetts' },
}

const cities = [
  { name: 'Boston', slug: 'boston', population: '675K', region: 'Greater Boston' },
  { name: 'Worcester', slug: 'worcester', population: '206K', region: 'Central Massachusetts' },
  { name: 'Springfield', slug: 'springfield', population: '155K', region: 'Western Massachusetts' },
  { name: 'Cambridge', slug: 'cambridge', population: '118K', region: 'Greater Boston' },
  { name: 'Lowell', slug: 'lowell', population: '115K', region: 'Merrimack Valley' },
  { name: 'Quincy', slug: 'quincy', population: '101K', region: 'South Shore' },
]

export default function MassachusettsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Massachusetts' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Massachusetts</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the Bay State.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Massachusetts" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Massachusetts Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/massachusetts/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Massachusetts Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All Massachusetts zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why Massachusetts Loves Texas Tortillas</h2>
        <p>Boston's world-class universities and thriving tech scene have drawn talent from across the country, including Texas. From Harvard and MIT in Cambridge to the biotech corridor, Bay Staters who've experienced authentic Tex-Mex know what they're missing. We deliver that Texas taste to New England kitchens.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
