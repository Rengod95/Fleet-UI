'use client';

import { cn } from '@/lib/utils';
import { CodeBlock } from './shared/CodeBlock';
import { GradientText } from './shared/GradientText';
import { Terminal, Package, ArrowRight, Check } from 'lucide-react';

export function InstallationOptions() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black/20 px-6 py-24">
      {/* Background decoration */ }
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Choose Your <GradientText>Installation Track</GradientText>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you want full ownership of the source code or a traditional package dependency.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
           {/* Track A: Local Install */}
           <div className="group relative rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent p-8 transition-all hover:border-blue-500/40">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
              
              <div className="mb-6 flex items-center justify-between">
                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Terminal className="h-6 w-6" />
                 </div>
                 <div className="flex px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-semibold text-blue-300">
                    Recommended for Customization
                 </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Track A: Local Install</h3>
              <p className="text-gray-400 mb-8 min-h-[3rem]">
                 Copy-paste components into your project. You own the code.
              </p>

              <div className="space-y-3 mb-8">
                 <FeatureItem color="blue">Source Ownership</FeatureItem>
                 <FeatureItem color="blue">Zero Abstraction</FeatureItem>
                 <FeatureItem color="blue">Modify Implementation Directly</FeatureItem>
              </div>
              <CodeBlock 
                code="pnpm dlx @fleet-ui/cli init" 
                language="bash" 
              />
           </div>

           {/* Track B: Package Install */}
           <div className="group relative rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/5 to-transparent p-8 transition-all hover:border-purple-500/40">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />
              
              <div className="mb-6 flex items-center justify-between">
                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Package className="h-6 w-6" />
                 </div>
                 <div className="flex px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs font-semibold text-purple-300">
                    Best for Stability
                 </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Track B: Package Install</h3>
              <p className="text-gray-400 mb-8 min-h-[3rem]">
                 Standard npm dependency. Receive updates automatically.
              </p>

              <div className="space-y-3 mb-8">
                 <FeatureItem color="purple">Semantic Versioning</FeatureItem>
                 <FeatureItem color="purple">Automatic Updates</FeatureItem>
                 <FeatureItem color="purple">Standard SDK Pattern</FeatureItem>
              </div>

              <CodeBlock 
                code="pnpm add @fleet-ui/core @fleet-ui/components" 
                language="bash" 
              />
           </div>
        </div>

        <div className="mt-20 text-center">
          <a
            href="/docs/getting-started/install"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95"
          >
            Start Installing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ children, color }: { children: React.ReactNode; color: 'blue' | 'purple' }) {
  const styles = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="flex items-center gap-3">
       <div className={cn("flex items-center justify-center h-5 w-5 rounded-full bg-white/10", styles[color])}>
         <Check className="h-3 w-3" strokeWidth={3} />
       </div>
       <span className="text-gray-300 text-sm">{children}</span>
    </div>
  );
}
