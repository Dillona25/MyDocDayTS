"use client";

import { Button } from "@/app/components/common/button";
import { ProviderWidget } from "@/app/components/providers/provider-widget";
import "../../styles/onboardingProgress.css";
import { useOnboardingNavigation } from "@/app/hooks/useOnboardingNavigation";
import { useModal } from "@/app/store/modalContext";

export default function ProvidersOnboardingPage() {
  const { handleNextStep, handlePreviousStep } = useOnboardingNavigation();
  const { openAddProviderModal } = useModal();

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
          <div className="rounded-lg border border-dashed border-primary/25 bg-white px-6 py-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  Your Providers
                </h2>
                <p className="mt-1 max-w-md text-sm text-body">
                  Add the care providers you want available in your dashboard.
                </p>
              </div>
              <Button
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-primary hover:underline"
                buttonText="+ Add Provider"
                onClick={openAddProviderModal}
              />
            </div>

            <div className="row mt-6">
              <div className="col-12 mb-4 md:col-6 md:mb-0">
                <ProviderWidget
                  firstName="Maya"
                  lastName="Patel"
                  specialty="Primary Care"
                  phoneNumber="(512) 555-0187"
                  imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80"
                  city="Austin"
                  state="TX"
                  zipCode="78701"
                />
              </div>
              <div className="col-12 md:col-6">
                <ProviderWidget
                  firstName="Austin"
                  lastName="Family Clinic"
                  specialty="Family Medicine"
                  type="clinic"
                  phoneNumber="(512) 555-0142"
                  city="Austin"
                  state="TX"
                />
              </div>
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
