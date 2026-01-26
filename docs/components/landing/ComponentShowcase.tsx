'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from './shared/GradientText';
import { MotionItem, MotionSection } from './shared/MotionWrapper';

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
	{
		id: 'action-button',
		label: 'Action Button',
		description: 'Action Button component with smooth animations',
		videoSrc: '/assets/action_button_sample.mp4',
	},
	{
		id: 'menu',
		label: 'Menu',
		description: 'Menu component with smooth animations',
		videoSrc: '/assets/menu_sample.mp4',
	},
	{
		id: 'input',
		label: 'Input',
		description: 'Input component with smooth animations',
		videoSrc: '/assets/input_sample.mp4',
	},
	{
		id: 'toast',
		label: 'Toast',
		description: 'Toast component with smooth animations',
		videoSrc: '/assets/toast_sample.mp4',
	},
];

export function ComponentShowcase() {
	return (
		<section className="relative overflow-hidden px-6 py-24 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<MotionSection className="space-y-12">
					{/* Section Header - Left Aligned */}
					<div className="max-w-2xl space-y-4">
						<MotionItem>
							<h2 className="text-3xl font-medium tracking-tight leading-[56px] text-foreground sm:text-4xl md:text-5xl leading-wide w-full">
								<GradientText className="mt-2">
									Mobile First Designed Components
								</GradientText>
							</h2>
						</MotionItem>
						<MotionItem>
							<p className="text-lg text-muted-foreground ml-1">
								Every component comes with polished micro-interactions.
								<br />
								Trendy & Fluid animations are applied to every interactive
								component by default.
							</p>
						</MotionItem>
					</div>

					{/* Masonry Layout */}
					<div className="columns-1 gap-3 space-y-3 sm:columns-2 lg:columns-3">
						{SHOWCASE_ITEMS.map((item) => (
							<div
								key={item.id}
								className="break-inside-avoid mb-3 max-w-sm mx-auto sm:max-w-none"
							>
								<MotionItem variant="scale">
									<div className="group relative overflow-hidden rounded-xl transition-all hover:border-white/20 hover:bg-white/4">
										{/* Video Preview */}
										<div className="relative w-full overflow-hidden rounded-3xl ">
											<video
												src={item.videoSrc}
												autoPlay
												loop
												muted
												playsInline
												preload="metadata"
												className="block h-auto w-full max-h-[420px] object-contain"
											/>
										</div>

										{/* Label overlay */}
										<div className="absolute inset-x-0 bottom-4 left-4 right-4 bg-linear-to-t from-white/15 via-white/10 to-white/0 p-4 backdrop-blur-md sm:p-3 border border-white/10 rounded-2xl">
											<h3 className="text-md font-semibold text-white">
												{item.label}
											</h3>
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
