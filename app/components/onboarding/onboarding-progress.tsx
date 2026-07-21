"use client";

import { useOnboarding } from "@/app/store/onboardingStepsContext";

const steps = [
  { id: 1, label: "Create Account" },
  { id: 2, label: "Add Providers" },
  { id: 3, label: "Add Appointments" },
];

export const OnboardingProgress = () => {
  const { step: currentStep, completedSteps } = useOnboarding();
  const completedCount = completedSteps.length;

  return (
    <nav className="container py-10 sm:py-14" aria-label="Onboarding progress">
      <div className="row">
        <ol
          className="progress-tracker col-12 mx-auto grid grid-cols-3 items-start md:col-8"
          data-progress={completedCount}
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
                aria-current={isActive ? "step" : undefined}
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
  );
};
