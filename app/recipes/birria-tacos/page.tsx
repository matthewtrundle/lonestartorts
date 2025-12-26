import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Birria Tacos Recipe (Tacos de Birria)',
  description: 'Make the viral birria tacos at home with this authentic Mexican recipe. Tender braised beef, crispy cheese-crusted tortillas, and rich consomé for dipping. The ultimate comfort food!',
  keywords: 'birria tacos, birria tacos recipe, tacos de birria, quesabirria, birria consomé, red tacos, Mexican birria, beef birria, how to make birria tacos',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/birria-tacos',
  },
  openGraph: {
    title: 'Authentic Birria Tacos Recipe | Lonestar Tortillas',
    description: 'The viral birria tacos recipe with tender braised beef and rich consomé. Ready to dip and devour!',
    type: 'article',
  },
};

export default function BirriaRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Authentic Birria Tacos (Tacos de Birria)',
    description: 'Tender braised beef in rich chile consomé, served in crispy cheese-crusted corn tortillas with dipping broth',
    image: 'https://lonestartortillas.com/images/recipes/birria-tacos.webp',
    prepTime: 'PT30M',
    cookTime: 'PT3H',
    totalTime: 'PT3H30M',
    recipeYield: '12 tacos',
    recipeCategory: 'Main Course',
    recipeCuisine: 'Mexican',
    keywords: 'birria tacos, quesabirria, tacos de birria, consomé tacos, red tacos',
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '380 calories',
      proteinContent: '32g',
      carbohydrateContent: '18g',
      fatContent: '20g'
    },
    recipeIngredient: [
      '3 lbs beef chuck roast, cut into large chunks',
      '4 dried guajillo chiles, stems and seeds removed',
      '3 dried ancho chiles, stems and seeds removed',
      '2 dried pasilla chiles, stems and seeds removed',
      '1 medium white onion, quartered',
      '6 cloves garlic',
      '4 Roma tomatoes',
      '1 tablespoon cumin',
      '1 tablespoon oregano',
      '1 teaspoon black pepper',
      '1/2 teaspoon cloves',
      '1/2 teaspoon cinnamon',
      '4 cups beef broth',
      '2 tablespoons apple cider vinegar',
      '2 bay leaves',
      'Salt to taste',
      '12 corn tortillas',
      '2 cups shredded Oaxaca or mozzarella cheese',
      'Fresh cilantro for garnish',
      'Diced white onion for garnish',
      'Lime wedges'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Toast dried chiles in a dry skillet over medium heat for 1-2 minutes until fragrant and pliable. Transfer to a bowl and cover with hot water. Let soak for 20-30 minutes.'
      },
      {
        '@type': 'HowToStep',
        text: 'Char the onion, garlic, and tomatoes in the same skillet until blackened in spots. This adds smoky depth to the sauce.'
      },
      {
        '@type': 'HowToStep',
        text: 'Drain the chiles and add to a blender with charred vegetables, cumin, oregano, pepper, cloves, cinnamon, and 1 cup beef broth. Blend until completely smooth.'
      },
      {
        '@type': 'HowToStep',
        text: 'Season beef chunks generously with salt. In a Dutch oven, sear beef on all sides until deeply browned. Remove and set aside.'
      },
      {
        '@type': 'HowToStep',
        text: 'Pour the chile sauce into the pot and cook for 2 minutes. Add remaining beef broth, apple cider vinegar, bay leaves, and return the beef to the pot. The liquid should nearly cover the meat.'
      },
      {
        '@type': 'HowToStep',
        text: 'Cover and braise in a 325°F oven (or simmer on stovetop) for 2.5-3 hours until beef is fall-apart tender. Shred the meat and return to the consomé.'
      },
      {
        '@type': 'HowToStep',
        text: 'Dip corn tortillas in the consomé, then place on a griddle over medium-high heat. Add shredded cheese, then shredded birria meat. Fold and cook until crispy and cheese is melted.'
      },
      {
        '@type': 'HowToStep',
        text: 'Serve tacos with a bowl of hot consomé for dipping, topped with fresh cilantro and diced onion.'
      }
    ],
    author: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is birria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Birria is a traditional Mexican stew originating from Jalisco, made with beef (traditionally goat) braised in a rich, spiced chile sauce called consomé. The meat becomes incredibly tender and flavorful. It\'s served as a stew or used to make the viral birria tacos (quesabirria).'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes birria tacos red?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Birria tacos get their signature red color from being dipped in the consomé before griddling. The consomé contains dried guajillo and ancho chiles, which give it a deep red color. When the tortilla is dipped and fried, it absorbs the red-orange chile sauce, creating those iconic red tacos.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you make birria in advance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Birria actually tastes better the next day. Make the braised meat and consomé up to 3 days ahead and refrigerate. The fat will solidify on top (easy to remove if desired). Reheat before assembling tacos. The meat can also be frozen for up to 3 months.'
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
              <span>Birria Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Birria Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Tender braised beef, crispy cheese-crusted tortillas, and rich consomé for dipping
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">3.5 hours</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Intermediate</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">12 tacos</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/birria-tacos.webp"
              alt="Birria Tacos with Consomé"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Birria tacos</strong> (also called quesabirria or tacos de birria) are corn tortillas dipped in rich chile consomé, filled with tender slow-braised beef and cheese, then griddled until crispy. They're served with a bowl of the braising liquid (consomé) for dipping. The viral dish originated in Jalisco, Mexico and has taken the food world by storm.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              If you've seen those beautiful red tacos all over social media—dripping with cheese, being dunked into rich, glossy broth—you've seen birria tacos. This dish went from a regional Mexican specialty to a worldwide phenomenon, and for good reason: the combination of tender, spiced beef, crispy cheese-crusted <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>, and that addictive consomé for dipping is absolutely unreal.
            </p>
            <p className="text-lg leading-relaxed">
              Yes, this recipe takes time—about 3.5 hours total—but most of that is hands-off braising while your kitchen fills with the most incredible aroma. The result is worth every minute: fall-apart tender beef, a deeply flavored chile sauce, and tacos that rival any taqueria.
            </p>
          </div>
        </section>

        {/* What You'll Need */}
        <section className="max-w-4xl mx-auto px-6 py-6">
          <div className="bg-sunset-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-charcoal-950 mb-4">What You'll Need</h3>
            <div className="grid md:grid-cols-3 gap-4 text-charcoal-700">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍲</span>
                <span>Dutch oven or large pot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span>Blender or food processor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🫓</span>
                <span>Flat griddle or large skillet</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Birria</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>3 lbs beef chuck roast, cut into large chunks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>4 dried guajillo chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>3 dried ancho chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 dried pasilla chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1 medium white onion, quartered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>6 cloves garlic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>4 Roma tomatoes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1 tbsp cumin, 1 tbsp oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1 tsp black pepper, 1/2 tsp cloves</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/2 tsp cinnamon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>4 cups beef broth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 tbsp apple cider vinegar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 bay leaves</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Tacos</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>12 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 cups shredded Oaxaca or mozzarella cheese</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Vegetable oil for the griddle</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-charcoal-950 mb-3 mt-6">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>White onion, finely diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Lime wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Salsa verde or salsa roja</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Radish slices (optional)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Chile Guide */}
        <section className="max-w-4xl mx-auto px-6 py-6">
          <div className="bg-charcoal-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-charcoal-950 mb-4">About the Chiles</h3>
            <div className="grid md:grid-cols-3 gap-4 text-charcoal-700">
              <div>
                <p className="font-bold text-rust-600">Guajillo</p>
                <p className="text-sm">Mild, tangy, slightly fruity. Provides the signature red color.</p>
              </div>
              <div>
                <p className="font-bold text-rust-600">Ancho</p>
                <p className="text-sm">Sweet, raisiny, mild heat. Adds depth and richness.</p>
              </div>
              <div>
                <p className="font-bold text-rust-600">Pasilla</p>
                <p className="text-sm">Earthy, slightly bitter. Adds complexity.</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-600 mt-4">Can't find all three? Use 6-7 guajillo chiles plus 2 ancho chiles as a substitute.</p>
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
                    Remove stems and seeds from all dried chiles. Heat a large dry skillet over medium heat. Toast the chiles for 1-2 minutes per side, pressing them flat with a spatula, until fragrant and slightly pliable (don't burn them!). Transfer to a bowl and cover with very hot water. Let soak for 20-30 minutes until soft.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Char the Aromatics</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While chiles soak, char the onion quarters, garlic cloves, and Roma tomatoes in the same dry skillet over medium-high heat. Turn occasionally until blackened in spots all over, about 10-15 minutes. This charring adds essential smoky depth—don't skip it!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Blend the Sauce</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Drain the soaked chiles (reserve soaking liquid). Add chiles to a blender with the charred vegetables, cumin, oregano, black pepper, cloves, cinnamon, and 1 cup of beef broth. Blend on high until completely smooth—this may take 2-3 minutes. If too thick, add a splash of the chile soaking liquid.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Sear the Beef</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Preheat oven to 325°F. Pat beef chunks very dry with paper towels and season generously with salt. Heat a Dutch oven over high heat with a tablespoon of oil. Sear beef in batches (don't crowd!) until deeply browned on all sides, about 3-4 minutes per side. Remove and set aside.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Build the Braise</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Lower heat to medium. Pour the chile sauce into the pot (careful—it will splatter!) and cook for 2-3 minutes, stirring. Add remaining 3 cups beef broth, apple cider vinegar, and bay leaves. Return the seared beef to the pot, nestling it into the liquid. The liquid should come about 3/4 up the meat.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Braise Until Tender</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cover the pot with a tight-fitting lid. Transfer to the oven and braise for 2.5-3 hours, until the beef is completely fall-apart tender. You can also do this on the stovetop over very low heat. The meat should shred effortlessly with a fork when ready.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Shred and Season</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Remove beef from the consomé and shred with two forks, discarding any large fat pieces. Return shredded meat to the pot and stir to combine. Taste the consomé and adjust seasoning—it should be rich, slightly spicy, and deeply flavorful. Remove bay leaves.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Tacos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat a flat griddle or large skillet over medium-high heat with a thin layer of oil. Using tongs, dip each corn tortilla into the consomé, coating both sides. Place on the griddle. Immediately add a small handful of cheese to one half, then top with shredded birria meat. Fold the tortilla in half and press gently.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">9</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Crisp and Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cook the taco for 2-3 minutes per side until the tortilla is crispy and the cheese has melted and become slightly crispy around the edges. Serve immediately with a small bowl of hot consomé for dipping. Top with fresh cilantro, diced onion, and a squeeze of lime. Dip each bite into the consomé—that's the magic!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-rust-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Pro Tips for Perfect Birria</h2>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal-800">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Meat</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Use beef chuck for the best texture and fat content</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Don't skip searing—it builds crucial flavor</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Low and slow is key—rushing ruins the texture</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Short ribs make an amazing alternative</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Tacos</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Dip tortillas quickly—don't soak them</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Use Oaxaca cheese for authentic stretch</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> High heat creates crispy edges</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Serve immediately—they lose crispness fast</li>
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
                What is birria?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Birria is a traditional Mexican stew originating from Jalisco, Mexico. It was traditionally made with goat, but beef has become more common in the US. The meat is braised in a rich, spiced chile sauce called consomé until fall-apart tender. The dish can be served as a stew or used to make the viral birria tacos (quesabirria).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What makes birria tacos red?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The signature red color comes from the dried guajillo and ancho chiles in the consomé. When you dip the <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> in the consomé before griddling, they absorb the red-orange chile sauce and develop that iconic color as they crisp up.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can you make birria in advance?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely—birria actually tastes better the next day! Make the braised meat and consomé up to 3 days ahead and refrigerate. The fat will solidify on top, making it easy to remove if desired. Reheat before assembling tacos. You can also freeze birria for up to 3 months.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What's the difference between birria tacos and quesabirria?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                They're essentially the same thing! "Quesabirria" emphasizes the cheese (queso), while "birria tacos" or "tacos de birria" is the more traditional name. Both refer to consomé-dipped tortillas filled with birria meat and cheese, griddled until crispy, and served with consomé for dipping.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Taco Recipes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/carne-asada-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Carne Asada Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Classic grilled steak street tacos
                </p>
              </div>
            </Link>
            <Link href="/recipes/carnitas-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Carnitas Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Crispy slow-cooked pork tacos
                </p>
              </div>
            </Link>
            <Link href="/products/corn-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Shop Corn Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Get authentic H-E-B corn tortillas delivered
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Viral Birria Tacos?
            </h2>
            <p className="text-xl mb-8 text-cream-100">
              Get authentic Texas corn tortillas delivered to your door
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
