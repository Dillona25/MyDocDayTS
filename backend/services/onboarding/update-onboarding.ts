import { AppError } from "@/backend/errors/app-error";
import { db } from "@/backend/lib/db";
import {
  UpdatedOnboarding,
  UpdatedOnboardingRow,
  UpdateOnboardingInput,
} from "./onboarding-types";

export async function updateOnboarding(
  input: UpdateOnboardingInput,
): Promise<UpdatedOnboarding> {
  const result = await db.query<UpdatedOnboardingRow>(
    `
      UPDATE user_onboarding
      SET
        current_step = $2,
        completed_steps = CASE
          WHEN $3 = ANY(completed_steps) THEN completed_steps
          ELSE array_append(completed_steps, $3)
        END,
        is_complete = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING
        current_step,
        completed_steps,
        is_complete
    `,
    [input.userId, input.nextStep, input.completedStep, input.isComplete],
  );

  const row = result.rows[0];

  if (!row) {
    throw new AppError(
      "Onboarding record was not found for this user.",
      404,
      "ONBOARDING_NOT_FOUND",
    );
  }

  return {
    currentStep: row.current_step,
    completedSteps: row.completed_steps,
    isComplete: row.is_complete,
  };
}
