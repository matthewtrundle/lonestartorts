'use client';

import { useLanguage } from '@/lib/language-context';

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="disclaimer-banner fixed top-0 left-0 right-0 z-[200] bg-charcoal-950 text-cream-50 py-1 text-center border-b border-sunset-500">
      <p className="text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
        <span className="font-bold">{t('disclaimer.title')}</span> •
        <span className="text-sunset-400">{t('disclaimer.text')}</span>
      </p>
    </div>
  )
}