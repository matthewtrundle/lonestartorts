'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export function NewYorkContent() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50 pt-32">
        {/* Page Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
              H-E-B Tortillas Delivered to New York City
            </h1>
            <p className="text-cream-300 mt-4 text-xl">
              Authentic Texas tortillas for NYC expats and tortilla lovers
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">Can I get H-E-B tortillas in New York? Yes!</h2>
            <p className="text-lg text-charcoal-800 leading-relaxed">
              We deliver <strong>authentic H-E-B® tortillas</strong> to all five boroughs of New York City and the greater NYC area.
              Our shelf-stable corn, flour, and butter tortillas ship via priority mail (2-3 days) and require <strong>no refrigeration</strong> during
              shipping or storage. Perfect for small NYC apartments!
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Missing Texas? We've Got You Covered.</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-xl leading-relaxed">
                Whether you're a Texas expat missing the taste of home or a New Yorker who discovered H-E-B tortillas on a trip to the Lone Star State,
                you no longer have to wait for your next Texas visit to enjoy authentic H-E-B® tortillas. Lonestar Tortillas brings the quality and
                flavor that Texans have trusted for generations right to your door in Manhattan, Brooklyn, Queens, the Bronx, Staten Island, and beyond.
              </p>

              <p className="text-lg leading-relaxed">
                Living in New York City means dealing with limited pantry space, busy schedules, and the constant search for authentic, quality ingredients.
                That's why our <strong>shelf-stable</strong> H-E-B tortillas are perfect for NYC life—no refrigeration needed, long shelf life,
                and the same fresh taste you remember from Texas.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-gradient-to-r from-masa-100 to-cream-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why New Yorkers Choose Lonestar Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🌮 Authentic H-E-B Quality</h3>
                <p className="text-charcoal-700">
                  We source genuine H-E-B® brand tortillas—the same ones you'd find in Texas grocery stores. Not generic substitutes,
                  but the real deal that Texans know and love. Bon Appétit called them "the best supermarket-brand tortilla out there."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">📦 Shelf-Stable Convenience</h3>
                <p className="text-charcoal-700">
                  Perfect for NYC apartments with limited fridge space! Our tortillas don't require refrigeration during shipping or storage.
                  Simply keep them in your pantry for 3-4 weeks (unopened) or freeze for up to 6 months.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">⚡ Fast Nationwide Shipping</h3>
                <p className="text-charcoal-700">
                  We ship via USPS Priority Mail with typical delivery to NYC in just 2-3 business days. Track your order every step of the way.
                  We ship Monday-Wednesday to ensure weekend arrival.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🎯 Full Product Selection</h3>
                <p className="text-charcoal-700">
                  Choose from corn tortillas, flour tortillas, and butter tortillas. Get the exact varieties you want, whether you're making
                  street tacos, breakfast burritos, or quesadillas.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">How It Works</h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Browse & Order</h3>
                <p className="text-charcoal-700 text-sm">
                  Choose your tortillas and place your order online
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">We Pack Fresh</h3>
                <p className="text-charcoal-700 text-sm">
                  Your H-E-B tortillas are carefully packed for safe delivery
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Fast Shipping</h3>
                <p className="text-charcoal-700 text-sm">
                  2-3 day Priority Mail delivery right to your NYC address
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Enjoy!</h3>
                <p className="text-charcoal-700 text-sm">
                  Make tacos, burritos, quesadillas—a taste of Texas in NYC
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/shop"
                className="inline-block bg-sunset-600 hover:bg-sunset-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
              >
                Order H-E-B Tortillas Now →
              </Link>
            </div>
          </section>

          {/* Product Showcase */}
          <section className="mb-12 bg-charcoal-950 text-cream-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Available Products</h2>
            <p className="text-cream-300 mb-8 text-lg">
              All the H-E-B tortilla varieties you love, delivered to your door in New York City.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/products/corn-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Authentic masa flavor, perfect for street tacos and traditional Mexican dishes
                </p>
                <span className="text-sunset-600 font-medium">Shop Corn Tortillas →</span>
              </Link>

              <Link
                href="/products/flour-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Flour Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Soft and pliable, ideal for burritos, quesadillas, and wraps
                </p>
                <span className="text-sunset-600 font-medium">Shop Flour Tortillas →</span>
              </Link>

              <Link
                href="/products/butter-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Rich, buttery flavor that elevates any meal—a Texas favorite
                </p>
                <span className="text-sunset-600 font-medium">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* NYC Specific Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for New York City Living</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-lg leading-relaxed">
                New York City presents unique challenges for home cooks. Between small apartment kitchens, limited storage space,
                and busy schedules that leave little time for grocery shopping, convenience matters. That's why H-E-B's shelf-stable
                tortillas are ideal for NYC residents:
              </p>

              <ul className="space-y-3 text-charcoal-700 ml-6">
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>No refrigeration required</strong> – Save precious fridge space in your NYC apartment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Long shelf life</strong> – 3-4 weeks unopened, perfect for bulk ordering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Quick meals</strong> – Ideal for busy New Yorkers who need fast, delicious options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Versatile</strong> – Make breakfast tacos before work, late-night quesadillas, or weekend taco parties</span>
                </li>
              </ul>

              <p className="text-lg leading-relaxed">
                Whether you're in a tiny studio in the East Village, a Brooklyn brownstone, or a high-rise in Long Island City,
                H-E-B tortillas fit seamlessly into your NYC lifestyle.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Can I get H-E-B tortillas delivered to New York City?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Yes! We deliver authentic H-E-B® tortillas to all five boroughs of New York City and throughout the greater NYC area.
                  Our shelf-stable tortillas are shipped via priority mail and typically arrive within 2-3 business days. No refrigeration
                  needed during shipping! We ship to Manhattan, Brooklyn, Queens, the Bronx, Staten Island, and surrounding areas including
                  Jersey City, Hoboken, and Westchester County.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">How long does shipping take to NYC?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Shipping to New York City typically takes 2-3 business days via USPS Priority Mail. We ship Monday through Wednesday
                  to ensure your tortillas arrive fresh before the weekend. You will receive tracking information via email once your order ships,
                  so you can plan to be home or arrange for package pickup at your building.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Do the tortillas stay fresh during shipping to New York?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Absolutely! H-E-B® tortillas are shelf-stable and do not require refrigeration during shipping or storage. They are specially
                  designed to maintain freshness at room temperature, making them perfect for nationwide delivery. Once they arrive, simply store
                  them in your pantry for 3-4 weeks (unopened) or transfer to your freezer for up to 6 months. Learn more in our{' '}
                  <Link href="/guides/how-to-store-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                    tortilla storage guide
                  </Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Related Guides */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Helpful Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/guides/how-to-store-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How to Store Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Keep your tortillas fresh for weeks with these expert storage tips
                </p>
              </Link>

              <Link
                href="/guides/how-to-reheat-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How to Reheat Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Learn the best methods to warm tortillas for perfect texture every time
                </p>
              </Link>

              <Link
                href="/recipes/breakfast-tacos"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Texas Breakfast Tacos →</h3>
                <p className="text-charcoal-700 text-sm">
                  Classic Texas-style breakfast tacos recipe using H-E-B tortillas
                </p>
              </Link>
            </div>
          </section>

          {/* Other Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To:</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/los-angeles" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                Los Angeles
              </Link>
              <span className="text-charcoal-400">•</span>
              <Link href="/locations/illinois/chicago" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                Chicago
              </Link>
              <span className="text-charcoal-400">•</span>
              <Link href="/locations/colorado/denver" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                Denver
              </Link>
              <span className="text-charcoal-400">•</span>
              <Link href="/seattle" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                Seattle
              </Link>
              <span className="text-charcoal-400">•</span>
              <Link href="/shop" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                All 50 States
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Taste Texas in NYC?</h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Order authentic H-E-B® tortillas delivered right to your door in New York City. Same tortillas Texans love, now available nationwide.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-sunset-600 hover:bg-sunset-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors shadow-lg"
            >
              Shop H-E-B Tortillas →
            </Link>
          </section>
        </article>
      </div>
    </>
  )
}
