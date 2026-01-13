'use client';

import { HeroSection } from './HeroSection';
import { ComponentShowcase } from './ComponentShowcase';
import { VariantPlayground } from './VariantPlayground';
import { ColorPalette } from './ColorPalette';
import { FeaturesGrid } from './FeaturesGrid';
import { TokenArchitecture } from './TokenArchitecture';
import { InstallationOptions } from './InstallationOptions';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import { Particles } from './shared/ParticlesBackground';

export function LandingPage() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground selection:bg-sky-500/30">
      {/* Fixed background layer - stays in place during scroll */}
      <Particles className='fixed h-screen' color='#e3ffff'/>
      
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
