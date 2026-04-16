import { Pill } from "@/components/shared/pill";
import { formatCurrency } from "@/lib/format";
import { getUserById } from "@/lib/demo-data";
import type { Project } from "@/lib/types";

export function ProjectDetailHero({ project }: { project: Project }) {
  const owner = getUserById(project.ownerId);

  return (
    <section className="panel panel-strong rounded-[32px] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            {project.client} · {project.vertical}
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">{project.name}</h2>
          <p className="mt-4 dense-copy">{project.summary}</p>
        </div>
        <Pill tone={project.health} label={project.status} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Owner
          </p>
          <p className="mt-2 text-xl font-black">{owner?.name}</p>
        </div>
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Budget
          </p>
          <p className="mt-2 text-xl font-black">{formatCurrency(project.budget)}</p>
        </div>
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Open tasks
          </p>
          <p className="mt-2 text-xl font-black">{project.openTasks}</p>
        </div>
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Launch window
          </p>
          <p className="mt-2 text-xl font-black">{project.launchWindow}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Resource handle
          </p>
          <p className="mt-2 mono text-sm">{project.resourceHandle}</p>
        </div>
        <div className="rounded-[24px] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Viewer policy
          </p>
          <p className="mt-2 text-sm dense-copy">{project.viewerPolicy}</p>
          <p className="mt-2 mono text-xs">{project.clientSpace}</p>
        </div>
      </div>
    </section>
  );
}
