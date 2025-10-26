import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Reheat Tortillas: 5 Best Methods Compared',
  description: 'Learn the best ways to reheat tortillas for perfect texture. Microwave, stovetop, oven, air fryer, and steaming methods compared. Get warm, soft tortillas every time!',
  keywords: 'how to reheat tortillas, how to warm tortillas, heat tortillas, warm corn tortillas, reheat flour tortillas, tortilla warming methods',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/how-to-reheat-tortillas',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best way to reheat tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best way to reheat tortillas is on a dry skillet or comal over medium-high heat for 30 seconds per side. This method gives you warm, soft, and slightly charred tortillas with authentic texture. For multiple tortillas, wrapping in foil and heating in the oven at 350°F for 10-15 minutes works great.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you reheat tortillas in the microwave?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wrap tortillas in a damp paper towel, place on a microwave-safe plate, and heat for 30 seconds for 4-5 tortillas. Add 15 seconds for every additional 2-3 tortillas. The damp towel creates steam that keeps them soft and prevents drying out.',
      },
    },
  ],
}

export default function HowToReheatTortillasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              How to Reheat Tortillas: 5 Methods Compared
            </h1>
            <p className="text-cream-300 mt-4 text-lg">
              The ultimate guide to warming tortillas for perfect texture every time
            </p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-how-to-reheat-tortillas.webp"
              alt="Warming tortillas on a stovetop comal"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-10-25" />

          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Best method: Dry skillet/comal</strong> - Heat a dry pan over medium-high heat, place tortilla
              for 30 seconds per side until warm and slightly charred. For multiple tortillas, wrap in foil and heat
              in a 350°F oven for 10-15 minutes. Both methods produce authentic, soft, pliable tortillas.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Whether you're making tacos, burritos, or quesadillas, properly warmed tortillas make all the difference.
              Cold, stiff tortillas crack and break, while perfectly warmed ones are soft, pliable, and delicious. This
              guide covers five proven methods to reheat{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium">
                corn tortillas
              </Link>
              {' '}and{' '}
              <Link href="/products/flour-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium">
                flour tortillas
              </Link>
              {' '}to perfection.
            </p>
          </div>

          {/* TOC */}
          <nav className="bg-masa-50 p-6 rounded-lg mb-12 border border-masa-200">
            <h2 className="text-xl font-bold text-charcoal-950 mb-4">5 Methods Covered:</h2>
            <ul className="space-y-2 text-charcoal-700">
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#stovetop" className="text-sunset-600 hover:underline">Stovetop/Comal (Best Overall)</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#microwave" className="text-sunset-600 hover:underline">Microwave (Fastest)</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#oven" className="text-sunset-600 hover:underline">Oven (Large Batches)</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#airfryer" className="text-sunset-600 hover:underline">Air Fryer (Crispy Tacos)</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#steaming" className="text-sunset-600 hover:underline">Steaming (Most Gentle)</a></li>
            </ul>
          </nav>

          {/* Method 1: Stovetop */}
          <section id="stovetop" className="mb-12 scroll-mt-8">
            <div className="bg-sunset-600 text-white py-4 px-6 rounded-t-lg">
              <h2 className="text-3xl font-bold">Method #1: Stovetop (Best Overall) 🏆</h2>
              <p className="mt-2 text-sunset-100"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /> - Most authentic, perfect texture</p>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-lg border-2 border-sunset-600">
              <p className="text-lg text-charcoal-700 mb-6">
                This is the <strong>traditional method</strong> used in Mexican kitchens and produces the best-tasting
                tortillas with authentic char marks.
              </p>

              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Step-by-Step Instructions:</h3>
              <ol className="space-y-3 text-charcoal-700 mb-6 list-decimal list-inside">
                <li><strong>Heat your pan:</strong> Use a cast-iron skillet, comal, or non-stick pan over medium-high heat (no oil needed)</li>
                <li><strong>Test the heat:</strong> Sprinkle a drop of water - it should sizzle immediately</li>
                <li><strong>Place tortilla:</strong> Lay one tortilla flat on the dry, hot surface</li>
                <li><strong>Heat first side:</strong> Cook for 20-30 seconds until bottom shows light brown spots</li>
                <li><strong>Flip:</strong> Use tongs or your fingers (carefully!) to flip</li>
                <li><strong>Heat second side:</strong> Cook another 20-30 seconds until warm and pliable</li>
                <li><strong>Keep warm:</strong> Stack in a clean kitchen towel or tortilla warmer</li>
              </ol>

              <div className="bg-masa-100 p-5 rounded-lg mb-4">
                <h4 className="font-bold text-charcoal-950 mb-2">✅ Best For:</h4>
                <ul className="text-charcoal-700 space-y-1">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Corn tortillas (gets that authentic charred flavor)</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> When making tacos for immediate serving</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Small batches (1-6 tortillas)</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> When you want restaurant-quality results</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-2">Pros:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Best texture and flavor</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Develops authentic char marks</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> No equipment needed</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Quick for small batches</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">Cons:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Time-consuming for large batches</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Requires attention (can burn)</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Must do one at a time</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Method 2: Microwave */}
          <section id="microwave" className="mb-12 scroll-mt-8">
            <div className="bg-masa-600 text-white py-4 px-6 rounded-t-lg">
              <h2 className="text-3xl font-bold">Method #2: Microwave (Fastest)</h2>
              <p className="mt-2 text-masa-100"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /> - Quick and convenient</p>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-lg border-2 border-masa-600">
              <p className="text-lg text-charcoal-700 mb-6">
                The <strong>fastest method</strong> when you're in a hurry. Works great for flour tortillas, decent for corn.
              </p>

              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Step-by-Step Instructions:</h3>
              <ol className="space-y-3 text-charcoal-700 mb-6 list-decimal list-inside">
                <li><strong>Prepare damp towel:</strong> Dampen a paper towel or clean kitchen towel with water (not dripping wet)</li>
                <li><strong>Wrap tortillas:</strong> Place 4-5 tortillas inside the damp towel</li>
                <li><strong>Microwave:</strong> Heat on high for 30 seconds</li>
                <li><strong>Check:</strong> Tortillas should be warm and steamy</li>
                <li><strong>Add time if needed:</strong> For more tortillas, add 15 seconds per 2-3 additional ones</li>
                <li><strong>Serve immediately:</strong> Tortillas will dry out quickly after microwaving</li>
              </ol>

              <div className="bg-sunset-50 border-l-4 border-sunset-500 p-5 mb-4">
                <p className="text-charcoal-800">
                  <strong>💡 Pro Tip:</strong> The damp towel is CRITICAL - it creates steam that keeps tortillas soft.
                  Never microwave tortillas without moisture or they'll become hard and brittle.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-2">Pros:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Fastest method (30 seconds)</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Multiple tortillas at once</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Very convenient</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">Cons:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Can make tortillas rubbery</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> No char or authentic flavor</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> They dry out quickly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Method 3: Oven */}
          <section id="oven" className="mb-12 scroll-mt-8">
            <div className="bg-charcoal-700 text-white py-4 px-6 rounded-t-lg">
              <h2 className="text-3xl font-bold">Method #3: Oven (Best for Large Batches)</h2>
              <p className="mt-2 text-cream-200"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /> - Perfect for parties</p>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-lg border-2 border-charcoal-700">
              <p className="text-lg text-charcoal-700 mb-6">
                Ideal for warming <strong>large quantities</strong> when entertaining or meal prepping.
              </p>

              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Instructions:</h3>
              <ol className="space-y-3 text-charcoal-700 mb-6 list-decimal list-inside">
                <li>Preheat oven to 350°F (175°C)</li>
                <li>Stack 10-15 tortillas and wrap tightly in aluminum foil</li>
                <li>Sprinkle a few drops of water before wrapping (optional)</li>
                <li>Heat for 10-15 minutes until warmed throughout</li>
                <li>Keep wrapped until serving to retain heat</li>
              </ol>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-2">Pros:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Handles large batches easily</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Even, consistent heating</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Set and forget</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">Cons:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Takes 10-15 minutes</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Uses oven energy</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> No char marks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Quick Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border border-charcoal-700 px-4 py-3 text-left">Method</th>
                    <th className="border border-charcoal-700 px-4 py-3 text-left">Time</th>
                    <th className="border border-charcoal-700 px-4 py-3 text-left">Rating</th>
                    <th className="border border-charcoal-700 px-4 py-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-bold">Stovetop</td>
                    <td className="border px-4 py-3">1 min each</td>
                    <td className="border px-4 py-3"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /></td>
                    <td className="border px-4 py-3">Authentic flavor</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-bold">Microwave</td>
                    <td className="border px-4 py-3">30 sec</td>
                    <td className="border px-4 py-3"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /></td>
                    <td className="border px-4 py-3">Speed</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-bold">Oven</td>
                    <td className="border px-4 py-3">10-15 min</td>
                    <td className="border px-4 py-3"><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /><StarIcon className="inline-block text-sunset-500" size={16} /></td>
                    <td className="border px-4 py-3">Large batches</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Final Verdict</h2>
            <p className="text-lg leading-relaxed mb-4">
              For the best results, use the stovetop method. For convenience, microwave with a damp towel. For parties, use the oven.
            </p>
            <p className="text-lg leading-relaxed">
              Shop our{' '}
              <Link href="/products/flour-tortillas" className="text-sunset-400 hover:text-sunset-300 font-medium underline">
                premium flour tortillas
              </Link>{' '}
              and{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-400 hover:text-sunset-300 font-medium underline">
                authentic corn tortillas
              </Link>.
            </p>
          </section>

          {/* Related */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/guides/how-to-store-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-charcoal-950 mb-2">How to Store Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">Keep your tortillas fresh for weeks</p>
              </Link>
              <Link href="/guides/corn-vs-flour-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-charcoal-950 mb-2">Corn vs Flour →</h3>
                <p className="text-charcoal-700 text-sm">Complete comparison guide</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
