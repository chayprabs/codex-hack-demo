# RL-TRUST-004 Evidence

Title: Launch relay scenario models missing signature and replay defenses

Observed clue:

```http
POST /api/webhooks/provider
x-demo-source: fixture-runner
x-demo-signature: fixture-safe-demo
```

Why this matters:

- Webhook endpoints are trust boundaries.
- If signature checks, timestamps, or replay windows were skipped in a real system, forged events could be accepted.

Safe note:

The live route only accepts deterministic fixture payloads and never performs external side effects.
