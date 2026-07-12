"use client";

import { Button } from "../components/common/button";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";

export default function SignupOnboardingPage() {
  const { handleNextStep } = useOnboardingNavigation();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Button
            varient="primary"
            buttonText="Next Step"
            onClick={() => handleNextStep("/onboarding/doctors")}
          />
        </div>
      </div>
    </div>
  );
}
