# RL-TRUST-006 Replay

1. Open `audit-fixtures/snippets/raw-filter-builder.ts.disabled`.
2. Frame it as a generated helper that looked review-ready.
3. Show the patch diff that replaces string interpolation with a typed builder.
4. Point back to `/api/projects` and note that the live app uses static arrays only.

Regression check:

- The risky helper remains disabled.
- No database or string-built query path is introduced into runtime code.
