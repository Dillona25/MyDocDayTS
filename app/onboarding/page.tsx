"use client";

import { FormEvent, useState } from "react";
import { Button } from "../components/common/button";
import { Input } from "../components/forms/input";
import { Select } from "../components/forms/select";
import { usStates } from "../data/usStates";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { CreateUserFormType } from "../types/form-types";
import { createUser } from "../api/users/request";

export default function SignupOnboardingPage() {
  const { handleNextStep } = useOnboardingNavigation();
  const [formData, setFormData] = useState<CreateUserFormType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
  });

  async function handleSubmit(event: SubmitEvent) {
    try {
      event.preventDefault();
      const user = await createUser(formData);
      handleNextStep("/onboarding/doctors");
      // Here we can also do whatever else needed
    } catch (error) {
      // Since we let the error bubble up in createUser, now we would catch
      // Display toast or something
    }
  }

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
          <form onSubmit={handleSubmit}>
            <div className="row mb-6 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  required={true}
                  LabelText="Email"
                />
              </div>
              <div className="col-12 md:col-6">
                <Input
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  required={true}
                  type="password"
                  LabelText="Password"
                />
              </div>
            </div>
            <div className="row mb-6 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  value={formData.firstName}
                  onChange={(event) =>
                    setFormData({ ...formData, firstName: event.target.value })
                  }
                  required={true}
                  LabelText="First Name"
                />
              </div>
              <div className="col-12 md:col-6">
                <Input
                  value={formData.lastName}
                  onChange={(event) =>
                    setFormData({ ...formData, lastName: event.target.value })
                  }
                  required={true}
                  LabelText="Last Name"
                />
              </div>
            </div>
            <div className="row mb-8 md:mb-10">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  value={formData.city}
                  onChange={(event) =>
                    setFormData({ ...formData, city: event.target.value })
                  }
                  required={true}
                  LabelText="City"
                />
              </div>
              <div className="col-12 md:col-6">
                <Select
                  value={formData.state}
                  onChange={(event) =>
                    setFormData({ ...formData, state: event.target.value })
                  }
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
                  type="submit"
                  buttonText="Next Step"
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
