import { Pill } from "@/components/shared/pill";
import { auditManifest } from "@/lib/audit-manifest";
import { adminSignals } from "@/lib/demo-data";

export function OpsPanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Admin queue
        </p>
        <div className="mt-4 space-y-3">
          {adminSignals.map((signal) => (
            <article key={signal.id} className="rounded-[22px] bg-white/75 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black tracking-tight">{signal.title}</h3>
                  <p className="mt-2 text-sm dense-copy">{signal.note}</p>
                </div>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
                  {signal.severity}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="text-[var(--ink-soft)]">{signal.owner}</span>
                <span className="text-[var(--ink-soft)]">{signal.updatedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Seeded findings
        </p>
        <div className="mt-4 space-y-3">
          {auditManifest.findings.map((finding) => (
            <article key={finding.id} className="rounded-[22px] bg-white/75 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    {finding.id} · {finding.category}
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-tight">{finding.title}</h3>
                </div>
                <Pill
                  tone={
                    finding.severity === "High" || finding.severity === "Critical"
                      ? "at-risk"
                      : finding.severity === "Medium"
                        ? "watch"
                        : "stable"
                  }
                  label={finding.severity}
                />
              </div>
              <p className="mt-3 text-sm dense-copy">{finding.impact_summary}</p>
              <p className="mt-3 text-sm dense-copy">{finding.why_this_matters}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {finding.file_paths.slice(0, 3).map((path) => (
                  <span
                    key={path}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold"
                  >
                    {path}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                Evidence {finding.evidence_file}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                {finding.proof_type} · {finding.verification_state}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
