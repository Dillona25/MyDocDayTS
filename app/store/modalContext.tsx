"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isSignInModalOpen: boolean;
  isAddDoctorModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openAddDoctorModal: () => void;
  closeAddDoctorModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  const openAddDoctorModal = () => setIsAddDoctorModalOpen(true);
  const closeAddDoctorModal = () => setIsAddDoctorModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isSignInModalOpen,
        isAddDoctorModalOpen,
        openSignInModal,
        closeSignInModal,
        openAddDoctorModal,
        closeAddDoctorModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("useModal must be used inside a ModalProvider");
  }

  return context;
}
