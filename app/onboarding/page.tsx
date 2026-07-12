"use client";

import { Button } from "../components/common/button";
import { Input } from "../components/forms/input";
import { Select } from "../components/forms/select";
import { usStates } from "../data/usStates";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";

export default function SignupOnboardingPage() {
  const { handleNextStep } = useOnboardingNavigation();

  return (
    <div className="container">
      <div className="row my-10">
        <div className="col-12 mx-auto md:col-8">
          <h1 className="text-[30px] font-semibold text-primary">
            Create Account
          </h1>
          <p className="text-sm text-body">
            We want to get to know you. Add your account information here. This
            can all be updated later in the settings.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mx-auto md:col-8">
          <form>
            <div className="row mb-6 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input required={true} LabelText="Email" />
              </div>
              <div className="col-12 md:col-6">
                <Input required={true} type="password" LabelText="Password" />
              </div>
            </div>
            <div className="row mb-6 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input required={true} LabelText="First Name" />
              </div>
              <div className="col-12 md:col-6">
                <Input required={true} LabelText="Last Name" />
              </div>
            </div>
            <div className="row mb-8 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input required={true} LabelText="City" />
              </div>
              <div className="col-12 md:col-6">
                <Select
                  required={true}
                  LabelText="Select State"
                  options={usStates}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 flex justify-end">
                <Button
                  varient="primary"
                  buttonText="Next Step"
                  onClick={() => handleNextStep("/onboarding/doctors")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
