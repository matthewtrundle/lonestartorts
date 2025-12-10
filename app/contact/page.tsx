import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ContactFormLight } from '@/components/ContactFormLight';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Lonestar Tortillas',
  description: 'Get in touch with Lonestar Tortillas. Questions about orders, shipping, wholesale inquiries, or general questions - we\'re here to help.',
  alternates: {
    canonical: 'https://lonestartortillas.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Lonestar Tortillas',
    description: 'Have questions? We\'re here to help with orders, shipping, wholesale, and more.',
    type: 'website',
  },
};

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Lonestar Tortillas',
    description: 'Contact page for Lonestar Tortillas - questions about orders, shipping, and wholesale.',
    url: 'https://lonestartortillas.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
      email: 'howdy@lonestartortilla.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Austin',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-cream-200">
                Questions about your order, shipping, or anything else? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                Send Us a Message
              </h2>
              <ContactFormLight />
            </div>

            {/* Quick Links */}
            <div className="mt-8 bg-masa-50 rounded-xl p-6">
              <h3 className="font-semibold text-charcoal-950 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/faq"
                  className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/track"
                  className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                >
                  Track Order
                </Link>
                <Link
                  href="/wholesale"
                  className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                >
                  Wholesale
                </Link>
                <Link
                  href="/shop"
                  className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="py-8 bg-cream-100">
          <p className="text-sm text-charcoal-500 italic text-center">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>
        </div>
      </main>
    </>
  );
}
