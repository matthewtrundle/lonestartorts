'use client';

import { useLanguage } from '@/lib/language-context';

export function ShopFAQ() {
  const { t } = useLanguage();

  return (
    <details className="mt-10 bg-cream-50 rounded-xl p-5">
      <summary className="text-lg font-bold text-charcoal-950 cursor-pointer list-none flex justify-between items-center">
        Frequently Asked Questions
        <svg className="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div className="bg-white rounded-lg p-4">
          <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.shippingCostQ')}</p>
          <p className="text-gray-600 text-sm mt-1">{t('shop.faq.shippingCostA')}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.arrivalQ')}</p>
          <p className="text-gray-600 text-sm mt-1">{t('shop.faq.arrivalA')}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.refrigerationQ')}</p>
          <p className="text-gray-600 text-sm mt-1">{t('shop.faq.refrigerationA')}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.paymentQ')}</p>
          <p className="text-gray-600 text-sm mt-1">{t('shop.faq.paymentA')}</p>
        </div>
      </div>
    </details>
  );
}
