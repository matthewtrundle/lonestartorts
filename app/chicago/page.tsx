import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Delivered to Chicago',
  description: 'Texas expats in Chicago—get authentic H-E-B® tortillas delivered to the Windy City. Corn, flour & butter tortillas shipped fresh to Illinois. Order now!',
  keywords: 'H-E-B tortillas Chicago, tortillas Chicago delivery, Texas tortillas Illinois, H-E-B Midwest, authentic tortillas Chicago, tortilla delivery Chicagoland',
  openGraph: {
    title: 'H-E-B Tortillas Delivered to Chicago',
    description: 'Authentic Texas H-E-B® tortillas delivered to Chicago and the Midwest. Taste of home, shipped fresh.',
    type: 'website',
  },
}

// FAQ Schema for voice search
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you deliver H-E-B tortillas to Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver authentic H-E-B® tortillas throughout Chicago, the suburbs, and all of Illinois. Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. Perfect for Texas expats in the Windy City who miss the taste of home!',
      },
    },
    {
      '@type': 'Question',
      name: 'Will tortillas survive cold Chicago winters in shipping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! H-E-B® tortillas are shelf-stable and temperature-resilient, maintaining perfect quality through Chicago winters and hot summers. They require no refrigeration during shipping or storage, making them ideal for year-round delivery to Illinois.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is shipping to Illinois?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shipping to Chicago and Illinois typically takes 2-3 business days via USPS Priority Mail. We ship Monday through Wednesday to ensure weekend delivery. You will receive tracking information to monitor your order from Texas to Chicago.',
      },
    },
  ],
}

// LocalBusiness Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - Chicago Delivery',
  description: 'Authentic H-E-B® tortillas delivered to Chicago and Illinois',
  areaServed: {
    '@type': 'City',
    name: 'Chicago',
    '@id': 'https://en.wikipedia.org/wiki/Chicago',
  },
  image: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  url: 'https://lonestartortillas.com/chicago',
}

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://lonestartortillas.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Chicago',
      item: 'https://lonestartortillas.com/chicago',
    },
  ],
}

export default function ChicagoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
              H-E-B Tortillas Delivered to Chicago
            </h1>
            <p className="text-cream-300 mt-4 text-xl">
              Authentic Texas tortillas for Windy City expats and taco lovers
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">H-E-B Tortillas in Chicago? Yes!</h2>
            <p className="text-lg text-charcoal-800 leading-relaxed">
              We deliver <strong>authentic H-E-B® tortillas from Texas</strong> to Chicago, the suburbs, and all of Illinois.
              Our shelf-stable corn, flour, and butter tortillas ship via priority mail (2-3 days) and are <strong>temperature-resilient</strong>—
              perfect for Chicago's extreme weather. No refrigeration required!
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Texans in the Windy City, We Got You</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-xl leading-relaxed">
                Moving from Texas to Chicago means trading BBQ for deep-dish pizza, warm winters for frozen lakefronts, and most painfully—
                saying goodbye to H-E-B tortillas. But what if you didn't have to? Lonestar Tortillas brings the authentic taste of Texas
                right to your door in Chicago, whether you're in the Loop, Wicker Park, Lincoln Park, or anywhere in Chicagoland.
              </p>

              <p className="text-lg leading-relaxed">
                We know there's great Mexican food in Chicago—Pilsen has incredible taquerías, and the Midwest has its own tortilla traditions.
                But if you're from Texas, you know that H-E-B tortillas hit different. That perfect texture, the authentic flavor, the consistency
                you can count on. Now available in Illinois without a road trip back to Texas.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-gradient-to-r from-masa-100 to-cream-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Chicagoans Choose Lonestar Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🌮 Genuine H-E-B Quality</h3>
                <p className="text-charcoal-700">
                  Real H-E-B® brand tortillas from Texas—not substitutes or alternatives. The same tortillas that Texans have trusted for decades.
                  Bon Appétit magazine called them "the best supermarket-brand tortilla out there."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">❄️ Weather-Resistant</h3>
                <p className="text-charcoal-700">
                  Shelf-stable formula means our tortillas ship safely through Chicago winters and humid summers. No refrigeration needed
                  during delivery or storage—just your pantry or freezer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🚚 Midwest Delivery</h3>
                <p className="text-charcoal-700">
                  Fast 2-3 day Priority Mail shipping from Texas to Illinois. Track your order every step of the way. Reliable delivery to
                  Chicago, suburbs, and all of Illinois.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🏠 Taste of Home</h3>
                <p className="text-charcoal-700">
                  For Texas expats, H-E-B tortillas are more than food—they're a connection to home. Make breakfast tacos that actually
                  taste like Austin or San Antonio, not Chicago's interpretation.
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
                <h3 className="font-bold text-charcoal-950 mb-2">Order Online</h3>
                <p className="text-charcoal-700 text-sm">
                  Choose your H-E-B tortillas and place your order
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Packed in Texas</h3>
                <p className="text-charcoal-700 text-sm">
                  We carefully pack your tortillas for safe shipping
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Ship to Chicago</h3>
                <p className="text-charcoal-700 text-sm">
                  2-3 day Priority Mail to your Illinois address
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Enjoy Texas!</h3>
                <p className="text-charcoal-700 text-sm">
                  Make tacos, burritos, breakfast tacos—a taste of home
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
              All your favorite H-E-B tortilla varieties, delivered to Chicago and Illinois.
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
                  Rich buttery flavor—warm comfort for cold Chicago nights
                </p>
                <span className="text-sunset-600 font-medium">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* Chicago-Specific Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect for Chicago Living</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Living in Chicago as a Texas expat has its perks—world-class museums, beautiful lakefront, incredible food scene. But when
                you're craving authentic Texas-Mexican food, nothing beats the real deal from home. H-E-B tortillas let you recreate those
                Austin breakfast tacos, San Antonio street tacos, or Houston-style fajitas right in your Chicago kitchen.
              </p>

              <p className="text-lg leading-relaxed">
                Our shelf-stable tortillas are ideal for Chicago's climate extremes. They ship safely through polar vortex winters and humid
                summers, require no refrigeration, and have a long pantry shelf life (3-4 weeks unopened). Stock up and always have Texas
                flavor on hand.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Do you deliver H-E-B tortillas to Chicago?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Yes! We deliver authentic H-E-B® tortillas throughout Chicago, the suburbs (Naperville, Schaumburg, Evanston, Oak Park, etc.),
                  and all of Illinois. Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days.
                  Perfect for Texas expats in the Windy City who miss the taste of home! We deliver to the Loop, North Side, South Side,
                  West Side, and all surrounding areas.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Will tortillas survive cold Chicago winters in shipping?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Absolutely! H-E-B® tortillas are shelf-stable and temperature-resilient, maintaining perfect quality through Chicago winters
                  (even polar vortex conditions) and hot, humid summers. They require no refrigeration during shipping or storage, making them
                  ideal for year-round delivery to Illinois. The USPS Priority Mail service we use is reliable in all weather conditions.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">How long is shipping to Illinois?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Shipping to Chicago and Illinois typically takes 2-3 business days via USPS Priority Mail. We ship Monday through Wednesday
                  to ensure weekend delivery. You will receive tracking information via email to monitor your order from Texas to Chicago.
                  Learn more about storing your tortillas in our{' '}
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
                  Best methods to warm tortillas for perfect texture every time
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
              <Link href="/denver" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bring Texas Home to Chicago</h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Order authentic H-E-B® tortillas delivered to the Windy City. Same tortillas Texans love, now available in Illinois.
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
