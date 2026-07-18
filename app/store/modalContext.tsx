"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isSignInModalOpen: boolean;
  isAddProviderModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openAddProviderModal: () => void;
  closeAddProviderModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  const openAddProviderModal = () => setIsAddProviderModalOpen(true);
  const closeAddProviderModal = () => setIsAddProviderModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isSignInModalOpen,
        isAddProviderModalOpen,
        openSignInModal,
        closeSignInModal,
        openAddProviderModal,
        closeAddProviderModal,
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
