import type { Metadata } from 'next'
import { NewYorkContent } from './NewYorkContent'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Delivered to NYC',
  description: 'Missing Texas? Get authentic H-E-B® tortillas delivered to NYC. Corn, flour & butter tortillas shipped nationwide. Order your taste of Texas today!',
  keywords: 'H-E-B tortillas New York, tortillas NYC delivery, Texas tortillas New York, H-E-B NYC, tortilla delivery Manhattan, authentic tortillas New York City',
  openGraph: {
    title: 'H-E-B Tortillas Delivered to New York City',
    description: 'Authentic H-E-B® tortillas from Texas, delivered to all five boroughs. Order online today!',
    type: 'website',
  },
}

// FAQ Schema for voice search
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I get H-E-B tortillas delivered to New York City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver authentic H-E-B® tortillas to all five boroughs of New York City and throughout the greater NYC area. Our shelf-stable tortillas are shipped via priority mail and typically arrive within 2-3 business days. No refrigeration needed during shipping!',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take to NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shipping to New York City typically takes 2-3 business days via USPS Priority Mail. We ship Monday through Wednesday to ensure your tortillas arrive fresh before the weekend. You will receive tracking information once your order ships.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do the tortillas stay fresh during shipping to New York?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! H-E-B® tortillas are shelf-stable and do not require refrigeration during shipping or storage. They are specially designed to maintain freshness at room temperature, making them perfect for nationwide delivery. Once they arrive, simply store them in your pantry.',
      },
    },
  ],
}

// Organization Schema (online business, not LocalBusiness)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lonestar Tortillas',
  description: 'Authentic H-E-B® tortillas delivered nationwide',
  url: 'https://lonestartortillas.com',
  logo: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  sameAs: [],
}

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
      name: 'New York',
      item: 'https://lonestartortillas.com/new-york',
    },
  ],
}

export default function NewYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewYorkContent />
    </>
  )
}
