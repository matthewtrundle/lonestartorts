'use client';

import { useEffect, useState, useRef, type ComponentType } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LogoFull } from '@/components/ui/Logo';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { ShoppingBag, Menu, X, ChevronDown, User, MessageCircle, Phone } from 'lucide-react';
import {
  TortillaStackIcon,
  CalendarTuesdayIcon,
  ShipBoxIcon,
  WheatIcon,
  ComalIcon,
  TexasStarIcon,
  RouteIcon,
} from '@/components/ui/Icons';

// Lazy-load the voice call widget (retell/livekit SDK ~200KB) only when first opened
const MariaVoiceCall = dynamic(
  () => import('@/components/chat/MariaVoiceCall').then((mod) => mod.MariaVoiceCall),
  { ssr: false }
);

// Lazy-load the text chat panel only when first opened
const MariaChatPanel = dynamic(
  () => import('@/components/chat/MariaChatPanel').then((mod) => mod.MariaChatPanel),
  { ssr: false }
);

type ResourceIcon = ComponentType<{ className?: string }>;

const resourceLinks: { href: string; labelKey: string; icon: ResourceIcon; description: string }[] = [
  { href: '/craft', labelKey: 'nav.source', icon: WheatIcon, description: 'Our sourcing story' },
  { href: '/guides', labelKey: 'nav.guides', icon: ComalIcon, description: 'Tips & storage guides' },
  { href: '/recipes', labelKey: 'nav.recipes', icon: TortillaStackIcon, description: 'Tortilla recipes' },
  { href: '/blog', labelKey: 'nav.blog', icon: TexasStarIcon, description: 'Stories & updates' },
  { href: '/locations', labelKey: 'nav.locations', icon: RouteIcon, description: 'Where to find us' },
  { href: '/shipping', labelKey: 'nav.shipping', icon: ShipBoxIcon, description: 'Shipping info & rates' },
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
  const [isMariaOpen, setIsMariaOpen] = useState(false);
  const [hasMariaOpened, setHasMariaOpened] = useState(false);
  const [isMariaMenuOpen, setIsMariaMenuOpen] = useState(false);
  const [isMariaChatOpen, setIsMariaChatOpen] = useState(false);
  const [hasMariaChatOpened, setHasMariaChatOpened] = useState(false);
  const [isChatUnavailable, setIsChatUnavailable] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mariaMenuRef = useRef<HTMLDivElement>(null);
  const mariaButtonRef = useRef<HTMLButtonElement>(null);

  // Only mount the voice call widget after it has been opened at least once
  useEffect(() => {
    if (isMariaOpen) {
      setHasMariaOpened(true);
    }
  }, [isMariaOpen]);

  // Only mount the chat panel after it has been opened at least once
  useEffect(() => {
    if (isMariaChatOpen) {
      setHasMariaChatOpened(true);
    }
  }, [isMariaChatOpen]);

  // Only offset the header on homepage where DisclaimerBanner is shown
  const isHomepage = pathname === '/';

  // Active page gets a persistent sunset underline; others keep the grow-on-hover rule
  const isActive = (href: string) => pathname === href;
  const navUnderline = (href: string) =>
    `absolute -bottom-1 left-0 h-0.5 bg-sunset-600 transition-all duration-300 ${
      isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
      if (mariaMenuRef.current && !mariaMenuRef.current.contains(e.target as Node)) {
        setIsMariaMenuOpen(false);
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

  const hasMariaWidget = !!process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  return (
    <>
    <header className={`shrink-header fixed ${isHomepage ? 'top-[28px]' : 'top-0'} left-0 right-0 z-[100] transition-all duration-300 bg-cream-50 border-b border-cream-300 shadow-subtle ${isScrolled ? 'shadow-medium' : ''}`} id="main-header">
      {/* Brand top rule */}
      <div aria-hidden="true" className="h-[3px] w-full bg-sunset-600" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="header-content flex justify-between items-center py-0.5">
          {/* Left side: Logo */}
          <Link href="/" className="logo-wrapper group relative block scale-[0.92] origin-left">
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
              className="relative p-2 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="w-6 h-6 text-charcoal-950" />
              {itemCount > 0 && (
                <span aria-hidden="true" className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal-950" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal-950" />
              )}
            </button>
          </div>

          {/* Desktop Navigation - Right side: one cohesive cluster */}
          <nav className="nav-items hidden md:flex items-center gap-1 lg:gap-1.5">
            {/* Resources Dropdown */}
            <div
              ref={resourcesRef}
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && isResourcesOpen) {
                  setIsResourcesOpen(false);
                  resourcesButtonRef.current?.focus();
                }
              }}
            >
              <button
                ref={resourcesButtonRef}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
                aria-controls="resources-menu"
                className="group flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-cream-200/70 transition-colors"
              >
                <WheatIcon className="w-4 h-4 text-sunset-700 shrink-0" />
                <span className="relative text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                  Resources
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunset-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-charcoal-500 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Panel — two-column */}
              <div
                id="resources-menu"
                // React 18 needs ''/undefined for inert; types expect boolean
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inert={(!isResourcesOpen ? '' : undefined) as any}
                className={`absolute top-full left-0 mt-1 w-[28rem] bg-cream-50 rounded-xl shadow-medium border border-cream-300 p-3 grid grid-cols-2 gap-1 transition-all duration-200 ${
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
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-cream-200/70 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-sunset-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-charcoal-950">{t(link.labelKey)}</p>
                        <p className="text-xs text-charcoal-500 leading-snug">{link.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/shop"
              className="group flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-cream-200/70 transition-colors"
              aria-current={isActive('/shop') ? 'page' : undefined}
            >
              <TortillaStackIcon className="w-4 h-4 text-sunset-700 shrink-0" />
              <span className="relative text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.shop')}
                <span className={navUnderline('/shop')} />
              </span>
            </Link>

            <Link
              href="/subscribe"
              className="group flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-cream-200/70 transition-colors"
              aria-current={isActive('/subscribe') ? 'page' : undefined}
            >
              <CalendarTuesdayIcon className="w-4 h-4 text-sunset-700 shrink-0" />
              <span className="relative text-sm font-medium tracking-wide text-sunset-700 transition-colors group-hover:text-sunset-800">
                {t('nav.subscribe')}
                <span className={navUnderline('/subscribe')} />
              </span>
            </Link>

            <Link
              href="/wholesale"
              className="group flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-cream-200/70 transition-colors"
              aria-current={isActive('/wholesale') ? 'page' : undefined}
            >
              <ShipBoxIcon className="w-4 h-4 text-sunset-700 shrink-0" />
              <span className="relative text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                {t('nav.wholesale')}
                <span className={navUnderline('/wholesale')} />
              </span>
            </Link>

            {/* Right-side controls: language / Maria / Account / cart / CTA */}
            <div className="flex items-center gap-3 ml-2 lg:ml-4">
            {/* Language Toggle with Mexican Flag */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded-lg transition-colors border border-charcoal-200 hover:border-sunset-300"
              aria-label={language === 'en' ? 'Cambiar a Espa\u00f1ol' : 'Switch to English'}
            >
              {language === 'en' ? (
                <>
                  <svg aria-hidden="true" focusable="false" className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
                    <rect width="10" height="20" fill="#006847"/>
                    <rect x="10" width="10" height="20" fill="#fff"/>
                    <rect x="20" width="10" height="20" fill="#ce1126"/>
                  </svg>
                  <span className="font-semibold">ES</span>
                </>
              ) : (
                <>
                  <svg aria-hidden="true" focusable="false" className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 30 20">
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

            {/* Ask Maria AI Button + two-option popover (voice / text chat) */}
            {(hasMariaWidget || !isChatUnavailable) && (
              <div
                className="relative"
                ref={mariaMenuRef}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && isMariaMenuOpen) {
                    setIsMariaMenuOpen(false);
                    mariaButtonRef.current?.focus();
                  }
                }}
              >
                <button
                  ref={mariaButtonRef}
                  onClick={() => setIsMariaMenuOpen(!isMariaMenuOpen)}
                  className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sunset-200 bg-sunset-50 hover:bg-sunset-100 transition-all"
                  aria-label="Ask Maria, our AI assistant"
                  aria-expanded={isMariaMenuOpen}
                  aria-haspopup="true"
                  aria-controls="maria-menu"
                >
                  <ComalIcon className="w-4 h-4 text-sunset-600" />
                  <span className="text-sm font-medium text-sunset-700 group-hover:text-sunset-800">
                    Ask Maria
                  </span>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sunset-500" />
                  </span>
                </button>

                {/* Two-option popover */}
                <div
                  id="maria-menu"
                  // React 18 needs ''/undefined for inert; types expect boolean
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  inert={(!isMariaMenuOpen ? '' : undefined) as any}
                  className={`absolute top-full right-0 mt-1 w-60 bg-cream-50 rounded-xl shadow-medium border border-cream-300 p-1.5 transition-all duration-200 ${
                    isMariaMenuOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {!isChatUnavailable && (
                    <button
                      onClick={() => {
                        setIsMariaMenuOpen(false);
                        setIsMariaChatOpen(true);
                      }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-cream-200/70 transition-colors text-left"
                    >
                      <MessageCircle className="w-4 h-4 text-sunset-700 mt-0.5 shrink-0" />
                      <span>
                        <span className="block text-sm font-medium text-charcoal-950">Chat with Maria</span>
                        <span className="block text-xs text-charcoal-500">Type your question</span>
                      </span>
                    </button>
                  )}
                  {hasMariaWidget && (
                    <button
                      onClick={() => {
                        setIsMariaMenuOpen(false);
                        setIsMariaOpen(true);
                      }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-cream-200/70 transition-colors text-left"
                    >
                      <Phone className="w-4 h-4 text-sunset-700 mt-0.5 shrink-0" />
                      <span>
                        <span className="block text-sm font-medium text-charcoal-950">Voice call</span>
                        <span className="block text-xs text-charcoal-500">Talk it out live</span>
                      </span>
                    </button>
                  )}
                </div>

                {hasMariaWidget && hasMariaOpened && (
                  <MariaVoiceCall isOpen={isMariaOpen} onClose={() => setIsMariaOpen(false)} />
                )}
              </div>
            )}

            {/* Account Link */}
            <Link href="/account" className="group relative" aria-current={isActive('/account') ? 'page' : undefined}>
              <span className="text-sm font-medium tracking-wide text-charcoal-950 transition-colors group-hover:text-sunset-600">
                Account
              </span>
              <span className={navUnderline('/account')} />
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-950" />
              {itemCount > 0 && (
                <span aria-hidden="true" className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
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
            </div>
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
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        // React 18 needs ''/undefined for inert; types expect boolean
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inert={(!isMobileMenuOpen ? '' : undefined) as any}
        className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-sm z-[9999] bg-cream-50 shadow-large transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-cream-300 bg-cream-50">
            <LogoFull className="text-charcoal-950" size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-sunset-50 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-charcoal-950" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex flex-col p-6 space-y-1 overflow-y-auto h-[calc(100vh-180px)] bg-cream-50">
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
              className="w-full bg-sunset-500 text-white px-6 py-4 rounded-lg font-semibold text-center tracking-wide uppercase hover:bg-sunset-600 transition-colors shadow-md mb-2"
            >
              {t('nav.shopNow')}
            </Link>

            {/* Ask Maria AI - Mobile (chat + voice) */}
            {(hasMariaWidget || !isChatUnavailable) && (
              <div className="flex flex-col gap-2 mb-4">
                {!isChatUnavailable && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => setIsMariaChatOpen(true), 300);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-sunset-300 bg-sunset-50 hover:bg-sunset-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-sunset-600 shrink-0" />
                    <span className="font-semibold text-sunset-700 whitespace-nowrap">Chat with Maria</span>
                  </button>
                )}
                {hasMariaWidget && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => setIsMariaOpen(true), 300);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-sunset-300 bg-sunset-50 hover:bg-sunset-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sunset-600 shrink-0" />
                    <span className="font-semibold text-sunset-700 whitespace-nowrap">Ask Maria — voice call</span>
                  </button>
                )}
              </div>
            )}

            {/* Primary Links */}
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors"
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
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors"
            >
              {t('nav.wholesale')}
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {t('nav.myAccount')}
            </Link>

            {/* Promoted resource links - direct access */}
            <div className="pt-4 mt-2 border-t border-charcoal-100">
              <Link
                href="/recipes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <TortillaStackIcon className="w-4 h-4 text-sunset-700" />
                {t('nav.recipes')}
              </Link>
              <Link
                href="/guides"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <ComalIcon className="w-4 h-4 text-sunset-700" />
                {t('nav.guides')}
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <TexasStarIcon className="w-4 h-4 text-sunset-700" />
                {t('nav.blog')}
              </Link>

              {/* More resources - collapsible */}
              <button
                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                aria-expanded={isMobileResourcesOpen}
                aria-controls="mobile-more-menu"
                className="w-full flex items-center justify-between px-4 py-3 text-charcoal-700 font-medium hover:bg-cream-100 rounded-lg transition-colors"
              >
                <span className="text-sm">More</span>
                <ChevronDown className={`w-4 h-4 text-charcoal-500 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                id="mobile-more-menu"
                // React 18 needs ''/undefined for inert; types expect boolean
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inert={(!isMobileResourcesOpen ? '' : undefined) as any}
                className={`overflow-hidden transition-all duration-200 ${isMobileResourcesOpen ? 'max-h-96' : 'max-h-0'}`}
              >
                {resourceLinks
                  .filter(link => !['/recipes', '/guides', '/blog'].includes(link.href))
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-charcoal-700 hover:bg-cream-100 rounded-lg transition-colors"
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
              className="px-4 py-3 text-charcoal-950 font-medium hover:bg-cream-100 rounded-lg transition-colors"
            >
              {t('nav.story')}
            </Link>
          </nav>
        </div>

      {/* Maria text chat panel - mounted at root level to avoid stacking context issues */}
      {hasMariaChatOpened && (
        <MariaChatPanel
          isOpen={isMariaChatOpen}
          onClose={() => setIsMariaChatOpen(false)}
          onUnavailable={() => setIsChatUnavailable(true)}
        />
      )}
    </>
  );
}
