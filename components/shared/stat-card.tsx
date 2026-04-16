import { formatCompact } from "@/lib/format";

interface StatCardProps {
  label: string;
  value: number;
  delta: string;
  accent: string;
}

export function StatCard({ label, value, delta, accent }: StatCardProps) {
  return (
    <article className="panel panel-strong overflow-hidden p-5">
      <div
        className={`mb-6 h-2 rounded-full bg-gradient-to-r ${accent}`}
        aria-hidden="true"
      />
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black tracking-tight">{formatCompact(value)}</p>
      <p className="mt-3 text-sm text-[var(--ink-soft)]">{delta}</p>
    </article>
  );
}
