import { Pill } from "@/components/shared/pill";
import { integrations } from "@/lib/demo-data";

export function IntegrationGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {integrations.map((integration) => (
        <article key={integration.id} className="panel rounded-[28px] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                {integration.category} · {integration.environment}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">{integration.name}</h3>
              <p className="mt-3 text-sm dense-copy">{integration.description}</p>
            </div>
            <Pill tone={integration.syncHealth} label={integration.status} />
          </div>
          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold">Scopes</p>
            <div className="flex flex-wrap gap-2">
              {integration.scopes.map((scope) => (
                <span
                  key={scope}
                  className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold"
                >
                  {scope}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="text-[var(--ink-soft)]">Owner: {integration.owner}</span>
            <span className="mono rounded-full bg-[var(--surface-muted)] px-3 py-1">
              Last sync {integration.lastSync}
            </span>
          </div>
          <div className="mt-4 rounded-[22px] bg-[var(--surface-muted)] p-4 text-sm dense-copy">
            {integration.scenarioHook}
          </div>
        </article>
      ))}
    </div>
  );
}
