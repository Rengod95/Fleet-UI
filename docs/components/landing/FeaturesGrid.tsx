'use client';

import {
	Boxes,
	Cpu,
	GitBranch,
	SlidersHorizontal,
	Type,
	Zap,
} from 'lucide-react';
import { BentoCard, BentoGrid } from './shared/BentoCard';
import { MotionSection } from './shared/MotionWrapper';

const FEATURES = [
	{
		icon: Zap,
		title: 'Zero runtime overhead',
		description:
			'Theme-driven styles resolve fast without runtime bloat with Unistyles',
		accent: 'primary' as const,
	},
	{
		icon: SlidersHorizontal,
		title: 'Easy to theme',
		description:
			'Layered token architecture and variants system makes it easy to customize theme with consistent design.',
		accent: 'primary' as const,
	},
	{
		icon: Type,
		title: 'Type-safe by default',
		description: 'Strong interfaces keep tokens and components consistent.',
		accent: 'primary' as const,
	},
	{
		icon: Cpu,
		title: 'Native Based Motion',
		description:
			'Built for smooth, consistent animation on the UI thread with Reanimated.',
		accent: 'primary' as const,
	},
	{
		icon: Boxes,
		title: 'Flexible State control',
		description: 'Uncontrolled by default, controlled when you need it.',
		accent: 'primary' as const,
	},
	{
		icon: GitBranch,
		title: 'Composable & Override-friendly',
		description:
			'Composable building blocks that fit your workflow and override-friendly.',
		accent: 'primary' as const,
	},
];

export function FeaturesGrid() {
	return (
		<section className="relative overflow-hidden border-y border-border px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
			{/* Minimal background */}
			<div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

			<div className="mx-auto max-w-5xl">
				<MotionSection className="space-y-10">
					{/* Minimal header (SaaS section vibe) */}
					<div className="mx-auto max-w-2xl text-center">
						<p className="text-xs font-semibold tracking-[0.22em] text-primary/60 uppercase">
							For production teams
						</p>
						<h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
							Ship Faster With Production Quality
						</h2>
						<p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground/70 sm:text-base">
							Minimal runtime, strong types, and consistent motion—out of the
							box.
						</p>
					</div>

					<BentoGrid cols={3} className="gap-4 sm:gap-3 items-center">
						{FEATURES.map((feature) => (
							<BentoCard
								key={feature.title}
								accent={feature.accent}
								animationVariant="fadeUp"
								className="rounded-xl p-5 sm:p-6"
							>
								<div className="flex items-start gap-3">
									<div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary/80">
										<feature.icon className="h-4 w-4" aria-hidden="true" />
									</div>
									<div className="min-w-0">
										<h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-lg">
											{feature.title}
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-muted-foreground/70">
											{feature.description}
										</p>
									</div>
								</div>
							</BentoCard>
						))}
					</BentoGrid>
				</MotionSection>
			</div>
		</section>
	);
}
