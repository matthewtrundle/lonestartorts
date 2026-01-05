import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Corporate Taco Catering Guide - Office & Business Events',
  description: 'Plan corporate taco catering for your office! Complete guide with per-person pricing, dietary accommodations, meeting room setup, and professional service tips.',
  keywords: 'corporate taco catering, office catering tacos, business lunch catering, company taco bar, corporate event food, office party food ideas, team lunch catering, work event catering',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/corporate-catering',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does corporate taco catering cost per person?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Corporate taco catering typically costs $12-25 per person depending on service level. Basic drop-off service runs $12-16/person, full-service catering with staff is $18-25/person. DIY setup for internal events can cost as little as $8-12/person. Most caterers require minimums of 15-25 people.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tacos should I order per person for a work event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For corporate events, plan 2-3 tacos per person for lunch meetings (people eat lighter at work) and 3-4 tacos for evening events or celebrations. Always order 10-15% extra to ensure adequate food. For all-day conferences, budget 4-5 tacos per person across multiple meal times.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you accommodate dietary restrictions at corporate taco bars?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Taco bars naturally accommodate most diets: corn tortillas for gluten-free guests, black beans and grilled vegetables for vegetarians/vegans, and customizable toppings for those avoiding specific ingredients. Always label allergens, keep vegetarian options separate, and offer at least one protein, one vegetarian, and one vegan option.',
      },
    },
  ],
}

