'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Package, Terminal } from 'lucide-react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';
import { cn } from '@/lib/utils';

type Track = 'a' | 'b';

const TRACKS = {
  a: {
    label: 'TRACK A - Local',
    description: 'Own the source code—install only what you need and customize freely.',
    features: [
      'Component-by-component install',
      'Source ownership & deep customization',
      'Opt-in updates (you choose what to merge)',
    ],
    idealFor: 'Teams that need to evolve tokens/components aggressively',
    icon: Terminal,
    badge: 'Most flexible',
    emphasis: 'Copy / Paste Code',
  },
  b: {
    label: 'TRACK B - Package',
    description: 'Install via packages—get a stable baseline and upgrade with versions.',
    features: [
      'Fastest time-to-first-screen',
      'Versioned upgrades & patches',
      'Standard APIs, predictable usage',
    ],
    idealFor: 'Teams prioritizing velocity and predictable maintenance',
    icon: Package,
    badge: 'Most stable',
    emphasis: 'Package manager Inst.',
  },
};

export function InstallationOptions() {
  const [activeTrack, setActiveTrack] = useState<Track>('a');

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-white/1 px-6 py-24 sm:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-linear-to-br from-primary/18 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-linear-to-tr from-primary/14 via-primary/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <MotionSection className="space-y-10">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <MotionItem>
              <p className="text-xs font-medium tracking-widest text-foreground/50">
                INSTALLATION
              </p>
            </MotionItem>
            <MotionItem>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
                Choose your <GradientText>installation</GradientText> Track
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/60 sm:text-lg">
                Pick the model that matches your team: a shadcn-style local install for full
                ownership, or a package install for a stable, versioned workflow.
              </p>
            </MotionItem>
          </div>

          {/* Pricing-style plans */}
          <MotionItem>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {(Object.keys(TRACKS) as Track[]).map((key) => {
                const option = TRACKS[key];
                const isActive = activeTrack === key;
                const Icon = option.icon;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTrack(key)}
                    className={cn(
                      'group relative w-full overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-sm transition-all sm:p-5 cursor-pointer',
                      isActive
                        ? 'border-sky-500 bg-card shadow-lg shadow-sky-500/10'
                        : 'border-foreground/10 bg-muted-foreground/1 hover:border-foreground/20 hover:bg-muted-foreground/4'
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-linear-to-br from-white/6 to-transparent" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-12 mt-1">
                          <div className="flex items-center gap-4 text-lg font-medium text-foreground">
                            <div
                              className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-xl border transition-colors',
                                isActive
                                  ? 'border-sky-500/20 bg-sky-500/10 text-sky-300'
                                  : 'border-foreground/10 bg-muted-foreground/5 text-foreground/70 group-hover:bg-muted-foreground/8 group-hover:text-foreground'
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                          {option.label}
                          </div>
                          <div
                            className={cn(
                              'rounded-full border px-2.5 py-1 text-sm',
                              isActive
                                ? 'border-sky-500/20 bg-sky-500/10 text-sky-300'
                                : 'border-foreground/10 bg-muted-foreground/3 text-foreground/60'
                            )}
                          >
                            {option.badge}
                          </div>
                        </div>

                        <p className="mt-4 px-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                          {option.description}
                        </p>

                        <div className="my-8 rounded-lg border border-foreground/10 bg-muted-foreground/2 px-3 py-5">
                          <div className="text-xs uppercase tracking-wider text-foreground/80 font-bold">
                            What you get
                          </div>
                          <div className="mt-0.5 text-3xl font-semibold text-foreground">
                            {option.emphasis}
                          </div>
                        </div>

                       

                        <div className="mt-8 space-y-3">
                          {option.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2 text-base text-foreground/80">
                              <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-14 border-t border-white/10 pt-4">
                          <div className="text-xs uppercase tracking-wider text-foreground/45">
                          <GradientText className="text-sm font-bold">Best for</GradientText>
                          </div>
                          <div className="mt-1 text-base text-foreground/90">{option.idealFor}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </MotionItem>

          {/* CTA */}
          <MotionItem>
            <div className="flex justify-center pt-2">
              <Link
                href="/en/getting-started/install"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary via-sky-500 to-primary px-8 font-medium text-white transition-all hover:shadow-lg hover:shadow-sky-500/25"
              >
                Detailed Installation Guide
              </Link>
            </div>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
