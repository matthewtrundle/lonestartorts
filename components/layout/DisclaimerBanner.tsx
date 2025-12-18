'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

export const DisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-light-gray border-t border-medium-gray">
      <div className="max-w-[1440px] mx-auto px-12 py-8">
        <div className="flex items-center justify-center">
          <p className="text-sm font-light text-gray-dark leading-relaxed text-center">
            {t('disclaimer.text')}
          </p>
        </div>
      </div>
    </section>
  );
};