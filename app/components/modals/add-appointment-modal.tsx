"use client";

import { useModal } from "@/app/store/modalContext";

export const AddAppointmentModal = () => {
  const { isAddAppointmentModalOpen, closeAddAppointmentModal } = useModal();

  if (!isAddAppointmentModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
      role="presentation"
      onMouseDown={closeAddAppointmentModal}
    >
      <section
        aria-modal="true"
        aria-labelledby="add-appointment-modal-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-[0_24px_70px_rgb(15_23_42/28%)]"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="add-appointment-modal-title"
              className="text-2xl font-semibold text-primary"
            >
              Add Appointment
            </h2>
            <p className="mt-2 text-sm leading-6 text-body">
              Appointment details will be added here next.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close add appointment modal"
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            onClick={closeAddAppointmentModal}
          >
            &times;
          </button>
        </div>
      </section>
    </div>
  );
};
