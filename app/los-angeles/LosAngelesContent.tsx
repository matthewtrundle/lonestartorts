'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export function LosAngelesContent() {
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
              H-E-B Tortillas Delivered to Los Angeles
            </h1>
            <p className="text-cream-300 mt-4 text-xl">
              Authentic Texas tortillas for LA expats and tortilla enthusiasts
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">Get H-E-B Tortillas in Los Angeles</h2>
            <p className="text-lg text-charcoal-800 leading-relaxed">
              Yes! We deliver <strong>authentic H-E-B® tortillas from Texas</strong> to Los Angeles, Orange County, and all of Southern California.
              Our shelf-stable corn, flour, and butter tortillas ship via priority mail (2-3 days) with <strong>no refrigeration required</strong>.
              Experience the tortillas that Bon Appétit called "the best supermarket-brand tortilla out there."
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Bring Texas Flavor to California</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-xl leading-relaxed">
                Los Angeles has incredible taco trucks, authentic Mexican restaurants, and even local tortilla brands like Mission. But if you're
                a Texas transplant or you've ever tasted H-E-B tortillas, you know there's something special about them that's hard to find
                in California. That authentic Texas flavor, the perfect texture, the quality that generations of Texans have trusted—now
                available right here in Los Angeles.
              </p>

              <p className="text-lg leading-relaxed">
                Lonestar Tortillas brings genuine H-E-B® brand tortillas straight from Texas to your door in LA, whether you're in Downtown,
                Santa Monica, Pasadena, Long Beach, or anywhere across Southern California. No more waiting for your next Texas trip to stock up.
                No more settling for alternatives that just don't taste the same.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-gradient-to-r from-masa-100 to-cream-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Los Angeles Chooses H-E-B Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🌮 Authentic Texas Recipe</h3>
                <p className="text-charcoal-700">
                  We source genuine H-E-B® brand tortillas made in Texas—not California imitations. These are the same tortillas that
                  Texans have loved for decades. Bon Appétit magazine named them "the best supermarket-brand tortilla out there" for good reason.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">⭐ Superior to Mission</h3>
                <p className="text-charcoal-700">
                  While Mission makes solid tortillas, many Texans and tortilla lovers prefer H-E-B for its softer texture, authentic flavor,
                  and consistent quality. Compare them yourself and taste the Texas difference!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">📦 Shelf-Stable Convenience</h3>
                <p className="text-charcoal-700">
                  Perfect for Southern California's climate! No refrigeration needed during shipping or storage. Keep them in your pantry
                  for 3-4 weeks unopened, or freeze for up to 6 months. Ideal for meal prep and batch cooking.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🚚 Fast California Delivery</h3>
                <p className="text-charcoal-700">
                  2-3 day USPS Priority Mail shipping to LA and all of SoCal. Track your order from Texas to your door. We ship Monday-Wednesday
                  for reliable weekend delivery.
                </p>
              </div>
            </div>
          </section>

          {/* H-E-B vs Mission Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">H-E-B vs. Mission Tortillas: The Texas Difference</h2>
            <div className="bg-cream-100 p-8 rounded-lg">
              <p className="text-lg text-charcoal-700 mb-6 leading-relaxed">
                Los Angeles is home to Mission Foods, one of the largest tortilla brands in America. But many Texans who move to California
                find themselves missing H-E-B tortillas. Here's why:
              </p>

              <div className="space-y-4 text-charcoal-700">
                <div className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-charcoal-950">Texture & Pliability:</strong> H-E-B tortillas have a notably softer, more pliable
                    texture that stays fresh longer. They're perfect for rolling burritos or folding tacos without cracking.
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-charcoal-950">Authentic Texas Flavor:</strong> H-E-B's recipe has been perfected over decades
                    to match what Texans expect from their tortillas—a subtle sweetness in flour tortillas and authentic masa flavor in corn.
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-charcoal-950">Quality Ingredients:</strong> H-E-B maintains strict quality standards and uses
                    premium ingredients, which you can taste in every bite.
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-charcoal-950">Cultural Heritage:</strong> For Texans and those who love authentic Texas-Mexican
                    cuisine, H-E-B tortillas represent a connection to Texas food culture that California brands can't replicate.
                  </div>
                </div>
              </div>

              <p className="mt-6 text-charcoal-700 italic">
                Don't get us wrong—Mission makes good tortillas. But once you try H-E-B, you'll understand why Texans are so loyal to them.
              </p>
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
                <h3 className="font-bold text-charcoal-950 mb-2">Browse & Select</h3>
                <p className="text-charcoal-700 text-sm">
                  Choose from corn, flour, or butter tortillas
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">We Ship Fresh</h3>
                <p className="text-charcoal-700 text-sm">
                  Carefully packed and shipped from Texas
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Fast to LA</h3>
                <p className="text-charcoal-700 text-sm">
                  2-3 day Priority Mail delivery to SoCal
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Enjoy Texas!</h3>
                <p className="text-charcoal-700 text-sm">
                  Taste the difference of authentic H-E-B tortillas
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
              All the H-E-B tortilla varieties you love, delivered to Los Angeles and Southern California.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/products/corn-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Authentic masa flavor, perfect for street tacos and enchiladas
                </p>
                <span className="text-sunset-600 font-medium">Shop Corn Tortillas →</span>
              </Link>

              <Link
                href="/products/flour-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Flour Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Soft and pliable, ideal for breakfast burritos and quesadillas
                </p>
                <span className="text-sunset-600 font-medium">Shop Flour Tortillas →</span>
              </Link>

              <Link
                href="/products/butter-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Rich buttery flavor—a Texas favorite you can't find in California
                </p>
                <span className="text-sunset-600 font-medium">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Can you ship H-E-B tortillas to Los Angeles?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Yes! We deliver authentic H-E-B® tortillas throughout Los Angeles, Orange County, Riverside, San Bernardino, Ventura,
                  and all of Southern California. Our shelf-stable tortillas ship via USPS Priority Mail and typically arrive within 2-3 business days.
                  No refrigeration needed during shipping! We deliver to Downtown LA, West LA, the Valley, beach cities, Inland Empire—everywhere in SoCal.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">How are H-E-B tortillas different from Mission tortillas?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  H-E-B tortillas are made in Texas with a time-tested recipe that Texans have trusted for generations. While Mission (also a California brand)
                  makes good tortillas, many people prefer the authentic Texas flavor, softer texture, and superior quality of H-E-B tortillas.
                  Bon Appétit magazine called H-E-B "the best supermarket-brand tortilla out there." The difference is in the recipe, ingredients,
                  and decades of Texas tradition. Try them side-by-side and taste for yourself!
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Do I need to refrigerate tortillas during LA shipping?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  No! H-E-B® tortillas are shelf-stable and require no refrigeration during shipping or storage. They maintain perfect freshness at room
                  temperature, making them ideal for California's climate and nationwide delivery. Simply store in your pantry for 3-4 weeks unopened,
                  or freeze for up to 6 months. Learn more in our{' '}
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
                href="/guides/corn-vs-flour-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Corn vs Flour Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Complete comparison guide to help you choose the right tortilla
                </p>
              </Link>

              <Link
                href="/guides/how-to-reheat-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How to Reheat Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Learn the best methods to warm tortillas for perfect texture
                </p>
              </Link>

              <Link
                href="/recipes/breakfast-tacos"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Texas Breakfast Tacos →</h3>
                <p className="text-charcoal-700 text-sm">
                  Classic Texas-style breakfast tacos recipe
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Authentic Texas Tortillas?</h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Order genuine H-E-B® tortillas delivered to Los Angeles. Experience the tortillas that Bon Appétit called "the best supermarket-brand tortilla out there."
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
