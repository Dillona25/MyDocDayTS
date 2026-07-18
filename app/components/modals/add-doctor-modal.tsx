"use client";

import { useModal } from "@/app/store/modalContext";
import { Input } from "../forms/input";
import { Select } from "../forms/select";
import { usStates } from "@/app/data/usStates";
import { Button } from "../common/button";
import { providerTypes } from "@/app/data/providerTypes";

export const AddDoctorModal = () => {
  const { isAddDoctorModalOpen, closeAddDoctorModal } = useModal();

  if (!isAddDoctorModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
      role="presentation"
      onMouseDown={closeAddDoctorModal}
    >
      <section
        aria-modal="true"
        aria-labelledby="add-doctor-modal-title"
        className="w-lg rounded-xl bg-white p-6 shadow-[0_24px_70px_rgb(15_23_42/28%)]"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="add-doctor-modal-title"
            className="text-2xl font-semibold text-primary"
          >
            Add Provider
          </h2>
          <button
            type="button"
            aria-label="Close add provider modal"
            className="grid size-9 shrink-0 place-items-center rounded-md text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            onClick={closeAddDoctorModal}
          >
            &times;
          </button>
        </div>
        <form>
          <div className="row mt-6">
            <div className="col-6">
              <Input LabelText="First Name" required />
            </div>
            <div className="col-6">
              <Input LabelText="Last Name" required />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <Input LabelText="Providers's Speacilty" required />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <Input LabelText="Phone Number" required={false} type="tel" />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <Select
                options={providerTypes}
                LabelText="Is this a provider or clinic?"
                placeholder="Select a type"
                required={false}
              />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <Input
                LabelText="Provider Image URL"
                required={false}
                placeholder="Google image link"
              />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12">
              <Input LabelText="Street Address" required={false} />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-6">
              <Input LabelText="City" required={false} />
            </div>
            <div className="col-6">
              <Select options={usStates} LabelText="State" required={false} />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-6">
              <Input LabelText="ZIP Code" required={false} />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-12 flex justify-end">
              <Button varient="primary" buttonText="Add Provider" />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
