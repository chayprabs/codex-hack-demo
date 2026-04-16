# Demo Highlights

This file is the quick narration guide for the most convincing parts of the Relaylane audit story.

## Top 5 Seeded Findings

1. `RL-TRUST-004` Webhook signature drift in the partner notification lane
2. `RL-TRUST-003` Project handle access scope review on `meridian-mobile`
3. `RL-TRUST-002` Service/admin utility key preview risk in the audit room
4. `RL-TRUST-005` Session trust shortcut in the fake sign-in boundary
5. `RL-TRUST-007` Frontend exposure posture across controls and client-visible settings

## Best Narration Order

1. Start with `RL-TRUST-004`
   It is easy to understand instantly and gives a clean contrast between believable runtime code and safe fixture evidence.
2. Move to `RL-TRUST-003`
   The project detail route makes the resource and access story feel product-shaped.
3. Follow with `RL-TRUST-002`
   The admin utility surface adds operational gravity and makes the report feel premium.
4. Use `RL-TRUST-005`
   This connects the fake sign-in flow to a serious trust-boundary narrative.
5. Close on `RL-TRUST-007`
   It broadens the story from one route to overall posture, coverage, and frontend review.

## Believable App Pages

- `RL-TRUST-004`
  Page surfaces: `/integrations`, `/api/webhooks/provider`
- `RL-TRUST-003`
  Page surfaces: `/projects/meridian-mobile`, `/projects`
- `RL-TRUST-002`
  Page surfaces: `/admin`
- `RL-TRUST-005`
  Page surfaces: `/sign-in`, `/api/session`
- `RL-TRUST-007`
  Page surfaces: `/settings`, `/dashboard`

## Backing Artifact Files

- `RL-TRUST-004`
  `audit-fixtures/findings/RL-TRUST-004-webhook-verification-risk.json`
  `audit-fixtures/evidence/RL-TRUST-004-webhook-verification-risk.md`
  `audit-fixtures/patches/RL-TRUST-004-webhook-verification-risk.diff.txt`
  `audit-fixtures/replay/RL-TRUST-004-webhook-verification-risk.md`
  `audit-fixtures/traces/webhook-agent.json`
- `RL-TRUST-003`
  `audit-fixtures/findings/RL-TRUST-003-access-control-idor.json`
  `audit-fixtures/evidence/RL-TRUST-003-access-control-idor.md`
  `audit-fixtures/replay/RL-TRUST-003-access-control-idor.md`
  `audit-fixtures/traces/idor-agent.json`
- `RL-TRUST-002`
  `audit-fixtures/findings/RL-TRUST-002-service-admin-key-risk.json`
  `audit-fixtures/evidence/RL-TRUST-002-service-admin-key-risk.md`
  `audit-fixtures/patches/RL-TRUST-002-service-admin-key-risk.diff.txt`
  `audit-fixtures/traces/rls-agent.json`
- `RL-TRUST-005`
  `audit-fixtures/findings/RL-TRUST-005-auth-session-trust-risk.json`
  `audit-fixtures/evidence/RL-TRUST-005-auth-session-trust-risk.md`
  `audit-fixtures/replay/RL-TRUST-005-auth-session-trust-risk.md`
  `audit-fixtures/traces/auth-agent.json`
- `RL-TRUST-007`
  `audit-fixtures/findings/RL-TRUST-007-config-cors-frontend-exposure.json`
  `audit-fixtures/evidence/RL-TRUST-007-config-cors-frontend-exposure.md`
  `audit-fixtures/patches/RL-TRUST-007-config-cors-frontend-exposure.diff.txt`
  `audit-fixtures/score-coverage.json`

## Fast Preflight

- Run `npm run verify:demo`
- Open `/admin`
- Use the live audit kickoff panel if you want the "paste target -> audit starts" story

## Presentation Note

If the room feels cold, stay inside `/admin` and narrate from the evidence bundle, traces, replay index, and safe-to-merge summary. Relaylane is structured so the audit story still feels substantial even without dramatic runtime interaction.
