'use client';

import { Copy, Github, Move3D, Palette, Wrench } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from './shared/GradientText';
import { MotionItem, MotionSection } from './shared/MotionWrapper';

const _VALUE_BADGES = [
	{
		icon: Move3D,
		label: 'Animation',
		description: 'Built-in motion',
	},
	{
		icon: Wrench,
		label: 'DX',
		description: 'Easy to use',
	},
	{
		icon: Palette,
		label: 'Design System',
		description: 'Design system',
	},
	{
		icon: Copy,
		label: 'Copy & Paste',
		description: 'Swap themes',
	},
];

const _TECH_STACK = ['React Native', 'Unistyles', 'Reanimated'];

const SHOWCASE_URL =
	process.env.NEXT_PUBLIC_SHOWCASE_URL || 'http://localhost:8081/showcases';

export function HeroSection() {
	return (
		<section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pt-20 pb-16 md:pt-32">
			<div className="mx-auto w-full max-w-[1280px]">
				<div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-8">
					{/* Left Content */}
					<MotionSection className="space-y-6 lg:flex-1">
						{/* Main Headline - Left Aligned */}
						<MotionItem>
							<h1 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-5xl">
								<GradientText>
									Make your App Look
									<br />
									Like a Series B<br />
									Company
								</GradientText>
								<br />
							</h1>
						</MotionItem>

						{/* Subheadline */}
						<MotionItem>
							<p className="max-w-2xl text-base text-foreground/80 sm:text-xl font-normal leading-normal">
								Fleet UI is a Production-Ready UI SDK based on minimalism and
								fluid animations.
							</p>
						</MotionItem>

						{/* CTA Buttons */}
						<MotionItem>
							<div className="flex flex-col gap-4 sm:flex-row">
								<Link
									href="/en/getting-started/install"
									className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-sky-500 to-primary px-8 font-bold text-white transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/25"
								>
									Get Started
								</Link>
								<a
									href="https://github.com/Rengod95/Fleet-UI"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-8 font-medium text-foreground backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-foreground/[0.04]"
								>
									<Github className="h-4 w-4" />
									View on GitHub
								</a>
							</div>
						</MotionItem>

						{/* Tech Stack Badges */}
						{/* <MotionItem>
							<div className="flex flex-wrap items-center gap-4 px-2">
								<span className="text-xs uppercase tracking-wider  text-muted-foreground">
									Built with
								</span>
								<div className="flex flex-wrap gap-3">
									{TECH_STACK.map((tech) => (
										<span
											key={tech}
											className="rounded-lg bg-card px-3 py-1.5 text-sm text-muted-foreground"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</MotionItem> */}

						<MotionItem>
							<div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 px-2 mt-8 sm:mt-12 w-full">
								{_VALUE_BADGES.map((badge) => (
									<div
										key={badge.label}
										className="flex flex-col gap-2 shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-lg p-2 sm:p-3 rounded-xl"
									>
										<div className="flex items-center gap-2 justify-center">
											<badge.icon
												className="h-8 w-8 text-foreground"
												strokeWidth={1}
											/>
										</div>
										<span className="text-sm font-medium text-foreground mt-1 text-center">
											{badge.label}
										</span>
									</div>
								))}
							</div>
						</MotionItem>
					</MotionSection>

					{/* Right Panel - Showcase iframe */}
					<MotionItem className="mt-8 sm:mt-12 lg:mt-0 lg:shrink-0 bg-transparent p-2 sm:p-4 overflow-visible w-[740px] h-[740px] display-none md:block">
						<div className="relative mx-auto w-full max-w-full sm:max-w-[740px] md:max-w-[740px] lg:max-w-[740px] bg-transparent">
							<div className="relative overflow-hidden rounded-[48px] bg-transparent">
								{/* Browser-like header */}

								{/* Iframe container */}
								<div className="aspect-square w-[720px] h-[720px] overflow-visible rounded-[48px]">
									<iframe
										src={SHOWCASE_URL}
										title="Fleet UI Showcase"
										className="h-full w-full border-0 overflow-visible"
										loading="eager"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									/>
								</div>
							</div>
							{/* Decorative glow effect */}
							{/* <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-primary/20 via-sky-500/20 to-primary/20 opacity-50 blur-3xl" /> */}
						</div>
					</MotionItem>
				</div>
			</div>
		</section>
	);
}
