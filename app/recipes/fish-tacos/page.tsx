import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Baja Fish Tacos Recipe',
  description: 'Authentic Baja-style fish tacos with crispy beer-battered fish, cabbage slaw, and creamy sauce. Learn how to make restaurant-quality fish tacos at home.',
  keywords: 'fish tacos recipe, baja fish tacos, beer battered fish tacos, crispy fish tacos, how to make fish tacos, authentic fish tacos',
  openGraph: {
    title: 'Baja Fish Tacos Recipe | Lonestar Tortillas',
    description: 'Crispy beer-battered fish with tangy slaw and creamy sauce. The ultimate Baja-style fish tacos!',
    type: 'article',
  },
};

export default function FishTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Baja Fish Tacos',
    description: 'Crispy beer-battered fish tacos with cabbage slaw and creamy sauce, Baja California-style',
    image: 'https://lonestartortillas.com/images/recipes/fish-tacos.webp',
    prepTime: 'PT20M',
    cookTime: 'PT15M',
    totalTime: 'PT35M',
    recipeYield: '4 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'fish tacos, baja fish tacos, beer battered fish, crispy fish tacos',
    recipeIngredient: [
      '1.5 lbs white fish (cod, mahi-mahi, or tilapia)',
      '1 cup all-purpose flour',
      '1/2 cup cornstarch',
      '1 teaspoon baking powder',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      '1 teaspoon garlic powder',
      '1 teaspoon paprika',
      '1 cup cold beer (lager or pilsner)',
      'Vegetable oil for frying',
      '2 cups shredded cabbage',
      '1/4 cup chopped cilantro',
      '1 tablespoon lime juice',
      '1/2 cup sour cream or Mexican crema',
      '2 tablespoons mayonnaise',
      '1 tablespoon lime juice',
      '1 teaspoon hot sauce',
      '12 corn tortillas (6-inch)',
      'Lime wedges, pico de gallo, sliced avocado for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Cut fish into strips about 1-inch wide and 4 inches long. Pat very dry with paper towels and season lightly with salt and pepper.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make the slaw: Combine shredded cabbage, cilantro, and 1 tablespoon lime juice in a bowl. Season with salt and toss. Refrigerate until ready to serve.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make the crema: Whisk together sour cream, mayonnaise, 1 tablespoon lime juice, and hot sauce. Thin with water if needed for drizzling consistency. Refrigerate.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make the batter: In a large bowl, whisk together flour, cornstarch, baking powder, salt, pepper, garlic powder, and paprika. Slowly pour in cold beer while whisking until smooth. The batter should coat the back of a spoon.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat 2-3 inches of vegetable oil in a heavy pot or Dutch oven to 375°F. Use a thermometer for accuracy.'
      },
      {
        '@type': 'HowToStep',
        text: 'Working in batches, dip fish strips in batter, letting excess drip off. Carefully lower into hot oil. Fry for 3-4 minutes until golden brown and crispy, turning once. Don\'t overcrowd the pot.'
      },
      {
        '@type': 'HowToStep',
        text: 'Transfer fried fish to a wire rack or paper towel-lined plate. Let oil return to temperature between batches.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas on a dry skillet. Assemble tacos with fish, cabbage slaw, drizzle of crema, and toppings. Serve immediately with lime wedges.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best fish for fish tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Firm, white, flaky fish works best. Cod is the classic choice—it has mild flavor and perfect texture. Mahi-mahi is excellent with slightly more flavor. Tilapia and halibut also work well. Avoid oily fish like salmon or tuna. The fish should have a mild flavor that won\'t overpower the other ingredients and should hold together when fried or grilled.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make fish tacos without frying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Grilled fish tacos are delicious and healthier. Season fish fillets with cumin, chili powder, garlic powder, and lime juice. Grill over medium-high heat for 3-4 minutes per side until cooked through and flaky. You can also bake the fish at 400°F for 12-15 minutes or air fry for 10-12 minutes. While not as crispy as beer-battered, grilled fish tacos are lighter and let the fish flavor shine.'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes Baja fish tacos authentic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic Baja fish tacos originated in Baja California, Mexico. Key elements: beer-battered fried fish (usually cod or mahi-mahi), served in corn tortillas, topped with shredded cabbage slaw (not lettuce), white crema sauce, and fresh lime. The contrast of crispy hot fish with cool crunchy cabbage is essential. Simple toppings like pico de gallo and cilantro complete the dish.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I use corn or flour tortillas for fish tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic Baja fish tacos use corn tortillas (6-inch). They\'re traditional and their slightly sweet, earthy flavor complements the fish perfectly. Flour tortillas work too, especially if you prefer softer texture. Double-stack corn tortillas (two per taco) for structural support—the crispy fish and toppings can be heavy. Warm them until pliable with slight char for best flavor and texture.'
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
              <span>Fish Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Baja Fish Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Crispy beer-battered fish with tangy slaw and creamy sauce
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 35 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Medium</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/fish-tacos.webp"
              alt="Crispy beer-battered fish tacos with cabbage slaw"
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
              Baja fish tacos are pure magic. Picture this: golden-brown, impossibly crispy beer-battered fish, still hot from the fryer, nestled in warm corn tortillas with cool, crunchy cabbage slaw, a drizzle of tangy crema, and a squeeze of fresh lime. It's a symphony of textures and flavors—crispy and tender, cool and hot, tangy and rich—all in one perfect bite.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              These tacos originated in Baja California, Mexico, specifically in the beach towns of Ensenada and San Felipe in the 1950s and 60s. Japanese fishermen are credited with bringing the tempura-style battering technique to the region, which local Mexican cooks adapted using beer and local spices. The result became an instant classic that's now beloved from Baja to San Diego and beyond.
            </p>
            <p className="text-lg leading-relaxed">
              The beauty of fish tacos is in their simplicity and contrast. You don't need fancy ingredients or complicated techniques—just fresh fish, a light crispy batter, simple toppings, and good timing. The key is getting that batter perfectly crispy while keeping the fish inside tender and flaky. Once you nail this recipe, you'll be making fish tacos on repeat. They're that good.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Fish & Batter</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1.5 lbs white fish (cod, mahi-mahi, or tilapia)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 cup all-purpose flour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 cup cornstarch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon baking powder</span>
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
                    <span>1 teaspoon garlic powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon paprika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 cup cold beer (lager or pilsner)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Vegetable oil for frying (about 4 cups)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Slaw & Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 cups shredded cabbage (green or mix of green/purple)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon lime juice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Pinch of salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 cup sour cream or Mexican crema</span>
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
                    <span>1 teaspoon hot sauce (adjust to taste)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>12-16 small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Lime wedges for serving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: pico de gallo, sliced avocado, hot sauce</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep the Fish</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cut your fish into strips about 1 inch wide and 4 inches long—think fish stick size. Pat them very dry with paper towels. This is important! Any moisture will make the batter slide off and create splattering oil. Season the fish lightly with salt and pepper. Set aside on a clean plate while you prepare everything else. Dry fish is the secret to batter that actually sticks and crisps up perfectly.
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
                    In a medium bowl, toss together the shredded cabbage, chopped cilantro, 1 tablespoon lime juice, and a pinch of salt. Mix well and let it sit. The lime juice and salt will slightly soften the cabbage and bring out its flavor. Cover and refrigerate until you're ready to assemble. This slaw provides crucial crunch and freshness that balances the rich fried fish. You can make this up to 2 hours ahead.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prepare the Crema Sauce</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a small bowl, whisk together the sour cream, mayonnaise, 1 tablespoon lime juice, and hot sauce until smooth. Taste and adjust seasoning—add more lime for tang or hot sauce for heat. If the mixture is too thick to drizzle, thin it with a tablespoon or two of water until you reach a pourable consistency (think of it like a drizzle on a fancy restaurant plate). Refrigerate until serving. This tangy, creamy sauce is essential to authentic Baja fish tacos.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Beer Batter</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a large bowl, whisk together the flour, cornstarch, baking powder, salt, pepper, garlic powder, and paprika. The cornstarch makes the batter extra crispy, while the baking powder adds lightness. Slowly pour in the cold beer while whisking constantly until you have a smooth batter about the consistency of pancake batter—it should coat the back of a spoon but still be pourable. Don't overmix! A few small lumps are fine. Use the batter immediately while the beer is still cold and fizzy—this creates the lightest, crispiest coating.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Heat the Oil</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour 2-3 inches of vegetable oil into a heavy-bottomed pot or Dutch oven (about 4 cups of oil). Heat over medium-high heat to 375°F. Use a deep-fry or candy thermometer—temperature is critical! If the oil is too cool, the batter will be greasy and soggy. Too hot, and the outside burns before the inside cooks. Maintain 375°F throughout frying by adjusting your heat as needed. Set up a wire rack over a baking sheet or a plate lined with paper towels for draining.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Fish</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Working in small batches (3-4 pieces at a time—don't crowd!), dip each fish strip fully into the beer batter, letting excess drip off for a second. Carefully lower into the hot oil—place the fish away from you to avoid splashing. Fry for 3-4 minutes total, flipping once halfway through, until deep golden brown and crispy all over. The fish should float when done. Use tongs or a slotted spoon to transfer to your draining setup. Let the oil come back to temperature between batches (this is crucial!). Season with a tiny pinch of salt while still hot.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the fish is frying, heat your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on a dry skillet or comal over medium-high heat for about 20-30 seconds per side. You want them warm, pliable, and slightly charred in spots. Stack them and wrap in a clean kitchen towel to keep them warm and steamy. This makes them soft and easy to fold without breaking.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">8</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble and Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Work quickly while the fish is hot! Double-stack your tortillas (two per taco) for structural support. Place one piece of crispy fish on each taco. Top with a generous handful of the cabbage slaw. Drizzle with the crema sauce. Add pico de gallo or avocado if you like. Serve immediately with lime wedges on the side. The key is to eat these right away while the fish is still crispy and hot—the contrast with the cool slaw and creamy sauce is what makes these tacos legendary. Squeeze fresh lime over everything before taking that first bite!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Pat fish completely dry before battering—moisture prevents crisping</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Keep beer and batter cold for lightest, crispiest coating</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Maintain oil temperature at 375°F—use a thermometer!</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overcrowd the pot—fry in small batches</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Let oil return to temperature between batches</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Serve immediately—fried fish doesn't stay crispy long</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Double-stack tortillas to prevent falling apart</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Grilled Version:</strong> Skip batter, season and grill fish instead</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Blackened:</strong> Coat in Cajun spices and sear in cast iron</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Extra Spicy:</strong> Add cayenne to batter, use spicy crema</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Tropical:</strong> Top with mango salsa and cilantro</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Asian Fusion:</strong> Use sriracha mayo and pickled vegetables</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Baja Bowl:</strong> Serve over rice with beans instead of tortillas</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Gluten-Free:</strong> Use gluten-free flour blend or cornmeal</li>
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
                What is the best fish for fish tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The best fish for tacos is firm, white, flaky fish with mild flavor. Cod is the classic choice—it's what you'll find in authentic Baja fish tacos. It has perfect texture, stays firm when fried, and has a mild sweet flavor that pairs perfectly with the toppings. Mahi-mahi is excellent if you want slightly more flavor and firmer texture. Tilapia is budget-friendly and works well. Halibut is premium but fantastic. Avoid oily fish like salmon, mackerel, or tuna—their strong flavors clash with the traditional toppings, and they don't have the right flaky texture. Whatever you choose, make sure it's fresh (not fishy smelling) and sustainable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make fish tacos without frying?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! While fried is traditional Baja-style, grilled fish tacos are delicious and healthier. Season fish fillets with cumin, chili powder, garlic powder, paprika, salt, and lime juice. Grill over medium-high heat for 3-4 minutes per side until the fish flakes easily with a fork. You can also bake at 400°F for 12-15 minutes, or use an air fryer at 400°F for 10-12 minutes. For a crispy coating without deep frying, try a panko crust: coat fish in flour, then egg, then panko breadcrumbs mixed with spices, and pan-fry in a few tablespoons of oil until golden. It won't be quite as light and crispy as beer-battered, but it's still excellent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What makes Baja fish tacos authentic?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Authentic Baja fish tacos have specific characteristics: (1) Beer-battered and deep-fried white fish, golden and crispy. (2) Served in small corn tortillas, usually doubled up. (3) Topped with shredded cabbage—not lettuce! The cabbage provides crunch and stays crisp longer. (4) A white creamy sauce (crema) drizzled on top, often with lime and hot sauce. (5) Simple toppings: maybe pico de gallo, cilantro, and lime wedges. (6) The key is contrast: hot crispy fish, cool crunchy slaw, creamy sauce, and bright lime. That's it. No cheese, no guacamole, no rice—just pure, simple perfection. These originated in Ensenada, Baja California, and that's the classic style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Why is my fish batter not crispy?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Common causes of soggy batter: (1) Fish wasn't dry—pat it completely dry with paper towels before battering. (2) Oil temperature too low—if below 365°F, the batter absorbs oil and gets greasy instead of crispy. Use a thermometer and maintain 375°F. (3) Overcrowding the pot—too much fish drops the temperature and creates steam instead of frying. Fry in small batches. (4) Beer or batter too warm—use cold beer and make batter right before frying. (5) Wrong batter consistency—it should coat the spoon but not be too thick. (6) Not draining properly—use a wire rack, not paper towels that trap steam. Get these right and you'll have perfectly crispy batter every time!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make the components ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes, with some limitations. The cabbage slaw can be made 2-4 hours ahead and refrigerated—it actually benefits from sitting as the flavors meld. The crema sauce can be made a day ahead and stored covered in the fridge. Cut the fish and keep it refrigerated (covered) up to 2 hours before cooking. However, the batter should be made right before frying for best results—the carbonation from the beer helps create that light, crispy texture. Most importantly, fry the fish right before serving. Fried fish doesn't stay crispy more than 10-15 minutes. You can keep it warm in a 200°F oven on a wire rack, but it's always best fresh from the oil. Plan your timing so the fish goes straight from fryer to taco to mouth!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/carne-asada-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Carne Asada Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Perfectly grilled, marinated steak tacos served street-style
                </p>
              </div>
            </Link>
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Texas Breakfast Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Quick morning tacos with eggs, bacon, and cheese
                </p>
              </div>
            </Link>
            <Link href="/guides/best-tortillas-for-every-dish" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Best Tortillas for Every Dish
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Choose the perfect tortilla for any recipe
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Baja Fish Tacos?
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
