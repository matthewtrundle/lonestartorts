'use client';

import Link from 'next/link';
import { ContactFormLight } from '@/components/ContactFormLight';
import {
  TexasStarIcon,
  CalendarTuesdayIcon,
  WheatIcon,
  ComalIcon,
  TortillaStackIcon,
} from '@/components/ui/Icons';
import { useLanguage } from '@/lib/language-context';
import { MariaCTA } from '@/components/chat/MariaCTA';

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Editorial page header */}
      <section className="relative overflow-hidden bg-charcoal-950 text-cream-50 py-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 right-0 h-[200%] w-1/2 bg-gradient-radial from-sunset-900/40 to-transparent"
        />
        <div className="container relative mx-auto px-4 md:px-8 max-w-6xl">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sunset-400">
              Say Howdy
            </p>
            <h1 className="font-display text-balance text-5xl md:text-6xl font-bold mb-4">
              {t('contactPage.title')}
            </h1>
            <p className="text-xl text-cream-200 text-pretty">
              {t('contactPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3 rounded-xl border border-charcoal-200/60 bg-white p-8 shadow-soft">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-950 mb-6">
                {t('contactPage.sendMessage')}
              </h2>
              <ContactFormLight />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-950 mb-6">
                  {t('contactPage.getInTouch')}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <TexasStarIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sunset-600" />
                    <div>
                      <h3 className="font-semibold text-charcoal-950">{t('contactPage.location')}</h3>
                      <p className="text-charcoal-700">{t('contactPage.locationCity')}</p>
                      <p className="text-sm text-charcoal-600 mt-1 text-pretty">
                        {t('contactPage.locationDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarTuesdayIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sunset-600" />
                    <div>
                      <h3 className="font-semibold text-charcoal-950">{t('contactPage.businessHours')}</h3>
                      <p className="text-charcoal-700">{t('contactPage.hoursValue')}</p>
                      <p className="text-sm text-charcoal-600 mt-1 text-pretty">
                        {t('contactPage.hoursNote')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <WheatIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sunset-600" />
                    <div>
                      <h3 className="font-semibold text-charcoal-950">Email Us</h3>
                      <a
                        href="mailto:howdy@lonestartortillas.com"
                        className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                      >
                        howdy@lonestartortillas.com
                      </a>
                      <p className="text-sm text-charcoal-600 mt-1 text-pretty">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ComalIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sunset-600" />
                    <div>
                      <h3 className="font-semibold text-charcoal-950">Call Maria</h3>
                      <a
                        href="tel:+15128946823"
                        className="text-charcoal-700 hover:text-sunset-600 transition-colors"
                      >
                        (512) 894-6823
                      </a>
                      <p className="text-sm text-charcoal-600 mt-1 text-pretty">
                        Our AI assistant is available 24/7 to answer questions about products, shipping, and orders.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TortillaStackIcon className="mt-1 h-5 w-5 flex-shrink-0 text-sunset-600" />
                    <div>
                      <h3 className="font-semibold text-charcoal-950">Chat with Maria</h3>
                      <MariaCTA
                        heading="Start a chat now"
                        variant="inline"
                      />
                      <p className="text-sm text-charcoal-600 mt-1 text-pretty">
                        Chat with Maria right here on the website — available in English and Spanish.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-xl border border-masa-200 bg-masa-50 p-6">
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
    </>
  );
}
