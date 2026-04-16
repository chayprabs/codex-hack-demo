# RL-TRUST-001 Replay

1. Open `.env.example` and the admin utilities panel.
2. Compare the safe placeholder values with `audit-fixtures/evidence/redacted-env-excerpt.json`.
3. Explain that the issue is not a live secret, but a deterministic credential-shaped export clue.

Regression check:

- Confirm the evidence file still contains fake values only.
- Confirm runtime code never imports the snapshot.
