'use client';

import { usePathname } from 'next/navigation';
import { NotifyMeForm } from '@/components/NotifyMeForm';
import { useStoreStatus } from '@/components/StoreStatusProvider';

const DEFAULT_MESSAGE =
  "We're taking a short break — back in a couple of months. Leave your email and we'll be in touch the moment we're back.";

export function AnnouncementBanner() {
  const pathname = usePathname();
  const { salesPaused, pauseMessage } = useStoreStatus();

  // Admin pages have their own chrome
  if (!salesPaused || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="bg-charcoal-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm font-medium leading-snug">{pauseMessage || DEFAULT_MESSAGE}</p>
        <NotifyMeForm source="banner" variant="compact" className="w-full max-w-xs sm:w-auto" />
      </div>
    </div>
  );
}
