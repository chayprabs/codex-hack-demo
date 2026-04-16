import { auditEvidenceBundle } from "@/lib/audit-manifest";

export function EvidenceBundlePanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Evidence bundle
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[24px] bg-white/75 p-5">
          <p className="text-sm font-semibold">Audit mode</p>
          <p className="mt-2 text-2xl font-black tracking-tight">
            {auditEvidenceBundle.audit_mode}
          </p>
          <p className="mt-3 text-sm dense-copy">{auditEvidenceBundle.coverage.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {auditEvidenceBundle.frameworks_detected.map((framework) => (
              <span
                key={framework}
                className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold"
              >
                {framework}
              </span>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">TrustScore</p>
              <p className="mt-2">{auditEvidenceBundle.trust_score.current}</p>
            </div>
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Verified</p>
              <p className="mt-2">
                {auditEvidenceBundle.verification_status.verified_findings_count}
              </p>
            </div>
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Replay-ready</p>
              <p className="mt-2">
                {
                  auditEvidenceBundle.findings.filter((finding) => finding.replay_ready)
                    .length
                }
              </p>
            </div>
          </div>
        </article>
        <div className="space-y-3">
          {auditEvidenceBundle.evidence.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white/75 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    {item.type}
                  </p>
                  <p className="mt-2 font-black tracking-tight">{item.id}</p>
                </div>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold">
                  bundled
                </span>
              </div>
              <p className="mt-3 text-sm dense-copy">{item.note}</p>
              <p className="mt-3 mono text-xs">{item.path}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
