import type { Metadata } from 'next'
import { LosAngelesContent } from './LosAngelesContent'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Delivered to LA',
  description: 'Authentic Texas H-E-B® tortillas delivered to Los Angeles & SoCal. Better than Mission! Corn, flour & butter tortillas shipped fresh. Order now!',
  keywords: 'H-E-B tortillas Los Angeles, tortillas LA delivery, Texas tortillas California, H-E-B Los Angeles, authentic tortillas LA, tortilla delivery Southern California',
  openGraph: {
    title: 'H-E-B Tortillas Delivered to Los Angeles',
    description: 'Bring authentic Texas flavor to California. H-E-B® tortillas delivered to LA & SoCal.',
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
      name: 'Can you ship H-E-B tortillas to Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver authentic H-E-B® tortillas throughout Los Angeles, Orange County, and all of Southern California. Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. No refrigeration needed during shipping!',
      },
    },
    {
      '@type': 'Question',
      name: 'How are H-E-B tortillas different from Mission tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B tortillas are made in Texas with a time-tested recipe that Texans have trusted for generations. While Mission (also a California brand) makes good tortillas, many people prefer the authentic Texas flavor, softer texture, and superior quality of H-E-B tortillas. Bon Appétit magazine called H-E-B "the best supermarket-brand tortilla out there."',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to refrigerate tortillas during LA shipping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No! H-E-B® tortillas are shelf-stable and require no refrigeration during shipping or storage. They maintain perfect freshness at room temperature, making them ideal for California\'s climate and nationwide delivery. Simply store in your pantry for 3-4 weeks unopened.',
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
      name: 'Los Angeles',
      item: 'https://lonestartortillas.com/los-angeles',
    },
  ],
}

export default function LosAngelesPage() {
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
      <LosAngelesContent />
    </>
  )
}
