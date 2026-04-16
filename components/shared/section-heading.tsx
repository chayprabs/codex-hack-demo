interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        <p className="mt-3 dense-copy">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
