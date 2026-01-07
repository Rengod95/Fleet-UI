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
        'relative mx-auto h-[600px] w-[300px] rounded-[3rem] border-8 border-gray-900 bg-gray-900 shadow-2xl',
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
      
      {/* Screen */}
      <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-background">
        {children}
      </div>
      
      {/* Buttons */}
      <div className="absolute top-24 -left-3 h-10 w-1 rounded-l-lg bg-gray-800" />
      <div className="absolute top-36 -left-3 h-16 w-1 rounded-l-lg bg-gray-800" />
      <div className="absolute top-36 -right-3 h-16 w-1 rounded-r-lg bg-gray-800" />
    </div>
  );
}
