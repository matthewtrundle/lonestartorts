'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ensure loading screen shows for at least 1.5 seconds
    const minimumLoadTime = 1500;
    const startTime = Date.now();

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minimumLoadTime - elapsed);

          clearInterval(interval);
          setTimeout(() => setIsLoading(false), remainingTime + 200);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative">
              {/* Animated glow effect */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 blur-xl"
              >
                <Image
                  src="/images/lonestar-logo.png"
                  alt="Lonestar Tortillas"
                  width={240}
                  height={135}
                  className="object-contain opacity-50"
                  priority
                />
              </motion.div>

              {/* Main Logo */}
              <Image
                src="/images/lonestar-logo.png"
                alt="Lonestar Tortillas"
                width={240}
                height={135}
                className="object-contain relative z-10"
                priority
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/40 text-xs tracking-[0.3em] uppercase mb-12"
          >
            Authentic Texas Tortillas
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/80"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/40 text-xs tracking-widest uppercase mt-8"
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}