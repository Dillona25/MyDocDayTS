import { NextResponse } from "next/server";
import { createUserSchema } from "@/backend/services/auth/create-user/create-user-schema";
import { createUser } from "@/backend/services/auth/create-user/create-user";
import { handleApiError } from "@/backend/errors/handle-api-error";
import { SESSION_COOKIE_NAME } from "@/backend/services/auth/session-cookie";
export const runtime = "nodejs";

// Send a POST to api/auth/create-user/ (following the file path, similar to frontend creating pages)
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
    const { user, session } = await createUser(validationResult.data);

    // Returning our JSON response with the user object
    const response = NextResponse.json(
      {
        message: "User created successfully.",
        user,
      },
      { status: 201 },
    );

    // Seeting a session cookie here to essentially sign the user in after they are created
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: session.expiresAt,
    });

    return response;
  } catch (error) {
    return handleApiError(error, "POST /api/auth/create-user");
  }
}
