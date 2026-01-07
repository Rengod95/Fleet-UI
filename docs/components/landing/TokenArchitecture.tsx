'use client';

import { useState } from 'react';
import { GradientText } from './shared/GradientText';
import { CodeBlock } from './shared/CodeBlock';
import { cn } from '@/lib/utils';
import { Palette, Layers, Zap, ArrowUp } from 'lucide-react';

const RAW_COLORS_CODE = `
// Primary (Accent) - Light Scale
const primaryLightScale: ColorScale = {
	'1': '#f0ffff',
	'2': '#dbffff',
	'3': '#77fbff',
	'4': '#00e7ff',
	'5': '#00c5ff',
	'6': '#0098ff',
	'7': '#0069bb',
	'8': '#004679',
	'9': '#002f4e',
	'10': '#002236',
	'11': '#001e2e',
};

export const rawColors = {
	neutral: {
		light: neutralLightScale,
		dark: neutralDarkScale,
	},
	primary: {
		light: primaryLightScale,
		dark: primaryDarkScale,
	},
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
} as const;`;

const PRIMITIVE_TOKENS_CODE = `import { rawColors } from '../raw/colors';

export const primitiveColors = {
	neutral: rawColors.neutral,
	primary: rawColors.primary,
	warning: rawColors.warning,
	success: rawColors.success,
	info: rawColors.info,
	error: rawColors.error,
	white: rawColors.white,
	black: rawColors.black,
	transparent: rawColors.transparent,
} as const;

export type PrimitiveColors = typeof primitiveColors;`;

const SEMANTIC_TOKENS_CODE = `import { primitiveColors } from '../primitive/colors';

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
		neutral: buildBasePalette(primitiveColors.neutral.light),
		primary: buildColorPalette(primitiveColors.primary.light),
		warning: buildColorPalette(primitiveColors.warning.light),
		// ...
	},
	dark: {
		primary: buildColorPalette(primitiveColors.primary.dark),
		warning: buildColorPalette(primitiveColors.warning.dark),
		// ...
	},
} as const;`;

const LAYERS = [
  {
    id: 0,
    title: 'Raw Value Layer',
    subtitle: 'Base HSL Scales',
    icon: Palette,
    description: 'Simple Values, No Logic or Principles Involved',
    code: RAW_COLORS_CODE,
    fileName: 'packages/core/src/tokens/raw/colors.ts',
  },
  {
    id: 1,
    title: 'Primitive Layer',
    subtitle: 'Design Atoms',
    icon: Layers,
    description: 'Principles Involved simple values',
    code: PRIMITIVE_TOKENS_CODE,
    fileName: 'packages/core/src/tokens/primitive/colors.ts',
  },
  {
    id: 2,
    title: 'Semantic Layer',
    subtitle: 'Theme Logic',
    icon: Zap,
    description: 'Include purposes and context tokens',
    code: SEMANTIC_TOKENS_CODE,
    fileName: 'packages/core/src/tokens/semantic/colors.ts',
  },
];

export function TokenArchitecture() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your Own Token <GradientText>Architecture</GradientText>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            A three-tier token system designed for scalability.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: Interactive Diagram */}
          {/* Left: Interactive Diagram */}
          <div className="relative space-y-0">
              {[...LAYERS].reverse().map((layer, index) => {
                const isActive = activeLayer === layer.id;
                const Icon = layer.icon;
                const isLast = index === LAYERS.length - 1;

                return (
                  <div key={layer.id} className="relative pl-24 pb-16 last:pb-0">
                    {/* Vertical Connecting Line */}
                    {!isLast && (
                       <div className="absolute left-[27px] top-[56px] bottom-0 w-0.5 bg-border/50" />
                    )}

                    {/* Timeline Node (Icon) */}
                    <div 
                      className={cn(
                        "absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 z-10",
                        isActive 
                          ? "border-primary bg-background text-primary shadow-[0_0_0_4px_rgba(var(--primary),0.1)] scale-110" 
                          : "border-border bg-muted/30 text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Card Content */}
                    <button
                      onClick={() => setActiveLayer(layer.id)}
                      className={cn(
                        'w-full text-left transition-all duration-300 rounded-xl border px-6 py-4 group relative overflow-hidden',
                        isActive
                          ? 'border-primary/50 bg-card shadow-lg ring-1 ring-primary/20'
                          : 'border-border bg-card/50 hover:bg-card hover:border-primary/30'
                      )}
                    >
                      {/* Active highlight glow */}
                      {isActive && (
                          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                      )}

                      <div className="relative flex items-center justify-between">
                         <div>
                            <span className={cn(
                              "text-xs font-bold uppercase tracking-wider",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                              Layer {3 - index}
                            </span>
                            <h3 className={cn("text-lg font-semibold transition-colors", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                              {layer.title}
                            </h3>
                         </div>
                         {/* Active Arrow Indicator */}
                         <div className={cn(
                            "transition-transform duration-300",
                            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                         )}>
                             <ArrowUp className="h-5 w-5 text-primary rotate-90" />
                         </div>
                      </div>
                      
                      <p className="mt-8 text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        {layer.description}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>

          {/* Right: Code Viewer */}
          <div className="relative flex flex-col">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-mono text-muted-foreground">
                {LAYERS.find(l => l.id === activeLayer)?.fileName}
              </span>
            </div>
            
            <div className="relative overflow-hidden rounded-xl border border-border bg-[#0d1117] shadow-xl">
               <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0d1117] to-transparent z-10 pointer-events-none" />
                <CodeBlock 
                  code={LAYERS.find(l => l.id === activeLayer)?.code || ''} 
                  language="typescript" 
                  className="h-[500px] overflow-y-auto text-sm [&>pre]:!bg-transparent [&>pre]:p-4" 
                />
               <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
