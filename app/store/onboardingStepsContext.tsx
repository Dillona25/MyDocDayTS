// Onboarding steps context that manages our onboarding state
// Todo: Replace mock user with actual user data when API is connected

"use client";

interface onboardingType {
  step: number;
  completedSteps: number[];
  isComplete: boolean;
  prevStep: () => void;
  completeCurrentStep: () => void;
}

import { mockUser } from "../lib/mockUser";

import { createContext, ReactNode, useContext, useState } from "react";

const OnboardingContext = createContext<onboardingType | null>(null);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  // An array of each step route that we can recognize with the pathname
  const stepRoutes = [
    "/onboarding",
    "/onboarding/providers",
    "/onboarding/appointments",
  ];

  const [step, setStep] = useState<number>(mockUser.onboarding.currentStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    mockUser.onboarding.completedSteps,
  );
  const [isComplete, setIsComplete] = useState<boolean>(
    mockUser.onboarding.isComplete,
  );

  const prevStep = () => {
    // Math max here does not let us go below 1 since we do not have a step 0..
    setStep((step) => Math.max(1, step - 1));
  };

  const completeCurrentStep = () => {
    setCompletedSteps((completedSteps) => {
      if (completedSteps.includes(step)) {
        return completedSteps;
      }

      return [...completedSteps, step];
    });

    // If its step equals the last step, mark onboarding as complete and stop the function here with return.
    if (step === stepRoutes.length) {
      setIsComplete(true);
      return;
    }

    setStep((step) => Math.min(stepRoutes.length, step + 1));
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        completedSteps,
        isComplete,
        prevStep,
        completeCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding(): onboardingType {
  const context = useContext(OnboardingContext);

  if (context === null) {
    throw new Error("useOnboarding must be used inside an OnboardingProvider");
  }

  return context;
}
