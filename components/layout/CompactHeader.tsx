'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Menu, X } from 'lucide-react';

export function CompactHeader() {
  const { itemCount, setIsOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('compact-header');
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white shadow-md"
      id="compact-header"
    >
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex justify-between items-center py-2 transition-all duration-300">
          {/* Logo with negative margin to "explode" outside header */}
          <Link
            href="/"
            className="logo-wrapper group relative -ml-2 md:-ml-4 -mt-3 md:-mt-4 transition-all duration-300"
          >
            <LogoFull
              className="text-charcoal-950 transition-all duration-300 group-hover:scale-105"
              animated
              size="sm"
            />
          </Link>

          {/* Mobile: Hamburger Menu + Cart */}
          <div className="flex md:hidden items-center gap-3">
            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-1.5 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-950" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sunset-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-charcoal-950" />
              ) : (
                <Menu className="w-5 h-5 text-charcoal-950" />
              )}
            </button>
          </div>

          {/* Desktop Navigation - Compact styling */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/shop" className="group relative">
              <span className="text-xs font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Shop
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/craft" className="group relative">
              <span className="text-xs font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Source
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/guides" className="group relative">
              <span className="text-xs font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Guides
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/recipes" className="group relative">
              <span className="text-xs font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Recipes
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/blog" className="group relative">
              <span className="text-xs font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Blog
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-1.5 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4 text-charcoal-950" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sunset-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-sunset-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide hover:bg-sunset-700 hover:shadow-md transition-all"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      </div>
    </header>

      {/* Mobile Navigation Drawer - OUTSIDE header to avoid stacking context issues */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu Panel - Outside header to avoid stacking context issues */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-sm z-[9999] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-cream-200 bg-white">
            <LogoFull className="text-charcoal-950" size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-charcoal-950" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex flex-col p-6 space-y-1 overflow-y-auto h-[calc(100vh-180px)] bg-white">
            {/* Shop Now CTA - Prominent */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-sunset-500 text-white px-6 py-4 rounded-lg font-semibold text-center tracking-wide uppercase hover:bg-sunset-600 transition-colors shadow-md mb-6"
            >
              Shop Now
            </Link>

            {/* Navigation Links */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/craft"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Source
            </Link>
            <Link
              href="/guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Guides & Tips
            </Link>
            <Link
              href="/recipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Blog & Stories
            </Link>
            <Link
              href="/story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              Story
            </Link>
          </nav>
        </div>
    </>
  );
}
