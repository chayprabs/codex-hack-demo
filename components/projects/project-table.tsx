import Link from "next/link";
import { Pill } from "@/components/shared/pill";
import { formatCurrency } from "@/lib/format";
import { getUserById, projects } from "@/lib/demo-data";

export function ProjectTable() {
  return (
    <div className="panel overflow-hidden rounded-[28px]">
      <div className="grid grid-cols-[1.7fr_1.05fr_0.8fr_0.9fr_1fr_0.7fr] gap-4 border-b border-[var(--line)] px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        <span>Project</span>
        <span>Owner</span>
        <span>Health</span>
        <span>Budget</span>
        <span>Milestone</span>
        <span />
      </div>
      <div className="divide-y divide-[var(--line)]">
        {projects.map((project) => {
          const owner = getUserById(project.ownerId);

          return (
            <div
              key={project.id}
              className="grid grid-cols-[1.7fr_1.05fr_0.8fr_0.9fr_1fr_0.7fr] gap-4 px-5 py-4 text-sm"
            >
              <div>
                <p className="font-black tracking-tight">{project.name}</p>
                <p className="mt-1 text-[var(--ink-soft)]">{project.client}</p>
                <p className="mt-1 mono text-xs text-[var(--ink-soft)]">
                  {project.resourceHandle}
                </p>
              </div>
              <div>
                <p className="font-semibold">{owner?.name}</p>
                <p className="mt-1 text-[var(--ink-soft)]">{project.status}</p>
              </div>
              <div className="self-center">
                <Pill tone={project.health} />
              </div>
              <div className="self-center font-semibold">{formatCurrency(project.budget)}</div>
              <div className="self-center text-[var(--ink-soft)]">{project.nextMilestone}</div>
              <div className="self-center text-right">
                <Link
                  href={`/projects/${project.id}`}
                  className="rounded-full border border-[var(--line)] bg-white px-4 py-2 font-semibold"
                >
                  Open
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
