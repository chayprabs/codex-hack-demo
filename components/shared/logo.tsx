import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="metric-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff7a59,#0ea5a4)] text-sm font-black text-white shadow-lg">
        RL
      </span>
      {!compact ? (
        <span>
          <span className="block text-lg font-black tracking-tight">Relaylane</span>
          <span className="block text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            Demo Command Center
          </span>
        </span>
      ) : null}
    </Link>
  );
}
