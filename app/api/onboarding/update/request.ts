import { AppError } from "@/backend/errors/app-error";
import type {
  UpdatedOnboarding,
  UpdateOnboardingInput,
} from "@/backend/services/onboarding/onboarding-types";

type UpdateOnboardingRequest = Omit<UpdateOnboardingInput, "userId">;

type UpdateOnboardingResponse = {
  message: string;
  onboarding: UpdatedOnboarding;
};

export async function updateUserOnboarding(
  onboardingData: UpdateOnboardingRequest,
): Promise<UpdateOnboardingResponse> {
  const response = await fetch("/api/onboarding/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(onboardingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(
      data.message ?? "Unable to update onboarding.",
      response.status,
      data.code,
      data.field,
    );
  }

  return data;
}
