# RL-TRUST-002 Evidence

Title: Admin utilities reference a redacted service alias with broad operational scope

Observed clue:

```ts
{
  alias: "svc_demo_redacted_ops_exporter",
  intendedScope: ["launch-packets:read", "evidence-bundles:write"]
}
```

Why this matters:

- Internal helper utilities often grow into privileged control points.
- Broad operational scope plus human-readable previews is a classic key-handling review smell.

Safe note:

Only a redacted alias is present. No live secret or working credential is stored anywhere in the repo.
