import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Delivered to Denver',
  description: 'Mountain living meets Texas flavor! Get authentic H-E-B® tortillas delivered to Denver & Colorado. Corn, flour & butter tortillas shipped fresh. Order today!',
  keywords: 'H-E-B tortillas Denver, tortillas Colorado delivery, Texas tortillas Denver, H-E-B Colorado, authentic tortillas Denver, tortilla delivery Front Range',
  openGraph: {
    title: 'H-E-B Tortillas Delivered to Denver',
    description: 'Authentic Texas H-E-B® tortillas delivered to Denver and Colorado. Quality ingredients for mile-high living.',
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
      name: 'Can I order H-E-B tortillas in Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver authentic H-E-B® tortillas throughout Denver, Boulder, Colorado Springs, Fort Collins, and all of Colorado. Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. Perfect for altitude cooking and mountain living!',
      },
    },
    {
      '@type': 'Question',
      name: 'Do tortillas work at high altitude?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! H-E-B® tortillas are perfect for high-altitude cooking in Denver and throughout Colorado. They maintain their quality and texture regardless of elevation. Whether you are making tacos at 5,280 feet or in the mountains, our tortillas perform beautifully.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long until they arrive in Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shipping to Denver and Colorado typically takes 2-3 business days via USPS Priority Mail from Texas. We ship Monday through Wednesday for reliable weekend delivery. You will receive tracking information to monitor your order across state lines.',
      },
    },
  ],
}

// LocalBusiness Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - Denver Delivery',
  description: 'Authentic H-E-B® tortillas delivered to Denver and Colorado',
  areaServed: {
    '@type': 'City',
    name: 'Denver',
    '@id': 'https://en.wikipedia.org/wiki/Denver',
  },
  image: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  url: 'https://lonestartortillas.com/denver',
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
      name: 'Denver',
      item: 'https://lonestartortillas.com/denver',
    },
  ],
}

