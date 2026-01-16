import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { LanguageProvider } from '@/lib/language-context';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { Footer } from '@/components/layout/Footer';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';

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
  alternates: {
    canonical: './',
  },
  title: {
    default: 'H-E-B® Tortillas Delivered Nationwide',
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
  category: 'food',
  classification: 'Food & Beverage',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

// Separate viewport export (Next.js 14+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#f97316', // sunset-500
};

// JSON-LD Structured Data for SEO and AIO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'OnlineStore'],
  '@id': 'https://lonestartortillas.com/#organization',
  name: 'Lonestar Tortillas',
  legalName: 'Lonestar Tortillas LLC',
  description: 'Independent reseller of authentic H-E-B® tortillas, delivering Texas flavor nationwide. We are not affiliated with or endorsed by H-E-B®.',
  slogan: 'Premium Texas Tortillas Delivered Nationwide',
  url: 'https://lonestartortillas.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://lonestartortillas.com/images/lonestar-logo.webp',
    width: 512,
    height: 512
  },
  image: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  email: 'howdy@lonestartortilla.com',
  foundingDate: '2020',
  founder: {
    '@type': 'Person',
    name: 'Maria Rodriguez',
    jobTitle: 'Founder'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78701',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'howdy@lonestartortilla.com',
    availableLanguage: ['English', 'Spanish']
  },
  sameAs: [
    'https://twitter.com/lonestartortillas',
    'https://instagram.com/lonestartortillas',
    'https://facebook.com/lonestartortillas'
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United States'
  },
  knowsAbout: ['Tortillas', 'Mexican Food', 'Texas Cuisine', 'H-E-B Products'],
  // Commerce signals
  paymentAccepted: ['Credit Card', 'Apple Pay', 'Google Pay'],
  currenciesAccepted: 'USD',
  priceRange: '$$',
  // Return policy
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 7
  }
};

// Website Schema for SEO - Product schemas are on individual product pages
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lonestar Tortillas',
  url: 'https://lonestartortillas.com',
  description: 'Buy authentic H-E-B tortillas online. Independent reseller shipping nationwide from Texas.',
  inLanguage: 'en-US',
  publisher: {
    '@id': 'https://lonestartortillas.com/#organization'
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lonestartortillas.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    {
      '@type': 'BuyAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lonestartortillas.com/shop'
      },
      name: 'Buy H-E-B Tortillas'
    }
  ]
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
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* JSON-LD Structured Data */}
        <script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Google Analytics 4 + Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-70FJ1CXM7Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-70FJ1CXM7Y');
            gtag('config', 'AW-17804372077');
          `}
        </Script>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D5AHHTRC77U7I26540JG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        {/* Vercel Analytics */}
        <Analytics />

        <ClerkProvider>
          <LanguageProvider>
            <CartProvider>
              <CartSidebar />
              <div className="min-h-screen flex flex-col">
                <HeaderWrapper />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}