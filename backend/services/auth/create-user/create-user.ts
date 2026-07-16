import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { db } from "@/backend/lib/db";
import { SESSION_DURATION_MS } from "@/backend/services/auth/session-cookie";
import type {
  CreatedSessionRow,
  CreatedUserResult,
  CreateUserInput,
  UserRow,
} from "@/backend/services/auth/create-user/create-user-types";

export async function createUser(
  input: CreateUserInput,
): Promise<CreatedUserResult> {
  const passwordHash = await bcrypt.hash(input.password, 12);

  const result = await db.query<UserRow>(
    `
        INSERT INTO users (
            email,
            password_hash,
            first_name,
            last_name,
            city,
            state
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            email,
            first_name,
            last_name,
            city,
            state,
            is_active,
            created_at,
            updated_at
        `,
    [
      input.email,
      passwordHash,
      input.firstName,
      input.lastName,
      input.city,
      input.state,
    ],
  );

  const row = result.rows[0];

  if (!row) {
    throw new Error("PostgreSQL did not return the created user.");
  }

  const sessionId = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const sessionResult = await db.query<CreatedSessionRow>(
    `
      INSERT INTO sessions (
        id,
        user_id,
        expires_at
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        expires_at
    `,
    [sessionId, row.id, expiresAt],
  );

  const sessionRow = sessionResult.rows[0];

  if (!sessionRow) {
    throw new Error("PostgreSQL did not return the created session.");
  }

  await db.query(
    `
      INSERT INTO user_onboarding (user_id)
      VALUES ($1)
      ON CONFLICT (user_id) DO NOTHING
    `,
    [row.id],
  );

  return {
    user: {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      city: row.city,
      state: row.state,
      isActive: row.is_active,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
    },
    session: {
      id: sessionRow.id,
      expiresAt: sessionRow.expires_at,
    },
  };
}
