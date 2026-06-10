import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  /** Breadcrumbs (or anything) rendered above the heading */
  breadcrumbs?: ReactNode;
  /** Primary CTA */
  cta?: { label: string; href: string };
  /** py sizing */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

/**
 * The canonical dark page-header band (used across guides, locations,
 * recipes, products). One gradient recipe: charcoal base + a single warm
 * radial accent — replaces the per-page gradient roulette.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  breadcrumbs,
  cta,
  size = 'md',
  className,
  children,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden bg-charcoal-950 text-cream-50',
        size === 'sm' && 'py-8',
        size === 'md' && 'py-12',
        size === 'lg' && 'py-16 md:py-20',
        className
      )}
    >
      {/* single warm radial accent — the only decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 right-0 h-[200%] w-1/2 bg-gradient-radial from-sunset-900/40 to-transparent"
      />
      <div className="container relative mx-auto max-w-6xl px-6">
        {breadcrumbs && <div className="mb-6 text-cream-300">{breadcrumbs}</div>}
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sunset-400">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-balance text-4xl font-bold md:text-5xl">
          {title}
        </h1>
        {sub && <p className="mt-4 max-w-3xl text-xl text-cream-200">{sub}</p>}
        {cta && (
          <Link
            href={cta.href}
            className="mt-6 inline-block rounded-lg bg-sunset-600 px-8 py-3 font-bold text-white transition-colors hover:bg-sunset-700"
          >
            {cta.label}
          </Link>
        )}
        {children}
      </div>
    </header>
  );
}
