import Link from 'next/link';
import Image from 'next/image';

interface RecipeCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  servings?: string;
  category?: string;
  className?: string;
}

export function RecipeCard({
  title,
  description,
  href,
  image,
  prepTime,
  cookTime,
  totalTime,
  difficulty,
  servings,
  category,
  className = '',
}: RecipeCardProps) {
  const getDifficultyColor = (level?: string) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-charcoal-100 text-charcoal-700';
    }
  };

  return (
    <Link href={href} className={`group block ${className} focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded-lg`}>
      <article className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl group-focus:shadow-2xl transition-all duration-300 hover:-translate-y-2 group-focus:-translate-y-2">
        {/* Image */}
        {image ? (
          <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-sunset-100 to-masa-100">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {category && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-bold uppercase tracking-wider text-sunset-600">
                  {category}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-48 w-full bg-gradient-to-br from-sunset-200 via-masa-200 to-rust-200 flex items-center justify-center">
            <svg className="w-20 h-20 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {category && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-bold uppercase tracking-wider text-sunset-600">
                  {category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-charcoal-950 mb-3 group-hover:text-sunset-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-charcoal-700 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mb-4">
            {totalTime && (
              <div className="flex items-center gap-1 text-sm text-charcoal-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{totalTime}</span>
              </div>
            )}
            {servings && (
              <div className="flex items-center gap-1 text-sm text-charcoal-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{servings}</span>
              </div>
            )}
            {difficulty && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
            <span className="text-sunset-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
              View Recipe
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-sunset-500 via-masa-500 to-rust-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </article>
    </Link>
  );
}
