import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Wedding Taco Bar Guide - How to Plan the Perfect Reception',
  description: 'Plan the perfect wedding taco bar! Complete guide with quantities for 100-300 guests, menu ideas, elegant presentation tips, budget breakdown, and vendor coordination.',
  keywords: 'wedding taco bar, taco bar wedding reception, wedding catering tacos, how many tacos for 100 guests, wedding taco station, rustic wedding food, wedding reception food ideas, taco bar cost per person',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/wedding-taco-bar',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many tacos do I need for a wedding of 100 guests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 100 wedding guests, plan 3-4 tacos per person for a main course, totaling 300-400 tacos. This means approximately 400-500 tortillas (some guests take extras), 25-30 lbs of protein, and proportional toppings. Always order 15-20% extra for hungry guests and seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a wedding taco bar cost per person?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DIY wedding taco bar costs $8-15 per person for ingredients. Hiring a taco caterer ranges from $15-35 per person depending on proteins and service level. A food truck costs $18-28 per person. This is significantly less than traditional wedding catering at $50-150 per person.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a taco bar appropriate for a wedding reception?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Taco bars are increasingly popular for weddings because they accommodate dietary restrictions, encourage guest interaction, work for casual to semi-formal events, and are budget-friendly. The key is elegant presentation with proper serving equipment and premium ingredients.',
      },
    },
  ],
}

