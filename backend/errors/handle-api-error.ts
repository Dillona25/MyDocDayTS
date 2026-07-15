// Reusable API error boundary so every route returns the same error shape.
// This is where expected app errors and known lower-level errors become JSON.

import { AppError } from "./app-error";
import { mapDatabaseError } from "./database-error";

export function handleApiError(error: unknown, context: string): Response {
  const databaseError = mapDatabaseError(error);

  if (databaseError) {
    return handleApiError(databaseError, context);
  }

  if (error instanceof AppError) {
    return Response.json(
      {
        message: error.message,
        code: error.code,
        field: error.field,
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof SyntaxError) {
    return Response.json(
      {
        message: "The request body must contain valid JSON.",
        code: "INVALID_JSON",
      },
      { status: 400 },
    );
  }

  console.error(`[${context}]`, error);

  return Response.json(
    {
      message: "An unexpected server error occurred.",
      code: "INTERNAL_SERVER_ERROR",
    },
    { status: 500 },
  );
}
