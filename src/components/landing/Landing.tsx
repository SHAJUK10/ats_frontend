import { LandingNav } from './LandingNav';
import { Hero } from './Hero';
import { ProductStory } from './ProductStory';
import { HowItWorks } from './HowItWorks';
import { Showcase } from './Showcase';
import { ScoreSection } from './ScoreSection';
import { Features } from './Features';
import { JobMatching } from './JobMatching';
import { AISection } from './AISection';
import { FinalCTA } from './FinalCTA';
import { LandingFooter } from './LandingFooter';

export function Landing() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-960">
      <LandingNav />
      <main>
        <Hero />
        <ProductStory />
        <HowItWorks />
        <Showcase />
        <ScoreSection />
        <Features />
        <JobMatching />
        <AISection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
