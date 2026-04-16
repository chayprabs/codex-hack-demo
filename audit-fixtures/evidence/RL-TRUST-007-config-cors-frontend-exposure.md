# RL-TRUST-007 Evidence

Title: Browser-visible runtime labels and permissive preview notes broaden exposure review

Observed clue:

```env
NEXT_PUBLIC_EMBED_PREVIEW_HOST=preview.demo.local
DEMO_ALLOWED_ORIGINS=https://preview.demo.local,https://sandbox.demo.local
```

Why this matters:

- Public runtime values and allowlist hints can reveal more about operational topology than teams expect.
- Config and frontend exposure review often intersect in settings and integrations screens.

Safe note:

The values are synthetic placeholders. No permissive runtime CORS behavior is enabled in the app.
