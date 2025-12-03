import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Arizona',
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
        {/* FAQ Section - SEO Content */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Arizona Tortilla Delivery FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden" open>
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">How long does shipping to Arizona take?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Orders to Arizona typically arrive within 2-3 business days via USPS Priority Mail.
                  We ship Monday through Friday, and orders placed before 2 PM CT ship the same day.
                  During peak seasons like holidays, delivery may take an extra day.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">Are the tortillas fresh when they arrive in Arizona?</span>
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
                <span className="font-semibold text-charcoal-950 pr-4">Do you offer free shipping to Arizona?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  Yes! We offer free shipping on orders over $45 to Arizona and all other US states.
                  For smaller orders, our flat-rate shipping is $12.99. We use USPS Priority Mail to ensure
                  fast, reliable delivery to every address in Arizona.
                </p>
              </div>
            </details>
            <details className="group border border-charcoal-200 rounded-lg overflow-hidden">
              <summary className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors cursor-pointer list-none">
                <span className="font-semibold text-charcoal-950 pr-4">What types of H-E-B tortillas can I order to Arizona?</span>
                <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white border-t border-charcoal-200">
                <p className="text-charcoal-700 leading-relaxed">
                  We ship the full range of H-E-B tortillas to Arizona: corn tortillas (perfect for tacos and enchiladas),
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
                  now you can enjoy them at home in Arizona. Many customers tell us it&apos;s a taste of Texas
                  they can&apos;t find anywhere else.
                </p>
              </div>
            </details>
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
