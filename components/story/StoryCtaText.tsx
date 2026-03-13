'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function StoryCtaText() {
  const { t } = useLanguage();
  return (
    <>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8">
        {t('story.cta.title')}
      </h2>
      <p className="text-lg sm:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-charcoal-700 leading-relaxed">
        {t('story.cta.subtitle')}
      </p>

      {/* Primary CTA - Large and Prominent */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-block bg-sunset-500 text-cream-50 px-10 sm:px-16 py-5 sm:py-6 text-lg sm:text-2xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Shop Now
        </Link>
      </div>

      {/* Secondary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/craft"
          className="inline-block border-2 border-charcoal-950 text-charcoal-950 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold tracking-wide uppercase hover:bg-charcoal-950 hover:text-cream-50 transition-colors"
        >
          {t('story.cta.whyHeb') || 'Why H-E-B?'}
        </Link>
        <Link
          href="/guides"
          className="inline-block border-2 border-masa-600 text-masa-700 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold tracking-wide uppercase hover:bg-masa-600 hover:text-cream-50 transition-colors"
        >
          View Guides
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-charcoal-500 mt-8 md:mt-10 tracking-wider uppercase">
        {t('disclaimer.short')}
      </p>
    </>
  )
}
