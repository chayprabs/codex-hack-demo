import { EmptyState } from "@/components/shared/empty-state";
import { integrations } from "@/lib/demo-data";

export function IntegrationPosturePanel() {
  const connected = integrations.filter(
    (integration) => integration.status === "Connected",
  ).length;
  const sandbox = integrations.filter(
    (integration) => integration.status === "Sandbox",
  ).length;

  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Connected lanes</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{connected}</p>
          <p className="mt-2 text-sm dense-copy">Operational mirrors that keep the workspace feeling alive.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Sandbox mirrors</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{sandbox}</p>
          <p className="mt-2 text-sm dense-copy">Great for demo posture because they imply structure without requiring providers.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Webhook story</p>
          <p className="mt-2 text-4xl font-black tracking-tight">1</p>
          <p className="mt-2 text-sm dense-copy">Clear replay-ready route with fixture-only acceptance.</p>
        </article>
      </div>
      <EmptyState
        eyebrow="No live providers required"
        title="Integration posture feels production-shaped without deployment risk"
        body="Relaylane surfaces environments, scopes, sync cadence, and webhook posture so TrustLayer can tell a real integration story while the runtime stays local and deterministic."
      />
    </section>
  );
}
