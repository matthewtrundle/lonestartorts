'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { BrandRule } from '@/components/ui/BrandRule';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Photographic brand strip */}
      <div className="relative h-20 md:h-28 overflow-hidden">
        <Image
          src="/images/brand/strip-footer.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-charcoal-950/40" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Wordmark block */}
        <div className="mb-12">
          <p className="font-display text-4xl md:text-5xl text-cream-50">Lonestar Tortillas</p>
          <p className="mt-3 text-cream-300 text-sm uppercase tracking-widest">Premium Texas Tortillas</p>
          <p className="mt-3 text-charcoal-300 text-sm max-w-md">
            Bringing authentic H-E-B bakery tortillas to Texas expats nationwide.
            Same-day shipping, shelf-stable for weeks.
          </p>
          <div className="mt-6">
            <BrandRule align="left" />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-10">
          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-cream-400">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-charcoal-300 hover:text-white transition-colors">
                  Tortillas
                </Link>
              </li>
              <li>
                <Link href="/shop/heb-products" className="text-charcoal-300 hover:text-white transition-colors">
                  H-E-B Products
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-charcoal-300 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-charcoal-300 hover:text-white transition-colors">
                  {t('nav.subscribeAndSave')}
                </Link>
              </li>
              <li>
                <Link href="/buy-heb-tortillas-online" className="text-charcoal-300 hover:text-white transition-colors">
                  Buy H-E-B Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-cream-400">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-charcoal-300 hover:text-white transition-colors">
                  Tortilla Guides
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-charcoal-300 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/tools/party-calculator" className="text-charcoal-300 hover:text-white transition-colors">
                  Party Calculator
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-charcoal-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-cream-400">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hook-em-tortillas" className="text-charcoal-300 hover:text-white transition-colors">
                  Hook 'em Tortillas
                </Link>
              </li>
              <li>
                <Link href="/military-care-packages" className="text-charcoal-300 hover:text-white transition-colors">
                  Military Care Packages
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-charcoal-300 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-charcoal-300 hover:text-white transition-colors">
                  {t('nav.myAccount')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-cream-400">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:howdy@lonestartortillas.com"
                  className="text-charcoal-300 hover:text-white transition-colors"
                >
                  howdy@lonestartortillas.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-charcoal-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const retellBtn = document.querySelector('[id^="retell-widget"] button, .retell-widget button')
                      || document.querySelector('button[aria-label*="chat"], button[aria-label*="Chat"]');
                    if (retellBtn instanceof HTMLElement) {
                      retellBtn.click();
                      return;
                    }
                    const els = document.querySelectorAll('div[style*="position: fixed"]');
                    for (const el of els) {
                      const btn = el.querySelector('button');
                      if (btn) { btn.click(); return; }
                    }
                  }}
                  className="text-charcoal-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  Chat with Maria
                </button>
              </li>
              <li>
                <Link href="/faq" className="text-charcoal-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-charcoal-300 hover:text-white transition-colors">
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
            <p className="text-charcoal-300 text-xs">
              © {currentYear} Lonestar Tortillas. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-charcoal-300">
              <Link href="/privacy" className="hover:text-charcoal-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-charcoal-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* HEB Disclaimer */}
          <p className="mt-4 text-xs text-charcoal-300 text-center max-w-3xl mx-auto leading-relaxed">
            H-E-B® is a registered trademark of H-E-B, LP. Lone Star Tortillas is an independent
            reseller and is not affiliated with or endorsed by H-E-B. All H-E-B products are
            purchased from retail locations and resold under nominative fair use principles.
          </p>
        </div>
      </div>
    </footer>
  );
}
