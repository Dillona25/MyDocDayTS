import { SignInFormType } from "@/app/types/form-types";
import { AppError } from "@/backend/errors/app-error";

// Let errors bubble up so the sign-in component can decide how to display them.
export async function signInUser(formData: SignInFormType) {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(
      data.message ?? "Unable to sign in.",
      response.status,
      data.code,
      data.field,
    );
  }

  return data;
}
