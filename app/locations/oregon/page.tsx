import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Oregon',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Oregon. Fast 2-3 day delivery to Portland, Salem, Eugene and all OR cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/oregon' },
}

const cities = [
  { name: 'Portland', slug: 'portland', population: '652K', region: 'Willamette Valley' },
  { name: 'Salem', slug: 'salem', population: '178K', region: 'State Capital' },
  { name: 'Eugene', slug: 'eugene', population: '176K', region: 'Southern Willamette' },
  { name: 'Gresham', slug: 'gresham', population: '114K', region: 'Portland Metro' },
  { name: 'Hillsboro', slug: 'hillsboro', population: '106K', region: 'Silicon Forest' },
  { name: 'Bend', slug: 'bend', population: '102K', region: 'Central Oregon' },
]

export default function OregonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Oregon' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Oregon</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the Beaver State.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Oregon" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Oregon Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/oregon/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Oregon Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 3-4 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All Oregon zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why Oregon Loves Texas Tortillas</h2>
        <p>Portland's foodie culture appreciates quality ingredients, and H-E-B tortillas are among the best in the country. From the tech hubs of Hillsboro's Silicon Forest to the outdoor lifestyle of Bend, Oregonians who've experienced Texas know the difference authentic tortillas make. We deliver that Texas taste to your Pacific Northwest kitchen.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
