"use client";

import { useState } from "react";
import { Button } from "../components/common/button";
import { Input } from "../components/forms/input";
import { Select } from "../components/forms/select";
import { usStates } from "../data/usStates";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { CreateUserFormType } from "../types/form-types";
import { createUser } from "../api/users/request";
import { AppError } from "@/backend/errors/app-error";

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateUserFormType, string>>
  >({});
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError("");

    try {
      const user = await createUser(formData);
      handleNextStep("/onboarding/doctors");
      // Here we can also do whatever else needed
    } catch (error) {
      // Since we let the error bubble up in createUser, now we would catch
      // Display toast or something
      if (error instanceof AppError && error.field === "email") {
        setErrors((current) => ({
          ...current,
          email: error.message,
        }));

        return;
      }

      setFormError(
        error instanceof Error ? error.message : "Unable to create user.",
      );
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
            <div className="row mb-6 md:mb-4">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required={true}
                  LabelText="Email"
                />
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.email ?? ""}
                </p>
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
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.password ?? ""}
                </p>
              </div>
            </div>
            <div className="row mb-6 md:mb-4">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  value={formData.firstName}
                  onChange={(event) =>
                    setFormData({ ...formData, firstName: event.target.value })
                  }
                  required={true}
                  LabelText="First Name"
                />
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.firstName ?? ""}
                </p>
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
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.lastName ?? ""}
                </p>
              </div>
            </div>
            <div className="row mb-8 md:mb-4">
              <div className="col-12 md:col-6 mb-6 md:mb-0">
                <Input
                  value={formData.city}
                  onChange={(event) =>
                    setFormData({ ...formData, city: event.target.value })
                  }
                  required={true}
                  LabelText="City"
                />
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.city ?? ""}
                </p>
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
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.state ?? ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 flex justify-end">
                <Button
                  varient="primary"
                  type="submit"
                  buttonText="Next Step"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
