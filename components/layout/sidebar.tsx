"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { appNavigation } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="panel grid-halo flex h-full flex-col rounded-[32px] p-5">
      <div className="relative z-10">
        <Logo />
      </div>
      <nav className="relative z-10 mt-10 space-y-2">
        {appNavigation.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[var(--foreground)] text-white shadow-lg"
                  : "bg-white/60 text-[var(--foreground)] hover:bg-white"
              }`}
            >
              <span>{item.label}</span>
              <span className="mono text-xs">{active ? "live" : "open"}</span>
            </Link>
          );
        })}
      </nav>
      <div className="relative z-10 mt-auto rounded-[24px] bg-[linear-gradient(135deg,rgba(255,122,89,0.18),rgba(14,165,164,0.18))] p-4">
        <p className="text-sm font-bold">Hackathon-ready workspace</p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Looks like a real startup product, but every risky clue is fixture-backed and
          clearly marked for safe audits.
        </p>
      </div>
    </aside>
  );
}
