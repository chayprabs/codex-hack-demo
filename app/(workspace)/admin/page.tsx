import { AgentTracePanel } from "@/components/admin/agent-trace-panel";
import { DemoAuditLaunchPanel } from "@/components/admin/demo-audit-launch-panel";
import { EvidenceBundlePanel } from "@/components/admin/evidence-bundle-panel";
import { MergeReadinessPanel } from "@/components/admin/merge-readiness-panel";
import { OpsPanel } from "@/components/admin/ops-panel";
import { ServiceUtilityPanel } from "@/components/admin/service-utility-panel";
import { ShameWallPanel } from "@/components/admin/shame-wall-panel";
import { TrustScorePanel } from "@/components/admin/trust-score-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  auditAgentTraces,
  auditCoverage,
  auditEvidenceBundle,
  auditManifest,
  auditRepoMap,
} from "@/lib/audit-manifest";

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Admin"
          title="Control room for review queues, traces, and seeded proof"
          description="This area is tuned for premium TrustLayer demos: specialist traces, deterministic evidence bundles, coverage-aware scoring, patch verification feel, and replay-ready summaries."
        />
      </section>
      <DemoAuditLaunchPanel />
      <TrustScorePanel />
      <EvidenceBundlePanel />
      <AgentTracePanel />
      <ServiceUtilityPanel />
      <MergeReadinessPanel />
      <ShameWallPanel />
      <OpsPanel />
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Manifest summary
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <div className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Repo</p>
            <p className="mt-2 text-xl font-black">{auditManifest.repo}</p>
          </div>
          <div className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Generated at</p>
            <p className="mt-2 text-xl font-black">{auditManifest.generated_at}</p>
          </div>
          <div className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Safe demo mode</p>
            <p className="mt-2 text-xl font-black">
              {auditManifest.demo_safe ? "Enabled" : "Disabled"}
            </p>
          </div>
          <div className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Covered areas</p>
            <p className="mt-2 text-xl font-black">{auditCoverage.supported.length}</p>
          </div>
          <div className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Agent traces</p>
            <p className="mt-2 text-xl font-black">{auditAgentTraces.length}</p>
          </div>
        </div>
      </section>
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Export bundle summary
        </p>
        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Audit mode</p>
            <p className="mt-2 text-xl font-black">{auditEvidenceBundle.audit_mode}</p>
          </article>
          <article className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Replay-ready notes</p>
            <p className="mt-2 text-xl font-black">
              {auditEvidenceBundle.replay_ready_notes.length}
            </p>
          </article>
          <article className="rounded-[22px] bg-white/75 p-4">
            <p className="text-sm font-semibold">Verified findings</p>
            <p className="mt-2 text-xl font-black">
              {auditEvidenceBundle.verification_status.verified_findings_count}
            </p>
          </article>
        </div>
      </section>
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Repo map anchors
        </p>
        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          {auditRepoMap.resources.map((resource) => (
            <article key={resource.name} className="rounded-[22px] bg-white/75 p-4">
              <h3 className="text-lg font-black tracking-tight">{resource.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {resource.scenarios.map((scenario) => (
                  <span
                    key={scenario}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold"
                  >
                    {scenario}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm dense-copy">
                {resource.likely_paths.map((path) => (
                  <p key={path} className="mono text-xs">
                    {path}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
