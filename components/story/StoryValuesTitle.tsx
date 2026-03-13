'use client'

import { useLanguage } from '@/lib/language-context'

export default function StoryValuesTitle() {
  const { t } = useLanguage();
  return (
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
      {t('story.values.title')}
    </h2>
  )
}
