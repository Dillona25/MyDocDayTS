import { z } from "zod";

const optionalTrimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .transform((value) => (value.length > 0 ? value : undefined))
    .optional();

export const createProviderSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is required.")
    .max(100, "First name cannot exceed 100 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name is required.")
    .max(100, "Last name cannot exceed 100 characters."),

  specialty: z
    .string()
    .trim()
    .min(2, "Specialty is required.")
    .max(150, "Specialty cannot exceed 150 characters."),

  type: z.enum(["provider", "clinic"]).default("provider"),

  phoneNumber: optionalTrimmedString(25),
  imageUrl: z
    .string()
    .trim()
    .transform((value) => (value.length > 0 ? value : undefined))
    .pipe(z.string().url("Enter a valid image URL.").optional())
    .optional(),
  streetAddress: optionalTrimmedString(255),
  city: optionalTrimmedString(100),
  state: optionalTrimmedString(100),
  zipCode: optionalTrimmedString(20),
});

export const deleteProviderSchema = z.object({
  providerId: z.number().int().positive("Provider id is required."),
});

export type CreateProviderSchemaInput = z.infer<typeof createProviderSchema>;
