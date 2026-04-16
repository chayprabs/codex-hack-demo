import { projectAccessSurfaces } from "@/lib/audit-demo-data";

export function AccessReviewPanel({ projectId }: { projectId: string }) {
  const surface = projectAccessSurfaces.find((item) => item.projectId === projectId);

  if (!surface) {
    return null;
  }

  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Access review lens
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[24px] bg-white/75 p-5">
          <p className="text-sm font-semibold">Resource handle</p>
          <p className="mt-2 mono text-sm">{surface.resourceHandle}</p>
          <p className="mt-4 text-sm font-semibold">Client scope</p>
          <p className="mt-2 mono text-sm">{surface.clientScope}</p>
          <p className="mt-4 text-sm font-semibold">Share mode</p>
          <p className="mt-2 text-sm dense-copy">{surface.shareMode}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {surface.likelyRoutes.map((route) => (
              <span
                key={route}
                className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold"
              >
                {route}
              </span>
            ))}
          </div>
        </article>
        <article className="rounded-[24px] bg-[var(--surface-muted)] p-5">
          <p className="text-sm font-semibold">Why this route is good demo material</p>
          <p className="mt-3 text-sm dense-copy">{surface.narration}</p>
          <p className="mt-4 text-sm font-semibold">Safe control</p>
          <p className="mt-3 text-sm dense-copy">{surface.safeControl}</p>
        </article>
      </div>
    </section>
  );
}
