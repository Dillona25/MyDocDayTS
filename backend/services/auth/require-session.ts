import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/backend/lib/db";
import { SESSION_COOKIE_NAME } from "./session-cookie";

type RequiredSession = {
  userId: number;
};

type SessionUserRow = {
  user_id: number;
};

export async function requireSession(): Promise<RequiredSession> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    redirect("/");
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
    redirect("/");
  }

  return {
    userId: session.user_id,
  };
}
