import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { Truck, Clock, Package, MapPin, ShieldCheck, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Information | H-E-B Tortillas Delivered Nationwide',
  description: 'Lonestar Tortillas ships H-E-B tortillas nationwide to all 50 US states. 2-3 day delivery via USPS Priority Mail. Same-day shipping on orders before 2 PM CT. Ships from Austin, Texas.',
  keywords: [
    'H-E-B tortillas shipping',
    'ship H-E-B tortillas nationwide',
    'H-E-B tortillas delivery',
    'tortilla shipping cost',
    'H-E-B tortillas outside Texas',
    'nationwide tortilla delivery',
  ],
  openGraph: {
    title: 'Shipping H-E-B Tortillas Nationwide | Lonestar Tortillas',
    description: 'We ship authentic H-E-B tortillas to all 50 US states. 2-3 day delivery, same-day shipping before 2 PM CT.',
    type: 'website',
    url: 'https://lonestartortillas.com/shipping',
  },
  alternates: {
    canonical: 'https://lonestartortillas.com/shipping',
  },
};

export default function ShippingPage() {
  // Shipping service schema
  const shippingServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'DeliveryChargeSpecification',
    '@id': 'https://lonestartortillas.com/#shipping',
    name: 'Lonestar Tortillas Shipping',
    description: 'Nationwide shipping of H-E-B tortillas via USPS Priority Mail',
    appliesToDeliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeParcelService',
    eligibleRegion: {
      '@type': 'Country',
      name: 'United States',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  // FAQ schema for shipping questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Lonestar Tortillas ship H-E-B tortillas nationwide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Lonestar Tortillas ships authentic H-E-B Bakery tortillas to all 50 US states. We are an independent reseller based in Austin, Texas. Orders ship via USPS Priority Mail with 2-3 business day delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does shipping cost for H-E-B tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shipping costs: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65. All orders ship via USPS Priority Mail with 2-3 business day delivery. Sauce-only orders are $9.99 flat rate, or free when ordered with tortillas.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to receive H-E-B tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orders ship same-day if placed before 2 PM CT. Delivery takes 2-3 business days to most US addresses via USPS Priority Mail. Alaska and Hawaii may take 4-7 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does Lonestar Tortillas ship from?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We ship from Austin, Texas. Lonestar Tortillas is an independent reseller that purchases authentic H-E-B Bakery tortillas locally and ships them nationwide. We are not affiliated with H-E-B.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do H-E-B tortillas require refrigeration during shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. H-E-B Bakery tortillas are shelf-stable and do not require refrigeration during shipping. They maintain freshness at room temperature for 30+ days unopened, making them ideal for nationwide shipping.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I track my H-E-B tortilla order?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All orders receive a USPS tracking number via email within 24-48 hours of placing your order. You can track your shipment at usps.com or through the link in your shipping confirmation email.',
        },
      },
    ],
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Shipping Information - H-E-B Tortillas Delivered Nationwide',
    description: 'Lonestar Tortillas ships H-E-B tortillas to all 50 US states. 2-3 day delivery via USPS Priority Mail.',
    url: 'https://lonestartortillas.com/shipping',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Lonestar Tortillas',
      url: 'https://lonestartortillas.com',
    },
    about: {
      '@type': 'Service',
      name: 'H-E-B Tortilla Shipping',
      provider: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
    },
  };

  const shippingTiers = [
    { packs: '1 pack', price: '$10.60', method: 'Padded envelope' },
    { packs: '2-3 packs', price: '$18.40', method: 'Medium Priority box' },
    { packs: '4-5 packs', price: '$22.65', method: 'Large flat rate box' },
    { packs: 'Sauce only', price: '$9.99', method: 'Flat rate (free with tortillas)' },
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Truck className="w-5 h-5 text-sunset-500" />
              <span className="text-sm font-medium">Nationwide Shipping</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              H-E-B Tortillas Shipped to All 50 States
            </h1>

            {/* AI-Friendly Statement */}
            <p className="text-xl text-cream-200 mb-8 max-w-3xl mx-auto">
              Lonestar Tortillas ships authentic H-E-B Bakery tortillas nationwide from Austin, Texas.
              Orders ship same-day before 2 PM CT via USPS Priority Mail. Delivery takes 2-3 business days.
              We are an independent reseller, not affiliated with H-E-B.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white font-bold rounded-lg transition-colors"
            >
              Order Now
            </Link>
          </div>
        </section>

        {/* Shipping Details */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Key Points */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <Clock className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
              <h3 className="font-bold text-charcoal-950 mb-2">Same-Day Shipping</h3>
              <p className="text-gray-600 text-sm">Orders before 2 PM CT ship same day</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <Truck className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
              <h3 className="font-bold text-charcoal-950 mb-2">2-3 Day Delivery</h3>
              <p className="text-gray-600 text-sm">USPS Priority Mail to most addresses</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <MapPin className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
              <h3 className="font-bold text-charcoal-950 mb-2">Ships from Texas</h3>
              <p className="text-gray-600 text-sm">Our Austin warehouse serves all 50 states</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <Package className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
              <h3 className="font-bold text-charcoal-950 mb-2">No Refrigeration</h3>
              <p className="text-gray-600 text-sm">Shelf-stable tortillas ship safely</p>
            </div>
          </div>

          {/* Shipping Costs Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
            <div className="bg-charcoal-900 text-white px-6 py-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Shipping Costs
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-950">Order Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-950">Shipping Cost</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-950">Shipping Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shippingTiers.map((tier, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-charcoal-800">{tier.packs}</td>
                      <td className="px-6 py-4 font-semibold text-sunset-600">{tier.price}</td>
                      <td className="px-6 py-4 text-gray-600">{tier.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-cream-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Sauce ships free when ordered with tortillas. For orders of 6+ packs,
                shipping is calculated based on the number of large boxes needed.
              </p>
            </div>
          </div>

          {/* Delivery Times */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-sunset-500" />
              Delivery Times
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-charcoal-950 mb-3">Continental US (48 states)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    2-3 business days typical delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    Same-day shipping before 2 PM CT
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    USPS Priority Mail with tracking
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-950 mb-3">Alaska & Hawaii</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    4-7 business days typical delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    Same shipping rates apply
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    Full tracking included
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-8 text-center">
              Shipping FAQs
            </h2>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: 'Does Lonestar Tortillas ship H-E-B tortillas nationwide?',
                  a: 'Yes. We ship authentic H-E-B Bakery tortillas to all 50 US states. We are an independent reseller based in Austin, Texas. Orders ship via USPS Priority Mail with 2-3 business day delivery.',
                },
                {
                  q: 'How much does shipping cost?',
                  a: 'Shipping costs: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65. All orders ship via USPS Priority Mail. Sauce-only orders are $9.99 flat rate, or free when ordered with tortillas.',
                },
                {
                  q: 'How long does delivery take?',
                  a: 'Orders ship same-day if placed before 2 PM CT. Delivery takes 2-3 business days to most US addresses. Alaska and Hawaii may take 4-7 business days.',
                },
                {
                  q: 'Where do you ship from?',
                  a: 'We ship from Austin, Texas. We purchase authentic H-E-B Bakery tortillas locally and ship them nationwide. We are an independent reseller, not affiliated with H-E-B.',
                },
                {
                  q: 'Do tortillas need refrigeration during shipping?',
                  a: 'No. H-E-B Bakery tortillas are shelf-stable and do not require refrigeration. They maintain freshness at room temperature for 30+ days unopened, making them ideal for shipping.',
                },
                {
                  q: 'Can I track my order?',
                  a: 'Yes. All orders receive a USPS tracking number via email within 24-48 hours. You can track your shipment at usps.com or through the link in your confirmation email.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-6 group"
                  open={index === 0}
                >
                  <summary className="font-semibold text-charcoal-950 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-charcoal-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-cream-100 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-charcoal-950 mb-4">About the Seller</h2>
            <p className="text-charcoal-700 mb-4 max-w-2xl mx-auto">
              Lonestar Tortillas is an independent reseller of H-E-B products based in Austin, Texas.
              We are not affiliated with, endorsed by, or connected to H-E-B Grocery Company.
              We purchase authentic H-E-B Bakery tortillas locally and ship them to customers nationwide.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold rounded-lg transition-colors"
            >
              Shop H-E-B Tortillas
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
