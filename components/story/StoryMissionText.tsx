'use client'

import { useLanguage } from '@/lib/language-context'

export default function StoryMissionText() {
  const { t } = useLanguage();
  return (
    <>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8 magazine-text">
        {t('story.mission.title')}
      </h2>
      <p className="text-xl sm:text-2xl md:text-3xl font-display italic text-masa-600 mb-6 md:mb-8">
        {t('story.mission.quote')}
      </p>
      <p className="text-base sm:text-lg text-charcoal-700 mb-10 md:mb-12 leading-relaxed">
        {t('story.mission.description')}
      </p>
    </>
  )
}
