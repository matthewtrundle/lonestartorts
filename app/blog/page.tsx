import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Tortilla Stories & Traditions | Blog | Lonestar Tortillas',
  description: 'Explore the rich history, science, and culture of tortillas. Stories from our kitchen, traditional techniques, and the art of authentic tortilla-making.',
  keywords: 'tortilla blog, tortilla history, nixtamalization, tortilla culture, Texas tortillas, Mexican food traditions',
  openGraph: {
    title: 'Tortilla Stories & Traditions | Blog',
    description: 'Discover the heart and soul behind authentic tortillas through stories, science, and tradition.',
    type: 'website',
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Lonestar Tortillas Blog',
  description: 'Stories, science, and traditions from the world of authentic tortillas.',
  url: 'https://lonestartortillas.com/blog',
};

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Maria\'s Story: The Heart of Lonestar Tortillas',
    slug: 'marias-story',
    excerpt: 'Meet Maria, whose passion for authentic tortilla-making transforms simple corn and flour into culinary tradition. A journey from her grandmother\'s kitchen to yours.',
    category: 'People',
    readTime: '7 min read',
    date: 'October 24, 2025',
    image: '/images/blog/marias-story-hero.webp',
  },
  {
    title: 'The Science of Nixtamalization: Ancient Process, Modern Benefits',
    slug: 'nixtamalization-science',
    excerpt: 'Discover the 3,500-year-old process that transforms corn into masa. How lime treatment unlocks nutrition, flavor, and the perfect tortilla texture.',
    category: 'Science',
    readTime: '8 min read',
    date: 'October 24, 2025',
    image: '/images/blog/nixtamalization-science-hero.webp',
  },
  {
    title: 'Texas Tortilla Traditions: Where Mexican Heritage Meets Lone Star Culture',
    slug: 'texas-tortilla-traditions',
    excerpt: 'From San Antonio to El Paso, explore how Texas shaped its own tortilla identity. The story of flour tortillas, breakfast tacos, and Tex-Mex innovation.',
    category: 'Culture',
    readTime: '9 min read',
    date: 'October 24, 2025',
    image: '/images/blog/texas-traditions-hero.webp',
  },
];

const CategoryBadge = ({ category }: { category: string }) => {
  const colors: { [key: string]: string } = {
    People: 'bg-sunset-100 text-sunset-700',
    Science: 'bg-masa-100 text-masa-700',
    Culture: 'bg-rust-100 text-rust-700',
  };

  return (
    <span className={`${colors[category] || 'bg-charcoal-100 text-charcoal-700'} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
      {category}
    </span>
  );
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Breadcrumbs />
            <h1 className="text-4xl md:text-5xl font-bold mt-4">Tortilla Stories & Traditions</h1>
            <p className="text-cream-300 mt-4 text-lg max-w-2xl">
              Dive into the rich history, science, and culture that make tortillas more than just food—they're a living tradition.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <CategoryBadge category={post.category} />
                    </div>

                    <h2 className="text-2xl font-bold text-charcoal-950 mb-3 hover:text-sunset-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-charcoal-700 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-charcoal-600">
                      <span>{post.date}</span>
                      <span className="font-semibold">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-16 bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
            <p className="text-cream-100 mb-6 max-w-2xl mx-auto">
              Want more stories from the tortilla world? Follow our journey as we share recipes, traditions, and the people who keep authentic tortilla-making alive.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop Our Tortillas
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
