import type { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      {/* Shared onboarding UI, such as progress, can go above children. */}
      {children}
    </main>
  );
}
