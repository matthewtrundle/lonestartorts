'use client';

import Link from 'next/link';
import { Truck, Clock, Package, MapPin, ShieldCheck, Calendar, Snowflake } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getShippingMessage, getShipDateDisplay } from '@/lib/shipping-schedule';
import React from 'react';

const shipDays = [
  { day: 'Monday', ships: false },
  { day: 'Tuesday', ships: true },
  { day: 'Wednesday', ships: false },
  { day: 'Thursday', ships: false },
  { day: 'Friday', ships: false },
  { day: 'Saturday', ships: false },
  { day: 'Sunday', ships: false },
];

export default function ShippingPageContent() {
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [shipDateDisplay, setShipDateDisplay] = React.useState('');
  const [shippingMsg, setShippingMsg] = React.useState<ReturnType<typeof getShippingMessage> | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setShipDateDisplay(getShipDateDisplay());
    setShippingMsg(getShippingMessage());
  }, []);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Truck className="w-5 h-5 text-sunset-500" />
            <span className="text-sm font-medium">Freshness First Shipping</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Freshness First Shipping
          </h1>

          <p className="text-xl text-cream-200 mb-4 max-w-3xl mx-auto">
            We ship on Tuesdays so your tortillas spend the fewest days in transit. No weekend warehouse sitting — just fresh Texas tortillas, delivered fast.
          </p>

          <p className="text-lg text-green-400 font-bold mb-8">
            FREE Shipping on Orders $60+
          </p>

          {mounted && shippingMsg && (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg mb-8">
              <Calendar className="w-5 h-5 text-sunset-400" />
              <span className="font-medium">
                Next ship date: {shipDateDisplay}
              </span>
            </div>
          )}

          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white font-bold rounded-lg transition-colors"
            >
              {t('shipping.hero.orderNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Points */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Calendar className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
            <h3 className="font-bold text-charcoal-950 mb-2">Tuesday Shipping</h3>
            <p className="text-gray-600 text-sm">Order by Monday 9 PM CT to ship Tuesday</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Truck className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
            <h3 className="font-bold text-charcoal-950 mb-2">{t('shipping.keyPoints.delivery')}</h3>
            <p className="text-gray-600 text-sm">{t('shipping.keyPoints.deliveryDesc')}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <MapPin className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
            <h3 className="font-bold text-charcoal-950 mb-2">{t('shipping.keyPoints.shipsFrom')}</h3>
            <p className="text-gray-600 text-sm">{t('shipping.keyPoints.shipsFromDesc')}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Package className="w-10 h-10 text-sunset-500 mx-auto mb-4" />
            <h3 className="font-bold text-charcoal-950 mb-2">{t('shipping.keyPoints.noRefrigeration')}</h3>
            <p className="text-gray-600 text-sm">{t('shipping.keyPoints.noRefrigerationDesc')}</p>
          </div>
        </div>

        {/* Shipping Schedule Visual */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
          <div className="bg-charcoal-900 text-white px-6 py-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Freshness First Shipping Schedule
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-6">
              {shipDays.map(({ day, ships }) => (
                <div
                  key={day}
                  className={`text-center p-3 md:p-4 rounded-lg border-2 transition-colors ${
                    ships
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                >
                  <p className="text-xs md:text-sm font-bold mb-1">{day.slice(0, 3)}</p>
                  {ships ? (
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 mx-auto text-green-600" />
                  ) : (
                    <span className="text-xs">—</span>
                  )}
                  <p className="text-[10px] md:text-xs mt-1">
                    {ships ? 'Ships' : 'No ship'}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-charcoal-700">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Monday before 9 PM CT:</strong> Ships Tuesday</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Monday after 9 PM CT – Sunday:</strong> Ships next Tuesday</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-cream-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Why Tuesdays only?</strong> We ship on Tuesday so your tortillas don&apos;t sit in a warehouse over the weekend. This means fresher tortillas at your door.
            </p>
          </div>
        </div>

        {/* Delivery Times */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-sunset-500" />
            {t('shipping.deliveryTimes.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-charcoal-950 mb-3">Continental US (48 states)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  2-3 business days typical delivery
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Ships Tuesdays (order by Monday 9 PM CT)
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  USPS Priority Mail with tracking
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  FREE shipping on orders $60+
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-950 mb-3">Alaska & Hawaii</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  4-7 business days typical delivery
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Same shipping schedule applies
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Full tracking included
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Freezing Tip */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-16 flex items-start gap-4">
          <Snowflake className="w-8 h-8 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sky-900 text-lg mb-1">Stock Up & Freeze for 6+ Months!</h3>
            <p className="text-sky-700">Our tortillas freeze beautifully. Whether you order <Link href="/products/flour-tortillas" className="text-sky-800 font-semibold underline hover:text-sky-900">flour tortillas</Link> or <Link href="/products/corn-tortillas" className="text-sky-800 font-semibold underline hover:text-sky-900">corn tortillas</Link>, they&apos;ll keep for months in the freezer. Thaw at room temperature for 30 minutes or warm directly from frozen on a skillet.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-8 text-center">
            {t('shipping.shippingFaqs')}
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: 'Does Lonestar Tortillas ship H-E-B tortillas nationwide?',
                a: 'Yes. We ship authentic H-E-B Bakery tortillas to all 50 US states with FREE shipping. We are an independent reseller based in Austin, Texas. Orders ship via USPS Priority Mail with 2-3 business day delivery.',
              },
              {
                q: 'How much does shipping cost?',
                a: 'Shipping is FREE on orders $60+. Orders under $60 ship for a flat $12.99. We ship via USPS Priority Mail.',
              },
              {
                q: 'What days do you ship?',
                a: 'We ship on Tuesdays as part of our Freshness First Shipping program. Orders placed before Monday 9 PM CT ship the following Tuesday. Orders placed after Monday 9 PM CT ship the next Tuesday.',
              },
              {
                q: 'How long does delivery take?',
                a: 'Delivery takes 2-3 business days from ship date to most US addresses. Alaska and Hawaii may take 4-7 business days.',
              },
              {
                q: 'Where do you ship from?',
                a: 'We ship from Austin, Texas. We purchase authentic H-E-B Bakery tortillas locally and ship them nationwide. We are an independent reseller, not affiliated with H-E-B.',
              },
              {
                q: 'Do tortillas need refrigeration during shipping?',
                a: (
                  <>
                    No. H-E-B Bakery tortillas are shelf-stable and do not require refrigeration. Our <Link href="/products/butter-tortillas" className="text-sunset-600 font-semibold underline hover:text-sunset-700">butter tortillas</Link> and all other varieties maintain freshness at room temperature for 30+ days unopened, making them ideal for shipping.
                  </>
                ),
              },
              {
                q: 'Can I track my order?',
                a: 'Yes. All orders receive a USPS tracking number via email on ship day. You can track your shipment at usps.com or through the link in your confirmation email.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 group"
                open={index === 0}
              >
                <summary className="font-semibold text-charcoal-950 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-charcoal-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-cream-100 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-charcoal-950 mb-4">{t('shipping.seller.title')}</h2>
          <p className="text-charcoal-700 mb-4 max-w-2xl mx-auto">
            {t('shipping.seller.description')}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold rounded-lg transition-colors"
          >
            {t('shipping.seller.shopButton')}
          </Link>
        </div>
      </section>
    </main>
  );
}
