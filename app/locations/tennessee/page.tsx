import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Tennessee',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Tennessee. Fast 2-3 day delivery to Nashville, Memphis, Knoxville and all TN cities.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/tennessee' },
}

const cities = [
  { name: 'Nashville', slug: 'nashville', population: '689K', region: 'Middle Tennessee' },
  { name: 'Memphis', slug: 'memphis', population: '633K', region: 'West Tennessee' },
  { name: 'Knoxville', slug: 'knoxville', population: '190K', region: 'East Tennessee' },
  { name: 'Chattanooga', slug: 'chattanooga', population: '181K', region: 'Southeast Tennessee' },
  { name: 'Clarksville', slug: 'clarksville', population: '166K', region: 'North Central Tennessee' },
  { name: 'Murfreesboro', slug: 'murfreesboro', population: '152K', region: 'Middle Tennessee' },
]

export default function TennesseePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Tennessee' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Tennessee</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped direct from Texas to the Volunteer State.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Tennessee" fill className="object-cover" priority /></div></section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Tennessee Cities We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/tennessee/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Tennessee Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li><li><strong>Coverage:</strong> All Tennessee zip codes</li></ul>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg">
        <h2>Why Tennessee Loves Texas Tortillas</h2>
        <p>Nashville's explosive growth has brought thousands of Texas transplants seeking that authentic Tex-Mex taste. From Music City to Memphis BBQ country, Tennesseans appreciate quality—and H-E-B tortillas deliver. Whether you're making breakfast tacos in Knoxville or quesadillas in Chattanooga, we bring Texas to your kitchen.</p>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </article>
    </div>
  )
}
