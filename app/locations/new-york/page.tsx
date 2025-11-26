import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Texas Tortillas Delivered to New York | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped to New York. We deliver to NYC, Buffalo, Rochester, Syracuse, Albany, and all NY cities. Fast 2-3 day shipping.',
  keywords: 'tortillas New York, Texas tortillas NY, H-E-B tortillas delivery New York, authentic tortillas NYC, Buffalo tortilla delivery',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/new-york',
  },
}

const cities = [
  { name: 'New York City', slug: 'new-york-city', population: '8.3M', region: 'NYC Metro' },
  { name: 'Buffalo', slug: 'buffalo', population: '278K', region: 'Western NY' },
  { name: 'Rochester', slug: 'rochester', population: '211K', region: 'Western NY' },
  { name: 'Yonkers', slug: 'yonkers', population: '200K', region: 'NYC Metro' },
  { name: 'Syracuse', slug: 'syracuse', population: '148K', region: 'Central NY' },
  { name: 'Albany', slug: 'albany', population: '99K', region: 'Capital District' },
  { name: 'New Rochelle', slug: 'new-rochelle', population: '79K', region: 'NYC Metro' },
  { name: 'Mount Vernon', slug: 'mount-vernon', population: '74K', region: 'NYC Metro' },
  { name: 'Schenectady', slug: 'schenectady', population: '66K', region: 'Capital District' },
  { name: 'Utica', slug: 'utica', population: '65K', region: 'Central NY' },
]

const regions = [
  { name: 'NYC Metro', cities: ['New York City', 'Yonkers', 'New Rochelle', 'Mount Vernon'] },
  { name: 'Western NY', cities: ['Buffalo', 'Rochester'] },
  { name: 'Central NY', cities: ['Syracuse', 'Utica'] },
  { name: 'Capital District', cities: ['Albany', 'Schenectady'] },
]

export default function NewYorkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      {/* Header */}
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: 'New York' },
            ]}
            className="mb-6 text-cream-300"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Texas Tortillas Delivered to New York
          </h1>
          <p className="text-xl text-cream-200 max-w-3xl">
            Authentic H-E-B tortillas shipped fresh to all New York cities. From NYC to Buffalo, we've got the Empire State covered.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Shipping Info */}
        <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">New York Shipping</h2>
          <p className="text-charcoal-700">
            <strong>Delivery Time:</strong> 2-3 business days to most New York addresses. Orders placed by 2 PM CT ship same day.
          </p>
        </section>

        {/* Cities by Region */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">New York Delivery Cities</h2>

          {regions.map((region) => (
            <div key={region.name} className="mb-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4 border-b border-charcoal-200 pb-2">
                {region.name}
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities
                  .filter((city) => region.cities.includes(city.name))
                  .map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/new-york/${city.slug}`}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-charcoal-100 group"
                    >
                      <h4 className="font-bold text-charcoal-950 group-hover:text-sunset-600">
                        {city.name} →
                      </h4>
                      <p className="text-sm text-charcoal-600">{city.population} population</p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* All Cities Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">All New York Cities We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/new-york/${city.slug}`}
                className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Why Texas Tortillas */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why New Yorkers Love Texas Tortillas</h2>
          <p className="text-charcoal-700 mb-4">
            New York is home to incredible food from around the world, but finding authentic Texas-style tortillas can be a challenge. H-E-B has been making tortillas in Texas since 1905, and now New Yorkers can experience the difference.
          </p>
          <p className="text-charcoal-700 mb-4">
            Whether you're a transplanted Texan in Manhattan missing the taste of home, or a Brooklyn foodie looking to elevate your taco night, our tortillas deliver authentic Texas flavor to your Empire State kitchen.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">2-3</div>
              <div className="text-sm text-charcoal-600">Days to New York</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">10+</div>
              <div className="text-sm text-charcoal-600">NY Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">$12.99</div>
              <div className="text-sm text-charcoal-600">Flat Rate Shipping</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in New York?</h2>
          <p className="text-lg mb-6 text-cream-200">
            Order authentic H-E-B tortillas and experience the difference real Texas tortillas make.
          </p>
          <Link
            href="/shop"
            className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
          >
            Shop All Tortillas
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-sm text-charcoal-500 italic mt-8 text-center">
          Independent reseller. Not affiliated with or endorsed by H-E-B.
        </p>
      </main>
    </div>
  )
}
