import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Mission Tortillas: A San Antonio Legacy | Lonestar Tortillas',
  description: 'Discover the story of Mission Foods, the San Antonio-born tortilla company that became a global brand. Learn why Mission tortillas are trusted by Texans and where to buy them online.',
  keywords: 'Mission tortillas, Mission Foods history, San Antonio tortillas, where to buy Mission tortillas, Mission soft taco tortillas, Mission corn tortillas, Texas tortilla brands',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/mission-tortillas-san-antonio',
  },
  openGraph: {
    title: 'Mission Tortillas: A San Antonio Legacy',
    description: 'The story of how Mission Foods grew from a San Antonio startup to a global tortilla leader.',
    type: 'article',
    images: ['/images/blog/mission-tortillas-hero.webp'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mission Tortillas: A San Antonio Legacy',
  description: 'The history and heritage of Mission Foods, from its San Antonio origins to global success.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lonestartortillas.com/logo.png'
    }
  },
  datePublished: '2026-02-03',
  dateModified: '2026-02-03',
  articleSection: 'Brand Story',
  mainEntityOfPage: 'https://lonestartortillas.com/blog/mission-tortillas-san-antonio',
};

export default function MissionTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Mission Tortillas' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Brand Story</span>
              <span>•</span>
              <span>February 3, 2026</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Mission Tortillas: A San Antonio Legacy</h1>
            <p className="text-cream-300 mt-4 text-lg">How a Texas startup became the world&apos;s largest tortilla manufacturer</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2026-02-03" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800 italic">
                &quot;From a single tortilla machine in San Antonio to 20+ factories across four continents, Mission Foods represents the American dream built on Mexican heritage.&quot;
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Birth of a Tortilla Empire</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  In 1949, San Antonio was already a city with deep Mexican roots. The aroma of handmade tortillas wafted through the streets of the West Side, where generations of families had been making tortillas the traditional way—by hand, on a comal, one at a time.
                </p>
                <p>
                  Roberto Gonzalez Barrera saw an opportunity. An ambitious businessman from Mexico, he recognized that as Texas&apos;s population grew, the demand for tortillas would outpace what traditional methods could supply. The challenge was scaling production without sacrificing the quality that Texans expected.
                </p>
                <p>
                  The solution came in the form of industrial tortilla-making equipment. Gonzalez invested in machinery that could produce tortillas faster while maintaining consistency. He named his company Mission Foods—a nod to the Spanish missions that had defined San Antonio&apos;s history and character.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The San Antonio Connection</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  San Antonio wasn&apos;t just a convenient location—it was the perfect birthplace for a tortilla company. The city sits at the crossroads of Mexican and American culture, with a population that knew exactly what a good tortilla should taste like.
                </p>
                <p>
                  The early years were spent perfecting recipes that could satisfy San Antonio&apos;s discerning palates. If a tortilla could succeed here—in a city where homemade tortillas were the standard—it could succeed anywhere.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Why San Antonio?</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li><strong>Heritage:</strong> One of America&apos;s oldest Mexican-American communities</li>
                    <li><strong>Expertise:</strong> Generations of tortilla-making knowledge</li>
                    <li><strong>Market:</strong> High demand for quality tortillas</li>
                    <li><strong>Location:</strong> Strategic access to Mexican ingredients and U.S. markets</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">From Local to Global</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  By the 1970s, Mission had outgrown San Antonio. The company expanded to other Texas cities, then across the United States, and eventually internationally. Today, Mission Foods (part of Gruma Corporation) operates over 20 plants on four continents.
                </p>
                <p>
                  But despite this global reach, the company has maintained its Texas identity. The headquarters remain in the Dallas-Fort Worth area, and the commitment to quality that satisfied San Antonio&apos;s original customers still drives production today.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Mission by the Numbers</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Founded:</strong> 1949 in San Antonio, Texas</li>
                  <li><strong>Production:</strong> 25+ million tortillas per day</li>
                  <li><strong>Countries:</strong> Products sold in 100+ countries</li>
                  <li><strong>Employees:</strong> 20,000+ worldwide</li>
                  <li><strong>Market Position:</strong> World&apos;s largest tortilla manufacturer</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">What Makes Mission Tortillas Special</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  In a market flooded with tortilla options, Mission has maintained its reputation through consistent quality and innovation.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Soft Taco Flour Tortillas</h3>
                <p>
                  Mission&apos;s flagship product—the Soft Taco Flour Tortilla—is what most Americans picture when they think of a flour tortilla. It&apos;s soft, pliable, and has that slightly sweet, wheaty flavor that pairs perfectly with everything from breakfast eggs to dinner fajitas.
                </p>
                <p>
                  The secret is in the texture: soft enough to fold without cracking, but sturdy enough to hold generous fillings. This balance took years to perfect and remains the standard other brands try to replicate.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">White Corn Tortillas</h3>
                <p>
                  Mission&apos;s corn tortillas stay true to tradition. Made with stone-ground corn and the ancient nixtamalization process, they deliver authentic flavor with the convenience of store-bought accessibility.
                </p>
                <p>
                  For those who want to make authentic street tacos at home without the hours of preparation, Mission corn tortillas deliver. They char beautifully on a comal and have that distinctive corn flavor that flour tortillas simply can&apos;t replicate.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Shop Mission Tortillas:</p>
                  <ul className="mt-2 space-y-1">
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">Mission Soft Taco Flour Tortillas (10 count) - $8</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">Mission White Corn Tortillas (24 count) - $8</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Mission vs. Other Texas Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Texas is blessed with several excellent tortilla brands. Here&apos;s how Mission fits into the landscape:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Mission vs. H-E-B</h3>
                <p>
                  H-E-B Bakery tortillas are made fresh daily and have that just-made texture. Mission tortillas are shelf-stable and consistent batch-to-batch. Choose H-E-B for special occasions and fresh flavor; choose Mission for reliable everyday use.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Verdict</h3>
                <p>
                  There&apos;s no &quot;better&quot;—just different use cases. Mission tortillas excel at:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consistency:</strong> Same quality every time</li>
                  <li><strong>Shelf life:</strong> Stock up without worrying about freshness</li>
                  <li><strong>Availability:</strong> Found nationwide (or shipped from us!)</li>
                  <li><strong>Value:</strong> Great quality at competitive prices</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Best Uses for Mission Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">

                <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Mission Soft Taco Flour</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Breakfast tacos</li>
                    <li>Fish tacos</li>
                    <li>Quesadillas</li>
                    <li>Soft shell tacos</li>
                    <li>Wraps and roll-ups</li>
                    <li>Kids&apos; lunches</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Mission White Corn</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Street tacos</li>
                    <li>Enchiladas</li>
                    <li>Tostadas (fried crispy)</li>
                    <li>Chilaquiles</li>
                    <li>Tacos dorados</li>
                    <li>Gluten-free options</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Where to Buy Mission Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Mission tortillas are available at most grocery stores nationwide. But if you want Texas-quality tortillas shipped directly to your door—whether you&apos;re an ex-pat Texan missing home or a foodie discovering Texas flavors—we&apos;ve got you covered.
                </p>

                <p>
                  At Lonestar Tortillas, we ship both Mission and H-E-B tortillas nationwide with FREE shipping on all orders. Stock up on your favorites and taste what Texas tortillas are all about.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Texas Tortilla Legacy Continues</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Mission Foods proves that Texas values—hard work, quality, and authenticity—can scale globally without losing their soul. From a single machine in San Antonio to factories around the world, the mission remains the same: bring quality tortillas to everyone.
                </p>
                <p>
                  The next time you tear into a Mission tortilla, you&apos;re connecting to a story that started over 75 years ago in the heart of Texas. That&apos;s what makes Texas tortillas special—they carry history in every bite.
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center mt-12">
              <h2 className="text-3xl font-bold mb-4">Taste the Texas-Born Legacy</h2>
              <p className="text-xl mb-6 text-cream-100">
                Order Mission tortillas and other Texas favorites with FREE shipping
              </p>
              <Link
                href="/shop"
                className="inline-block bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Texas Tortillas
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
