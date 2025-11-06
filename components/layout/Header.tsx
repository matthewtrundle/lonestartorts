'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  const { itemCount, setIsOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('main-header');
      if (header) {
        if (window.scrollY > 50) {
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
    <header className="shrink-header fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white shadow-md" id="main-header">

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="header-content flex justify-between items-center py-4 md:py-6 transition-all duration-500">
          <Link href="/" className="logo-wrapper group relative -ml-2 md:-ml-4 transition-all duration-500">
            <LogoFull
              className="text-charcoal-950 transition-all duration-500 group-hover:scale-105"
              animated
              size="md"
            />
          </Link>

          {/* Mobile: Hamburger Menu + Cart */}
          <div className="flex md:hidden items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-6 h-6 text-charcoal-950" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-charcoal-100/50 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal-950" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal-950" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
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

            {/* User Authentication */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium tracking-wider uppercase text-charcoal-950 hover:text-sunset-600 transition-colors" aria-label="Sign in">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-charcoal-950 text-white px-5 py-2.5 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-charcoal-800 transition-colors shadow-md" aria-label="Create account">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9',
                  },
                }}
                afterSignOutUrl="/"
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Orders"
                    labelIcon={<ShoppingBag className="w-4 h-4" />}
                    href="/account/orders"
                  />
                  <UserButton.Link
                    label="Addresses"
                    labelIcon={<User className="w-4 h-4" />}
                    href="/account/addresses"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>

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

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-[150] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-cream-200">
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
          <nav className="flex flex-col p-6 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
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

            {/* Divider */}
            <div className="border-t border-cream-200 my-4" />

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="w-full px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  className="w-full px-4 py-3 bg-charcoal-950 text-white font-semibold rounded-lg hover:bg-charcoal-800 transition-colors mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="px-4 py-3">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10',
                    },
                  }}
                  afterSignOutUrl="/"
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Orders"
                      labelIcon={<ShoppingBag className="w-4 h-4" />}
                      href="/account/orders"
                    />
                    <UserButton.Link
                      label="Addresses"
                      labelIcon={<User className="w-4 h-4" />}
                      href="/account/addresses"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
