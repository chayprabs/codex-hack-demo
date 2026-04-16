import { notFound } from "next/navigation";
import { AccessReviewPanel } from "@/components/projects/access-review-panel";
import { ProjectDetailHero } from "@/components/projects/project-detail-hero";
import { getProjectById, projects } from "@/lib/demo-data";

export function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <ProjectDetailHero project={project} />
      <AccessReviewPanel projectId={project.id} />
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="panel rounded-[28px] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Delivery checklist
          </p>
          <div className="mt-4 space-y-3">
            {project.checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-[22px] bg-white/75 p-4"
              >
                <span className="font-semibold">{item.label}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.done
                      ? "bg-[rgba(14,165,164,0.14)] text-[var(--teal)]"
                      : "bg-[rgba(226,166,44,0.16)] text-[#8b5e00]"
                  }`}
                >
                  {item.done ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <article className="panel rounded-[28px] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              Known blockers
            </p>
            <div className="mt-4 space-y-3">
              {project.blockers.map((blocker) => (
                <div key={blocker} className="rounded-[22px] bg-white/75 p-4 text-sm dense-copy">
                  {blocker}
                </div>
              ))}
            </div>
          </article>
          <article className="panel rounded-[28px] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              Recent updates
            </p>
            <div className="mt-4 space-y-3">
              {project.updates.map((update) => (
                <div key={update} className="rounded-[22px] bg-white/75 p-4 text-sm dense-copy">
                  {update}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
