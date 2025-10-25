import { ClockIcon } from '@/components/ui/Icons';

interface LastUpdatedProps {
  date: string | Date;
  className?: string;
}

export function LastUpdated({ date, className = '' }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-charcoal-700">
        <ClockIcon className="text-blue-600" size={16} />
        <span>Last updated: <strong>{formattedDate}</strong></span>
      </div>
      <p className="text-xs text-charcoal-600 mt-1">
        We regularly update our guides to ensure you have the most accurate information.
      </p>
    </div>
  );
}
