'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedBlob } from './shared/AnimatedBlob';
import { GradientText } from './shared/GradientText';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16 text-center md:pt-32">
      <AnimatedBlob />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl space-y-8">
        {/* Badge */}
        <div className="animate-fade-in-up flex justify-center opacity-0 [--animation-delay:200ms]">
          <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            v1.0 Public Beta is Live
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up text-2xl font-bold leading-[72px] tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl [--animation-delay:100ms]">
          Fully Animated, Production-Ready <br/>UI Library for <GradientText>React Native</GradientText>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-muted-foreground opacity-0 sm:text-xl [--animation-delay:600ms]">
          Built for Developers, Designers and Vibe Coders.
          <br className="hidden sm:block" />
          Production-ready animated components with zero complexity.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row [--animation-delay:800ms]">
          <Link
            href="/docs/introduce"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-sky-500 px-8 font-medium text-primary-foreground transition-all hover:bg-sky-500/90 hover:ring-4 hover:ring-sky-500/20"
          >
            <span className="mr-2">Get Started</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs/components"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-muted/30 px-8 font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-muted/50"
          >
            View Components
          </Link>
        </div>

        {/* Tech Stack Badges */}
        <div className="animate-fade-in-up mt-12 flex flex-wrap justify-center gap-6 opacity-0 grayscale transition-all duration-500 hover:grayscale-0 [--animation-delay:1000ms]">
          {['React Native', 'Unistyles', 'Reanimated'].map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm"
            >
              {/* Placeholder icons would go here, using simple circles for now */}
              <div className="h-2 w-2 rounded-full bg-muted-foreground/60" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
