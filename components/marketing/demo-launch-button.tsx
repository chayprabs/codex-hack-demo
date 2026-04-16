"use client";

import type { Route } from "next";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createDemoAudit } from "@/lib/api";

export function DemoLaunchButton() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLaunch() {
    if (isLaunching) {
      return;
    }

    setIsLaunching(true);
    setError(null);

    try {
      const audit = await createDemoAudit();
      const openUrl = audit.open_url ?? `/audit/${audit.audit_id}`;

      startTransition(() => {
        router.push(openUrl as Route);
      });
    } catch (launchError) {
      setError(
        launchError instanceof Error
          ? launchError.message
          : "Unable to start the demo audit right now.",
      );
      setIsLaunching(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleLaunch}
        disabled={isLaunching}
        className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-wait disabled:opacity-80"
        aria-busy={isLaunching}
      >
        {isLaunching ? "Launching audit room..." : "Try demo app"}
      </button>
      <p className="max-w-sm text-sm text-[var(--ink-soft)]">
        Starts a seeded demo audit against the configured repo target, then drops you
        into the live audit room.
      </p>
      {error ? (
        <p className="max-w-md rounded-[20px] border border-[rgba(224,93,116,0.28)] bg-[rgba(224,93,116,0.08)] px-4 py-3 text-sm text-[var(--foreground)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
