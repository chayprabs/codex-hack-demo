import {
  DEMO_AUDIT_SEED,
  getDemoRepoUrl,
  isCustomDemoRepoUrlConfigured,
} from "@/lib/server/config";

const launchSteps = [
  {
    label: "Kick off audit",
    route: "POST /api/demo-audit",
    note: "Returns a deterministic audit_id plus the follow-up stream URL.",
  },
  {
    label: "Open live room",
    route: "Open /audit/[id]",
    note: "Streams the seeded audit room with findings, traces, score movement, and final report state.",
  },
  {
    label: "Fetch snapshot",
    route: "GET /api/audits/[auditId]",
    note: "Returns the current audit state, score movement, findings, and report metadata.",
  },
  {
    label: "Stream progress",
    route: "GET /api/audits/[auditId]/stream",
    note: "SSE emits safe operational events for the seeded agent run without model reasoning.",
  },
];

export function DemoAuditLaunchPanel() {
  const repoUrl = getDemoRepoUrl();
  const repoUrlSource = isCustomDemoRepoUrlConfigured() ? "env configured" : "safe fallback";

  return (
    <section className="panel rounded-[28px] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Live audit kickoff
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">
            Paste target, start seeded audit, narrate from one safe control room
          </h2>
        </div>
        <span className="rounded-full bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]">
          seed {DEMO_AUDIT_SEED}
        </span>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-[24px] bg-white/75 p-5">
          <p className="text-sm font-semibold">Repo target</p>
          <p className="mt-3 mono text-xs">{repoUrl}</p>
          <p className="mt-2 text-sm dense-copy">
            Demo audit creation stays local and deterministic. The repo URL is narrative
            input only and does not trigger live GitHub ingestion.
          </p>
          <p className="mt-2 text-sm dense-copy">
            The response includes an <span className="mono">open_url</span> so the
            fastest live handoff is straight into the audit room.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Source</p>
              <p className="mt-2">{repoUrlSource}</p>
            </div>
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Safety</p>
              <p className="mt-2">No external calls or live exploit paths</p>
            </div>
          </div>
          <div className="mt-4 rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
            <p className="font-semibold">Sample response</p>
            <pre className="mt-3 overflow-x-auto text-xs">
{`{
  "audit_id": "audit_demo_...",
  "repo_url_source": "safe-default",
  "mode": "demo",
  "status": "queued",
  "open_url": "/audit/<id>",
  "stream_url": "/api/audits/<id>/stream",
  "repo_url": "${repoUrl}"
}`}
            </pre>
          </div>
        </article>
        <div className="space-y-3">
          {launchSteps.map((step) => (
            <article key={step.route} className="rounded-[24px] bg-white/75 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {step.label}
                </p>
                <span className="mono rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs">
                  {step.route}
                </span>
              </div>
              <p className="mt-3 text-sm dense-copy">{step.note}</p>
            </article>
          ))}
          <article className="rounded-[24px] bg-[var(--surface-muted)] p-4 text-sm dense-copy">
            If the demo machine is completely fresh, <span className="mono">npm run verify:demo</span>{" "}
            confirms artifact consistency before you open the app. That gives the repo a
            real preflight story instead of relying on manual spot checks.
          </article>
        </div>
      </div>
    </section>
  );
}
