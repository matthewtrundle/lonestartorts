'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function StoryHeroText() {
  const { t } = useLanguage();
  return (
    <>
      {/* Quality Badge */}
      <div className="mb-6 reveal-text">
        <span className="text-xs font-bold tracking-[0.4em] uppercase text-masa-600">
          {t('story.hero.badge') || 'Our Journey'}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="mb-8">
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] text-charcoal-950">
          {t('story.hero.title')}
        </span>
        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light italic mt-4 text-sunset-600">
          {t('story.hero.subtitle')}
        </span>
      </h1>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 my-8">
        <span className="block w-16 sm:w-20 h-px bg-charcoal-300"></span>
        <span className="text-sunset-500 text-2xl">✦</span>
        <span className="block w-16 sm:w-20 h-px bg-charcoal-300"></span>
      </div>

      {/* Description */}
      <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-charcoal-700 leading-relaxed slide-left">
        {t('story.hero.description')}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Link
          href="/shop"
          className="bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl"
        >
          Shop Now
        </Link>
        <Link
          href="/craft"
          className="border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors"
        >
          {t('story.cta.whyHeb') || 'Why H-E-B?'}
        </Link>
      </div>
    </>
  )
}
