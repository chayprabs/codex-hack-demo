import Link from "next/link";
import { auditCategories, auditManifest } from "@/lib/audit-manifest";

export function FixtureCallout() {
  return (
    <aside className="panel panel-strong rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            TrustLayer demo layer
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight">
            {auditManifest.findings.length} seeded findings across{" "}
            {auditCategories.length} categories
          </h3>
        </div>
        <span className="rounded-full bg-[rgba(14,165,164,0.14)] px-3 py-1 text-xs font-bold text-[var(--teal)]">
          Safe fixtures only
        </span>
      </div>
      <p className="mt-3 text-sm text-[var(--ink-soft)]">
        Evidence lives under <span className="mono">audit-fixtures/</span> and in
        disabled snippet files so an audit product can surface deterministic findings
        without exposing a real exploit path.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {auditCategories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-[var(--line)] bg-white/75 px-3 py-1 text-xs font-semibold"
          >
            {category}
          </span>
        ))}
      </div>
      <Link
        href="/admin"
        className="mt-5 inline-flex rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
      >
        Review admin view
      </Link>
    </aside>
  );
}
