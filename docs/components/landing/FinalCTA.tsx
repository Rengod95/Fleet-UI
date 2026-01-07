'use client';

import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { GradientText } from './shared/GradientText';
import { CodeBlock } from './shared/CodeBlock';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />
       
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
          Ready to Ship <GradientText>Beautiful Apps?</GradientText>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-400 mb-12">
          Start building in minutes. No configuration needed.
        </p>

        <div className="flex flex-col items-center gap-8">
           <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/docs/introduce"
                className="group inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 text-lg font-medium text-white transition-all hover:bg-indigo-500 hover:ring-4 hover:ring-indigo-500/20 shadow-lg shadow-indigo-500/30"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/Rengod95/Fleet-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
           </div>
        </div>
      </div>
    </section>
  );
}
