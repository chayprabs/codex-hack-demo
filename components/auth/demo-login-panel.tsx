"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/lib/demo-data";

export function DemoLoginPanel() {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? "");
  const [email, setEmail] = useState(users[0]?.email ?? "");

  const activeUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? users[0],
    [selectedUserId],
  );

  return (
    <div className="panel panel-strong rounded-[32px] p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Fake sign-in only</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight">Choose a demo persona</h2>
          <p className="mt-3 max-w-xl dense-copy">
            This form never creates a real session. It just routes you into the local
            mock workspace using pre-seeded demo identities.
          </p>
        </div>
        <div className="rounded-3xl bg-[rgba(14,165,164,0.12)] px-4 py-3 text-sm font-semibold text-[var(--teal)]">
          Local-only persona switch
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {users.map((user) => {
          const selected = user.id === selectedUserId;

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                setSelectedUserId(user.id);
                setEmail(user.email);
              }}
              className={`rounded-[24px] border p-4 text-left transition ${
                selected
                  ? "border-transparent bg-[var(--foreground)] text-white shadow-lg"
                  : "border-[var(--line)] bg-white/80 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-black tracking-tight">{user.name}</p>
                  <p className={`text-sm ${selected ? "text-white/80" : "text-[var(--ink-soft)]"}`}>
                    {user.role}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    selected ? "bg-white/16 text-white" : "bg-[var(--surface-muted)]"
                  }`}
                >
                  {user.team}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--ink-soft)]">
            Demo email
          </span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            placeholder="persona@demo.local"
          />
        </label>
        <div className="rounded-[24px] bg-[var(--surface-muted)] p-4 text-sm">
          <p className="font-semibold">Selected persona</p>
          <p className="mt-2 text-lg font-black">{activeUser?.name}</p>
          <p className="mt-1 text-[var(--ink-soft)]">{activeUser?.location}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => router.push(`/dashboard?persona=${selectedUserId}`)}
          className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
        >
          Continue to dashboard
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold"
        >
          Back to landing
        </button>
      </div>
    </div>
  );
}
