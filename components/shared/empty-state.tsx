interface EmptyStateProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function EmptyState({ eyebrow, title, body }: EmptyStateProps) {
  return (
    <article className="rounded-[24px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-black tracking-tight">{title}</h3>
      <p className="mt-3 text-sm dense-copy">{body}</p>
    </article>
  );
}
