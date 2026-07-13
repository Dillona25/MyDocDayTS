import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(72, "Password cannot exceed 72 characters."),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name cannot exceed 100 characters."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name cannot exceed 100 characters."),

  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(100, "City cannot exceed 100 characters."),

  state: z
    .string()
    .trim()
    .min(1, "State is required.")
    .max(100, "State cannot exceed 100 characters."),
});

export type CreateUserSchemaInput = z.infer<typeof createUserSchema>;
