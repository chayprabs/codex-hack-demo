import { auditCoverage, auditScoreSummary } from "@/lib/audit-manifest";

export function TrustScorePanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        TrustScore and coverage
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] bg-white/75 p-5">
            <p className="text-sm font-semibold">Before</p>
            <p className="mt-2 text-4xl font-black tracking-tight">
              {auditScoreSummary.before.score}
            </p>
            <p className="mt-2 text-sm dense-copy">{auditScoreSummary.before.summary}</p>
          </article>
          <article className="rounded-[24px] bg-white/75 p-5">
            <p className="text-sm font-semibold">After</p>
            <p className="mt-2 text-4xl font-black tracking-tight">
              {auditScoreSummary.after.score}
            </p>
            <p className="mt-2 text-sm dense-copy">{auditScoreSummary.after.summary}</p>
          </article>
          <article className="rounded-[24px] bg-[linear-gradient(135deg,rgba(255,122,89,0.18),rgba(14,165,164,0.18))] p-5 md:col-span-2">
            <p className="text-sm font-semibold">Narration hook</p>
            <p className="mt-2 text-2xl font-black tracking-tight">
              +{auditScoreSummary.delta} TrustScore lift
            </p>
            <div className="mt-4 space-y-2 text-sm dense-copy">
              {auditScoreSummary.highlights.map((highlight) => (
                <p key={highlight}>{highlight}</p>
              ))}
            </div>
          </article>
        </div>
        <div className="space-y-3">
          {auditCoverage.buckets.map((bucket) => (
            <article key={bucket.label} className="rounded-[24px] bg-white/75 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black tracking-tight">{bucket.label}</p>
                  <p className="mt-2 text-sm dense-copy">{bucket.note}</p>
                </div>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold">
                  {bucket.count}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {bucket.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
