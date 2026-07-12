"use client";

import { Button } from "@/app/components/common/button";
import { useOnboardingNavigation } from "@/app/hooks/useOnboardingNavigation";

export default function AppointmentsOnboardingPage() {
  const { handleNextStep, handlePreviousStep } = useOnboardingNavigation();
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Button
            varient="secondary"
            buttonText="Previous Step"
            onClick={() => handlePreviousStep("/onboarding/doctors")}
          />
          <Button
            varient="primary"
            buttonText="Next Step"
            // This will eventually need to verify completeness with API and navigate to dashboard
            onClick={() => handleNextStep("/")}
          />
        </div>
      </div>
    </div>
  );
}
