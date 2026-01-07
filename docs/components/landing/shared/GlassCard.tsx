'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl',
        hoverEffect &&
          'transition-transform duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/10',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}
