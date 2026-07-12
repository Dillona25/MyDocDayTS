"use client";
import type { ReactNode } from "react";
import { OnboardingProvider } from "../store/onboardingStepsContext";
import "../styles/onboardingProgress.css";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // Todo: This UI needs to update CSS dynamically using mockUser data (completed, step, etc.)
    <main>
      {/* Progress Bar TSX */}
      <nav
        className="container py-10 sm:py-14"
        aria-label="Onboarding progress"
      >
        <div className="row">
          <ol
            className="progress-tracker col-12 mx-auto grid grid-cols-3 items-start md:col-8"
            role="list"
          >
            <li
              className="progress-step progress-step--active relative flex min-w-0 flex-col items-center text-center"
              aria-current="step"
            >
              <span className="progress-step__number text-sm font-semibold grid place-items-center position-relative z-1 w-10 h-10">
                1
              </span>
              <span className="hidden sm:block progress-step__label mt-3 text-sm font-medium sm:text-base">
                Create Account
              </span>
            </li>

            <li className="progress-step relative flex min-w-0 flex-col items-center text-center">
              <span className="progress-step__number text-sm font-semibold grid place-items-center position-relative z-1 w-10 h-10">
                2
              </span>
              <span className="hidden sm:block progress-step__label mt-3 text-sm font-medium sm:text-base">
                Add Providers
              </span>
            </li>

            <li className="progress-step relative flex min-w-0 flex-col items-center text-center">
              <span className="progress-step__number text-sm font-semibold grid place-items-center position-relative z-1 w-10 h-10">
                3
              </span>
              <span className="hidden sm:block progress-step__label mt-3 text-sm font-medium sm:text-base">
                Add Appointments
              </span>
            </li>
          </ol>
        </div>
      </nav>
      <OnboardingProvider>{children}</OnboardingProvider>
    </main>
  );
}
