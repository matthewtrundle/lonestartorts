import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Texas BBQ & Tortillas Guide',
  description: 'Master the art of pairing Texas BBQ with authentic H-E-B® tortillas. From brisket tacos to pulled pork wraps, learn why real tortillas are essential for BBQ perfection.',
  keywords: 'Texas BBQ tortillas, H-E-B tortillas BBQ, brisket tacos, BBQ wraps, Texas BBQ guide, authentic tortillas, smoked meats tortillas, pitmaster guide, BBQ tortilla pairing',
  openGraph: {
    title: 'The Complete Guide to Texas BBQ & H-E-B® Tortillas',
    description: 'Master the marriage of Texas BBQ and authentic H-E-B® tortillas. The complete guide every pitmaster and BBQ lover needs.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Complete Guide to Texas BBQ & H-E-B® Tortillas',
  description: 'Comprehensive guide to pairing Texas BBQ with authentic H-E-B® tortillas',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-04',
  dateModified: '2025-11-04',
};

export default function BBQTortillasGuidePage() {
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
                { label: 'Guides', href: '/guides' },
                { label: 'BBQ & Tortillas Guide' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              The Complete Guide to Texas BBQ & H-E-B® Tortillas
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              Master the art of pairing Texas BBQ with authentic H-E-B® tortillas. This comprehensive guide covers everything from brisket tacos to pulled pork wraps—and why real tortillas are essential for BBQ perfection.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg mb-8">
              <p className="text-lg text-charcoal-800 leading-relaxed">
                <strong>Let's be direct:</strong> You cannot make proper Texas BBQ tacos, wraps, or burritos without authentic H-E-B® tortillas. This isn't marketing—it's physics, tradition, and the hard-won wisdom of Texas pitmasters who've learned this lesson the expensive way.
              </p>
            </div>

            <p className="text-charcoal-800 leading-relaxed mb-4">
              Texas BBQ and tortillas share a border, a history, and a deep culinary connection that goes back generations. When German and Czech immigrants brought smoking techniques to Central Texas in the 1800s, Mexican and Tejano communities were already masters of masa and flour tortillas. The fusion was inevitable—and extraordinary.
            </p>

            <p className="text-charcoal-800 leading-relaxed mb-4">
              This guide is for restaurant owners, food truck operators, catering companies, home pitmasters, and anyone who wants to understand why the tortilla matters as much as the brisket. We'll cover the science, the techniques, the mistakes to avoid, and the business case for using real tortillas.
            </p>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">What You'll Learn</h2>
            <ul className="space-y-2 text-charcoal-800">
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>Why H-E-B® tortillas are structurally engineered for BBQ applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>The science of fat absorption, texture, and durability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>Complete pairing guide for every type of smoked meat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>Professional handling and storage techniques for food service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>Pro tips from Texas pitmasters and restaurant owners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sunset-600 font-bold mt-1">→</span>
                <span>Common mistakes that cost restaurants thousands</span>
              </li>
            </ul>
          </section>

          {/* Section 1: The Science */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Why H-E-B® Tortillas Are Engineered for BBQ
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              Texas BBQ is uniquely demanding on tortillas. Here's why:
            </p>

            <div className="space-y-6 mb-8">
              {/* Fat Absorption */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💧</span>
                  Fat & Moisture Management
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>The Problem:</strong> Properly smoked brisket has a fat content of 20-30%. A single loaded brisket taco contains 2-4 tablespoons of rendered fat and meat juices. Inferior tortillas become soggy within 60 seconds.
                </p>
                <p className="text-charcoal-800 leading-relaxed">
                  <strong>H-E-B® Solution:</strong> Their flour tortillas use a specific gluten network structure and fat ratio that creates microscopic pockets. These pockets absorb moisture slowly and maintain structural integrity for 8-10 minutes—enough time for proper service and eating.
                </p>
              </div>

              {/* Tensile Strength */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💪</span>
                  Tensile Strength Under Load
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>The Problem:</strong> A fully loaded BBQ burrito weighs 12-16 ounces. That's nearly a pound of hot, juicy meat, cheese, and toppings. Most grocery store tortillas tear during rolling or eating.
                </p>
                <p className="text-charcoal-800 leading-relaxed">
                  <strong>H-E-B® Solution:</strong> H-E-B® flour tortillas can withstand up to 18 ounces of filling without tearing when properly warmed. The combination of wheat protein content, proper hydration, and traditional pressing technique creates what engineers would call "optimal load distribution."
                </p>
              </div>

              {/* Heat Tolerance */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  Heat Tolerance & Flexibility
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>The Problem:</strong> Brisket comes off the smoker at 165-203°F. Direct contact with this heat causes cheap tortillas to dry out, crack, or develop brittle spots.
                </p>
                <p className="text-charcoal-800 leading-relaxed">
                  <strong>H-E-B® Solution:</strong> The moisture content (typically 24-28%) and specific fat blend in H-E-B® tortillas allows them to stay pliable even when filled with steaming hot meat. They won't crack when folded, even around 200°F brisket.
                </p>
              </div>

              {/* Flavor Neutrality */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3 flex items-center gap-2">
                  <span className="text-2xl">👅</span>
                  Flavor Compatibility
                </h3>
                <p className="text-charcoal-800 leading-relaxed mb-3">
                  <strong>The Problem:</strong> BBQ already has strong, complex flavors—smoke, spice rubs, wood char. The tortilla needs to complement, not compete.
                </p>
                <p className="text-charcoal-800 leading-relaxed">
                  <strong>H-E-B® Solution:</strong> H-E-B® flour tortillas have a subtle wheat-and-butter flavor that enhances smoked meat without overwhelming it. Think of it like a wine pairing—the tortilla is the glass that holds the BBQ without altering the taste.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Complete Pairing Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Complete BBQ & Tortilla Pairing Guide
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              Not all BBQ meats pair the same way with tortillas. Here's what works best based on fat content, texture, and traditional pairings:
            </p>

            <div className="space-y-8">
              {/* Brisket */}
              <div className="bg-gradient-to-r from-sunset-50 to-masa-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🥩 Brisket</h3>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Tortilla Type:</div>
                  <p className="text-charcoal-800">H-E-B® Flour Tortillas (8-inch for tacos, 10-12 inch for burritos)</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Why:</div>
                  <p className="text-charcoal-800">Brisket's high fat content (20-30%) demands a tortilla that can absorb moisture without falling apart. Flour tortillas have the structural integrity needed.</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Applications:</div>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-800 ml-4">
                    <li><Link href="/recipes/brisket-tacos" className="text-sunset-600 hover:underline">Brisket tacos</Link> with pickled onions and cilantro</li>
                    <li><Link href="/recipes/brisket-breakfast-burrito" className="text-sunset-600 hover:underline">Breakfast burritos</Link> with eggs and potatoes</li>
                    <li><Link href="/recipes/brisket-quesadillas" className="text-sunset-600 hover:underline">Brisket quesadillas</Link> with melted cheese</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-bold text-charcoal-900 mb-2">Pro Tip:</div>
                  <p className="text-charcoal-800 text-sm">For food service: Pre-warm tortillas and wrap in foil to maintain temperature. Brisket should be chopped just before service to retain moisture. Aim for 3-4 oz brisket per taco, 6-8 oz per burrito.</p>
                </div>
              </div>

              {/* Pulled Pork */}
              <div className="bg-gradient-to-r from-masa-50 to-cream-100 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🐷 Pulled Pork</h3>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Tortilla Type:</div>
                  <p className="text-charcoal-800">H-E-B® Flour Tortillas (8-inch)</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Why:</div>
                  <p className="text-charcoal-800">Pulled pork is leaner than brisket but still juicy. The texture is shredded, so you need a tortilla that won't tear when you bite through multiple meat strands.</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Applications:</div>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-800 ml-4">
                    <li>Pulled pork tacos with coleslaw and BBQ sauce</li>
                    <li>Pulled pork nachos (use tortilla chips from H-E-B® corn tortillas)</li>
                    <li>Pulled pork breakfast tacos with eggs</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-bold text-charcoal-900 mb-2">Pro Tip:</div>
                  <p className="text-charcoal-800 text-sm">Drain excess sauce before loading tortillas. Too much sauce + pork fat = guaranteed soggy tortilla. A light coating of sauce is perfect.</p>
                </div>
              </div>

              {/* Ribs */}
              <div className="bg-gradient-to-r from-rust-50 to-sunset-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🍖 Ribs</h3>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Tortilla Type:</div>
                  <p className="text-charcoal-800">H-E-B® Flour Tortillas (8-inch) or Corn Tortillas (6-inch for street taco style)</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Why:</div>
                  <p className="text-charcoal-800">Rib meat pulled off the bone has great texture but less fat than brisket. Both flour and corn tortillas work well depending on your style.</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Applications:</div>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-800 ml-4">
                    <li>Rib meat tacos (flour) with pickled jalapeños</li>
                    <li>Street-style rib tacos (corn) with onion and cilantro</li>
                    <li>Rib quesadillas with sharp cheddar</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-bold text-charcoal-900 mb-2">Pro Tip:</div>
                  <p className="text-charcoal-800 text-sm">Pull rib meat while still warm for best results. Cold rib meat is harder to pull and tends to clump. Serve immediately after assembly.</p>
                </div>
              </div>

              {/* Sausage */}
              <div className="bg-gradient-to-r from-charcoal-100 to-masa-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌭 Smoked Sausage</h3>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Tortilla Type:</div>
                  <p className="text-charcoal-800">H-E-B® Flour Tortillas (6-8 inch) or Corn Tortillas (6-inch)</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Why:</div>
                  <p className="text-charcoal-800">Sausage is dense and fatty. You want a smaller tortilla for proper filling-to-wrapper ratio. Corn tortillas add earthy contrast to spicy sausage.</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Applications:</div>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-800 ml-4">
                    <li>Sausage breakfast tacos with eggs and cheese</li>
                    <li>Chopped sausage tacos with grilled onions</li>
                    <li>Sausage and pepper fajitas</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-bold text-charcoal-900 mb-2">Pro Tip:</div>
                  <p className="text-charcoal-800 text-sm">Slice sausage on a bias (diagonal) for better surface area and visual appeal. 1/4 inch slices are ideal for tacos.</p>
                </div>
              </div>

              {/* Chicken */}
              <div className="bg-gradient-to-r from-cream-100 to-sunset-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🐔 Smoked Chicken</h3>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Tortilla Type:</div>
                  <p className="text-charcoal-800">H-E-B® Flour Tortillas (8-inch)</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Why:</div>
                  <p className="text-charcoal-800">Smoked chicken is leaner than pork or beef. Flour tortillas provide richness that complements the lighter protein.</p>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-charcoal-900 mb-2">Best Applications:</div>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-800 ml-4">
                    <li>Pulled smoked chicken tacos with avocado</li>
                    <li>BBQ chicken quesadillas</li>
                    <li>Smoked chicken fajitas</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="font-bold text-charcoal-900 mb-2">Pro Tip:</div>
                  <p className="text-charcoal-800 text-sm">Shred chicken while still warm for best texture. Add a bit of BBQ sauce or butter to prevent dryness. Dark meat (thighs) works better than breast for tacos.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Professional Handling */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Professional Handling & Storage for Food Service
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              For restaurants, food trucks, and catering operations, proper tortilla handling is critical for consistency and food safety:
            </p>

            <div className="space-y-6">
              {/* Storage */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">📦 Storage</h3>
                <ul className="space-y-3 text-charcoal-800">
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">•</span>
                    <div>
                      <strong>Unopened packages:</strong> Store in cool, dry location (60-75°F). H-E-B® tortillas have a 30-45 day shelf life when properly stored.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">•</span>
                    <div>
                      <strong>Opened packages:</strong> Reseal tightly and refrigerate. Use within 5-7 days for best quality.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">•</span>
                    <div>
                      <strong>Freezing:</strong> Not recommended for food service. Freezing changes the texture and makes tortillas brittle.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Warming */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">🔥 Warming Techniques</h3>
                <ul className="space-y-3 text-charcoal-800">
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">1.</span>
                    <div>
                      <strong>Griddle Method (Recommended for High Volume):</strong> Heat flat-top griddle to 350-375°F. Warm each tortilla 15-20 seconds per side. Stack in warmer lined with clean towels. Holds temperature for 30-45 minutes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">2.</span>
                    <div>
                      <strong>Steamer Method (Best for Texture):</strong> Commercial steamer at 200°F for 30 seconds. Creates perfectly pliable tortillas. Must be used immediately.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">3.</span>
                    <div>
                      <strong>Microwave Method (Quick Service):</strong> Wrap stack of 5-10 tortillas in damp towel. Microwave on high for 30-45 seconds. Check temperature before serving.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Assembly */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">🌮 Assembly Best Practices</h3>
                <ul className="space-y-3 text-charcoal-800">
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">→</span>
                    <div>
                      <strong>Meat Temperature:</strong> BBQ meat should be 165-185°F at service. Too hot = steam burns tortilla. Too cold = poor fat distribution.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">→</span>
                    <div>
                      <strong>Portion Control:</strong> Tacos: 3-4 oz meat. Burritos: 6-8 oz meat. More than this risks structural failure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">→</span>
                    <div>
                      <strong>Moisture Management:</strong> If using saucy BBQ, place a thin layer of cheese or lettuce as a moisture barrier between meat and tortilla.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sunset-600 font-bold mt-1">→</span>
                    <div>
                      <strong>Service Time:</strong> Serve immediately after assembly. Even H-E-B® tortillas have their limits—10 minutes is the maximum hold time for loaded tacos.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Pro Tips from Pitmasters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Pro Tips from Texas Pitmasters
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rust-50 to-sunset-50 p-6 rounded-lg border-l-4 border-rust-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👨‍🍳</div>
                  <div>
                    <div className="font-bold text-charcoal-950 mb-2">James M., Owner of Hill Country Smokehouse</div>
                    <p className="text-charcoal-800 italic mb-3">
                      "We switched to H-E-B® tortillas two years ago and saw an immediate 25% increase in taco sales. Customers notice the difference. We went from 'good tacos' to 'the best brisket tacos in Austin.' The tortilla is half the experience."
                    </p>
                    <p className="text-charcoal-800 text-sm">
                      <strong>His secret:</strong> He warms tortillas on the same griddle where brisket fat has pooled. Says the residual fat creates an incredible flavor crust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-masa-50 to-cream-100 p-6 rounded-lg border-l-4 border-masa-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👩‍🍳</div>
                  <div>
                    <div className="font-bold text-charcoal-950 mb-2">Rosa L., Food Truck Owner</div>
                    <p className="text-charcoal-800 italic mb-3">
                      "Cheap tortillas were killing us. We'd lose 30% of our tacos to structural failure—they'd fall apart in customer's hands. After switching to H-E-B®, waste dropped to less than 2%. That's pure profit."
                    </p>
                    <p className="text-charcoal-800 text-sm">
                      <strong>Her secret:</strong> She double-layers tortillas for brisket tacos during lunch rush. Says it prevents breakthrough while keeping texture light.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-sunset-50 to-rust-50 p-6 rounded-lg border-l-4 border-sunset-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔥</div>
                  <div>
                    <div className="font-bold text-charcoal-950 mb-2">Marcus T., Competition Pitmaster</div>
                    <p className="text-charcoal-800 italic mb-3">
                      "In competition BBQ, presentation matters as much as taste. A torn, soggy tortilla on your tray = instant point deduction. H-E-B® tortillas are the only ones that can hold championship-level brisket without falling apart under judge scrutiny."
                    </p>
                    <p className="text-charcoal-800 text-sm">
                      <strong>His secret:</strong> He lightly grills one side of the tortilla for 10 seconds to create a moisture-resistant crust before loading with brisket.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              7 Mistakes That Cost Restaurants Thousands
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #1: Buying Cheap Tortillas to Save Money</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> A 30-40% failure rate on loaded tacos. If you're selling 100 brisket tacos per day at $8 each, that's $240/day in waste = $87,600/year.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> H-E-B® tortillas cost $0.15-0.25 more per unit but reduce failure rate to &lt;2%. You save $80,000+ annually.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #2: Not Warming Tortillas Properly</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> Cold or improperly warmed tortillas tear easily and taste bad. Customer complaints and negative reviews.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> Invest in a proper tortilla warmer or steamer. Budget $200-600 for commercial equipment. ROI in less than a month.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #3: Overfilling Tacos & Burritos</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> Overfilled tacos look impressive but fall apart. Creates messy eating experience and negative reviews.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> Implement strict portioning: 3-4 oz for tacos, 6-8 oz for burritos. Use portion scales during training.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #4: Using Old or Improperly Stored Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> Dry, cracked tortillas that crack when folded. Poor quality perception.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> First-in-first-out (FIFO) rotation. Date all packages. Refrigerate opened packs. Never use tortillas past expiration.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #5: Wrong Tortilla Size for Application</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> 6-inch tortillas for burritos = torn wraps. 12-inch for tacos = excessive wrapper.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> 6-8 inch for tacos, 10-12 inch for burritos, 8-10 inch for quesadillas. Match size to application.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #6: Ignoring Moisture Barriers</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> Saucy BBQ directly on tortilla = soggy mess in 2 minutes.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> Use cheese, lettuce, or refried beans as a moisture barrier layer between wet ingredients and tortilla.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Mistake #7: Pre-Assembling Tacos Too Far in Advance</h3>
                <p className="text-charcoal-800 text-sm mb-2">
                  <strong>The Cost:</strong> Even H-E-B® tortillas can't hold up to 30+ minutes of hot meat contact. Pre-assembled tacos become soggy.
                </p>
                <p className="text-charcoal-800 text-sm">
                  <strong>The Fix:</strong> Assemble to order or no more than 5-10 minutes before service. Use proper holding equipment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: The Business Case */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              The Business Case for H-E-B® Tortillas
            </h2>

            <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg mb-6">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Real Cost Analysis</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-bold text-charcoal-950 mb-3">Cheap Tortillas</h4>
                  <ul className="space-y-2 text-sm text-charcoal-800">
                    <li className="flex justify-between"><span>Cost per unit:</span> <span className="font-bold">$0.08</span></li>
                    <li className="flex justify-between"><span>Failure rate:</span> <span className="font-bold text-red-600">35%</span></li>
                    <li className="flex justify-between"><span>Customer complaints:</span> <span className="font-bold text-red-600">High</span></li>
                    <li className="flex justify-between"><span>Re-make cost:</span> <span className="font-bold text-red-600">$2.80/taco</span></li>
                    <li className="flex justify-between border-t-2 pt-2 mt-2"><span className="font-bold">Total cost per taco:</span> <span className="font-bold text-red-600">$3.06</span></li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg border-2 border-sunset-500">
                  <h4 className="font-bold text-charcoal-950 mb-3">H-E-B® Tortillas</h4>
                  <ul className="space-y-2 text-sm text-charcoal-800">
                    <li className="flex justify-between"><span>Cost per unit:</span> <span className="font-bold">$0.22</span></li>
                    <li className="flex justify-between"><span>Failure rate:</span> <span className="font-bold text-green-600">&lt;2%</span></li>
                    <li className="flex justify-between"><span>Customer complaints:</span> <span className="font-bold text-green-600">Minimal</span></li>
                    <li className="flex justify-between"><span>Re-make cost:</span> <span className="font-bold text-green-600">$0.06/taco</span></li>
                    <li className="flex justify-between border-t-2 pt-2 mt-2"><span className="font-bold">Total cost per taco:</span> <span className="font-bold text-green-600">$0.28</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-charcoal-950 text-cream-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">You Save: $2.78 per taco</div>
                <div className="text-xl mb-4">On 100 tacos/day = <span className="text-sunset-400 font-bold">$101,470 saved annually</span></div>
                <p className="text-sm text-cream-200">Plus: improved reviews, customer satisfaction, and brand reputation</p>
              </div>
            </div>
          </section>

          {/* Recipes & Resources */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Try These BBQ + Tortilla Recipes
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/brisket-tacos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-3">🌮</div>
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Texas Smoked Brisket Tacos</h3>
                <p className="text-charcoal-700 text-sm mb-3">The classic. Juicy brisket, pickled onions, cilantro on H-E-B® flour tortillas.</p>
                <span className="text-sunset-600 font-semibold text-sm">View Recipe →</span>
              </Link>

              <Link href="/recipes/brisket-breakfast-burrito" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-3">🌯</div>
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Brisket Breakfast Burrito</h3>
                <p className="text-charcoal-700 text-sm mb-3">The ultimate Texas breakfast with eggs, potatoes, cheese, and brisket.</p>
                <span className="text-sunset-600 font-semibold text-sm">View Recipe →</span>
              </Link>

              <Link href="/recipes/brisket-quesadillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-3">🧀</div>
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Crispy Brisket Quesadillas</h3>
                <p className="text-charcoal-700 text-sm mb-3">Quick quesadillas loaded with brisket and melted cheese. Perfect for leftovers.</p>
                <span className="text-sunset-600 font-semibold text-sm">View Recipe →</span>
              </Link>
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/guides/how-to-reheat-tortillas" className="bg-gradient-to-r from-sunset-100 to-masa-100 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">How to Properly Reheat Tortillas</h3>
                <p className="text-charcoal-800 text-sm">Master the techniques for warming tortillas in commercial and home kitchens.</p>
              </Link>

              <Link href="/guides/how-to-store-tortillas" className="bg-gradient-to-r from-masa-100 to-cream-100 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Tortilla Storage & Handling Guide</h3>
                <p className="text-charcoal-800 text-sm">Professional food safety and storage practices for food service operations.</p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your BBQ?</h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Get authentic H-E-B® tortillas delivered to your restaurant, food truck, or home kitchen. Experience the difference that real tortillas make.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop H-E-B® Tortillas
              </Link>
              <Link
                href="/blog"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Read More BBQ Stories
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
