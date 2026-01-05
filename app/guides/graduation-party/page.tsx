import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Graduation Party Taco Bar Guide - Celebrate the Graduate!',
  description: 'Plan the perfect graduation party taco bar! Complete guide with quantities for 25-150 guests, school color decorations, budget tips, and easy setup instructions.',
  keywords: 'graduation party food, graduation taco bar, high school graduation party, college graduation food, grad party menu, how much food for graduation party, graduation party ideas',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/graduation-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do I need for a graduation party of 50 people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 50 graduation party guests, plan 3 tacos per person (150 tacos total) requiring about 200 tortillas, 15-18 lbs of protein, and 5-6 lbs of each topping. Budget $6-12 per person for a DIY taco bar, making it an affordable option for feeding hungry graduates and their families.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is best for a graduation open house?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is ideal for graduation open houses because guests can serve themselves, it stays good for hours, accommodates dietary restrictions, and is budget-friendly. Set up a self-serve station with proteins, tortillas, and toppings so guests can build their own tacos as they come and go throughout the celebration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up a graduation taco bar on a budget?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To save money: make your own carnitas or shredded chicken (cheapest proteins), buy tortillas in bulk, prep toppings yourself, use disposable chafing dishes, and ask family to bring sides. A DIY graduation taco bar costs $6-10 per person vs $15-25 for catering.',
      },
    },
  ],
}

