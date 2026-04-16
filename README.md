# trustlayer-demo-app

`trustlayer-demo-app` is a safe, medium-sized demo repository for TrustLayer-style security audits.

It is built as a polished fake SaaS product called **Relaylane**, a team project management and launch-operations workspace for startup teams. The UI is intentionally rich enough for hackathon demos, with dashboards, projects, messages, settings, integrations, admin views, and multiple API routes.

Important: this repository is **designed for safe TrustLayer demo audits**.

- It does **not** contain real exploitable vulnerabilities.
- It does **not** contain real secrets.
- It does **not** contain runnable insecure attack paths.
- Seeded findings are represented with fixtures, markdown case files, redacted evidence snapshots, and `.disabled` code samples.

## Tech stack

- Next.js 15
- TypeScript
- App Router
- Tailwind CSS
- Local mock data only

## App concept

Relaylane is a fake launch command center for cross-functional teams managing client delivery and release coordination.

Core domain objects include:

- users
- projects
- messages
- activity events
- integrations
- settings sections
- admin signals

## Product areas

- Marketing landing page at `/`
- Fake sign-in page at `/sign-in`
- Main dashboard at `/dashboard`
- Projects list and detail pages at `/projects` and `/projects/[projectId]`
- Messages area at `/messages`
- Activity area at `/activity`
- Settings at `/settings`
- Integrations at `/integrations`
- Admin area at `/admin`

## API routes

- `GET /api/session`
- `GET /api/projects`
- `GET /api/projects/[projectId]`
- `GET /api/messages`
- `GET /api/activity`
- `GET /api/integrations`
- `GET /api/admin/overview`
- `GET /api/webhooks/provider`
- `POST /api/webhooks/provider`

The webhook route is safe by design and only accepts deterministic fixture payloads with explicit demo headers.

## TrustLayer demo layer

The seeded audit artifacts live in [`audit-fixtures/`](./audit-fixtures).

Key files:

- `audit-fixtures/manifest.json`
- `audit-fixtures/cases/*.md`
- `audit-fixtures/snippets/*.disabled`
- `audit-fixtures/evidence/*.json`
- `audit-fixtures/replay/README.md`

## Seeded finding categories

- secrets/credentials exposure
- auth/authz weakness
- webhook handling weakness
- unsafe code pattern
- config/dependency risk
- frontend exposure risk
- unsupported/manual review areas

## Why the repo stays safe

- Runtime pages and API routes use local in-memory demo data only.
- No real auth provider, billing provider, database, or third-party service is required.
- Credential-like values are fake, redacted, and never accepted by the app runtime.
- Risky examples are isolated to non-executable `.disabled` files and markdown case files.
- The live webhook route is hardened for fixture-only replays and does not trigger real side effects.
- The repo uses patched framework dependencies rather than leaving a real vulnerable package in place.

## Environment

Copy the example values if you want local environment variables:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

All example values are safe placeholders for demo use only.

## Local run instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app:

```text
http://localhost:3000
```

4. Optional checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Demo tips

- Start on the landing page for the product story.
- Use `/sign-in` to switch between fake personas.
- Walk judges through `/admin` to show seeded findings from `audit-fixtures/manifest.json`.
- Use `/integrations` plus `POST /api/webhooks/provider` for the safe webhook replay story.

## Repository shape

This repo is intentionally medium-sized so repo mapping feels meaningful during a security audit demo, while still staying easy to run locally.
"# codex-hack-demo" 
