"use client";

import { useModal } from "@/app/store/modalContext";

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
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-[0_24px_70px_rgb(15_23_42/28%)]"
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
      </section>
    </div>
  );
};
