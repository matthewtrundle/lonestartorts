import type { Metadata } from 'next'
import { SeattleContent } from './SeattleContent'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Delivered to Seattle',
  description: 'Pacific Northwest meets Texas tradition! Get authentic H-E-B® tortillas delivered to Seattle & Washington. Corn, flour & butter tortillas shipped fresh. Order today!',
  keywords: 'H-E-B tortillas Seattle, tortillas Washington delivery, Texas tortillas Seattle, H-E-B Pacific Northwest, authentic tortillas Seattle, tortilla delivery PNW',
  openGraph: {
    title: 'H-E-B Tortillas Delivered to Seattle',
    description: 'Authentic Texas H-E-B® tortillas delivered to Seattle and the Pacific Northwest. Rainy day comfort food.',
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
      name: 'Do you ship H-E-B tortillas to Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We deliver authentic H-E-B® tortillas throughout Seattle, Tacoma, Bellevue, Spokane, and all of Washington state. Our shelf-stable tortillas ship via priority mail and typically arrive within 2-3 business days. Perfect for Pacific Northwest living!',
      },
    },
    {
      '@type': 'Question',
      name: 'Will rain affect my tortilla delivery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all! Our tortillas are packaged in weatherproof packaging that protects them from Seattle\'s rain and moisture. H-E-B® tortillas are shelf-stable and maintain perfect quality regardless of weather conditions during shipping.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fresh are tortillas when they arrive in Washington?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B® tortillas are shelf-stable and arrive at peak freshness. They do not require refrigeration during shipping or storage, making them perfect for delivery to Washington. Store in your pantry for 3-4 weeks unopened, or freeze for up to 6 months.',
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
      name: 'Seattle',
      item: 'https://lonestartortillas.com/seattle',
    },
  ],
}

export default function SeattlePage() {
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
      <SeattleContent />
    </>
  )
}
