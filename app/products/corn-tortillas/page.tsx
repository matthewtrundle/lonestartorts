import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Premium Corn Tortillas | Authentic Texas Masa | Lonestar Tortillas',
  description: 'Handcrafted corn tortillas made from authentic masa. Gluten-free, non-GMO, and naturally delicious. Perfect for tacos, enchiladas, and authentic Mexican cuisine. Order from Lonestar Tortillas.',
  keywords: ['corn tortillas', 'masa tortillas', 'gluten-free tortillas', 'authentic corn tortillas', 'Texas tortillas', 'Mexican corn tortillas', 'fresh corn tortillas', 'handmade tortillas', 'non-GMO tortillas'],
  openGraph: {
    title: 'Premium Corn Tortillas | Lonestar Tortillas',
    description: 'Authentic handcrafted corn tortillas made from traditional masa. Gluten-free and naturally delicious.',
    type: 'product',
  },
  colorScheme: 'light',
  themeColor: '#D97706',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function CornTortillasProductPage() {
  // Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Premium Corn Tortillas',
    description: 'Handcrafted corn tortillas made from authentic masa. Gluten-free, non-GMO, and perfect for tacos, enchiladas, and authentic Mexican cuisine.',
    brand: {
      '@type': 'Brand',
      name: 'Lonestar Tortillas',
    },
    offers: {
      '@type': 'Offer',
      price: '5.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
      url: 'https://lonestartortillas.com/products/corn-tortillas',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
    image: 'https://lonestartortillas.com/images/products/corn-tortillas.jpg',
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
        name: 'Corn Tortillas',
        item: 'https://lonestartortillas.com/products/corn-tortillas',
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
        name: 'Are corn tortillas gluten-free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our corn tortillas are 100% gluten-free. They are made from pure masa (corn flour), water, and a touch of lime. Unlike flour tortillas which contain wheat, corn tortillas are naturally gluten-free and safe for those with celiac disease or gluten sensitivity.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do corn tortillas stay fresh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our fresh corn tortillas stay fresh for 5-7 days when refrigerated in their original packaging. For best results, store them in an airtight container or resealable bag. You can also freeze them for up to 6 months - just separate each tortilla with parchment paper before freezing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size are your corn tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our corn tortillas are 6 inches in diameter, which is the traditional street taco size. This size is perfect for authentic tacos, tostadas, and enchiladas. Each package contains 12 fresh handmade tortillas.',
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
        <section className="relative overflow-hidden bg-gradient-to-b from-sunset-600 to-sunset-700 text-white">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/shop" className="hover:text-white transition">Products</Link></li>
                <li>/</li>
                <li className="text-white">Corn Tortillas</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  🌽 Gluten-Free • Non-GMO • Handcrafted
                </div>

                <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6">
                  Premium Corn Tortillas
                </h1>

                <p className="text-xl text-white/90 mb-8">
                  Authentic handcrafted corn tortillas made from traditional masa.
                  Perfectly soft, naturally gluten-free, and bursting with genuine corn flavor.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-3xl font-bold">$5.99</div>
                    <div className="text-sm text-white/80">12-pack</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">⭐ 4.9</div>
                    <div className="text-sm text-white/80">127 reviews</div>
                  </div>
                </div>

                <Link
                  href="/pre-sale"
                  className="inline-block px-8 py-4 bg-white text-sunset-600 font-semibold rounded-lg hover:bg-cream-50 transition shadow-lg"
                >
                  Pre-Order Now →
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <span className="text-6xl">🌮</span>
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
                  The Authentic Corn Tortilla Experience
                </h2>

                <div className="prose prose-lg max-w-none text-charcoal-700">
                  <p>
                    Our corn tortillas are crafted using time-honored techniques passed down through
                    generations. Each tortilla begins with premium masa made from stone-ground corn,
                    carefully nixtamalized to unlock the natural flavors and maximize nutrition.
                  </p>

                  <p>
                    Unlike mass-produced tortillas, we press each one by hand, ensuring the perfect
                    thickness and texture. The result is a tender, pliable tortilla with authentic
                    corn flavor that transforms every taco, enchilada, or tostada into a memorable experience.
                  </p>
                </div>
              </div>

              {/* What Makes Them Special */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
                  What Makes Our Corn Tortillas Special
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🌽',
                      title: 'Traditional Nixtamalization',
                      description: 'We use the ancient process of treating corn with lime water, enhancing flavor and nutrition.',
                    },
                    {
                      icon: '👐',
                      title: 'Handcrafted Daily',
                      description: 'Each tortilla is pressed by hand, never by machine, for authentic texture and taste.',
                    },
                    {
                      icon: '🚫',
                      title: 'No Preservatives',
                      description: 'Pure ingredients only: masa, water, and lime. Nothing artificial, ever.',
                    },
                    {
                      icon: '✨',
                      title: 'Gluten-Free Naturally',
                      description: 'Made from 100% corn, safe for celiac and gluten-sensitive diets.',
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

                <div className="bg-gradient-to-br from-sunset-50 to-rust-50 rounded-xl p-8 border border-sunset-200">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      'Street-style tacos',
                      'Traditional enchiladas',
                      'Crispy tostadas',
                      'Authentic chilaquiles',
                      'Soft tacos',
                      'Quesadillas',
                      'Breakfast tacos',
                      'Chips & salsa',
                    ].map((use) => (
                      <li key={use} className="flex items-center text-charcoal-700">
                        <svg className="w-5 h-5 text-sunset-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
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
                      question: 'Are corn tortillas gluten-free?',
                      answer: 'Yes! Our corn tortillas are 100% gluten-free. They are made from pure masa (corn flour), water, and a touch of lime. Unlike flour tortillas which contain wheat, corn tortillas are naturally gluten-free and safe for those with celiac disease or gluten sensitivity.',
                    },
                    {
                      question: 'How long do corn tortillas stay fresh?',
                      answer: 'Our fresh corn tortillas stay fresh for 5-7 days when refrigerated in their original packaging. For best results, store them in an airtight container or resealable bag. You can also freeze them for up to 6 months - just separate each tortilla with parchment paper before freezing.',
                    },
                    {
                      question: 'What size are your corn tortillas?',
                      answer: 'Our corn tortillas are 6 inches in diameter, which is the traditional street taco size. This size is perfect for authentic tacos, tostadas, and enchiladas. Each package contains 12 fresh handmade tortillas.',
                    },
                    {
                      question: 'Can I freeze corn tortillas?',
                      answer: 'Absolutely! Corn tortillas freeze beautifully. Separate each tortilla with parchment paper, place in a freezer bag, and freeze for up to 6 months. Thaw in the refrigerator overnight or at room temperature for 1-2 hours before use.',
                    },
                    {
                      question: 'How do I heat corn tortillas?',
                      answer: 'For best results, heat tortillas on a dry skillet or comal over medium-high heat for 30-45 seconds per side until warm and pliable. You can also wrap them in damp paper towels and microwave for 30 seconds, or char them directly over a gas flame for a smoky flavor.',
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
                    <dd className="font-medium text-charcoal-900">6 inches</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Quantity</dt>
                    <dd className="font-medium text-charcoal-900">12 per pack</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Weight</dt>
                    <dd className="font-medium text-charcoal-900">12 oz (340g)</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-100 pb-2">
                    <dt className="text-charcoal-600">Shelf Life</dt>
                    <dd className="font-medium text-charcoal-900">5-7 days refrigerated</dd>
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
                    Masa (corn treated with lime), water, salt
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-charcoal-100">
                  <h4 className="font-semibold text-charcoal-900 mb-3">Nutrition (per tortilla)</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Calories</dt>
                      <dd className="font-medium">52</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Total Fat</dt>
                      <dd className="font-medium">0.7g</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Sodium</dt>
                      <dd className="font-medium">11mg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Total Carbs</dt>
                      <dd className="font-medium">11g</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-600">Protein</dt>
                      <dd className="font-medium">1.4g</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href="/pre-sale"
                  className="mt-6 block w-full text-center px-6 py-3 bg-sunset-600 text-white font-semibold rounded-lg hover:bg-sunset-700 transition"
                >
                  Pre-Order Now
                </Link>
              </div>

              {/* Related Links */}
              <div className="bg-gradient-to-br from-masa-100 to-rust-50 rounded-xl p-6 border border-rust-200">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Related Products
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products/flour-tortillas" className="text-sunset-600 hover:text-sunset-700 transition">
                      Flour Tortillas →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Recipe Links */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Try These Recipes
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/recipes/carne-asada-tacos" className="text-sunset-600 hover:text-sunset-700 transition flex items-center">
                      <span className="mr-2">🌮</span>
                      Carne Asada Tacos
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/fish-tacos" className="text-sunset-600 hover:text-sunset-700 transition flex items-center">
                      <span className="mr-2">🐟</span>
                      Baja Fish Tacos
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/cheese-enchiladas" className="text-sunset-600 hover:text-sunset-700 transition flex items-center">
                      <span className="mr-2">🧀</span>
                      Cheese Enchiladas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sunset-600 to-rust-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Ready to Experience Authentic Corn Tortillas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Pre-order now and be among the first to taste the difference that handcrafted quality makes.
            </p>
            <Link
              href="/pre-sale"
              className="inline-block px-8 py-4 bg-white text-sunset-600 font-semibold rounded-lg hover:bg-cream-50 transition shadow-lg"
            >
              Pre-Order Corn Tortillas
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
