import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Sonoran Style Tortillas Guide',
  description: 'Learn what makes Sonoran style flour tortillas unique. Discover the thin, stretchy texture, lard-based recipe, and cooking techniques that define Northern Mexican tortillas.',
  keywords: 'sonoran style tortillas, sonoran flour tortillas, sobaqueras tortillas, northern mexico tortillas, thin flour tortillas, large flour tortillas',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/sonoran-style-tortillas',
  },
  openGraph: {
    title: 'Sonoran Style Tortillas: The Complete Guide',
    description: 'Everything you need to know about Sonoran flour tortillas - the thin, stretchy tortillas from Northern Mexico.',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Sonoran style tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sonoran style tortillas are large, thin flour tortillas from the Sonora region of Northern Mexico. They are known for being paper-thin yet incredibly stretchy and pliable. Traditional Sonoran tortillas are made with lard and cooked on a large flat griddle called a comal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are Sonoran tortillas so thin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sonoran tortillas are thin because of the stretching technique called "sobaquera" where tortilla makers stretch the dough over their forearms. This traditional method creates paper-thin tortillas that can be up to 18 inches in diameter while remaining flexible.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Sonoran tortillas different from regular flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sonoran tortillas differ from regular flour tortillas in several ways: they are much thinner and larger (up to 18 inches), use lard for authentic flavor and texture, have a slightly chewy yet stretchy texture, and are traditionally made using the sobaquera stretching technique.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Sonoran tortillas used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sonoran tortillas are traditionally used for burritos (the original burrito style), carne asada wraps, machaca, breakfast tacos, and chimichangas. Their large size and flexibility make them ideal for wrapping generous portions of meat and fillings.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sonoran Style Tortillas: Complete Guide',
  description: 'Learn what makes Sonoran flour tortillas unique - the thin, stretchy tortillas from Northern Mexico.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
}

