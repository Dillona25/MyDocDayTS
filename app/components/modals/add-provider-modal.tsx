"use client";

import { useModal } from "@/app/store/modalContext";
import { useState } from "react";
import { Input } from "../forms/input";
import { Select } from "../forms/select";
import { usStates } from "@/app/data/usStates";
import { Button } from "../common/button";
import { providerTypes } from "@/app/data/providerTypes";
import { createProvider } from "@/app/api/providers/post/request";
import type { ProviderType } from "@/backend/services/providers/provider-types";

type ProviderFormData = {
  firstName: string;
  lastName: string;
  specialty: string;
  phoneNumber: string;
  type: ProviderType;
  imageUrl: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
};

const initialProviderFormData: ProviderFormData = {
  firstName: "",
  lastName: "",
  specialty: "",
  phoneNumber: "",
  type: "provider",
  imageUrl: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
};

export const AddProviderModal = () => {
  const {
    isAddProviderModalOpen,
    closeAddProviderModal,
    onProviderCreated,
  } = useModal();
  const [formData, setFormData] = useState<ProviderFormData>(
    initialProviderFormData,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProviderFormData, string>>
  >({});
  const [formError, setFormError] = useState("");

  if (!isAddProviderModalOpen) {
    return null;
  }

  function getRequiredFieldError(value: string, fieldName: string) {
    if (value.length === 0) {
      return "";
    }

    if (value.trim().length < 2) {
      return `${fieldName} is required.`;
    }

    return "";
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError("");

    try {
      const data = await createProvider(formData);
      onProviderCreated?.(data.provider);
      setFormData(initialProviderFormData);
      closeAddProviderModal();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to create provider.",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
      role="presentation"
      onMouseDown={closeAddProviderModal}
    >
      <section
        aria-modal="true"
        aria-labelledby="add-provider-modal-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-[0_24px_70px_rgb(15_23_42/28%)]"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="add-provider-modal-title"
            className="text-2xl font-semibold text-primary"
          >
            Add Provider
          </h2>
          <button
            type="button"
            aria-label="Close add provider modal"
            className="grid size-9 shrink-0 place-items-center rounded-md text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            onClick={closeAddProviderModal}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="col-12 md:col-6">
              <Input
                value={formData.firstName}
                onChange={(event) => {
                  const firstName = event.target.value;

                  setFormData((current) => ({
                    ...current,
                    firstName,
                  }));

                  setErrors((current) => ({
                    ...current,
                    firstName: getRequiredFieldError(firstName, "First name"),
                  }));
                }}
                LabelText="First Name"
                required
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.firstName ?? ""}
              </p>
            </div>
            <div className="col-12 md:col-6">
              <Input
                value={formData.lastName}
                onChange={(event) => {
                  const lastName = event.target.value;

                  setFormData((current) => ({
                    ...current,
                    lastName,
                  }));

                  setErrors((current) => ({
                    ...current,
                    lastName: getRequiredFieldError(lastName, "Last name"),
                  }));
                }}
                LabelText="Last Name"
                required
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.lastName ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Input
                value={formData.specialty}
                onChange={(event) => {
                  const specialty = event.target.value;

                  setFormData((current) => ({
                    ...current,
                    specialty,
                  }));

                  setErrors((current) => ({
                    ...current,
                    specialty: getRequiredFieldError(specialty, "Specialty"),
                  }));
                }}
                LabelText="Provider Specialty"
                required
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.specialty ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Input
                value={formData.phoneNumber}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phoneNumber: event.target.value,
                  })
                }
                LabelText="Phone Number"
                required={false}
                type="tel"
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.phoneNumber ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Select
                value={formData.type}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    type: event.target.value as ProviderType,
                  })
                }
                options={providerTypes}
                LabelText="Is this a provider or clinic?"
                placeholder="Select a type"
                required={false}
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.type ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Input
                value={formData.imageUrl}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    imageUrl: event.target.value,
                  })
                }
                LabelText="Provider Image URL"
                required={false}
                placeholder="Google image link"
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.imageUrl ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Input
                value={formData.streetAddress}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    streetAddress: event.target.value,
                  })
                }
                LabelText="Street Address"
                required={false}
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.streetAddress ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 md:col-6">
              <Input
                value={formData.city}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    city: event.target.value,
                  })
                }
                LabelText="City"
                required={false}
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.city ?? ""}
              </p>
            </div>
            <div className="col-12 md:col-6">
              <Select
                value={formData.state}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    state: event.target.value,
                  })
                }
                options={usStates}
                LabelText="State"
                required={false}
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.state ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 md:col-6">
              <Input
                value={formData.zipCode}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    zipCode: event.target.value,
                  })
                }
                LabelText="ZIP Code"
                required={false}
              />
              <p className="mt-2 min-h-5 text-xs font-semibold text-red-400">
                {errors.zipCode ?? ""}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 flex justify-end">
              <Button
                varient="primary"
                type="submit"
                buttonText="Add Provider"
              />
            </div>
          </div>
          {formError && (
            <p className="mt-4 text-sm font-semibold text-red-400">
              {formError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