export default function CorporateCateringPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-charcoal-100">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Corporate Taco Catering Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Professional catering that impresses clients and teams</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-corporate-catering.webp"
            alt="Professional corporate taco bar setup"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-charcoal-100 border-l-4 border-charcoal-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Corporate taco catering</strong> costs $12-25 per person and works for team lunches, client meetings, company celebrations, and all-day conferences. Plan 2-3 tacos per person for lunch, offer vegetarian options, and label all allergens. Taco bars are interactive, budget-friendly, and universally loved.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Looking to cater your next office event, client meeting, or company celebration? Taco bars have become one of the most popular corporate catering options—they're crowd-pleasing, customizable, and work within most catering budgets. Here's your complete guide to planning professional taco catering.
            </p>
          </div>

          {/* Why Tacos Work for Corporate */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Why Tacos Work for Corporate Events</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Business Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">+</span>Budget-friendly at $12-25/person</li>
                  <li><span className="text-green-500 mr-2">+</span>Accommodates all dietary needs</li>
                  <li><span className="text-green-500 mr-2">+</span>Quick to serve (no plated service delays)</li>
                  <li><span className="text-green-500 mr-2">+</span>Interactive and memorable experience</li>
                  <li><span className="text-green-500 mr-2">+</span>Easy to scale from 10 to 500 people</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-charcoal-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect For</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-charcoal-500 mr-2">•</span>Team lunch meetings</li>
                  <li><span className="text-charcoal-500 mr-2">•</span>Client appreciation events</li>
                  <li><span className="text-charcoal-500 mr-2">•</span>Product launches</li>
                  <li><span className="text-charcoal-500 mr-2">•</span>All-hands meetings</li>
                  <li><span className="text-charcoal-500 mr-2">•</span>Holiday parties</li>
                  <li><span className="text-charcoal-500 mr-2">•</span>Training sessions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing Guide */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Corporate Catering Pricing Guide</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Service Level</th>
                    <th className="border px-4 py-3 text-center">Per Person</th>
                    <th className="border px-4 py-3 text-left">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">DIY / Self-Serve</td>
                    <td className="border px-4 py-3 text-center font-bold text-green-700">$8-12</td>
                    <td className="border px-4 py-3 text-sm">Food only, you set up and clean</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">Drop-Off Catering</td>
                    <td className="border px-4 py-3 text-center font-bold text-blue-700">$12-16</td>
                    <td className="border px-4 py-3 text-sm">Delivered and set up, disposables included</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">Full-Service Catering</td>
                    <td className="border px-4 py-3 text-center font-bold text-rust-700">$18-25</td>
                    <td className="border px-4 py-3 text-sm">Staff to serve, replenish, and clean up</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">Premium / Executive</td>
                    <td className="border px-4 py-3 text-center font-bold text-charcoal-700">$25-35</td>
                    <td className="border px-4 py-3 text-sm">White-glove service, premium proteins, elegant presentation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              Most caterers require 15-25 person minimums. Prices vary by location and protein choices. Request quotes from 2-3 vendors.
            </p>
          </section>

          {/* Quantities Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Office Event Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Team Size</th>
                    <th className="border px-4 py-3 text-center">Tacos</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Est. Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">15 people</td>
                    <td className="border px-4 py-3 text-center">35-45</td>
                    <td className="border px-4 py-3 text-center">50-60</td>
                    <td className="border px-4 py-3 text-center">5-6 lbs</td>
                    <td className="border px-4 py-3 text-center">$180-375</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">25 people</td>
                    <td className="border px-4 py-3 text-center">60-75</td>
                    <td className="border px-4 py-3 text-center">80-100</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">$300-625</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">50 people</td>
                    <td className="border px-4 py-3 text-center">125-150</td>
                    <td className="border px-4 py-3 text-center">160-200</td>
                    <td className="border px-4 py-3 text-center">15-18 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-1,250</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">100 people</td>
                    <td className="border px-4 py-3 text-center">250-300</td>
                    <td className="border px-4 py-3 text-center">320-400</td>
                    <td className="border px-4 py-3 text-center">30-36 lbs</td>
                    <td className="border px-4 py-3 text-center">$1,200-2,500</td>
                  </tr>
                  <tr className="hover:bg-charcoal-100">
                    <td className="border px-4 py-3 font-medium">200 people</td>
                    <td className="border px-4 py-3 text-center">500-600</td>
                    <td className="border px-4 py-3 text-center">640-800</td>
                    <td className="border px-4 py-3 text-center">60-72 lbs</td>
                    <td className="border px-4 py-3 text-center">$2,400-5,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Based on $12-25/person. Lunch meetings use lower end (2-3 tacos), evening events use higher end (3-4 tacos).
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Professional Menu Options</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Standard Package</h3>
                <p className="text-sm text-charcoal-600 mb-3">Best for team lunches:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Grilled chicken</li>
                  <li>• Seasoned ground beef</li>
                  <li>• Black beans (vegetarian)</li>
                  <li>• Flour & corn tortillas</li>
                  <li>• Standard toppings bar</li>
                  <li>• Chips & salsa</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Premium Package</h3>
                <p className="text-sm text-charcoal-600 mb-3">Client meetings:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></li>
                  <li>• Carne asada</li>
                  <li>• Chicken tinga</li>
                  <li>• Grilled vegetables</li>
                  <li>• Fresh guacamole</li>
                  <li>• Mexican rice & beans</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rust-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Executive Package</h3>
                <p className="text-sm text-charcoal-600 mb-3">Special occasions:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria tacos</Link> w/ consomé</li>
                  <li>• Grilled shrimp</li>
                  <li>• Barbacoa</li>
                  <li>• Al pastor</li>
                  <li>• Table-side guacamole</li>
                  <li>• Premium desserts</li>
                </ul>
              </div>
            </div>

            <div className="bg-charcoal-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">Dietary Accommodation Checklist</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm text-charcoal-700">
                <div>
                  <strong>Gluten-Free:</strong>
                  <p>Corn tortillas, check seasoning labels</p>
                </div>
                <div>
                  <strong>Vegetarian:</strong>
                  <p>Black beans, grilled veggies</p>
                </div>
                <div>
                  <strong>Vegan:</strong>
                  <p>Beans, veggies, skip cheese/sour cream</p>
                </div>
                <div>
                  <strong>Low-Carb:</strong>
                  <p>Taco bowls, lettuce wraps</p>
                </div>
              </div>
            </div>
          </section>

          {/* Setup Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Conference Room Setup</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-charcoal-200 text-charcoal-700 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Table Layout</h3>
                    <p className="text-charcoal-700">Set up buffet against a wall or in a corner to maximize meeting space. Flow: plates → tortillas → proteins → toppings → sauces → napkins/utensils. Consider traffic flow for larger groups.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-charcoal-200 text-charcoal-700 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Professional Labeling</h3>
                    <p className="text-charcoal-700">Print clean labels for each item including allergen information. Use tent cards for proteins: "Grilled Chicken (GF)" or "Black Beans (V, VG, GF)". Your admin team will appreciate the organization.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-charcoal-200 text-charcoal-700 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Temperature Control</h3>
                    <p className="text-charcoal-700">Request chafing dishes or heating trays from your caterer. Keep tortillas wrapped and warm. Cold toppings should be on ice if the event lasts more than 2 hours.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-charcoal-200 text-charcoal-700 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cleanup Planning</h3>
                    <p className="text-charcoal-700">Set up a designated trash/recycling area. Have extra napkins available at eating tables. For drop-off service, know when the caterer returns for equipment pickup.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Event Type Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Catering by Event Type</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Lunch Meetings</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><strong>Timing:</strong> Food arrives 15 min before meeting</li>
                  <li><strong>Quantity:</strong> 2-3 tacos per person</li>
                  <li><strong>Style:</strong> Drop-off works well</li>
                  <li><strong>Tip:</strong> Keep it quick and efficient</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Client Events</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><strong>Service:</strong> Full-service recommended</li>
                  <li><strong>Menu:</strong> Premium package</li>
                  <li><strong>Presentation:</strong> Elevate with real dishes</li>
                  <li><strong>Tip:</strong> Staff to manage the bar</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">All-Day Conferences</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><strong>Service:</strong> Staggered service times</li>
                  <li><strong>Quantity:</strong> 4-5 tacos/person total</li>
                  <li><strong>Style:</strong> Breakfast tacos + lunch tacos</li>
                  <li><strong>Tip:</strong> Refresh midday with new options</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Company Celebrations</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li><strong>Timing:</strong> Evening events more casual</li>
                  <li><strong>Quantity:</strong> 3-4 tacos per person</li>
                  <li><strong>Extras:</strong> Add margarita bar, desserts</li>
                  <li><strong>Tip:</strong> Full-service for stress-free party</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Vendor Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Questions to Ask Your Caterer</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-charcoal-950 mb-3">Before Booking:</h3>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• What's included in the per-person price?</li>
                    <li>• What's your minimum order?</li>
                    <li>• Do you provide serving equipment?</li>
                    <li>• Can you accommodate dietary restrictions?</li>
                    <li>• Is setup and cleanup included?</li>
                    <li>• What's your cancellation policy?</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal-950 mb-3">Logistics:</h3>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• When will you arrive to set up?</li>
                    <li>• Do you need access to kitchen/power?</li>
                    <li>• How long will food stay warm?</li>
                    <li>• Will you replenish during the event?</li>
                    <li>• When do you pick up equipment?</li>
                    <li>• Do you handle leftovers packaging?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-600 pb-2">Corporate Catering Pro Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Order 15% Extra</h3>
                <p className="text-charcoal-700 text-sm">Office events always have walk-ins and big eaters. Better to have leftovers (which staff will happily take home) than run out mid-event.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Send Menu Ahead</h3>
                <p className="text-charcoal-700 text-sm">Email the menu to attendees beforehand so people with restrictions can plan. Include allergen information and vegetarian/vegan options.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Have a Backup Plan</h3>
                <p className="text-charcoal-700 text-sm">Confirm your order 48 hours before. Have your caterer's cell phone number. Know a backup delivery option just in case.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Building Access</h3>
                <p className="text-charcoal-700 text-sm">Alert security/reception about the delivery. Reserve elevator access if needed. Provide clear instructions for the caterer to find your space.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How far in advance should I book corporate catering?</h3>
                <p className="text-charcoal-700">For most caterers, 1-2 weeks notice is ideal. For large events (100+ people) or premium caterers, book 3-4 weeks ahead. Same-day and next-day service is possible with some vendors but limits your options.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I do a taco bar for a breakfast meeting?</h3>
                <p className="text-charcoal-700">Absolutely! Breakfast taco bars are extremely popular. Offer <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">scrambled eggs with chorizo</Link>, bacon, potato, and beans. Include salsa, cheese, and hot sauce. Coffee service sold separately by most caterers.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if someone has a severe allergy?</h3>
                <p className="text-charcoal-700">Communicate all severe allergies to your caterer in advance. They can prepare allergen-free portions separately. For life-threatening allergies, consider having that person's food prepared in a dedicated kitchen or ordering them a separate meal.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-charcoal-800 to-charcoal-950 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Premium Tortillas for Your Corporate Event</h2>
            <p className="text-cream-300 mb-6">Impress clients and teams with authentic Texas tortillas.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale Inquiry</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Calculate Quantities</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
