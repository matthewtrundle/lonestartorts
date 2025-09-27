'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', animated = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-10 h-10', star: 'w-8 h-8' },
    md: { container: 'w-14 h-14', star: 'w-12 h-12' },
    lg: { container: 'w-20 h-20', star: 'w-16 h-16' },
  };

  const { container, star } = sizes[size];

  const logoVariants = {
    initial: { scale: 0.9, opacity: 0, rotate: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
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
    >
      {/* Logo Container */}
      <div className={`${container} relative flex items-center justify-center`}>
        {/* Star with Wheat Design */}
        <svg
          viewBox="0 0 100 100"
          className={`${star} fill-current`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Star */}
          <path
            d="M50 2 L61.8 37.6 L99 37.6 L69.1 60.8 L80.9 96.4 L50 73.2 L19.1 96.4 L30.9 60.8 L1 37.6 L38.2 37.6 Z"
            className="opacity-90"
          />

          {/* Wheat Stalk Center */}
          <g transform="translate(50, 50)">
            {/* Main stalk */}
            <rect x="-1.5" y="-20" width="3" height="40" className="opacity-70" />

            {/* Left wheat grains */}
            <ellipse cx="-8" cy="-15" rx="3.5" ry="6" transform="rotate(-25 -8 -15)" className="opacity-60" />
            <ellipse cx="-7" cy="-8" rx="3" ry="5" transform="rotate(-30 -7 -8)" className="opacity-60" />
            <ellipse cx="-6" cy="-1" rx="2.5" ry="4" transform="rotate(-35 -6 -1)" className="opacity-60" />

            {/* Right wheat grains */}
            <ellipse cx="8" cy="-15" rx="3.5" ry="6" transform="rotate(25 8 -15)" className="opacity-60" />
            <ellipse cx="7" cy="-8" rx="3" ry="5" transform="rotate(30 7 -8)" className="opacity-60" />
            <ellipse cx="6" cy="-1" rx="2.5" ry="4" transform="rotate(35 6 -1)" className="opacity-60" />

            {/* Top wheat grain */}
            <ellipse cx="0" cy="-22" rx="3" ry="5" className="opacity-70" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

// Full Logo with Text
// Logo Badge with Wood Grain Background
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
    sm: { container: 'w-32 h-32', padding: 'p-3', text: 'text-sm' },
    md: { container: 'w-48 h-48', padding: 'p-4', text: 'text-base' },
    lg: { container: 'w-64 h-64', padding: 'p-6', text: 'text-lg' },
  };

  const { container, padding, text } = sizes[size];

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
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #A0522D 75%, #8B4513 100%)',
          backgroundSize: '200% 200%',
        }}
      >
        {/* Wood grain texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,.03) 3px, rgba(0,0,0,.03) 6px),
                              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.02) 3px, rgba(0,0,0,.02) 6px)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-cream-50">
        <Logo size={size} className="mb-2" />
        <div className="text-center">
          <div className={`font-bold tracking-wide uppercase ${text}`}>Lonestar</div>
          <div className={`font-medium tracking-widest uppercase ${text}`}>Tortillas</div>
          <div className={`mt-1 opacity-80 text-[0.8em] ${text}`}>Premium Texas Tortillas</div>
        </div>
      </div>
    </motion.div>
  );
}

export function LogoFull({
  className = '',
  animated = false,
  showTagline = false,
  size = 'md'
}: {
  className?: string;
  animated?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const textVariants = {
    initial: { x: -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const taglineVariants = {
    initial: { y: 10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const textSizes = {
    sm: { title: 'text-base', tagline: 'text-xs' },
    md: { title: 'text-lg', tagline: 'text-sm' },
    lg: { title: 'text-2xl', tagline: 'text-base' },
  };

  const { title, tagline } = textSizes[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo animated={animated} size={size} />
      <motion.div
        variants={animated ? textVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        className="flex flex-col"
      >
        <span className={`${title} font-bold tracking-wide uppercase leading-tight`}>Lonestar</span>
        <span className={`${title} font-medium tracking-widest uppercase leading-tight`}>Tortillas</span>
        {showTagline && (
          <motion.div
            variants={animated ? taglineVariants : undefined}
            initial={animated ? 'initial' : undefined}
            animate={animated ? 'animate' : undefined}
            className="mt-1"
          >
            <span className={`${tagline} text-current opacity-70 leading-tight`}>
              Premium Texas Tortillas
            </span>
            <span className={`block ${tagline} text-current opacity-50 text-[0.65em] mt-0.5`}>
              Independent reseller. Not affiliated with or endorsed by H-E-B®.
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}