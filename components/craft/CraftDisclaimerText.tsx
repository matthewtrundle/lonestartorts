'use client'

import { useLanguage } from '@/lib/language-context'

export function CraftDisclaimerText() {
  const { t } = useLanguage()

  return <>{t('disclaimer.short')}</>
}
