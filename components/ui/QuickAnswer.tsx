import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuickAnswerProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * The "Quick Answer" callout used at the top of guides — direct answer for
 * readers and featured-snippet bait for search engines.
 */
export function QuickAnswer({ title = 'Quick Answer', children, className }: QuickAnswerProps) {
  return (
    <aside
      className={cn(
        'rounded-r-xl border-l-4 border-sunset-500 bg-sunset-50 p-6',
        className
      )}
    >
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sunset-700">
        {title}
      </p>
      <div className="text-lg leading-relaxed text-charcoal-800">{children}</div>
    </aside>
  );
}
