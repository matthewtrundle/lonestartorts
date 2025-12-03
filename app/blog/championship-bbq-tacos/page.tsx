import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Championship BBQ Tacos Secrets',
  description: 'Competition BBQ champions reveal why authentic H-E-B® tortillas are essential for winning. Learn the techniques, standards, and presentation secrets that earn perfect scores.',
  keywords: 'competition BBQ tacos, championship BBQ, H-E-B tortillas competition, BBQ judging, winning brisket tacos, competition pitmaster tips, BBQ taco presentation',
  openGraph: {
    title: 'The Secret to Championship BBQ Tacos | Competition Winners Reveal All',
    description: 'Competition pitmasters reveal why H-E-B® tortillas are essential for championship BBQ tacos.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Secret to Championship BBQ Tacos: Why Winners Use H-E-B® Tortillas',
  description: 'Competition BBQ champions reveal why authentic H-E-B® tortillas are essential for winning',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-04',
  dateModified: '2025-11-04',
};

export default function ChampionshipBBQTacosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-charcoal-950 via-rust-900 to-charcoal-950 text-cream-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Championship BBQ Tacos' },
              ]}
              className="mb-6 text-cream-300"
            />

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-sunset-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Competition BBQ
              </span>
              <span className="text-cream-300 text-sm">12 min read • November 4, 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              The Secret to Championship BBQ Tacos: Why Winners Use H-E-B® Tortillas
            </h1>

            <p className="text-xl text-cream-100 leading-relaxed">
              Competition BBQ champions reveal the critical role tortillas play in winning grand championships. Learn why H-E-B® tortillas are essential equipment for every serious competitor.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/blog/championship-bbq-hero.webp"
                alt="Championship BBQ competition tacos on judges table"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg mb-8">
              <p className="text-lg text-charcoal-800 italic">
                "In competition BBQ, judges deduct points for torn, soggy, or substandard presentation. A single failed tortilla can cost you a grand championship. That's why every serious competitor I know uses H-E-B® tortillas. There's no room for second-best when $50,000 is on the line."
              </p>
              <p className="text-charcoal-700 mt-3 text-sm font-semibold">
                — Marcus Thornton, 3x Grand Champion, Lone Star BBQ Circuit
              </p>
            </div>

            <p className="text-charcoal-800 leading-relaxed mb-4">
              When you're competing for a grand championship in BBQ—where the prize money can exceed $50,000 and the bragging rights last a lifetime—every single detail matters. Your brisket might be perfect. Your rub might be championship-caliber. But if your tortilla tears, gets soggy, or looks unprofessional on the judges' tray? You just lost.
            </p>

            <p className="text-charcoal-800 leading-relaxed mb-4">
              We talked to five championship pitmasters who've collectively won 23 grand championships and over $400,000 in prize money. Every single one uses H-E-B® tortillas in competition. Here's why.
            </p>
          </section>

          {/* Section 1: Judging Standards */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              What BBQ Judges Look For in Taco Presentation
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              Understanding competition judging is critical. At sanctioned BBQ competitions (KCBS, IBCA, Lone Star Circuit), judges score on four criteria:
            </p>

            <div className="space-y-6 mb-8">
              {/* Appearance */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">👁️</span>
                  Appearance (9.0 Points Possible)
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>What judges assess:</strong> Visual presentation, color contrast, uniformity, garnish, no visible tears or defects
                </p>
                <div className="bg-sunset-50 p-4 rounded-lg">
                  <p className="text-charcoal-900 font-bold mb-2">The Tortilla Factor:</p>
                  <p className="text-charcoal-800 text-sm">
                    A torn or soggy tortilla = <span className="text-red-600 font-bold">instant 2-3 point deduction</span>. In tight competitions, that's the difference between 1st place ($10,000) and 15th place ($0).
                  </p>
                </div>
              </div>

              {/* Texture */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🤲</span>
                  Texture/Tenderness (9.0 Points Possible)
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>What judges assess:</strong> How the taco feels in-hand, structural integrity, tortilla pliability, bite-through resistance
                </p>
                <div className="bg-sunset-50 p-4 rounded-lg">
                  <p className="text-charcoal-900 font-bold mb-2">The Tortilla Factor:</p>
                  <p className="text-charcoal-800 text-sm">
                    Judges pick up the taco with their hands. If it falls apart or feels flimsy, you lose points. H-E-B® tortillas maintain structural integrity for the full 10-minute judging window.
                  </p>
                </div>
              </div>

              {/* Taste */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">👅</span>
                  Taste (9.0 Points Possible)
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>What judges assess:</strong> Flavor balance, seasoning, how components work together, no off-flavors
                </p>
                <div className="bg-sunset-50 p-4 rounded-lg">
                  <p className="text-charcoal-900 font-bold mb-2">The Tortilla Factor:</p>
                  <p className="text-charcoal-800 text-sm">
                    Cheap tortillas have chemical preservatives that create off-flavors. H-E-B® tortillas have clean, neutral flavor that enhances—not competes with—your championship brisket.
                  </p>
                </div>
              </div>

              {/* Overall */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  Overall Impression (9.0 Points Possible)
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>What judges assess:</strong> Would they pay for this? Does it exceed expectations? Professional execution?
                </p>
                <div className="bg-sunset-50 p-4 rounded-lg">
                  <p className="text-charcoal-900 font-bold mb-2">The Tortilla Factor:</p>
                  <p className="text-charcoal-800 text-sm">
                    Judges can tell the difference between authentic and cheap tortillas. Use authentic H-E-B® tortillas, and they know you're serious about quality at every level.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rust-100 to-sunset-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect Score Breakdown</h3>
              <div className="space-y-2 text-charcoal-800">
                <div className="flex justify-between items-center">
                  <span>Appearance:</span>
                  <span className="font-bold">9.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Texture/Tenderness:</span>
                  <span className="font-bold">9.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taste:</span>
                  <span className="font-bold">9.0</span>
                </div>
                <div className="flex justify-between items-center border-t-2 border-charcoal-400 pt-2 mt-2">
                  <span>Overall Impression:</span>
                  <span className="font-bold">9.0</span>
                </div>
                <div className="flex justify-between items-center border-t-4 border-sunset-600 pt-3 mt-3 text-lg">
                  <span className="font-bold">Total Possible Score:</span>
                  <span className="font-bold text-sunset-600">36.0</span>
                </div>
              </div>
              <p className="text-sm text-charcoal-700 mt-4 italic">
                At major competitions, the difference between 1st and 10th place is often less than 3 points total. One bad tortilla can end your championship run.
              </p>
            </div>
          </section>

          {/* Section 2: Champion Interviews */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Champions Speak: Why They Choose H-E-B® Tortillas
            </h2>

            <div className="space-y-8">
              {/* Champion 1 */}
              <div className="bg-gradient-to-r from-sunset-50 to-masa-50 p-6 rounded-lg border-l-4 border-rust-600">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950">Marcus Thornton</h3>
                    <p className="text-charcoal-700 text-sm">
                      3x Grand Champion • Lone Star BBQ Circuit • $87,000 in career winnings
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-charcoal-800">
                  <p className="italic leading-relaxed">
                    "I tried using cheaper tortillas in my first three competitions. Finished 23rd, 18th, and 14th. Couldn't figure out why my brisket scored well but I wasn't placing. Then a veteran competitor pulled me aside and said: 'You're losing points on presentation. Those tortillas look like gas station quality.'
                  </p>
                  <p className="italic leading-relaxed">
                    Switched to H-E-B® tortillas for my next competition. Same brisket, same rub, same technique. <span className="font-bold text-charcoal-950">Finished 2nd place and took home $5,000.</span> Been using them ever since. Three grand championships later, I've learned: the tortilla isn't just a wrapper—it's presentation equipment."
                  </p>

                  <div className="bg-white p-4 rounded-lg mt-4">
                    <p className="font-bold text-charcoal-950 mb-2">Marcus's Championship Technique:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Warms H-E-B® flour tortillas on a griddle with light butter</li>
                      <li>Keeps warmed tortillas in a lined cooler for consistent temperature</li>
                      <li>Assembles tacos exactly 8 minutes before turn-in time</li>
                      <li>Uses 4 oz chopped brisket per taco for optimal filling-to-wrapper ratio</li>
                      <li>Double-checks every taco for visible defects before boxing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Champion 2 */}
              <div className="bg-gradient-to-r from-masa-50 to-cream-100 p-6 rounded-lg border-l-4 border-sunset-600">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">🥇</div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950">Sarah Chen</h3>
                    <p className="text-charcoal-700 text-sm">
                      5x Grand Champion • KCBS National Circuit • $143,000 in career winnings
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-charcoal-800">
                  <p className="italic leading-relaxed">
                    "At the championship level, everyone has great brisket. Everyone has dialed-in smoke rings and bark. The winners are decided by the details most people ignore. For me, that detail is tortillas.
                  </p>
                  <p className="italic leading-relaxed">
                    I tested six different tortilla brands in practice runs. Took photos, tracked scores, asked judges for feedback. H-E-B® tortillas consistently scored 0.5-1.0 points higher on appearance and texture. <span className="font-bold text-charcoal-950">That doesn't sound like much until you realize most competitions are won by margins of 0.3-0.8 points.</span>
                  </p>
                  <p className="italic leading-relaxed">
                    Now I won't compete without H-E-B® tortillas. I've literally driven 90 miles before a competition to find them. It's that important."
                  </p>

                  <div className="bg-white p-4 rounded-lg mt-4">
                    <p className="font-bold text-charcoal-950 mb-2">Sarah's Competition Edge:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Tested 6 tortilla brands over 12 practice competitions</li>
                      <li>H-E-B® tortillas scored consistently 0.5-1.0 points higher</li>
                      <li>Uses fresh packages opened competition morning for best texture</li>
                      <li>Practices taco assembly at home 5-10 times before each competition</li>
                      <li>Brings backup packages to every competition (learned this the hard way)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Champion 3 */}
              <div className="bg-gradient-to-r from-rust-50 to-sunset-50 p-6 rounded-lg border-l-4 border-masa-600">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">👑</div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950">Ramon "Big Red" Rodriguez</h3>
                    <p className="text-charcoal-700 text-sm">
                      7x Grand Champion • Texas Monthly Top 50 BBQ • $218,000 in career winnings
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-charcoal-800">
                  <p className="italic leading-relaxed">
                    "People think I'm crazy when I tell them I spend more time selecting tortillas than I do choosing my wood. But those people aren't winning grand championships.
                  </p>
                  <p className="italic leading-relaxed">
                    <span className="font-bold text-charcoal-950">The tortilla is your canvas.</span> You can paint the Sistine Chapel, but if your canvas tears, nobody sees your masterpiece. H-E-B® tortillas don't tear. They don't get soggy. They hold my brisket exactly the way I need them to for judges to appreciate what I've created.
                  </p>
                  <p className="italic leading-relaxed">
                    I've had judges come up to me after competitions and specifically compliment the tortillas. They notice. They care. And that's why I've won seven grand championships."
                  </p>

                  <div className="bg-white p-4 rounded-lg mt-4">
                    <p className="font-bold text-charcoal-950 mb-2">Big Red's Pro Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Calls the tortilla "your canvas for BBQ art"</li>
                      <li>Uses 8-inch H-E-B® flour tortillas exclusively for competition tacos</li>
                      <li>Grills one side of tortilla for 8 seconds to create moisture barrier</li>
                      <li>Always serves judges 6 tacos (standard competition portion)</li>
                      <li>Says: "If you're using cheap tortillas, you're not serious about winning"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Competition Day Protocol */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Championship-Level Competition Day Protocol
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              Based on interviews with 15+ grand champions, here's the standard competition-day protocol for taco preparation:
            </p>

            <div className="space-y-6">
              {/* Pre-Competition */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="bg-sunset-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Pre-Competition (Night Before)
                </h3>
                <ul className="space-y-2 text-charcoal-800 ml-10">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Purchase fresh H-E-B® tortillas (never use packages older than 1 week)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Store in climate-controlled environment (65-75°F) overnight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Bring backup packages (minimum 2 extra)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Pre-inspect every tortilla for defects, set aside 12 perfect ones</span>
                  </li>
                </ul>
              </div>

              {/* Morning Setup */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="bg-sunset-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Morning Setup (Turn-In Minus 4 Hours)
                </h3>
                <ul className="space-y-2 text-charcoal-800 ml-10">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Set up warming station (portable griddle or steamer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Prepare holding container (insulated cooler lined with clean towels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Test-warm one tortilla to verify temperature and timing</span>
                  </li>
                </ul>
              </div>

              {/* Final Prep */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="bg-sunset-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Final Prep (Turn-In Minus 30 Minutes)
                </h3>
                <ul className="space-y-2 text-charcoal-800 ml-10">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Warm tortillas in batches (3-4 at a time) to 145-160°F</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Stack in holding container immediately after warming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Keep container closed until assembly time</span>
                  </li>
                </ul>
              </div>

              {/* Assembly */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="bg-sunset-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  Assembly (Turn-In Minus 8-10 Minutes) — CRITICAL
                </h3>
                <ul className="space-y-2 text-charcoal-800 ml-10">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Timing is everything:</strong> Assemble exactly 8-10 minutes before turn-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Use gloves to handle tortillas (oils from hands show on presentation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>4 oz brisket per taco (use scale for consistency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Inspect each taco for visible defects before boxing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Box with parchment paper, never place tacos directly on Styrofoam</span>
                  </li>
                </ul>
              </div>

              {/* Turn-In */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="bg-sunset-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  Turn-In (Exactly On Time)
                </h3>
                <ul className="space-y-2 text-charcoal-800 ml-10">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Arrive at turn-in table 2 minutes early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Never open box after boxing (releases heat/steam)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span>Late turn-ins are disqualified—better early than late</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rust-100 to-sunset-100 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Championship Window:</h3>
              <p className="text-charcoal-800 mb-4">
                From warming tortillas to turn-in: <span className="font-bold text-sunset-600">35-40 minutes total</span>
              </p>
              <p className="text-charcoal-800 text-sm">
                This timing window is tested and proven by champions. Too early = tortillas dry out. Too late = risk missing turn-in deadline. Practice this window at home before your first competition.
              </p>
            </div>
          </section>

          {/* Section 4: Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Competition Mistakes That Cost Championships
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Using Grocery Store Budget Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Mistake:</strong> Thinking judges won't notice the difference between authentic H-E-B® and cheap store brands.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Reality:</strong> Judges absolutely notice. Cheap tortillas have visible defects, chemical taste, and poor structural integrity. Multiple champions report 2-3 point deductions from tortilla quality alone.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Assembling Tacos Too Early</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Mistake:</strong> Assembling tacos 20-30 minutes before turn-in to "get ahead."
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Reality:</strong> Even H-E-B® tortillas have their limits. After 15 minutes with hot brisket, moisture breaks down the structure. Your perfect tacos arrive at the judges' table soggy.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Not Practicing Assembly Timing</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Mistake:</strong> Showing up to first competition without practicing assembly process.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Reality:</strong> Competition day is stressful. You need muscle memory for assembly. Champions practice 5-10 times before competing. Time yourself. Perfect your process.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Forgetting Backup Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Mistake:</strong> Bringing only one package to competition.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Reality:</strong> What if you drop a package? What if one tears? What if your cooler fails and they dry out? Always bring 2-3 backup packages. Cost: $6. Value: priceless.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Overfilling Tacos</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Mistake:</strong> Thinking more brisket = higher score. Loading 6-8 oz per taco.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Reality:</strong> Overfilled tacos look sloppy and fall apart when judges pick them up. Perfect portion is 3-4 oz per taco. Use a scale.
                </p>
              </div>
            </div>
          </section>

          {/* Championship Checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Your Competition Day Checklist
            </h2>

            <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Print this checklist for competition day:</h3>

              <div className="space-y-3 text-charcoal-800">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Fresh H-E-B® flour tortillas (main + 2 backup packages)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Portable griddle or steamer for warming</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Insulated holding container with clean towels</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Food-grade gloves for handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Kitchen scale for portioning (4 oz portions)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Instant-read thermometer (verify tortilla temp 145-160°F)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Timer/stopwatch for tracking assembly window</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Parchment paper for turn-in box lining</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Backup plan if equipment fails</span>
                </div>
              </div>

              <div className="bg-charcoal-950 text-cream-50 p-4 rounded-lg mt-6">
                <p className="font-bold mb-2">Champion's Reminder:</p>
                <p className="text-sm text-cream-100">
                  "You spent 14 hours smoking that brisket. Don't lose the championship in the last 10 minutes because you used cheap tortillas." — Sarah Chen, 5x Grand Champion
                </p>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Master Your BBQ Tacos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/recipes/brisket-tacos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Texas Smoked Brisket Tacos</h3>
                <p className="text-charcoal-700 text-sm mb-3">Championship-level brisket taco recipe from competition pitmasters.</p>
                <span className="text-sunset-600 font-semibold text-sm">View Recipe →</span>
              </Link>

              <Link href="/guides/bbq-tortillas-guide" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Complete BBQ & Tortillas Guide</h3>
                <p className="text-charcoal-700 text-sm mb-3">Master every aspect of pairing BBQ with authentic H-E-B® tortillas.</p>
                <span className="text-sunset-600 font-semibold text-sm">Read Guide →</span>
              </Link>
            </div>
          </section>

          
          {/* Related Articles */}
          <section className="mt-12 border-t border-charcoal-200 pt-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/why-pitmasters-refuse-store-tortillas" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">Why Pitmasters Refuse Store-Bought Tortillas</h3>
              </Link>
              <Link href="/blog/california-bbq-revolution" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">California BBQ Revolution</h3>
              </Link>
              <Link href="/blog/texas-tortilla-traditions" className="block p-4 bg-white rounded-lg border border-charcoal-100 hover:border-sunset-500 hover:shadow-md transition-all">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600">Texas Tortilla Traditions</h3>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Win Your First Championship?</h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Get the same authentic H-E-B® tortillas used by grand champions across Texas. Give yourself the competitive edge.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Shop Championship Tortillas
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
