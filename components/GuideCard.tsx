import Link from 'next/link';
import { ReactNode } from 'react';

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  readTime?: string;
  category?: string;
  className?: string;
}

export function GuideCard({
  title,
  description,
  href,
  icon,
  readTime,
  category,
  className = '',
}: GuideCardProps) {
  return (
    <Link href={href} className={`group block ${className} focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded-lg`}>
      <article className="h-full bg-white rounded-lg border border-charcoal-200/20 shadow-md hover:shadow-xl group-focus:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group-focus:-translate-y-1">
        {/* Header with icon and category */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            {icon && (
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-sunset-100 text-sunset-600 group-hover:bg-sunset-600 group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
            )}
            {category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-sunset-600 bg-sunset-50 px-3 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-charcoal-950 mb-3 group-hover:text-sunset-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-charcoal-700 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          {readTime && (
            <span className="text-sm text-charcoal-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          )}
          <span className="text-sunset-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
            Read Guide
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-sunset-500 to-masa-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </article>
    </Link>
  );
}
