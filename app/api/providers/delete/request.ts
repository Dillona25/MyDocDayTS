import { AppError } from "@/backend/errors/app-error";
import type { DeleteProviderInput } from "@/backend/services/providers/provider-types";

type DeleteProviderRequest = Omit<DeleteProviderInput, "userId">;

type DeleteProviderResponse = {
  message: string;
};

export async function deleteProvider(
  providerData: DeleteProviderRequest,
): Promise<DeleteProviderResponse> {
  const response = await fetch("/api/providers", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(providerData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(
      data.message ?? "Unable to delete provider.",
      response.status,
      data.code,
      data.field,
    );
  }

  return data;
}
