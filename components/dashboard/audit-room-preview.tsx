import Link from "next/link";
import { auditManifest } from "@/lib/audit-manifest";

export function AuditRoomPreview() {
  const featured = auditManifest.findings
    .filter((finding) => finding.severity === "High")
    .slice(0, 3);

  return (
    <section className="panel rounded-[28px] p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Audit room preview
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">
            High-signal findings already mapped to visible product surfaces
          </h2>
        </div>
        <Link
          href="/admin"
          className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white"
        >
          Open audit room
        </Link>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {featured.map((finding) => (
          <article key={finding.id} className="rounded-[24px] bg-white/75 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {finding.id}
            </p>
            <h3 className="mt-2 text-lg font-black tracking-tight">{finding.title}</h3>
            <p className="mt-3 text-sm dense-copy">{finding.impact_summary}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              Evidence {finding.evidence_file}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
