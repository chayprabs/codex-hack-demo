import Link from "next/link";
import { AuditRoomPreview } from "@/components/dashboard/audit-room-preview";
import { ProjectRadar } from "@/components/dashboard/project-radar";
import { Scoreboard } from "@/components/dashboard/scoreboard";
import { SectionHeading } from "@/components/shared/section-heading";
import { activityLog, messageThreads } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Overview"
          title="Launch command center"
          description="Track project health, unread war-room activity, and seeded audit signals from the same demo workspace."
          action={
            <Link
              href="/projects"
              className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white"
            >
              Review portfolio
            </Link>
          }
        />
      </section>
      <Scoreboard />
      <AuditRoomPreview />
      <ProjectRadar />
      <div className="grid gap-4 xl:grid-cols-2">
        <section className="panel rounded-[28px] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Activity pulse
          </p>
          <div className="mt-4 space-y-3">
            {activityLog.map((event) => (
              <article key={event.id} className="rounded-[22px] bg-white/75 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black tracking-tight">{event.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    {event.happenedAt}
                  </span>
                </div>
                <p className="mt-2 text-sm dense-copy">{event.detail}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="panel rounded-[28px] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Message watchlist
          </p>
          <div className="mt-4 space-y-3">
            {messageThreads.map((thread) => (
              <article key={thread.id} className="rounded-[22px] bg-white/75 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black tracking-tight">{thread.channel}</h3>
                  <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold">
                    {thread.unreadCount} unread
                  </span>
                </div>
                <p className="mt-2 text-sm dense-copy">{thread.topic}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  Last update {thread.lastMessageAt}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
