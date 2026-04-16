import { SectionHeading } from "@/components/shared/section-heading";
import { activityLog, getUserById } from "@/lib/demo-data";

export default function ActivityPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Activity"
          title="Operational timeline"
          description="A lightweight feed of team movement, audit refreshes, and launch events built from local mock data."
        />
      </section>
      <section className="panel rounded-[28px] p-5">
        <div className="space-y-3">
          {activityLog.map((event) => {
            const actor = getUserById(event.actorId);

            return (
              <article key={event.id} className="rounded-[22px] bg-white/75 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                      {event.kind}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight">{event.title}</h3>
                  </div>
                  <span className="rounded-full bg-[var(--surface-muted)] px-4 py-2 text-sm font-semibold">
                    {event.happenedAt}
                  </span>
                </div>
                <p className="mt-3 text-sm dense-copy">{event.detail}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  {actor?.name} · {actor?.team}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
