import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ReconciliationWorkbenchSection } from "@/components/landing/reconciliation-workbench-section";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { ReconciliationGuideSection } from "@/components/landing/reconciliation-guide";
import { ReconciliationWorkflowsSection } from "@/components/landing/reconciliation-workflows";
import { AutomatedEngineSection } from "@/components/landing/automated-engine";
import { FeaturesExplorerSection } from "@/components/landing/features-explorer";
import { HowToUseAndFaqSection } from "@/components/landing/how-to-use-faq";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ReconciliationWorkbenchSection />
        <HowItWorksSection />
        <ReconciliationGuideSection />
        <ReconciliationWorkflowsSection />
        <AutomatedEngineSection />
        <FeaturesExplorerSection />
        <HowToUseAndFaqSection />
      </main>
    </div>
  );
}
