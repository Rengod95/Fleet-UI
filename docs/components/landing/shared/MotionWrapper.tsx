'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// Container variants for staggered children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Item variants for fade-in-up effect
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade-in only variant
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Scale-in variant
const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide-in from left
const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide-in from right
const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Section container with staggered children
export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fade' | 'scale' | 'slideLeft' | 'slideRight';
  delay?: number;
}

// Individual animated item
export function MotionItem({ 
  children, 
  className, 
  variant = 'fadeUp',
  delay = 0 
}: MotionItemProps) {
  const variantMap = {
    fadeUp: itemVariants,
    fade: fadeVariants,
    scale: scaleVariants,
    slideLeft: slideLeftVariants,
    slideRight: slideRightVariants,
  };

  return (
    <motion.div
      variants={variantMap[variant]}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface MotionGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

// Group of items with staggered animation (for use inside MotionSection)
export function MotionGroup({ children, className, staggerDelay = 0.1 }: MotionGroupProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export variants for custom use
export { containerVariants, itemVariants, fadeVariants, scaleVariants, slideLeftVariants, slideRightVariants };
