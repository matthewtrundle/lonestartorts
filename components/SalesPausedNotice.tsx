'use client';

import Link from 'next/link';
import { PauseCircle } from 'lucide-react';
import { NotifyMeForm } from '@/components/NotifyMeForm';
import { useStoreStatus } from '@/components/StoreStatusProvider';

interface SalesPausedNoticeProps {
  source: 'subscribe-page' | 'checkout' | 'wholesale';
  title?: string;
}

// Full-page replacement state shown on commerce pages while sales are paused.
export function SalesPausedNotice({ source, title }: SalesPausedNoticeProps) {
  const { pauseMessage } = useStoreStatus();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:py-28">
      <PauseCircle className="mb-6 h-14 w-14 text-sunset-600" />
      <h1 className="font-serif text-3xl font-bold text-charcoal-950 sm:text-4xl">
        {title || "We're taking a short break"}
      </h1>
      <p className="mt-4 max-w-lg text-charcoal-600">
        {pauseMessage ||
          "Ordering is paused for the next couple of months while we take a breather. Leave your email and we'll let you know the moment we're back."}
      </p>
      <div className="mt-8 w-full max-w-md">
        <NotifyMeForm source={source} variant="full" className="mx-auto" />
      </div>
      <p className="mt-10 text-sm text-charcoal-500">
        In the meantime, browse our{' '}
        <Link href="/recipes" className="font-semibold text-sunset-600 hover:underline">
          recipes
        </Link>{' '}
        and{' '}
        <Link href="/guides" className="font-semibold text-sunset-600 hover:underline">
          tortilla guides
        </Link>
        .
      </p>
    </div>
  );
}
