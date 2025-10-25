import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tacos Al Pastor Recipe | Authentic Mexican Street Tacos | Lonestar Tortillas',
  description: 'Authentic Mexican tacos al pastor with marinated pork and pineapple. Learn how to make restaurant-quality street tacos at home in 45 minutes!',
  keywords: 'tacos al pastor recipe, mexican street tacos, al pastor pork, pineapple pork tacos, authentic mexican tacos, how to make al pastor',
  openGraph: {
    title: 'Street-Style Tacos Al Pastor Recipe | Lonestar Tortillas',
    description: 'Authentic tacos al pastor with pineapple-marinated pork. Mexican street food at its finest!',
    type: 'article',
  },
};

export default function TacosAlPastorRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Street-Style Tacos Al Pastor',
    description: 'Authentic Mexican tacos al pastor with chile-marinated pork, grilled pineapple, and fresh toppings on small corn tortillas',
    prepTime: 'PT20M',
    cookTime: 'PT25M',
    totalTime: 'PT45M',
    recipeYield: '4 servings (12 tacos)',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'tacos al pastor, mexican street tacos, pork tacos, pineapple tacos',
    recipeIngredient: [
      '2 lbs pork shoulder, thinly sliced',
      '3 dried guajillo chiles',
      '2 dried ancho chiles',
      '1/2 cup pineapple juice',
      '1/4 cup white vinegar',
      '4 garlic cloves',
      '1 tablespoon achiote paste',
      '1 teaspoon cumin',
      '1 teaspoon oregano',
      '1/2 teaspoon cinnamon',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      '1 small pineapple, sliced',
      '1 white onion, diced',
      'Fresh cilantro, chopped',
      '2 limes, cut into wedges',
      '12 small corn tortillas',
      'Salsa verde or salsa roja for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Toast dried chiles in a dry skillet for 1-2 minutes until fragrant. Remove stems and seeds, then soak in hot water for 15 minutes until soft.'
      },
      {
        '@type': 'HowToStep',
        text: 'Blend soaked chiles with pineapple juice, vinegar, garlic, achiote paste, cumin, oregano, cinnamon, salt, and pepper until smooth.'
      },
      {
        '@type': 'HowToStep',
        text: 'Slice pork shoulder into thin strips. Pour marinade over pork and mix well to coat. Marinate for at least 30 minutes, or up to overnight in the refrigerator.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat a large cast-iron skillet or grill over high heat. Cook pork in batches in a single layer for 3-4 minutes per side until charred and cooked through.'
      },
      {
        '@type': 'HowToStep',
        text: 'Grill pineapple slices for 2-3 minutes per side until caramelized. Chop into small pieces.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas on a comal or griddle. Double them up for street-style presentation.'
      },
      {
        '@type': 'HowToStep',
        text: 'Assemble tacos: Fill each tortilla with pork, top with grilled pineapple, diced onion, and cilantro. Serve with lime wedges and salsa.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does al pastor mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al pastor literally means "in the style of the shepherd" in Spanish. It refers to a method of cooking marinated pork on a vertical spit (trompo), similar to Middle Eastern shawarma. The dish was created by Lebanese immigrants in Mexico and has become one of the most beloved Mexican street foods.'
        }
      },
      {
        '@type': 'Question',
        name: 'What cut of pork is best for tacos al pastor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pork shoulder (also called pork butt) is the traditional and best cut for tacos al pastor. It has good marbling and fat content that keeps the meat juicy and flavorful. Slice it as thin as possible, about 1/4-inch thick, for authentic texture and quick cooking.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make tacos al pastor without a vertical spit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! While traditional al pastor is cooked on a vertical spit (trompo), you can achieve excellent results at home using a cast-iron skillet, grill pan, or outdoor grill. The key is cooking over high heat to get charred edges while keeping the interior juicy. This recipe is designed for home cooking without special equipment.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why is pineapple used in tacos al pastor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pineapple adds sweetness that balances the savory, spicy marinade. It also contains bromelain, an enzyme that helps tenderize the pork. Traditionally, a whole pineapple is placed on top of the meat spit, and its juices drip down while it caramelizes. The grilled pineapple chunks on top provide a sweet, tangy contrast to the rich meat.'
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
              <span>Tacos Al Pastor</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Street-Style Tacos Al Pastor Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Authentic Mexican street tacos with pineapple-marinated pork
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 45 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">👨‍🍳 Medium</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">🌮 12 tacos</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/tacos-al-pastor.webp"
              alt="Authentic tacos al pastor with marinated pork and pineapple"
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
              Walk down any street in Mexico City after dark and you'll find taco stands where a massive vertical spit of marinated pork spins slowly, caramelizing under heat with a pineapple crown on top. The taquero shaves off thin slices of meat, catches some grilled pineapple, and builds you a taco that's an explosion of flavors—savory, spicy, sweet, and tangy all at once. These are tacos al pastor, and they're arguably Mexico's most iconic street food.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The history is fascinating: Lebanese immigrants brought shawarma to Mexico in the early 1900s, and Mexicans adapted it using local ingredients—pork instead of lamb, dried chiles instead of Middle Eastern spices, and pineapple for that signature sweet note. The result became a Mexican classic that's beloved worldwide.
            </p>
            <p className="text-lg leading-relaxed">
              While you probably don't have a vertical spit at home (unless you're very dedicated!), you can make incredible tacos al pastor using a cast-iron skillet or grill. This recipe recreates those authentic flavors: chile-marinated pork with charred edges, sweet caramelized pineapple, fresh cilantro and onion, all piled onto small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>. Let's bring Mexico City street food to your kitchen!
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Marinade</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>3 dried guajillo chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>2 dried ancho chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1/2 cup pineapple juice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1/4 cup white vinegar or apple cider vinegar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>4 garlic cloves</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 tablespoon achiote paste (available at Mexican markets)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 teaspoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 teaspoon dried Mexican oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1/2 teaspoon ground cinnamon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 teaspoon salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1/2 teaspoon black pepper</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Tacos</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>2 lbs pork shoulder, thinly sliced (1/4-inch thick)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 small fresh pineapple, peeled and sliced into rounds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 medium white onion, finely diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>1 cup fresh cilantro, roughly chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>2-3 limes, cut into wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>12-16 small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>Salsa verde or salsa roja for serving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600">•</span>
                    <span>Optional: sliced radishes, pickled jalapeños</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prepare the Chiles</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat a dry skillet over medium heat. Add the dried guajillo and ancho chiles and toast them for 1-2 minutes per side until they become fragrant and slightly puffed. Be careful not to burn them—they'll turn bitter. Remove from heat, let cool slightly, then remove the stems and seeds (use gloves if you have sensitive skin). Place the chiles in a bowl and cover with very hot water. Let them soak for 15 minutes until completely soft and pliable.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Marinade</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Drain the softened chiles (save a bit of the soaking liquid). Add them to a blender along with the pineapple juice, vinegar, garlic cloves, achiote paste, cumin, oregano, cinnamon, salt, and pepper. Blend on high until completely smooth—this should take about 1-2 minutes. The marinade should be a deep red-orange color and have a slightly thick consistency. If it's too thick to blend, add a splash of the chile soaking liquid. Taste and adjust seasoning if needed—it should be spicy, tangy, and slightly sweet.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Slice and Marinate the Pork</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Slice the pork shoulder as thinly as possible—about 1/4-inch thick is ideal. If you're having trouble getting thin slices, try partially freezing the pork for 30 minutes first; it makes slicing much easier. Place the pork slices in a large bowl or zip-top bag. Pour the marinade over the pork, making sure every piece is well coated. Cover and marinate for at least 30 minutes at room temperature, or ideally 2-4 hours (up to overnight) in the refrigerator for maximum flavor. The longer it marinates, the more flavorful and tender it becomes.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook the Pork</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat a large cast-iron skillet or grill pan over high heat—you want it screaming hot for proper charring. Working in batches (don't overcrowd the pan!), add pork slices in a single layer. Cook for 3-4 minutes on the first side without moving them, until you get nice char marks and caramelization. Flip and cook another 2-3 minutes until cooked through and charred in spots. The pork should be juicy inside with crispy, charred edges. Transfer cooked pork to a cutting board and repeat with remaining batches. Once all the pork is cooked, roughly chop it into smaller, taco-sized pieces.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Grill the Pineapple</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In the same hot skillet (those browned bits add flavor!), add the fresh pineapple slices. Cook for 2-3 minutes per side until deeply caramelized with char marks and golden-brown edges. The natural sugars in the pineapple will caramelize beautifully. Remove from the skillet and chop into small, bite-sized pieces—about 1/4 to 1/2 inch chunks. The grilled pineapple is essential to authentic al pastor—that sweet, smoky flavor is what makes these tacos special!
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
                    Heat your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on a comal, dry skillet, or directly over a gas flame until soft, pliable, and slightly charred in spots—about 20-30 seconds per side. For authentic street-style presentation, double up the tortillas (use two per taco). This provides structural integrity and is how they're served in Mexico. Keep the warmed tortillas wrapped in a clean kitchen towel to stay warm and soft.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble and Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Now for the fun part! Fill each doubled-up tortilla with a generous portion of the chopped al pastor pork. Top with several pieces of grilled pineapple, a spoonful of diced white onion, and a generous pinch of fresh cilantro. Serve with lime wedges for squeezing and your choice of salsa verde or salsa roja. Keep it simple—street tacos are all about letting the quality of the ingredients shine. Eat immediately while everything is hot! These tacos are meant to be enjoyed standing up, ideally with friends, just like at a taco stand in Mexico City.
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
                  <li>• Partially freeze pork for 30 minutes for easier thin slicing</li>
                  <li>• Don't skip toasting the dried chiles—it deepens the flavor</li>
                  <li>• Marinate overnight for maximum flavor and tenderness</li>
                  <li>• Cook pork over screaming high heat for proper char</li>
                  <li>• Double up tortillas for authentic street-style serving</li>
                  <li>• Keep toppings simple—let the pork be the star</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations & Serving Ideas</h3>
                <ul className="space-y-2">
                  <li>• <strong>Chicken Al Pastor:</strong> Use boneless chicken thighs instead of pork</li>
                  <li>• <strong>Spicier Version:</strong> Add chipotle peppers or more guajillo chiles</li>
                  <li>• <strong>Al Pastor Bowl:</strong> Serve over rice with black beans</li>
                  <li>• <strong>Grilled Version:</strong> Thread marinated pork on skewers and grill</li>
                  <li>• <strong>Al Pastor Quesadillas:</strong> Use leftovers in <Link href="/recipes/cheese-quesadillas" className="text-rust-600 hover:underline">quesadillas</Link></li>
                  <li>• <strong>Torta Al Pastor:</strong> Make a Mexican sandwich on telera roll</li>
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
                What does al pastor mean?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                "Al pastor" literally translates to "in the style of the shepherd" in Spanish. The name comes from the cooking method where meat is stacked on a vertical rotisserie spit (called a trompo), similar to how shepherds would cook lamb. The dish was created by Lebanese immigrants who brought shawarma techniques to Mexico in the early 1900s. Mexican cooks adapted it using local ingredients—pork instead of lamb, Mexican chiles instead of Middle Eastern spices, and adding pineapple for that signature sweet-savory combination. Today, tacos al pastor are one of Mexico's most iconic street foods, especially popular in Mexico City.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What cut of pork is best for tacos al pastor?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Pork shoulder (also called pork butt or Boston butt) is the traditional and best cut for tacos al pastor. It has the perfect balance of meat and fat, which creates juicy, flavorful results that don't dry out during cooking. The marbling melts during cooking, keeping everything moist and delicious. For best results, slice the pork as thin as possible—about 1/4-inch thick. Pro tip: partially freeze the pork for 30 minutes before slicing to make it much easier to get thin, even slices. Avoid using lean cuts like pork loin, as they'll dry out and won't have the same rich flavor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make tacos al pastor without a vertical spit?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! While traditional al pastor is cooked on a vertical spit (trompo) at taco stands, you can make excellent tacos al pastor at home without any special equipment. This recipe is specifically designed for home cooking using a cast-iron skillet, grill pan, or outdoor grill. The key is cooking over very high heat to get those characteristic charred edges while keeping the interior juicy. The marinade provides all the authentic flavors, and grilling the pineapple separately gives you that caramelized sweetness. Many would argue that home-cooked al pastor in a screaming hot cast-iron skillet rivals the street-cart version!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Why is pineapple used in tacos al pastor?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Pineapple serves multiple purposes in al pastor. First, it provides a sweet, tangy contrast to the savory, spicy chile-marinated pork—that sweet-savory-spicy combination is addictive. Second, pineapple contains bromelain, a natural enzyme that helps tenderize the meat when it marinates. Third, traditionally a whole pineapple is placed on top of the vertical meat spit, and its juices slowly drip down onto the pork as it cooks, continuously basting and flavoring the meat. When grilled or roasted, the pineapple caramelizes beautifully, concentrating its sweetness and adding a slight smokiness. Those chunks of charred pineapple on top of your taco are what make al pastor truly special and different from other tacos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Where can I find achiote paste and dried chiles?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Achiote paste (also called recado rojo) and dried guajillo and ancho chiles are available at most Mexican grocery stores, Latin markets, and increasingly in the international aisle of regular supermarkets. You can also easily order them online. Achiote paste is a brick-red seasoning paste made from annatto seeds, spices, and vinegar—it gives al pastor its distinctive color and earthy flavor. If you absolutely can't find it, you can substitute with 2 teaspoons paprika and 1/2 teaspoon turmeric (though the flavor won't be quite the same). For the dried chiles, guajillo provides fruity heat while ancho adds sweetness and depth. Don't substitute with chili powder—the flavor is completely different!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/carnitas-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Slow-Cooked Carnitas Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Another authentic Mexican pork taco with crispy edges
                </p>
              </div>
            </Link>
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Texas-Style Breakfast Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Quick and easy breakfast tacos ready in 15 minutes
                </p>
              </div>
            </Link>
            <Link href="/guides/corn-vs-flour-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Corn vs Flour Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Learn when to use each type of tortilla
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Authentic Tacos Al Pastor?
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
