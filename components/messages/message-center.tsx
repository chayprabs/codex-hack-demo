import { getProjectById, getUserById, messageThreads } from "@/lib/demo-data";

export function MessageCenter() {
  return (
    <div className="space-y-4">
      {messageThreads.map((thread) => {
        const project = thread.projectId ? getProjectById(thread.projectId) : undefined;

        return (
          <article key={thread.id} className="panel rounded-[28px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {thread.channel}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{thread.topic}</h3>
                <p className="mt-2 text-sm dense-copy">
                  {project
                    ? `Anchored to ${project.name} for ${project.client}.`
                    : "General workspace thread."}
                </p>
              </div>
              <div className="rounded-full bg-[var(--surface-muted)] px-4 py-2 text-sm font-semibold">
                {thread.unreadCount} unread
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {thread.messages.map((message) => {
                const sender = getUserById(message.senderId);

                return (
                  <div key={message.id} className="rounded-[22px] bg-white/75 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{sender?.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                        {message.sentAt}
                      </p>
                    </div>
                    <p className="mt-2 text-sm dense-copy">{message.body}</p>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
