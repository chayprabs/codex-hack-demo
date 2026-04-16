import { adminUtilities } from "@/lib/audit-demo-data";

export function ServiceUtilityPanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Admin utilities and service-key posture
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {adminUtilities.map((utility) => (
          <article key={utility.id} className="rounded-[24px] bg-white/75 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {utility.accessLevel}
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight">{utility.name}</h3>
              </div>
              <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold">
                {utility.reviewStatus}
              </span>
            </div>
            <p className="mt-3 text-sm dense-copy">{utility.purpose}</p>
            <div className="mt-4 rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
              <p className="font-semibold">Redacted key reference</p>
              <p className="mt-2 mono text-xs">{utility.keyReference}</p>
            </div>
            <p className="mt-4 text-sm dense-copy">{utility.note}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              Owner {utility.owner}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
