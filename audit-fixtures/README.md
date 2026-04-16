# Audit Fixtures

This folder is the safe TrustLayer demo layer for `trustlayer-demo-app`.

Principles:

- Every finding is deterministic and listed in `manifest.json`.
- Evidence uses fake or redacted values only.
- Risky examples live in `.disabled` snippets or markdown case files.
- Runtime routes stay safe and local; they do not expose real attack paths.
- `npm run verify:demo` can validate that manifests, traces, scores, replay data, and docs still agree.

Contents:

- `findings/`: one JSON package per seeded scenario.
- `cases/`: legacy narrative notes retained for extra context.
- `snippets/`: non-executable code fragments that represent what a risky implementation might look like.
- `evidence/`: markdown evidence notes and JSON snapshots for audit tooling demos.
- `traces/`: specialist agent operational summaries with safe status transitions.
- `evidence-bundle.json` and `evidence-bundle.md`: exportable bundle artifacts for the live audit room and final report feel.
- `patches/`: illustrative patch summaries in diff form.
- `replay/`: per-scenario safe replay and regression notes.
- `safe-to-merge.json` and `safe-to-merge.md`: judge-friendly merge-readiness summary.
- `coverage.json`: supported, partial, and unsupported area summary.
- `score-coverage.json`: coverage-aware TrustScore artifact.
- `repo-map.json`: likely code anchors for live narration.
- `repo-fingerprint.json`: stack and fixture inventory summary.
- `score-before-after.json`: mock TrustScore movement for presentation.
- `demo-report.md`: concise stage-facing report summary.
