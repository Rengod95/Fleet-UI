'use client';

import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:py-40">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[80px] sm:blur-[100px] md:blur-[120px]" />

      <div className="mx-auto max-w-5xl">
        <MotionSection className="space-y-6 sm:space-y-8">
          {/* Left-aligned content */}
          <MotionItem>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
              Ready to Ship{' '}
              <GradientText>Beautiful Apps?</GradientText>
            </h2>
          </MotionItem>

          <MotionItem>
            <p className="max-w-xl text-base sm:text-lg md:text-xl text-gray-500">
              Start building in minutes. No configuration needed.
              Join developers who care about design quality.
            </p>
          </MotionItem>

          <MotionItem>
            <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 sm:flex-row">
              <Link
                href="/en/getting-started/install"
                className="group inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-medium text-foreground shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 hover:shadow-xl hover:shadow-sky-500/30"
              >
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/Rengod95/Fleet-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-full bg-muted-foreground px-6 sm:px-8 md:px-10 text-base sm:text-lg font-medium backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-muted-foreground/50 text-muted"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                View on GitHub
              </a>
            </div>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
