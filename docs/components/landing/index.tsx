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
      {/* Background layer (must be above the parent's background, below content) */}
      <ParticlesBackground className="pointer-events-none absolute inset-0 z-10 opacity-100" />
      {/* Content layer */}
      <div className="relative z-10 h-screen">
        <HeroSection />
        <LiveDemoShowcase />
        <FeaturesGrid />
        <CodeComparison />
        <TokenArchitecture />
        <InstallationOptions />
        <FinalCTA />
        <Footer />
      </div>
        
      
      {/* Footer is typically handled by the global layout, but we can add a simple one here if needed or let the global one take over. 
          The requirement mentions "CTA + Footer", assuming global footer is sufficient or minimal footer here.
          Since this is a page component, we will rely on the global layout's footer if it applies, or we can add a specific landing footer.
          For now, FinalCTA ends the flow nicely.
      */}
    </div>
  );
}
