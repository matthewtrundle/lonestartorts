'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';
import { ChevronDown, Menu, X } from 'lucide-react';

type NavLink = { href: string; label: string; exact?: boolean };
type NavGroup = { label: string; children: NavLink[] };
type NavEntry = NavLink | NavGroup;

function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}

const navEntries: NavEntry[] = [
  { href: '/admin', label: 'Dashboard', exact: true },
  {
    label: 'Orders',
    children: [
      { href: '/admin/orders', label: 'Orders' },
      { href: '/admin/fulfillment', label: 'Fulfillment' },
      { href: '/admin/inventory', label: 'Inventory' },
    ],
  },
  {
    label: 'Customers',
    children: [
      { href: '/admin/subscriptions', label: 'Subscriptions' },
      { href: '/admin/wholesale', label: 'Wholesale' },
      { href: '/admin/feedback', label: 'Feedback' },
      { href: '/admin/spin-leads', label: 'Spin Leads' },
    ],
  },
  {
    label: 'Marketing',
    children: [
      { href: '/admin/marketing', label: 'Campaigns' },
      { href: '/admin/discounts', label: 'Discounts' },
    ],
  },
  { href: '/admin/analytics', label: 'Analytics' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // Try to fetch protected data to verify session
        const response = await fetch('/api/admin/stats');

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        router.push('/admin/login');
      }
    };

    // Don't check auth on login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    checkAuth();
  }, [pathname, router]);

  // Click-outside handler to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function isLinkActive(link: NavLink): boolean {
    return link.exact ? pathname === link.href : pathname?.startsWith(link.href) ?? false;
  }

  function isGroupActive(group: NavGroup): boolean {
    return group.children.some((child) => isLinkActive(child));
  }

  // Show loading state while checking auth
  if (isAuthenticated === null && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LogoFull className="text-charcoal-950 mx-auto mb-4" />
          <p className="text-charcoal-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show nav on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Admin Navigation */}
      <header className="bg-white border-b border-charcoal-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2">
                <LogoFull className="text-charcoal-950" size="sm" />
                <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">
                  Admin
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav ref={navRef} className="hidden md:flex gap-1 relative">
                {navEntries.map((entry) => {
                  if (isNavGroup(entry)) {
                    const groupActive = isGroupActive(entry);
                    const isOpen = openDropdown === entry.label;

                    return (
                      <div key={entry.label} className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(isOpen ? null : entry.label)
                          }
                          className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1
                            ${groupActive
                              ? 'bg-sunset-500 text-white'
                              : 'text-charcoal-700 hover:bg-cream-100'
                            }
                          `}
                        >
                          {entry.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isOpen && (
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-charcoal-200 py-1 min-w-[180px] z-50">
                            {entry.children.map((child) => {
                              const childActive = isLinkActive(child);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`
                                    block px-4 py-2 text-sm transition-colors
                                    ${childActive
                                      ? 'bg-cream-100 text-sunset-600 font-medium'
                                      : 'text-charcoal-700 hover:bg-cream-100'
                                    }
                                  `}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Standalone link
                  const active = isLinkActive(entry);
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${active
                          ? 'bg-sunset-500 text-white'
                          : 'text-charcoal-700 hover:bg-cream-100'
                        }
                      `}
                    >
                      {entry.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-charcoal-600 hover:text-charcoal-950 transition-colors whitespace-nowrap"
              >
                View Site →
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-charcoal-700 hover:bg-cream-100 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-charcoal-200 bg-white px-4 py-3 space-y-3">
            {navEntries.map((entry) => {
              if (isNavGroup(entry)) {
                return (
                  <div key={entry.label}>
                    <div className="text-xs uppercase text-charcoal-500 font-semibold px-2 mb-1">
                      {entry.label}
                    </div>
                    <div className="space-y-0.5">
                      {entry.children.map((child) => {
                        const childActive = isLinkActive(child);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`
                              block px-4 py-2 text-sm rounded-lg transition-colors
                              ${childActive
                                ? 'bg-cream-100 text-sunset-600 font-medium'
                                : 'text-charcoal-700 hover:bg-cream-100'
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const active = isLinkActive(entry);
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`
                    block px-4 py-2 text-sm rounded-lg font-medium transition-colors
                    ${active
                      ? 'bg-sunset-500 text-white'
                      : 'text-charcoal-700 hover:bg-cream-100'
                    }
                  `}
                >
                  {entry.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunset-600" /></div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
