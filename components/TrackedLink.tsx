'use client';

import Link from 'next/link';
import { trackOutboundLink, event } from '@/lib/analytics';
import { AnchorHTMLAttributes } from 'react';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  trackAsOutbound?: boolean;
  eventName?: string;
  eventCategory?: string;
}

/**
 * Link component with automatic tracking for internal and outbound links
 */
export default function TrackedLink({
  href,
  children,
  trackAsOutbound = false,
  eventName,
  eventCategory,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's an outbound link
    const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

    if (isExternal || trackAsOutbound) {
      trackOutboundLink(href);
    }

    // Track custom event if provided
    if (eventName && eventCategory) {
      event({
        action: eventName,
        category: eventCategory,
        label: href,
      });
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
