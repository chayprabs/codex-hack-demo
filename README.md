# Relaylane: Safe TrustLayer Demo Target

> A safe, medium-sized Next.js application seeded with deterministic audit artifacts for live TrustLayer demos.

Relaylane is a polished demo repo for showcasing how TrustLayer audits a realistic application surface, maps a repo, explains findings, and packages evidence. It is intentionally built to feel like a credible "vibe-coded startup app" while staying safe, local-only, and presentation-ready.

Stack: Next.js 15, TypeScript, App Router, Tailwind CSS, local mock data only.

## 60-Second Scan

- Product: Relaylane, a fictional launch-operations workspace with marketing, sign-in, dashboard, projects, messages, activity, settings, integrations, admin, and live audit views.
- Size: 11 page routes and 11 local API routes, which is enough structure for repo mapping and specialist routing without becoming noisy.
- Audit layer: 7 seeded finding packages and 5 specialist trace files, all tied to deterministic evidence, replay notes, score artifacts, and report outputs.
- Best demo path: open `/admin`, launch the seeded audit flow, then pivot into `/audit/[id]`, `/integrations`, or `/projects/meridian-mobile`.
- Safety: local-only mock runtime, fake env placeholders, fixture-gated webhook handling, and `.disabled` snippets for risky examples.
- Verification: `npm run verify:demo` checks that the manifest, traces, scores, replay data, docs, and README-required sections stay aligned.

## What This Repo Is

This repository is a medium-sized demo application built specifically for TrustLayer.

- It looks and feels like a realistic launch-operations startup product, with a marketing site, fake sign-in, workspace dashboard, project detail views, integrations, settings, and an admin control room.
- It includes seeded audit and reporting artifacts that make security storytelling deterministic instead of improvisational.
- It is designed for live demos where you want repo mapping, specialist agent traces, evidence bundles, score movement, replay notes, and a final report to appear coherent in under a minute.
- It is a safe demo target, not a real intentionally exploitable production system.
- In concrete terms, the repo currently includes 11 page routes, 11 API routes, 7 seeded findings in `audit-fixtures/findings/`, and 5 specialist traces in `audit-fixtures/traces/`.

The seeded findings and supporting artifacts live in [`audit-fixtures/`](./audit-fixtures/) and are referenced by the runtime UI, the admin audit room, and the demo verifier script.

## App Overview

Relaylane is a fictional launch-operations platform for teams shipping client work, partner previews, and release programs under deadline pressure. The app is deliberately product-shaped: it has enough domain depth to feel real, but it stays small enough to understand quickly in a live demo.

Example project fixtures include `apollo-redesign`, `meridian-mobile`, `tandem-retention`, `orbit-support-copilot`, and `beacon-partner-hub`, which helps the project portfolio and access-review story feel concrete rather than placeholder-heavy.

### App Concept

The product centers on a shared workspace where teams can:

- monitor launch health and operational status
- review client-facing project portfolios
- inspect project detail pages with delivery checklists and access-review context
- track message threads and activity feeds
- review settings, integrations, and webhook posture
- launch and watch a deterministic TrustLayer audit from an admin control room

### Core User Flows

1. Start on the landing page and fake sign-in flow.
2. Enter the workspace dashboard to establish the product context.
3. Move into projects, messages, activity, settings, or integrations to show realistic audit surfaces.
4. Open `/admin` to kick off the demo audit, review traces, inspect evidence, and narrate score changes.
5. Open `/audit/[id]` for the live audit-room experience and final-report feel.

### Main Pages

- `/` - marketing landing page for Relaylane
- `/sign-in` - local-only persona sign-in for judges and demo users
- `/dashboard` - launch command center with project health, activity, and audit previews
- `/projects` - portfolio view across client programs and launch lanes
- `/projects/[projectId]` - project detail page with checklist, blockers, updates, and access-review context
- `/messages` - war-room threads and project chatter
- `/activity` - operational timeline of launch and audit events
- `/settings` - workspace controls and frontend exposure posture
- `/integrations` - connected tools, sandbox syncs, and webhook policy
- `/admin` - TrustLayer demo control room with evidence, traces, TrustScore, replay, and merge-readiness framing
- `/audit/[id]` - live seeded audit room backed by deterministic artifacts

### Main Domain Objects

