import Link from 'next/link';

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  category?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  columns?: 2 | 3;
}

export function RelatedContent({
  title = "You May Also Like",
  items,
  columns = 3
}: RelatedContentProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-charcoal-950 mb-8">{title}</h2>
      <div className={`grid gap-6 ${gridCols}`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal-100 hover:border-sunset-300"
          >
            {item.category && (
              <span className="inline-block px-3 py-1 bg-sunset-100 text-sunset-700 text-xs font-semibold uppercase tracking-wide rounded-full mb-3">
                {item.category}
              </span>
            )}
            <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
              {item.title} →
            </h3>
            <p className="text-charcoal-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
