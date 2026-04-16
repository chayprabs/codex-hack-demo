# Replay Ideas

These replay notes are for safe local demos only.

Suggested walkthroughs:

1. Start with `audit-fixtures/demo-report.md` and the admin TrustScore panel.
2. Open one scenario replay note such as `RL-TRUST-004-webhook-verification-risk.md`.
3. Call `GET /api/webhooks/provider` to show that the live route advertises fixture-only requirements.
4. POST a mock payload with `x-demo-source: fixture-runner` and `x-demo-signature: fixture-safe-demo` to demonstrate a deterministic webhook replay.
5. Walk through the matching evidence note and patch diff for the same scenario.

Example safe webhook payload:

```json
{
  "mode": "demo-fixture",
  "event": "launch.audit.fixture.replayed",
  "fixtureId": "TL-DEMO-003"
}
```
