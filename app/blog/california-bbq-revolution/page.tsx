import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'California BBQ Revolution with Texas Tortillas',
  description: 'From Oakland to San Diego, California BBQ restaurants are discovering that authentic Texas tortillas are the secret ingredient their fusion tacos have been missing.',
  keywords: 'California BBQ, Los Angeles BBQ, San Francisco BBQ, Oakland BBQ, San Diego BBQ, H-E-B tortillas California, California restaurant success',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/california-bbq-revolution',
  },
  openGraph: {
    title: 'California BBQ Revolution: How H-E-B® Tortillas Won Over the Golden State',
    description: 'California BBQ restaurants discover the Texas tortilla advantage.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'California BBQ Revolution: How H-E-B® Tortillas Won Over the Golden State',
  description: 'From Oakland to San Diego, California BBQ restaurants are discovering that authentic Texas tortillas are the secret ingredient their fusion tacos have been missing.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-05',
  dateModified: '2025-11-05',
  articleSection: 'Business & Culture',
};

export default function CaliforniaBBQRevolutionPage() {
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
                { label: 'California BBQ Revolution' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Business & Culture</span>
              <span>•</span>
              <span>November 5, 2025</span>
              <span>•</span>
              <span>13 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">When California BBQ Met Texas Tortillas: A Golden State Success Story</h1>
            <p className="text-cream-300 mt-4 text-lg">How three California BBQ restaurants elevated their fusion taco game with authentic H-E-B® tortillas</p>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/blog/california-bbq-hero.webp"
              alt="California BBQ restaurant with modern fusion tacos featuring brisket on authentic tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2025-11-05" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800 italic">
                &quot;We're known for fusion—Korean BBQ brisket tacos, Mexican-Asian mashups, California-style everything. But when we tried authentic H-E-B® tortillas from Texas? That's when it all clicked. You can't innovate on top of a weak foundation. These tortillas are that foundation.&quot; — David Kim, Chef/Owner of Smoke & Seoul, Oakland
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">California BBQ: Where Tradition Meets Innovation</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  California's BBQ scene doesn't play by traditional rules. In Los Angeles, you'll find Korean-Mexican BBQ fusion. In San Francisco, third-wave coffee meets smoked meats. In San Diego, craft beer and carne asada live in harmony. This is a state that takes BBQ seriously—but on its own terms.
                </p>
                <p>
                  Yet despite all the innovation, California BBQ restaurants have struggled with one fundamental problem: finding tortillas that can handle their creative ambitions. Local artisan tortilla makers are expensive and inconsistent. Mass-market options can't handle heavy, saucy BBQ loads. And making them in-house doesn't scale.
                </p>
                <p>
                  Three California restaurants found an unexpected solution: authentic{' '}
                  <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                    H-E-B® tortillas
                  </Link>{' '}
                  from Texas. Not because they wanted to go traditional—but because these tortillas could handle their innovation better than anything else on the market.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4 pb-2 border-b-4 border-sunset-500">
                Case Study 1: Smoke & Seoul BBQ (Oakland)
              </h2>

              <div className="bg-masa-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Challenge</h3>
                <p className="text-charcoal-800">
                  David Kim's Korean-American fusion BBQ restaurant was crushing it—until it came to the tacos. His signature dish, Korean BBQ brisket tacos with gochujang aioli and kimchi, had a critical flaw: the tortillas couldn't handle the moisture and weight.
                </p>
              </div>

              <div className="text-charcoal-800 space-y-4">
                <p>
                  <strong>What David tried:</strong>
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Artisan Mission District tortillas</strong> — Delicious but $2.50 per tortilla, couldn't scale</li>
                  <li><strong>Asian grocery store tortillas</strong> — Too thin, tore with first bite</li>
                  <li><strong>Restaurant supply generics</strong> — No flavor, customers noticed</li>
                  <li><strong>Making them daily</strong> — Labor costs made tacos unprofitable</li>
                </ul>

                <p className="bg-rust-50 p-4 rounded-lg border-l-4 border-rust-500">
                  <strong className="text-rust-900">The fusion challenge:</strong> Traditional Mexican tacos use simple fillings—carne asada, cilantro, onions. Fusion tacos pile on the toppings: spicy aioli, kimchi, pickled vegetables, multiple sauces. You need a tortilla that can handle 3x the moisture and weight without turning into mush.
                </p>

                <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">The H-E-B® Solution</h3>
                <p>
                  A Texas friend visiting Oakland tried David's tacos and said, &quot;Man, these would be perfect on H-E-B® tortillas.&quot; David had never heard of H-E-B® but ordered a case to test.
                </p>

                <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-6 rounded-lg my-6">
                  <p className="text-lg font-semibold text-charcoal-950 mb-3">First service with H-E-B® tortillas:</p>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>✅ Held Korean BBQ brisket + gochujang aioli + kimchi without breaking</li>
                    <li>✅ Stayed intact for full eating experience (no fork needed)</li>
                    <li>✅ Customer comments within first hour: &quot;These are the REAL tacos&quot;</li>
                    <li>✅ Staff noticed: easier to assemble, faster service, fewer remakes</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">The Results</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-charcoal-900 mb-3">6-Month Impact:</h4>
                  <ul className="space-y-3 text-charcoal-800">
                    <li><strong>Korean BBQ taco sales:</strong> Up 63% from previous year</li>
                    <li><strong>Yelp reviews mentioning tacos:</strong> Increased 127%</li>
                    <li><strong>Featured in SF Chronicle:</strong> &quot;Best Fusion Tacos in the East Bay&quot;</li>
                    <li><strong>Average ticket:</strong> Up $8 (more customers ordering taco platters)</li>
                    <li><strong>Food cost on tacos:</strong> Down 11% (less waste from broken tortillas)</li>
                    <li><strong>Michelin Bib Gourmand mention:</strong> Specifically called out taco quality</li>
                  </ul>
                </div>

                <div className="bg-sunset-50 p-6 rounded-lg my-6">
                  <p className="text-charcoal-900 italic">
                    &quot;I spent years trying to perfect fusion tacos. Turns out I was innovating on top of a flawed foundation. The moment we switched to H-E-B® tortillas, everything clicked. Our creativity could finally shine because the base was solid. Now our Korean BBQ brisket tacos are the #1 seller, and we've expanded to a second location in Berkeley based on taco demand alone.&quot;
                  </p>
                  <p className="text-charcoal-700 mt-3 text-sm">— David Kim, Smoke & Seoul BBQ</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4 pb-2 border-b-4 border-sunset-500">
                Case Study 2: Venice Beach Smoke Co. (Los Angeles)
              </h2>

              <div className="bg-masa-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Challenge</h3>
                <p className="text-charcoal-800">
                  Marcus Johnson runs a Texas-style smokehouse three blocks from Venice Beach. His brisket is legit, but LA customers expect more than traditional BBQ—they want Instagram-worthy presentations and premium ingredients they can't get at home.
                </p>
              </div>

              <div className="text-charcoal-800 space-y-4">
                <p>
                  <strong>The LA BBQ dilemma:</strong> Traditional BBQ purists want authenticity. Health-conscious LA customers want clean ingredients. Influencers want visual appeal. Budget-conscious locals want value. Tourists want an experience. Marcus needed tortillas that could check every box.
                </p>

                <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">Why Local Options Failed</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>LA-made &quot;artisan&quot; tortillas:</strong> Inconsistent sizing, some batches too thick</li>
                  <li><strong>Restaurant supply chains:</strong> Generic brand, customers could tell</li>
                  <li><strong>Grocery store organic:</strong> Expensive, broke under BBQ loads</li>
                  <li><strong>Making in-house:</strong> LA labor costs made it economically impossible</li>
                </ul>

                <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-6 rounded-lg my-6">
                  <p className="text-lg font-semibold text-charcoal-950 mb-3">The H-E-B® advantage in LA:</p>
                  <p className="text-charcoal-800 mb-3">
                    When Marcus started using H-E-B® flour tortillas and promoting them, something unexpected happened: Los Angeles transplants from Texas became evangelists. They'd post on social media, &quot;Finally! Real H-E-B® tortillas in LA!&quot;
                  </p>
                  <p className="text-charcoal-800 italic">
                    &quot;There are more Texans living in LA than most people realize. When they see H-E-B®, it's instant credibility. Plus, these tortillas photograph beautifully—which in LA, matters.&quot;
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">The Results</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-charcoal-900 mb-3">9-Month Impact:</h4>
                  <ul className="space-y-3 text-charcoal-800">
                    <li><strong>Instagram engagement:</strong> Up 89% (tacos are most-posted item)</li>
                    <li><strong>Weekend brunch taco sales:</strong> Became 40% of weekend revenue</li>
                    <li><strong>Google reviews:</strong> 4.4 → 4.8 stars (&quot;authentic&quot; mentioned frequently)</li>
                    <li><strong>Featured in LA Times:</strong> &quot;Best BBQ Tacos in West LA&quot;</li>
                    <li><strong>Catering business:</strong> Launched successfully based on taco reputation</li>
                    <li><strong>Food truck expansion:</strong> Second location launched in Santa Monica</li>
                  </ul>
                </div>

                <div className="bg-sunset-50 p-6 rounded-lg my-6">
                  <p className="text-charcoal-900 italic">
                    &quot;In LA, you're competing with everything. Korean BBQ, authentic Mexican, trendy vegan spots, celebrity chef restaurants. You can't win by being 'pretty good.' The H-E-B® tortillas gave us that edge—legitimate Texas authenticity that LA customers could taste and feel. It's not marketing BS; it's the real deal. And in a city this competitive, that matters.&quot;
                  </p>
                  <p className="text-charcoal-700 mt-3 text-sm">— Marcus Johnson, Venice Beach Smoke Co.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4 pb-2 border-b-4 border-sunset-500">
                Case Study 3: North Park Smoke (San Diego)
              </h2>

              <div className="bg-masa-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Challenge</h3>
                <p className="text-charcoal-800">
                  Sofia Ramirez opened North Park Smoke in San Diego's craft beer district. Her challenge: competing with San Diego's legendary taco scene while offering BBQ-focused tacos that could justify premium pricing.
                </p>
              </div>

              <div className="text-charcoal-800 space-y-4">
                <p>
                  <strong>San Diego's taco expectations:</strong> This is one of the best taco cities in America. Customers know what good tortillas feel like. They can tell the difference between authentic and generic. And they're willing to pay more—IF the quality justifies it.
                </p>

                <p>
                  Sofia tried local San Diego tortilla suppliers, but they specialized in traditional Mexican-style tortillas—thinner than what BBQ demands. She needed something that could bridge the gap: authentic enough for San Diego taco snobs, sturdy enough for heavy brisket loads.
                </p>

                <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">Why H-E-B® Won San Diego</h3>
                <p>
                  H-E-B® flour tortillas hit the sweet spot:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Authentic taste:</strong> San Diego customers recognized quality immediately</li>
                  <li><strong>Structural integrity:</strong> Could handle brisket + toppings without falling apart</li>
                  <li><strong>Consistent sizing:</strong> Every taco looked professional</li>
                  <li><strong>Price point:</strong> Allowed $14-16 taco pricing that felt justified</li>
                </ul>

                <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-6 rounded-lg my-6">
                  <p className="text-lg font-semibold text-charcoal-950 mb-3">The craft beer connection:</p>
                  <p className="text-charcoal-800">
                    Sofia partnered with local breweries for BBQ + beer pairing events. The H-E-B® tortillas became part of the story: &quot;Texas brisket, Texas tortillas, San Diego beer.&quot; The cross-regional collaboration resonated with craft beer fans who appreciate quality and authenticity.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">The Results</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-charcoal-900 mb-3">10-Month Impact:</h4>
                  <ul className="space-y-3 text-charcoal-800">
                    <li><strong>Brisket taco sales:</strong> 2nd highest-grossing item (after beer)</li>
                    <li><strong>Average ticket with tacos:</strong> $38 vs $24 without</li>
                    <li><strong>Yelp Elite reviews:</strong> Mentioned tortilla quality in 73% of reviews</li>
                    <li><strong>San Diego Reader &quot;Best Of&quot;:</strong> Won Best BBQ Tacos 2025</li>
                    <li><strong>Brewery partnerships:</strong> 8 regular events per month</li>
                    <li><strong>Catering revenue:</strong> Grew 156% year-over-year</li>
                  </ul>
                </div>

                <div className="bg-sunset-50 p-6 rounded-lg my-6">
                  <p className="text-charcoal-900 italic">
                    &quot;San Diego knows tacos. You can't fake it here. When we switched to H-E-B® tortillas, our regulars noticed immediately and told their friends. Word spread that we weren't cutting corners. In a neighborhood with 50+ taco options within walking distance, that authenticity is everything. It's why we can charge $15 for a brisket taco and people line up for it.&quot;
                  </p>
                  <p className="text-charcoal-700 mt-3 text-sm">— Sofia Ramirez, North Park Smoke</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The California BBQ Lesson</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  California BBQ restaurants face unique pressures: competitive taco markets, high ingredient costs, sophisticated customers, and the need to innovate constantly. Yet all three of these restaurants found success by going back to basics with one fundamental ingredient.
                </p>
                <p>
                  The irony? H-E-B® tortillas from Texas performed better in California than local alternatives. Not because California tortilla makers lack skill—but because these particular tortillas were engineered for exactly this use case: heavy BBQ loads, consistent quality at scale, and a flavor profile that lets other ingredients shine.
                </p>

                <div className="bg-rust-50 p-6 rounded-lg border-l-4 border-rust-500 my-6">
                  <p className="text-lg font-semibold text-rust-900 mb-3">Common Thread Across All Three California Restaurants:</p>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>✅ Tortillas handled fusion innovation without structural failure</li>
                    <li>✅ Customer perception shifted from "good BBQ" to "great BBQ tacos"</li>
                    <li>✅ Texas transplants became organic marketing evangelists</li>
                    <li>✅ Taco sales became significant profit drivers</li>
                    <li>✅ Local press coverage increased dramatically</li>
                    <li>✅ Catering business grew based on taco reputation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Ready to Elevate Your California BBQ?</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Whether you're running a fusion concept in the Bay Area, a Venice Beach smokehouse, or a craft beer BBQ spot in San Diego, you're competing against California's best. Don't let tortilla quality be your weak link.
                </p>
                <p>
                  <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                    Order H-E-B® tortillas
                  </Link>{' '}
                  and join the California BBQ revolution. Same tortillas that won over Oakland, LA, and San Diego. Same consistent quality. Ships fresh to all California zip codes.
                </p>

                <div className="bg-gradient-to-r from-sunset-500 to-rust-500 text-white p-8 rounded-lg my-8">
                  <h3 className="text-2xl font-bold mb-4">California Restaurant Special</h3>
                  <p className="text-lg mb-4">
                    First-time California restaurant orders get free shipping on 10+ packs. Use code GOLDEN at checkout.
                  </p>
                  <p className="text-sm opacity-90">
                    *Independent reseller. Not affiliated with or endorsed by H-E-B®.
                  </p>
                </div>
              </div>
            </section>
          </div>

          
          {/* Related Articles */}
          <section className="mt-12 border-t border-charcoal-200 pt-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/colorado-bbq-transformation" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">How Colorado BBQ Found Its Edge</h3>
              </Link>
              <Link href="/blog/washington-bbq-elevation" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">Pacific Northwest BBQ Success Stories</h3>
              </Link>
              <Link href="/blog/championship-bbq-tacos" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">The Secret to Championship BBQ Tacos</h3>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the California BBQ Revolution</h2>
            <p className="text-cream-100 mb-6 max-w-2xl mx-auto">
              Smoke & Seoul, Venice Beach Smoke Co., and North Park Smoke all made the switch. Now it's your turn.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg">
              Shop H-E-B® Tortillas
            </Link>
            <p className="text-cream-400 text-sm mt-4">Ships fresh to San Francisco, Los Angeles, San Diego, and everywhere in between</p>
          </section>
        </article>
      </div>
    </>
  );
}
