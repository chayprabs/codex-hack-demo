# RL-TRUST-002 Replay

1. Open `/admin`.
2. Highlight the redacted service aliases in the admin utilities panel.
3. Open `audit-fixtures/snippets/admin-key-preview.ts.disabled`.
4. Compare with the patch diff that narrows scopes.

Regression check:

- No live service key appears in UI, env files, or runtime code.
- The scenario remains explainable through aliases, not credentials.
