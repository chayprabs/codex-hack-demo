import type {
  AdminUtility,
  ExposureSurface,
  ProjectAccessSurface,
  SessionTrustBoundary,
  WebhookLane,
} from "@/lib/types";

export const adminUtilities: AdminUtility[] = [
  {
    id: "admin-utility-exporter",
    name: "Ops Export Helper",
    purpose: "Builds mock launch packets and redacted evidence bundles for customer success dry runs.",
    accessLevel: "Scoped admin utility",
    owner: "Sage Bryant",
    keyReference: "svc_demo_redacted_ops_exporter",
    reviewStatus: "Rotation simulated",
    note: "The repo never stores a live service key. Scenario evidence uses an alias and redacted previews only.",
  },
  {
    id: "admin-utility-replay",
    name: "Replay Runner",
    purpose: "Replays fixture-only webhook events and attaches deterministic audit traces for demos.",
    accessLevel: "Fixture operator",
    owner: "Lina Cho",
    keyReference: "svc_demo_redacted_replay_lane",
    reviewStatus: "Read-only fixtures",
    note: "This is framed like an internal admin helper so service-key handling risk feels believable without creating a runnable secret path.",
  },
  {
    id: "admin-utility-notify",
    name: "Notice Broadcaster",
    purpose: "Publishes internal-only approval banners and project notices in the admin cockpit.",
    accessLevel: "Workspace admin",
    owner: "Mina Patel",
    keyReference: "svc_demo_redacted_notice_bus",
    reviewStatus: "Local-only alias",
    note: "No third-party notification provider is configured. The utility exists to anchor service/admin key scenarios in the UI.",
  },
];

export const projectAccessSurfaces: ProjectAccessSurface[] = [
  {
    projectId: "apollo-redesign",
    resourceHandle: "proj_demo_apollo_redesign",
    clientScope: "northstar-health/sandbox-approvers",
    shareMode: "Invite-only fixture",
    likelyRoutes: ["/projects/[projectId]", "/api/projects/[projectId]"],
    narration:
      "Project detail pages feel like they could expose neighboring records if a real multi-tenant access check were missing.",
    safeControl:
      "All records are local mock objects and no customer artifacts are fetched or derived from user-controlled identifiers.",
  },
  {
    projectId: "meridian-mobile",
    resourceHandle: "proj_demo_meridian_mobile",
    clientScope: "meridian-capital/compliance-review",
    shareMode: "Internal review lane",
    likelyRoutes: ["/projects/[projectId]", "/api/projects/[projectId]"],
    narration:
      "This one is great for narrating an IDOR-style story because it has compliance copy, executive stakeholders, and distinct resource handles.",
    safeControl:
      "Runtime responses are static fixtures and do not look up a real tenant boundary or any private document store.",
  },
  {
    projectId: "orbit-support-copilot",
    resourceHandle: "proj_demo_orbit_support_copilot",
    clientScope: "orbit-logistics/internal-pilot",
    shareMode: "Pilot-only sandbox",
    likelyRoutes: ["/projects/[projectId]", "/api/projects/[projectId]"],
    narration:
      "The pilot framing makes it plausible that generated support notes and route parameters would deserve access review in a real system.",
    safeControl:
      "No support transcripts or live tickets exist in the repo; the access story is carried by fixtures, not real data exposure.",
  },
];

export const webhookLanes: WebhookLane[] = [
  {
    id: "webhook-launch-events",
    name: "Launch event relay",
    endpoint: "/api/webhooks/provider",
    owner: "Lina Cho",
    verificationMode: "Fixture signature + source header",
    fixtureHeaders: ["x-demo-source", "x-demo-signature"],
    recentEvents: [
      "launch.approval.recorded",
      "integration.sync.completed",
      "audit.fixture.replayed",
    ],
    narration:
      "Perfect live-demo material because the route is real, the controls are visible, and the risky version lives safely in non-executable evidence.",
  },
  {
    id: "webhook-status-mirror",
    name: "Status mirror",
    endpoint: "/api/webhooks/provider",
    owner: "Sage Bryant",
    verificationMode: "Replay-only acceptance",
    fixtureHeaders: ["x-demo-source", "x-demo-signature"],
    recentEvents: ["status.page.updated", "incident.note.appended"],
    narration:
      "Pairs nicely with the integrations screen to explain why TrustLayer would care about signature checks, timestamps, and replay defense.",
  },
];

export const sessionTrustBoundaries: SessionTrustBoundary[] = [
  {
    id: "session-boundary-persona",
    title: "Persona switch stays local-only",
    surface: "/sign-in and /api/session",
    trustedInput: "Pre-seeded demo user selection",
    safeRuntimeRule:
      "The app never mints tokens, persists sessions, or trusts headers from a real identity provider.",
    scenarioHook:
      "Lets you narrate how a real app could drift into trust-by-email or trust-by-role mistakes, while this demo keeps that logic out of runtime.",
  },
  {
    id: "session-boundary-admin",
    title: "Admin posture is descriptive, not privileged",
    surface: "/admin",
    trustedInput: "Static workspace state and fixture summaries",
    safeRuntimeRule:
      "Admin views are purely presentational and do not unlock mutation paths or private records.",
    scenarioHook:
      "Useful for the auth/session trust story because judges can see an admin area without the repo containing a live privilege boundary to break.",
  },
];

export const exposureSurfaces: ExposureSurface[] = [
  {
    id: "frontend-surface-runtime",
    title: "Client runtime labels and support aliases",
    audience: "Browser-visible",
    example: "NEXT_PUBLIC_DEMO_ANALYTICS_KEY, support aliases, runbook labels",
    whyItFeelsReal:
      "These are the kinds of public runtime values teams often overshare when building dashboards and integration settings.",
    safeNote:
      "All values are fake placeholders and are represented as evidence or copy only, not as live secrets or privileged endpoints.",
  },
  {
    id: "frontend-surface-cors",
    title: "CORS and embed preview posture",
    audience: "Integration reviewers",
    example: "Allowlist previews, embed host labels, sandbox origin notes",
    whyItFeelsReal:
      "CORS and embed controls naturally belong near integrations and settings, making the config/frontend exposure scenario easy to explain.",
    safeNote:
      "No permissive runtime CORS policy is implemented; the scenario is carried by manifests, evidence files, and UI copy.",
  },
  {
    id: "frontend-surface-dashboard",
    title: "Operational labels in dashboard cards",
    audience: "Workspace users",
    example: "Workspace IDs, internal lane labels, rollout wave names",
    whyItFeelsReal:
      "Launch dashboards often accumulate identifiers and internal context that deserve review before shipping to clients.",
    safeNote:
      "Relaylane uses synthetic IDs and mock labels only, so nothing sensitive is actually exposed.",
  },
];
