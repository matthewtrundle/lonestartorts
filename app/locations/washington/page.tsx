import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Washington',
  description: 'Get authentic H-E-B Texas tortillas shipped anywhere in Washington State. Fast delivery to Seattle, Spokane, Tacoma & more.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/washington' },
}

const cities = [
  { name: 'Seattle', slug: 'seattle', population: '737K', region: 'Puget Sound' },
  { name: 'Spokane', slug: 'spokane', population: '228K', region: 'Eastern Washington' },
  { name: 'Tacoma', slug: 'tacoma', population: '219K', region: 'Puget Sound' },
  { name: 'Vancouver', slug: 'vancouver', population: '190K', region: 'Southwest Washington' },
  { name: 'Bellevue', slug: 'bellevue', population: '151K', region: 'Puget Sound' },
  { name: 'Kent', slug: 'kent', population: '136K', region: 'Puget Sound' },
]

export default function WashingtonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Washington' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Tortillas Delivered to Washington</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Authentic H-E-B tortillas shipped directly to the Evergreen State. From Seattle to Spokane, we bring the taste of Texas to Washington.</p>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Washington" fill className="object-cover" priority /></div></section>
      <section className="container mx-auto px-6 py-12 max-w-6xl">
        <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Cities We Serve in Washington</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/locations/washington/${city.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-950 mb-1">{city.name}</h3>
              <p className="text-charcoal-600 text-sm mb-2">Population: {city.population}</p>
              <span className="text-sunset-600 font-semibold">View Details →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Washington Shipping Information</h2>
          <ul className="text-charcoal-700 space-y-2">
            <li><strong>Delivery Time:</strong> 3-4 business days</li>
            <li><strong>Free Shipping:</strong> On orders over $45</li>
          </ul>
        </div>
        <p className="text-sm text-charcoal-500 italic">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
      </section>
        {/* FAQ Section - SEO Content */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Washington Tortilla Delivery FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden" open>
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How long does shipping to Washington take?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Orders to Washington typically arrive within 2-3 business days via USPS Priority Mail.
                  We ship Monday through Friday, and orders placed before 2 PM CT ship the same day.
                  During peak seasons like holidays, delivery may take an extra day.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Are the tortillas fresh when they arrive in Washington?</span>
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
                <span className="font-semibold text-charcoal-950 pr-4">Do you offer free shipping to Washington?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! We offer free shipping on orders over $45 to Washington and all other US states.
                  For smaller orders, our flat-rate shipping is $12.99. We use USPS Priority Mail to ensure
                  fast, reliable delivery to every address in Washington.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What types of H-E-B tortillas can I order to Washington?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We ship the full range of H-E-B tortillas to Washington: corn tortillas (perfect for tacos and enchiladas),
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
                  now you can enjoy them at home in Washington. Many customers tell us it&apos;s a taste of Texas
                  they can&apos;t find anywhere else.
                </p>
              </div>
            </details>
          </div>
        </section>


      <section className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </div>
      </section>
    </div>
  )
}
