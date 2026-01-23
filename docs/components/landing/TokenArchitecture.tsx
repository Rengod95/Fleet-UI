'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const RAW_CODE_CONTENT = `
const lightColorScale = {
  '1': '#0098ff',  // ← Just a color value
  ...
  '11': '#0069bb',
};

const darkColorScale = {
  '1': '#0069bb',
  ...
  '11': '#0098ff',
};

export const rawColors = {
  neutral: {
    light: lightColorScale,
    dark: darkColorScale,
  },
  primary: {
    // ...
  },
  // ... other colors
};
`;

const PRIMITIVE_CODE_CONTENT = `
import { rawColors } from './rawColors';

export const primitiveColors = {
  neutral: rawColors.neutral,
  accent: rawColors.accent,
  // ... other colors
};
`;

const SEMANTIC_CODE_CONTENT = `
const buildColorPalette = (scale: ColorScale) => ({
	content_1: scale['1'],
	content_2: scale['2'],
	content_3: scale['3'],
	content_4: scale['4'],
	content_inversed: scale['11'],
	hover: scale['4'],
	pressed: scale['6'],
	border_subtle: scale['5'],
	border_default: scale['6'],
	border_strong: scale['7'],
	text_4: scale['8'],
	text_3: scale['9'],
	text_2: scale['10'],
	text_1: scale['11'],
	text_inversed: scale['1'],
	solid: scale['5'],
});

export const semanticColors = {
  light: {
    neutral: buildColorPalette(rawColors.neutral.light),
    primary: buildColorPalette(rawColors.primary.light),
    // ... other colors
  },
  dark: {
    neutral: buildColorPalette(rawColors.neutral.dark),
    primary: buildColorPalette(rawColors.primary.dark),
    // ... other colors
  },
};
`;

const THEME_CODE_CONTENT = `
import { semanticColors } from './semanticColors';

export const lightTheme: LightTheme = {
	colors: semanticColors.light,
	gradients: semanticGradients,
	typography: semanticTypography,
	text: primitiveTypography,
  // ... other tokens
};

StyleSheet.configure({
	themes, // lightTheme, darkTheme should be passed here
});
`;

export function TokenArchitecture() {
  const STEPS = [
    { key: 'raw', label: 'Raw', desc: 'Source values (HSL scales)', content: RAW_CODE_CONTENT },
    { key: 'primitive', label: 'Primitive', desc: 'Scales & simple mapping', content: PRIMITIVE_CODE_CONTENT },
    { key: 'semantic', label: 'Semantic', desc: 'Meaningful UI tokens', content: SEMANTIC_CODE_CONTENT },
    { key: 'theme', label: 'Theme', desc: 'Runtime theme object', content: THEME_CODE_CONTENT },
  ] as const;

  type StepKey = (typeof STEPS)[number]['key'];
  const [activeKey, setActiveKey] = useState<StepKey>('raw');
  const activeStep = STEPS.find((s) => s.key === activeKey) ?? STEPS[0];

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-linear-to-br from-primary/18 via-primary/10 to-transparent blur-[120px] z-10 overflow-visible" />
        <div className="absolute bottom-[-100px] right-1/3 h-[420px] w-[520px] rounded-full bg-linear-to-tr from-primary/14 via-primary/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <MotionSection className="space-y-12">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <MotionItem>
              <p className="text-xs font-medium tracking-widest text-foreground/50">TOKEN PIPELINE</p>
            </MotionItem>
            <MotionItem>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
                Your design system, <GradientText>not ours</GradientText>
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/60 sm:text-lg">
                A clear pipeline from <span className="text-foreground font-semibold">Raw → Primitive → Semantic → Theme</span>.
                <br />
                Change once, propagate everywhere—with type safety.
              </p>
            </MotionItem>
          </div>

          {/* 2-column: steps + code */}
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Steps */}
            <MotionItem className="lg:col-span-5">
              <div className="space-y-3">
                {STEPS.map((step, index) => {
                  const isActive = step.key === activeKey;
                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => setActiveKey(step.key)}
                      className={cn(
                        'group relative w-full overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-sm transition-all',
                        isActive
                          ? 'border-sky-500 bg-card shadow-lg shadow-sky-500/10'
                          : 'border-none bg-muted-foreground/10 hover:border-foreground/20 hover:bg-muted-foreground/20'
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-linear-to-br from-muted-foreground/6 to-transparent" />
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-xl text-lg font-semibold transition-colors',
                            isActive
                              ? 'bg-sky-500/30 text-sky-600'
                              : 'bg-muted-foreground/20 text-foreground/70 group-hover:bg-muted-foreground/20 group-hover:text-foreground'
                          )}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-lg font-medium text-foreground">{step.label}</div>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/60 sm:text-base">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </MotionItem>

          {/* Code Editor Window */}
            <MotionItem variant="scale" className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                      <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      tokens/{activeStep.key}.ts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-foreground/10 bg-muted-foreground/3 px-2.5 py-1 text-xs text-foreground/60">
                      {activeStep.label}
                    </span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-6 bg-linear-to-b from-[#0d1117] to-transparent" />
                  <pre key={activeStep.key} className="overflow-x-auto p-6 text-sm leading-relaxed">
                    <code className="text-gray-300">{activeStep.content}</code>
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-[#0d1117] to-transparent" />
                </div>
              </div>
            </MotionItem>
          </div>

          {/* CTA */}
          <MotionItem>
            <div className="flex justify-center pt-2">
              <Link
                href="/en/fundamental/token-architecture"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary via-sky-500 to-primary px-8 font-medium text-white transition-all hover:shadow-lg hover:shadow-sky-500/25"
              >
                Read full token architecture
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
