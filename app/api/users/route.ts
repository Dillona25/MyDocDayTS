import { createUserSchema } from "@/backend/services/users/user-schema";
import { createUser } from "@/backend/services/users/create-user";
export const runtime = "nodejs";

// Send a POST to api/users/ (following the file path, similar to frontend creating pages)
export async function POST(request: Request): Promise<Response> {
  try {
    // Using unkown type because we DO NOT want to trust incoming data
    const body: unknown = await request.json();

    const validationResult = createUserSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid user information.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // create our user. Hash password, insert SQL, return created user
    const user = await createUser(validationResult.data);

    // Returning our JSON response with the user object
    return Response.json(
      {
        message: "User created successfully.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/users failed:", error);

    if (isPostgresUniqueViolation(error)) {
      return Response.json(
        {
          message: "A user with that email already exists.",
        },
        { status: 409 },
      );
    }

    if (error instanceof SyntaxError) {
      return Response.json(
        {
          message: "The request body must contain valid JSON.",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        message: "An unexpected error occurred while creating the user.",
      },
      { status: 500 },
    );
  }
}

function isPostgresUniqueViolation(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
