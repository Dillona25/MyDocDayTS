import { AppError } from "@/backend/errors/app-error";
import { db } from "@/backend/lib/db";
import type { DeleteProviderInput } from "../provider-types";

type DeletedProviderRow = {
  id: number;
};

export async function deleteProvider(
  input: DeleteProviderInput,
): Promise<void> {
  const result = await db.query<DeletedProviderRow>(
    `
      DELETE FROM providers
      WHERE id = $1
        AND user_id = $2
      RETURNING id
    `,
    [input.providerId, input.userId],
  );

  const row = result.rows[0];

  if (!row) {
    throw new AppError("Provider not found.", 404, "PROVIDER_NOT_FOUND");
  }
}
