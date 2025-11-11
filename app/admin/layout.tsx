'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

  const navItems = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/seo', label: 'SEO Monitor' },
  ];

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

              <nav className="hidden md:flex gap-1">
                {navItems.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname?.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive
                          ? 'bg-sunset-500 text-white'
                          : 'text-charcoal-700 hover:bg-cream-100'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-charcoal-600 hover:text-charcoal-950 transition-colors"
              >
                View Site →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
