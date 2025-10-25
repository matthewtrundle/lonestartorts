import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';
import Analytics from '@/components/Analytics';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import WebVitalsMonitor from '@/components/seo/WebVitalsMonitor';

// Optimized font loading with Next.js
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lonestartortillas.com'),
  title: {
    default: 'Lonestar Tortillas - Authentic H-E-B® Tortillas Delivered Nationwide',
    template: '%s | Lonestar Tortillas'
  },
  description: 'Buy authentic H-E-B® tortillas online - delivered nationwide! Premium Texas flour, corn & butter tortillas. Shelf-stable, ships fresh. Independent reseller serving all 50 states.',
  keywords: [
    'H-E-B tortillas',
    'Texas tortillas delivery',
    'buy H-E-B tortillas online',
    'authentic Mexican tortillas',
    'corn tortillas',
    'flour tortillas',
    'butter tortillas',
    'Mi Tienda tortillas',
    'Texas grocery delivery',
    'shelf stable tortillas',
    'tortilla subscription',
    'bulk tortillas online',
    'authentic tex-mex',
    'San Antonio tortillas',
    'Austin tortillas',
    'Houston tortillas',
    'Dallas tortillas',
    'nationwide tortilla delivery',
    'fresh tortillas shipped',
    'Mexican food delivery'
  ].join(', '),
  authors: [{ name: 'Lonestar Tortillas' }],
  creator: 'Lonestar Tortillas',
  publisher: 'Lonestar Tortillas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Lonestar Tortillas - Authentic H-E-B® Tortillas Delivered Nationwide',
    description: 'Those who know tortillas, know H-E-B®. Get authentic Texas tortillas delivered to your door. Premium quality, shelf-stable, shipped nationwide.',
    url: 'https://lonestartortillas.com',
    siteName: 'Lonestar Tortillas',
    images: [
      {
        url: '/images/lonestar-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Lonestar Tortillas - Premium Texas Tortillas',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lonestar Tortillas - H-E-B® Tortillas Delivered',
    description: 'Authentic Texas tortillas delivered nationwide. Those who know, know H-E-B®.',
    creator: '@lonestartortillas',
    images: ['/images/lonestar-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lonestartortillas.com',
  },
  category: 'food',
  classification: 'Food & Beverage',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: '#f97316', // sunset-500
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

// JSON-LD Structured Data for SEO and AIO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lonestar Tortillas',
  description: 'Independent reseller of authentic H-E-B® tortillas, delivering Texas flavor nationwide',
  url: 'https://lonestartortillas.com',
  logo: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  founder: {
    '@type': 'Person',
    name: 'Maria Rodriguez',
    jobTitle: 'Founder & CEO'
  },
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    addressCountry: 'US'
  },
  sameAs: [
    'https://twitter.com/lonestartortillas',
    'https://instagram.com/lonestartortillas',
    'https://facebook.com/lonestartortillas'
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '3.99',
    highPrice: '89.99',
    offerCount: '12',
    offers: [
      {
        '@type': 'Offer',
        name: 'Corn Tortillas Pack',
        description: 'Traditional corn tortillas, shelf-stable',
        priceCurrency: 'USD',
        price: '12.99',
        availability: 'https://schema.org/PreOrder'
      },
      {
        '@type': 'Offer',
        name: 'Flour Tortillas Pack',
        description: 'Soft flour tortillas, 30-day fresh',
        priceCurrency: 'USD',
        price: '14.99',
        availability: 'https://schema.org/PreOrder'
      },
      {
        '@type': 'Offer',
        name: 'Variety Pack',
        description: 'Mix of corn, flour, and specialty tortillas',
        priceCurrency: 'USD',
        price: '39.99',
        availability: 'https://schema.org/PreOrder'
      }
    ]
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States'
  },
  priceRange: '$$',
  acceptedPaymentMethod: [
    'https://schema.org/CreditCard',
    'https://schema.org/PaymentMethod'
  ]
};

// FAQ Schema for common questions
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are you affiliated with H-E-B?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, we are an independent reseller. We are not affiliated with or endorsed by H-E-B®. We source and deliver authentic H-E-B® products to customers nationwide.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you ship nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We ship shelf-stable H-E-B® tortillas to all 50 states. Our tortillas are specially packaged to maintain freshness without refrigeration.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long do the tortillas last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our shelf-stable tortillas last 30+ days without refrigeration. Once opened, we recommend consuming within 7-10 days for best quality.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of tortillas do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer corn tortillas, flour tortillas, butter tortillas, and specialty varieties including whole wheat and spinach herb tortillas.'
      }
    }
  ]
};

// Product Schema for individual products
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'H-E-B® Tortilla Collection',
  description: 'Authentic Texas tortillas from H-E-B®, delivered nationwide',
  brand: {
    '@type': 'Brand',
    name: 'H-E-B'
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '12.99',
    highPrice: '89.99',
    availability: 'https://schema.org/PreOrder',
    seller: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Lonestar Tortillas" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lonestar Tortillas" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Austin" />
        <meta name="geo.position" content="30.266666;-97.733330" />
        <meta name="ICBM" content="30.266666, -97.733330" />

        {/* Additional Open Graph Tags */}
        <meta property="og:locale:alternate" content="es_US" />
        <meta property="og:video" content="https://lonestartortillas.com/Taste%20of%20Texas_compressed.mp4" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon variations */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
        <Script
          id="json-ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          strategy="afterInteractive"
        />
        <Script
          id="json-ld-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: false
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        <GoogleTagManager />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <GoogleTagManagerNoScript />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <WebVitalsMonitor />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}