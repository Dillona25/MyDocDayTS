import { createUserSchema } from "@/backend/services/users/user-schema";
import { createUser } from "@/backend/services/users/create-user";
import { handleApiError } from "@/backend/errors/handle-api-error";
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
    return handleApiError(error, "POST /api/users");
  }
}
