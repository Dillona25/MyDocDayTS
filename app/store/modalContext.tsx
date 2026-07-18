"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { ReturnedProvider } from "@/backend/services/providers/provider-types";

type ProviderCreatedHandler = (provider: ReturnedProvider) => void;

interface ModalContextType {
  isSignInModalOpen: boolean;
  isAddProviderModalOpen: boolean;
  onProviderCreated?: ProviderCreatedHandler;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openAddProviderModal: (onProviderCreated?: ProviderCreatedHandler) => void;
  closeAddProviderModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
  const [onProviderCreated, setOnProviderCreated] =
    useState<ProviderCreatedHandler>();

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  const openAddProviderModal = (handler?: ProviderCreatedHandler) => {
    setOnProviderCreated(() => handler);
    setIsAddProviderModalOpen(true);
  };
  const closeAddProviderModal = () => {
    setIsAddProviderModalOpen(false);
    setOnProviderCreated(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isSignInModalOpen,
        isAddProviderModalOpen,
        onProviderCreated,
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
