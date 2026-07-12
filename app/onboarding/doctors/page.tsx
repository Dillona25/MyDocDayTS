"use client";

import { Button } from "@/app/components/common/button";
import "../../styles/onboardingProgress.css";
import { useOnboardingNavigation } from "@/app/hooks/useOnboardingNavigation";

export default function DoctorsOnboardingPage() {
  const { handleNextStep, handlePreviousStep } = useOnboardingNavigation();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Button
            varient="secondary"
            buttonText="Previous Step"
            onClick={() => handlePreviousStep("/onboarding")}
          />
          <Button
            varient="primary"
            buttonText="Next Step"
            onClick={() => handleNextStep("/onboarding/appointments")}
          />
        </div>
      </div>
    </div>
  );
}
