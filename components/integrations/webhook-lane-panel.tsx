import { webhookLanes } from "@/lib/audit-demo-data";

export function WebhookLanePanel() {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        Webhook lanes
      </p>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {webhookLanes.map((lane) => (
          <article key={lane.id} className="rounded-[24px] bg-white/75 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {lane.endpoint}
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight">{lane.name}</h3>
              </div>
              <span className="rounded-full bg-[rgba(14,165,164,0.14)] px-3 py-1 text-xs font-bold text-[var(--teal)]">
                {lane.verificationMode}
              </span>
            </div>
            <p className="mt-3 text-sm dense-copy">{lane.narration}</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
                <p className="font-semibold">Fixture headers</p>
                <div className="mt-3 space-y-2">
                  {lane.fixtureHeaders.map((header) => (
                    <p key={header} className="mono text-xs">
                      {header}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm">
                <p className="font-semibold">Recent demo events</p>
                <div className="mt-3 space-y-2">
                  {lane.recentEvents.map((event) => (
                    <p key={event} className="mono text-xs">
                      {event}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              Owner {lane.owner}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
