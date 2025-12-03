import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to California',
  description: 'Get authentic H-E-B Texas tortillas shipped to California. We deliver to Los Angeles, San Diego, San Francisco, San Jose, and all CA cities. Fast 2-3 day shipping.',
  keywords: 'tortillas California, Texas tortillas CA, H-E-B tortillas delivery California, authentic tortillas Los Angeles, San Diego tortilla delivery',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california',
  },
}

const cities = [
  { name: 'Los Angeles', slug: 'los-angeles', population: '3.9M', region: 'Southern California' },
  { name: 'San Diego', slug: 'san-diego', population: '1.4M', region: 'Southern California' },
  { name: 'San Jose', slug: 'san-jose', population: '1.0M', region: 'Bay Area' },
  { name: 'San Francisco', slug: 'san-francisco', population: '874K', region: 'Bay Area' },
  { name: 'Fresno', slug: 'fresno', population: '542K', region: 'Central Valley' },
  { name: 'Sacramento', slug: 'sacramento', population: '524K', region: 'Central Valley' },
  { name: 'Long Beach', slug: 'long-beach', population: '466K', region: 'Southern California' },
  { name: 'Oakland', slug: 'oakland', population: '433K', region: 'Bay Area' },
  { name: 'Bakersfield', slug: 'bakersfield', population: '403K', region: 'Central Valley' },
  { name: 'Anaheim', slug: 'anaheim', population: '350K', region: 'Orange County' },
  { name: 'Santa Ana', slug: 'santa-ana', population: '310K', region: 'Orange County' },
  { name: 'Riverside', slug: 'riverside', population: '314K', region: 'Inland Empire' },
  { name: 'Stockton', slug: 'stockton', population: '320K', region: 'Central Valley' },
  { name: 'Irvine', slug: 'irvine', population: '307K', region: 'Orange County' },
  { name: 'Chula Vista', slug: 'chula-vista', population: '275K', region: 'Southern California' },
  { name: 'San Bernardino', slug: 'san-bernardino', population: '222K', region: 'Inland Empire' },
  { name: 'Fremont', slug: 'fremont', population: '230K', region: 'Bay Area' },
  { name: 'Modesto', slug: 'modesto', population: '218K', region: 'Central Valley' },
  { name: 'Fontana', slug: 'fontana', population: '214K', region: 'Inland Empire' },
  { name: 'Moreno Valley', slug: 'moreno-valley', population: '212K', region: 'Inland Empire' },
]

const regions = [
  { name: 'Southern California', cities: ['Los Angeles', 'San Diego', 'Long Beach', 'Chula Vista'] },
  { name: 'Bay Area', cities: ['San Francisco', 'San Jose', 'Oakland', 'Fremont'] },
  { name: 'Orange County', cities: ['Anaheim', 'Santa Ana', 'Irvine'] },
  { name: 'Central Valley', cities: ['Fresno', 'Sacramento', 'Bakersfield', 'Stockton', 'Modesto'] },
  { name: 'Inland Empire', cities: ['Riverside', 'San Bernardino', 'Fontana', 'Moreno Valley'] },
]

export default function CaliforniaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      {/* Header */}
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: 'California' },
            ]}
            className="mb-6 text-cream-300"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Texas Tortillas Delivered to California
          </h1>
          <p className="text-xl text-cream-200 max-w-3xl">
            Authentic H-E-B tortillas shipped fresh to all California cities. From LA to San Francisco, we've got the Golden State covered.
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
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">California Shipping</h2>
          <p className="text-charcoal-700">
            <strong>Delivery Time:</strong> 2-3 business days to most California addresses. Orders placed by 2 PM CT ship same day.
          </p>
        </section>

        {/* Cities by Region */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">California Delivery Cities</h2>

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
                      href={`/locations/california/${city.slug}`}
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
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">All California Cities We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/california/${city.slug}`}
                className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Why Texas Tortillas */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why California Loves Texas Tortillas</h2>
          <p className="text-charcoal-700 mb-4">
            California has incredible Mexican food, but there's something special about authentic Texas-style tortillas. H-E-B has been making tortillas in Texas since 1905, perfecting recipes that balance tenderness with just the right amount of chew.
          </p>
          <p className="text-charcoal-700 mb-4">
            Whether you're a transplanted Texan in LA missing the taste of home, or a Bay Area foodie looking to elevate your taco game, our tortillas deliver that authentic Texas flavor straight to your California kitchen.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">2-3</div>
              <div className="text-sm text-charcoal-600">Days to California</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">20+</div>
              <div className="text-sm text-charcoal-600">CA Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">$9.95</div>
              <div className="text-sm text-charcoal-600">Starting Shipping</div>
            </div>
          </div>
        </section>
        {/* FAQ Section - SEO Content */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">California Tortilla Delivery FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden" open>
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How long does shipping to California take?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Orders to California typically arrive within 2-3 business days via USPS Priority Mail.
                  We ship Monday through Friday, and orders placed before 2 PM CT ship the same day.
                  During peak seasons like holidays, delivery may take an extra day.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Are the tortillas fresh when they arrive in California?</span>
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
                <span className="font-semibold text-charcoal-950 pr-4">Do you offer free shipping to California?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! We offer free shipping on orders over $45 to California and all other US states.
                  For smaller orders, our flat-rate shipping is $12.99. We use USPS Priority Mail to ensure
                  fast, reliable delivery to every address in California.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What types of H-E-B tortillas can I order to California?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We ship the full range of H-E-B tortillas to California: corn tortillas (perfect for tacos and enchiladas),
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
                  now you can enjoy them at home in California. Many customers tell us it&apos;s a taste of Texas
                  they can&apos;t find anywhere else.
                </p>
              </div>
            </details>
          </div>
        </section>



        {/* CTA */}
        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in California?</h2>
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
