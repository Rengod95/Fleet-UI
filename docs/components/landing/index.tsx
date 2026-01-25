'use client';

import { ColorPalette } from './ColorPalette';
import { ComponentShowcase } from './ComponentShowcase';
import { FeaturesGrid } from './FeaturesGrid';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import { HeroSection } from './HeroSection';
import { InstallationOptions } from './InstallationOptions';
import { TokenArchitecture } from './TokenArchitecture';
import { VariantPlayground } from './VariantPlayground';

function HexagonPattern() {
	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<svg
				className="absolute h-full w-full"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<title>Background Pattern</title>
				<defs>
					<pattern
						id="hexagon-pattern"
						width="56"
						height="100"
						patternUnits="userSpaceOnUse"
						patternTransform="scale(2)"
					>
						{/* Hexagon path - pointy top orientation */}
						<path
							d="M28 0 L56 16.67 L56 50 L28 66.67 L0 50 L0 16.67 Z"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.2"
						/>
						{/* Offset hexagon for honeycomb effect */}
						<path
							d="M28 66.67 L56 83.33 L56 116.67 L28 133.33 L0 116.67 L0 83.33 Z"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.2"
						/>
					</pattern>
					{/* Gradient mask: right to left fade (70% right visible, 30% left faded) */}
					<linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="white" stopOpacity="0.15" />
						<stop offset="30%" stopColor="white" stopOpacity="0.1" />
						<stop offset="60%" stopColor="white" stopOpacity="0.07" />
						<stop offset="100%" stopColor="white" stopOpacity="0.03" />
					</linearGradient>
					<mask id="fade-mask">
						<rect width="100%" height="100%" fill="url(#fade-gradient)" />
					</mask>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill="url(#hexagon-pattern)"
					mask="url(#fade-mask)"
				/>
			</svg>
			{/* Subtle vertical gradient overlay for depth */}
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/80" />
		</div>
	);
}

export function LandingPage() {
	return (
		<div className="relative isolate min-h-screen bg-background text-foreground selection:bg-sky-500/30">
			{/* Fixed background layer - stays in place during scroll */}
			<HexagonPattern />

			{/* Content layer - scrolls over the fixed background */}
			<div className="relative z-10">
				<HeroSection />
				<ComponentShowcase />
				<FeaturesGrid />
				<VariantPlayground />
				<InstallationOptions />
				<ColorPalette />
				<TokenArchitecture />
				<FinalCTA />
				<Footer />
			</div>
		</div>
	);
}