- users and demo personas
- projects and project access surfaces
- message threads and activity events
- integrations and webhook lanes
- settings sections and exposure surfaces
- admin utilities and admin signals
- audit findings, traces, evidence bundles, replay notes, and score artifacts

### Why The Codebase Feels Realistic

- The route structure is clear and believable, with both product pages and local API handlers.
- Shared components are organized by product area instead of being dumped into one folder.
- Domain data and audit data are separated cleanly under `lib/` and `audit-fixtures/`.
- The repo includes supporting docs, a verifier script, and report artifacts, which makes the demo feel operational instead of cosmetic.

## Why This Repo Is Great For TrustLayer Demos

- Medium complexity: 11 page routes, 11 API routes, shared feature components, local server helpers, and a full artifact layer make it feel substantial without becoming hard to navigate.
- Clear route structure: marketing, auth, workspace, project detail, integrations, admin, and live audit views.
- Settings, integrations, and admin surfaces: strong trust-boundary areas that narrate well on stage.
- Repo-mapper-friendly layout: `app/`, `components/`, `lib/`, `audit-fixtures/`, `docs/`, and `scripts/` are easy to map and explain.
- Deterministic audit support files: manifest, findings, traces, replay notes, score artifacts, and merge-readiness summaries already exist.
- Evidence, traces, and replay-ready artifacts: the repo includes exportable bundle files and specialist operational traces without exposing raw model reasoning.
- Strong before/after report storytelling: score movement, coverage, verification state, and safe-to-merge framing are already packaged.
- Fast local startup: no database, third-party auth, or external services are required.

## What The Audit Is Expected To Find

TrustLayer is expected to surface seeded demo findings and audit scenarios such as:

- Secrets / credential handling risk: safe placeholder and redacted export artifacts that simulate how credential-like material can appear in evidence bundles.
- Access control / object access risk: project-detail and API surfaces that support deterministic IDOR-style storytelling without exposing real tenant data.
- Webhook / integration risk: fixture-gated webhook flows and evidence notes that model signature and replay-review scenarios.
- Auth or trust-boundary risk: local-only persona and session surfaces that support safe trust-by-email or trust-by-role narration.
- Unsafe code pattern risk: disabled snippets and patch artifacts that represent generated or string-built code review concerns.
- Config / frontend exposure risk: browser-visible runtime labels, preview-origin notes, and frontend exposure artifacts built from fake values only.
- Coverage / unsupported / manual-review signals: explicit artifact layers that show where the audit is verified, partial, reviewer-owned, or unsupported.

Every category above is a seeded demo scenario, not a claim of a live exploitable flaw in a production deployment.

## Repo Structure

```text
.
|-- app/
|   |-- (workspace)/
|   |   |-- activity/
|   |   |-- admin/
|   |   |-- dashboard/
|   |   |-- integrations/
|   |   |-- messages/
|   |   |-- projects/
|   |   `-- settings/
|   |-- api/
|   |   |-- activity/
|   |   |-- admin/overview/
|   |   |-- audits/[auditId]/stream/
|   |   |-- demo-audit/
|   |   |-- integrations/
|   |   |-- messages/
|   |   |-- projects/[projectId]/
|   |   |-- session/
|   |   `-- webhooks/provider/
|   |-- audit/[id]/
|   `-- sign-in/
|-- components/
|   |-- admin/
|   |-- audit/
|   |-- auth/
|   |-- dashboard/
|   |-- integrations/
|   |-- marketing/
|   |-- messages/
|   |-- projects/
|   `-- settings/
|-- lib/
|   |-- demo-data.ts
|   |-- audit-demo-data.ts
|   |-- audit-manifest.ts
|   `-- server/
|-- audit-fixtures/
|   |-- findings/
|   |-- evidence/
|   |-- traces/
|   |-- replay/
|   |-- patches/
|   |-- snippets/
|   |-- manifest.json
|   |-- evidence-bundle.md
|   |-- safe-to-merge.md
|   `-- demo-report.md
|-- docs/
|   |-- demo-highlights.md
|   `-- demo-script.md
|-- scripts/
|   `-- verify-demo.mjs
`-- .env.example
```

Most important areas:

- `app/` contains the UI routes and local API routes that make the repo feel like a real product.
- `components/` contains feature-scoped UI for marketing, workspace pages, integrations, auth, admin, and the live audit room.
- `audit-fixtures/` holds the deterministic TrustLayer demo layer: findings, evidence, traces, replay docs, score artifacts, and report material.
- `docs/` contains short narration guides for the live demo.
- `.env.example` contains fake placeholders only and is safe to copy for local setup.

## How The Demo Stays Safe

- No real secrets are included anywhere in the repository.
- No live exploit-ready instructions are included.
- Runtime pages and API routes use local mock data and deterministic fixture inputs only.
- Risk-oriented examples are isolated to fixture files, markdown evidence, JSON packages, and `.disabled` snippets.
- Audit artifacts are deterministic and demo-oriented, not evidence of a live vulnerable deployment.
- Specialist traces are operational summaries for presentation and review, not raw chain-of-thought.
- The purpose of the repo is to showcase the TrustLayer audit product, not to act as a vulnerable target.

## How To Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file if you want local overrides:

   ```bash
   cp .env.example .env.local
   ```

   PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open:

   ```text
   http://localhost:3000
   ```

Optional preflight:

```bash
npm run verify:demo
```

## Fastest Live Demo Path

If dependencies are already installed, the fastest stage-ready path is:

1. Run `npm run verify:demo`
2. Run `npm run dev`
3. Open `http://localhost:3000/admin`
4. Use the live audit kickoff panel or `POST /api/demo-audit`
5. Open the returned `open_url`
6. Jump to `/integrations`
7. Jump to `/projects/meridian-mobile`
8. Close on `/sign-in` or stay in the audit room for the final report summary

