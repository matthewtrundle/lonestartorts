'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { ShoppingBag, Menu, X } from 'lucide-react';

export function Header() {
  const { itemCount, setIsOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Only offset the header on homepage where DisclaimerBanner is shown
  const isHomepage = pathname === '/';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);

      // Also update class for any CSS that depends on it
      const header = document.getElementById('main-header');
      if (header) {
        if (scrolled) {
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
    <header className={`shrink-header fixed ${isHomepage ? 'top-[28px]' : 'top-0'} left-0 right-0 z-[100] transition-all duration-300 bg-white shadow-md ${isScrolled ? 'shadow-lg' : ''}`} id="main-header">

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="header-content flex justify-between items-center py-1">
          <Link href="/" className="logo-wrapper group relative">
            <LogoFull
              className="text-charcoal-950 transition-transform duration-300 group-hover:scale-105"
              size="xs"
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

          {/* Desktop Navigation - Premium styling */}
          <nav className={`nav-items hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'gap-4' : 'gap-5'}`}>
            <Link href="/shop" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.shop')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/craft" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.source')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/guides" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.guides')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/recipes" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.recipes')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/blog" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.blog')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/locations" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.locations')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/wholesale" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.wholesale')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/shipping" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Shipping
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/contact" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.contact')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Language Toggle with Mexican Flag */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded-lg transition-colors border border-charcoal-200 hover:border-sunset-300"
              aria-label={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              {language === 'en' ? (
                <>
                  {/* Mexican Flag for Spanish option */}
                  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="10" height="20" fill="#006847"/>
                    <rect x="10" width="10" height="20" fill="#fff"/>
                    <rect x="20" width="10" height="20" fill="#ce1126"/>
                  </svg>
                  <span className="font-semibold">ES</span>
                </>
              ) : (
                <>
                  {/* US Flag for English option */}
                  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="30" height="20" fill="#bf0a30"/>
                    <rect y="1.54" width="30" height="1.54" fill="#fff"/>
                    <rect y="4.62" width="30" height="1.54" fill="#fff"/>
                    <rect y="7.69" width="30" height="1.54" fill="#fff"/>
                    <rect y="10.77" width="30" height="1.54" fill="#fff"/>
                    <rect y="13.85" width="30" height="1.54" fill="#fff"/>
                    <rect y="16.92" width="30" height="1.54" fill="#fff"/>
                    <rect width="12" height="10.77" fill="#002868"/>
                  </svg>
                  <span className="font-semibold">EN</span>
                </>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-950" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 bg-sunset-600 text-white rounded-lg font-semibold text-sm tracking-wide hover:bg-sunset-700 hover:shadow-md transition-all ${isScrolled ? 'px-4 py-2' : 'px-5 py-2.5'}`}
            >
              {t('nav.shopNow')}
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
            {/* Language Toggle - Mobile with Flags */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-charcoal-700 font-medium hover:bg-sunset-50 rounded-lg transition-colors mb-4 border border-charcoal-200"
            >
              {language === 'en' ? (
                <>
                  <svg className="w-6 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="10" height="20" fill="#006847"/>
                    <rect x="10" width="10" height="20" fill="#fff"/>
                    <rect x="20" width="10" height="20" fill="#ce1126"/>
                  </svg>
                  <span>Cambiar a Español</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="30" height="20" fill="#bf0a30"/>
                    <rect y="1.54" width="30" height="1.54" fill="#fff"/>
                    <rect y="4.62" width="30" height="1.54" fill="#fff"/>
                    <rect y="7.69" width="30" height="1.54" fill="#fff"/>
                    <rect y="10.77" width="30" height="1.54" fill="#fff"/>
                    <rect y="13.85" width="30" height="1.54" fill="#fff"/>
                    <rect y="16.92" width="30" height="1.54" fill="#fff"/>
                    <rect width="12" height="10.77" fill="#002868"/>
                  </svg>
                  <span>Switch to English</span>
                </>
              )}
            </button>

            {/* Shop Now CTA - Prominent */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-sunset-500 text-white px-6 py-4 rounded-lg font-semibold text-center tracking-wide uppercase hover:bg-sunset-600 transition-colors shadow-md mb-6"
            >
              {t('nav.shopNow')}
            </Link>

            {/* Navigation Links */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.shop')}
            </Link>
            <Link
              href="/craft"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.source')}
            </Link>
            <Link
              href="/guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.guidesAndTips')}
            </Link>
            <Link
              href="/recipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.recipes')}
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.blogAndStories')}
            </Link>
            <Link
              href="/locations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.locations')}
            </Link>
            <Link
              href="/wholesale"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.wholesale')}
            </Link>
            <Link
              href="/story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.story')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
    </>
  );
}
