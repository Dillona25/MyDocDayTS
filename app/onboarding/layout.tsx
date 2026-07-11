"use client";
import type { ReactNode } from "react";
import { OnboardingProvider } from "../store/onboardingStepsContext";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      {/* Shared onboarding UI, such as progress, can go above children. */}
      <OnboardingProvider>{children}</OnboardingProvider>
    </main>
  );
}
