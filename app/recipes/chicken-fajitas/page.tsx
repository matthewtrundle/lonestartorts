import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Grilled Chicken Fajitas Recipe',
  description: 'Restaurant-quality chicken fajitas at home! Marinated grilled chicken with sizzling peppers and onions. Learn how to make authentic fajitas in 30 minutes.',
  keywords: 'chicken fajitas recipe, grilled chicken fajitas, how to make fajitas, tex-mex fajitas, easy fajita recipe, homemade fajitas',
  openGraph: {
    title: 'Grilled Chicken Fajitas Recipe | Lonestar Tortillas',
    description: 'Sizzling chicken fajitas with peppers and onions. Restaurant-quality Tex-Mex at home!',
    type: 'article',
  },
};

export default function ChickenFajitasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Grilled Chicken Fajitas',
    description: 'Marinated chicken breast grilled to perfection with sautéed peppers and onions, served in warm flour tortillas',
    image: 'https://lonestartortillas.com/images/recipes/chicken-fajitas.webp',
    prepTime: 'PT15M',
    cookTime: 'PT15M',
    totalTime: 'PT30M',
    recipeYield: '4 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Tex-Mex',
    keywords: 'chicken fajitas, grilled chicken, tex-mex, peppers and onions',
    recipeIngredient: [
      '1.5 lbs boneless skinless chicken breast',
      '3 bell peppers (red, yellow, green), sliced',
      '1 large onion, sliced',
      '3 tablespoons olive oil',
      '2 limes (juice)',
      '3 garlic cloves, minced',
      '2 teaspoons chili powder',
      '1.5 teaspoons cumin',
      '1 teaspoon paprika',
      '1/2 teaspoon oregano',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      '8-10 flour tortillas',
      'Sour cream, guacamole, salsa, cheese for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'In a bowl, whisk together olive oil, lime juice, garlic, chili powder, cumin, paprika, oregano, salt, and pepper to make the marinade.'
      },
      {
        '@type': 'HowToStep',
        text: 'Slice chicken breasts into 1/2-inch thick strips. Add to marinade and toss to coat. Let marinate for at least 15 minutes (or up to 4 hours in the fridge).'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat 1 tablespoon oil in a large cast-iron skillet or grill pan over high heat. Add bell peppers and onions. Season with salt and pepper. Cook for 6-8 minutes, stirring occasionally, until charred and softened. Remove and set aside.'
      },
      {
        '@type': 'HowToStep',
        text: 'In the same skillet, add chicken strips in a single layer. Cook for 3-4 minutes per side until charred on the outside and cooked through (165°F internal temperature). Work in batches if needed.'
      },
      {
        '@type': 'HowToStep',
        text: 'Return peppers and onions to the skillet with the chicken. Toss everything together and squeeze fresh lime juice over the top.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm flour tortillas and serve fajitas family-style with all the toppings: sour cream, guacamole, salsa, cheese, and extra lime wedges.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What tortillas are best for chicken fajitas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flour tortillas are the traditional choice for fajitas. Use 8-inch or 10-inch flour tortillas—they are soft, pliable, and can hold all the filling without breaking. Warm them before serving for the best texture and flavor.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long should I marinate chicken for fajitas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Marinate chicken for at least 15 minutes for flavor, but ideally 2-4 hours for maximum taste and tenderness. You can marinate up to 24 hours in the refrigerator. If you are in a rush, even a quick 15-minute marinade makes a big difference.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make chicken fajitas without a grill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! A cast-iron skillet or grill pan on the stovetop works perfectly. Cook over high heat to get that characteristic char and smoky flavor. You want the skillet screaming hot before adding the chicken and vegetables for best results.'
        }
      },
      {
        '@type': 'Question',
        name: 'What toppings go with chicken fajitas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Classic fajita toppings include sour cream, guacamole or sliced avocado, salsa or pico de gallo, shredded cheese (cheddar or Mexican blend), fresh cilantro, and lime wedges. Pickled jalapeños, black beans, and rice are also popular additions.'
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
              <span>Chicken Fajitas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Grilled Chicken Fajitas Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Sizzling, restaurant-quality fajitas in 30 minutes
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 30 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/chicken-fajitas.webp"
              alt="Sizzling chicken fajitas with colorful peppers and onions"
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
              There's something irresistible about fajitas—the sizzle when they arrive at your table, the aroma of charred peppers and onions, the colorful spread of toppings waiting to be piled high. The good news? You don't need a restaurant to make incredible fajitas. With the right marinade and technique, you can create that same magic in your own kitchen.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Fajitas (pronounced fah-HEE-tahs) are a Tex-Mex classic that originated in Texas ranch country. The word "fajita" actually refers to the cut of beef skirt steak, but chicken fajitas have become just as beloved. They're perfect for weeknight dinners, casual entertaining, or anytime you want a fun, interactive meal where everyone can build their own perfect fajita.
            </p>
            <p className="text-lg leading-relaxed">
              This recipe walks you through making restaurant-quality chicken fajitas at home. We're talking juicy, marinated chicken with that perfect char, bell peppers and onions cooked until they're sweet and slightly caramelized, all wrapped in warm <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link>. Let's fire up that skillet!
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Fajitas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1.5 lbs boneless, skinless chicken breast</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 bell peppers (mix of red, yellow, and green), sliced into strips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 large onion, sliced into strips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 tablespoons olive oil (divided)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 limes (juice)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 garlic cloves, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 teaspoons chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1.5 teaspoons ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon paprika (smoked paprika is great!)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon dried oregano</span>
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
                    <span>8-10 <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline font-medium">flour tortillas</Link> (8-inch)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Guacamole or sliced avocado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salsa or pico de gallo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Shredded cheese (cheddar or Mexican blend)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Lime wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: pickled jalapeños, black beans, Mexican rice</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Marinade</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a large bowl, whisk together 2 tablespoons olive oil, the juice of 2 limes, minced garlic, chili powder, cumin, paprika, oregano, salt, and black pepper. This marinade is packed with flavor and will tenderize the chicken while infusing it with that classic Tex-Mex taste. Give it a good whisk until everything is combined.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep and Marinate the Chicken</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Slice the chicken breasts into strips about 1/2-inch thick. Try to make them relatively uniform so they cook evenly. Add the chicken strips to the marinade and toss until every piece is well coated. Cover and let marinate for at least 15 minutes at room temperature, or up to 4 hours in the refrigerator for maximum flavor. Even a quick 15-minute marinade makes a huge difference! While the chicken marinates, slice your peppers and onions.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook the Peppers and Onions</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat 1 tablespoon of oil in a large cast-iron skillet or grill pan over high heat. You want it really hot for that characteristic char. Add the sliced bell peppers and onions. Season with a pinch of salt and pepper. Cook for 6-8 minutes, stirring occasionally, until they're charred in spots, softened, and slightly caramelized. Don't stir too often—let them sit and develop those charred bits. Once done, transfer to a plate and cover with foil to keep warm.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Grill the Chicken</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In the same hot skillet (don't wash it—those browned bits add flavor!), add the marinated chicken strips in a single layer. Don't overcrowd the pan—work in batches if needed. Cook for 3-4 minutes on the first side without moving them, letting them develop a nice char. Flip and cook another 3-4 minutes on the other side until the chicken is cooked through and reaches an internal temperature of 165°F. The chicken should have beautiful char marks and be juicy inside. Remove to a cutting board if you want to slice into smaller pieces, or leave as strips.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Combine and Finish</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Return the cooked peppers and onions to the skillet with the chicken. Toss everything together so the flavors meld. Squeeze the juice of half a lime over the top and give it a final toss. Taste and adjust seasoning if needed—maybe a pinch more salt or another squeeze of lime. For dramatic presentation, you can transfer everything to a hot cast-iron skillet for serving—it'll sizzle when it hits the table!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm Tortillas and Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Warm your <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link>—you can do this on a comal, in a dry skillet, or wrapped in foil in a 350°F oven. Wrap them in a clean kitchen towel to keep warm. Set out all your toppings: sour cream, guacamole, salsa, cheese, cilantro, and lime wedges. Bring everything to the table and let everyone build their own fajitas. Pile the chicken and veggies onto a tortilla, add your favorite toppings, fold it up, and dig in!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Slice chicken against the grain for maximum tenderness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't skip the marinade—even 15 minutes makes a difference</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use a screaming hot skillet for proper char</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overcrowd the pan or vegetables will steam instead of char</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Let chicken rest for a few minutes after cooking</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Warm tortillas are essential—never serve cold!</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Delicious Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Steak Fajitas:</strong> Use skirt or flank steak instead of chicken</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Shrimp Fajitas:</strong> Swap for shrimp (cook just 2-3 min per side)</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Veggie Fajitas:</strong> Add mushrooms, zucchini, corn</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Spicy Fajitas:</strong> Add sliced jalapeños or cayenne to marinade</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fajita Bowl:</strong> Serve over rice instead of in tortillas</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Mix It Up:</strong> Combine chicken and steak for surf & turf</li>
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
                What tortillas are best for chicken fajitas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Flour tortillas are the traditional and best choice for fajitas. Use 8-inch or 10-inch <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link>—they're soft, pliable, and sturdy enough to hold all the filling without breaking or falling apart. Always warm them before serving for the best texture and flavor. You can warm them individually on a comal or griddle, wrap them in foil and heat in the oven, or microwave wrapped in a damp paper towel for 30 seconds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How long should I marinate chicken for fajitas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                For best results, marinate chicken for at least 15 minutes—this gives the flavors time to penetrate and starts to tenderize the meat. Ideally, marinate for 2-4 hours for maximum flavor and tenderness. You can marinate up to 24 hours in the refrigerator, but don't go longer as the lime juice can start to "cook" the chicken and make the texture mushy. If you're really in a rush, even a quick 15-minute marinade while you prep the vegetables makes a noticeable difference!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make chicken fajitas without a grill?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! A cast-iron skillet or grill pan on the stovetop works perfectly and is actually what many restaurants use. The key is cooking over high heat to get that characteristic char and smoky flavor. Make sure your skillet is screaming hot before adding the chicken and vegetables—this is what creates those delicious caramelized bits. A cast-iron skillet retains heat best and gives the most authentic results. You can also use an outdoor grill if you have one, cooking the chicken and vegetables over direct high heat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What toppings go with chicken fajitas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Classic fajita toppings include sour cream, guacamole or sliced avocado, salsa (red or green) or pico de gallo, shredded cheese (cheddar or Mexican blend), fresh cilantro, and lime wedges. Other popular additions include pickled jalapeños for heat, black beans for protein, Mexican rice, shredded lettuce, and sliced radishes. The beauty of fajitas is that everyone can customize their own! Set out a variety of toppings and let people build their perfect fajita.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I prep fajitas ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! You can prep components ahead to make dinner faster. Slice the chicken and marinate up to 24 hours ahead. Slice the peppers and onions and store in an airtight container for up to 2 days. Prep all your toppings ahead too. When ready to serve, just cook the vegetables and chicken—it takes less than 15 minutes. You can also cook everything ahead and reheat, though the chicken won't be quite as juicy. Fajitas are great for meal prep and leftovers reheat well in a hot skillet!
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
                  Tender, crispy pork carnitas with authentic Mexican flavor
                </p>
              </div>
            </Link>
            <Link href="/recipes/cheese-quesadillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Classic Cheese Quesadillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Simple, crispy quesadillas ready in just 10 minutes
                </p>
              </div>
            </Link>
            <Link href="/guides/how-to-reheat-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Reheat Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Learn the best methods for warming tortillas perfectly
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Sizzling Fajitas?
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
                href="/products/flour-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Flour Tortillas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
