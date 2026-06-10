import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  /** Open the first item by default */
  defaultOpenFirst?: boolean;
  className?: string;
}

/**
 * FAQ list on native <details> — works with no JS, fully crawlable, keyboard
 * accessible for free. Pair with FAQPage JSON-LD where relevant.
 */
export function FAQAccordion({ items, defaultOpenFirst = true, className }: FAQAccordionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-xl border border-charcoal-200 bg-cream-50"
          open={defaultOpenFirst && index === 0}
        >
          <summary className="flex w-full cursor-pointer list-none items-center justify-between p-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="pr-4 font-semibold text-charcoal-950">{item.question}</span>
            <ChevronDown
              className="h-5 w-5 flex-shrink-0 text-charcoal-600 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 leading-relaxed text-charcoal-700">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
