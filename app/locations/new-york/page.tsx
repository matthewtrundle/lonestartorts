import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to New York',
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
        {/* FAQ Section - SEO Content */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">New York Tortilla Delivery FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden" open>
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How long does shipping to New York take?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Orders to New York typically arrive within 2-3 business days via USPS Priority Mail.
                  We ship Monday through Friday, and orders placed before 2 PM CT ship the same day.
                  During peak seasons like holidays, delivery may take an extra day.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Are the tortillas fresh when they arrive in New York?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! Our H-E-B tortillas are shelf-stable, meaning they don&apos;t require refrigeration
                  and maintain their freshness during shipping. They arrive soft, pliable, and ready to use.
                  Each package has a 60-day shelf life from the date of production, so you can stock up
                  without worrying about freshness.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Do you offer free shipping to New York?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! We offer free shipping on orders over $45 to New York and all other US states.
                  For smaller orders, our flat-rate shipping is $12.99. We use USPS Priority Mail to ensure
                  fast, reliable delivery to every address in New York.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What types of H-E-B tortillas can I order to New York?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We ship the full range of H-E-B tortillas to New York: corn tortillas (perfect for tacos and enchiladas),
                  flour tortillas (great for burritos and quesadillas), and butter tortillas (the rich, buttery
                  Texas favorite that&apos;s perfect for breakfast tacos). All varieties ship fresh and arrive
                  ready to enjoy.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Why order H-E-B tortillas instead of buying local?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  H-E-B tortillas have a distinctive Texas taste that&apos;s simply not available outside of Texas stores.
                  They&apos;re made with traditional recipes and quality ingredients that have made them a favorite
                  for generations of Texans. If you&apos;ve visited Texas and fallen in love with these tortillas,
                  now you can enjoy them at home in New York. Many customers tell us it&apos;s a taste of Texas
                  they can&apos;t find anywhere else.
                </p>
              </div>
            </details>
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
