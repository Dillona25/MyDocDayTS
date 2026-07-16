import { cookies } from "next/headers";
import { AppError } from "@/backend/errors/app-error";
import { handleApiError } from "@/backend/errors/handle-api-error";
import { db } from "@/backend/lib/db";
import { SESSION_COOKIE_NAME } from "@/backend/services/auth/session-cookie";
import { updateOnboardingSchema } from "@/backend/services/onboarding/onboarding-schema";
import { updateOnboarding } from "@/backend/services/onboarding/update-onboarding";

export const runtime = "nodejs";

type SessionUserRow = {
  user_id: number;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body: unknown = await request.json();
    const validationResult = updateOnboardingSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid onboarding information.",
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

    const onboarding = await updateOnboarding({
      userId: session.user_id,
      ...validationResult.data,
    });

    return Response.json(
      {
        message: "Onboarding step updated successfully.",
        onboarding,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error, "POST /api/onboarding/update");
  }
}
