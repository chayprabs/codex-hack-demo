import { ProjectTable } from "@/components/projects/project-table";
import { Pill } from "@/components/shared/pill";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/lib/demo-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Projects"
          title="Client launch portfolio"
          description="A realistic mix of active, queued, and at-risk workstreams designed to make repo mapping and dashboard exploration feel rich."
        />
      </section>
      <ProjectTable />
      <section className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="panel rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {project.vertical}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{project.name}</h3>
              </div>
              <Pill tone={project.health} />
            </div>
            <p className="mt-3 text-sm dense-copy">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.squad.map((lane) => (
                <span
                  key={lane}
                  className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold"
                >
                  {lane}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
