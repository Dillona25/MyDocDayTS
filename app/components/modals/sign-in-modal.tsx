"use client";

import { useModal } from "@/app/store/modalContext";
import { Input } from "../forms/input";
import { Button } from "../common/button";
import { useState } from "react";
import { SignInFormType } from "@/app/types/form-types";
import { signInUser } from "@/app/api/auth/sign-in/request";
import { useRouter } from "next/navigation";

type OnboardingStepRoutes = Record<number, string>;

export const SignInModal = () => {
  const router = useRouter();
  const { isSignInModalOpen, closeSignInModal } = useModal();
  const [formData, setFormData] = useState<SignInFormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInFormType, string>>
  >({});
  const [formError, setFormError] = useState("");
  const onboardingStepRoutes: OnboardingStepRoutes = {
    1: "/onboarding",
    2: "/onboarding/providers",
    3: "/onboarding/appointments",
  };

  if (!isSignInModalOpen) {
    return null;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError("");

    try {
      const data = await signInUser(formData);
      const user = data.user;

      if (user.onboarding.isComplete) {
        router.push("/dashboard");
      } else {
        router.push(onboardingStepRoutes[user.onboarding.currentStep]);
      }

      closeSignInModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
      role="presentation"
      onMouseDown={closeSignInModal}
    >
      <section
        aria-modal="true"
        aria-labelledby="sign-in-modal-title"
        className="w-lg rounded-xl bg-white p-6 shadow-[0_24px_70px_rgb(15_23_42/28%)]"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-3xl font-semibold text-primary"
              id="sign-in-modal-title"
            >
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm leading-6 text-body">
              Fill out the form below to sign back into your MyDocDay account.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close sign in modal"
            className="grid size-9 shrink-0 place-items-center rounded-md text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            onClick={closeSignInModal}
          >
            &times;
          </button>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-12">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(event) => {
                    const email = event.target.value;

                    setFormData((current) => ({
                      ...current,
                      email,
                    }));
                  }}
                  required={true}
                  LabelText="Email"
                />
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.email ?? ""}
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <Input
                  value={formData.password}
                  onChange={(event) => {
                    const password = event.target.value;

                    setFormData((current) => ({
                      ...current,
                      password,
                    }));
                  }}
                  required={true}
                  type="password"
                  LabelText="Password"
                />
                <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                  {errors.password ?? ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 flex justify-end">
                <Button buttonText="Sign in" varient="primary" type="submit" />
              </div>
            </div>
          </form>
          <span className="text-xs text-center text-body">
            Or{" "}
            <a className="underline" href="/onboarding/">
              Create Account
            </a>
          </span>
        </div>
      </section>
    </div>
  );
};
