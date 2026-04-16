import { OpsPanel } from "@/components/admin/ops-panel";
import { ServiceUtilityPanel } from "@/components/admin/service-utility-panel";
import { TrustScorePanel } from "@/components/admin/trust-score-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { auditCoverage, auditManifest, auditRepoMap } from "@/lib/audit-manifest";

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Admin"
          title="Control room for review queues and seeded audit evidence"
          description="This area helps a TrustLayer demo land quickly: runtime-safe controls on one side, deterministic findings and proof types on the other."
        />
      </section>
      <TrustScorePanel />
      <ServiceUtilityPanel />
      <OpsPanel />
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Manifest summary
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
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