export default function WeddingTacoBarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Wedding Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Create an unforgettable reception your guests will love</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-wedding-taco-bar.webp"
            alt="Elegant wedding taco bar setup with beautiful presentation"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A wedding taco bar</strong> is a crowd-pleasing, budget-friendly reception option that accommodates all dietary needs. Plan 3-4 tacos per guest, offer 2-3 protein options, and present everything elegantly with proper chafing dishes and signage. Cost ranges from $8-35 per person depending on DIY vs catered service.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Taco bars have become one of the hottest wedding food trends—and for good reason. They're interactive, customizable, and can be as casual or elegant as your wedding style. Plus, they cost a fraction of traditional plated dinners while feeding guests delicious, memorable food. Here's your complete guide to planning the perfect wedding taco bar.
            </p>
          </div>

          {/* Why Taco Bars Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Why Couples Choose Wedding Taco Bars</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Pros</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">+</span>50-70% cheaper than traditional catering</li>
                  <li><span className="text-green-500 mr-2">+</span>Accommodates vegetarian, vegan, gluten-free easily</li>
                  <li><span className="text-green-500 mr-2">+</span>Interactive experience guests remember</li>
                  <li><span className="text-green-500 mr-2">+</span>No complicated seating for plated service</li>
                  <li><span className="text-green-500 mr-2">+</span>Works for 50-500+ guests</li>
                  <li><span className="text-green-500 mr-2">+</span>Perfect for outdoor/rustic venues</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Things to Consider</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-yellow-500 mr-2">!</span>Needs proper warming equipment</li>
                  <li><span className="text-yellow-500 mr-2">!</span>Lines can form at peak times</li>
                  <li><span className="text-yellow-500 mr-2">!</span>May not suit ultra-formal venues</li>
                  <li><span className="text-yellow-500 mr-2">!</span>Requires napkins everywhere</li>
                  <li><span className="text-yellow-500 mr-2">!</span>Some venues have catering restrictions</li>
                  <li><span className="text-yellow-500 mr-2">!</span>Keep tortillas warm throughout</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Wedding Taco Bar Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guests</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein (total)</th>
                    <th className="border px-4 py-3 text-center">Toppings</th>
                    <th className="border px-4 py-3 text-center">Estimated Cost*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">50 guests</td>
                    <td className="border px-4 py-3 text-center">200-250</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs</td>
                    <td className="border px-4 py-3 text-center">3-4 lbs each</td>
                    <td className="border px-4 py-3 text-center">$400-750</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">100 guests</td>
                    <td className="border px-4 py-3 text-center">400-500</td>
                    <td className="border px-4 py-3 text-center">25-30 lbs</td>
                    <td className="border px-4 py-3 text-center">6-8 lbs each</td>
                    <td className="border px-4 py-3 text-center">$800-1,500</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">150 guests</td>
                    <td className="border px-4 py-3 text-center">600-750</td>
                    <td className="border px-4 py-3 text-center">38-45 lbs</td>
                    <td className="border px-4 py-3 text-center">9-12 lbs each</td>
                    <td className="border px-4 py-3 text-center">$1,200-2,250</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">200 guests</td>
                    <td className="border px-4 py-3 text-center">800-1000</td>
                    <td className="border px-4 py-3 text-center">50-60 lbs</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs each</td>
                    <td className="border px-4 py-3 text-center">$1,600-3,000</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">300 guests</td>
                    <td className="border px-4 py-3 text-center">1200-1500</td>
                    <td className="border px-4 py-3 text-center">75-90 lbs</td>
                    <td className="border px-4 py-3 text-center">18-22 lbs each</td>
                    <td className="border px-4 py-3 text-center">$2,400-4,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY ingredient costs only. Add $500-2000+ for equipment rental and staff. Professional catering adds $10-20/person.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Wedding Taco Bar Menu Ideas</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Protein Options</h3>
                <p className="text-sm text-charcoal-600 mb-3">Offer 2-3 choices:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Carnitas</strong> - Slow-roasted pulled pork</li>
                  <li>• <strong>Carne Asada</strong> - Grilled steak</li>
                  <li>• <strong>Chicken Tinga</strong> - Shredded chipotle chicken</li>
                  <li>• <strong>Barbacoa</strong> - Braised beef</li>
                  <li>• <strong>Grilled Fish</strong> - For upscale option</li>
                  <li>• <strong>Black Beans</strong> - Vegetarian option</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Toppings Bar</h3>
                <p className="text-sm text-charcoal-600 mb-3">Essential toppings:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Pico de gallo</li>
                  <li>• Guacamole</li>
                  <li>• Shredded lettuce</li>
                  <li>• Diced onion & cilantro</li>
                  <li>• Shredded cheese</li>
                  <li>• Sour cream</li>
                  <li>• Lime wedges</li>
                  <li>• Pickled jalapeños</li>
                  <li>• Salsa verde & roja</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-masa-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Tortillas</h3>
                <p className="text-sm text-charcoal-600 mb-3">Offer both types:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link> - Authentic, gluten-free</li>
                  <li>• <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Flour tortillas</Link> - Soft, holds more</li>
                  <li>• Keep warm in tortilla warmers</li>
                  <li>• Refresh every 20-30 minutes</li>
                  <li>• 60% corn / 40% flour split</li>
                </ul>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h4 className="font-bold text-pink-800 mb-2">Elegant Upgrade Ideas</h4>
              <p className="text-pink-700 text-sm">
                For upscale weddings: Add <Link href="/recipes/birria-tacos" className="underline">birria tacos</Link> with consomé dipping station, grilled lobster or shrimp tacos, fresh ceviche tostadas, or a late-night taco station after dancing.
              </p>
            </div>
          </section>

          {/* Setup Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">How to Set Up Your Wedding Taco Bar</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Station Layout</h3>
                    <p className="text-charcoal-700">Set up in logical flow: plates → tortillas → proteins → toppings → sauces → napkins. Consider two identical stations for 100+ guests to prevent lines. Leave 6-8 feet of space for guest flow.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Equipment Needs</h3>
                    <p className="text-charcoal-700">Rent chafing dishes with Sterno for proteins, electric tortilla warmers or insulated containers, ice trays for cold toppings (guac, pico, sour cream), and elegant serving bowls that match your wedding decor.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Signage & Labels</h3>
                    <p className="text-charcoal-700">Create elegant signs matching your wedding theme. Label all proteins (include allergens), mark spicy items with chili icons, note vegetarian/vegan/gluten-free options. Guests shouldn't have to guess.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Staffing the Bar</h3>
                    <p className="text-charcoal-700">Hire at least 2-3 people to manage the station: replenishing food, keeping tortillas warm, answering questions, and maintaining cleanliness. This is NOT a job for wedding guests or bridal party.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Wedding Day Taco Bar Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Weeks Before</span>
                  <p className="text-charcoal-700">Finalize guest count, confirm caterer/food truck, order specialty tortillas, rent equipment.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Days Before</span>
                  <p className="text-charcoal-700">Confirm all deliveries, prep any make-ahead items (marinades, salsas), create signage.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Start slow-cooking meats (carnitas, barbacoa), prep all toppings, set up any equipment that can go early.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">4 Hours Before</span>
                  <p className="text-charcoal-700">Begin final cooking, warm tortillas, set up taco bar station at venue, arrange decor.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Hour Before</span>
                  <p className="text-charcoal-700">All food in chafing dishes, toppings on ice, tortillas warming, final quality check.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Reception!</span>
                  <p className="text-charcoal-700">Open taco bar after cocktail hour. Staff continuously replenishes for 2-3 hours of service.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Wedding Taco Bar Cost Comparison</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">DIY Taco Bar</h3>
                <p className="text-3xl font-bold text-green-700 mb-2">$8-15/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Ingredient costs only</li>
                  <li>+ Full control over quality</li>
                  <li>- Requires helpers to run</li>
                  <li>- Equipment rental extra</li>
                  <li>- Stressful on wedding day</li>
                </ul>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Taco Caterer</h3>
                <p className="text-3xl font-bold text-pink-700 mb-2">$18-35/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Full service included</li>
                  <li>+ Professional presentation</li>
                  <li>+ Staff handles everything</li>
                  <li>- Less customizable</li>
                  <li>- Must use their menu</li>
                </ul>
              </div>

              <div className="bg-masa-50 p-6 rounded-lg border-2 border-masa-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Food Truck</h3>
                <p className="text-3xl font-bold text-masa-700 mb-2">$20-30/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Fun, unique experience</li>
                  <li>+ Self-contained setup</li>
                  <li>+ Great for outdoor venues</li>
                  <li>- Weather dependent</li>
                  <li>- May have minimums</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-charcoal-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">For Comparison: Traditional Wedding Catering</h4>
              <p className="text-charcoal-700">Plated dinner service typically costs $75-200+ per person. A taco bar can save couples $5,000-15,000+ on a 150-guest wedding while still providing delicious, memorable food.</p>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Pro Tips for Wedding Taco Bars</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Do a Tasting First</h3>
                <p className="text-charcoal-700 text-sm">If hiring a caterer or food truck, schedule a tasting 2-3 months before. Adjust seasoning, spice levels, and presentation to match your vision.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Late-Night Tacos</h3>
                <p className="text-charcoal-700 text-sm">Bring out fresh tacos after dancing for a late-night snack. Guests LOVE this. Budget an extra 1-2 tacos per person for the late-night crowd.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Keep Tortillas HOT</h3>
                <p className="text-charcoal-700 text-sm">Cold tortillas ruin the experience. Invest in proper warmers and assign someone to refresh them every 20-30 minutes throughout service.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Venue Communication</h3>
                <p className="text-charcoal-700 text-sm">Confirm your venue allows outside food/caterers. Ask about power outlets, kitchen access, and where the taco bar can be positioned.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I have a taco bar at a formal wedding?</h3>
                <p className="text-charcoal-700">Yes! Elevate the presentation with premium proteins (like lobster or <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">birria</Link>), elegant serving dishes, professional signage, and white-gloved staff. Many upscale venues now feature "elevated street food" stations.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I handle dietary restrictions?</h3>
                <p className="text-charcoal-700">Taco bars naturally accommodate most diets: corn tortillas for gluten-free, black beans for vegetarian/vegan, and separate utensils for allergen concerns. Label everything clearly and consider a dedicated allergen-free station for severe allergies.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if my venue doesn't allow outside caterers?</h3>
                <p className="text-charcoal-700">Ask if the venue's caterer can prepare a taco bar. Many venues will accommodate the request or allow a food truck in the parking area. Some couples host the taco bar at a separate after-party location.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Plan Your Dream Wedding Taco Bar</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas delivered for your special day.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale for Events</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
