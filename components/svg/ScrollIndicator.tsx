'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
  targetId?: string;
}

export function ScrollIndicator({ className = '', targetId = 'products' }: ScrollIndicatorProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group ${className}`}
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1 }}
    >
      <svg className="w-8 h-12" viewBox="0 0 32 48">
        <rect
          x="8"
          y="4"
          width="16"
          height="28"
          rx="8"
          stroke="white"
          strokeWidth="2"
          fill="none"
          className="group-hover:stroke-sunset-400 transition-colors"
        />
        <motion.circle
          cx="16"
          cy="12"
          r="2"
          fill="white"
          animate={{ cy: [12, 20, 12] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="group-hover:fill-sunset-400 transition-colors"
        />
      </svg>
      <div className="text-white text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
        Scroll
      </div>
    </motion.button>
  );
}
