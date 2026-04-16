import Link from "next/link";
import { Pill } from "@/components/shared/pill";
import { formatCurrency } from "@/lib/format";
import { getUserById, projects } from "@/lib/demo-data";

export function ProjectRadar() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {projects.map((project) => {
        const owner = getUserById(project.ownerId);

        return (
          <article key={project.id} className="panel rounded-[28px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {project.client}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{project.name}</h3>
                <p className="mt-2 text-sm dense-copy">{project.summary}</p>
              </div>
              <Pill tone={project.health} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  Budget
                </p>
                <p className="mt-2 text-xl font-black">{formatCurrency(project.budget)}</p>
              </div>
              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  Progress
                </p>
                <p className="mt-2 text-xl font-black">{project.progress}%</p>
              </div>
              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  Owner
                </p>
                <p className="mt-2 text-xl font-black">{owner?.initials}</p>
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(20,33,61,0.08)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff7a59,#0ea5a4)]"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-[var(--ink-soft)]">{project.nextMilestone}</span>
              <Link
                href={`/projects/${project.id}`}
                className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white"
              >
                View project
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
