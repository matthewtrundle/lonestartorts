'use client';

import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="shrink-header fixed top-0 left-0 right-0 z-[100] transition-all duration-500" id="main-header">
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-cream-50/90 backdrop-blur-md border-b border-charcoal-200/10" />

      <div className="container mx-auto px-8 relative">
        <div className="header-content flex justify-between items-center py-6 transition-all duration-500">
          <Link href="/" className="logo-wrapper group relative -ml-4 transition-all duration-500">
            <LogoFull
              className="text-charcoal-950 transition-all duration-500 group-hover:scale-105"
              animated
              size="md"
            />
          </Link>

          <nav className="nav-items hidden md:flex items-center gap-8">
            <Link href="/shop" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Shop
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href="/craft" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Source
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href="/guides" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Guides & Tips
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href="/recipes" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Recipes
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href="/blog" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Blog & Stories
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link href="/story" className="group relative overflow-hidden">
              <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
                Story
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-950" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className="inline-block bg-sunset-500 text-cream-50 px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-sunset-600 transition-colors shadow-sunset"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
