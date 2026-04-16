import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <div className="panel panel-strong max-w-xl rounded-[32px] p-8 text-center">
        <span className="eyebrow">Missing route</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight">That demo view does not exist.</h1>
        <p className="mt-4 dense-copy">
          The repo ships with a fixed set of local pages and seeded fixtures. Try heading
          back to the dashboard to continue the walkthrough.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
