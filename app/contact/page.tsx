import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ContactFormLight } from '@/components/ContactFormLight';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

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
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                  Send Us a Message
                </h2>
                <ContactFormLight />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                    Get in Touch
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-sunset-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-950">Location</h3>
                        <p className="text-charcoal-700">Austin, Texas</p>
                        <p className="text-sm text-charcoal-600 mt-1">
                          Shipping nationwide from the heart of Texas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-sunset-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-950">Business Hours</h3>
                        <p className="text-charcoal-700">Monday - Friday: 9am - 5pm CT</p>
                        <p className="text-sm text-charcoal-600 mt-1">
                          Orders placed before 2pm CT ship same day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-masa-50 rounded-xl p-6">
                  <h3 className="font-semibold text-charcoal-950 mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link
                      href="/faq"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/track"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      Track Your Order
                    </Link>
                    <Link
                      href="/wholesale"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      Wholesale Inquiries
                    </Link>
                    <Link
                      href="/shop"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      Shop Tortillas
                    </Link>
                  </div>
                </div>
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