This path gets you from "safe demo target" to "active audit room" to the two strongest seeded finding surfaces with almost no dead time.

## Top 5 Strongest Demo Assets

- `/admin`
  The best one-screen story for kickoff, score, traces, evidence, and merge-readiness narration.
- `/audit/[id]`
  The strongest live product moment once the seeded run starts.
- `/integrations` plus `/api/webhooks/provider`
  The clearest, fastest `RL-TRUST-004` narrative on stage.
- `/projects/meridian-mobile`
  The strongest product-shaped route for `RL-TRUST-003`.
- `audit-fixtures/evidence-bundle.md`
  The cleanest fallback artifact when you want premium report feel without depending on runtime pacing.

## Demo Highlights

- Best seeded finding categories: webhook verification, access control, service/admin key handling, auth-session trust, and config/frontend exposure.
- Best visible narration areas: [`/admin`](<./app/(workspace)/admin/page.tsx>), [`/integrations`](<./app/(workspace)/integrations/page.tsx>), [`/projects/[projectId]`](<./app/(workspace)/projects/[projectId]/page.tsx>), [`/sign-in`](./app/sign-in/page.tsx), and [`/audit/[id]`](<./app/audit/[id]/page.tsx>).
- Strongest evidence and report artifacts: [`audit-fixtures/evidence-bundle.md`](./audit-fixtures/evidence-bundle.md), [`audit-fixtures/safe-to-merge.md`](./audit-fixtures/safe-to-merge.md), [`audit-fixtures/demo-report.md`](./audit-fixtures/demo-report.md), and [`audit-fixtures/replay/`](./audit-fixtures/replay/).
- Strongest narration helpers: [`docs/demo-script.md`](./docs/demo-script.md), [`docs/demo-highlights.md`](./docs/demo-highlights.md), and [`audit-fixtures/README.md`](./audit-fixtures/README.md).
- Best live flow: open `/admin`, launch the seeded audit, then move into `/audit/[id]` and one product surface such as `/integrations` or `/projects/meridian-mobile`.

## For Judges / Reviewers

- Look at `/admin` first. It is the fastest way to understand the audit story, artifact quality, and demo safety posture.
- Then inspect `audit-fixtures/` for deterministic findings, traces, replay notes, score artifacts, and the report bundle.
- Use `docs/demo-script.md` and `docs/demo-highlights.md` for the fastest walkthrough.
- The repo is structured this way so TrustLayer can show repo mapping, specialist routing, evidence packaging, and final-report quality without relying on external systems.

## License / Disclaimer

This repository is a TrustLayer demo workspace intended for safe product demonstration, evaluation, and judging. It is not presented as a production deployment, does not contain real secrets or customer data, and should be treated as a deterministic demo target rather than a live vulnerable application.
