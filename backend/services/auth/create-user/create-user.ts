import bcrypt from "bcrypt";
import { db } from "@/backend/lib/db";
import type {
  CreateUserInput,
  ReturnedUser,
  UserRow,
} from "@/backend/services/auth/create-user/create-user-types";

export async function createUser(
  input: CreateUserInput,
): Promise<ReturnedUser> {
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

  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    city: row.city,
    state: row.state,
    isActive: row.is_active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}
