import { DemoLoginPanel } from "@/components/auth/demo-login-panel";
import { TrustBoundaryPanel } from "@/components/auth/trust-boundary-panel";
import { Logo } from "@/components/shared/logo";

export default function SignInPage() {
  return (
    <div className="page-shell py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <section className="panel grid-halo rounded-[32px] p-6 md:p-8">
          <div className="relative z-10">
            <Logo />
            <span className="eyebrow mt-8">Demo onboarding</span>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.04em]">
              Step into the workspace in under a minute.
            </h1>
            <p className="mt-5 text-lg dense-copy">
              Relaylane does not use a live identity provider. Demo users are local-only
              personas that help judges explore different dashboards, settings, and admin
              states without any setup friction.
            </p>
            <div className="mt-8 space-y-3 rounded-[28px] bg-white/75 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                What makes this safe
              </p>
              <ul className="space-y-3 text-sm dense-copy">
                <li>No passwords, OAuth flows, or real sessions are created.</li>
                <li>Every persona maps to mock local data only.</li>
                <li>Seeded audit evidence stays in manifest and fixture files, not runtime logic.</li>
              </ul>
            </div>
          </div>
        </section>
        <DemoLoginPanel />
      </div>
      <div className="mt-6">
        <TrustBoundaryPanel />
      </div>
    </div>
  );
}
