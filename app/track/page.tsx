'use client';

import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-950">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-8 py-6">
          <Link href="/">
            <LogoFull className="text-charcoal-950" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-4xl font-display font-bold mb-6">
            Order Tracking Coming Soon!
          </h1>
          <p className="text-xl text-charcoal-700 mb-8">
            We're not taking orders yet, but you can join our pre-sale list to be the first to know when H-E-B® tortillas are available!
          </p>
          <div className="space-y-4">
            <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-8 py-4 rounded-full font-bold text-lg uppercase hover:bg-sunset-600 transition-colors">
              Join Pre-Sale List
            </Link>
            <p className="text-sm text-charcoal-600">
              Be among the first to order when we launch
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-sm text-charcoal-600">
        <p>Independent reseller • Not affiliated with or endorsed by H-E-B®</p>
      </footer>
    </div>
  );
}