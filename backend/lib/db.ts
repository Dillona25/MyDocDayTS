import { Pool } from "pg";

const globalForPostgres = globalThis as unknown as {
  dbPool?: Pool;
};

export const db =
  globalForPostgres.dbPool ??
  new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.dbPool = db;
}
