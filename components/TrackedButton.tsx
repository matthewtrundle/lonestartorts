'use client';

import { trackCTAClick } from '@/lib/analytics';
import { ButtonHTMLAttributes } from 'react';

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackingName: string;
  trackingLocation: string;
  children: React.ReactNode;
}

/**
 * Button component with automatic click tracking
 * Use this for all CTA buttons to ensure consistent tracking
 */
export default function TrackedButton({
  trackingName,
  trackingLocation,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    trackCTAClick(trackingName, trackingLocation);

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
