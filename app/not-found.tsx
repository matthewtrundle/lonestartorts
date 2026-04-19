import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Head back to Lonestar Tortillas to browse our authentic Texas tortillas.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Dark header section matching site brand */}
      <section className="bg-charcoal-950 pt-32 pb-16 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-sunset-500 mb-4">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-white mb-2">
          Wrong Trail, Partner
        </p>
        <p className="text-charcoal-300 text-lg max-w-md mx-auto">
          Looks like this tortilla got lost somewhere between Austin and your screen.
        </p>
      </section>

      {/* Content section */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-charcoal-600 text-lg mb-10">
            The page you are looking for does not exist or may have been moved.
            Let us help you find your way back.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
            >
              Browse the Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
