"use client";

import { updateUserOnboarding } from "@/app/api/onboarding/update/request";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../store/onboardingStepsContext";

export function useOnboardingNavigation() {
  const { completeCurrentStep, prevStep, step } = useOnboarding();
  const router = useRouter();

  const totalSteps = 3;

  const handleNextStep = async (stepURL: string) => {
    const isComplete = step === totalSteps;
    const nextStep = isComplete ? step : Math.min(totalSteps, step + 1);

    // Here we update our user in the DB to the next step
    await updateUserOnboarding({
      completedStep: step,
      nextStep,
      isComplete,
    });

    completeCurrentStep();
    router.push(stepURL);
  };

  const handlePreviousStep = (stepURL: string) => {
    prevStep();
    router.push(stepURL);
  };

  return { handleNextStep, handlePreviousStep };
}
