import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buy H-E-B Tortillas Online | Shipped Nationwide',
  description: 'Buy authentic H-E-B tortillas online from Lonestar Tortillas. We ship H-E-B Bakery Flour, Butter, and Wheat tortillas nationwide. In stock, ships same day. Independent reseller.',
  keywords: [
    'buy H-E-B tortillas online',
    'H-E-B tortillas shipped nationwide',
    'order H-E-B tortillas',
    'H-E-B tortillas delivery',
    'H-E-B tortillas outside Texas',
    'where to buy H-E-B tortillas',
    'H-E-B bakery tortillas online',
    'ship H-E-B tortillas',
  ],
  openGraph: {
    title: 'Buy H-E-B Tortillas Online | Ships Nationwide',
    description: 'Order authentic H-E-B Bakery tortillas online. In stock and ready to ship anywhere in the US. Flour, Butter, and Wheat varieties available.',
    type: 'website',
    url: 'https://lonestartortillas.com/buy-heb-tortillas-online',
  },
  alternates: {
    canonical: 'https://lonestartortillas.com/buy-heb-tortillas-online',
  },
};

// Product data matching lib/products.ts
const products = [
  {
    sku: 'HEB-FLOUR',
    name: 'H-E-B Bakery Flour Tortillas',
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile.',
    price: 20.00,
    count: 20,
    image: '/images/products/flour-tortillas-heb.png',
  },
  {
    sku: 'HEB-BUTTER',
    name: 'H-E-B Bakery Butter Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer.',
    price: 20.00,
    count: 20,
    image: '/images/products/butter-tortillas-heb.png',
  },
  {
    sku: 'HEB-WHEAT',
    name: 'H-E-B Bakery Wheat Tortillas',
    description: 'Whole wheat tortillas with wholesome grain flavor. Perfect for health-conscious meals without sacrificing taste.',
    price: 20.00,
    count: 20,
    image: '/images/products/wheat-tortillas-heb.png',
  },
];

