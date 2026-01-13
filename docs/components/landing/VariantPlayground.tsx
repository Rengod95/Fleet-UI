'use client';

import { useState } from 'react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';
import { cn } from '@/lib/utils';

type Variant = 'filled' | 'outlined' | 'flat' | 'ghost' | 'faded';
type ColorScheme = 'primary' | 'neutral' | 'error' | 'success' | 'warning' | 'info';
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
type Shadow = 'none' | 'sm' | 'md' | 'lg';

const VARIANTS: Variant[] = ['filled', 'outlined', 'flat', 'ghost', 'faded'];
const COLOR_SCHEMES: ColorScheme[] = ['primary', 'neutral', 'error', 'success', 'warning', 'info'];
const ROUNDED: Rounded[] = ['none', 'sm', 'md', 'lg', 'full'];
const SHADOWS: Shadow[] = ['none', 'sm', 'md', 'lg'];

const variantStyles: Record<Variant, Record<ColorScheme, string>> = {
  filled: {
    primary: 'bg-sky-500 text-white',
    neutral: 'bg-gray-200 text-gray-900',
    error: 'bg-rose-500 text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-black',
    info: 'bg-violet-500 text-white',
  },
  outlined: {
    primary: 'border-2 border-sky-500 text-sky-400 bg-transparent',
    neutral: 'border-2 border-gray-500 text-gray-300 bg-transparent',
    error: 'border-2 border-rose-500 text-rose-400 bg-transparent',
    success: 'border-2 border-emerald-500 text-emerald-400 bg-transparent',
    warning: 'border-2 border-amber-500 text-amber-400 bg-transparent',
    info: 'border-2 border-violet-500 text-violet-400 bg-transparent',
  },
  flat: {
    primary: 'bg-sky-500/20 text-sky-400',
    neutral: 'bg-gray-500/20 text-gray-300',
    error: 'bg-rose-500/20 text-rose-400',
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    info: 'bg-violet-500/20 text-violet-400',
  },
  ghost: {
    primary: 'bg-transparent text-sky-400 hover:bg-sky-500/10',
    neutral: 'bg-transparent text-gray-300 hover:bg-gray-500/10',
    error: 'bg-transparent text-rose-400 hover:bg-rose-500/10',
    success: 'bg-transparent text-emerald-400 hover:bg-emerald-500/10',
    warning: 'bg-transparent text-amber-400 hover:bg-amber-500/10',
    info: 'bg-transparent text-violet-400 hover:bg-violet-500/10',
  },
  faded: {
    primary: 'bg-sky-500/10 border border-sky-500/30 text-sky-400',
    neutral: 'bg-gray-500/10 border border-gray-500/30 text-gray-300',
    error: 'bg-rose-500/10 border border-rose-500/30 text-rose-400',
    success: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border border-amber-500/30 text-amber-400',
    info: 'bg-violet-500/10 border border-violet-500/30 text-violet-400',
  },
};

const roundedStyles: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const shadowStyles: Record<Shadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs font-medium transition-all',
              value === option
                ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VariantPlayground() {
  const [variant, setVariant] = useState<Variant>('filled');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('primary');
  const [rounded, setRounded] = useState<Rounded>('md');
  const [shadow, setShadow] = useState<Shadow>('none');

  const buttonClass = cn(
    'px-6 py-3 font-semibold transition-all',
    variantStyles[variant][colorScheme],
    roundedStyles[rounded],
    shadowStyles[shadow]
  );

  const codeSnippet = `<Button
  variant="${variant}"
  colorScheme="${colorScheme}"
  rounded="${rounded}"
  shadow="${shadow}"
/>`;

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.01] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <MotionSection>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Controls */}
            <div className="space-y-8">
              <div className="space-y-4">
                <MotionItem>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Design Faster with{' '}
                    <GradientText>Built-in Variants</GradientText>
                  </h2>
                </MotionItem>
                <MotionItem>
                  <p className="text-lg text-gray-400">
                    Mix and match props to create any style.
                    Type-safe, consistent, zero CSS.
                  </p>
                </MotionItem>
              </div>

              <MotionItem>
                <div className="space-y-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <OptionGroup
                    label="variant"
                    options={VARIANTS}
                    value={variant}
                    onChange={(v) => setVariant(v as Variant)}
                  />
                  <OptionGroup
                    label="colorScheme"
                    options={COLOR_SCHEMES}
                    value={colorScheme}
                    onChange={(v) => setColorScheme(v as ColorScheme)}
                  />
                  <OptionGroup
                    label="rounded"
                    options={ROUNDED}
                    value={rounded}
                    onChange={(v) => setRounded(v as Rounded)}
                  />
                  <OptionGroup
                    label="shadow"
                    options={SHADOWS}
                    value={shadow}
                    onChange={(v) => setShadow(v as Shadow)}
                  />
                </div>
              </MotionItem>

              {/* Code Preview */}
              <MotionItem>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
                  <div className="border-b border-white/5 px-4 py-2">
                    <span className="text-xs text-gray-500">Preview Code</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm">
                    <code className="text-gray-300">{codeSnippet}</code>
                  </pre>
                </div>
              </MotionItem>
            </div>

            {/* Right: Preview */}
            <MotionItem variant="slideRight">
              <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
                <div className="text-center">
                  <div className="mb-6 text-xs uppercase tracking-wider text-gray-500">
                    Live Preview
                  </div>
                  <button type="button" className={buttonClass}>
                    Button
                  </button>
                </div>
              </div>
            </MotionItem>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
