import { AppError } from "@/backend/errors/app-error";
import type { ReturnedProvider } from "@/backend/services/providers/provider-types";

type GetProvidersResponse = {
  message: string;
  providers: ReturnedProvider[];
};

export async function getProviders(): Promise<GetProvidersResponse> {
  const response = await fetch("/api/providers", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(
      data.message ?? "Unable to fetch providers.",
      response.status,
      data.code,
      data.field,
    );
  }

  return data;
}
