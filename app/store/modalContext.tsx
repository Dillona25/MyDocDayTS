"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { ReturnedProvider } from "@/backend/services/providers/provider-types";

type ProviderCreatedHandler = (provider: ReturnedProvider) => void;
type ProviderDeletedHandler = (providerId: number) => void;

interface ModalContextType {
  isSignInModalOpen: boolean;
  isAddProviderModalOpen: boolean;
  isDeleteProviderModalOpen: boolean;
  onProviderCreated?: ProviderCreatedHandler;
  providerToDelete?: ReturnedProvider;
  onProviderDeleted?: ProviderDeletedHandler;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openAddProviderModal: (onProviderCreated?: ProviderCreatedHandler) => void;
  closeAddProviderModal: () => void;
  openDeleteProviderModal: (
    provider: ReturnedProvider,
    onProviderDeleted?: ProviderDeletedHandler,
  ) => void;
  closeDeleteProviderModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
  const [isDeleteProviderModalOpen, setIsDeleteProviderModalOpen] =
    useState(false);
  const [onProviderCreated, setOnProviderCreated] =
    useState<ProviderCreatedHandler>();
  const [providerToDelete, setProviderToDelete] = useState<ReturnedProvider>();
  const [onProviderDeleted, setOnProviderDeleted] =
    useState<ProviderDeletedHandler>();

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
  const openDeleteProviderModal = (
    provider: ReturnedProvider,
    handler?: ProviderDeletedHandler,
  ) => {
    setProviderToDelete(provider);
    setOnProviderDeleted(() => handler);
    setIsDeleteProviderModalOpen(true);
  };
  const closeDeleteProviderModal = () => {
    setIsDeleteProviderModalOpen(false);
    setProviderToDelete(undefined);
    setOnProviderDeleted(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isSignInModalOpen,
        isAddProviderModalOpen,
        isDeleteProviderModalOpen,
        onProviderCreated,
        providerToDelete,
        onProviderDeleted,
        openSignInModal,
        closeSignInModal,
        openAddProviderModal,
        closeAddProviderModal,
        openDeleteProviderModal,
        closeDeleteProviderModal,
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
