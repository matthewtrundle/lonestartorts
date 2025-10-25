import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BurritoIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'How to Store Tortillas: Complete Storage Guide | Lonestar Tortillas',
  description: 'Learn the best ways to store tortillas for maximum freshness. Room temperature, refrigeration, freezing methods, and shelf life explained. Keep your H-E-B® tortillas fresh for weeks!',
  keywords: 'how to store tortillas, storing tortillas, can you freeze tortillas, tortilla shelf life, how long do tortillas last, keep tortillas fresh, tortilla storage tips',
  openGraph: {
    title: 'How to Store Tortillas: Complete Storage Guide',
    description: 'Expert tips for storing corn and flour tortillas. Learn the best methods to keep your tortillas fresh for weeks.',
    type: 'article',
  },
}

// FAQ Schema for voice search
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you store tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Store unopened tortillas at room temperature in a cool, dry pantry for up to 3-4 weeks. After opening, keep them in an airtight container or resealable bag and consume within 7-10 days for best quality. You can also refrigerate or freeze them for longer storage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you freeze tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Tortillas freeze excellently for up to 6 months. Place parchment paper between each tortilla, store in a freezer bag, and remove as much air as possible. Thaw in the refrigerator overnight or at room temperature for 30 minutes before using.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do tortillas last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shelf-stable tortillas last 3-4 weeks unopened at room temperature. Once opened, they stay fresh for 7-10 days in a sealed container. Refrigerated tortillas last 2-3 weeks, and frozen tortillas remain good for up to 6 months.',
      },
    },
  ],
}

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Store Tortillas: Complete Storage Guide',
  description: 'Expert tips and methods for storing corn and flour tortillas to maintain maximum freshness.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-17',
  dateModified: '2025-10-17',
}

