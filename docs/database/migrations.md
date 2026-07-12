# Database Migrations

This folder contains the SQL migrations used to build and evolve the PostgreSQL database.

Each migration represents **one schema change** and should be added in chronological order.

## Naming Convention

```text
001_create_users.sql
002_create_doctors.sql
003_create_appointments.sql
004_add_phone_to_users.sql
```

## Guidelines

- Create a new migration for every schema change.
- Do **not** modify old migrations once they have been applied.
- Keep migrations focused on a single change whenever possible.
- Write migrations in the order they should be executed.

## Current Workflow

For now, migrations are executed manually using TablePlus.

## Purpose

Migrations provide a version history of the database schema, making it easy to:

- Rebuild the database from scratch.
- Track how the schema has changed over time.
- Keep development and production databases consistent.
- Document the structure of the application database.
