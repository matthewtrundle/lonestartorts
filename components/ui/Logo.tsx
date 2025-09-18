'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', animated = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-10 h-10', text: 'text-2xl', subtext: 'text-[8px]' },
    md: { container: 'w-14 h-14', text: 'text-3xl', subtext: 'text-[10px]' },
    lg: { container: 'w-20 h-20', text: 'text-5xl', subtext: 'text-xs' },
  };

  const { container, text, subtext } = sizes[size];

  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
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
    >
      {/* Logo Container */}
      <div className={`${container} relative flex items-center justify-center`}>
        {/* Outer Ring */}
        <div className="absolute inset-0 border border-current rounded-full opacity-20" />

        {/* Inner Circle with Gradient */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent to-current opacity-5" />

        {/* Logo Mark - Stylized Star for Lone Star */}
        <div className="relative flex flex-col items-center justify-center">
          <span className={`font-display font-bold ${text} leading-none`}>★</span>
          <span className={`${subtext} tracking-[0.2em] uppercase opacity-60 absolute -bottom-1`}>LS</span>
        </div>
      </div>
    </motion.div>
  );
}

// Full Logo with Text
export function LogoFull({ className = '', animated = false }: { className?: string; animated?: boolean }) {
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

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo animated={animated} size="md" />
      <motion.div
        variants={animated ? textVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        className="flex flex-col"
      >
        <span className="text-lg font-light tracking-wider uppercase leading-tight">Lone Star</span>
        <span className="text-lg font-light tracking-wider uppercase leading-tight">Tortilla</span>
      </motion.div>
    </div>
  );
}