export default function HowToStoreTortillasPage() {
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
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              How to Store Tortillas: Complete Guide
            </h1>
            <p className="text-cream-300 mt-4 text-lg">
              Keep your tortillas fresh for weeks with these expert storage tips
            </p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-how-to-store-tortillas.webp"
              alt="Properly stored tortillas in airtight containers"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Store unopened tortillas at room temperature</strong> in a cool, dry pantry for 3-4 weeks.
              After opening, keep in an airtight container or resealable bag for 7-10 days. For longer storage,
              refrigerate (2-3 weeks) or freeze (up to 6 months). Shelf-stable H-E-B® tortillas don't require
              refrigeration until opened.
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Whether you've just received your{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium">
                authentic H-E-B® tortillas
              </Link>{' '}
              or picked up a pack from the store, proper storage is key to maintaining their fresh taste and soft texture.
              This comprehensive guide covers everything you need to know about storing corn tortillas, flour tortillas,
              and specialty varieties.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-masa-50 p-6 rounded-lg mb-12 border border-masa-200">
            <h2 className="text-xl font-bold text-charcoal-950 mb-4">In This Guide:</h2>
            <ul className="space-y-2 text-charcoal-700">
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#unopened" className="text-sunset-600 hover:underline">Storing Unopened Tortillas</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#opened" className="text-sunset-600 hover:underline">Storing Opened Tortillas</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#refrigerator" className="text-sunset-600 hover:underline">Refrigeration Method</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#freezer" className="text-sunset-600 hover:underline">Freezing Tortillas</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#shelf-life" className="text-sunset-600 hover:underline">Shelf Life Guide</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#signs-bad" className="text-sunset-600 hover:underline">How to Tell If Tortillas Are Bad</a></li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <a href="#tips" className="text-sunset-600 hover:underline">Pro Storage Tips</a></li>
            </ul>
          </nav>

          {/* Section 1: Unopened Tortillas */}
          <section id="unopened" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Storing Unopened Tortillas
            </h2>

            <p className="text-lg text-charcoal-700 mb-4 leading-relaxed">
              Shelf-stable tortillas like H-E-B® brand are designed to stay fresh at room temperature until you're ready to use them.
            </p>

            <div className="bg-cream-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Best Practices:</h3>
              <ul className="space-y-3 text-charcoal-700">
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Cool, dry pantry:</strong> Store in a pantry or cupboard away from heat sources and direct sunlight</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Stable temperature:</strong> Aim for 60-75°F (15-24°C) for optimal freshness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Original packaging:</strong> Keep in the original sealed package until you're ready to use them</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">✓</span>
                  <span><strong>Away from moisture:</strong> Avoid storing near the sink, dishwasher, or humid areas</span>
                </li>
              </ul>
            </div>

            <p className="text-charcoal-700 mb-4">
              <strong>Shelf life:</strong> Unopened shelf-stable tortillas typically last <strong>3-4 weeks</strong> at room
              temperature. Always check the "best by" date on the package.
            </p>
          </section>

          {/* Section 2: Opened Tortillas */}
          <section id="opened" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Storing Opened Tortillas
            </h2>

            <p className="text-lg text-charcoal-700 mb-6 leading-relaxed">
              Once you open your tortilla package, proper resealing is crucial to prevent them from drying out or becoming stale.
            </p>

            <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Room Temperature Storage (Opened)</h3>

            <div className="bg-sunset-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-charcoal-950 mb-3">Step-by-Step Method:</h4>
              <ol className="space-y-3 text-charcoal-700 list-decimal list-inside">
                <li>
                  <strong>Reseal immediately:</strong> After removing tortillas, squeeze out as much air as possible from the original bag
                </li>
                <li>
                  <strong>Use clips or seals:</strong> Secure the bag with a chip clip, rubber band, or twist tie
                </li>
                <li>
                  <strong>Double protection:</strong> For extra freshness, place the original bag inside a zip-top freezer bag
                </li>
                <li>
                  <strong>Store in airtight container:</strong> Alternatively, transfer to an airtight container or bread box
                </li>
              </ol>
            </div>

            <p className="text-charcoal-700 mb-4">
              <strong>Shelf life:</strong> Opened tortillas stored at room temperature stay fresh for <strong>7-10 days</strong>
              when properly sealed.
            </p>

            <div className="bg-masa-100 border-l-4 border-masa-600 p-5 mb-6">
              <p className="text-charcoal-800">
                <strong>💡 Pro Tip:</strong> Keep a few tortillas at room temperature for immediate use, and refrigerate
                or freeze the rest to extend their shelf life.
              </p>
            </div>
          </section>

          {/* Section 3: Refrigeration */}
          <section id="refrigerator" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Refrigerating Tortillas
            </h2>

            <p className="text-lg text-charcoal-700 mb-4 leading-relaxed">
              Refrigeration extends tortilla shelf life significantly, especially in hot or humid climates.
            </p>

            <h3 className="text-xl font-bold text-charcoal-950 mb-3">When to Refrigerate:</h3>
            <ul className="space-y-2 text-charcoal-700 mb-6 ml-6">
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> After opening the package (optional but recommended)</li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> If you won't use them within 7-10 days</li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> In hot weather or humid environments</li>
              <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> For homemade tortillas with no preservatives</li>
            </ul>

            <div className="bg-cream-100 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-charcoal-950 mb-3">Refrigeration Method:</h4>
              <ul className="space-y-3 text-charcoal-700">
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">1.</span>
                  <span><strong>Seal tightly:</strong> Ensure tortillas are in an airtight container or sealed bag</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">2.</span>
                  <span><strong>Remove excess air:</strong> Squeeze out air to prevent condensation and sogginess</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">3.</span>
                  <span><strong>Store in crisper drawer:</strong> Place in the vegetable crisper for consistent temperature</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 font-bold mr-2">4.</span>
                  <span><strong>Warm before serving:</strong> Let tortillas come to room temperature or warm them before eating for best texture</span>
                </li>
              </ul>
            </div>

            <p className="text-charcoal-700 mb-4">
              <strong>Shelf life:</strong> Refrigerated tortillas last <strong>2-3 weeks</strong> past opening when properly stored.
            </p>

            <p className="text-charcoal-700">
              <strong>Note:</strong> Refrigeration can make tortillas slightly firmer. Simply{' '}
              <Link href="/guides/how-to-reheat-tortillas" className="text-sunset-600 hover:text-sunset-700 font-medium">
                warm them up
              </Link>{' '}
              before use to restore their soft, pliable texture.
            </p>
          </section>

          {/* Section 4: Freezing */}
          <section id="freezer" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Freezing Tortillas (Best for Long-Term Storage)
            </h2>

            <p className="text-lg text-charcoal-700 mb-6 leading-relaxed">
              Freezing is the <strong>best method for long-term tortilla storage</strong>. Tortillas freeze exceptionally
              well and maintain their quality for months.
            </p>

            <div className="bg-sunset-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">How to Freeze Tortillas:</h3>

              <h4 className="font-bold text-charcoal-900 mb-3">Method 1: Whole Stack</h4>
              <ol className="space-y-2 text-charcoal-700 mb-6 list-decimal list-inside">
                <li>Keep tortillas in their original package or stack them together</li>
                <li>Place the stack in a freezer-safe zip-top bag</li>
                <li>Remove as much air as possible before sealing</li>
                <li>Label with the date and tortilla type</li>
                <li>Lay flat in the freezer for even freezing</li>
              </ol>

              <h4 className="font-bold text-charcoal-900 mb-3">Method 2: Individual Separation (Recommended)</h4>
              <ol className="space-y-2 text-charcoal-700 list-decimal list-inside">
                <li>Place a small square of parchment paper between each tortilla</li>
                <li>This prevents them from sticking together</li>
                <li>You can remove individual tortillas as needed without thawing the entire batch</li>
                <li>Place separated stack in a freezer bag and seal</li>
                <li>Store flat in the freezer</li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-charcoal-950 mb-4 mt-8">How to Thaw Frozen Tortillas:</h3>

            <div className="bg-masa-100 p-6 rounded-lg mb-6">
              <ul className="space-y-4 text-charcoal-700">
                <li>
                  <strong>Refrigerator method (best):</strong> Transfer tortillas to the fridge 8-12 hours before use
                  (overnight works perfectly)
                </li>
                <li>
                  <strong>Room temperature method:</strong> Let sit at room temperature for 30-45 minutes until pliable
                </li>
                <li>
                  <strong>Quick method:</strong> Microwave frozen tortilla for 15-20 seconds on a damp paper towel
                </li>
                <li>
                  <strong>Direct cooking:</strong> Some tortillas can go straight from freezer to hot skillet
                  (add 30 seconds to cooking time)
                </li>
              </ul>
            </div>

            <p className="text-charcoal-700 mb-4">
              <strong>Shelf life:</strong> Frozen tortillas maintain excellent quality for <strong>up to 6 months</strong>.
              They're safe to eat beyond that but may experience some texture changes.
            </p>
          </section>

          {/* Section 5: Shelf Life Guide */}
          <section id="shelf-life" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Tortilla Shelf Life Guide
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white shadow-lg">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border border-charcoal-700 px-6 py-4 text-left">Storage Method</th>
                    <th className="border border-charcoal-700 px-6 py-4 text-left">Unopened</th>
                    <th className="border border-charcoal-700 px-6 py-4 text-left">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-cream-50">
                    <td className="border border-charcoal-200 px-6 py-4 font-medium">Room Temperature (Pantry)</td>
                    <td className="border border-charcoal-200 px-6 py-4">3-4 weeks</td>
                    <td className="border border-charcoal-200 px-6 py-4">7-10 days</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border border-charcoal-200 px-6 py-4 font-medium">Refrigerator</td>
                    <td className="border border-charcoal-200 px-6 py-4">4-6 weeks</td>
                    <td className="border border-charcoal-200 px-6 py-4">2-3 weeks</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border border-charcoal-200 px-6 py-4 font-medium">Freezer</td>
                    <td className="border border-charcoal-200 px-6 py-4">6-8 months</td>
                    <td className="border border-charcoal-200 px-6 py-4">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-700 mb-4">
              <strong>Important:</strong> These are general guidelines. Always check the "best by" date on your package and
              inspect tortillas for freshness before use.
            </p>
          </section>

          {/* Section 6: Signs of Bad Tortillas */}
          <section id="signs-bad" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              How to Tell If Tortillas Have Gone Bad
            </h2>

            <p className="text-lg text-charcoal-700 mb-6 leading-relaxed">
              Knowing when to discard tortillas is important for food safety. Here are the telltale signs:
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-3">⚠️ Throw Away Tortillas If You See:</h3>
              <ul className="space-y-3 text-red-900">
                <li className="flex items-start">
                  <span className="font-bold mr-2">✗</span>
                  <span><strong>Mold:</strong> Green, black, white, or fuzzy spots (discard entire package)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">✗</span>
                  <span><strong>Sour smell:</strong> Off or fermented odor instead of fresh grain smell</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">✗</span>
                  <span><strong>Slimy texture:</strong> Sticky or wet surface (indicates bacterial growth)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">✗</span>
                  <span><strong>Discoloration:</strong> Dark spots or significant color changes</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">✗</span>
                  <span><strong>Extremely hard or brittle:</strong> Tortillas that crack and break easily</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="font-bold text-green-900 mb-3">✓ Still Good If You See:</h3>
              <ul className="space-y-2 text-green-900">
                <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Slight stiffness (can be remedied by warming)</li>
                <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> A few days past "best by" date (if properly stored)</li>
                <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Minor drying around edges (trim and use the rest)</li>
                <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Normal grain smell and appearance</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Pro Tips */}
          <section id="tips" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4 border-b-2 border-sunset-500 pb-2">
              Pro Storage Tips & Tricks
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-sunset-50 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-lg"><TacoIcon className="inline-block text-sunset-600" size={20} /> For Corn Tortillas</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> More delicate than flour - handle gently</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Benefit more from refrigeration in humid climates</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Wrap in a damp towel when warming to prevent cracking</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Freeze especially well with parchment separation</li>
                </ul>
              </div>

              <div className="bg-masa-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-3 text-lg"><BurritoIcon className="inline-block text-masa-600" size={20} /> For Flour Tortillas</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> More durable and forgiving than corn</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Can tolerate room temperature storage longer</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Stack well without sticking together</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Excellent candidates for batch freezing</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-charcoal-950 mb-4">Additional Expert Tips:</h3>
            <ul className="space-y-3 text-charcoal-700 mb-6">
              <li className="flex items-start">
                <span className="text-sunset-500 font-bold mr-2 mt-1">💡</span>
                <span><strong>Buy in bulk and freeze:</strong> Save money by buying larger quantities and freezing portions</span>
              </li>
              <li className="flex items-start">
                <span className="text-sunset-500 font-bold mr-2 mt-1">💡</span>
                <span><strong>Label everything:</strong> Write storage date on bags so you know when to use them by</span>
              </li>
              <li className="flex items-start">
                <span className="text-sunset-500 font-bold mr-2 mt-1">💡</span>
                <span><strong>First in, first out:</strong> Use older packages before newer ones</span>
              </li>
              <li className="flex items-start">
                <span className="text-sunset-500 font-bold mr-2 mt-1">💡</span>
                <span><strong>Avoid temperature fluctuations:</strong> Don't repeatedly move tortillas between pantry, fridge, and freezer</span>
              </li>
              <li className="flex items-start">
                <span className="text-sunset-500 font-bold mr-2 mt-1">💡</span>
                <span><strong>Keep away from strong odors:</strong> Tortillas can absorb flavors from pungent foods like onions</span>
              </li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Bottom Line</h2>
            <p className="text-lg leading-relaxed mb-4">
              Properly stored tortillas can stay fresh and delicious for weeks or even months. The key is protecting
              them from air, moisture, and temperature fluctuations. Whether you choose room temperature, refrigeration,
              or freezing depends on how quickly you'll use them and your local climate.
            </p>
            <p className="text-lg leading-relaxed">
              For the freshest tortillas that are already optimized for shelf-stable storage, shop our collection of
              authentic{' '}
              <Link href="/products/flour-tortillas" className="text-sunset-400 hover:text-sunset-300 font-medium underline">
                H-E-B® flour tortillas
              </Link>{' '}
              and{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-400 hover:text-sunset-300 font-medium underline">
                corn tortillas
              </Link>{' '}
              delivered nationwide.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do H-E-B® tortillas need to be refrigerated?</h3>
                <p className="text-charcoal-700">
                  No, shelf-stable H-E-B® tortillas don't require refrigeration until opened. Once opened, you can
                  keep them at room temperature for 7-10 days or refrigerate for 2-3 weeks.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can you eat tortillas past the expiration date?</h3>
                <p className="text-charcoal-700">
                  The "best by" date is a quality indicator, not a safety date. If stored properly and showing no signs
                  of spoilage (mold, odor, slime), tortillas can be safe to eat a few days past this date. Always inspect
                  before consuming.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Why do my tortillas get hard?</h3>
                <p className="text-charcoal-700">
                  Tortillas harden when they lose moisture due to air exposure. Always reseal the package tightly after
                  opening. If they've become hard, you can soften them by wrapping in a damp towel and microwaving for
                  15-20 seconds or steaming briefly.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Is it better to freeze or refrigerate tortillas?</h3>
                <p className="text-charcoal-700">
                  Freezing is better for long-term storage (6+ months) while refrigeration is ideal if you'll use them
                  within 2-3 weeks. Freezing doesn't affect quality if done properly with parchment paper separation.
                </p>
              </div>
            </div>
          </section>

          {/* Related Guides */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                href="/guides/corn-vs-flour-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Corn vs Flour Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Complete comparison guide to help you choose the right tortilla
                </p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
