## Protected Routes

Protected pages live in `app/(protected)`.

The layout at `app/(protected)/layout.tsx` calls `requireSession()`. That helper:

- reads the `mydocday_session` cookie
- checks the session in the database
- redirects to `/` if the session is missing, invalid, or expired
- allows the page to render when the session is valid