export default function GraduationPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-blue-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Graduation Party Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Celebrate their achievement with food everyone loves</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-graduation-party.webp"
            alt="Graduation party taco bar with festive decorations"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A graduation taco bar</strong> is perfect for open houses and parties because it's budget-friendly ($6-12/person DIY), serves crowds of any size, and keeps well for drop-in guests. Plan 3 tacos per person with 2 protein options. Easy to decorate in school colors!
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Graduation season means celebrating a major milestone—and feeding everyone who comes to congratulate the grad! Whether it's a backyard open house or a rented venue, a taco bar is the ultimate graduation party food: affordable, crowd-pleasing, and easy to scale for any guest count. Here's everything you need to know.
            </p>
          </div>

          {/* Why Taco Bars Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Why Tacos Are Perfect for Graduation Parties</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect for Open Houses</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">+</span>Self-serve means no catering staff needed</li>
                  <li><span className="text-green-500 mr-2">+</span>Food stays good for 2-4 hour events</li>
                  <li><span className="text-green-500 mr-2">+</span>Easy to replenish as guests arrive</li>
                  <li><span className="text-green-500 mr-2">+</span>Works indoors or outdoors</li>
                  <li><span className="text-green-500 mr-2">+</span>Guests love interactive food stations</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Budget-Friendly Facts</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-blue-500 mr-2">$</span>DIY costs $6-12 per person</li>
                  <li><span className="text-blue-500 mr-2">$</span>Feed 50 guests for $300-600</li>
                  <li><span className="text-blue-500 mr-2">$</span>Family can help prep to save more</li>
                  <li><span className="text-blue-500 mr-2">$</span>Leftovers are easy to use up</li>
                  <li><span className="text-blue-500 mr-2">$</span>No expensive rentals required</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Graduation Party Quantities Guide</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guests</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein (total)</th>
                    <th className="border px-4 py-3 text-center">Toppings</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">25 guests</td>
                    <td className="border px-4 py-3 text-center">100-125</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">2-3 lbs each</td>
                    <td className="border px-4 py-3 text-center">$150-300</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">50 guests</td>
                    <td className="border px-4 py-3 text-center">200-250</td>
                    <td className="border px-4 py-3 text-center">15-18 lbs</td>
                    <td className="border px-4 py-3 text-center">4-5 lbs each</td>
                    <td className="border px-4 py-3 text-center">$300-600</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">75 guests</td>
                    <td className="border px-4 py-3 text-center">300-375</td>
                    <td className="border px-4 py-3 text-center">22-28 lbs</td>
                    <td className="border px-4 py-3 text-center">6-8 lbs each</td>
                    <td className="border px-4 py-3 text-center">$450-900</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">100 guests</td>
                    <td className="border px-4 py-3 text-center">400-500</td>
                    <td className="border px-4 py-3 text-center">30-38 lbs</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs each</td>
                    <td className="border px-4 py-3 text-center">$600-1,200</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">150 guests</td>
                    <td className="border px-4 py-3 text-center">600-750</td>
                    <td className="border px-4 py-3 text-center">45-55 lbs</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs each</td>
                    <td className="border px-4 py-3 text-center">$900-1,800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY ingredient costs. For open houses with staggered attendance, you may need 20% less as not everyone eats at once.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Graduation Taco Bar Menu Ideas</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Crowd-Pleaser Proteins</h3>
                <p className="text-sm text-charcoal-600 mb-3">Budget-friendly options:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Shredded Chicken</strong> - Most affordable</li>
                  <li>• <strong>Carnitas</strong> - Pork shoulder, feeds many</li>
                  <li>• <strong>Ground Beef</strong> - Classic taco meat</li>
                  <li>• <strong>Barbacoa</strong> - Impressive, slow-cooked</li>
                  <li>• <strong>Black Beans</strong> - Vegetarian staple</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Essential Toppings</h3>
                <p className="text-sm text-charcoal-600 mb-3">Keep it simple but complete:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Shredded lettuce</li>
                  <li>• Diced tomatoes or pico</li>
                  <li>• Shredded cheese</li>
                  <li>• Sour cream</li>
                  <li>• Onion & cilantro</li>
                  <li>• Jalapeños</li>
                  <li>• Lime wedges</li>
                  <li>• Hot sauce & salsa</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-masa-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Tortilla Setup</h3>
                <p className="text-sm text-charcoal-600 mb-3">Offer variety:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link> - Traditional</li>
                  <li>• <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Flour tortillas</Link> - Soft & filling</li>
                  <li>• Taco shells for crunch lovers</li>
                  <li>• Keep warm in foil or warmers</li>
                  <li>• Stock 50/50 corn and flour</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Easy Side Dishes</h4>
              <p className="text-blue-700 text-sm">
                Round out the meal with chips & salsa, Mexican rice (make in bulk or buy pre-made), refried beans, corn salad, and a simple green salad. Ask family members to each bring one side to divide the work!
              </p>
            </div>
          </section>

          {/* School Colors Theme */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Decorating in School Colors</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Table & Display Ideas</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Tablecloths in school colors</li>
                  <li>• Color-coordinated napkins & plates</li>
                  <li>• Balloons and streamers</li>
                  <li>• Grad's photo display timeline</li>
                  <li>• "Class of [Year]" banner</li>
                  <li>• Diploma-shaped menu cards</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Food Presentation</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Serving bowls in school colors</li>
                  <li>• Labels with graduation cap icons</li>
                  <li>• "Build Your Future Taco" sign</li>
                  <li>• Photos of grad at food station</li>
                  <li>• Desserts with school colors frosting</li>
                  <li>• Table numbers as grad's photos by year</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Setup Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Easy Taco Bar Setup</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Layout Flow</h3>
                    <p className="text-charcoal-700">Set up in order: plates → tortillas → proteins → toppings → sauces → napkins/utensils. Place drinks and desserts at a separate station to avoid bottlenecks.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Keeping Food Warm</h3>
                    <p className="text-charcoal-700">Use disposable chafing dishes with Sterno cans for proteins—they're affordable and easy! Wrap tortillas in foil-lined towels or use a slow cooker on "warm" setting. Keep cold toppings on ice.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Label Everything</h3>
                    <p className="text-charcoal-700">Make cute signs in school colors! Label proteins (with allergy notes), spicy items, and vegetarian options. Guests shouldn't have to ask what's what.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assign a Helper</h3>
                    <p className="text-charcoal-700">Ask a family member or friend to "man" the taco bar—refilling items, keeping things tidy, and refreshing tortillas. This lets the grad's parents enjoy the party!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Graduation Party Prep Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Weeks Before</span>
                  <p className="text-charcoal-700">Finalize guest count, order tortillas, plan menu, order decorations in school colors.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">3 Days Before</span>
                  <p className="text-charcoal-700">Shop for all ingredients, start marinating/seasoning meats, make salsas.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Start slow-cooking carnitas/barbacoa, prep all toppings (dice, shred, chop), set up tables and decorations.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning Of</span>
                  <p className="text-charcoal-700">Finish cooking proteins, arrange toppings in bowls, warm tortillas, set up chafing dishes.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Hour Before</span>
                  <p className="text-charcoal-700">All food in place, toppings on ice, tortillas warming, final taste test and adjustments.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Party Time!</span>
                  <p className="text-charcoal-700">Enjoy the celebration! Refill items every 30-45 minutes. Celebrate the grad!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Budget Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Budget-Saving Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Save Money On:</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><span className="text-green-600 font-bold">•</span> Chicken thighs over breast (more flavor, less cost)</li>
                  <li><span className="text-green-600 font-bold">•</span> Pork shoulder for carnitas (cheap per pound)</li>
                  <li><span className="text-green-600 font-bold">•</span> Buy tortillas in bulk packs</li>
                  <li><span className="text-green-600 font-bold">•</span> Make your own pico and guacamole</li>
                  <li><span className="text-green-600 font-bold">•</span> Use potluck approach for sides</li>
                  <li><span className="text-green-600 font-bold">•</span> Borrow chafing dishes instead of renting</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Worth Spending On:</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><span className="text-blue-600 font-bold">•</span> Quality tortillas (guests notice!)</li>
                  <li><span className="text-blue-600 font-bold">•</span> Good salsa and hot sauce</li>
                  <li><span className="text-blue-600 font-bold">•</span> Fresh limes (make everything better)</li>
                  <li><span className="text-blue-600 font-bold">•</span> Cilantro (essential fresh herb)</li>
                  <li><span className="text-blue-600 font-bold">•</span> School-color themed decor</li>
                  <li><span className="text-blue-600 font-bold">•</span> Good quality napkins (you'll need lots)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Pro Tips for Success</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">For Open Houses</h3>
                <p className="text-charcoal-700 text-sm">If guests will be arriving throughout a 3-4 hour window, keep backup proteins warm in the kitchen. Refresh the buffet in shifts rather than putting everything out at once.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Photo Opportunities</h3>
                <p className="text-charcoal-700 text-sm">Set up a "taco photo booth" with props like oversized sunglasses, graduation caps, and fun signs. Guests love it, and it keeps them entertained while waiting for food.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Keep Tortillas Perfect</h3>
                <p className="text-charcoal-700 text-sm">Wrap stacks of 10 tortillas in foil and keep in a 200°F oven or cooler lined with towels. Cold tortillas = sad tacos. Assign someone to refresh them every 30 minutes.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Make It Memorable</h3>
                <p className="text-charcoal-700 text-sm">Create a "taco bar menu" with punny names like "Future So Bright" chicken tacos or "Class Act" carnitas. Small touches make the party special and Instagram-worthy.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I prep everything the day before?</h3>
                <p className="text-charcoal-700">Most things, yes! Cook and shred proteins, prep all toppings (store separately), and make salsas. Just don't cut avocados or mix guacamole until day-of. Morning of the party, just reheat proteins and assemble the display.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if my party is outside in hot weather?</h3>
                <p className="text-charcoal-700">Keep cold items on ice in shallow trays, use chafing dishes with lids for proteins, set up in shade if possible, and refresh food more frequently. Consider setting up indoors with guests eating outside.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I handle guests with food allergies?</h3>
                <p className="text-charcoal-700">Label everything clearly! Corn tortillas are naturally gluten-free, and you can easily offer dairy-free options. Keep serving utensils separate to avoid cross-contamination. Consider putting allergen-free options at the front of the line.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate the Graduate in Style!</h2>
            <p className="text-cream-200 mb-6">Get premium Texas tortillas delivered for your graduation celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
