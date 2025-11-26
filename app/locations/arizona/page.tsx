import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Texas Tortillas Delivered to Arizona | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped to Arizona. We deliver to Phoenix, Tucson, Mesa, Scottsdale, and all AZ cities. Fast 2-3 day shipping.',
  keywords: 'tortillas Arizona, Texas tortillas AZ, H-E-B tortillas delivery Arizona, authentic tortillas Phoenix, Tucson tortilla delivery',
  alternates: { canonical: 'https://lonestartortillas.com/locations/arizona' },
}

const cities = [
  { name: 'Phoenix', slug: 'phoenix', population: '1.6M', region: 'Phoenix Metro' },
  { name: 'Tucson', slug: 'tucson', population: '542K', region: 'Southern Arizona' },
  { name: 'Mesa', slug: 'mesa', population: '504K', region: 'Phoenix Metro' },
  { name: 'Chandler', slug: 'chandler', population: '275K', region: 'Phoenix Metro' },
  { name: 'Scottsdale', slug: 'scottsdale', population: '241K', region: 'Phoenix Metro' },
  { name: 'Glendale', slug: 'glendale', population: '248K', region: 'Phoenix Metro' },
  { name: 'Gilbert', slug: 'gilbert', population: '267K', region: 'Phoenix Metro' },
  { name: 'Tempe', slug: 'tempe', population: '180K', region: 'Phoenix Metro' },
]

export default function ArizonaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Arizona' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Arizona</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped fresh to all Arizona cities. From Phoenix to Tucson, we've got the Grand Canyon State covered.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Arizona Shipping</h2>
          <p className="text-charcoal-700"><strong>Delivery Time:</strong> 2-3 business days to most Arizona addresses. Our neighbor state gets fast delivery!</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Arizona Delivery Cities</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link key={city.slug} href={`/locations/arizona/${city.slug}`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-charcoal-100 group">
                <h4 className="font-bold text-charcoal-950 group-hover:text-sunset-600">{city.name} →</h4>
                <p className="text-sm text-charcoal-600">{city.population} population</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why Arizona Loves Texas Tortillas</h2>
          <p className="text-charcoal-700 mb-4">Arizona shares a border with Texas and has deep Mexican culinary roots. Many Arizona residents know that H-E-B tortillas are the gold standard - and now they don't have to drive to Texas to get them.</p>
          <p className="text-charcoal-700 mb-4">Whether you're in the Phoenix metro area or down in Tucson, our tortillas arrive fresh and ready for your next taco night, family gathering, or everyday meal.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center"><div className="text-3xl font-bold text-sunset-600">2-3</div><div className="text-sm text-charcoal-600">Days to Arizona</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-sunset-600">8+</div><div className="text-sm text-charcoal-600">AZ Cities Served</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-sunset-600">$12.99</div><div className="text-sm text-charcoal-600">Flat Rate Shipping</div></div>
          </div>
        </section>

        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Arizona?</h2>
          <p className="text-lg mb-6 text-cream-200">Order authentic H-E-B tortillas and experience the difference.</p>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </section>

        <p className="text-sm text-charcoal-500 italic mt-8 text-center">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </main>
    </div>
  )
}
