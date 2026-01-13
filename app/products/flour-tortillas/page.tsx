import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Premium Flour Tortillas',
  description: 'Handcrafted flour tortillas from scratch. Soft, pillowy, perfect for burritos and quesadillas. Made with premium Texas ingredients.',
  keywords: ['flour tortillas', 'soft tortillas', 'burrito tortillas', 'Texas flour tortillas', 'handmade flour tortillas', 'fresh flour tortillas', 'authentic tortillas', 'premium tortillas'],
  openGraph: {
    title: 'Premium Flour Tortillas | Lonestar Tortillas',
    description: 'Handcrafted flour tortillas made from scratch. Soft, pillowy, and perfect for burritos and quesadillas.',
    type: 'website',
  },
  colorScheme: 'light',
  themeColor: '#D97706',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function FlourTortillasProductPage() {
  // Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Premium Flour Tortillas',
    description: 'Handcrafted flour tortillas made from scratch. Soft, pillowy, and perfect for burritos, quesadillas, fajitas, and wraps.',
    brand: {
      '@type': 'Brand',
      name: 'Lonestar Tortillas',
    },
    offers: {
      '@type': 'Offer',
      price: '6.99',
      priceCurrency: 'USD',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/PreOrder',
      url: 'https://lonestartortillas.com/products/flour-tortillas',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '93',
    },
    image: 'https://lonestartortillas.com/images/products/flour-tortillas.jpg',
    category: 'Food > Bakery > Bread & Bakery Products > Tortillas',
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://lonestartortillas.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://lonestartortillas.com/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Flour Tortillas',
        item: 'https://lonestartortillas.com/products/flour-tortillas',
      },
    ],
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes your flour tortillas different?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our flour tortillas are made fresh daily using premium ingredients and traditional methods. We use quality flour, fresh lard or vegetable shortening, and pure water - no preservatives or artificial ingredients. Each tortilla is hand-rolled and cooked on a hot comal for authentic texture and flavor.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do flour tortillas stay fresh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our fresh flour tortillas stay soft and delicious for 7-10 days when stored in the refrigerator in their original packaging or an airtight container. You can also freeze them for up to 3 months - simply separate with parchment paper and store in a freezer bag.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size are your flour tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our flour tortillas are 10 inches in diameter, making them perfect for burritos, quesadillas, and wraps. This versatile size works for everything from breakfast burritos to fajitas. Each package contains 8 fresh handmade tortillas.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sunset-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rust-600 to-rust-700 text-white">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/shop" className="hover:text-white transition">Products</Link></li>
                <li>/</li>
                <li className="text-white">Flour Tortillas</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  🫓 Soft & Pillowy • Handcrafted • Premium
                </div>

                <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6">
                  Premium Flour Tortillas
                </h1>

                <p className="text-xl text-white/90 mb-8">
                  Handcrafted flour tortillas made from scratch daily.
                  Incredibly soft, wonderfully pliable, and perfect for any meal.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-3xl font-bold">$6.99</div>
                    <div className="text-sm text-white/80">8-pack</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">⭐ 4.8</div>
                    <div className="text-sm text-white/80">93 reviews</div>
                  </div>
                </div>

                <Link
                  href="/pre-sale"
                  className="inline-block px-8 py-4 bg-white text-rust-600 font-semibold rounded-lg hover:bg-cream-50 transition shadow-lg"
                >
                  Pre-Order Now →
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <span className="text-6xl">🌯</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-6">
                  The Perfect Flour Tortilla
                </h2>

                <div className="prose prose-lg max-w-none text-charcoal-700">
                  <p>
                    Our flour tortillas are made the traditional way - by hand, from scratch, every single day.
                    We start with premium unbleached flour, pure water, a touch of quality fat, and just the
                    right amount of salt to create a dough that's rolled thin and cooked to perfection.
                  </p>

                  <p>
                    Each tortilla is hand-rolled (never pressed by machine) to achieve that perfect pillowy
                    texture and uniform thickness. They're then cooked on a hot comal just long enough to
                    develop those characteristic golden-brown spots while remaining incredibly soft and pliable.
                  </p>
                </div>
              </div>

              {/* What Makes Them Special */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
                  What Makes Our Flour Tortillas Special
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '👐',
                      title: 'Hand-Rolled Daily',
                      description: 'Every tortilla is rolled by hand for authentic texture and perfect consistency.',
                    },
                    {
                      icon: '🌾',
                      title: 'Premium Ingredients',
                      description: 'Made with unbleached flour, pure water, and quality fats - nothing artificial.',
                    },
                    {
                      icon: '🔥',
                      title: 'Comal-Cooked',
                      description: 'Cooked on a traditional hot comal for authentic flavor and those perfect golden spots.',
                    },
                    {
                      icon: '☁️',
                      title: 'Soft & Pliable',
                      description: 'Incredibly soft texture that stays flexible without tearing or cracking.',
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-white rounded-xl p-6 shadow-sm border border-charcoal-100"
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h4 className="font-semibold text-lg text-charcoal-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-charcoal-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfect For */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
                  Perfect For
                </h3>

                <div className="bg-gradient-to-br from-rust-50 to-sunset-50 rounded-xl p-8 border border-rust-200">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      'Breakfast burritos',
                      'Fajitas',
                      'Quesadillas',
                      'Soft tacos',
                      'Wraps & sandwiches',
                      'Chimichangas',
                      'Enchiladas',
                      'Tortilla soup',
                    ].map((use) => (
                      <li key={use} className="flex items-center text-charcoal-700">
                        <svg className="w-5 h-5 text-rust-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      question: 'What makes your flour tortillas different?',
                      answer: 'Our flour tortillas are made fresh daily using premium ingredients and traditional methods. We use quality flour, fresh lard or vegetable shortening, and pure water - no preservatives or artificial ingredients. Each tortilla is hand-rolled and cooked on a hot comal for authentic texture and flavor.',
                    },
                    {
                      question: 'How long do flour tortillas stay fresh?',
                      answer: 'Our fresh flour tortillas stay soft and delicious for 7-10 days when stored in the refrigerator in their original packaging or an airtight container. You can also freeze them for up to 3 months - simply separate with parchment paper and store in a freezer bag.',
                    },
                    {
                      question: 'What size are your flour tortillas?',
                      answer: 'Our flour tortillas are 10 inches in diameter, making them perfect for burritos, quesadillas, and wraps. This versatile size works for everything from breakfast burritos to fajitas. Each package contains 8 fresh handmade tortillas.',
                    },
                    {
                      question: 'Can I freeze flour tortillas?',
                      answer: 'Yes! Flour tortillas freeze very well. Separate each tortilla with parchment paper, place in a freezer bag, and freeze for up to 3 months. Thaw at room temperature for 1-2 hours or in the refrigerator overnight. They\'ll be just as soft and delicious as fresh.',
                    },
                    {
                      question: 'How do I warm flour tortillas?',
                      answer: 'For best results, warm tortillas on a dry skillet over medium heat for 15-20 seconds per side until soft and pliable. You can also wrap them in damp paper towels and microwave for 20-30 seconds, or wrap in foil and warm in a 350°F oven for 10-15 minutes.',
                    },
                    {
                      question: 'Do you use lard or vegetable shortening?',
                      answer: 'We offer both options! Our traditional tortillas use pure lard for authentic flavor, while our vegetarian-friendly version uses high-quality vegetable shortening. Both are equally delicious and have the same soft, pillowy texture.',
                    },
                  ].map((faq, index) => (
                    <details
                      key={index}
                      className="bg-white rounded-lg border border-charcoal-200 p-6 group"
                    >
                      <summary className="font-semibold text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
                        {faq.question}
                        <svg
                          className="w-5 h-5 text-charcoal-400 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-4 text-charcoal-600 leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Product Info Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-charcoal-100 sticky top-8">
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Product Information
                </h3>

                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Size</dt>
                    <dd className="font-medium text-charcoal-900">10 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Quantity</dt>
                    <dd className="font-medium text-charcoal-900">8 per pack</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Weight</dt>
                    <dd className="font-medium text-charcoal-900">16 oz (454g)</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Shelf Life</dt>
                    <dd className="font-medium text-charcoal-900">7-10 days refrigerated</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Storage</dt>
                    <dd className="font-medium text-charcoal-900">Refrigerate</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal-600">Origin</dt>
                    <dd className="font-medium text-charcoal-900">Made in Texas</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-charcoal-100">
                  <h4 className="font-semibold text-charcoal-900 mb-3">Ingredients</h4>
                  <p className="text-sm text-charcoal-600">
                    Unbleached wheat flour, water, vegetable shortening (or lard), salt, baking powder
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-charcoal-100">
                  <h4 className="font-semibold text-charcoal-900 mb-3">Nutrition (per tortilla)</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Calories</dt>
                      <dd className="font-medium">140</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Total Fat</dt>
                      <dd className="font-medium">3.5g</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Sodium</dt>
                      <dd className="font-medium">285mg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Total Carbs</dt>
                      <dd className="font-medium">24g</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Protein</dt>
                      <dd className="font-medium">4g</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href="/pre-sale"
                  className="mt-6 block w-full text-center px-6 py-3 bg-rust-600 text-white font-semibold rounded-lg hover:bg-rust-700 transition"
                >
                  Pre-Order Now
                </Link>
              </div>

              {/* Related Links */}
              <div className="bg-gradient-to-br from-masa-100 to-sunset-50 rounded-xl p-6 border border-sunset-200">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Related Products
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products/corn-tortillas" className="text-rust-600 hover:text-rust-700 transition">
                      Corn Tortillas →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Guides */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Helpful Guides
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/guides/how-to-freeze-tortillas" className="text-rust-600 hover:text-rust-700 transition flex items-center">
                      <span className="mr-2">❄️</span>
                      How to Freeze Tortillas
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/corn-vs-flour-tortillas" className="text-rust-600 hover:text-rust-700 transition flex items-center">
                      <span className="mr-2">🌽</span>
                      Corn vs Flour Tortillas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-rust-600 to-sunset-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Ready for the Softest Flour Tortillas You've Ever Tasted?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Pre-order now and experience the difference that handcrafted quality makes.
            </p>
            <Link
              href="/pre-sale"
              className="inline-block px-8 py-4 bg-white text-rust-600 font-semibold rounded-lg hover:bg-cream-50 transition shadow-lg"
            >
              Pre-Order Flour Tortillas
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
