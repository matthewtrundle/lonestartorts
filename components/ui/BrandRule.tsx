import { Star } from 'lucide-react';

interface BrandRuleProps {
  align?: 'left' | 'center';
}

/**
 * Signature brand divider: a thin sunset rule with a five-pointed star at its center.
 * Server component — purely decorative, hidden from assistive tech.
 */
export function BrandRule({ align = 'center' }: BrandRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
    >
      <span className="h-px w-12 bg-sunset-600" />
      <Star className="w-3 h-3 shrink-0 text-sunset-600" fill="currentColor" />
      <span className="h-px w-12 bg-sunset-600" />
    </div>
  );
}
