import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  /** Heading level — defaults to h2 */
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * Editorial section header: eyebrow + Playfair display heading + subtitle.
 * The vehicle for the site's typographic identity (see DESIGN.md).
 */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  tone = 'light',
  className,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const onDark = tone === 'dark';
  return (
    <div
      className={cn(
        'mb-8 md:mb-10',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-bold uppercase tracking-widest mb-2',
            onDark ? 'text-sunset-400' : 'text-sunset-600'
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          'font-display text-balance',
          Heading === 'h1' ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl',
          'font-bold',
          onDark ? 'text-cream-50' : 'text-charcoal-950'
        )}
      >
        {title}
      </Heading>
      {sub && (
        <p
          className={cn(
            'mt-3 text-lg',
            onDark ? 'text-cream-200' : 'text-charcoal-600'
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
