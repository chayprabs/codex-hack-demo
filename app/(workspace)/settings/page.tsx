import { ExposureSurfacePanel } from "@/components/settings/exposure-surface-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { settingsSections } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Settings"
          title="Workspace controls and demo-safe posture"
          description="These settings look production-shaped, but every value is local, fake, and intentionally friendly for audits."
        />
      </section>
      <div className="grid gap-4 xl:grid-cols-3">
        {settingsSections.map((section) => (
          <article key={section.id} className="panel rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {section.status}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{section.title}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm dense-copy">{section.summary}</p>
            <div className="mt-5 space-y-3">
              {section.items.map((item) => (
                <div key={item.label} className="rounded-[22px] bg-white/75 p-4">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-2 text-lg font-black">{item.value}</p>
                  {item.note ? <p className="mt-2 text-sm dense-copy">{item.note}</p> : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <ExposureSurfacePanel />
    </div>
  );
}
