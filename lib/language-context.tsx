'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// English ships in the bundle (default locale); Spanish is lazy-loaded on
// demand so every visitor doesn't pay for both locales up front.
import en from '@/translations/en.json';

export type Language = 'en' | 'es';

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'lonestar-language';

const translations: Partial<Record<Language, Translations>> = {
  en,
};

async function loadTranslations(lang: Language): Promise<void> {
  if (translations[lang]) return;
  if (lang === 'es') {
    const es = await import('@/translations/es.json');
    translations.es = es.default as Translations;
  }
}

// Helper function to get nested translation value
function getNestedValue(obj: Translations, path: string): string {
  const keys = path.split('.');
  let value: TranslationValue = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Return the key if translation not found
      return path;
    }
  }

  return typeof value === 'string' ? value : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (stored === 'en') {
        setLanguageState(stored);
      } else if (stored === 'es') {
        loadTranslations('es').then(() => setLanguageState('es'));
      }
    } catch (error) {
      console.error('Failed to load language from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save language to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        // Update html lang attribute
        document.documentElement.lang = language;
      } catch (error) {
        console.error('Failed to save language to localStorage:', error);
      }
    }
  }, [language, isHydrated]);

  const setLanguage = useCallback((lang: Language) => {
    // Switch only once the locale's strings are available so t() never
    // renders raw keys mid-load.
    loadTranslations(lang)
      .then(() => setLanguageState(lang))
      .catch((error) => {
        console.error(`Failed to load ${lang} translations:`, error);
      });
  }, []);

  // Translation function (falls back to English if the locale isn't loaded)
  const t = useCallback((key: string): string => {
    const table = translations[language] ?? translations.en!;
    return getNestedValue(table, key);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isHydrated,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Convenience hook for just the translation function
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
