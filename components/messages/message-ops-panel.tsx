import { EmptyState } from "@/components/shared/empty-state";
import { messageThreads } from "@/lib/demo-data";

export function MessageOpsPanel() {
  const unreadThreads = messageThreads.filter((thread) => thread.unreadCount > 0).length;

  return (
    <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Active threads</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{messageThreads.length}</p>
          <p className="mt-2 text-sm dense-copy">Launch, risk, and exec lanes stay visible.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Unread lanes</p>
          <p className="mt-2 text-4xl font-black tracking-tight">{unreadThreads}</p>
          <p className="mt-2 text-sm dense-copy">Enough motion to feel real without turning noisy.</p>
        </article>
        <article className="panel rounded-[24px] p-5">
          <p className="text-sm font-semibold">Escalation posture</p>
          <p className="mt-2 text-4xl font-black tracking-tight">Stable</p>
          <p className="mt-2 text-sm dense-copy">No hidden incidents outside seeded review areas.</p>
        </article>
      </div>
      <EmptyState
        eyebrow="No surprise threads"
        title="War-room copy stays coherent and audit-friendly"
        body="The thread list makes the app feel inhabited, but each message is local-only and intentionally scoped so findings map cleanly to visible workstreams rather than improvised filler."
      />
    </section>
  );
}
