import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Tortilla Stories & Traditions',
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
    title: 'Planning the Ultimate Texas Event: From Brisket Tacos to Bar Service',
    slug: 'texas-event-planning-guide',
    excerpt: 'Complete guide to planning authentic Texas events with H-E-B® tortillas, BBQ catering, and professional bar service. Expert tips for taco bars, alcohol delivery, and creating unforgettable Austin celebrations.',
    category: 'Business & Culture',
    readTime: '12 min read',
    date: 'November 6, 2025',
    image: '/images/blog/texas-event-hero.webp',
  },
  {
    title: 'Pacific Northwest BBQ: How Washington Restaurants Found Perfection with H-E-B® Tortillas',
    slug: 'washington-bbq-elevation',
    excerpt: 'From Seattle to Spokane, Washington BBQ joints discover that the best Pacific Northwest BBQ starts with authentic Texas tortillas. Real success stories from Evergreen Smoke, Tacoma Smokehouse, and Inland Northwest Smoke.',
    category: 'Business & Culture',
    readTime: '12 min read',
    date: 'November 5, 2025',
    image: '/images/blog/washington-bbq-hero.webp',
  },
  {
    title: 'California BBQ Revolution: How H-E-B® Tortillas Won Over the Golden State',
    slug: 'california-bbq-revolution',
    excerpt: 'From Oakland to San Diego, California BBQ restaurants discover the Texas tortilla advantage. Success stories from Smoke & Seoul, Venice Beach Smoke Co., and North Park Smoke.',
    category: 'Business & Culture',
    readTime: '13 min read',
    date: 'November 5, 2025',
    image: '/images/blog/california-bbq-hero.webp',
  },
  {
    title: 'How Colorado BBQ Restaurants Found Their Edge with H-E-B® Tortillas',
    slug: 'colorado-bbq-transformation',
    excerpt: 'From Denver to Boulder to Breckenridge, Colorado BBQ joints discover what Texas pitmasters have known for years: authentic H-E-B® tortillas make all the difference. Real stories from Mile High Smoke, Boulder Creek, and Summit Smoke.',
    category: 'Business & Culture',
    readTime: '11 min read',
    date: 'November 5, 2025',
    image: '/images/blog/colorado-bbq-hero.webp',
  },
  {
    title: 'The Ultimate Guide to Leftover Brisket: 7 Days of Meals',
    slug: 'leftover-brisket-guide',
    excerpt: 'Transform leftover brisket into a week of incredible meals using H-E-B® tortillas. Complete storage tips, reheating methods, and creative recipes.',
    category: 'Recipes & Culture',
    readTime: '16 min read',
    date: 'November 4, 2025',
    image: '/images/blog/leftover-brisket-hero.webp',
  },
  {
    title: 'Why Texas Pitmasters Refuse to Use Store-Bought Tortillas',
    slug: 'why-pitmasters-refuse-store-tortillas',
    excerpt: 'Real pitmasters reveal expensive lessons learned from using cheap tortillas. Financial breakdowns, customer complaints, and why they switched to H-E-B® for good.',
    category: 'Business & Culture',
    readTime: '14 min read',
    date: 'November 4, 2025',
    image: '/images/blog/pitmaster-interview-hero.webp',
  },
  {
    title: 'The Secret to Championship BBQ Tacos',
    slug: 'championship-bbq-tacos',
    excerpt: 'Competition BBQ champions reveal why H-E-B® tortillas are essential for winning. Judging standards, champion interviews, and competition day protocols.',
    category: 'Texas Cuisine',
    readTime: '12 min read',
    date: 'November 4, 2025',
    image: '/images/blog/championship-bbq-hero.webp',
  },
  {
    title: 'When Texas BBQ Meets H-E-B® Tortillas: The Perfect Fusion',
    slug: 'bbq-meets-tortillas',
    excerpt: 'Discover why authentic H-E-B® tortillas are essential for Texas BBQ culture. From brisket tacos to pulled pork wraps, explore the marriage of two iconic Texas traditions.',
    category: 'Texas Cuisine',
    readTime: '8 min read',
    date: 'November 4, 2025',
    image: '/images/blog/bbq-fusion-hero.webp',
  },
  {
    title: 'The Ultimate Brisket Breakfast Burrito with H-E-B® Tortillas',
    slug: 'brisket-breakfast-burrito',
    excerpt: 'Master the art of the brisket breakfast burrito with authentic H-E-B® tortillas. From overnight brisket to the perfect scramble, learn why this Texas breakfast requires real tortillas.',
    category: 'Recipes & Culture',
    readTime: '10 min read',
    date: 'November 4, 2025',
    image: '/images/blog/brisket-burrito-hero.webp',
  },
  {
    title: 'BBQ Success Stories: How H-E-B® Tortillas Transformed Texas Restaurants',
    slug: 'bbq-success-stories',
    excerpt: 'Real stories from Texas BBQ joints and restaurants that elevated their business with authentic H-E-B® tortillas. Learn how the right tortillas can transform your food business.',
    category: 'Business & Culture',
    readTime: '12 min read',
    date: 'November 4, 2025',
    image: '/images/blog/success-stories-hero.webp',
  },
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
    'Texas Cuisine': 'bg-sunset-100 text-sunset-700',
    'Recipes & Culture': 'bg-masa-100 text-masa-700',
    'Business & Culture': 'bg-rust-100 text-rust-700',
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
            <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
            />
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
