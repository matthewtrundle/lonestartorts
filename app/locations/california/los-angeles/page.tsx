import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Los Angeles',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to Los Angeles, California. Fresh flour & corn tortillas for tacos, burritos & more. Fast shipping, premium quality.',
  keywords: 'tortillas Los Angeles, Texas tortillas California, H-E-B tortillas delivery, authentic Mexican tortillas Los Angeles, fresh tortillas shipped, LA tortilla delivery',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/california/los-angeles',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to Los Angeles | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to Los Angeles. Experience the taste of Texas.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does shipping take to Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most orders arrive within 2-3 business days. We ship same-day if ordered by 2 PM CT.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I store my tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keep refrigerated for up to 2 weeks or freeze for 6 months. Always reheat on a dry skillet for that fresh-off-the-griddle texture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your tortillas gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our corn tortillas are gluten-free. Flour tortillas contain wheat.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No minimum! Order 1 package or 20—we ship any quantity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you ship to other cities in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We serve San Diego, San Francisco, Long Beach, Anaheim, and all California ZIP codes.',
      },
    },
  ],
}

const nearbyCities = [
  { name: 'San Diego', href: '/locations/california/san-diego' },
  { name: 'Long Beach', href: '/locations/california/long-beach' },
  { name: 'Anaheim', href: '/locations/california/anaheim' },
  { name: 'San Francisco', href: '/locations/california/san-francisco' },
  { name: 'San Jose', href: '/locations/california/san-jose' },
  { name: 'Phoenix', href: '/locations/arizona/phoenix' },
  { name: 'Las Vegas', href: '/locations/nevada/las-vegas' },
]

