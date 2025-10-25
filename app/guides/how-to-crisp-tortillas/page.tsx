import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Crisp & Toast Tortillas | Complete Guide | Lonestar Tortillas',
  description: 'Learn the best methods to crisp and toast tortillas for tostadas, tortilla chips, and crunchy tacos. Oven, stovetop, and air fryer methods explained.',
  keywords: 'how to crisp tortillas, how to toast tortillas, crispy tortillas, tostadas, tortilla chips, crunchy taco shells, fried tortillas',
  openGraph: {
    title: 'How to Crisp & Toast Tortillas | Complete Guide',
    description: 'Master every method for crisping and toasting tortillas. From tostadas to chips, learn the best techniques.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best way to crisp tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The oven method is easiest and most consistent. Brush tortillas with oil, bake at 400°F for 5-7 minutes until golden and crispy. For tortilla chips, cut before baking. For tostadas, bake whole tortillas flat. The stovetop method (dry skillet over medium-high heat) works great for small batches.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you crisp tortillas without oil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Toast tortillas in a dry skillet or directly over a gas flame for a healthier option. They won\'t be as crispy as fried or oiled versions, but they\'ll still be deliciously toasted with charred spots. Great for tacos and quesadillas.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do you make tortillas crispy for tacos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For crunchy taco shells, fold tortillas in half and fry in 1/2 inch of oil at 350°F for 1-2 minutes until golden, holding the fold open with tongs. Alternatively, drape tortillas over oven racks and bake at 375°F for 7-10 minutes. Both create perfect taco shells.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Crisp & Toast Tortillas',
  description: 'Complete guide to crisping and toasting tortillas using multiple methods for different results.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function HowToCrispTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">How to Crisp & Toast Tortillas</h1>
            <p className="text-cream-300 mt-4 text-lg">Master every method for perfectly crispy or toasted tortillas</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-how-to-crisp-tortillas.webp"
              alt="Crispy golden tortillas in a cast iron skillet"
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
              <strong>For crispy tortillas:</strong> Brush with oil and bake at 400°F for 5-7 minutes. <strong>For toasted tortillas:</strong> Heat in a dry skillet over medium-high heat for 20-30 seconds per side until charred spots appear. <strong>For taco shells:</strong> Fold and fry in 350°F oil for 1-2 minutes.
            </p>
          </div>

          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-charcoal-800 leading-relaxed">
              Whether you're making tostadas, homemade tortilla chips, crunchy taco shells, or just want to add texture to soft tacos, knowing how to crisp and toast tortillas opens up endless possibilities. Different methods yield different results, so let's explore all your options.
            </p>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Method 1: Oven Crisping (Best for Tostadas & Chips)</h2>
            <p className="text-charcoal-800 mb-4"><strong>Best for:</strong> Tortilla chips, tostadas, large batches</p>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-3">
              <li>Preheat oven to 400°F</li>
              <li>Brush both sides of tortillas lightly with oil or spray with cooking spray</li>
              <li>For chips: Cut each tortilla into 6-8 wedges and arrange in single layer on baking sheet</li>
              <li>For tostadas: Leave tortillas whole</li>
              <li>Bake for 5-7 minutes, flipping halfway, until golden and crispy</li>
              <li>Season immediately with salt while still hot</li>
            </ol>
            <div className="bg-sunset-50 p-4 rounded mt-4">
              <p className="text-sm text-charcoal-800"><strong>Tip:</strong> For extra-crispy chips, bake at a lower temp (350°F) for longer (10-12 minutes). They'll be crispier and less likely to burn.</p>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Method 2: Stovetop Toasting (Best for Tacos)</h2>
            <p className="text-charcoal-800 mb-4"><strong>Best for:</strong> Soft tacos, quesadillas, adding flavor without frying</p>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-3">
              <li>Heat a dry cast-iron skillet or comal over medium-high heat</li>
              <li>Place tortilla flat in the hot skillet</li>
              <li>Cook for 20-30 seconds until you see charred spots and the tortilla puffs slightly</li>
              <li>Flip and cook another 20-30 seconds</li>
              <li>Remove and keep warm in a towel</li>
            </ol>
            <div className="bg-sunset-50 p-4 rounded mt-4">
              <p className="text-sm text-charcoal-800"><strong>Tip:</strong> Don't overcook or tortillas become stiff. You want them toasted but still pliable for folding.</p>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Method 3: Pan-Frying (Classic Crispy)</h2>
            <p className="text-charcoal-800 mb-4"><strong>Best for:</strong> Tostadas, ultra-crispy chips, authentic texture</p>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-3">
              <li>Heat 1/4 inch of oil in a large skillet to 350°F</li>
              <li>Carefully add one tortilla at a time</li>
              <li>Fry for 30-60 seconds per side until golden and crispy</li>
              <li>Remove with tongs and drain on paper towels</li>
              <li>Season with salt immediately</li>
            </ol>
            <div className="bg-sunset-50 p-4 rounded mt-4">
              <p className="text-sm text-charcoal-800"><strong>Warning:</strong> Oil must be hot enough (test with a small piece of tortilla—it should sizzle immediately). Too cool and tortillas absorb oil and get greasy.</p>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Method 4: Making Taco Shells</h2>
            <p className="text-charcoal-800 mb-4"><strong>Best for:</strong> Crunchy tacos, taco salad shells</p>

            <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">Oven Method:</h3>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-2 mb-4">
              <li>Preheat oven to 375°F</li>
              <li>Brush tortillas with oil on both sides</li>
              <li>Drape tortillas over the bars of your oven rack (or use a taco shell rack)</li>
              <li>Bake for 7-10 minutes until crispy and holding shape</li>
              <li>Let cool 1 minute before removing—they'll firm up as they cool</li>
            </ol>

            <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">Frying Method:</h3>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-2">
              <li>Heat 1/2 inch oil in skillet to 350°F</li>
              <li>Fold tortilla in half and hold open with tongs</li>
              <li>Fry for 1-2 minutes until golden, keeping the fold open</li>
              <li>Flip and fry other side</li>
              <li>Drain on paper towels</li>
            </ol>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Method 5: Air Fryer (Healthier Crispy)</h2>
            <p className="text-charcoal-800 mb-4"><strong>Best for:</strong> Chips and tostadas with less oil</p>
            <ol className="list-decimal pl-6 text-charcoal-800 space-y-3">
              <li>Preheat air fryer to 350°F</li>
              <li>Lightly spray or brush tortillas with oil</li>
              <li>Arrange in a single layer in basket (work in batches)</li>
              <li>Air fry for 5-7 minutes, shaking basket halfway through</li>
              <li>Season immediately while hot</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Troubleshooting Guide</h2>
            <div className="space-y-4">
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <p className="font-semibold text-charcoal-950 mb-2">Problem: Tortillas are chewy instead of crispy</p>
                <p className="text-charcoal-800 text-sm">Solution: They need more cooking time or higher heat. Also ensure you're using enough oil for frying methods.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <p className="font-semibold text-charcoal-950 mb-2">Problem: Tortillas burn before getting crispy</p>
                <p className="text-charcoal-800 text-sm">Solution: Lower your heat. Slow and steady wins the race—lower temp for longer time produces the crispiest results.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <p className="font-semibold text-charcoal-950 mb-2">Problem: Taco shells won't hold shape</p>
                <p className="text-charcoal-800 text-sm">Solution: You're removing them too early. Let them cool 1-2 minutes—they firm up as they cool. Also make sure oil is hot enough when frying.</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Start with Quality Tortillas</h2>
            <p className="text-cream-100 mb-6">
              The best crispy tortillas start with quality <Link href="/products/corn-tortillas" className="text-sunset-400 hover:underline">corn</Link> or <Link href="/products/flour-tortillas" className="text-sunset-400 hover:underline">flour tortillas</Link>. Get authentic H-E-B® tortillas delivered.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop Tortillas
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
