# Auth Or Authz Weakness

Finding ID: `TL-DEMO-002`

Scenario:

- A legacy admin override path is represented in a disabled snippet.
- The live application uses fake persona switching only and does not implement real authorization.
- The seeded finding helps demonstrate policy reasoning without a deployable bypass.

Reviewer cues:

- Contrast the disabled legacy snippet with `app/api/session/route.ts`.
- Emphasize that the sign-in page never mints tokens or server sessions.

Safe-by-design notes:

- The bypass logic is non-executable.
- The demo app has no privileged data plane to expose.