export default function SonoranStyleTortillasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-cream-300 mb-4">
              <Link href="/" className="hover:text-sunset-400">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-sunset-400">Guides</Link>
              <span>/</span>
              <span>Sonoran Style Tortillas</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sonoran Style Tortillas
            </h1>
            <p className="text-xl text-cream-200 max-w-2xl">
              Discover the thin, stretchy flour tortillas that define Northern Mexican cuisine.
            </p>
            <LastUpdated date="November 26, 2025" className="mt-4" />
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Sonoran style flour tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-8">
              In the Sonoran Desert region spanning Northern Mexico and Arizona, flour tortillas reach their pinnacle. These aren&apos;t the thick, small tortillas found elsewhere—Sonoran tortillas are paper-thin, incredibly stretchy, and can span nearly two feet across.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6 flex items-center gap-3">
              <TacoIcon className="w-8 h-8 text-sunset-500" />
              What Defines Sonoran Style Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Sonoran tortillas have distinct characteristics that set them apart from other flour tortillas:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Paper-Thin Texture:</strong>
                  <span className="text-charcoal-700"> Traditional Sonoran tortillas are stretched so thin you can nearly see through them, yet they remain strong enough to hold generous fillings.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Large Diameter:</strong>
                  <span className="text-charcoal-700"> While standard flour tortillas are 8-10 inches, Sonoran tortillas can reach 14-18 inches across—perfect for substantial burritos.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Lard-Based Recipe:</strong>
                  <span className="text-charcoal-700"> Authentic Sonoran tortillas use lard (manteca), which gives them their signature flavor, flakiness, and incredible pliability.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Stretchy and Pliable:</strong>
                  <span className="text-charcoal-700"> The combination of technique and ingredients creates a tortilla that stretches without tearing, even when cold.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              The Sobaquera Technique
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              The name &quot;sobaquera&quot; comes from &quot;sobaco&quot; (armpit in Spanish), referring to the traditional technique where tortilla makers stretch the dough over their forearms. This method has been passed down through generations in Sonoran families.
            </p>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Skilled tortilleras can stretch a ball of dough into a paper-thin disc in seconds, spinning and flipping the tortilla over their arms. This technique is what gives Sonoran tortillas their characteristic thinness while maintaining structural integrity.
            </p>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg my-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Regional History</h3>
              <p className="text-charcoal-700">
                Sonoran flour tortillas developed in Northern Mexico where wheat thrived in the arid climate better than corn. Spanish colonizers introduced wheat, and local cooks adapted it into the tortilla tradition, creating a unique regional food that became the foundation for the modern burrito.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Traditional Uses for Sonoran Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              The large size and flexibility of Sonoran tortillas make them ideal for specific dishes:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Burritos de Carne Asada</h3>
                <p className="text-charcoal-600 text-sm">The original burrito style—grilled meat wrapped in a large Sonoran tortilla with simple accompaniments like salsa and guacamole.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Machaca</h3>
                <p className="text-charcoal-600 text-sm">Dried, shredded beef rehydrated and cooked with eggs, peppers, and onions—a Sonoran breakfast staple.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Chimichangas</h3>
                <p className="text-charcoal-600 text-sm">Believed to have originated in Arizona/Sonora, these deep-fried burritos require large, sturdy tortillas.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Quesadillas Grandes</h3>
                <p className="text-charcoal-600 text-sm">Large quesadillas filled with Oaxaca cheese, grilled meats, and served with fresh salsa.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              How to Work with Sonoran Style Tortillas
            </h2>

            <ol className="space-y-4 mb-8 list-decimal list-inside">
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Warm them properly</strong>—even though Sonoran tortillas are flexible when cold, warming makes them even more pliable and releases their aroma.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Use a dry comal or skillet</strong> over medium heat. The thin tortillas only need 15-20 seconds per side.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Watch for small bubbles</strong> forming—this indicates the tortilla is heated through.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Stack and cover</strong> warmed tortillas to keep them soft while you prepare your filling.
              </li>
            </ol>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What are Sonoran style tortillas?</h3>
                <p className="text-charcoal-700">Sonoran style tortillas are large, thin flour tortillas from the Sonora region of Northern Mexico. They are known for being paper-thin yet incredibly stretchy and pliable. Traditional Sonoran tortillas are made with lard and cooked on a large flat griddle called a comal.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Why are Sonoran tortillas so thin?</h3>
                <p className="text-charcoal-700">Sonoran tortillas are thin because of the stretching technique called &quot;sobaquera&quot; where tortilla makers stretch the dough over their forearms. This traditional method creates paper-thin tortillas that can be up to 18 inches in diameter while remaining flexible.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What makes Sonoran tortillas different from regular flour tortillas?</h3>
                <p className="text-charcoal-700">Sonoran tortillas differ from regular flour tortillas in several ways: they are much thinner and larger (up to 18 inches), use lard for authentic flavor and texture, have a slightly chewy yet stretchy texture, and are traditionally made using the sobaquera stretching technique.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What are Sonoran tortillas used for?</h3>
                <p className="text-charcoal-700">Sonoran tortillas are traditionally used for burritos (the original burrito style), carne asada wraps, machaca, breakfast tacos, and chimichangas. Their large size and flexibility make them ideal for wrapping generous portions of meat and fillings.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-12">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Try Authentic Texas Flour Tortillas</h2>
            <p className="text-cream-200 mb-6">Our H-E-B flour tortillas bring authentic Texas taste with the flexibility you need for burritos and wraps.</p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop Flour Tortillas
            </Link>
          </section>

          {/* Related Links */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/corn-vs-flour-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Corn vs Flour Tortillas</h3>
                <p className="text-charcoal-600 text-sm">When to use each type</p>
              </Link>
              <Link href="/guides/best-tortillas-for-burritos" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Best Tortillas for Burritos</h3>
                <p className="text-charcoal-600 text-sm">Size and flexibility guide</p>
              </Link>
              <Link href="/guides/how-to-reheat-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">How to Reheat Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Perfect warming techniques</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
