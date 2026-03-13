import ShippingPageContent from '@/components/shipping/ShippingPageContent';

// Shipping service schema
const shippingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'DeliveryChargeSpecification',
  '@id': 'https://lonestartortillas.com/#shipping',
  name: 'Lonestar Tortillas Freshness First Shipping',
  description: 'Free nationwide shipping of H-E-B tortillas via USPS Priority Mail. Ships Tuesdays for maximum freshness.',
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
        text: 'Yes. Lonestar Tortillas ships authentic H-E-B Bakery tortillas to all 50 US states with FREE shipping on all orders. We are an independent reseller based in Austin, Texas. Orders ship via USPS Priority Mail with 2-3 business day delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does shipping cost for H-E-B tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shipping is FREE on all orders! We ship via USPS Priority Mail with 2-3 business day delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What days does Lonestar Tortillas ship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We ship on Tuesdays only as part of our Freshness First Shipping program. Orders placed before 2 PM CT on Tuesday go out the same day. Orders placed after 2 PM CT on Tuesday or on other days ship the following Tuesday. This schedule ensures your tortillas spend the fewest days in transit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to receive H-E-B tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We ship on Tuesdays. Orders placed before 2 PM CT on Tuesday go out the same day. Delivery takes 2-3 business days to most US addresses via USPS Priority Mail. Alaska and Hawaii may take 4-7 business days.',
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
        text: 'Yes. All orders receive a USPS tracking number via email on ship day. You can track your shipment at usps.com or through the link in your shipping confirmation email.',
      },
    },
  ],
};

// WebPage schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Freshness First Shipping - H-E-B Tortillas Delivered Nationwide',
  description: 'Lonestar Tortillas ships H-E-B tortillas to all 50 US states with FREE shipping. We ship Tuesdays for maximum freshness. 2-3 day delivery via USPS Priority Mail.',
  url: 'https://lonestartortillas.com/shipping',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Lonestar Tortillas',
    url: 'https://lonestartortillas.com',
  },
  about: {
    '@type': 'Service',
    name: 'Freshness First Shipping',
    provider: {
      '@type': 'Organization',
      '@id': 'https://lonestartortillas.com/#organization',
      name: 'Lonestar Tortillas',
    },
  },
};

// BreadcrumbList schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://lonestartortillas.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shipping',
      item: 'https://lonestartortillas.com/shipping',
    },
  ],
};

export default function ShippingPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ShippingPageContent />
    </>
  );
}
