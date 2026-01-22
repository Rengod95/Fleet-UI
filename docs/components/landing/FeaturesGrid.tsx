'use client';

import {
  Boxes,
  Cpu,
  GitBranch,
  SlidersHorizontal,
  Type,
  Zap,
} from 'lucide-react';
import { MotionSection } from './shared/MotionWrapper';
import {
  BentoCard,
  BentoDescription,
  BentoIcon,
  BentoTitle,
} from './shared/BentoCard';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: Zap,
    title: 'Zero Runtime Overhead',
    description:
      'Built on Unistyles with C++ bindings. Theme-driven styles are resolved fast, without runtime bloat.',
    accent: 'primary' as const,
    highlights: ['UI-thread friendly', 'No runtime style engine', 'Predictable performance'],
    wide: false,
  },
  {
    icon: SlidersHorizontal,
    title: 'Token-first customization',
    description:
      'Easily evolve your design system with layered tokens—tweak existing themes or introduce new colors and scales.',
    accent: 'success' as const,
    highlights: ['Layered token architecture', 'Extendable palettes', 'Theme overrides'],
    wide: false,
  },
  {
    icon: Type,
    title: 'Powerful interfaces',
    description:
      'Strong interfaces across tokens and components—refactor types with confidence and keep your UI consistent.',
    accent: 'info' as const,
    highlights: ['Type-driven tokens', 'Safer refactors', 'Clear contracts'],
    wide: false,
  },
  {
    icon: Cpu,
    title: 'High-performance animation',
    description:
      'Leveraging Unistyles + Reanimated, animations are designed to run on the UI thread for smooth, consistent motion.',
    accent: 'warning' as const,
    highlights: ['UI thread worklets', 'Motion presets', 'Interaction-ready'],
    wide: false,
  },
  {
    icon: Boxes,
    title: 'Flexible state management',
    description:
      'Uncontrolled or controlled—choose the best pattern per component role, without sacrificing ergonomics.',
    accent: 'primary' as const,
    highlights: ['Uncontrolled by default', 'Controlled when needed', 'Composable APIs'],
    wide: false,
  },
  {
    icon: GitBranch,
    title: 'Open component architecture',
    description:
      'Components are intentionally open—easy to extend, override, and tailor to your product’s constraints.',
    accent: 'error' as const,
    highlights: ['Override-friendly', 'Composable building blocks', 'Fits your workflow'],
    wide: false,
  },
];

function HighlightChips({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {items.map((label) => (
        <span
          key={label}
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-1 text-sm',
            'bg-muted-foreground/30 text-foreground/70',
            'transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/6'
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden border-y border-border px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-linear-to-br from-primary/18 via-primary/10 to-transparent blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-linear-to-tr from-primary/14 via-primary/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <MotionSection className="space-y-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/50">
              BUILT FOR REAL PRODUCTS
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
              Scale your product with your own.
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground/60 sm:text-base">
              Token-first foundations, type-safe APIs, and UI-thread optimized motion—so you can ship
              fast without losing consistency.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {FEATURES.map((feature, i) => {
              const isWide = feature.wide;
              const isEven = i % 2 === 0;
              const alignClass = isWide ? 'self-center' : isEven ? 'self-start' : 'self-end';
              const widthClass = isWide ? 'w-full' : 'w-full md:w-[72%]';
              const animationVariant = isWide ? 'scale' : isEven ? 'slideLeft' : 'slideRight';

              return (
                <BentoCard
                  key={feature.title}
                  accent={feature.accent}
                  animationVariant={animationVariant}
                  wrapperClassName={cn(alignClass, widthClass)}
                  className="p-6 sm:p-6"
                >
                  <div className="flex items-start gap-6">
                    <BentoIcon accent={feature.accent}>
                      <feature.icon className="h-5 w-5" />
                    </BentoIcon>
                    <div className="min-w-0 flex-1">
                      <BentoTitle>{feature.title}</BentoTitle>
                      <BentoDescription>{feature.description}</BentoDescription>
                      <HighlightChips items={feature.highlights} />
                    </div>
                  </div>
                </BentoCard>
              );
            })}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
