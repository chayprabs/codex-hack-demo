import { healthToneLabel } from "@/lib/format";
import type { HealthTone } from "@/lib/types";

interface PillProps {
  tone?: HealthTone;
  label?: string;
}

export function Pill({ tone = "stable", label }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
      <span className="status-dot" data-tone={tone} />
      {label ?? healthToneLabel(tone)}
    </span>
  );
}
