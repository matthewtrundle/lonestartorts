'use client';

import { ContactFormLight } from '@/components/ContactFormLight';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
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
      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('contactPage.title')}
              </h1>
              <p className="text-xl text-cream-200">
                {t('contactPage.subtitle')}
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
                  {t('contactPage.sendMessage')}
                </h2>
                <ContactFormLight />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                    {t('contactPage.getInTouch')}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-sunset-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-950">{t('contactPage.location')}</h3>
                        <p className="text-charcoal-700">{t('contactPage.locationCity')}</p>
                        <p className="text-sm text-charcoal-600 mt-1">
                          {t('contactPage.locationDesc')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-sunset-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-950">{t('contactPage.businessHours')}</h3>
                        <p className="text-charcoal-700">{t('contactPage.hoursValue')}</p>
                        <p className="text-sm text-charcoal-600 mt-1">
                          {t('contactPage.hoursNote')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-masa-50 rounded-xl p-6">
                  <h3 className="font-semibold text-charcoal-950 mb-4">{t('contactPage.quickLinks')}</h3>
                  <div className="space-y-3">
                    <Link
                      href="/faq"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      {t('contactPage.links.faq')}
                    </Link>
                    <Link
                      href="/track"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      {t('contactPage.links.track')}
                    </Link>
                    <Link
                      href="/wholesale"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      {t('contactPage.links.wholesale')}
                    </Link>
                    <Link
                      href="/shop"
                      className="block text-charcoal-700 hover:text-sunset-600 transition-colors"
                    >
                      {t('contactPage.links.shop')}
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
            {t('disclaimer.text')}
          </p>
        </div>
      </main>
    </>
  );
}
