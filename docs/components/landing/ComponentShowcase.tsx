'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionSection, MotionItem } from './shared/MotionWrapper';
import { GradientText } from './shared/GradientText';

const SHOWCASE_ITEMS = [
  {
    id: 'otp-input',
    label: 'OTP Input',
    description: 'Animated number input with auto-focus',
    videoSrc: '/assets/otpinput_sample.mp4',
  },
  {
    id: 'slider',
    label: 'Slider',
    description: 'Slide to select value with fluid motion',
    videoSrc: '/assets/slider_sample.mp4',
  },
  {
    id: 'tab-bar',
    label: 'Tab Bar',
    description: 'tab transitions, smooth scroll.',
    videoSrc: '/assets/tabbar_sample.mp4',
  },
  {
    id: 'swiper',
    label: 'Swiper',
    description: 'Swipe to Action!',
    videoSrc: '/assets/swiper_sample.mp4',
  },
];

export function ComponentShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <MotionSection className="space-y-12">
          {/* Section Header - Left Aligned */}
          <div className="max-w-2xl space-y-4">
            <MotionItem>
              <h2 className="text-3xl font-bold tracking-tight leading-[56px] text-foreground sm:text-4xl md:text-5xl leading-wide">
                Mobile First Design,<br/>
                <GradientText className='mt-2'>Animated by Default</GradientText>
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="text-lg text-gray-400">
                Every component comes with polished micro-interactions.<br/>
                No configuration needed for micro-interactions per component.
              </p>
            </MotionItem>
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 gap-2 sm:columns-2 space-y-2">
            {SHOWCASE_ITEMS.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-2">
                <MotionItem variant="scale">
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20 hover:bg-white/[0.04]">
                    {/* Video Preview */}
                    <div className="relative w-full bg-gradient-to-br from-gray-900 to-gray-950">
                      <video
                        src={item.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-auto w-full"
                      />
                    </div>

                    {/* Label overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-white">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-sky-500/10 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
                  </div>
                </MotionItem>
              </div>
            ))}
          </div>

          {/* CTA */}
          <MotionItem>
            <Link
              href="/en/components"
              className="group inline-flex items-center gap-2 text-lg font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              View All Components
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </MotionItem>
        </MotionSection>
      </div>
    </section>
  );
}