export default function LosAngelesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: 'California', href: '/locations/california' },
                { label: 'Los Angeles' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to Los Angeles
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in Los Angeles, California. Experience the authentic taste of Texas.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Fresh authentic Texas tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Craving the authentic taste of Texas in the heart of Los Angeles? Lonestar Tortillas brings the legendary flavor of H-E-B tortillas straight from the Lone Star State to your California doorstep. As the premier source for genuine Texas-style tortillas in LA, we specialize in shipping fresh, never-frozen tortillas that capture the soul of Tex-Mex cuisine.
            </p>
            <p className="text-lg text-charcoal-600 leading-relaxed">
              Whether you're a homesick Texan missing that perfect chew or a Los Angeles foodie seeking truly exceptional tortillas for taco night, our direct-from-Texas delivery ensures you get the real deal. Skip the grocery store imitations—every bite of our corn, flour, and butter tortillas delivers the authentic texture and flavor that made H-E-B a Texas icon.
            </p>
          </div>

          {/* Why Texas Tortillas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">
              Why Los Angeles Residents Choose Texas Tortillas
            </h2>
            <div className="prose prose-lg max-w-none text-charcoal-700">
              <p>
                In a city bursting with incredible Mexican food, Los Angeles residents know quality when they taste it—and that's exactly why they're turning to Texas tortillas. While LA's local tortillerias offer great options, there's something uniquely irresistible about Texas-style tortillas. Made with H-E-B's original recipes (the same ones you'd find in stores across Texas), our tortillas boast a distinct flavor profile and texture perfected over decades.
              </p>
              <p>
                What makes Texas tortillas special? It starts with heritage. H-E-B has been a Texas institution since 1905, crafting tortillas with time-honored techniques that balance tenderness with just the right amount of pull. Our flour tortillas are rolled slightly thicker than West Coast styles, creating the perfect pliable base for brisket tacos or breakfast burritos. The corn tortillas feature a robust masa flavor that holds up beautifully on LA's famous fish tacos. And our cult-favorite butter tortillas? They're the secret weapon for next-level quesadillas.
              </p>
              <p>
                For transplanted Texans in neighborhoods like Silver Lake or Santa Monica, our tortillas are a taste of home. For Angelenos, they're a delicious discovery—a way to elevate homemade Mexican food with authentic regional character.
              </p>
            </div>
          </section>

          {/* Products Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">
                  Our stone-ground corn tortillas are a love letter to tradition. Made with non-GMO maize and a touch of lime, they deliver the authentic earthy flavor and sturdy texture perfect for LA's taco culture. Ideal for crispy carnitas tacos, enchiladas, or chilaquiles.
                </p>
                <Link href="/products/corn-tortillas" className="text-sunset-600 font-semibold hover:text-sunset-700">
                  Shop Corn Tortillas →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">
                  The holy grail of burrito-wrapping and quesadilla-making. Our flour tortillas feature a signature blend for that quintessential Texas chew. Slightly thicker than most California-style versions, they're strong enough for overstuffed Mission-style burritos.
                </p>
                <Link href="/products/flour-tortillas" className="text-sunset-600 font-semibold hover:text-sunset-700">
                  Shop Flour Tortillas →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">
                  Indulgence meets versatility. Enriched with real butter, these rich, flaky tortillas are a Texas delicacy Angelenos adore. Perfect for sweet applications like cinnamon-sugar roll-ups or savory masterpieces like gourmet quesadillas.
                </p>
                <Link href="/products/butter-tortillas" className="text-sunset-600 font-semibold hover:text-sunset-700">
                  Shop Butter Tortillas →
                </Link>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section className="mb-12 bg-sunset-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Shipping to Los Angeles, California</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-charcoal-950 mb-2">Fast Delivery</h3>
                <p className="text-charcoal-700">
                  Orders placed by 2 PM CT ship same-day via refrigerated transit. Most Los Angeles addresses (including Long Beach, Anaheim, and San Diego) receive orders in 2-3 business days.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-charcoal-950 mb-2">Shipping Rates</h3>
                <p className="text-charcoal-700">
                  Shipping starts at $9.95 for 6 packages, with discounts on larger orders. We deliver to all ZIP codes in Los Angeles County and throughout California, plus Arizona and Nevada.
                </p>
              </div>
            </div>
            <p className="mt-4 text-charcoal-600 text-sm">
              <strong>Pro Tip:</strong> Order with neighbors! Combine shipments to save on shipping costs and share the Texas love.
            </p>
          </section>

          {/* LA Food Scene */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">
              Los Angeles's Mexican Food Scene
            </h2>
            <div className="prose prose-lg max-w-none text-charcoal-700">
              <p>
                From the iconic birria tacos of Boyle Heights to the innovative Mexican-Korean fusion of Kogi BBQ trucks, Los Angeles has one of the world's most vibrant Mexican food landscapes. Yet even in this culinary paradise, home cooks and chefs alike seek authentic foundations—the building blocks that let quality ingredients shine. That's where Texas tortillas make their mark.
              </p>
              <p>
                In neighborhoods like East LA and Highland Park, where multi-generational Mexican kitchens craft family recipes daily, our tortillas have become a quiet staple. They're the canvas for weekend barbacoa feasts in Echo Park, the base for seafood-topped tacos in Venice Beach, and the secret behind those irresistible food truck quesadillas.
              </p>
              <p>
                Whether you're recreating your favorite dish from Guisados or experimenting with California-inspired flavors (think smoked salmon breakfast tacos with avocado crema), starting with authentic Texas tortillas makes all the difference.
              </p>
            </div>
          </section>

          {/* Recipes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Perfect Pairings: Recipes for Los Angeles Home Cooks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="font-bold text-charcoal-950 mb-2">Breakfast Tacos Like a Texan</h3>
                <p className="text-charcoal-700 text-sm">
                  Scramble eggs with diced Hatch chiles, pile onto warmed flour tortillas, and top with crispy bacon, shredded cheese, and a drizzle of salsa verde. LA twist: add avocado slices.
                </p>
                <Link href="/recipes/breakfast-tacos" className="text-sunset-600 text-sm font-semibold mt-2 inline-block">
                  View Recipe →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="font-bold text-charcoal-950 mb-2">Grilled Fish Tacos</h3>
                <p className="text-charcoal-700 text-sm">
                  Marinate mahi-mahi in lime and chipotle, grill until flaky, and serve on corn tortillas with purple cabbage slaw and cilantro-lime crema.
                </p>
                <Link href="/recipes/fish-tacos" className="text-sunset-600 text-sm font-semibold mt-2 inline-block">
                  View Recipe →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="font-bold text-charcoal-950 mb-2">Carne Asada Quesadillas</h3>
                <p className="text-charcoal-700 text-sm">
                  Layer butter tortillas with Oaxacan cheese, thinly sliced grilled steak, and caramelized onions. Cook until golden—perfect for Dodger game nights.
                </p>
                <Link href="/recipes/cheese-quesadillas" className="text-sunset-600 text-sm font-semibold mt-2 inline-block">
                  View Recipe →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="font-bold text-charcoal-950 mb-2">Brisket Burritos</h3>
                <p className="text-charcoal-700 text-sm">
                  Stuff flour tortillas with smoked brisket (from your favorite LA BBQ spot), black beans, Spanish rice, and pickled red onions.
                </p>
                <Link href="/recipes/brisket-breakfast-burrito" className="text-sunset-600 text-sm font-semibold mt-2 inline-block">
                  View Recipe →
                </Link>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/recipes" className="text-sunset-600 font-bold hover:text-sunset-700">
                Browse All Recipes →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">How long does shipping take to Los Angeles?</h3>
                <p className="text-charcoal-700">Most orders arrive within 2-3 business days. We ship same-day if ordered by 2 PM CT.</p>
              </div>
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">How should I store my tortillas?</h3>
                <p className="text-charcoal-700">
                  Keep refrigerated for up to 2 weeks or freeze for 6 months. Always reheat on a dry skillet for that fresh-off-the-griddle texture.
                  <Link href="/guides/how-to-store-tortillas" className="text-sunset-600 ml-1 font-semibold">Learn more →</Link>
                </p>
              </div>
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">Are your tortillas gluten-free?</h3>
                <p className="text-charcoal-700">
                  Our corn tortillas are gluten-free. Flour tortillas contain wheat.
                  <Link href="/guides/gluten-free-tortillas" className="text-sunset-600 ml-1 font-semibold">Gluten-free guide →</Link>
                </p>
              </div>
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">What's the minimum order?</h3>
                <p className="text-charcoal-700">No minimum! Order 1 package or 20—we ship any quantity.</p>
              </div>
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">Do you ship to other cities in California?</h3>
                <p className="text-charcoal-700">Yes! We serve San Diego, San Francisco, Long Beach, Anaheim, and all California ZIP codes.</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mb-8">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas?</h2>
            <p className="text-lg mb-6 text-cream-200 max-w-2xl mx-auto">
              Los Angeles deserves tortillas worthy of its incredible food culture—and nothing beats the real-deal taste of Texas. With easy online ordering and fast shipping to LA, your next culinary masterpiece starts here.
            </p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
            </Link>
          </section>

          {/* Related Cities */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyCities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            
            <Link href="/locations/california/chula-vista" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors">Chula Vista</Link></div>
          </section>
        </article>
      </div>
    </>
  )
}
