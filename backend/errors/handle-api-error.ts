// Reusbale logic so we dont repeat ourselves with every route

import { AppError } from "./app-error";

export function handleApiError(error: unknown, context: string): Response {
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
