# Webhook Handling Weakness

Finding ID: `TL-DEMO-003`

Scenario:

- The repo includes a disabled webhook example showing what missing verification could look like.
- The live route at `app/api/webhooks/provider/route.ts` rejects all traffic except deterministic fixture replays.

Replay suggestion:

- Use the payload documented in `audit-fixtures/replay/README.md`.
- Point out that the only accepted mode is `demo-fixture`.

Safe-by-design notes:

- No external provider is configured.
- No real side effect occurs even on accepted fixture traffic.
