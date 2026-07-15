# Backend Error Architecture

The app uses a small centralized error layer so routes, services, and the
frontend all handle failures consistently.

## Core Files

- `backend/errors/app-error.ts`
  - Defines `AppError`, the error type for failures the app expects and knows
    how to show to users.
- `backend/errors/database-error.ts`
  - Translates raw PostgreSQL errors into `AppError` instances.
  - Example: duplicate user email maps to `EMAIL_ALREADY_EXISTS` with
    `field: "email"`.
- `backend/errors/handle-api-error.ts`
  - The route-level error boundary.
  - Converts known errors into `Response.json(...)`.
  - Logs unexpected errors and returns a generic 500 response.

## Route Pattern

API routes should catch errors once at the route boundary:

```ts
export async function POST(request: Request): Promise<Response> {
  try {
    // Validate request data.
    // Call service function.
    // Return success response.
  } catch (error) {
    return handleApiError(error, "POST /api/example");
  }
}
```

This keeps route handlers consistent without duplicating error response logic in
every endpoint.

## Service Pattern

Service functions should focus on business logic. They do not need to catch raw
database errors just to format API responses.

```ts
const result = await db.query(...);
```

If the database throws a known constraint error, `handleApiError` calls
`mapDatabaseError`, which converts it into an `AppError`.

Business-rule failures can still throw `AppError` directly from the service:

```ts
throw new AppError(
  "Appointment cannot be scheduled in the past.",
  400,
  "APPOINTMENT_IN_PAST",
  "startTime",
);
```

## Frontend Error Shape

The frontend can expect known errors to use this shape:

```ts
{
  message: string;
  code: string;
  field?: string;
}
```

That allows forms to place errors on the correct field:

```ts
if (error instanceof AppError && error.field === "email") {
  setErrors({ email: error.message });
}
```

## When To Add New Errors

Add database constraint errors in `database-error.ts`, especially for reusable
PostgreSQL failures like:

- unique constraint violations
- foreign key violations
- check constraint violations

Throw `AppError` directly from a service when the failure is a business rule,
not a database constraint.

The goal is:

```txt
Database constraint failed -> map in database-error.ts
Business rule failed      -> throw AppError in the service
Unexpected bug            -> log and return generic 500
```
