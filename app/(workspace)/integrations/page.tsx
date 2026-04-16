import { IntegrationGrid } from "@/components/integrations/integration-grid";
import { WebhookLanePanel } from "@/components/integrations/webhook-lane-panel";
import { SectionHeading } from "@/components/shared/section-heading";

export default function IntegrationsPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Integrations"
          title="Connected tools, sandbox syncs, and webhook posture"
          description="Integration cards feel realistic, but the entire surface is local-only and webhook processing is locked to fixture replays."
        />
      </section>
      <IntegrationGrid />
      <WebhookLanePanel />
      <section className="panel rounded-[28px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Inbound webhook policy
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[24px] bg-white/75 p-5 text-sm dense-copy">
            The demo route at <span className="mono">/api/webhooks/provider</span> only
            accepts deterministic local fixture headers and mock payloads. Unsafe webhook
            handling examples live in disabled snippets and markdown case files inside{" "}
            <span className="mono">audit-fixtures/</span>.
          </div>
          <div className="rounded-[24px] bg-[var(--surface-muted)] p-5 text-sm">
            <p className="font-semibold">Fixture headers</p>
            <p className="mt-3 mono">x-demo-source: fixture-runner</p>
            <p className="mt-2 mono">x-demo-signature: fixture-safe-demo</p>
          </div>
        </div>
      </section>
    </div>
  );
}
