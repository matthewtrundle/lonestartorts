import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Planning the Ultimate Texas Event: From Brisket Tacos to Bar Service',
  description: 'Complete guide to planning authentic Texas events with H-E-B® tortillas, BBQ catering, and professional bar service. Expert tips for taco bars, alcohol delivery, and creating unforgettable Austin celebrations.',
  keywords: 'Texas event planning, Austin party planning, taco bar catering, BBQ event catering, alcohol delivery Austin, party planning guide, H-E-B tortillas events, Texas party food',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/texas-event-planning-guide',
  },
  openGraph: {
    title: 'Planning the Ultimate Texas Event: From Brisket Tacos to Bar Service',
    description: 'Complete guide to authentic Texas event planning with taco bars, BBQ catering, and professional alcohol delivery.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Planning the Ultimate Texas Event: From Brisket Tacos to Bar Service',
  description: 'Complete guide to planning authentic Texas events with H-E-B® tortillas, BBQ catering, and professional bar service.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-06',
  dateModified: '2025-11-06',
  articleSection: 'Business & Culture',
};

export default function TexasEventPlanningGuidePage() {
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
                { label: 'Texas Event Planning Guide' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Business & Culture</span>
              <span>•</span>
              <span>November 6, 2025</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Planning the Ultimate Texas Event: From Brisket Tacos to Bar Service</h1>
            <p className="text-cream-300 mt-4 text-lg">Your complete guide to authentic Texas event planning—taco bars, BBQ catering, and professional alcohol delivery</p>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-sunset-600 to-sunset-800">
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Texas Event Planning Hero Image
            </div>
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2025-11-06" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800 italic">
                &quot;Planning a Texas event is about more than just food and drinks—it&apos;s about creating an experience that captures the heart of Austin&apos;s hospitality. When you combine authentic H-E-B® tortillas with quality BBQ and professional bar service, magic happens.&quot; — Sarah Martinez, Austin Event Planner
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Texas Party Experience: Where Food Meets Hospitality</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Whether you&apos;re planning a corporate gathering, wedding reception, birthday celebration, or backyard BBQ in Austin, there&apos;s a certain standard that Texans expect: genuine hospitality, quality food, and an atmosphere that makes everyone feel at home.
                </p>
                <p>
                  After helping dozens of Austin businesses and families plan memorable events, we&apos;ve learned that the most successful Texas gatherings share three key elements: a well-executed food station (usually featuring tacos or BBQ), thoughtful beverage service, and attention to the little details that show you care.
                </p>
                <p>
                  This guide breaks down everything you need to know to plan an authentic Texas event that your guests will be talking about long after the last taco is gone.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Part 1: Building the Perfect Taco Bar</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  A taco bar is the centerpiece of many Texas events, and for good reason—it&apos;s interactive, customizable, and universally loved. But the difference between a mediocre taco bar and one that has guests going back for thirds comes down to quality ingredients.
                </p>
                <p>
                  <strong>Start with Authentic Tortillas</strong>
                </p>
                <p>
                  Your tortilla choice sets the foundation for everything else. Using authentic{' '}
                  <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                    H-E-B® tortillas
                  </Link>
                  {' '}immediately elevates your taco bar above typical catering. Here&apos;s what you need to know:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Quantity Planning:</strong> Budget 3-4 tacos per person for a main course, 2-3 for appetizers. That means one 20-pack of H-E-B® tortillas serves 5-7 people for a meal.</li>
                  <li><strong>Variety Matters:</strong> Offer both{' '}
                    <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                      flour and corn tortillas
                    </Link>
                    . Flour works better for heavier fillings like brisket, while corn pairs beautifully with lighter proteins like grilled chicken or fish.
                  </li>
                  <li><strong>The Butter Upgrade:</strong> For VIP events or when you really want to impress,{' '}
                    <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                      H-E-B® Butter Tortillas
                    </Link>
                    {' '}add a rich, premium touch that guests notice immediately.
                  </li>
                  <li><strong>Warming Strategy:</strong> Keep tortillas warm in a slow cooker lined with damp paper towels, or use chafing dishes. Cold tortillas are a party foul.</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Taco Bar Protein & Toppings Checklist</h2>
              <div className="text-charcoal-800 space-y-6">
                <div className="bg-masa-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Protein Options (Choose 2-3)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Smoked brisket (chopped or sliced)</li>
                    <li>Pulled pork with vinegar slaw</li>
                    <li>Seasoned ground beef</li>
                    <li>Grilled chicken with lime marinade</li>
                    <li>Carnitas (slow-cooked pork)</li>
                    <li>Vegetarian option: Grilled portobello or black beans</li>
                  </ul>
                </div>

                <div className="bg-masa-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Essential Toppings Station</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Shredded cheese (Mexican blend and cotija)</li>
                    <li>Pico de gallo</li>
                    <li>Guacamole</li>
                    <li>Sour cream</li>
                    <li>Pickled jalapeños and red onions</li>
                    <li>Fresh cilantro and lime wedges</li>
                    <li>Hot sauces (mild, medium, hot)</li>
                  </ul>
                </div>

                <div className="bg-masa-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Pro Setup Tips</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Arrange toppings in the order guests will build their tacos</li>
                    <li>Use clear labels for each item (dietary restrictions matter)</li>
                    <li>Place proteins at the beginning, toppings in the middle, sauces at the end</li>
                    <li>Keep napkins and plates at both ends of the line</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Part 2: BBQ Catering Essentials</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  If you&apos;re going the full BBQ route instead of (or in addition to) a taco bar, here&apos;s what separates amateur cookouts from professional-grade events:
                </p>
                <p>
                  <strong>Meat Quantity Calculator</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Brisket:</strong> 1/3 to 1/2 pound per person (accounts for trimming)</li>
                  <li><strong>Pulled Pork:</strong> 1/3 pound per person</li>
                  <li><strong>Ribs:</strong> 1/2 rack per person for mains, 2-3 ribs for appetizers</li>
                  <li><strong>Sausage:</strong> 2 links per person</li>
                  <li><strong>Chicken:</strong> 1/2 bird or 2 quarters per person</li>
                </ul>
                <p>
                  <strong>Sides That Complete the Experience</strong>
                </p>
                <p>
                  Great BBQ needs great sides. Don&apos;t skimp here—budget at least two sides per person:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Classic coleslaw (vinegar-based or creamy)</li>
                  <li>Pinto beans or cowboy beans</li>
                  <li>Potato salad (mustard or mayo-based)</li>
                  <li>Mac and cheese</li>
                  <li>Jalapeño cornbread</li>
                  <li>Pickles, onions, and jalapeños for garnish</li>
                </ul>
                <p>
                  <strong>The Tortilla Connection</strong>
                </p>
                <p>
                  Even at a traditional BBQ event, smart hosts provide a stack of{' '}
                  <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                    H-E-B® tortillas
                  </Link>
                  {' '}alongside the standard white bread. Many guests prefer wrapping their brisket in a tortilla, and it&apos;s become expected at Austin events. Check out our detailed guide on{' '}
                  <Link href="/blog/bbq-meets-tortillas" className="text-sunset-600 hover:underline font-medium">
                    why BBQ and tortillas are the perfect pairing
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Part 3: Bar Setup & Professional Alcohol Delivery</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Food is only half the equation. A well-stocked bar can make or break the energy of your event. The challenge? Navigating liquor store runs, keeping drinks cold, and ensuring you have enough variety without overbuying.
                </p>
                <p>
                  <strong>The Smart Solution: Professional Alcohol Delivery</strong>
                </p>
                <p>
                  One of the biggest game-changers for Austin event planning has been the rise of professional alcohol delivery services. Instead of making multiple liquor store trips (and inevitably forgetting something), you can have everything delivered directly to your venue.
                </p>
                <p>
                  We partner with{' '}
                  <a
                    href="https://partyondelivery.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sunset-600 hover:underline font-medium"
                  >
                    Party on Delivery
                  </a>
                  , Austin&apos;s premier alcohol delivery service, for events that need reliable beverage logistics. Here&apos;s why professional delivery makes sense:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Convenience:</strong> Everything arrives at your venue, cold and ready to serve. No loading cases into your car or dealing with parking at busy liquor stores.</li>
                  <li><strong>Selection:</strong> Access to a full range of beer, wine, spirits, and mixers through one order. Get exactly what you need for your crowd.</li>
                  <li><strong>Timing Control:</strong> Schedule delivery for exactly when you need it, whether that&apos;s early morning setup or last-minute restocking during the event.</li>
                  <li><strong>Expert Recommendations:</strong> Not sure how much to order? Professional alcohol delivery services can guide you based on your guest count and event type.</li>
                  <li><strong>Temperature Guarantee:</strong> Beer and wine arrive properly chilled, saving you precious cooler space and prep time.</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Bar Quantity Planning Guide</h2>
              <div className="text-charcoal-800 space-y-6">
                <p>
                  Whether you&apos;re ordering through delivery or picking up yourself, here&apos;s the standard formula for stocking your bar:
                </p>
                <div className="bg-sunset-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Standard Event (50 guests, 4 hours)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Beer:</strong> 100-120 bottles/cans (mix of domestic, craft, and light options)</li>
                    <li><strong>Wine:</strong> 12-15 bottles (60% red, 40% white for Texas climate)</li>
                    <li><strong>Spirits:</strong> 2-3 bottles each of vodka, tequila, whiskey, rum</li>
                    <li><strong>Mixers:</strong> Soda, tonic water, cranberry juice, lime juice, simple syrup</li>
                    <li><strong>Garnishes:</strong> Limes, lemons, olives, cocktail onions</li>
                    <li><strong>Non-Alcoholic:</strong> Iced tea, lemonade, sparkling water (very important in Texas heat)</li>
                  </ul>
                </div>
                <div className="bg-masa-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Signature Cocktail Strategy</h3>
                  <p className="mb-3">
                    Instead of a full open bar, consider offering 1-2 signature cocktails that complement your menu. This simplifies logistics and creates a memorable touch:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>With Taco Bar:</strong> Classic margaritas (rocks or frozen), Mexican beer with lime</li>
                    <li><strong>With BBQ:</strong> Whiskey-based cocktails, bourbon lemonade, craft beer selection</li>
                    <li><strong>Summer Events:</strong> Ranch water, palomas, spiked agua fresca</li>
                    <li><strong>Fall/Winter:</strong> Spiced apple cider cocktails, hot toddies, mulled wine</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Complete Event Planning Checklist</h2>
              <div className="text-charcoal-800 space-y-6">
                <div className="bg-charcoal-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">6-8 Weeks Before Event</h3>
                  <ul className="space-y-1">
                    <li>☐ Finalize guest count and dietary restrictions</li>
                    <li>☐ Choose food format (taco bar, BBQ, or both)</li>
                    <li>☐ Book venue (if not at home)</li>
                    <li>☐ Reserve any equipment rentals (tables, chairs, tents)</li>
                    <li>☐ Plan beverage strategy (self-service vs. bartender)</li>
                  </ul>
                </div>

                <div className="bg-charcoal-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">2-3 Weeks Before Event</h3>
                  <ul className="space-y-1">
                    <li>☐ Order{' '}
                      <Link href="/shop" className="text-sunset-600 hover:underline font-medium">
                        H-E-B® tortillas
                      </Link>
                      {' '}(calculate quantities: 3-4 per person)
                    </li>
                    <li>☐ Confirm BBQ catering order or plan cook schedule</li>
                    <li>☐ Calculate alcohol needs and set up delivery</li>
                    <li>☐ Order non-alcoholic beverages</li>
                    <li>☐ Arrange for ice (1-1.5 lbs per person)</li>
                  </ul>
                </div>

                <div className="bg-charcoal-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Week of Event</h3>
                  <ul className="space-y-1">
                    <li>☐ Confirm all delivery times (food, alcohol, rentals)</li>
                    <li>☐ Shop for toppings, sides, and garnishes</li>
                    <li>☐ Prep any homemade items (salsas, sides, desserts)</li>
                    <li>☐ Set up serving stations and test equipment</li>
                    <li>☐ Create signage for food stations and bar</li>
                  </ul>
                </div>

                <div className="bg-charcoal-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Day of Event</h3>
                  <ul className="space-y-1">
                    <li>☐ Set up tables, chairs, and decorations early</li>
                    <li>☐ Receive and organize all deliveries</li>
                    <li>☐ Prepare ice stations and coolers</li>
                    <li>☐ Warm tortillas 30 minutes before serving</li>
                    <li>☐ Set out all toppings and condiments</li>
                    <li>☐ Stock bar with ice, garnishes, and tools</li>
                    <li>☐ Do final walkthrough 1 hour before guests arrive</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Common Event Planning Mistakes to Avoid</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  After seeing dozens of events, here are the most common pitfalls:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Underestimating Appetites:</strong> Texans eat. Budget 20% more food than your calculator suggests, especially for BBQ.</li>
                  <li><strong>Forgetting About Vegetarians:</strong> Even BBQ-heavy events should have at least one substantial vegetarian option.</li>
                  <li><strong>Neglecting the Ice Situation:</strong> You need way more ice than you think. Plan for 1-1.5 pounds per person, more in summer.</li>
                  <li><strong>Not Testing Your Setup:</strong> Do a dry run of your taco bar or buffet line. Is traffic flow smooth? Can people reach everything?</li>
                  <li><strong>Cheap Tortillas:</strong> This one&apos;s obvious to us, but worth repeating: discount grocery store tortillas will fall apart under BBQ weight and disappoint guests.</li>
                  <li><strong>Last-Minute Alcohol Runs:</strong> Running out of beer mid-party kills the vibe. Order extra or have a backup delivery ready.</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Budget-Friendly Tips for Memorable Events</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Great Texas events don&apos;t have to break the bank:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Focus Your Menu:</strong> Two protein options instead of four, but do them exceptionally well</li>
                  <li><strong>Strategic Bar Planning:</strong> Signature cocktails + beer + wine = 90% of guests happy at 50% the cost of a full bar</li>
                  <li><strong>DIY Decorations:</strong> String lights, mason jars, and wildflowers create authentic Texas atmosphere for minimal cost</li>
                  <li><strong>Bulk Smart:</strong> H-E-B® tortillas are already affordable, and buying in larger quantities reduces per-person cost</li>
                  <li><strong>Timing Matters:</strong> Afternoon events naturally require less alcohol than evening parties</li>
                  <li><strong>Potluck Sides:</strong> For casual events, have guests bring their favorite side dishes while you handle proteins and tortillas</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <div className="bg-gradient-to-r from-sunset-50 to-masa-50 p-8 rounded-lg border-l-4 border-sunset-500">
                <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Partnership Transparency</h2>
                <div className="text-charcoal-800 space-y-3 text-sm">
                  <p>
                    <strong>About Our Partnerships:</strong> Lonestar Tortillas maintains business relationships with select Austin companies that help make events successful. We recommend{' '}
                    <a
                      href="https://partyondelivery.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sunset-600 hover:underline font-medium"
                    >
                      Party on Delivery
                    </a>
                    {' '}because we&apos;ve used their alcohol delivery service for our own events and found their service reliable and professional.
                  </p>
                  <p>
                    We believe in transparent recommendations. This partnership allows us to provide comprehensive event planning advice while supporting other quality Austin businesses. All recommendations in this guide are based on genuine experiences and what we believe creates the best outcome for Texas events.
                  </p>
                  <p>
                    Whether you use our partner services or not, the core principle remains the same: quality ingredients, thoughtful planning, and genuine Texas hospitality make for unforgettable events.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="bg-gradient-to-r from-masa-50 to-sunset-50 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Bottom Line</h2>
                <div className="text-charcoal-800 space-y-4">
                  <p>
                    Planning a Texas event that guests remember comes down to three things: quality food that honors Texas traditions, smart beverage logistics that keep the party flowing, and attention to details that show you care.
                  </p>
                  <p>
                    Starting with authentic H-E-B® tortillas sets the tone—it shows you&apos;re serious about quality. Pairing that with well-executed BBQ and professional alcohol delivery takes the stress out of hosting and lets you actually enjoy your own event.
                  </p>
                  <p>
                    Texas hospitality isn&apos;t about fancy or expensive. It&apos;s about making people feel welcome, feeding them well, and creating moments they&apos;ll talk about long after the last plate is cleared.
                  </p>
                  <p className="font-bold text-lg">
                    That&apos;s what great events are made of. And it all starts with authentic ingredients.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="bg-charcoal-950 text-cream-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Event?</h3>
                <p className="text-cream-200 mb-6">
                  Get authentic H-E-B® tortillas delivered for your next event. Whether you&apos;re feeding 10 or 100, we&apos;ve got the quality tortillas that make Texas events memorable.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/shop"
                    className="bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Shop for Events
                  </Link>
                  <Link
                    href="/blog/bbq-meets-tortillas"
                    className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    BBQ & Tortillas Guide
                  </Link>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/bbq-meets-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                  <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">BBQ Meets Tortillas →</h3>
                  <p className="text-charcoal-700 text-sm">Why pitmasters choose H-E-B® tortillas</p>
                </Link>
                <Link href="/blog/brisket-breakfast-burrito" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                  <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Brisket Breakfast Burrito →</h3>
                  <p className="text-charcoal-700 text-sm">Perfect for morning events</p>
                </Link>
                <Link href="/blog/leftover-brisket-guide" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                  <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Leftover Brisket Guide →</h3>
                  <p className="text-charcoal-700 text-sm">7 days of post-event meals</p>
                </Link>
                <Link href="/recipes" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                  <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Recipe Collection →</h3>
                  <p className="text-charcoal-700 text-sm">More ideas for your next event</p>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
