'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative mx-auto',
        'h-[400px] w-[200px] rounded-[2rem] border-4',
        'sm:h-[500px] sm:w-[250px] sm:rounded-[2.5rem] sm:border-[6px]',
        'md:h-[600px] md:w-[300px] md:rounded-[3rem] md:border-8',
        'border-gray-900 bg-gray-900 shadow-2xl',
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-20 h-4 w-20 sm:h-5 sm:w-24 md:h-6 md:w-32 -translate-x-1/2 rounded-b-xl sm:rounded-b-2xl bg-gray-900" />

      {/* Screen */}
      <div className="h-full w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-background">
        {children}
      </div>

      {/* Buttons */}
      <div className="absolute top-16 -left-2 h-6 w-0.5 sm:top-20 sm:-left-2.5 sm:h-8 sm:w-0.5 md:top-24 md:-left-3 md:h-10 md:w-1 rounded-l-lg bg-gray-800" />
      <div className="absolute top-24 -left-2 h-10 w-0.5 sm:top-28 sm:-left-2.5 sm:h-12 sm:w-0.5 md:top-36 md:-left-3 md:h-16 md:w-1 rounded-l-lg bg-gray-800" />
      <div className="absolute top-24 -right-2 h-10 w-0.5 sm:top-28 sm:-right-2.5 sm:h-12 sm:w-0.5 md:top-36 md:-right-3 md:h-16 md:w-1 rounded-r-lg bg-gray-800" />
    </div>
  );
}
