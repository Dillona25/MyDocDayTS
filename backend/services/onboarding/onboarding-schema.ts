import { z } from "zod";

export const updateOnboardingSchema = z.object({
  completedStep: z
    .number()
    .int("Completed step must be a whole number.")
    .min(1, "Completed step must be at least 1."),

  nextStep: z
    .number()
    .int("Next step must be a whole number.")
    .min(1, "Next step must be at least 1."),

  isComplete: z.boolean(),
});

export type UpdateOnboardingSchemaInput = z.infer<
  typeof updateOnboardingSchema
>;
