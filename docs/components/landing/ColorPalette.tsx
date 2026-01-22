'use client';

import { useState } from 'react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';
import { cn } from '@/lib/utils';

// 11-step color scales from raw/colors.ts
const COLOR_SCALES = {
  primary: {
    label: 'Primary',
    light: ['#f0ffff', '#dbffff', '#77fbff', '#00e7ff', '#00c5ff', '#0098ff', '#0069bb', '#004679', '#002f4e', '#002236', '#001e2e'],
  },
  success: {
    label: 'Success',
    light: ['#e4fff2', '#e1ffef', '#bcffda', '#00ffaa', '#00fe88', '#00e36b', '#009748', '#00602f', '#003c1e', '#002814', '#012111'],
  },
  warning: {
    label: 'Warning',
    light: ['#ffffda', '#fffcd7', '#fff2a8', '#ffde00', '#ffc500', '#eda900', '#9d7100', '#644800', '#3e2e00', '#291f00', '#221a00'],
  },
  error: {
    label: 'Error',
    light: ['#fff1f1', '#ffe7e7', '#ffbcc1', '#ff9ca3', '#ff8087', '#d25a64', '#9d2b3a', '#6d0017', '#460001', '#280000', '#0f0000'],
  },
  info: {
    label: 'Info',
    light: ['#fbfbff', '#f8f8ff', '#edeaff', '#dac9ff', '#c6aaff', '#ad8bff', '#735ee1', '#493d8e', '#2d2758', '#1e1a3a', '#191630'],
  },
  neutral: {
    label: 'Neutral',
    light: ['#ffffff', '#f5f5f5', '#e6e6e6', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
  },
};

type ColorKey = keyof typeof COLOR_SCALES;

export function ColorPalette() {
  const [hoveredColor, setHoveredColor] = useState<{ color: string; step: number } | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <MotionSection className="space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl space-y-4">
            <MotionItem>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Crafted <GradientText>Color System</GradientText>
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="text-lg text-muted-foreground">
                11-step scales for every intent. Light and dark themes out of the box.
              </p>
            </MotionItem>
          </div>

          {/* Color Grid */}
          <MotionItem>
            <div className="space-y-3 overflow-hidden rounded-2xl  border-foreground/10 bg-muted-foreground/[0.02] p-4 backdrop-blur-sm sm:p-6">
              {/* Header row */}
              <div className="mb-4 flex items-center gap-2">
                <div className="w-20 shrink-0" />
                <div className="flex flex-1 justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((step) => (
                    <span key={step} className="w-full text-center">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color rows */}
              {(Object.keys(COLOR_SCALES) as ColorKey[]).map((colorKey) => {
                const scale = COLOR_SCALES[colorKey];
                return (
                  <div key={colorKey} className="flex items-center gap-2">
                    <div className="w-20 shrink-0 text-xs font-medium text-gray-400 sm:text-sm">
                      {scale.label}
                    </div>
                    <div className="flex flex-1 gap-0.5 sm:gap-1">
                      {scale.light.map((color, index) => (
                        <button
                          key={`${colorKey}-${index}`}
                          type="button"
                          className={cn(
                            'relative aspect-square flex-1 rounded-sm transition-all sm:rounded-md',
                            'hover:scale-110 hover:z-10 hover:shadow-lg',
                            'focus:outline-none focus:ring-2 focus:ring-white/50'
                          )}
                          style={{ backgroundColor: color }}
                          onMouseEnter={() => setHoveredColor({ color, step: index + 1 })}
                          onMouseLeave={() => setHoveredColor(null)}
                          title={`${scale.label} ${index + 1}: ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Tooltip */}
              {hoveredColor && (
                <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className="h-8 w-8 rounded-lg shadow-lg"
                    style={{ backgroundColor: hoveredColor.color }}
                  />
                  <div className="text-sm">
                    <span className="text-gray-400">Step {hoveredColor.step}: </span>
                    <span className="font-mono text-foreground">{hoveredColor.color}</span>
                  </div>
                </div>
              )}
            </div>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
