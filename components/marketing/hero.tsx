import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { dashboardHighlights, projects } from "@/lib/demo-data";

export function Hero() {
  return (
    <div className="page-shell py-6 md:py-10">
      <div className="panel grid-halo overflow-hidden rounded-[36px] px-6 py-6 md:px-10 md:py-8">
        <div className="relative z-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Logo />
            <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              <Link href="#product" className="rounded-full px-4 py-2 hover:bg-white/70">
                Product
              </Link>
              <Link href="#audit" className="rounded-full px-4 py-2 hover:bg-white/70">
                Audit layer
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full bg-[var(--foreground)] px-4 py-2 text-white transition hover:bg-[var(--accent-strong)]"
              >
                Open demo
              </Link>
            </nav>
          </header>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="eyebrow">Safe TrustLayer demo repo</span>
              <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-[-0.04em] text-[var(--foreground)] md:text-7xl">
                A vibe-coded launch workspace with seeded audit evidence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg dense-copy">
                Relaylane looks like the command center for a real startup operations
                team, but every risky clue is deterministic, disabled, and safe for a
                live TrustLayer product demo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                >
                  Enter workspace
                </Link>
                <Link
                  href="#audit"
                  className="rounded-full border border-[var(--line-strong)] bg-white/70 px-6 py-3 text-sm font-semibold transition hover:bg-white"
                >
                  Explore audit fixtures
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {dashboardHighlights.map((item) => (
                <article key={item.label} className="panel panel-strong rounded-[28px] p-5">
                  <div
                    className={`mb-4 h-2 rounded-full bg-gradient-to-r ${item.accent}`}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight">{item.value}</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.delta}</p>
                </article>
              ))}
            </div>
          </div>

          <section
            id="product"
            className="mt-12 grid gap-4 border-t border-[var(--line)] pt-8 lg:grid-cols-[1fr_320px]"
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <article key={project.id} className="panel panel-strong rounded-[28px] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    {project.client}
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">{project.name}</h2>
                  <p className="mt-3 text-sm dense-copy">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <aside id="audit" className="panel rounded-[28px] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                Why it demos well
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
                <li>Medium-sized repo shape with pages, APIs, settings, admin, and data.</li>
                <li>Deterministic seeded findings in manifest, cases, snippets, and evidence.</li>
                <li>No real auth provider, payment provider, secrets, or external services.</li>
                <li>Safe webhook and session routes that only handle demo-local fixtures.</li>
              </ul>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}
