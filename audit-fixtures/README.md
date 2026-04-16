# Audit Fixtures

This folder is the safe TrustLayer demo layer for `trustlayer-demo-app`.

Principles:

- Every finding is deterministic and listed in `manifest.json`.
- Evidence uses fake or redacted values only.
- Risky examples live in `.disabled` snippets or markdown case files.
- Runtime routes stay safe and local; they do not expose real attack paths.

Contents:

- `findings/`: one JSON package per seeded scenario.
- `cases/`: legacy narrative notes retained for extra context.
- `snippets/`: non-executable code fragments that represent what a risky implementation might look like.
- `evidence/`: markdown evidence notes and JSON snapshots for audit tooling demos.
- `patches/`: illustrative patch summaries in diff form.
- `replay/`: per-scenario safe replay and regression notes.
- `coverage.json`: supported, partial, and unsupported area summary.
- `repo-map.json`: likely code anchors for live narration.
- `repo-fingerprint.json`: stack and fixture inventory summary.
- `score-before-after.json`: mock TrustScore movement for presentation.
- `demo-report.md`: concise stage-facing report summary.
