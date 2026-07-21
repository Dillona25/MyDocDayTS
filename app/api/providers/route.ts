import { cookies } from "next/headers";
import { AppError } from "@/backend/errors/app-error";
import { handleApiError } from "@/backend/errors/handle-api-error";
import { db } from "@/backend/lib/db";
import { SESSION_COOKIE_NAME } from "@/backend/services/auth/session-cookie";
import { deleteProvider } from "@/backend/services/providers/delete/delete-provider";
import { getProviders } from "@/backend/services/providers/get/get-providers";
import { createProvider } from "@/backend/services/providers/post/create-provider";
import {
  createProviderSchema,
  deleteProviderSchema,
} from "@/backend/services/providers/provider-schema";

export const runtime = "nodejs";

type SessionUserRow = {
  user_id: number;
};

export async function GET(): Promise<Response> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      throw new AppError("You must be signed in.", 401, "UNAUTHORIZED");
    }

    const sessionResult = await db.query<SessionUserRow>(
      `
        SELECT user_id
        FROM sessions
        WHERE id = $1
          AND expires_at > CURRENT_TIMESTAMP
        LIMIT 1
      `,
      [sessionId],
    );

    const session = sessionResult.rows[0];

    if (!session) {
      throw new AppError("Your session has expired.", 401, "SESSION_EXPIRED");
    }

    const providers = await getProviders(session.user_id);

    return Response.json(
      {
        message: "Providers fetched successfully.",
        providers,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error, "GET /api/providers");
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: unknown = await request.json();
    const validationResult = createProviderSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid provider information.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      throw new AppError("You must be signed in.", 401, "UNAUTHORIZED");
    }

    const sessionResult = await db.query<SessionUserRow>(
      `
        SELECT user_id
        FROM sessions
        WHERE id = $1
          AND expires_at > CURRENT_TIMESTAMP
        LIMIT 1
      `,
      [sessionId],
    );

    const session = sessionResult.rows[0];

    if (!session) {
      throw new AppError("Your session has expired.", 401, "SESSION_EXPIRED");
    }

    const provider = await createProvider({
      userId: session.user_id,
      ...validationResult.data,
    });

    return Response.json(
      {
        message: "Provider created successfully.",
        provider,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error, "POST /api/providers");
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const body: unknown = await request.json();
    const validationResult = deleteProviderSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid provider information.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      throw new AppError("You must be signed in.", 401, "UNAUTHORIZED");
    }

    const sessionResult = await db.query<SessionUserRow>(
      `
        SELECT user_id
        FROM sessions
        WHERE id = $1
          AND expires_at > CURRENT_TIMESTAMP
        LIMIT 1
      `,
      [sessionId],
    );

    const session = sessionResult.rows[0];

    if (!session) {
      throw new AppError("Your session has expired.", 401, "SESSION_EXPIRED");
    }

    await deleteProvider({
      userId: session.user_id,
      providerId: validationResult.data.providerId,
    });

    return Response.json(
      {
        message: "Provider deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error, "DELETE /api/providers");
  }
}
