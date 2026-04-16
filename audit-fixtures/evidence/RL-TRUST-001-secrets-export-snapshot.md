# RL-TRUST-001 Evidence

Title: Launch export bundle preserves a credential-shaped preview in shared evidence

Observed clue:

```env
NEXT_PUBLIC_SUPPORT_ALIAS=ops-demo@demo.local
DEMO_EXPORT_KEY_REFERENCE=svc_demo_redacted_ops_exporter
SUPPORT_FORWARDING_TOKEN=demo_redacted_token_not_real
```

Why this matters:

- Support exports and environment previews often outlive the engineering context that created them.
- Even fake-looking tokens teach auditors which systems, aliases, and export flows deserve scrutiny.

Safe note:

This snippet is synthetic and non-routable. The app never reads or validates the token-shaped value.
