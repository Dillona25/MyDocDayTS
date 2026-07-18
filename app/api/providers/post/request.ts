import { AppError } from "@/backend/errors/app-error";
import type {
  CreateProviderInput,
  ReturnedProvider,
} from "@/backend/services/providers/provider-types";

type CreateProviderRequest = Omit<CreateProviderInput, "userId">;

type CreateProviderResponse = {
  message: string;
  provider: ReturnedProvider;
};

export async function createProvider(
  providerData: CreateProviderRequest,
): Promise<CreateProviderResponse> {
  const response = await fetch("/api/providers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(providerData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(
      data.message ?? "Unable to create provider.",
      response.status,
      data.code,
      data.field,
    );
  }

  return data;
}
