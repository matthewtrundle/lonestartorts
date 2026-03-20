'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { ShoppingBag, Menu, X, ChevronDown, User, BookOpen, Newspaper, MapPin, UtensilsCrossed, Truck, MessageCircle, Info } from 'lucide-react';

const resourceLinks = [
  { href: '/craft', labelKey: 'nav.source', icon: Info, description: 'How we source our tortillas' },
  { href: '/guides', labelKey: 'nav.guides', icon: BookOpen, description: 'Tips & storage guides' },
  { href: '/recipes', labelKey: 'nav.recipes', icon: UtensilsCrossed, description: 'Tortilla recipes' },
  { href: '/blog', labelKey: 'nav.blog', icon: Newspaper, description: 'Stories & updates' },
  { href: '/locations', labelKey: 'nav.locations', icon: MapPin, description: 'Where to find us' },
  { href: '/shipping', labelKey: 'nav.shipping', icon: Truck, description: 'Shipping info & rates' },
  { href: '/contact', labelKey: 'nav.contact', icon: MessageCircle, description: 'Get in touch' },
];

export function Header() {
  const { itemCount, setIsOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Only offset the header on homepage where DisclaimerBanner is shown
  const isHomepage = pathname === '/';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleResourcesEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
      resourcesTimeoutRef.current = null;
    }
    setIsResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 150);
  };

  return (
    <>
    <header className={`shrink-header fixed ${isHomepage ? 'top-[28px]' : 'top-0'} left-0 right-0 z-[100] transition-all duration-300 bg-white shadow-md ${isScrolled ? 'shadow-lg' : ''}`} id="main-header">

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="header-content flex justify-between items-center py-1">
          {/* Left side: Logo + Resources */}
          <div className="flex items-center gap-4">
            <Link href="/" className="logo-wrapper group relative">
              <LogoFull
                className="text-charcoal-950 transition-transform duration-300 group-hover:scale-105"
                size="xs"
              />
            </Link>

            {/* Resources Dropdown - Far left, next to logo */}
            <div
              ref={resourcesRef}
              className="relative hidden md:block"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="group relative flex items-center gap-1"
              >
                <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                  Resources
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-charcoal-500 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Dropdown Panel */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-charcoal-100 py-2 transition-all duration-200 ${
                  isResourcesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsResourcesOpen(false)}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-cream-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-sunset-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-charcoal-950">{t(link.labelKey)}</p>
                        <p className="text-xs text-charcoal-500">{link.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

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

          {/* Desktop Navigation - Right side */}
          <nav className={`nav-items hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'gap-3' : 'gap-4'}`}>
            <Link href="/shop" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.shop')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Tortilla divider */}
            <svg className="w-4 h-4 text-sunset-300 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5-1.5 3.5-4 3.5-4-1.5-4-3.5z" />
            </svg>

            <Link href="/subscribe" className="group relative">
              <span className="text-sm font-medium tracking-wide text-sunset-600 transition-colors group-hover:text-sunset-700">
                {t('nav.subscribe')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Tortilla divider */}
            <svg className="w-4 h-4 text-sunset-300 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5-1.5 3.5-4 3.5-4-1.5-4-3.5z" />
            </svg>

            <Link href="/wholesale" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.wholesale')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Language Toggle with Mexican Flag */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded-lg transition-colors border border-charcoal-200 hover:border-sunset-300"
              aria-label={language === 'en' ? 'Cambiar a Espa\u00f1ol' : 'Switch to English'}
            >
              {language === 'en' ? (
                <>
                  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="10" height="20" fill="#006847"/>
                    <rect x="10" width="10" height="20" fill="#fff"/>
                    <rect x="20" width="10" height="20" fill="#ce1126"/>
                  </svg>
                  <span className="font-semibold">ES</span>
                </>
              ) : (
                <>
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

            {/* Account Link */}
            <Link href="/account" className="group relative">
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Account
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
            </Link>

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
                  <span>Cambiar a Espa&ntilde;ol</span>
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

            {/* Primary Links */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.shop')}
            </Link>
            <Link
              href="/subscribe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sunset-600 font-semibold hover:bg-sunset-50 rounded-lg transition-colors"
            >
              {t('nav.subscribeAndSave')}
            </Link>
            <Link
              href="/wholesale"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.wholesale')}
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {t('nav.myAccount')}
            </Link>

            {/* Resources Section */}
            <div className="pt-4 mt-2 border-t border-charcoal-100">
              <button
                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 text-charcoal-500 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isMobileResourcesOpen ? 'max-h-96' : 'max-h-0'}`}>
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-charcoal-700 hover:bg-cream-50 rounded-lg transition-colors"
                    >
                      <Icon className="w-4 h-4 text-sunset-500" />
                      <span className="text-sm">{t(link.labelKey)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Our Story */}
            <Link
              href="/story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-50 rounded-lg transition-colors"
            >
              {t('nav.story')}
            </Link>
          </nav>
        </div>
    </>
  );
}
