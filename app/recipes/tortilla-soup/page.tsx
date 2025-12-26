import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Chicken Tortilla Soup Recipe',
  description: 'Make the best chicken tortilla soup with this authentic Mexican recipe. Rich tomato broth, tender chicken, crispy tortilla strips, and fresh toppings. Ready in 45 minutes!',
  keywords: 'tortilla soup, chicken tortilla soup, Mexican soup, sopa de tortilla, tortilla soup recipe, authentic tortilla soup, easy tortilla soup, best tortilla soup',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/tortilla-soup',
  },
  openGraph: {
    title: 'Authentic Chicken Tortilla Soup Recipe | Lonestar Tortillas',
    description: 'The best chicken tortilla soup recipe. Rich, flavorful, and topped with crispy tortilla strips. Ready in 45 minutes!',
    type: 'article',
  },
};

export default function TortillaSoupRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Authentic Chicken Tortilla Soup',
    description: 'Rich and flavorful Mexican chicken tortilla soup with crispy tortilla strips, tender chicken, and fresh toppings',
    image: 'https://lonestartortillas.com/images/recipes/tortilla-soup.webp',
    prepTime: 'PT15M',
    cookTime: 'PT30M',
    totalTime: 'PT45M',
    recipeYield: '6 servings',
    recipeCategory: 'Soup',
    recipeCuisine: 'Mexican',
    keywords: 'tortilla soup, chicken tortilla soup, Mexican soup, sopa de tortilla',
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '320 calories',
      proteinContent: '28g',
      carbohydrateContent: '24g',
      fatContent: '12g',
      fiberContent: '4g'
    },
    recipeIngredient: [
      '6 corn tortillas, cut into strips',
      '2 lbs boneless skinless chicken breasts',
      '1 tablespoon olive oil',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 jalapeño, seeded and minced',
      '1 can (14 oz) fire-roasted diced tomatoes',
      '1 can (4 oz) diced green chiles',
      '6 cups chicken broth',
      '1 tablespoon cumin',
      '1 tablespoon chili powder',
      '1 teaspoon smoked paprika',
      '1 teaspoon oregano',
      'Salt and pepper to taste',
      'Juice of 2 limes',
      'Fresh cilantro for garnish',
      'Avocado slices',
      'Sour cream or Mexican crema',
      'Shredded cheese',
      'Vegetable oil for frying'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Cut corn tortillas into thin strips. Heat 1/2 inch of vegetable oil in a skillet over medium-high heat. Fry tortilla strips in batches until golden and crispy, about 2-3 minutes. Drain on paper towels and season with salt.'
      },
      {
        '@type': 'HowToStep',
        text: 'Season chicken breasts with salt, pepper, cumin, and chili powder. Heat olive oil in a large pot over medium-high heat. Sear chicken on both sides until golden, about 4 minutes per side. Remove and set aside.'
      },
      {
        '@type': 'HowToStep',
        text: 'In the same pot, sauté onion until softened, about 5 minutes. Add garlic and jalapeño, cook for 1 minute until fragrant.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add fire-roasted tomatoes, green chiles, remaining cumin, chili powder, smoked paprika, and oregano. Stir to combine and cook for 2 minutes.'
      },
      {
        '@type': 'HowToStep',
        text: 'Pour in chicken broth and return the seared chicken to the pot. Bring to a boil, then reduce heat and simmer for 20-25 minutes until chicken is cooked through.'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove chicken and shred with two forks. Return shredded chicken to the soup. Add lime juice and adjust seasoning to taste.'
      },
      {
        '@type': 'HowToStep',
        text: 'Ladle soup into bowls. Top with crispy tortilla strips, avocado, sour cream, cheese, and fresh cilantro. Serve immediately.'
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
        name: 'What tortillas are best for tortilla soup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corn tortillas are the traditional and best choice for tortilla soup. They have an authentic corn flavor that complements the rich broth and fry up perfectly crispy. Use day-old or slightly stale corn tortillas for the crispiest strips.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does tortilla soup last in the fridge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tortilla soup (without the crispy strips and toppings) lasts 3-4 days refrigerated in an airtight container. Store the crispy tortilla strips separately in a paper bag at room temperature. Reheat the soup on the stovetop and add fresh toppings when serving.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you freeze tortilla soup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Freeze tortilla soup (without toppings) for up to 3 months. Thaw overnight in the refrigerator and reheat on the stovetop. Make fresh tortilla strips and add toppings when serving for the best texture and flavor.'
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
              <span>Tortilla Soup</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Chicken Tortilla Soup Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Rich, flavorful, and loaded with crispy tortilla strips
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">45 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Medium</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">6 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/tortilla-soup.webp"
              alt="Authentic Chicken Tortilla Soup"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Quick Answer Box - For Featured Snippets */}
        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Chicken tortilla soup</strong> is a traditional Mexican soup (sopa de tortilla) made with a rich tomato-based broth, shredded chicken, and topped with crispy fried corn tortilla strips. It takes about 45 minutes to make and serves 6. The key to great tortilla soup is using fresh corn tortillas fried until crispy and a well-seasoned broth with cumin, chili powder, and lime.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              There's nothing quite like a steaming bowl of authentic chicken tortilla soup. This Mexican classic, known as <em>sopa de tortilla</em>, combines a rich, smoky tomato broth with tender shredded chicken and those irresistible crispy <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortilla</Link> strips that crackle and soften as you eat.
            </p>
            <p className="text-lg leading-relaxed">
              This recipe is the real deal—no shortcuts, no bland broth. We're talking fire-roasted tomatoes, fresh jalapeño, smoky paprika, and a hit of fresh lime juice at the end. Top it with creamy avocado, tangy sour cream, and a handful of fresh cilantro, and you've got restaurant-quality soup at home.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Soup</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 lbs boneless skinless chicken breasts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon olive oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 medium onion, diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>4 cloves garlic, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 jalapeño, seeded and minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 can (14 oz) fire-roasted diced tomatoes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 can (4 oz) diced green chiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>6 cups chicken broth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tbsp cumin, 1 tbsp chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tsp smoked paprika, 1 tsp oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Juice of 2 limes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Tortilla Strips</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>6 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link>, cut into strips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Vegetable oil for frying</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salt to taste</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-charcoal-950 mb-3 mt-6">Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Avocado, sliced or cubed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream or Mexican crema</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Shredded cheese (cheddar or queso fresco)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Lime wedges</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Tortilla Strips</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Stack your corn tortillas and cut them into 1/4-inch strips. Heat about 1/2 inch of vegetable oil in a skillet over medium-high heat until shimmering. Fry tortilla strips in batches (don't crowd the pan) for 2-3 minutes, stirring occasionally, until golden and crispy. Transfer to a paper towel-lined plate and season immediately with salt. Set aside.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Sear the Chicken</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pat chicken breasts dry and season generously with salt, pepper, 1/2 tablespoon cumin, and 1/2 tablespoon chili powder. Heat olive oil in a large pot or Dutch oven over medium-high heat. Sear chicken for about 4 minutes per side until golden brown. The chicken doesn't need to be cooked through—it will finish in the broth. Remove and set aside.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Build the Flavor Base</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In the same pot (don't wipe it out—those browned bits are flavor!), add the diced onion. Sauté for 5 minutes until softened and slightly golden. Add the minced garlic and jalapeño, cooking for 1 minute until fragrant. The kitchen should smell amazing at this point.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Add Tomatoes and Spices</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour in the fire-roasted tomatoes and diced green chiles. Add the remaining cumin, chili powder, smoked paprika, and oregano. Stir everything together and cook for 2 minutes to let the flavors meld. The fire-roasted tomatoes give the soup its signature smoky depth.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Simmer with Chicken</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour in the chicken broth and return the seared chicken to the pot. Bring to a boil, then reduce heat to medium-low and simmer for 20-25 minutes. The chicken should reach an internal temperature of 165°F and be easily shreddable.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Shred and Finish</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Remove the chicken to a cutting board. Using two forks, shred the chicken into bite-sized pieces. Return the shredded chicken to the soup. Add the fresh lime juice and taste—adjust salt, pepper, or lime as needed. The lime brightens everything and is essential!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Serve with Toppings</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Ladle the hot soup into bowls. Top generously with crispy tortilla strips, sliced avocado, a dollop of sour cream, shredded cheese, and fresh cilantro. Serve with lime wedges on the side. The crispy strips will start to soften as they absorb the broth—that's part of the magic!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use day-old tortillas for crispier strips</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't skip the fire-roasted tomatoes—they add essential smokiness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Add lime juice at the end to preserve brightness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Keep tortilla strips separate until serving</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use a rotisserie chicken for a 20-minute version</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Vegetarian:</strong> Use vegetable broth and add black beans</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Spicier:</strong> Keep jalapeño seeds or add chipotle</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Creamier:</strong> Blend part of the soup before serving</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Slow Cooker:</strong> Simmer on low for 6-8 hours</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Baked Strips:</strong> Brush with oil, bake at 400°F for 10 min</li>
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
                What tortillas are best for tortilla soup?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link> are the traditional and best choice for tortilla soup. They have an authentic corn flavor that complements the rich broth and fry up perfectly crispy. Day-old or slightly stale corn tortillas work even better because they have less moisture and fry up crispier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How long does tortilla soup last in the fridge?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Tortilla soup (without the crispy strips and toppings) lasts 3-4 days refrigerated in an airtight container. The flavor actually improves after a day as the spices meld. Store the crispy tortilla strips separately in a paper bag at room temperature. Reheat the soup on the stovetop and add fresh toppings when serving.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can you freeze tortilla soup?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! Freeze tortilla soup (without toppings) for up to 3 months in freezer-safe containers. Leave some room at the top for expansion. Thaw overnight in the refrigerator and reheat on the stovetop. Make fresh tortilla strips and add toppings when serving for the best texture and flavor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What's the difference between tortilla soup and chicken tortilla soup?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                They're essentially the same thing! "Tortilla soup" (sopa de tortilla) traditionally includes chicken as the protein. The name refers to the crispy tortilla strips that top the soup. Some variations use vegetable broth and beans for a vegetarian version, but the classic always includes chicken.
              </p>
            </div>
          </div>
        </section>

        {/* Nutrition Info */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Nutrition Information</h2>
            <p className="text-charcoal-600 mb-4">Per serving (1/6 of recipe)</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-cream-100 rounded-lg">
                <p className="text-2xl font-bold text-charcoal-950">320</p>
                <p className="text-sm text-charcoal-600">Calories</p>
              </div>
              <div className="text-center p-4 bg-cream-100 rounded-lg">
                <p className="text-2xl font-bold text-charcoal-950">28g</p>
                <p className="text-sm text-charcoal-600">Protein</p>
              </div>
              <div className="text-center p-4 bg-cream-100 rounded-lg">
                <p className="text-2xl font-bold text-charcoal-950">24g</p>
                <p className="text-sm text-charcoal-600">Carbs</p>
              </div>
              <div className="text-center p-4 bg-cream-100 rounded-lg">
                <p className="text-2xl font-bold text-charcoal-950">12g</p>
                <p className="text-sm text-charcoal-600">Fat</p>
              </div>
              <div className="text-center p-4 bg-cream-100 rounded-lg">
                <p className="text-2xl font-bold text-charcoal-950">4g</p>
                <p className="text-sm text-charcoal-600">Fiber</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/homemade-chips" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Homemade Tortilla Chips
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Use the same technique to make perfect chips
                </p>
              </div>
            </Link>
            <Link href="/recipes/chilaquiles" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Chilaquiles Recipe
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Another delicious way to use corn tortillas
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
              Ready to Make Authentic Tortilla Soup?
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
