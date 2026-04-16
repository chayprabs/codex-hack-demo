# RL-TRUST-004 Replay

1. Open `/integrations` and point out the webhook lane cards.
2. Call `GET /api/webhooks/provider`.
3. POST the documented fixture payload with the required demo headers.
4. Open the disabled unsafe webhook snippet and the patch diff.

Regression check:

- The live route rejects non-fixture traffic.
- Accepted payloads remain side-effect free and deterministic.
