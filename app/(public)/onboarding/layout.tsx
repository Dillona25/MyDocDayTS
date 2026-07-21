"use client";

import type { ReactNode } from "react";
import { OnboardingProvider } from "@/app/store/onboardingStepsContext";
import "@/app/styles/onboardingProgress.css";
import { mockUser } from "@/app/lib/mockUser";

export default function PublicOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentStep = mockUser.onboarding.currentStep;
  const completedSteps = mockUser.onboarding.completedSteps;
  const steps = [
    { id: 1, label: "Create Account" },
    { id: 2, label: "Add Providers" },
    { id: 3, label: "Add Appointments" },
  ];

  return (
    <main>
      <nav
        className="container py-10 sm:py-14"
        aria-label="Onboarding progress"
      >
        <div className="row">
          <ol
            className="progress-tracker col-12 mx-auto grid grid-cols-3 items-start md:col-8"
            role="list"
          >
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isComplete = completedSteps.includes(step.id);
              const stepClass = `progress-step relative flex min-w-0 flex-col items-center text-center ${isComplete ? "progress-step--complete" : ""} ${isActive ? "progress-step--active" : ""}`;

              return (
                <li
                  key={step.id}
                  id={`step-${step.id}`}
                  className={stepClass}
                  aria-current="step"
                >
                  <span className="progress-step__number text-sm font-semibold grid place-items-center position-relative z-1 w-10 h-10">
                    {step.id}
                  </span>
                  <span className="hidden sm:block progress-step__label mt-3 text-sm font-medium sm:text-base">
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <OnboardingProvider>{children}</OnboardingProvider>
    </main>
  );
}
