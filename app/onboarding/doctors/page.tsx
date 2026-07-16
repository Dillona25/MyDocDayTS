"use client";

import { Button } from "@/app/components/common/button";
import "../../styles/onboardingProgress.css";
import { useOnboardingNavigation } from "@/app/hooks/useOnboardingNavigation";
import { useModal } from "@/app/store/modalContext";

export default function DoctorsOnboardingPage() {
  const { handleNextStep, handlePreviousStep } = useOnboardingNavigation();
  const { openAddDoctorModal } = useModal();

  return (
    <div className="container">
      <div className="row mt-0 mb-14">
        <div className="col-12 mx-auto md:col-8">
          <h1 className="text-[30px] font-semibold text-primary">
            Add Providers
          </h1>
          <p className="text-sm text-body max-w-md">
            Begin by adding your first few care providers, or you can skip this
            step and do it later within the MyDocDay dashboard.
          </p>
        </div>
      </div>

      <div className="row mb-14">
        <div className="col-12 mx-auto md:col-8">
          <div className="rounded-lg border border-dashed border-primary/25 bg-white px-6 py-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-primary">
              No providers added yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              Add one now and they will appear here!
            </p>
            <div className="mt-6">
              <Button
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-primary hover:underline"
                buttonText="+ Add Provider"
                onClick={openAddDoctorModal}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-12 mx-auto flex justify-between md:col-8">
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
