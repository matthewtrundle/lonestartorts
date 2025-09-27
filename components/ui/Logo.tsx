'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

// Image-based Logo Component
export function Logo({ className = '', animated = false, size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 60 },
    md: { width: 180, height: 90 },
    lg: { width: 240, height: 120 },
  };

  const { width, height } = sizes[size];

  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={animated ? logoVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <Image
        src="/images/lonestar-logo.png"
        alt="Lonestar Tortillas"
        width={width}
        height={height}
        className="object-contain"
        priority
        style={{
          objectPosition: showTagline ? 'center' : 'center top',
          clipPath: showTagline ? 'none' : 'inset(0 0 35% 0)'
        }}
      />
    </motion.div>
  );
}

// Full Logo with Text (using the image that already has text)
export function LogoFull({
  className = '',
  animated = false,
  size = 'md'
}: {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: { width: 140, height: 70 },
    md: { width: 200, height: 100 },
    lg: { width: 280, height: 140 },
  };

  const { width, height } = sizes[size];

  const logoVariants = {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={animated ? logoVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <Image
        src="/images/lonestar-logo.png"
        alt="Lonestar Tortillas"
        width={width}
        height={height}
        className="object-contain"
        priority
        style={{
          // Crop to show just the logo and main text, not the tagline
          objectPosition: 'center top',
          clipPath: 'inset(0 0 30% 0)'
        }}
      />
    </motion.div>
  );
}

// Logo with Tagline (shows the full image including "Those who know tortillas...")
export function LogoWithTagline({
  className = '',
  animated = false,
  size = 'md'
}: {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: { width: 200, height: 120 },
    md: { width: 320, height: 180 },
    lg: { width: 400, height: 225 },
  };

  const { width, height } = sizes[size];

  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -5 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      variants={animated ? badgeVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      className={`relative ${className}`}
    >
      <div className="relative" style={{ width, height }}>
        <Image
          src="/images/lonestar-logo.png"
          alt="Lonestar Tortillas - Those who know tortillas, know H-E-B"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
        {/* Disclaimer text below */}
        <p className="text-[0.5em] text-center opacity-60 mt-1 leading-tight">
          Independent reseller. Not affiliated with or endorsed by H-E-B®.
        </p>
      </div>
    </motion.div>
  );
}

// Badge version with wood background effect (recreates the look from the image)
export function LogoBadge({
  className = '',
  animated = false,
  size = 'md'
}: {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: { container: 'w-48 h-48', padding: 'p-4' },
    md: { container: 'w-64 h-64', padding: 'p-6' },
    lg: { container: 'w-80 h-80', padding: 'p-8' },
  };

  const { container, padding } = sizes[size];

  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -5 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      variants={animated ? badgeVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      className={`relative ${container} ${className}`}
    >
      {/* Wood Grain Background Effect */}
      <div
        className={`absolute inset-0 rounded-lg overflow-hidden ${padding}`}
        style={{
          background: 'linear-gradient(135deg, #3E2723 0%, #4E342E 25%, #5D4037 50%, #4E342E 75%, #3E2723 100%)',
          backgroundSize: '200% 200%',
        }}
      >
        {/* Wood grain texture overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,.1) 3px, rgba(0,0,0,.1) 6px),
                              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.05) 3px, rgba(0,0,0,.05) 6px)`,
          }}
        />
      </div>

      {/* Logo Image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Image
          src="/images/lonestar-logo.png"
          alt="Lonestar Tortillas"
          width={280}
          height={160}
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}