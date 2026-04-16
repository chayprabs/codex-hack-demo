import { sessionTrustBoundaries } from "@/lib/audit-demo-data";

export function TrustBoundaryPanel() {
  return (
    <section className="panel rounded-[32px] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Session trust boundaries
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {sessionTrustBoundaries.map((boundary) => (
          <article key={boundary.id} className="rounded-[24px] bg-white/75 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {boundary.surface}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight">{boundary.title}</h3>
            <p className="mt-3 text-sm dense-copy">{boundary.safeRuntimeRule}</p>
            <div className="mt-4 rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
              <p className="font-semibold">Trusted input</p>
              <p className="mt-2 dense-copy">{boundary.trustedInput}</p>
            </div>
            <p className="mt-4 text-sm dense-copy">{boundary.scenarioHook}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
