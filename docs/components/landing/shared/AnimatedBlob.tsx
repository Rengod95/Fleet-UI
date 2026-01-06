'use client';

import { cn } from '@/lib/utils';

export function AnimatedBlob({ className }: { className?: string }) {
  return (
    <div className={cn('absolute -z-10 overflow-hidden', className)}>
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] animate-blob rounded-full bg-indigo-500/20 blur-[100px] mix-blend-multiply filter" />
      <div className="animation-delay-2000 absolute top-[20%] -right-[10%] h-[500px] w-[500px] animate-blob rounded-full bg-purple-500/20 blur-[100px] mix-blend-multiply filter" />
      <div className="animation-delay-4000 absolute -bottom-[20%] left-[20%] h-[500px] w-[500px] animate-blob rounded-full bg-pink-500/20 blur-[100px] mix-blend-multiply filter" />
    </div>
  );
}
