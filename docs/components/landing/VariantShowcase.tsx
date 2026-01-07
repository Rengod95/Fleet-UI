'use client';

import { useState } from 'react';
import { GradientText } from './shared/GradientText';
import { CodeBlock } from './shared/CodeBlock';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// Types mimicking the library
type Variant = 'filled' | 'outlined' | 'flat' | 'faded' | 'ghost';
type ColorScheme = 'primary' | 'neutral' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg' | 'xl';

// Configuration Data
const VARIANTS: { id: Variant; label: string }[] = [
  { id: 'filled', label: 'Filled' },
  { id: 'outlined', label: 'Outlined' },
  { id: 'flat', label: 'Flat' },
  { id: 'faded', label: 'Faded' },
  { id: 'ghost', label: 'Ghost' },
];

const COLORS: { id: ColorScheme; label: string; color: string }[] = [
  { id: 'primary', label: 'Primary', color: 'bg-indigo-500' },
  { id: 'neutral', label: 'Neutral', color: 'bg-zinc-500' },
  { id: 'success', label: 'Success', color: 'bg-emerald-500' },
  { id: 'warning', label: 'Warning', color: 'bg-amber-500' },
  { id: 'error', label: 'Error', color: 'bg-red-500' },
];

const SIZES: { id: Size; label: string }[] = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'X-Large' },
];

export function VariantShowcase() {
  const [variant, setVariant] = useState<Variant>('filled');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('primary');
  const [size, setSize] = useState<Size>('xl');

  // Dynamic code snippet
  const codeSnippet = `<Button
  variant="${variant}"
  colorScheme="${colorScheme}"
  size="${size}"
>
  Button
</Button>`;

  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <GradientText>Variants System</GradientText>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            All Components are built with variants system in mind. 
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Interactive Controls & Preview */}
          <div className="space-y-8">
            
            {/* Preview Area */}
            <div className="relative flex h-[300px] items-center justify-center rounded-3xl border border-border/50 bg-muted/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-grid-white/[0.02] rounded-3xl" />
                
                {/* 
                  Simulated Button Component 
                  We use inline styles and tailwind classes to approximate the library's look for the docs 
                */}
                <button
                  type="button"
                  className={cn(
                    'flex items-center justify-center font-semibold transition-all duration-200 active:scale-95',
                    // Size Handling
                    size === 'sm' && 'h-8 px-3 text-xs rounded-md',
                    size === 'md' && 'h-10 px-4 text-sm rounded-md',
                    size === 'lg' && 'h-12 px-6 text-base rounded-lg',
                    size === 'xl' && 'h-14 px-8 text-lg rounded-xl',
                    // Variant & Color Handling - Primary
                    colorScheme === 'primary' && variant === 'filled' && 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-900/20',
                    colorScheme === 'primary' && variant === 'outlined' && 'border-2 border-sky-600 text-sky-400 hover:bg-sky-950/30',
                    colorScheme === 'primary' && variant === 'flat' && 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20',
                    colorScheme === 'primary' && variant === 'faded' && 'bg-sky-500/10 border border-sky-500/20 text-sky-400',
                    colorScheme === 'primary' && variant === 'ghost' && 'text-sky-400 hover:bg-sky-500/10',

                    // Variant & Color Handling - Neutral
                    colorScheme === 'neutral' && variant === 'filled' && 'bg-zinc-100 text-zinc-900 hover:bg-white shadow-lg shadow-white/5',
                    colorScheme === 'neutral' && variant === 'outlined' && 'border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800',
                    colorScheme === 'neutral' && variant === 'flat' && 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
                    colorScheme === 'neutral' && variant === 'faded' && 'bg-zinc-900 border border-zinc-800 text-zinc-400',
                    colorScheme === 'neutral' && variant === 'ghost' && 'text-zinc-400 hover:bg-zinc-800/50',

                    // Variant & Color Handling - Success
                    colorScheme === 'success' && variant === 'filled' && 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20',
                    colorScheme === 'success' && variant === 'outlined' && 'border-2 border-emerald-600 text-emerald-500 hover:bg-emerald-950/30',
                    colorScheme === 'success' && variant === 'flat' && 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
                    colorScheme === 'success' && variant === 'faded' && 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
                    colorScheme === 'success' && variant === 'ghost' && 'text-emerald-400 hover:bg-emerald-500/10',

                    // Variant & Color Handling - Warning
                    colorScheme === 'warning' && variant === 'filled' && 'bg-amber-500 text-white hover:bg-amber-400 shadow-lg shadow-amber-900/20',
                    colorScheme === 'warning' && variant === 'outlined' && 'border-2 border-amber-500 text-amber-500 hover:bg-amber-950/30',
                    colorScheme === 'warning' && variant === 'flat' && 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
                    colorScheme === 'warning' && variant === 'faded' && 'bg-amber-500/10 border border-amber-500/20 text-amber-500',
                    colorScheme === 'warning' && variant === 'ghost' && 'text-amber-500 hover:bg-amber-500/10',

                    // Variant & Color Handling - Error
                    colorScheme === 'error' && variant === 'filled' && 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20',
                    colorScheme === 'error' && variant === 'outlined' && 'border-2 border-red-600 text-red-500 hover:bg-red-950/30',
                    colorScheme === 'error' && variant === 'flat' && 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
                    colorScheme === 'error' && variant === 'faded' && 'bg-red-500/10 border border-red-500/20 text-red-500',
                    colorScheme === 'error' && variant === 'ghost' && 'text-red-500 hover:bg-red-500/10',
                  )}
                >
                  <span>Button</span>
                </button>
            </div>

            {/* Controls */}
            <div className="space-y-6 rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              
              {/* Variant Control */}
              <div>
                 <label className="mb-3 block text-sm font-medium text-muted-foreground">Variant</label>
                 <div className="flex flex-wrap gap-2">
                    {VARIANTS.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVariant(v.id)}
                        className={cn(
                          'rounded-md px-3 py-1.5 text-xs font-medium transition-colors border',
                          variant === v.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted border-transparent text-muted-foreground hover:bg-muted/80'
                        )}
                      >
                        {v.label}
                      </button>
                    ))}
                 </div>
              </div>

               <div className="grid grid-cols-2 gap-8">
                  {/* Color Control */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-muted-foreground">Color Scheme</label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setColorScheme(c.id)}
                            className={cn(
                              'relative h-8 w-8 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center',
                              c.color,
                              colorScheme === c.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'opacity-70 hover:opacity-100'
                            )}
                            title={c.label}
                          >
                             {colorScheme === c.id && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Size Control */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-muted-foreground">Size</label>
                    <div className="flex gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSize(s.id)}
                            className={cn(
                              'h-8 min-w-[32px] rounded-md border text-xs font-medium transition-colors',
                              size === s.id
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                            )}
                          >
                            {s.label.substring(0, 1)}
                          </button>
                        ))}
                    </div>
                  </div>
               </div>
            </div>

          </div>

          {/* Right: Code Display */}
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl opacity-30 -z-10 rounded-[3rem]" />
             
             <div className="rounded-2xl border border-border bg-[#0d1117]/80 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">App.tsx</span>
                </div>
                <div className="p-1">
                   <CodeBlock 
                      code={codeSnippet} 
                      language="tsx" 
                      className="!bg-transparent min-h-[300px] text-base" 
                   />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
