import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop H-E-B Tortillas Online | Buy Now, Ships Nationwide',
  description: 'Buy authentic H-E-B Bakery tortillas online. Flour, Butter, and Wheat tortillas in stock and ready to ship nationwide. Lonestar Tortillas is an independent reseller, not affiliated with H-E-B.',
  keywords: [
    'buy H-E-B tortillas',
    'H-E-B tortillas online',
    'shop H-E-B tortillas',
    'H-E-B flour tortillas',
    'H-E-B butter tortillas',
    'order H-E-B tortillas',
  ],
  alternates: {
    canonical: 'https://lonestartortillas.com/shop',
  },
  openGraph: {
    title: 'Shop H-E-B Tortillas | Lonestar Tortillas',
    description: 'Buy authentic H-E-B Bakery tortillas online. In stock, ships nationwide from Texas.',
    url: 'https://lonestartortillas.com/shop',
    type: 'website',
  },
};

// Product schemas for H-E-B tortillas - proper seller/manufacturer separation
const productSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'H-E-B Bakery Flour Tortillas',
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile. 20 tortillas per pack.',
    sku: 'HEB-FLOUR',
    image: 'https://lonestartortillas.com/images/products/flour-tortillas-heb.png',
    brand: { '@type': 'Brand', name: 'H-E-B' },
    manufacturer: { '@type': 'Organization', name: 'H-E-B Grocery Company' },
    offers: {
      '@type': 'Offer',
      url: 'https://lonestartortillas.com/shop',
      priceCurrency: 'USD',
      price: '20.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
        },
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'H-E-B Bakery Butter Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer. 20 tortillas per pack.',
    sku: 'HEB-BUTTER',
    image: 'https://lonestartortillas.com/images/products/butter-tortillas-heb.png',
    brand: { '@type': 'Brand', name: 'H-E-B' },
    manufacturer: { '@type': 'Organization', name: 'H-E-B Grocery Company' },
    offers: {
      '@type': 'Offer',
      url: 'https://lonestartortillas.com/shop',
      priceCurrency: 'USD',
      price: '20.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
        },
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'H-E-B Bakery Wheat Tortillas',
    description: 'Whole wheat tortillas with wholesome grain flavor. Perfect for health-conscious meals without sacrificing taste. 20 tortillas per pack.',
    sku: 'HEB-WHEAT',
    image: 'https://lonestartortillas.com/images/products/wheat-tortillas-heb.png',
    brand: { '@type': 'Brand', name: 'H-E-B' },
    manufacturer: { '@type': 'Organization', name: 'H-E-B Grocery Company' },
    offers: {
      '@type': 'Offer',
      url: 'https://lonestartortillas.com/shop',
      priceCurrency: 'USD',
      price: '20.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
        },
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'H-E-B That Green Sauce',
    description: 'The legendary H-E-B That Green Sauce. Perfect for tacos, enchiladas, and everything in between.',
    sku: 'HEB-GREEN-SAUCE',
    image: 'https://lonestartortillas.com/images/products/green-sauce-heb.png',
    brand: { '@type': 'Brand', name: 'H-E-B' },
    manufacturer: { '@type': 'Organization', name: 'H-E-B Grocery Company' },
    offers: {
      '@type': 'Offer',
      url: 'https://lonestartortillas.com/shop',
      priceCurrency: 'USD',
      price: '12.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://lonestartortillas.com/#organization',
        name: 'Lonestar Tortillas',
      },
    },
  },
];

// ItemList schema for the product collection
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'H-E-B Tortillas for Sale',
  description: 'Authentic H-E-B Bakery tortillas available for purchase online from Lonestar Tortillas. Ships nationwide.',
  numberOfItems: 4,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'H-E-B Bakery Flour Tortillas', url: 'https://lonestartortillas.com/shop' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'H-E-B Bakery Butter Tortillas', url: 'https://lonestartortillas.com/shop' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'H-E-B Bakery Wheat Tortillas', url: 'https://lonestartortillas.com/shop' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'H-E-B That Green Sauce', url: 'https://lonestartortillas.com/shop' } },
  ],
};

// WebPage schema with commerce action
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Shop H-E-B Tortillas Online',
  description: 'Buy authentic H-E-B Bakery tortillas online. In stock and ready to ship nationwide from Lonestar Tortillas, an independent reseller.',
  url: 'https://lonestartortillas.com/shop',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Lonestar Tortillas',
    url: 'https://lonestartortillas.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'H-E-B Tortillas for Sale',
  },
  potentialAction: {
    '@type': 'BuyAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://lonestartortillas.com/shop',
    },
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Product Schemas */}
      {productSchemas.map((schema, i) => (
        <script
          key={`product-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {children}
    </>
  );
}
