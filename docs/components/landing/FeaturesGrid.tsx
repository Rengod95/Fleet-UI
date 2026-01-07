'use client';

import { Zap, Smartphone, Palette, Film, Keyboard, Accessibility } from 'lucide-react';
import { GlassCard } from './shared/GlassCard';
import { GradientText } from './shared/GradientText';

const techFeatures = [
  {
    icon: Zap,
    title: 'Zero Runtime Overhead',
    description:
      'Built on Unistyles with C++ bindings. Styles computed ahead of time or on UI thread. Native performance, always.',
  },
  {
    icon: Keyboard,
    title: 'Type-Safe Tokens',
    description:
      'Full TypeScript design system. Change once, propagate everywhere. Autocomplete for all your tokens.',
  },
  {
    icon: Film,
    title: 'Reanimated Core',
    description:
      'Every animation driven by worklets. 120fps smooth on any device. Complex gestures made simple.',
  },
];

const designFeatures = [
  {
    icon: Palette,
    title: 'Universal Minimalism',
    description:
      'Stop looking like a Bootstrap app. Fleet UI help you to create apps that looks like Series B Quality apps.',
  },
  {
    icon: Smartphone,
    title: 'Truly Mobile First',
    description:
      'Not just a web port. Touch targets, native gestures, and mobile patterns from day one.',
  },
  {
    icon: Accessibility,
    title: 'Accessible by Default',
    description:
      'ARIA roles, contrast ratios, screen reader support. Inclusive design is not an afterthought.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden py-24 px-6 bg-muted/5">
      <div className="mx-auto max-w-7xl">
        
        {/* Section 1: Technical / Performance */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for <GradientText>Performance</GradientText>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Built close to the metal. Fleet UI leverages C++ bindings and worklets to deliver native-grade performance.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {techFeatures.map((feature, index) => (
              <GlassCard key={index} className="group p-8 border-indigo-500/10 hover:border-indigo-500/30">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                  <feature.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Section 2: Design / Expression */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Designed for <GradientText>Expression</GradientText>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Craft stunning, accessible interfaces that feel alive. Modern aesthetics meet strict usability standards.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {designFeatures.map((feature, index) => (
              <GlassCard key={index} className="group p-8 border-pink-500/10 hover:border-pink-500/30">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 transition-colors">
                  <feature.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
