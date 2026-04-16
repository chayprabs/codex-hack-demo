# RL-TRUST-007 Replay

1. Open `/settings`.
2. Walk through the frontend exposure surface cards.
3. Show `.env.example` and `audit-fixtures/evidence/frontend-bundle-snapshot.json`.
4. Use the patch diff to explain how runtime labels and allowlists would be tightened.

Regression check:

- All public runtime values remain synthetic.
- The live app does not enable permissive CORS or expose privileged hosts.
