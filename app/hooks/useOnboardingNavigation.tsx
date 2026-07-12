"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "../store/onboardingStepsContext";

export function useOnboardingNavigation() {
  const { completeCurrentStep, prevStep } = useOnboarding();
  const router = useRouter();

  const handleNextStep = (stepURL: string) => {
    completeCurrentStep();
    router.push(stepURL);
  };

  const handlePreviousStep = (stepURL: string) => {
    prevStep();
    router.push(stepURL);
  };

  return { handleNextStep, handlePreviousStep };
}
