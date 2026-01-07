'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Lonestar Tortillas</h3>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Bringing authentic H-E-B bakery tortillas to Texas expats nationwide.
              Same-day shipping, shelf-stable for weeks.
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-400">
              <span>🎆</span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              New Year Fiesta: FREE shipping on orders $80+
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Tortillas
                </Link>
              </li>
              <li>
                <Link href="/shop/heb-products" className="text-gray-400 hover:text-white transition-colors">
                  H-E-B Products
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-gray-400 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="sms:+17372280037"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Text Us: (737) 228-0037</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:howdy@lonestartortillas.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  howdy@lonestartortillas.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Disclaimer */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} Lonestar Tortillas. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* HEB Disclaimer */}
          <p className="mt-4 text-[10px] text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            H-E-B® is a registered trademark of H-E-B, LP. Lone Star Tortillas is an independent
            reseller and is not affiliated with or endorsed by H-E-B. All H-E-B products are
            purchased from retail locations and resold under nominative fair use principles.
          </p>
        </div>
      </div>
    </footer>
  );
}
