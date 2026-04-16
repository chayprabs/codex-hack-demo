import {
  auditCoverageScore,
  auditReplayIndex,
  auditSafeToMerge,
} from "@/lib/audit-manifest";

export function MergeReadinessPanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Safe to merge
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
        <article className="rounded-[24px] bg-white/75 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Decision</p>
              <p className="mt-2 text-3xl font-black tracking-tight">
                {auditSafeToMerge.safe_to_merge_now ? "Safe to merge" : "Hold"}
              </p>
            </div>
            <span className="rounded-full bg-[rgba(14,165,164,0.14)] px-3 py-1 text-xs font-bold text-[var(--teal)]">
              demo target
            </span>
          </div>
          <p className="mt-3 text-sm dense-copy">{auditSafeToMerge.summary}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Coverage</p>
              <p className="mt-2">{auditCoverageScore.coverage_percent}%</p>
            </div>
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
              <p className="font-semibold">Verified findings</p>
              <p className="mt-2">{auditCoverageScore.verified_findings_count}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Scope {auditSafeToMerge.merge_scope}
          </p>
        </article>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[24px] bg-white/75 p-4">
            <p className="font-semibold">Verified now</p>
            <div className="mt-3 space-y-2 text-sm dense-copy">
              {auditSafeToMerge.verified_now.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
          <article className="rounded-[24px] bg-white/75 p-4">
            <p className="font-semibold">Manual review</p>
            <div className="mt-3 space-y-2 text-sm dense-copy">
              {auditSafeToMerge.manual_review_needed.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
          <article className="rounded-[24px] bg-white/75 p-4">
            <p className="font-semibold">Replay vault</p>
            <div className="mt-3 space-y-2 text-sm dense-copy">
              <p>{auditReplayIndex.entries.length} regression entries indexed</p>
              {auditSafeToMerge.highest_score_drivers.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
