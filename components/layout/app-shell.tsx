import Link from "next/link";
import { FixtureCallout } from "@/components/audit/fixture-callout";
import { Sidebar } from "@/components/layout/sidebar";
import { demoWorkspace } from "@/lib/demo-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-scaffold">
      <Sidebar />
      <div className="flex min-w-0 flex-col gap-4">
        <header className="panel panel-strong flex flex-col gap-4 rounded-[32px] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {demoWorkspace.plan}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              {demoWorkspace.name} workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
              {demoWorkspace.slogan} This is a fake-local sandbox with seeded TrustLayer
              artifacts, not a production environment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold">
              {demoWorkspace.auditMode}
            </span>
            <Link
              href="/sign-in"
              className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Switch demo user
            </Link>
          </div>
        </header>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <main className="min-w-0 space-y-4">{children}</main>
          <div className="space-y-4">
            <FixtureCallout />
            <section className="panel rounded-[24px] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                Demo promise
              </p>
              <h3 className="mt-2 text-xl font-black">No live secrets. No real auth.</h3>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                The runtime only serves mock local data. Any risky pattern is isolated to
                non-executable fixture files and replay notes for demos.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
