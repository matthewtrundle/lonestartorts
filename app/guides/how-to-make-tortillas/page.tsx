import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Make Fresh Tortillas',
  description: 'Learn how to make fresh flour and corn tortillas from scratch. Step-by-step instructions, ingredients, techniques, and tips for homemade tortillas.',
  keywords: 'how to make tortillas, homemade tortillas, make tortillas from scratch, tortilla recipe, fresh tortillas, corn tortillas recipe, flour tortillas recipe',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/how-to-make-tortillas',
  },
  openGraph: {
    title: 'How to Make Fresh Tortillas',
    description: 'Master the art of making fresh tortillas from scratch with our comprehensive guide.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it hard to make tortillas from scratch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No! While it takes practice to perfect the technique, basic tortillas are surprisingly easy to make. Flour tortillas require just 4-5 ingredients and about 30 minutes. The key is getting the dough consistency right and using proper heat when cooking.'
      }
    },
    {
      '@type': 'Question',
      name: 'What equipment do I need to make tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For basic tortillas, you need: a mixing bowl, rolling pin (or tortilla press for corn), and a comal or cast-iron skillet. A tortilla press is recommended for corn tortillas but not required. No special equipment is necessary for flour tortillas.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I make tortillas without a press?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Flour tortillas are traditionally rolled with a rolling pin. For corn tortillas, you can use a heavy skillet or pie plate to press them between sheets of plastic or parchment paper. A tortilla press makes corn tortillas easier but is not required.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Make Fresh Tortillas at Home',
  description: 'Complete guide to making fresh flour and corn tortillas from scratch with step-by-step instructions.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function HowToMakeTortillasPage() {
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
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">
              ← Back to Guides
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              How to Make Fresh Tortillas at Home
            </h1>
            <p className="text-cream-300 mt-4 text-lg">
              Master the art of making homemade flour and corn tortillas from scratch
            </p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-how-to-make-tortillas.webp"
              alt="Hands making fresh tortillas with traditional press"
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
              <strong>Flour tortillas:</strong> Mix 3 cups flour, 1 tsp salt, 1 tsp baking powder, 1/3 cup lard/shortening, and 1 cup warm water. Knead, rest 30 minutes, roll into thin circles, and cook 30-60 seconds per side on a hot griddle. <strong>Corn tortillas:</strong> Mix 2 cups masa harina with 1.5 cups warm water and a pinch of salt. Press into thin disks and cook 1 minute per side.
            </p>
          </div>

          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Why Make Tortillas at Home?</h2>
            <p className="text-charcoal-800 leading-relaxed mb-4">
              There's something magical about fresh, warm tortillas straight from your own kitchen. While high-quality <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline">store-bought tortillas</Link> are convenient and delicious, making tortillas from scratch is a rewarding skill that connects you to centuries of tradition. Fresh homemade tortillas have unbeatable flavor, perfect texture, and that incomparable aroma that fills your kitchen.
            </p>
            <p className="text-charcoal-800 leading-relaxed">
              Whether you're making flour tortillas for breakfast tacos or corn tortillas for authentic street tacos, the process is simpler than you might think. This guide walks you through both methods step-by-step.
            </p>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Making Flour Tortillas</h2>

            <h3 className="text-2xl font-semibold text-charcoal-950 mb-4">Ingredients</h3>
            <ul className="list-disc pl-6 text-charcoal-800 mb-6 space-y-2">
              <li>3 cups all-purpose flour</li>
              <li>1 teaspoon salt</li>
              <li>1 teaspoon baking powder</li>
              <li>1/3 cup lard or vegetable shortening (lard is traditional)</li>
              <li>1 cup warm water</li>
            </ul>

            <h3 className="text-2xl font-semibold text-charcoal-950 mb-4">Instructions</h3>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-4">
              <li><strong>Mix dry ingredients:</strong> Whisk together flour, salt, and baking powder in a large bowl.</li>
              <li><strong>Cut in fat:</strong> Add lard or shortening and work it into the flour with your fingers until the mixture resembles coarse crumbs. This creates the flaky texture.</li>
              <li><strong>Add water:</strong> Gradually add warm water, mixing until a shaggy dough forms. It should be slightly sticky but not wet.</li>
              <li><strong>Knead:</strong> Turn dough onto a lightly floured surface and knead for 2-3 minutes until smooth and elastic. Don't over-knead.</li>
              <li><strong>Rest:</strong> Cover with a damp towel and let rest for at least 30 minutes (up to 2 hours). This relaxes the gluten and makes rolling easier.</li>
              <li><strong>Divide:</strong> Divide dough into 12-16 equal pieces and roll each into a ball.</li>
              <li><strong>Roll out:</strong> On a lightly floured surface, roll each ball into a thin, round tortilla (about 8 inches diameter). Roll from center outward, rotating as you go.</li>
              <li><strong>Cook:</strong> Heat a comal or cast-iron skillet over medium-high heat. Cook each tortilla for 30-60 seconds per side until bubbles form and brown spots appear. Don't overcook or they'll be dry.</li>
              <li><strong>Keep warm:</strong> Stack cooked tortillas in a clean towel to keep them soft and pliable.</li>
            </ol>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Making Corn Tortillas</h2>

            <h3 className="text-2xl font-semibold text-charcoal-950 mb-4">Ingredients</h3>
            <ul className="list-disc pl-6 text-charcoal-800 mb-6 space-y-2">
              <li>2 cups masa harina (nixtamalized corn flour, not cornmeal)</li>
              <li>1.5 cups warm water</li>
              <li>1/2 teaspoon salt</li>
            </ul>

            <h3 className="text-2xl font-semibold text-charcoal-950 mb-4">Instructions</h3>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-4">
              <li><strong>Mix dough:</strong> Combine masa harina and salt in a bowl. Add warm water gradually, mixing with your hands until dough forms. It should feel like soft Play-Doh—not dry, not sticky.</li>
              <li><strong>Test consistency:</strong> Roll a small ball. If it cracks around the edges when pressed, add more water (1 tablespoon at a time). The dough should be smooth and moist.</li>
              <li><strong>Rest:</strong> Cover and let rest for 15-30 minutes. This hydrates the masa fully.</li>
              <li><strong>Divide:</strong> Divide into 12-16 golf ball-sized portions.</li>
              <li><strong>Press:</strong> Line a tortilla press with plastic (cut-up ziplock bags work great). Place a dough ball in center, cover with plastic, and press firmly. No press? Use a heavy skillet or pie plate.</li>
              <li><strong>Cook:</strong> Heat a comal or cast-iron skillet over medium-high heat. Peel tortilla from plastic and cook for about 1 minute per side. Tortilla should puff up slightly and have brown spots.</li>
              <li><strong>Keep warm:</strong> Stack in a towel immediately to keep soft.</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Pro Tips for Perfect Tortillas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Flour Tortillas</h3>
                <ul className="text-charcoal-800 space-y-2 text-sm">
                  <li>• Use lard for authentic flavor and texture</li>
                  <li>• Don't skip the resting time—it makes rolling much easier</li>
                  <li>• Roll thin for soft, pliable tortillas</li>
                  <li>• High heat is key—tortillas should cook quickly</li>
                  <li>• Bubbles are good—they create layers</li>
                </ul>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Corn Tortillas</h3>
                <ul className="text-charcoal-800 space-y-2 text-sm">
                  <li>• Use masa harina (not cornmeal or polenta)</li>
                  <li>• Dough should be soft and pliable, not crumbly</li>
                  <li>• Use plastic sheets for pressing to prevent sticking</li>
                  <li>• Cook on medium-high heat for best texture</li>
                  <li>• Fresh corn tortillas are best eaten immediately</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-sunset-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common Problems & Solutions</h2>
            <div className="space-y-4 text-charcoal-800">
              <div>
                <p className="font-semibold mb-1">Problem: Flour tortillas are tough and chewy</p>
                <p className="text-sm">Solution: You're over-kneading the dough or not letting it rest long enough. Knead just until smooth (2-3 minutes) and rest at least 30 minutes.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Problem: Flour tortillas won't roll thin</p>
                <p className="text-sm">Solution: The dough needs more rest time. Cover and let sit another 15-30 minutes to relax the gluten.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Problem: Corn tortillas crack when folded</p>
                <p className="text-sm">Solution: The dough is too dry. Add more water 1 tablespoon at a time until the consistency is right. Also, stack cooked tortillas in a towel to keep them steamy and pliable.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Problem: Tortillas stick to the press</p>
                <p className="text-sm">Solution: Always use plastic sheets (cut ziplock bags work perfectly). Never press directly on metal or wood.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Is it hard to make tortillas from scratch?</h3>
                <p className="text-charcoal-800">
                  Not at all! While it takes practice to perfect your technique, basic tortillas are surprisingly easy. Flour tortillas require just 4-5 simple ingredients and about 30 minutes start to finish. The key is getting the dough consistency right and using proper heat when cooking. Your first batch might not be perfectly round, but they'll still taste amazing!
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">What equipment do I need?</h3>
                <p className="text-charcoal-800">
                  For flour tortillas: mixing bowl, rolling pin, and comal or cast-iron skillet. For corn tortillas: same equipment plus a tortilla press is highly recommended (though you can press with a heavy skillet). That's it! No fancy or expensive equipment required.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">How do I store homemade tortillas?</h3>
                <p className="text-charcoal-800">
                  Let tortillas cool completely, then store in an airtight container or ziplock bag. They'll keep at room temperature for 2-3 days, refrigerated for up to a week, or frozen for several months. Always reheat before serving—see our <Link href="/guides/how-to-reheat-tortillas" className="text-sunset-600 hover:underline">reheating guide</Link> for best methods.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Prefer Ready-Made Quality Tortillas?</h2>
            <p className="text-cream-100 mb-6">
              While homemade tortillas are wonderful, sometimes convenience wins. Our authentic H-E-B® tortillas deliver restaurant-quality taste without the work.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Shop Tortillas
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
