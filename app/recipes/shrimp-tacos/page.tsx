import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Spicy Shrimp Tacos Recipe',
  description: 'Quick and easy spicy shrimp tacos recipe with cilantro lime slaw. Learn how to make flavorful grilled shrimp tacos in just 20 minutes.',
  keywords: 'shrimp tacos recipe, grilled shrimp tacos, spicy shrimp tacos, easy shrimp tacos, how to make shrimp tacos, cilantro lime shrimp',
  openGraph: {
    title: 'Spicy Shrimp Tacos Recipe | Lonestar Tortillas',
    description: 'Quick 20-minute spicy shrimp tacos with creamy cilantro lime slaw. Perfect weeknight dinner!',
    type: 'article',
  },
};

export default function ShrimpTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Spicy Grilled Shrimp Tacos',
    description: 'Quick and flavorful grilled shrimp tacos with spicy seasoning and creamy cilantro lime slaw',
    prepTime: 'PT10M',
    cookTime: 'PT10M',
    totalTime: 'PT20M',
    recipeYield: '4 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'shrimp tacos, grilled shrimp, spicy shrimp, quick dinner, seafood tacos',
    recipeIngredient: [
      '1.5 lbs large shrimp (peeled and deveined)',
      '2 tablespoons olive oil',
      '2 garlic cloves, minced',
      '1 tablespoon chili powder',
      '1 teaspoon ground cumin',
      '1 teaspoon smoked paprika',
      '1/2 teaspoon cayenne pepper',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      'Juice of 1 lime',
      '2 cups shredded cabbage',
      '1/4 cup cilantro, chopped',
      '2 tablespoons lime juice',
      '1/2 cup sour cream or Greek yogurt',
      '2 tablespoons mayonnaise',
      '1 tablespoon lime juice',
      '1 garlic clove, minced',
      '1/4 cup cilantro',
      '12 corn tortillas',
      'Optional: avocado, pico de gallo, hot sauce, cotija cheese'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'In a large bowl, toss shrimp with olive oil, minced garlic, chili powder, cumin, smoked paprika, cayenne, salt, and pepper. Add lime juice and toss to coat. Let marinate for 10 minutes while you prep other ingredients.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make the slaw: Combine shredded cabbage, cilantro, and 2 tablespoons lime juice in a bowl. Season with salt and toss. Refrigerate until serving.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make cilantro lime crema: In a blender or food processor, blend sour cream, mayonnaise, 1 tablespoon lime juice, garlic, cilantro, and a pinch of salt until smooth. Add water to thin if needed.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat a grill pan or large skillet over high heat. Once very hot, add shrimp in a single layer (work in batches if needed).'
      },
      {
        '@type': 'HowToStep',
        text: 'Cook shrimp for 2-3 minutes per side until pink, opaque, and slightly charred. Don\'t overcook—shrimp cook quickly!'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas on a dry skillet or directly on the grill for 20-30 seconds per side until pliable.'
      },
      {
        '@type': 'HowToStep',
        text: 'Assemble tacos: double-stack tortillas, add 3-4 shrimp per taco, top with slaw, drizzle with cilantro lime crema, and add optional toppings. Serve immediately with lime wedges.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you keep shrimp from getting rubbery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key is not overcooking. Shrimp cook very quickly—just 2-3 minutes per side over high heat. They\'re done when they turn pink and opaque. Overcooked shrimp become rubbery and tough. Pull them off the heat as soon as they curl into a "C" shape. If they curl into an "O", they\'re overcooked.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use frozen shrimp for tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Thaw frozen shrimp overnight in the refrigerator, or quick-thaw by placing in a colander under cold running water for 5-10 minutes. Pat very dry before seasoning. Frozen shrimp work just as well as fresh for tacos. Buy them already peeled and deveined to save time.'
        }
      },
      {
        '@type': 'Question',
        name: 'What size shrimp is best for tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Large shrimp (31-40 count per pound) or extra-large (21-30 count) work best for tacos. They\'re substantial enough to be the star of the taco without being too big. Medium shrimp work too—you\'ll just need 5-6 per taco instead of 3-4. Avoid tiny shrimp, which can overcook easily and get lost among the toppings.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make shrimp tacos without a grill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Use a large skillet or grill pan over high heat. You can also broil shrimp 4-6 inches from the heat for 2-3 minutes per side. The high heat creates the same caramelization and char as grilling. A cast-iron skillet works especially well for getting nice browning on the shrimp.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-cream-50">Home</Link>
              {' '}/{' '}
              <Link href="/recipes" className="hover:text-cream-50">Recipes</Link>
              {' '}/{' '}
              <span>Shrimp Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Spicy Grilled Shrimp Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Quick, flavorful shrimp tacos ready in 20 minutes
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 20 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/shrimp-tacos.webp"
              alt="Grilled shrimp tacos with cilantro lime slaw"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              Shrimp tacos are the ultimate weeknight dinner hero. They're quick (ready in 20 minutes!), easy to make, and absolutely delicious. We're talking about juicy, perfectly seasoned shrimp with a slight char, piled onto warm tortillas with crunchy slaw and a drizzle of creamy cilantro lime sauce. It's fresh, flavorful, and light enough that you won't feel weighed down—but satisfying enough that you'll want seconds.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The beauty of shrimp tacos is their versatility and speed. Unlike fish that needs careful handling or meat that requires long marinating and cooking times, shrimp cook in just minutes and soak up flavors quickly. You can have these on the table faster than takeout arrives, and they're way better. Plus, shrimp are naturally sweet and tender, making them perfect for tacos where they're the star of the show.
            </p>
            <p className="text-lg leading-relaxed">
              This recipe uses a simple spice blend that packs a punch without being overwhelming—smoky paprika, earthy cumin, and a bit of heat from chili powder and cayenne. The cilantro lime crema adds richness and tang, while the cabbage slaw brings the crunch. Together, it's a symphony of flavors and textures that'll make you wonder why you ever ordered takeout. Let's make some magic happen!
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Shrimp</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1.5 lbs large shrimp, peeled and deveined</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons olive oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 garlic cloves, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon smoked paprika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon cayenne pepper (adjust for heat)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon black pepper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Juice of 1 lime</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Slaw & Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 cups shredded cabbage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons lime juice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Pinch of salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 cup sour cream or Greek yogurt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons mayonnaise</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon lime juice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 garlic clove, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh cilantro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>12-16 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: avocado slices, pico de gallo, hot sauce, cotija cheese, lime wedges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Instructions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Season the Shrimp</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    If using frozen shrimp, make sure they're completely thawed and patted very dry with paper towels. In a large bowl, combine the olive oil, minced garlic, chili powder, cumin, smoked paprika, cayenne, salt, and black pepper. Add the shrimp and toss to coat evenly—every shrimp should be coated in that beautiful spice blend. Add the lime juice and toss again. Let the shrimp marinate for about 10 minutes while you prep the other components. Don't marinate longer than 30 minutes, or the acid from the lime will start to "cook" the shrimp like ceviche.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Cabbage Slaw</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a medium bowl, combine the shredded cabbage, chopped cilantro, 2 tablespoons of lime juice, and a good pinch of salt. Toss everything together with your hands or tongs, really working the lime juice and salt into the cabbage. This starts breaking down the cabbage slightly, making it more tender and flavorful. Cover and pop it in the fridge while you cook the shrimp. The flavors will meld together beautifully.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Whip Up the Cilantro Lime Crema</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a blender or small food processor, combine the sour cream (or Greek yogurt for a lighter version), mayonnaise, 1 tablespoon lime juice, minced garlic, cilantro, and a pinch of salt. Blend until completely smooth and bright green. Taste and adjust—add more lime for tanginess, more cilantro for herb flavor, or a pinch of cayenne for heat. If it's too thick to drizzle, thin it out with a tablespoon or two of water until you get a nice pourable consistency. Transfer to a squeeze bottle or small bowl and refrigerate until serving.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Get Your Pan Screaming Hot</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat a large cast-iron skillet or grill pan over high heat. Let it get really hot—this is crucial for getting that beautiful char and caramelization on the shrimp without overcooking them. You want to hear a sizzle when the shrimp hit the pan. If you're using a grill, preheat to medium-high (about 400°F). For grilling, you might want to use a grill basket or skewers to prevent the shrimp from falling through the grates.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook the Shrimp Perfectly</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Add the seasoned shrimp to the hot pan in a single layer—don't overcrowd! Work in batches if needed. Cook for 2-3 minutes on the first side without moving them. They should develop nice char marks and easily release from the pan when ready. Flip and cook for another 2-3 minutes on the other side. The shrimp are done when they're pink, opaque, and curled into a loose "C" shape. If they curl tightly into an "O", they're overcooked. Transfer cooked shrimp to a plate immediately—they'll continue cooking from residual heat, so it's better to pull them a touch early than to overcook.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the shrimp are cooking (or right after), warm your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on a dry skillet or griddle over medium-high heat, or directly on the grill grates if grilling. Heat for about 20-30 seconds per side until they're warm, pliable, and have a few charred spots. Stack them and wrap in a clean kitchen towel to keep warm and steamy—this makes them soft and prevents them from cracking when you fold them.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">7</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble Your Tacos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Time to build! Double-stack your warm tortillas (two per taco) for extra structural support—these toppings can get heavy. Add 3-4 shrimp to each taco. Top with a generous portion of the cabbage slaw. Drizzle with the bright green cilantro lime crema (be generous!). Add any optional toppings you like: avocado slices, pico de gallo, a crumble of cotija cheese, or a few dashes of hot sauce. Serve immediately with lime wedges on the side. Squeeze fresh lime over everything right before eating—that final hit of citrus ties everything together perfectly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Variations */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-charcoal-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Tips & Variations</h2>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal-800">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Pro Tips</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Pat shrimp completely dry before seasoning for better searing</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use large or extra-large shrimp—they're easier to not overcook</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't marinate longer than 30 minutes or shrimp will get mushy</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Cook shrimp over high heat for quick cooking and char</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Pull shrimp when they form a "C" shape, not an "O"</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Make the crema and slaw ahead to save time</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Double-stack tortillas to prevent falling apart</li>
              </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Blackened:</strong> Use Cajun seasoning for Louisiana-style heat</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Coconut:</strong> Add coconut milk to crema, top with toasted coconut</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Mango Salsa:</strong> Top with fresh mango pico de gallo</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Garlic Butter:</strong> Toss cooked shrimp in garlic butter</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Asian Fusion:</strong> Use sriracha mayo and pickled veggies</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Grilled Pineapple:</strong> Add grilled pineapple chunks</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Taco Bowl:</strong> Serve over rice and beans instead of tortillas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do you keep shrimp from getting rubbery?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The number one cause of rubbery shrimp is overcooking. Shrimp cook incredibly fast—we're talking 2-3 minutes per side over high heat. They're done as soon as they turn pink and opaque. A good visual cue: properly cooked shrimp curl into a loose "C" shape. Overcooked shrimp curl tightly into an "O" shape. Pull them from the heat at the "C" stage! They'll continue cooking slightly from residual heat. Another tip: buy larger shrimp (large or extra-large), which are more forgiving and easier to not overcook compared to tiny shrimp. Finally, make sure your pan is screaming hot before adding the shrimp—this lets you cook them quickly without overdoing it.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I use frozen shrimp for tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! In fact, most "fresh" shrimp at the grocery store were previously frozen anyway. Frozen shrimp work perfectly for tacos—just make sure to thaw them properly first. The best method is overnight in the refrigerator. For a quicker thaw, place the frozen shrimp in a colander and run cold water over them for 5-10 minutes, tossing occasionally. Once thawed, pat them very dry with paper towels before seasoning—excess moisture prevents good browning. Buy already peeled and deveined frozen shrimp to save time. They'll work just as well as "fresh" and are often better quality since they're flash-frozen right on the boat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What size shrimp is best for tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Large shrimp (31-40 count per pound) or extra-large (21-30 count per pound) are ideal for shrimp tacos. This size gives you 3-4 shrimp per taco, which is perfect—substantial enough to be satisfying without being too much. They're also easier to not overcook compared to smaller shrimp. The "count" refers to how many shrimp are in a pound—so 31-40 means there are 31 to 40 shrimp per pound. Lower numbers mean bigger shrimp. If you use medium shrimp (41-50), you'll need 5-6 per taco. Avoid tiny salad shrimp or popcorn shrimp—they overcook in seconds and get lost among the toppings. Go for large or extra-large!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make shrimp tacos without a grill?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! A grill gives you nice char marks and smoky flavor, but a stovetop works just as well. Use a large cast-iron skillet or grill pan over high heat—cast iron is especially good because it holds heat well and creates excellent searing. You can also use a regular heavy-bottomed skillet. The key is getting the pan very hot before adding the shrimp. You can even broil the shrimp: arrange them on a baking sheet and broil 4-6 inches from the heat source for 2-3 minutes per side. For maximum ease, cook them right in a skillet—the results are just as delicious as grilled, and you get the same caramelized, slightly charred flavor that makes these tacos amazing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make the components ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! The cabbage slaw can be made up to 4 hours ahead and refrigerated—it actually benefits from sitting as the flavors meld. The cilantro lime crema can be made a day ahead and stored covered in the fridge (give it a good stir before serving). You can season the shrimp up to 30 minutes ahead, but don't let them sit longer or the acid from the lime will start to "cook" them. Cook the shrimp right before serving—they only take 5 minutes and are best hot. If you must cook them ahead, don't overcook them, let them cool completely, then refrigerate. Reheat gently in a hot skillet for 1-2 minutes just before serving, though they're definitely best cooked fresh.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/fish-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Baja Fish Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Crispy beer-battered fish with tangy slaw and creamy sauce
                </p>
              </div>
            </Link>
            <Link href="/recipes/carne-asada-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Carne Asada Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Perfectly grilled, marinated steak tacos
                </p>
              </div>
            </Link>
            <Link href="/guides/how-to-reheat-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Reheat Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Master the best methods for warming tortillas
                </p>
              </div>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Link href="/recipes/tacos-al-pastor" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Tacos Al Pastor
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Authentic Mexican street tacos with pineapple-marinated pork
                </p>
              </div>
            </Link>
            <Link href="/faq" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Get answers about shipping, storage, and more
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Spicy Shrimp Tacos?
            </h2>
            <p className="text-xl mb-8 text-cream-100">
              Get authentic Texas tortillas delivered to your door
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/products/corn-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Corn Tortillas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
