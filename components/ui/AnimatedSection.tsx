'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'slideUp' | 'scaleIn' | 'parallax';
  delay?: number;
  duration?: number;
  amount?: number;
}

const animationVariants: Record<string, Variants> = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
  },
  parallax: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
  },
};

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  amount = 0.3,
}: AnimatedSectionProps) {
  const variants = animationVariants[animation];

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.19, 1, 0.22, 1], // Custom easing for smooth animations
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized component for text animations
export function AnimatedText({
  children,
  className = '',
  stagger = false,
  delay = 0,
}: {
  children: string;
  className?: string;
  stagger?: boolean;
  delay?: number;
}) {
  if (!stagger) {
    return (
      <AnimatedSection animation="fadeUp" className={className} delay={delay}>
        {children}
      </AnimatedSection>
    );
  }

  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Parallax wrapper component
export function ParallaxWrapper({
  children,
  speed = 0.5,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 100 * speed }}
      whileInView={{ y: 0 }}
      transition={{
        duration: 1.5,
        ease: [0.19, 1, 0.22, 1],
      }}
      viewport={{ once: false, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}