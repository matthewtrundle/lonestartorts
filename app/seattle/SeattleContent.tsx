'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export function SeattleContent() {
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
              H-E-B Tortillas Delivered to Seattle
            </h1>
            <p className="text-cream-300 mt-4 text-xl">
              Authentic Texas tortillas for the Pacific Northwest
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">Get H-E-B Tortillas in Seattle</h2>
            <p className="text-lg text-charcoal-800 leading-relaxed">
              Yes! We deliver <strong>authentic H-E-B® tortillas from Texas</strong> to Seattle, Tacoma, Bellevue, Spokane, and all of Washington.
              Our shelf-stable corn, flour, and butter tortillas ship via priority mail (2-3 days) with <strong>weatherproof packaging</strong>.
              No refrigeration required—perfect for PNW living!
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Pacific Northwest Meets Texas Tradition</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-xl leading-relaxed">
                Seattle has an incredible food scene—from Pike Place Market to world-class coffee and innovative restaurants. But if you're
                a Texas transplant in the Emerald City, you know that Pacific Northwest tortillas just don't compare to H-E-B. That authentic
                Texas flavor, the perfect texture, the quality that generations of Texans have trusted. Now you can get them delivered right
                to your door in Seattle.
              </p>

              <p className="text-lg leading-relaxed">
                Lonestar Tortillas brings genuine H-E-B® brand tortillas from Texas to Washington state. Whether you're making breakfast tacos
                before heading to the office, meal-prepping for the week, or hosting taco night in Capitol Hill, our tortillas deliver that
                authentic taste you've been missing since moving to the Pacific Northwest.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-gradient-to-r from-masa-100 to-cream-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Seattle Chooses Lonestar Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🌮 Authentic H-E-B Quality</h3>
                <p className="text-charcoal-700">
                  Real H-E-B® brand tortillas from Texas—not Pacific Northwest imitations. The same tortillas that Texans have loved for decades.
                  Bon Appétit magazine called them "the best supermarket-brand tortilla out there."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">☔ Weather-Resistant</h3>
                <p className="text-charcoal-700">
                  Weatherproof packaging protects your tortillas from Seattle's famous rain. Shelf-stable formula means no refrigeration needed
                  during shipping or storage—perfect for PNW moisture and weather.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🚚 Fast PNW Delivery</h3>
                <p className="text-charcoal-700">
                  2-3 day USPS Priority Mail from Texas to Washington. Track your order from the Lone Star State to the Puget Sound.
                  Reliable delivery to Seattle, Tacoma, Spokane, and everywhere in Washington.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">☕ Comfort Food Culture</h3>
                <p className="text-charcoal-700">
                  Seattle has coffee culture. Texas has taco culture. Now you can enjoy both! H-E-B tortillas bring that warm, comforting
                  taste of Texas to rainy Seattle days.
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
                  Select your H-E-B tortillas online
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Packed in Texas</h3>
                <p className="text-charcoal-700 text-sm">
                  We carefully pack with weatherproof packaging
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Ship to Seattle</h3>
                <p className="text-charcoal-700 text-sm">
                  2-3 day Priority Mail to Washington
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Enjoy Texas!</h3>
                <p className="text-charcoal-700 text-sm">
                  Make tacos, burritos—taste of home in Seattle
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
              All your favorite H-E-B tortilla varieties, delivered to Seattle and Washington.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/products/corn-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Authentic masa flavor for street tacos and traditional dishes
                </p>
                <span className="text-sunset-600 font-medium">Shop Corn Tortillas →</span>
              </Link>

              <Link
                href="/products/flour-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Flour Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Soft and pliable, perfect for breakfast burritos and quesadillas
                </p>
                <span className="text-sunset-600 font-medium">Shop Flour Tortillas →</span>
              </Link>

              <Link
                href="/products/butter-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Rich buttery flavor—comfort food for rainy Seattle days
                </p>
                <span className="text-sunset-600 font-medium">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* Seattle-Specific Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Pacific Northwest Living</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Living in Seattle means adapting to the rain, the coffee culture, the tech scene, and the Pacific Northwest lifestyle.
                But when you're from Texas, some things you just can't compromise on—and tortillas are one of them. H-E-B tortillas
                bring that authentic Texas comfort to your Seattle home.
              </p>

              <ul className="space-y-3 text-charcoal-700 ml-6">
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Rainy day comfort</strong> – Warm tacos and quesadillas for cozy Seattle evenings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>No refrigeration needed</strong> – Save space in your Seattle apartment fridge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Long shelf life</strong> – Stock up and always have Texas flavor on hand</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Quick weeknight meals</strong> – Perfect for busy Seattle professionals</span>
                </li>
              </ul>

              <p className="text-lg leading-relaxed">
                Whether you're in Capitol Hill, Ballard, Fremont, Queen Anne, or anywhere in the greater Seattle area, H-E-B tortillas
                connect you back to Texas while you enjoy everything the Pacific Northwest has to offer.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Do you ship H-E-B tortillas to Seattle?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Yes! We deliver authentic H-E-B® tortillas throughout Seattle, Tacoma, Bellevue, Spokane, Olympia, and all of Washington state.
                  Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. Perfect for Pacific Northwest living!
                  We deliver to the Puget Sound region, Eastern Washington, and everywhere in between.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Will rain affect my tortilla delivery?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Not at all! Our tortillas are packaged in weatherproof packaging that protects them from Seattle's rain and moisture.
                  H-E-B® tortillas are shelf-stable and maintain perfect quality regardless of weather conditions during shipping. Rain or shine,
                  your tortillas arrive in perfect condition.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">How fresh are tortillas when they arrive in Washington?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  H-E-B® tortillas are shelf-stable and arrive at peak freshness. They do not require refrigeration during shipping or storage,
                  making them perfect for delivery to Washington. Store in your pantry for 3-4 weeks unopened, or freeze for up to 6 months.
                  Learn more in our{' '}
                  <Link href="/guides/how-to-store-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                    storage guide
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
                  Keep your tortillas fresh for weeks with expert storage tips
                </p>
              </Link>

              <Link
                href="/guides/how-to-reheat-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How to Reheat Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Best methods to warm tortillas for perfect texture
                </p>
              </Link>

              <Link
                href="/recipes/breakfast-tacos"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Texas Breakfast Tacos →</h3>
                <p className="text-charcoal-700 text-sm">
                  Authentic Texas-style breakfast tacos recipe
                </p>
              </Link>
            </div>
          </section>

          {/* Other Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To:</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/new-york" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                New York
              </Link>
              <span className="text-charcoal-400">•</span>
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
              <Link href="/shop" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                All 50 States
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bring Texas to the Pacific Northwest</h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Order authentic H-E-B® tortillas delivered to Seattle and Washington. Rainy day comfort food with authentic Texas flavor.
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
