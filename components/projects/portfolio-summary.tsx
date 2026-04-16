import { EmptyState } from "@/components/shared/empty-state";
import { projects } from "@/lib/demo-data";

export function PortfolioSummary() {
  const onTrack = projects.filter((project) => project.status === "On track").length;
  const needsReview = projects.filter(
    (project) => project.status === "Needs review",
  ).length;
  const queued = projects.filter((project) => project.status === "Queued").length;

  return (
    <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">On track</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{onTrack}</p>
          <p className="mt-2 text-sm dense-copy">Clear launch lanes with healthy pacing.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Needs review</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{needsReview}</p>
          <p className="mt-2 text-sm dense-copy">Good candidates for access, auth, and webhook narration.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Queued / pilot</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{queued}</p>
          <p className="mt-2 text-sm dense-copy">Internal-only lanes that keep the demo safely sandboxed.</p>
        </article>
      </div>
      <EmptyState
        eyebrow="No hidden tenants"
        title="Portfolio data stays explainable on stage"
        body="Every workstream has a clear owner, milestone, and client scope, but none of them fetches a real tenant dataset or privileged artifact. That makes the portfolio look rich without creating a live access risk."
      />
    </section>
  );
}
