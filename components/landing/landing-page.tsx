"use client";

import { useState } from "react";
import { QUICK_GUIDES } from "@/lib/landing-data";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { OrganizeSpacesSection } from "@/components/landing/organize-spaces";
import { AutomaticRulesSection } from "@/components/landing/automatic-rules";
import { ArchitectureFeaturesSection } from "@/components/landing/architecture-features";
import { PricingSection } from "@/components/landing/pricing-section";
import { GettingStartedAndFaqSection } from "@/components/landing/getting-started-faq";
import { GuideModal, TrialModal } from "@/components/landing/trial-modal";

export function LandingPage() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("trial");
  const [activeGuideId, setActiveGuideId] = useState<"desktop" | "downloads" | null>(
    null
  );

  const handleOpenTrial = (planId = "trial") => {
    setSelectedPlanId(planId);
    setTrialModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenTrial={handleOpenTrial} />

      <main className="flex-1">
        <HeroSection onOpenTrial={handleOpenTrial} />
        <HowItWorksSection />
        <OrganizeSpacesSection onOpenGuide={(id) => setActiveGuideId(id)} />
        <AutomaticRulesSection />
        <ArchitectureFeaturesSection />
        <PricingSection onOpenTrial={handleOpenTrial} />
        <GettingStartedAndFaqSection onOpenTrial={handleOpenTrial} />
      </main>

      <TrialModal
        key={selectedPlanId + String(trialModalOpen)}
        open={trialModalOpen}
        initialPlan={selectedPlanId}
        onClose={() => setTrialModalOpen(false)}
      />

      <GuideModal
        guide={activeGuideId ? QUICK_GUIDES[activeGuideId] : null}
        onClose={() => setActiveGuideId(null)}
      />
    </div>
  );
}