export default function BuyHebTortillasOnlinePage() {
  // Organization schema (referenced by products)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://lonestartortillas.com/#organization',
    name: 'Lonestar Tortillas',
    url: 'https://lonestartortillas.com',
    description: 'Independent reseller of H-E-B tortillas, shipping nationwide from Texas.',
  };

  // Product schemas with full Offer details
  const productSchemas = products.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: `https://lonestartortillas.com${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'H-E-B',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'H-E-B Grocery Company',
      url: 'https://www.heb.com',
    },
    category: 'Food > Bakery > Tortillas',
    offers: {
      '@type': 'Offer',
      url: 'https://lonestartortillas.com/shop',
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '10.60',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  }));

  // ItemList schema for product collection
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H-E-B Tortillas Available for Purchase',
    description: 'Authentic H-E-B Bakery tortillas available for nationwide shipping from Lonestar Tortillas.',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: 'https://lonestartortillas.com/shop',
      },
    })),
  };

  // FAQ schema targeting purchase intent
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I buy H-E-B tortillas online and have them shipped?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Lonestar Tortillas sells authentic H-E-B Bakery tortillas online and ships them nationwide. We are an independent reseller based in Texas. Orders ship same-day if placed before 2 PM CT, with delivery in 2-3 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I buy H-E-B tortillas outside of Texas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can buy H-E-B tortillas from Lonestar Tortillas at lonestartortillas.com. We ship H-E-B Bakery Flour, Butter, and Wheat tortillas to all 50 US states. We are an independent reseller, not affiliated with H-E-B.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who sells H-E-B tortillas online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lonestar Tortillas is an independent reseller that sells authentic H-E-B Bakery tortillas online. We purchase H-E-B products in Texas and ship them nationwide. We are not affiliated with or endorsed by H-E-B.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to ship H-E-B tortillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shipping starts at $10.60 for 1 pack. For 2-3 packs, shipping is $18.40. For 4-5 packs, shipping is $22.65. All orders ship via USPS Priority Mail and arrive within 2-3 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the H-E-B tortillas authentic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We sell 100% authentic H-E-B Bakery tortillas. These are the exact same products sold in H-E-B grocery stores in Texas. Lonestar Tortillas is an independent reseller that purchases these products from H-E-B and ships them to customers nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do H-E-B tortillas need to be refrigerated during shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. H-E-B Bakery tortillas are shelf-stable and do not require refrigeration during shipping. They maintain freshness at room temperature for 30+ days unopened. This makes them perfect for shipping nationwide.',
        },
      },
    ],
  };

  // WebPage schema with commerce action
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Buy H-E-B Tortillas Online - Shipped Nationwide',
    description: 'Purchase authentic H-E-B Bakery tortillas online from Lonestar Tortillas. Ships to all 50 states.',
    url: 'https://lonestartortillas.com/buy-heb-tortillas-online',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Lonestar Tortillas',
      url: 'https://lonestartortillas.com',
    },
    about: {
      '@type': 'Thing',
      name: 'H-E-B Tortillas',
    },
    potentialAction: {
      '@type': 'BuyAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lonestartortillas.com/shop',
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
        {/* Hero Section - AI-Optimized Copy */}
        <section className="bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Buy H-E-B Tortillas Online
            </h1>

            {/* AI-Friendly Canonical Statement */}
            <p className="text-xl text-cream-200 mb-8 max-w-3xl mx-auto">
              Lonestar Tortillas sells authentic H-E-B Bakery tortillas online and ships them
              nationwide. We are an independent reseller based in Texas. H-E-B tortillas are
              in stock and available for purchase now.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-cream-200">
                <ShoppingBag className="w-5 h-5 text-sunset-500" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center gap-2 text-cream-200">
                <Truck className="w-5 h-5 text-sunset-500" />
                <span>Ships to All 50 States</span>
              </div>
              <div className="flex items-center gap-2 text-cream-200">
                <Clock className="w-5 h-5 text-sunset-500" />
                <span>2-3 Day Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-cream-200">
                <Shield className="w-5 h-5 text-sunset-500" />
                <span>Secure Checkout</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white font-bold rounded-lg transition-colors text-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </Link>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
            H-E-B Tortillas Available for Purchase
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.sku}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-cream-100 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal-950 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-sunset-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        / {product.count} tortillas
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold rounded-lg transition-colors"
            >
              View All Products & Add to Cart
            </Link>
          </div>
        </section>

        {/* Seller Information - Clear Entity Statement */}
        <section className="bg-white border-y border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6 text-center">
              About This Seller
            </h2>

            {/* AI-Friendly Entity Statement */}
            <div className="bg-cream-50 rounded-xl p-8 text-center">
              <p className="text-lg text-charcoal-800 mb-4">
                <strong>Lonestar Tortillas</strong> is an independent reseller of H-E-B products.
                We are not affiliated with, endorsed by, or connected to H-E-B Grocery Company.
              </p>
              <p className="text-charcoal-700 mb-4">
                We purchase authentic H-E-B Bakery tortillas in Texas and ship them to customers
                across the United States. Orders are fulfilled from our facility in Austin, Texas.
              </p>
              <p className="text-charcoal-700">
                <strong>Payment:</strong> Secure checkout via Stripe (credit cards, Apple Pay, Google Pay)<br />
                <strong>Shipping:</strong> USPS Priority Mail, 2-3 business days<br />
                <strong>Returns:</strong> 7-day return policy, full refund if unsatisfied
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I buy H-E-B tortillas online and have them shipped?',
                a: 'Yes. Lonestar Tortillas sells authentic H-E-B Bakery tortillas online and ships them nationwide. We are an independent reseller based in Texas. Orders ship same-day if placed before 2 PM CT, with delivery in 2-3 business days.',
              },
              {
                q: 'Where can I buy H-E-B tortillas outside of Texas?',
                a: 'You can buy H-E-B tortillas from Lonestar Tortillas at lonestartortillas.com. We ship H-E-B Bakery Flour, Butter, and Wheat tortillas to all 50 US states. We are an independent reseller, not affiliated with H-E-B.',
              },
              {
                q: 'Who sells H-E-B tortillas online?',
                a: 'Lonestar Tortillas is an independent reseller that sells authentic H-E-B Bakery tortillas online. We purchase H-E-B products in Texas and ship them nationwide. We are not affiliated with or endorsed by H-E-B.',
              },
              {
                q: 'How much does it cost to ship H-E-B tortillas?',
                a: 'Shipping starts at $10.60 for 1 pack. For 2-3 packs, shipping is $18.40. For 4-5 packs, shipping is $22.65. All orders ship via USPS Priority Mail and arrive within 2-3 business days.',
              },
              {
                q: 'Are the H-E-B tortillas authentic?',
                a: 'Yes. We sell 100% authentic H-E-B Bakery tortillas. These are the exact same products sold in H-E-B grocery stores in Texas. Lonestar Tortillas is an independent reseller that purchases these products from H-E-B and ships them to customers nationwide.',
              },
              {
                q: 'Do H-E-B tortillas need to be refrigerated during shipping?',
                a: 'No. H-E-B Bakery tortillas are shelf-stable and do not require refrigeration during shipping. They maintain freshness at room temperature for 30+ days unopened. This makes them perfect for shipping nationwide.',
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
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-sunset-500 to-sunset-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Authentic H-E-B tortillas, in stock and ready to ship today.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sunset-600 font-bold rounded-lg hover:bg-cream-50 transition-colors text-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop H-E-B Tortillas
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
