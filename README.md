# trustlayer-demo-app

`trustlayer-demo-app` is a safe, medium-sized TrustLayer demo repository built around **Relaylane**, a fake launch-operations SaaS for teams shipping client work, partner previews, and release programs under pressure.

The product is intentionally believable enough for a live "paste GitHub URL -> audit starts" moment:

- a marketing page and fake sign-in flow
- a workspace with dashboard, portfolio, war-room threads, timeline, controls, integrations, and audit room
- local API routes that make repo mapping feel substantial
- deterministic seeded findings with proof artifacts, traces, coverage, replay notes, and score movement

Important: this repository is **designed for safe TrustLayer demo audits**.

- It does **not** contain real exploitable vulnerabilities.
- It does **not** contain real secrets.
- It does **not** contain runnable insecure attack paths.
- Seeded findings are represented through fixtures, report artifacts, markdown evidence, redacted placeholders, and `.disabled` snippets.

## Tech Stack

- Next.js 15
- TypeScript
- App Router
- Tailwind CSS
- local mock data only

## App Concept

Relaylane is a fake launch command center for cross-functional startup teams. It models the kind of product that creates strong audit narratives: client portfolios, partner preview lanes, launch threads, integration posture, admin utilities, and review-ready reporting.

Core domain objects include:

- users
- projects
- message threads
- activity events
- integrations
- settings sections
- admin signals
- audit findings

## Product Areas

- `/` marketing landing page
- `/sign-in` fake persona-based sign-in
- `/dashboard` launch command center
- `/projects` portfolio table and launch lanes
- `/projects/[projectId]` detailed client workstream view
- `/messages` war-room threads and exec chatter
- `/activity` operational timeline
- `/settings` controls and exposure posture
- `/integrations` sandbox syncs and webhook posture
- `/admin` audit room with traces, evidence, scoring, merge readiness, and audit kickoff guidance
- `/audit/[id]` live streaming audit room for seeded agent progress and final report state

## API Routes

- `GET /api/session`
- `GET /api/projects`
- `GET /api/projects/[projectId]`
- `GET /api/messages`
- `GET /api/activity`
- `GET /api/integrations`
- `GET /api/admin/overview`
- `POST /api/demo-audit`
- `GET /api/audits/[auditId]`
- `GET /api/audits/[auditId]/stream`
- `GET /api/webhooks/provider`
- `POST /api/webhooks/provider`

The webhook route is safe by design and only accepts deterministic fixture payloads with explicit demo headers.

## TrustLayer Demo Layer

The seeded audit story lives in [`audit-fixtures/`](./audit-fixtures).

Key artifacts:

- `audit-fixtures/manifest.json`
- `audit-fixtures/traces/*.json`
- `audit-fixtures/findings/*.json`
- `audit-fixtures/evidence-bundle.json`
- `audit-fixtures/evidence-bundle.md`
- `audit-fixtures/evidence/*.md`
- `audit-fixtures/evidence/*.json`
- `audit-fixtures/patches/*.diff.txt`
- `audit-fixtures/replay/*.md`
- `audit-fixtures/replay/replay-index.json`
- `audit-fixtures/safe-to-merge.json`
- `audit-fixtures/safe-to-merge.md`
- `audit-fixtures/repo-map.json`
- `audit-fixtures/coverage.json`
- `audit-fixtures/score-coverage.json`
- `audit-fixtures/repo-fingerprint.json`
- `audit-fixtures/score-before-after.json`
- `audit-fixtures/demo-report.md`
- `docs/demo-script.md`
- `docs/demo-highlights.md`
- `scripts/verify-demo.mjs`

## Seeded Finding Categories

- Secrets / credential exposure
- Service/admin key handling risk
- Access control / IDOR-style risk
- Webhook verification risk
- Auth/session trust risk
- Unsafe generated code pattern
- Config / CORS / frontend exposure risk

## Live Demo Anchors

- `/admin` for TrustScore, evidence bundle, traces, coverage, safe-to-merge narration, and audit kickoff flow
- `/audit/[id]` for the fully streaming audit-room experience after kickoff
- `/projects/[projectId]` for access-control and resource-handle storytelling
- `/integrations` plus `/api/webhooks/provider` for webhook verification risk
- `/sign-in` plus `/api/session` for session trust discussion
- `/settings` for config, frontend exposure, and manual-review boundaries

## Why This Repo Is Great For TrustLayer Demos

- The repo mapper sees a credible product shape: route groups, shared components, domain utilities, API handlers, config, docs, audit artifacts, and a demo verifier script.
- Specialist agents have obvious areas to inspect: webhook surfaces, admin utilities, project detail routes, auth/session boundaries, frontend settings exposure, and audit kickoff APIs.
- The audit room already looks like a final product surface, with before/after score movement, coverage, evidence bundles, traces, replay vault entries, and a meaningful safe-to-merge summary.
- Findings feel evidence-backed because each seeded scenario maps to visible pages and structured artifacts instead of vague placeholder text.
- Local startup is fast and judge-friendly because nothing depends on external services.

## What The Audit Is Expected To Find

- `RL-TRUST-001` secrets / credential exposure via safe redacted export evidence
- `RL-TRUST-002` service/admin key handling risk tied to admin utility narratives
- `RL-TRUST-003` access control / IDOR-style risk tied to project handles and detail routes
- `RL-TRUST-004` webhook verification risk tied to integrations and the fixture-only webhook route
- `RL-TRUST-005` auth/session trust risk tied to fake sign-in and session surfaces
- `RL-TRUST-006` unsafe generated code pattern through disabled snippets and patch artifacts
- `RL-TRUST-007` config / CORS / frontend exposure risk tied to controls and client-visible settings

## How The Demo Stays Safe

- Runtime pages and API routes use local in-memory demo data only.
- No real auth provider, billing provider, database, or third-party service is required.
- Credential-like values are fake, redacted, and never accepted by the runtime.
- Risky examples are isolated to non-executable `.disabled` files, JSON fixtures, and markdown evidence.
- Trace files contain operational summaries only; they do not expose raw chain-of-thought.
- The webhook route is fixture-gated and has no meaningful external side effects.
- The demo audit kickoff flow uses a safe fallback repo URL if no env override is configured.
- Dependencies are kept on patched versions rather than leaving real vulnerable packages in place.

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Optional: copy the local env file if you want to customize the placeholder repo URL or demo labels:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Run the demo verifier:

```bash
npm run verify:demo
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

6. Optional verification:

```bash
npm run lint
npm run typecheck
npm run build
```

All example environment values are safe placeholders for demo use only.

## Demo Tips

- Start on the landing page for the product story.
- Use `/dashboard` to establish that Relaylane feels like a real operating workspace.
- Open `/admin` to show the audit kickoff panel, traces, evidence, coverage, and score movement immediately.
- If you want the strongest live-flow moment, trigger `POST /api/demo-audit` and open `/audit/[id]`.
- Jump to `/integrations` or `/projects/meridian-mobile` for the most dramatic seeded findings.
- Keep `docs/demo-script.md` and `docs/demo-highlights.md` nearby as narration backups.

## Repository Shape

This repo is intentionally medium-sized: large enough to make repo mapping, specialist routing, coverage reporting, final-report exports, and audit kickoff narration feel impressive, while still staying understandable and quick to run on a laptop.
