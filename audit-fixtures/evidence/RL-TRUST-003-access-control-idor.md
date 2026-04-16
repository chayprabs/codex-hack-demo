# RL-TRUST-003 Evidence

Title: Project detail handles make a tenant-scope review feel necessary

Observed clue:

```text
Route: /projects/[projectId]
Resource handle: proj_demo_meridian_mobile
Client scope: meridian-capital/compliance-review
```

Why this matters:

- Predictable route handles naturally raise the question of whether a real app would scope data per tenant.
- Detail pages and JSON loaders are common places for IDOR-style flaws to appear.

Safe note:

The route only returns local mock project fixtures and does not query a real tenant data store.
