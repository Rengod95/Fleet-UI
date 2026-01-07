'use client';

import { HeroSection } from './HeroSection';
import { LiveDemoShowcase } from './LiveDemoShowcase';
import { TokenArchitecture } from './TokenArchitecture';
import { FeaturesGrid } from './FeaturesGrid';
import { InstallationOptions } from './InstallationOptions';
import { CodeComparison } from './CodeComparison';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import { ParticlesBackground } from './shared/ParticlesBackground';

export function LandingPage() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
      {/* Fixed background layer - stays in place during scroll */}
      <ParticlesBackground className="pointer-events-none fixed inset-0 z-0 h-screen opacity-100" />
      
      {/* Content layer - scrolls over the fixed background */}
      <div className="relative z-10">
        <HeroSection />
        <LiveDemoShowcase />
        <FeaturesGrid />
        <CodeComparison />
        <TokenArchitecture />
        <InstallationOptions />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
