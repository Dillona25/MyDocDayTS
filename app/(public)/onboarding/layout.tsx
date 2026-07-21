"use client";

import type { ReactNode } from "react";
import { OnboardingProgress } from "@/app/components/onboarding/onboarding-progress";
import { OnboardingProvider } from "@/app/store/onboardingStepsContext";
import "@/app/styles/onboardingProgress.css";

export default function PublicOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProvider
      initialOnboarding={{
        currentStep: 1,
        completedSteps: [],
        isComplete: false,
      }}
    >
      <main>
        <OnboardingProgress />
        {children}
      </main>
    </OnboardingProvider>
  );
}
