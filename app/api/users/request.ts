import { CreateUserFormType } from "@/app/types/form-types";

// We wont use a try block here, we will let it bubble up so we can catch at the component level
export async function createUser(formData: CreateUserFormType) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Unable to create user.");
  }

  return data;
}
