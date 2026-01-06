'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GradientText } from './shared/GradientText';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';

function playgroundBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PLAYGROUND_BASE_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:8081'
      : 'https://playground.fleet-ui.dev')
  );
}

const components = [
  {
    id: 'otp-input',
    slug: 'otp-input',
    label: 'OTP Input',
  },
  {
    id: 'modal',
    slug: 'modal',
    label: 'Modal',
  },
  {
    id: 'tab-bar',
    slug: 'tab-bar',
    label: 'Tab Bar',
  },
  {
    id: 'swiper',
    slug: 'swiper',
    label: 'Swiper',
  },
  {
    id: 'checkbox-card',
    slug: 'checkbox-card',
    label: 'Checkbox Card',
  },
];

export function LiveDemoShowcase() {
  const [activeTab, setActiveTab] = useState(components[0].id);
  const [reloadNonce, setReloadNonce] = useState(0);
  const activeComponent = components.find((c) => c.id === activeTab) || components[0];

  const iframeSrc = useMemo(() => {
    const base = playgroundBaseUrl();
    const url = new URL(`${base}/components/${activeComponent.slug}`);
    url.searchParams.set('embed', '1');
    url.searchParams.set('r', String(reloadNonce));
    return url.toString();
  }, [activeComponent.slug, reloadNonce]);

  return (
    <section className="relative overflow-hidden bg-muted/10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <GradientText>Mobile First Designed</GradientText> Components
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Fleet UI is a mobile first designed component library. Also support Variants, Type-Safe, and Accessibilities.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: Interactive Phone Frame with Real Playground */}
          <div className="flex flex-col items-center gap-6 order-2 lg:order-1">
            {/* Phone Controls */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setReloadNonce((n) => n + 1)}
                className="h-8 gap-1.5 border-border/60 bg-background/60 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                <RotateCcw size={14} />
                Reload
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-border/60 bg-background/60 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                <Link href={iframeSrc} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} />
                  Open
                </Link>
              </Button>
            </div>

            {/* Phone Mockup */}
            <div className="relative mx-auto rounded-[2.5rem] border-14 border-border bg-card w-[340px] h-[680px] shadow-2xl sm:w-[380px] sm:h-[740px]">
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 h-[18px] w-[100px] -translate-x-1/2 rounded-b-[1rem] bg-card" />
              {/* Left Buttons */}
              <div className="absolute -start-[17px] top-[72px] h-[10px] w-[3px] rounded-s-lg bg-card" />
              <div className="absolute -start-[17px] top-[100px] h-[20px] w-[3px] rounded-s-lg bg-card" />
              <div className="absolute -start-[17px] top-[130px] h-[20px] w-[3px] rounded-s-lg bg-card" />
              {/* Right Button */}
              <div className="absolute -end-[17px] top-[85px] h-[30px] w-[3px] rounded-e-lg bg-card" />
              {/* Screen */}
              <div className="h-full w-full overflow-hidden rounded-[1.6rem] bg-background">
                <iframe
                  title={`demo-${activeComponent.slug}`}
                  src={iframeSrc}
                  className="h-full w-full bg-background"
                />
              </div>
            </div>
          </div>

          {/* Right: Controls & Navigation - Center Aligned */}
          <div className="flex flex-col justify-center space-y-10 order-1 lg:order-2">
            
            {/* Component Switcher */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-foreground">Interactive Demo</h3>
                <p className="mt-2 text-muted-foreground">Select a component to see it in action.</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setActiveTab(comp.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all shadow-sm',
                      activeTab === comp.id
                        ? 'border-sky-500 bg-sky-500/10 text-sky-400 ring-2 ring-sky-500/20 shadow-md transform scale-105'
                        : 'border-border/60 bg-card hover:bg-muted/60 hover:text-foreground hover:border-border hover:shadow-md',
                    )}
                  >
                    {comp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center lg:text-left pt-4">
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <Link href="/docs/components">
                  View All Components
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}
