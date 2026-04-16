import { auditAgentTraces } from "@/lib/audit-manifest";

export function AgentTracePanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Specialist agent traces
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {auditAgentTraces.map((trace) => (
          <article key={trace.id} className="rounded-[24px] bg-white/75 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {trace.specialty}
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight">
                  {trace.agent_name}
                </h3>
              </div>
              <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold">
                {trace.status}
              </span>
            </div>
            <p className="mt-3 text-sm dense-copy">{trace.focus}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold">Confidence</p>
                <p className="mt-2">{trace.confidence}</p>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold">Elapsed</p>
                <p className="mt-2">{(trace.elapsed_ms / 1000).toFixed(1)}s</p>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold">Verification</p>
                <p className="mt-2">{trace.verification_status}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm dense-copy">
              <p>
                Candidate: {trace.candidate_detected.finding_ids.join(", ")} -{" "}
                {trace.candidate_detected.summary}
              </p>
              <p>Files inspected: {trace.files_inspected.length}</p>
              <p>Evidence collected: {trace.evidence_collected.length}</p>
            </div>
            <div className="mt-4 space-y-2">
              {trace.status_transitions.map((transition) => (
                <div
                  key={`${trace.id}-${transition.at}-${transition.status}`}
                  className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm"
                >
                  <p className="font-semibold">
                    {transition.status} - {transition.at}
                  </p>
                  <p className="mt-1 dense-copy">{transition.note}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
