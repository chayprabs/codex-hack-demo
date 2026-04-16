import { auditManifest } from "@/lib/audit-manifest";

export function ShameWallPanel() {
  const dramaticFindings = auditManifest.findings
    .filter((finding) => finding.severity === "High")
    .slice(0, 3);

  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Shame wall preview
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {dramaticFindings.map((finding) => (
          <article
            key={finding.id}
            className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,122,89,0.12),rgba(255,255,255,0.88))] p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {finding.id}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight">{finding.title}</h3>
            <p className="mt-3 text-sm dense-copy">{finding.notes_for_demo}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              {finding.category}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
