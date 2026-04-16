import { exposureSurfaces } from "@/lib/audit-demo-data";

export function ExposureSurfacePanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Frontend and config exposure surfaces
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {exposureSurfaces.map((surface) => (
          <article key={surface.id} className="rounded-[24px] bg-white/75 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {surface.audience}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight">{surface.title}</h3>
            <p className="mt-3 text-sm dense-copy">{surface.whyItFeelsReal}</p>
            <div className="mt-4 rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
              <p className="font-semibold">Example</p>
              <p className="mt-2 dense-copy">{surface.example}</p>
            </div>
            <p className="mt-4 text-sm dense-copy">{surface.safeNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
