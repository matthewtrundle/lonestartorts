import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Homemade vs Store-Bought Tortillas',
  description: 'Complete comparison of homemade and store-bought tortillas covering cost, time, quality, and taste. Expert guide to help you decide which option is right for you.',
  keywords: [
    'homemade tortillas',
    'store bought tortillas',
    'homemade vs store bought',
    'are homemade tortillas better',
    'how to make tortillas at home',
    'best store bought tortillas',
    'tortilla comparison',
    'fresh tortillas',
    'authentic tortillas',
  ],
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/homemade-vs-store-bought',
  },
  openGraph: {
    title: 'Homemade vs Store-Bought Tortillas | Complete Comparison Guide',
    description: 'Detailed comparison of homemade and store-bought tortillas. Learn about cost, quality, taste, and convenience to make the right choice.',
    type: 'article',
    url: 'https://lonestartortillas.com/guides/homemade-vs-store-bought',
  },
};

export default function HomemadeVsStoreBoughtPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Homemade vs Store-Bought Tortillas | Which is Better?',
    description: 'Complete comparison of homemade and store-bought tortillas covering cost, time, quality, and taste. Expert guide to help you decide.',
    author: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
      url: 'https://lonestartortillas.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lonestartortillas.com/logo.png',
      },
    },
    datePublished: '2025-01-15',
    dateModified: '2025-10-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://lonestartortillas.com/guides/homemade-vs-store-bought',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are homemade tortillas better than store-bought?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Homemade tortillas are generally fresher and more flavorful, with better texture and no preservatives. However, they require time and effort. Premium store-bought tortillas like Lonestar can offer comparable quality with the convenience of being ready to use.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much money do you save making your own tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Homemade tortillas cost about $0.15-0.25 per tortilla compared to $0.50-0.75 for premium store-bought. However, this doesn\'t account for time investment (30-60 minutes) or equipment costs. For occasional use, premium store-bought may be more economical.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do homemade tortillas stay fresh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Homemade tortillas stay fresh for 2-3 days at room temperature, 5-7 days refrigerated, or up to 3 months frozen. Store-bought tortillas with preservatives can last 2-4 weeks refrigerated, making them more convenient for occasional use.',
        },
      },
      {
        '@type': 'Question',
        name: 'What equipment do I need to make tortillas at home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For corn tortillas: masa harina, tortilla press ($15-50), and comal or cast iron pan. For flour tortillas: flour, rolling pin, and comal. Initial equipment investment ranges from $20-100. Premium store-bought tortillas require no equipment investment.',
        },
      },
    ],
  };

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
        name: 'Guides',
        item: 'https://lonestartortillas.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Homemade vs Store-Bought Tortillas',
        item: 'https://lonestartortillas.com/guides/homemade-vs-store-bought',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-sunset-500 to-sunset-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-sunset-100">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/guides" className="hover:text-white transition">
                    Guides
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">Homemade vs Store-Bought</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Homemade vs Store-Bought Tortillas
            </h1>
            <p className="text-xl text-sunset-100">
              The complete guide to choosing between homemade and store-bought tortillas
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Answer */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-xl font-semibold text-sunset-900 mb-2">Quick Answer</h2>
            <p className="text-sunset-800">
              <strong>Homemade tortillas</strong> offer superior freshness, flavor, and texture but require 30-60 minutes of preparation time. <strong>Premium store-bought tortillas</strong> provide comparable quality with zero prep time, making them ideal for busy schedules. The best choice depends on your priorities: time vs. experience.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Quick Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-sunset-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Factor</th>
                    <th className="px-6 py-4 text-left font-semibold">Homemade</th>
                    <th className="px-6 py-4 text-left font-semibold">Store-Bought (Premium)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100">
                  <tr>
                    <td className="px-6 py-4 font-medium text-charcoal-900">Cost per Tortilla</td>
                    <td className="px-6 py-4 text-charcoal-700">$0.15 - $0.25</td>
                    <td className="px-6 py-4 text-charcoal-700">$0.50 - $0.75</td>
                  </tr>
                  <tr className="bg-cream-50">
                    <td className="px-6 py-4 font-medium text-charcoal-900">Time Investment</td>
                    <td className="px-6 py-4 text-charcoal-700">30-60 minutes</td>
                    <td className="px-6 py-4 text-charcoal-700">0 minutes (ready to use)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-charcoal-900">Freshness</td>
                    <td className="px-6 py-4 text-charcoal-700">Maximum (same day)</td>
                    <td className="px-6 py-4 text-charcoal-700">Very Fresh (daily batches)</td>
                  </tr>
                  <tr className="bg-cream-50">
                    <td className="px-6 py-4 font-medium text-charcoal-900">Shelf Life</td>
                    <td className="px-6 py-4 text-charcoal-700">2-3 days (room temp)</td>
                    <td className="px-6 py-4 text-charcoal-700">7-10 days (refrigerated)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-charcoal-900">Equipment Needed</td>
                    <td className="px-6 py-4 text-charcoal-700">Press, comal, rolling pin</td>
                    <td className="px-6 py-4 text-charcoal-700">None</td>
                  </tr>
                  <tr className="bg-cream-50">
                    <td className="px-6 py-4 font-medium text-charcoal-900">Skill Level</td>
                    <td className="px-6 py-4 text-charcoal-700">Intermediate (practice needed)</td>
                    <td className="px-6 py-4 text-charcoal-700">None</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-charcoal-900">Customization</td>
                    <td className="px-6 py-4 text-charcoal-700">Full control over ingredients</td>
                    <td className="px-6 py-4 text-charcoal-700">Limited to available products</td>
                  </tr>
                  <tr className="bg-cream-50">
                    <td className="px-6 py-4 font-medium text-charcoal-900">Taste & Texture</td>
                    <td className="px-6 py-4 text-charcoal-700">Excellent (when done right)</td>
                    <td className="px-6 py-4 text-charcoal-700">Excellent (premium brands)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cost Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Cost Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Homemade Costs */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-sunset-600 mb-4">
                  Homemade Tortillas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal-700">Masa harina (2 lbs)</span>
                    <span className="font-medium">$6.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-700">Makes approximately</span>
                    <span className="font-medium">30 tortillas</span>
                  </div>
                  <div className="border-t border-charcoal-200 pt-3 flex justify-between text-lg">
                    <span className="font-semibold text-charcoal-900">Cost per tortilla</span>
                    <span className="font-bold text-sunset-600">$0.20</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-charcoal-200">
                    <p className="text-sm text-charcoal-600 font-medium mb-2">Initial Equipment:</p>
                    <ul className="text-sm text-charcoal-600 space-y-1">
                      <li>• Tortilla press: $25-50</li>
                      <li>• Cast iron comal: $20-40</li>
                      <li>• <strong>Total investment: $45-90</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Store-Bought Costs */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-masa-600 mb-4">
                  Premium Store-Bought
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal-700">Lonestar Tortillas (10-pack)</span>
                    <span className="font-medium">$5.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-700">Number of tortillas</span>
                    <span className="font-medium">10 tortillas</span>
                  </div>
                  <div className="border-t border-charcoal-200 pt-3 flex justify-between text-lg">
                    <span className="font-semibold text-charcoal-900">Cost per tortilla</span>
                    <span className="font-bold text-masa-600">$0.60</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-charcoal-200">
                    <p className="text-sm text-charcoal-600 font-medium mb-2">Additional Benefits:</p>
                    <ul className="text-sm text-charcoal-600 space-y-1">
                      <li>• No equipment needed</li>
                      <li>• Zero prep time</li>
                      <li>• <strong>Total investment: $0</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-sunset-50 rounded-lg p-6">
              <h4 className="font-semibold text-charcoal-900 mb-2">The Real Cost Equation</h4>
              <p className="text-charcoal-700 mb-4">
                While homemade tortillas are cheaper per unit ($0.20 vs $0.60), you must factor in:
              </p>
              <ul className="space-y-2 text-charcoal-700">
                <li className="flex items-start">
                  <span className="text-sunset-500 mr-2">•</span>
                  <span><strong>Time value:</strong> 45 minutes @ $20/hour = $15 of your time per batch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 mr-2">•</span>
                  <span><strong>Equipment amortization:</strong> $70 initial investment ÷ 100 batches = $0.70 per batch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sunset-500 mr-2">•</span>
                  <span><strong>Learning curve:</strong> First 3-5 batches may have imperfect results</span>
                </li>
              </ul>
              <p className="mt-4 text-charcoal-800 font-medium">
                💡 Verdict: For regular weekly use (3+ times), homemade saves money. For occasional use (1-2 times/month), premium store-bought is more economical.
              </p>
            </div>
          </section>

          {/* Time Investment */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Time Investment Comparison
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Homemade Timeline */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-sunset-600 mb-4">
                  Homemade Process (Corn Tortillas)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-sunset-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      1
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Mix masa dough</p>
                      <p className="text-sm text-charcoal-600">5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sunset-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      2
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Rest dough</p>
                      <p className="text-sm text-charcoal-600">10-15 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sunset-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      3
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Portion and press</p>
                      <p className="text-sm text-charcoal-600">15 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sunset-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      4
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Cook on comal (batch)</p>
                      <p className="text-sm text-charcoal-600">20-25 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sunset-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      5
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Cleanup</p>
                      <p className="text-sm text-charcoal-600">10 minutes</p>
                    </div>
                  </div>
                  <div className="border-t border-charcoal-200 pt-4 mt-4">
                    <p className="text-lg font-bold text-charcoal-900">Total: 60-70 minutes</p>
                  </div>
                </div>
              </div>

              {/* Store-Bought Timeline */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-masa-600 mb-4">
                  Store-Bought Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-masa-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      1
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Open package</p>
                      <p className="text-sm text-charcoal-600">5 seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-masa-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      2
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Warm on comal (optional)</p>
                      <p className="text-sm text-charcoal-600">30-60 seconds per tortilla</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-masa-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      3
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal-900">Serve</p>
                      <p className="text-sm text-charcoal-600">Immediate</p>
                    </div>
                  </div>
                  <div className="border-t border-charcoal-200 pt-4 mt-8">
                    <p className="text-lg font-bold text-charcoal-900">Total: 2-3 minutes</p>
                  </div>
                  <div className="bg-masa-50 rounded-lg p-4 mt-6">
                    <p className="text-sm text-charcoal-700">
                      <strong>Time saved:</strong> 57-67 minutes per meal. Over a year (weekly use), that's <strong>50+ hours</strong> saved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quality & Taste */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Quality & Taste Comparison
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Homemade Quality */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-sunset-600 mb-4">
                  Homemade Tortillas
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Advantages</h4>
                    <ul className="space-y-2 text-charcoal-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Maximum freshness (same-day consumption)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Complete control over ingredients and thickness</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>No preservatives or additives</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Authentic texture and corn flavor</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Satisfying cooking experience</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Disadvantages</h4>
                    <ul className="space-y-2 text-charcoal-700">
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Inconsistent results during learning curve</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Quality depends heavily on technique</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Short shelf life (2-3 days)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Can become dry or brittle if overcooked</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Store-Bought Quality */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-xl font-semibold text-masa-600 mb-4">
                  Premium Store-Bought
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Advantages</h4>
                    <ul className="space-y-2 text-charcoal-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Consistent quality every time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Professional equipment ensures uniform thickness</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Longer shelf life (7-10 days refrigerated)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Made fresh daily by experts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Zero effort or skill required</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Disadvantages</h4>
                    <ul className="space-y-2 text-charcoal-700">
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>May contain preservatives (varies by brand)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Limited customization options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Less satisfying than making your own</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rust-500 mr-2">✗</span>
                        <span>Budget brands can be dry or flavorless</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose Each */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              When to Choose Each Option
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Choose Homemade */}
              <div className="bg-gradient-to-br from-sunset-50 to-sunset-100 rounded-lg p-6 border-2 border-sunset-300">
                <h3 className="text-2xl font-bold text-sunset-900 mb-4">
                  Choose Homemade When:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>You have time:</strong> 60+ minutes for a relaxing cooking project
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Regular usage:</strong> Making tortillas 3+ times per week
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Dietary restrictions:</strong> Need specific ingredients or no preservatives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Cultural connection:</strong> Teaching family traditions or preserving heritage
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Cooking enthusiast:</strong> You enjoy the process and have equipment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Budget priority:</strong> Cost per unit matters more than time
                    </span>
                  </li>
                </ul>
              </div>

              {/* Choose Store-Bought */}
              <div className="bg-gradient-to-br from-masa-50 to-masa-100 rounded-lg p-6 border-2 border-masa-300">
                <h3 className="text-2xl font-bold text-masa-900 mb-4">
                  Choose Store-Bought When:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Limited time:</strong> Need tortillas ready in minutes, not hours
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Occasional use:</strong> Making Mexican food 1-2 times per month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Consistent results:</strong> Want perfect tortillas every time with zero effort
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>No equipment:</strong> Don't own a press or comal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Last-minute meals:</strong> Didn't plan ahead for homemade prep
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-masa-600 font-bold mr-3 text-xl">→</span>
                    <span className="text-charcoal-800">
                      <strong>Convenience priority:</strong> Value your time at $20+ per hour
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Middle Ground */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">
                The Best of Both Worlds
              </h2>
              <p className="text-lg text-charcoal-100 mb-6">
                You don't have to choose just one option. Many tortilla lovers use a hybrid approach:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-semibold text-sunset-300 mb-2">Weeknights</h3>
                  <p className="text-charcoal-100">
                    Use premium store-bought tortillas for quick tacos after work
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-semibold text-sunset-300 mb-2">Weekends</h3>
                  <p className="text-charcoal-100">
                    Make homemade tortillas as a family activity or special occasion
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-semibold text-sunset-300 mb-2">Parties</h3>
                  <p className="text-charcoal-100">
                    Buy premium tortillas in bulk to save prep time for other dishes
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  Are homemade tortillas better than store-bought?
                </h3>
                <p className="text-charcoal-700">
                  Homemade tortillas are generally fresher and more flavorful, with better texture and no preservatives. However, they require time and effort. Premium store-bought tortillas like Lonestar can offer comparable quality with the convenience of being ready to use. The "better" choice depends on your priorities: if you value the experience and have time, homemade wins. If you value convenience and consistency, premium store-bought is excellent.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  How much money do you save making your own tortillas?
                </h3>
                <p className="text-charcoal-700">
                  Homemade tortillas cost about $0.15-0.25 per tortilla compared to $0.50-0.75 for premium store-bought. For a batch of 30 tortillas, that's $6 vs $18-22 in ingredients alone—saving $12-16 per batch. However, this doesn't account for time investment (60 minutes) or equipment costs ($45-90 initial investment). If you value your time at $20/hour, each batch costs $20 in time plus $6 in ingredients = $26 total, making the per-tortilla cost about $0.87 when time is factored in. For regular weekly use, homemade becomes economical after 3-5 batches once equipment is paid off.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  How long do homemade tortillas stay fresh?
                </h3>
                <p className="text-charcoal-700">
                  Homemade tortillas stay fresh for 2-3 days at room temperature when stored in an airtight container or resealable bag. Refrigerated, they last 5-7 days. For longer storage, freeze them for up to 3 months by separating with parchment paper and storing in a freezer bag. Store-bought tortillas with preservatives can last 2-4 weeks refrigerated, making them more convenient for occasional use.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  What equipment do I need to make tortillas at home?
                </h3>
                <p className="text-charcoal-700 mb-3">
                  For <strong>corn tortillas</strong>, you'll need:
                </p>
                <ul className="space-y-1 text-charcoal-700 mb-3">
                  <li>• Masa harina (corn flour treated with lime)</li>
                  <li>• Tortilla press ($15-50, cast iron preferred)</li>
                  <li>• Comal or cast iron skillet ($20-40)</li>
                  <li>• Parchment paper or plastic sheets for pressing</li>
                  <li>• Bowl for mixing</li>
                </ul>
                <p className="text-charcoal-700 mb-3">
                  For <strong>flour tortillas</strong>, you'll need:
                </p>
                <ul className="space-y-1 text-charcoal-700 mb-3">
                  <li>• All-purpose flour, fat (lard or shortening), salt, water</li>
                  <li>• Rolling pin</li>
                  <li>• Comal or cast iron skillet</li>
                  <li>• Bowl and clean kitchen towel</li>
                </ul>
                <p className="text-charcoal-700">
                  <strong>Total initial investment:</strong> $20-100 depending on equipment quality. Premium store-bought tortillas require no equipment investment, making them ideal for those without kitchen space or budget for specialized tools.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  Can you taste the difference between homemade and store-bought tortillas?
                </h3>
                <p className="text-charcoal-700">
                  Yes, when comparing homemade to budget store-bought tortillas, the difference is dramatic—homemade have better texture, corn flavor, and freshness. However, when comparing homemade to <em>premium</em> store-bought tortillas (like Lonestar), the gap narrows significantly. Premium brands use traditional methods, quality ingredients, and make fresh batches daily, delivering results that rival homemade while saving you an hour of prep time.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                  Is making tortillas at home hard?
                </h3>
                <p className="text-charcoal-700">
                  Corn tortillas are relatively easy but require practice to master thickness and cooking temperature. Expect your first 2-3 batches to have imperfect results—some may crack, tear, or cook unevenly. Flour tortillas are more forgiving but require good rolling technique. With practice, the process becomes meditative and rewarding. If you're short on time or don't enjoy cooking, premium store-bought tortillas deliver excellent results without the learning curve.
                </p>
              </div>
            </div>
          </section>

          {/* Final Verdict */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-sunset-500 to-rust-500 text-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">
                Our Verdict
              </h2>
              <div className="text-lg space-y-4">
                <p>
                  Both homemade and premium store-bought tortillas have their place in a well-stocked kitchen. The right choice depends on your lifestyle, cooking frequency, and personal values.
                </p>
                <div className="bg-white/10 rounded-lg p-6 mt-6">
                  <p className="font-semibold mb-3">Choose Homemade If:</p>
                  <p className="text-cream-100">
                    You make tortillas 3+ times per week, enjoy cooking as a hobby, have 60 minutes to spare, and want maximum control over ingredients. The cost savings compound over time, and the skill becomes second nature.
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <p className="font-semibold mb-3">Choose Premium Store-Bought If:</p>
                  <p className="text-cream-100">
                    You value your time, make Mexican food 1-2 times per month, want consistent restaurant-quality results, or don't own specialized equipment. Lonestar Tortillas delivers authentic flavor and texture made by experts daily—no learning curve required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-masa-500 to-masa-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Experience Premium Handcrafted Tortillas
            </h2>
            <p className="text-xl text-masa-100 mb-6 max-w-2xl mx-auto">
              Skip the prep time and enjoy authentic, handcrafted tortillas made fresh daily. Lonestar brings traditional quality to your table with zero effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pre-sale"
                className="bg-white text-masa-600 px-8 py-4 rounded-lg font-semibold hover:bg-cream-50 transition shadow-lg"
              >
                Pre-Order Tortillas
              </Link>
              <Link
                href="/products/corn-tortillas"
                className="bg-masa-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-masa-800 transition border-2 border-white/20"
              >
                View Our Products
              </Link>
            </div>
          </section>

          {/* Related Content */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
              Related Guides & Recipes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/guides/how-to-freeze-tortillas"
                className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100 hover:border-sunset-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-sunset-600 mb-2">
                  How to Freeze Tortillas
                </h3>
                <p className="text-sm text-charcoal-600">
                  Complete guide to freezing and thawing tortillas for maximum freshness
                </p>
              </Link>
              <Link
                href="/guides/tortilla-warmers"
                className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100 hover:border-sunset-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-sunset-600 mb-2">
                  Best Tortilla Warmers
                </h3>
                <p className="text-sm text-charcoal-600">
                  Keep your tortillas warm and soft with the right warming method
                </p>
              </Link>
              <Link
                href="/recipes/carne-asada-tacos"
                className="bg-white rounded-lg shadow-sm p-6 border border-charcoal-100 hover:border-sunset-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-sunset-600 mb-2">
                  Carne Asada Tacos Recipe
                </h3>
                <p className="text-sm text-charcoal-600">
                  Authentic street-style tacos with marinated grilled steak
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