export default function DenverPage() {
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
              H-E-B Tortillas Delivered to Denver
            </h1>
            <p className="text-cream-300 mt-4 text-xl">
              Authentic Texas tortillas for the Mile High City
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">H-E-B Tortillas in Denver? Absolutely!</h2>
            <p className="text-lg text-charcoal-800 leading-relaxed">
              We deliver <strong>authentic H-E-B® tortillas from Texas</strong> to Denver, Boulder, Colorado Springs, Fort Collins, and all of Colorado.
              Our shelf-stable corn, flour, and butter tortillas ship via priority mail (2-3 days) and work <strong>perfectly at altitude</strong>.
              No refrigeration required—ideal for mountain living!
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Mountain Living Meets Texas Tradition</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-xl leading-relaxed">
                Denver and Colorado have incredible Mexican food—from green chile to street tacos in the highlands. But if you're a Texas transplant
                living in the Rockies, you know that Colorado tortillas just aren't the same as H-E-B. That perfect texture, the authentic flavor,
                the consistency that comes from generations of Texas tradition. Now you can get them delivered right to your door in Denver.
              </p>

              <p className="text-lg leading-relaxed">
                Lonestar Tortillas brings genuine H-E-B® brand tortillas from Texas to Colorado. Whether you're making breakfast tacos before
                hitting the slopes, meal-prepping for the week, or hosting taco night in LoDo, our tortillas deliver that authentic Texas taste
                you've been missing since moving to the Mile High City.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-gradient-to-r from-masa-100 to-cream-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Denver Chooses Lonestar Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🏔️ Perfect for Altitude</h3>
                <p className="text-charcoal-700">
                  H-E-B® tortillas work beautifully at 5,280 feet and beyond. Whether you're cooking in Denver, Boulder, or mountain towns,
                  our tortillas maintain perfect texture and flavor at any elevation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🌮 Authentic H-E-B Quality</h3>
                <p className="text-charcoal-700">
                  Real H-E-B® brand tortillas from Texas—the same ones Texans have trusted for generations. Bon Appétit magazine called them
                  "the best supermarket-brand tortilla out there."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">📦 Shelf-Stable Storage</h3>
                <p className="text-charcoal-700">
                  No refrigeration needed! Perfect for Colorado's dry climate and mountain living. Store in your pantry for 3-4 weeks unopened,
                  or freeze for up to 6 months. Ideal for stocking your cabin or RV.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-3">🚚 Fast Colorado Delivery</h3>
                <p className="text-charcoal-700">
                  2-3 day USPS Priority Mail from Texas to the Front Range. We deliver to Denver, Boulder, Colorado Springs, Fort Collins,
                  and everywhere in between.
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
                <h3 className="font-bold text-charcoal-950 mb-2">Choose Your Tortillas</h3>
                <p className="text-charcoal-700 text-sm">
                  Select corn, flour, or butter tortillas
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Packed Fresh</h3>
                <p className="text-charcoal-700 text-sm">
                  We pack your H-E-B tortillas in Texas
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Ship to Colorado</h3>
                <p className="text-charcoal-700 text-sm">
                  2-3 day Priority Mail to Denver & beyond
                </p>
              </div>

              <div className="text-center">
                <div className="bg-sunset-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-charcoal-950 mb-2">Enjoy!</h3>
                <p className="text-charcoal-700 text-sm">
                  Make tacos before or after your hike!
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
              All your favorite H-E-B tortilla varieties, delivered to Denver and Colorado.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/products/corn-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Authentic masa flavor for street tacos and enchiladas
                </p>
                <span className="text-sunset-600 font-medium">Shop Corn Tortillas →</span>
              </Link>

              <Link
                href="/products/flour-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Flour Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Soft and pliable, perfect for breakfast burritos and wraps
                </p>
                <span className="text-sunset-600 font-medium">Shop Flour Tortillas →</span>
              </Link>

              <Link
                href="/products/butter-tortillas"
                className="bg-cream-50 text-charcoal-950 p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="text-xl font-bold mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 mb-4">
                  Rich buttery flavor—fuel for your Colorado adventures
                </p>
                <span className="text-sunset-600 font-medium">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* Denver-Specific Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ideal for Colorado Living</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Living in Denver and Colorado means an active lifestyle—hiking, skiing, biking, climbing. You need quality fuel that's easy
                to prepare and delicious to eat. H-E-B tortillas are perfect for:
              </p>

              <ul className="space-y-3 text-charcoal-700 ml-6">
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Pre-hike breakfast tacos</strong> – Quick, filling, and portable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Meal prep for the week</strong> – Freeze in portions, thaw as needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Cabin and RV stocking</strong> – No refrigeration needed, long shelf life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Apres-ski dinners</strong> – Easy quesadillas and tacos after a day on the slopes</span>
                </li>
              </ul>

              <p className="text-lg leading-relaxed">
                Our shelf-stable formula works perfectly in Colorado's low humidity and varying elevations. Stock your pantry with authentic
                Texas flavor and always be ready for taco night.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Can I order H-E-B tortillas in Denver?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Yes! We deliver authentic H-E-B® tortillas throughout Denver, Boulder, Colorado Springs, Fort Collins, Aspen, Vail, and all of Colorado.
                  Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. Perfect for altitude cooking and mountain living!
                  We deliver to the Front Range, Western Slope, mountain towns—everywhere in the Centennial State.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">Do tortillas work at high altitude?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Absolutely! H-E-B® tortillas are perfect for high-altitude cooking in Denver (5,280 ft) and throughout Colorado's mountains.
                  They maintain their quality, texture, and flavor regardless of elevation. Whether you're making tacos at sea level or in Breckenridge
                  at 9,600 feet, our tortillas perform beautifully. No special adjustments needed!
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-xl">How long until they arrive in Colorado?</h3>
                <p className="text-charcoal-700 text-lg leading-relaxed">
                  Shipping to Denver and Colorado typically takes 2-3 business days via USPS Priority Mail from Texas. We ship Monday through Wednesday
                  for reliable weekend delivery. You will receive tracking information via email to monitor your order across state lines. Learn more about
                  storing your tortillas in our{' '}
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
              <Link href="/chicago" className="text-sunset-600 hover:text-sunset-700 font-medium underline">
                Chicago
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bring Texas to the Rockies</h2>
            <p className="text-xl text-cream-300 mb-8 max-w-2xl mx-auto">
              Order authentic H-E-B® tortillas delivered to Denver and Colorado. Perfect for mountain living and altitude cooking.
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
