// Onboarding steps context that manages our onboarding state
// Tracks current step, previous step, next step, total steps

"use client";

interface onboardingType {
  step: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (newStep: number) => void;
}

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const OnboardingContext = createContext<onboardingType | null>(null);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // An array of each step route that we can recognize with the pathname
  const stepRoutes = [
    "/onboarding",
    "/onboarding/doctors",
    "/onboarding/appointments",
  ];

  const [step, setStep] = useState<number>(1);
  const totalSteps = stepRoutes.length;
  const pathname = usePathname();

  // Setting our step, this runs each time the pathname changes
  useEffect(() => {
    const index = stepRoutes.indexOf(pathname);
    if (index !== -1) setStep(index + 1);
  }, [pathname]);

  console.log(step);

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      router.push(stepRoutes[newStep - 1]);
    }
  };

  // Next Step
  const nextStep = () => {
    goToStep(step + 1);
  };

  // Prev Step
  const prevStep = () => {
    goToStep(step - 1);
  };

  return (
    <OnboardingContext.Provider
      value={{ step, totalSteps, nextStep, prevStep, goToStep }}
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
