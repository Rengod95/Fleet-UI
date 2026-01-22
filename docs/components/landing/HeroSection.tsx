'use client';

import Link from 'next/link';
import { ArrowRight, Github, Sparkles, Wrench, Palette, Plug } from 'lucide-react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';

const VALUE_BADGES = [
  {
    icon: Sparkles,
    label: 'Production Ready',
    description: 'Built-in motion',
  },
  {
    icon: Wrench,
    label: 'DX',
    description: 'Easy to use',
  },
  {
    icon: Palette,
    label: 'Design System',
    description: 'Design system',
  },
  {
    icon: Plug,
    label: 'Extensibility',
    description: 'Swap themes',
  },
];

const TECH_STACK = ['React Native', 'Unistyles', 'Reanimated'];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pt-20 pb-16 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <MotionSection className="space-y-8">
          {/* Main Headline - Left Aligned */}
          <MotionItem>
            <h1 className="max-w-4xl text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <GradientText>Production-Ready UI SDK</GradientText>
              <br />
              for Series B Quality Apps.
            </h1>
          </MotionItem>

          {/* Subheadline */}
          <MotionItem>
            <p className="max-w-2xl text-base text-gray-400 sm:text-xl font-light leading-normal">
              UI SDK with Consistent design based on minimalism and fluid animations.
              <br className="hidden sm:block" />
              Zero runtime overhead, Easy to Copy/Paste leverage Unistyles.
            </p>
          </MotionItem>

          {/* 4 Value Badges */}
          {/* <MotionItem>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-around my-16">
              {VALUE_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="group flex items-center gap-3 rounded-xl bg-muted/20 border border-border px-3 py-2 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors group-hover:bg-white/15 group-hover:text-white">
                    <badge.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-white">{badge.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </MotionItem> */}

          {/* CTA Buttons */}
          <MotionItem>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                href="/en/getting-started/install"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-sky-500 to-primary px-8 font-bold text-white transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/25"
              >
                Get Started
              </Link>
              <a
                href="https://github.com/Rengod95/Fleet-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-8 font-medium text-foreground backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-foreground/[0.04]"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </MotionItem>

          {/* Tech Stack Badges */}
          <MotionItem>
            <div className="flex flex-wrap items-center gap-4 px-2">
              <span className="text-xs uppercase tracking-wider  text-muted-foreground">Built with</span>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-card px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
