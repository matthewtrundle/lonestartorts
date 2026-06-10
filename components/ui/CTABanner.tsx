import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ctaCopy, type CtaVariant } from '@/lib/cta-copy';

interface CTABannerProps {
  /** Picks a written copy set from lib/cta-copy.ts */
  variant?: CtaVariant;
  /** Override any part of the variant copy */
  headline?: string;
  sub?: string;
  buttonText?: string;
  buttonHref?: string;
  /** 'dark' charcoal band (default) or 'warm' rust→sunset gradient */
  tone?: 'dark' | 'warm';
  className?: string;
}

/**
 * Bottom-of-page CTA band. Replaces the hand-stamped "Ready to Order?"
 * blocks — copy lives in lib/cta-copy.ts so pages vary naturally.
 */
export function CTABanner({
  variant = 'order',
  headline,
  sub,
  buttonText,
  buttonHref,
  tone = 'dark',
  className,
}: CTABannerProps) {
  const copy = ctaCopy[variant];
  return (
    <section
      className={cn(
        'rounded-2xl p-8 md:p-10 text-center',
        tone === 'dark'
          ? 'bg-charcoal-950 text-cream-50'
          : 'bg-gradient-to-r from-rust-600 to-sunset-600 text-white',
        className
      )}
    >
      <h2 className="font-display text-balance text-2xl font-bold md:text-3xl">
        {headline ?? copy.headline}
      </h2>
      <p
        className={cn(
          'mx-auto mt-2 max-w-xl',
          tone === 'dark' ? 'text-cream-300' : 'text-white/90'
        )}
      >
        {sub ?? copy.sub}
      </p>
      <Link
        href={buttonHref ?? copy.buttonHref}
        className={cn(
          'mt-6 inline-block rounded-lg px-8 py-3 font-bold transition-colors',
          tone === 'dark'
            ? 'bg-sunset-500 text-white hover:bg-sunset-600'
            : 'bg-white text-rust-700 hover:bg-cream-100'
        )}
      >
        {buttonText ?? copy.buttonText}
      </Link>
    </section>
  );
}
