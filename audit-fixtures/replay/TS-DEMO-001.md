# TS-DEMO-001 Premium Audit-Room Replay

Purpose:

Run one clean, judge-friendly regression sweep that proves the demo package still feels complete after changes.

What to recheck:

- Admin audit room renders traces, evidence, score, and safe-to-merge summaries.
- Evidence bundle and replay index remain internally consistent.
- All seven seeded findings still map to a finding file, evidence note, patch summary, and replay note.

Mapped areas:

- `/admin`
- `audit-fixtures/evidence-bundle.json`
- `audit-fixtures/replay/replay-index.json`
- `audit-fixtures/safe-to-merge.json`

Pass looks like:

- TrustScore, coverage, and verified counts match across score artifacts, evidence bundle, and admin UI.
- Replay entries remain deterministic and descriptive.
- No new live exploit path, real secret, or privileged integration appears.

Verification mode:

Fully verified for the demo target.

Why it matters:

This is the safest fallback replay if a live stream stalls. It gives judges a coherent proof, score, and final-report narrative in under a minute.
