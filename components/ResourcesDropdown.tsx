'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';

export function ResourcesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const guides = [
    { title: 'How to Store Tortillas', href: '/guides/how-to-store-tortillas', id: 'guide-0' },
    { title: 'How to Reheat Tortillas', href: '/guides/how-to-reheat-tortillas', id: 'guide-1' },
    { title: 'Corn vs Flour Tortillas', href: '/guides/corn-vs-flour-tortillas', id: 'guide-2' },
    { title: 'Tortilla Nutrition Guide', href: '/guides/tortilla-nutrition', id: 'guide-3' },
    { title: 'Tortilla Size Guide', href: '/guides/tortilla-sizes', id: 'guide-4' },
  ];

  const recipes = [
    { title: 'Breakfast Tacos', href: '/recipes/breakfast-tacos', id: 'recipe-0' },
    { title: 'Breakfast Burritos', href: '/recipes/breakfast-burritos', id: 'recipe-1' },
    { title: 'Chicken Fajitas', href: '/recipes/chicken-fajitas', id: 'recipe-2' },
    { title: 'Cheese Quesadillas', href: '/recipes/cheese-quesadillas', id: 'recipe-3' },
  ];

  const blogPosts = [
    { title: 'Maria\'s Story', href: '/blog/marias-story', id: 'blog-0' },
    { title: 'The Science of Nixtamalization', href: '/blog/nixtamalization-science', id: 'blog-1' },
    { title: 'Texas Tortilla Traditions', href: '/blog/texas-tortilla-traditions', id: 'blog-2' },
  ];

  // All focusable menu items (guides + recipes + blog + "View All" links)
  const allMenuItems = [
    { title: 'All Guides', href: '/guides', id: 'all-guides' },
    ...guides,
    { title: 'All Recipes', href: '/recipes', id: 'all-recipes' },
    ...recipes,
    { title: 'All Blog Posts', href: '/blog', id: 'all-blog' },
    ...blogPosts,
  ];

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus management when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Focus first menu item when opened
      const firstLink = menuRef.current.querySelector('a') as HTMLElement;
      if (firstLink) {
        firstLink.focus();
        setFocusedIndex(0);
      }
    }
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    setFocusedIndex(0);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
    // Return focus to trigger button
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  // Keyboard navigation for trigger button
  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        openMenu();
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          closeMenu();
        }
        break;
    }
  };

  // Keyboard navigation within menu
  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    const menuLinks = Array.from(menuRef.current?.querySelectorAll('a') || []) as HTMLElement[];

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (focusedIndex < menuLinks.length - 1) {
          const nextIndex = focusedIndex + 1;
          setFocusedIndex(nextIndex);
          menuLinks[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (focusedIndex > 0) {
          const prevIndex = focusedIndex - 1;
          setFocusedIndex(prevIndex);
          menuLinks[prevIndex]?.focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        menuLinks[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastIndex = menuLinks.length - 1;
        setFocusedIndex(lastIndex);
        menuLinks[lastIndex]?.focus();
        break;
      case 'Tab':
        // Allow natural tab behavior but close menu
        closeMenu();
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onMouseEnter={() => setIsOpen(true)}
        onKeyDown={handleButtonKeyDown}
        className="group relative overflow-hidden flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="resources-menu"
        aria-label="Resources menu"
      >
        <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">
          Resources
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          id="resources-menu"
          role="menu"
          aria-label="Resources navigation menu"
          className="absolute top-full left-0 mt-4 w-80 bg-white backdrop-blur-md border-2 border-charcoal-300/40 rounded-lg shadow-2xl overflow-hidden z-50 animate-dropdown"
          onMouseLeave={() => setIsOpen(false)}
          onKeyDown={handleMenuKeyDown}
        >
          <div className="p-6">
            {/* Guides Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 id="guides-heading" className="text-sm font-bold uppercase tracking-wider text-charcoal-950">
                  Guides & Tips
                </h3>
                <Link
                  href="/guides"
                  role="menuitem"
                  className="text-xs text-sunset-600 hover:text-sunset-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded px-2 py-1"
                  onClick={() => closeMenu()}
                >
                  View All →
                </Link>
              </div>
              <ul role="none" className="space-y-2" aria-labelledby="guides-heading">
                {guides.map((guide) => (
                  <li key={guide.href} role="none">
                    <Link
                      href={guide.href}
                      role="menuitem"
                      className="block px-3 py-2 text-sm text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:bg-sunset-50"
                      onClick={() => closeMenu()}
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-charcoal-200/30 mb-6" aria-hidden="true" />

            {/* Recipes Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 id="recipes-heading" className="text-sm font-bold uppercase tracking-wider text-charcoal-950">
                  Recipes
                </h3>
                <Link
                  href="/recipes"
                  role="menuitem"
                  className="text-xs text-sunset-600 hover:text-sunset-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded px-2 py-1"
                  onClick={() => closeMenu()}
                >
                  View All →
                </Link>
              </div>
              <ul role="none" className="space-y-2" aria-labelledby="recipes-heading">
                {recipes.map((recipe) => (
                  <li key={recipe.href} role="none">
                    <Link
                      href={recipe.href}
                      role="menuitem"
                      className="block px-3 py-2 text-sm text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:bg-sunset-50"
                      onClick={() => closeMenu()}
                    >
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-charcoal-200/30 mb-6" aria-hidden="true" />

            {/* Blog Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 id="blog-heading" className="text-sm font-bold uppercase tracking-wider text-charcoal-950">
                  Blog & Stories
                </h3>
                <Link
                  href="/blog"
                  role="menuitem"
                  className="text-xs text-sunset-600 hover:text-sunset-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 rounded px-2 py-1"
                  onClick={() => closeMenu()}
                >
                  View All →
                </Link>
              </div>
              <ul role="none" className="space-y-2" aria-labelledby="blog-heading">
                {blogPosts.map((post) => (
                  <li key={post.href} role="none">
                    <Link
                      href={post.href}
                      role="menuitem"
                      className="block px-3 py-2 text-sm text-charcoal-700 hover:text-sunset-600 hover:bg-sunset-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:bg-sunset-50"
                      onClick={() => closeMenu()}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Decorative gradient bar */}
          <div className="h-1 bg-gradient-to-r from-sunset-500 via-masa-500 to-rust-500" aria-hidden="true" />
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
