import { cn } from '@/lib/utils';

export interface Step {
  title: string;
  description?: string;
}

interface StepListProps {
  steps: Step[];
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * Numbered-circle step list ("How it works"). Horizontal on desktop when
 * direction="horizontal", always stacks on mobile.
 */
export function StepList({ steps, direction = 'horizontal', className }: StepListProps) {
  return (
    <ol
      className={cn(
        'grid gap-8',
        direction === 'horizontal'
          ? steps.length === 4
            ? 'md:grid-cols-4'
            : 'md:grid-cols-3'
          : 'grid-cols-1',
        className
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4 md:flex-col md:gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sunset-600 font-display text-lg font-bold text-white"
          >
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold text-charcoal-950">{step.title}</h3>
            {step.description && (
              <p className="mt-1 text-charcoal-600">{step.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
