'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MotionItem } from './MotionWrapper';
import { DotPattern } from '../DotPattern';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Classes applied to the wrapper MotionItem (useful for alignment/width in flex layouts) */
  wrapperClassName?: string;
  /** Spans 2 columns */
  wide?: boolean;
  /** Spans 2 rows */
  tall?: boolean;
  /** Color accent for hover border */
  accent?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Animation variant */
  animationVariant?: 'fadeUp' | 'scale' | 'slideLeft' | 'slideRight';
}

const accentStyles = {
  primary: 'hover:border-sky-500/30 hover:shadow-sky-500/5',
  success: 'hover:border-emerald-500/30 hover:shadow-emerald-500/5',
  warning: 'hover:border-amber-500/30 hover:shadow-amber-500/5',
  error: 'hover:border-rose-500/30 hover:shadow-rose-500/5',
  info: 'hover:border-violet-500/30 hover:shadow-violet-500/5',
  neutral: 'hover:border-white/20 hover:shadow-white/5',
};

export function BentoCard({
  children,
  className,
  wrapperClassName,
  wide = false,
  tall = false,
  accent = 'neutral',
  animationVariant = 'fadeUp',
}: BentoCardProps) {
  return (
    <MotionItem variant={animationVariant} className={wrapperClassName}>
      
      <div
        className={cn(
          // Base styles
          'group relative overflow-hidden rounded-2xl',
          'border border-border/50 bg-card/30',
          'backdrop-blur-sm',
          // Transitions
          'transition-all duration-500 ease-out',
          'hover:border-border/80',
          'hover:bg-card/50',
          'hover:shadow-xl hover:shadow-primary/5',
          // Grid spanning
          wide && 'md:col-span-2',
          tall && 'md:row-span-2',
          // Accent hover
          accentStyles[accent],
          className
        )}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
        </div>
        {children}
      </div>
    </MotionItem>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  /** Number of columns on desktop */
  cols?: 2 | 3 | 4;
}

export function BentoGrid({ children, className, cols = 2 }: BentoGridProps) {
  const colsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:gap-6',
        colsClass[cols],
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoIconProps {
  children: ReactNode;
  accent?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

const iconAccentStyles = {
  primary: 'bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 group-hover:text-sky-300',
  success: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300',
  warning: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300',
  error: 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:text-rose-300',
  info: 'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300',
  neutral: 'bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/80',
};

export function BentoIcon({ children, accent = 'neutral' }: BentoIconProps) {
  return (
    <div
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-lg',
        'transition-all duration-300',
        iconAccentStyles[accent]
      )}
    >
      {children}
    </div>
  );
}

export function BentoTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h3>
  );
}

export function BentoDescription({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground/70 sm:text-base">
      {children}
    </p>
  );
}
