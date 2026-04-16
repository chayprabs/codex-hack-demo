# TrustLayer Demo Script

## 60-Second Outline

1. Open `/admin` and frame Relaylane as a safe, deterministic audit target.
2. Point at the live audit kickoff panel and explain the seeded flow:
   - `POST /api/demo-audit`
   - `Open the returned open_url`
   - `GET /api/audits/[auditId]`
   - `GET /api/audits/[auditId]/stream`
3. Call out the TrustScore lift, coverage percentage, and safe-to-merge decision.
4. Scroll to specialist agent traces and explain that these are operational summaries, not chain-of-thought.
5. Jump to one dramatic live anchor:
   - `/integrations` for webhook verification risk, or
   - `/projects/meridian-mobile` for access-control / IDOR-style risk.
6. Close on the replay vault and final-report feel: proof, patch summary, verification status, and regression path are already packaged.

## What To Click

- `/admin`
- `open_url` from `POST /api/demo-audit`
- `/integrations`
- `/projects/meridian-mobile`
- `/sign-in`

Optional API proof:

- `POST /api/demo-audit`
- `GET /api/audits/[auditId]`
- `GET /api/audits/[auditId]/stream`

## What TrustLayer Should Narrate

- "This is a safe demo target. Every finding is seeded, deterministic, and non-exploitable."
- "The repo includes a preflight verifier, so the artifact layer is not just presentation copy. It is internally checked."
- "We are not showing raw model reasoning; we are showing specialist operational traces with evidence and verification outcomes."
- "Each finding has proof, a patch summary, replay criteria, and a coverage-aware score impact."
- "The final report experience is already prepared inside the repo."

## Most Dramatic Findings

- `RL-TRUST-004` Webhook verification risk:
  The audience immediately understands the trust boundary, and the fixture-only route makes the safe contrast easy.
- `RL-TRUST-003` Access control / IDOR-style risk:
  Project detail routes feel realistic and high stakes without containing a real exploit.
- `RL-TRUST-002` Service/admin key handling risk:
  Admin utilities make the repo feel operationally real and premium.
- `RL-TRUST-005` Auth/session trust risk:
  Easy bridge from UX to policy and trust-boundary narration.
- `RL-TRUST-007` Config / frontend exposure risk:
  Shows breadth beyond classic backend-only issues.

## Fallback Plan If The Live Stream Is Boring

- Stay on `/admin` and run the entire story from the audit room.
- Open `audit-fixtures/evidence-bundle.md` and `audit-fixtures/safe-to-merge.md`.
- Use `audit-fixtures/replay/TS-DEMO-001.md` as the full backup narrative.
- Mention `npm run verify:demo` as the preflight gate that keeps the artifact layer honest.
- If API calls feel flat, focus on the trace cards, score movement, replay vault, and launch panel instead of trying to force runtime drama.

## Tone Guidance

Use serious, product-grade language:

- precise
- calm
- evidence-led
- safety-conscious
- clear about what is verified versus reviewer-owned
