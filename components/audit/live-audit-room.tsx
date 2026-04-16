"use client";

import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { fetchAudit, subscribeToAuditStream } from "@/lib/api";
import { SectionHeading } from "@/components/shared/section-heading";
import type {
  AuditAgentState,
  AuditDetail,
  AuditStatus,
  AuditStreamEvent,
} from "@/lib/types";

type BootState = "loading" | "ready" | "error";
type StreamState = "connecting" | "live" | "recovering" | "complete";

function formatStamp(value?: string) {
  if (!value) {
    return "Waiting";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function formatElapsed(value: number) {
  return `${(value / 1000 || 0).toFixed(1)}s`;
}

function titleCase(value: string) {
  return value.replace(/[-_.]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function statusClasses(status: string) {
  switch (status) {
    case "completed":
      return "bg-[rgba(14,165,164,0.14)] text-[var(--teal)]";
    case "running":
    case "scanning":
      return "bg-[rgba(59,130,246,0.12)] text-[#2455d6]";
    case "evidence-linked":
      return "bg-[rgba(226,166,44,0.16)] text-[#8b5e00]";
    case "failed":
      return "bg-[rgba(224,93,116,0.16)] text-[var(--rose)]";
    default:
      return "bg-[var(--surface-muted)] text-[var(--ink-soft)]";
  }
}

function severityClasses(severity: string) {
  switch (severity) {
    case "Critical":
      return "bg-[rgba(224,93,116,0.18)] text-[var(--rose)]";
    case "High":
      return "bg-[rgba(255,122,89,0.18)] text-[var(--accent-strong)]";
    case "Medium":
      return "bg-[rgba(226,166,44,0.16)] text-[#8b5e00]";
    default:
      return "bg-[rgba(14,165,164,0.14)] text-[var(--teal)]";
  }
}

function connectionCopy(streamState: StreamState) {
  switch (streamState) {
    case "live":
      return "Live stream connected";
    case "recovering":
      return "Reconnecting to stream";
    case "complete":
      return "Stream complete";
    default:
      return "Connecting to stream";
  }
}

function computeProgress(audit: AuditDetail) {
  if (audit.status === "completed") {
    return 100;
  }

  const totalAgents = Math.max(audit.agents.length, 1);
  const completedAgents = audit.agents.filter((agent) => agent.status === "completed").length;
  const base = 12 + Math.round((completedAgents / totalAgents) * 58);
  const findingLift = Math.min(audit.finding_count * 4, 16);
  const reportLift = audit.report ? 16 : 0;

  return Math.min(base + findingLift + reportLift, 94);
}

function describeEvent(event: AuditStreamEvent) {
  switch (event.type) {
    case "audit.created":
      return "Audit created for the configured demo repo target.";
    case "audit.started":
      return "Demo audit runner claimed the job and opened the live session.";
    case "audit.mode.selected":
      return "Seeded demo mode locked the deterministic review path.";
    case "repo.seeded":
      return "Repo fingerprint and seeded trace plan were attached to the run.";
    case "agent.status": {
      const agentName =
        typeof event.data.agent_name === "string" ? event.data.agent_name : "Agent";
      const note = typeof event.data.note === "string" ? event.data.note : "Updated status.";
      return `${agentName}: ${note}`;
    }
    case "finding.created": {
      const finding = event.data.finding;

      if (finding && typeof finding === "object" && "title" in finding) {
        return String(finding.title);
      }

      return "A finding was added to the report.";
    }
    case "score.updated": {
      const current = typeof event.data.current === "number" ? event.data.current : 0;
      const delta = typeof event.data.delta === "number" ? event.data.delta : 0;
      return `TrustScore updated to ${current} (${delta >= 0 ? "+" : ""}${delta}).`;
    }
    case "coverage.updated":
      return "Coverage and verification notes were refreshed.";
    case "report.ready":
      return "Evidence bundle, replay vault, and final report state are ready.";
    case "audit.completed":
      return "Audit completed with a clean final report state.";
    case "audit.pending":
      return "Audit is waiting for the live agent pipeline.";
    default:
      return titleCase(event.type);
  }
}

function LoadingShell() {
  return (
    <div className="page-shell py-6 md:py-10">
      <div className="space-y-4">
        <section className="panel grid-halo overflow-hidden rounded-[36px] p-6 md:p-8">
          <div className="relative z-10 animate-pulse space-y-4">
            <div className="h-6 w-36 rounded-full bg-white/70" />
            <div className="h-14 max-w-2xl rounded-[28px] bg-white/75" />
            <div className="h-5 max-w-3xl rounded-full bg-white/60" />
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-28 rounded-[24px] bg-white/70" />
              ))}
            </div>
          </div>
        </section>
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="panel h-[420px] rounded-[32px] bg-white/70" />
          <section className="panel h-[420px] rounded-[32px] bg-white/70" />
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: AuditAgentState }) {
  return (
    <article className="rounded-[24px] bg-white/80 p-5 shadow-[0_18px_40px_rgba(20,33,61,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            {agent.specialty}
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight">{agent.agent_name}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(agent.status)}`}>
          {titleCase(agent.status)}
        </span>
      </div>
      <p className="mt-3 text-sm dense-copy">{agent.focus}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
          <p className="font-semibold">Confidence</p>
          <p className="mt-2">{titleCase(agent.confidence)}</p>
        </div>
        <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
          <p className="font-semibold">Elapsed</p>
          <p className="mt-2">{formatElapsed(agent.elapsed_ms)}</p>
        </div>
        <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
          <p className="font-semibold">Verification</p>
          <p className="mt-2">{titleCase(agent.verification_status)}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p className="dense-copy">{agent.last_note ?? "Queued for repo scan and evidence linking."}</p>
        <p className="dense-copy">
          Findings {agent.finding_ids.length ? agent.finding_ids.join(", ") : "Pending"}
        </p>
        <p className="dense-copy">
          Evidence {agent.evidence_collected.length} | Files {agent.files_inspected.length}
        </p>
      </div>
    </article>
  );
}

export function LiveAuditRoom({ auditId }: { auditId: string }) {
  const [bootState, setBootState] = useState<BootState>("loading");
  const [streamState, setStreamState] = useState<StreamState>("connecting");
  const [audit, setAudit] = useState<AuditDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<AuditStreamEvent[]>([]);
  const deferredEvents = useDeferredValue(events);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    const seenEventIds = new Set<string>();
    let lastStatus: AuditStatus | null = null;

    async function syncAudit() {
      const nextAudit = await fetchAudit(auditId);

      if (cancelled) {
        return;
      }

      startTransition(() => {
        setAudit(nextAudit);
        setBootState("ready");
        setError(null);
      });

      lastStatus = nextAudit.status;

      if (nextAudit.status === "completed") {
        setStreamState("complete");
      }
    }

    async function ingestEvent(event: AuditStreamEvent) {
      if (seenEventIds.has(event.id) || cancelled) {
        return;
      }

      seenEventIds.add(event.id);
      setStreamState("live");

      startTransition(() => {
        setEvents((current) => [event, ...current].slice(0, 40));
      });

      try {
        await syncAudit();
      } catch (syncError) {
        if (cancelled) {
          return;
        }

        setError(
          syncError instanceof Error
            ? syncError.message
            : "Unable to refresh the audit room.",
        );
      }
    }

    async function handleCompleted() {
      if (cancelled) {
        return;
      }

      setStreamState("complete");

      try {
        await syncAudit();
      } catch (syncError) {
        if (cancelled) {
          return;
        }

        setError(
          syncError instanceof Error
            ? syncError.message
            : "Unable to finalize the audit room state.",
        );
      }
    }

    async function boot() {
      setBootState("loading");
      setStreamState("connecting");
      setError(null);
      setEvents([]);

      try {
        await syncAudit();

        if (cancelled) {
          return;
        }

        unsubscribe = subscribeToAuditStream(auditId, {
          onAuditEvent: (event) => {
            void ingestEvent(event);
          },
          onCompleted: () => {
            void handleCompleted();
          },
          onError: () => {
            if (lastStatus !== "completed") {
              setStreamState("recovering");
            }
          },
        });
      } catch (bootError) {
        if (cancelled) {
          return;
        }

        setBootState("error");
        setStreamState("recovering");
        setError(
          bootError instanceof Error
            ? bootError.message
            : "Unable to load the audit room.",
        );
      }
    }

    void boot();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [auditId]);

  if (bootState === "loading" && !audit) {
    return <LoadingShell />;
  }

  if (!audit) {
    return (
      <div className="page-shell py-6 md:py-10">
        <section className="panel rounded-[32px] p-8">
          <SectionHeading
            eyebrow="Audit unavailable"
            title="This audit room could not be loaded."
            description={
              error ??
              "The audit may have expired, or the server may have restarted before the room opened."
            }
            action={
              <Link
                href="/"
                className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
              >
                Back to landing
              </Link>
            }
          />
        </section>
      </div>
    );
  }

  const completedAgents = audit.agents.filter((agent) => agent.status === "completed").length;
  const progress = computeProgress(audit);
  const scoreDelta = `${audit.score.delta >= 0 ? "+" : ""}${audit.score.delta}`;
  const highSeverityCount = audit.findings.filter(
    (finding) => finding.severity === "High" || finding.severity === "Critical",
  ).length;

  return (
    <div className="page-shell py-6 md:py-10">
      <div className="space-y-4">
        <section className="panel grid-halo overflow-hidden rounded-[36px] p-6 md:p-8">
          <div className="relative z-10">
            <SectionHeading
              eyebrow="Live TrustLayer audit"
              title={
                audit.status === "completed"
                  ? "Final report is ready for the seeded demo target."
                  : "Streaming a live demo audit with believable agent progress."
              }
              description="This room tracks the configured demo repo through deterministic agent review, finding generation, TrustScore movement, and final report assembly."
              action={
                <div className="flex flex-wrap gap-3">
                  <span className={`rounded-full px-4 py-2 text-sm font-semibold ${statusClasses(audit.status)}`}>
                    {titleCase(audit.status)}
                  </span>
                  <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold">
                    {connectionCopy(streamState)}
                  </span>
                </div>
              }
            />

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] bg-white/78 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                      Demo repo
                    </p>
                    <p className="mt-2 text-lg font-black tracking-tight">{audit.repo_url}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                      Audit id
                    </p>
                    <p className="mt-2 mono text-sm">{audit.audit_id}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,122,89,0.16),rgba(14,165,164,0.18))] p-5">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                        TrustScore
                      </p>
                      <p className="mt-2 text-5xl font-black tracking-[-0.04em]">
                        {audit.score.current}
                      </p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p className="text-sm font-semibold">{audit.score.label}</p>
                      <p className="text-sm dense-copy">
                        {scoreDelta} from {audit.score.before}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/60">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--gold),var(--teal))] transition-[width] duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm dense-copy">
                    {audit.mode === "demo"
                      ? "Seeded demo target locked. The room is replaying a deterministic evidence path with live-looking updates."
                      : "Normal audit path attached."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-[28px] bg-white/78 p-5">
                  <p className="text-sm font-semibold">Agents completed</p>
                  <p className="mt-2 text-4xl font-black tracking-tight">
                    {completedAgents}/{audit.agents.length || 0}
                  </p>
                  <p className="mt-2 text-sm dense-copy">
                    Specialist review lanes stay visible while the audit room updates.
                  </p>
                </article>
                <article className="rounded-[28px] bg-white/78 p-5">
                  <p className="text-sm font-semibold">Findings surfaced</p>
                  <p className="mt-2 text-4xl font-black tracking-tight">{audit.finding_count}</p>
                  <p className="mt-2 text-sm dense-copy">
                    {highSeverityCount} high-signal findings are mapped to visible product surfaces.
                  </p>
                </article>
                <article className="rounded-[28px] bg-white/78 p-5">
                  <p className="text-sm font-semibold">Coverage</p>
                  <p className="mt-2 text-4xl font-black tracking-tight">
                    {audit.coverage?.coverage_percent ?? "--"}%
                  </p>
                  <p className="mt-2 text-sm dense-copy">
                    {audit.coverage?.summary ??
                      "Coverage summary will land once the report bundle is assembled."}
                  </p>
                </article>
                <article className="rounded-[28px] bg-white/78 p-5">
                  <p className="text-sm font-semibold">Final report</p>
                  <p className="mt-2 text-4xl font-black tracking-tight">
                    {audit.report?.replay_entries ?? 0}
                  </p>
                  <p className="mt-2 text-sm dense-copy">
                    Replay entries and bundle artifacts attach cleanly at report time.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
          <section className="panel rounded-[32px] p-5">
            <SectionHeading
              eyebrow="Live timeline"
              title="Believable progress without brittle repo behavior"
              description="The stream feed replays the backend events exactly as the runner emits them, so judges see a coherent audit story instead of static placeholders."
              action={
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold">
                    {deferredEvents.length} events
                  </span>
                  <Link
                    href="/"
                    className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Run another demo
                  </Link>
                </div>
              }
            />

            <div className="mt-5 space-y-3">
              {deferredEvents.length ? (
                deferredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-[22px] bg-white/78 p-4 shadow-[0_18px_40px_rgba(20,33,61,0.05)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                          {titleCase(event.type)}
                        </p>
                        <p className="mt-2 text-sm font-semibold">{describeEvent(event)}</p>
                      </div>
                      <span className="mono text-xs text-[var(--ink-soft)]">
                        #{event.sequence} | {formatStamp(event.timestamp)}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <article className="rounded-[22px] bg-white/78 p-5">
                  <p className="text-sm dense-copy">
                    Waiting for the first stream event from the audit runner.
                  </p>
                </article>
              )}
            </div>
          </section>

          <section className="panel rounded-[32px] p-5">
            <SectionHeading
              eyebrow="Agent deck"
              title="Specialist reviewers stay visible while the room updates"
              description="Each card reflects the current backend snapshot so the audit room stays consistent even if the stream reconnects."
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {audit.agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>
        </div>

        <section className="panel rounded-[32px] p-5">
          <SectionHeading
            eyebrow="Finding board"
            title="Findings land in the room as evidence becomes available"
            description="Proof type, severity, verification state, and evidence anchors all arrive cleanly, even though the backend is replaying deterministic demo data."
          />
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {audit.findings.length ? (
              audit.findings.map((finding) => (
                <article
                  key={finding.id}
                  className="rounded-[24px] bg-white/80 p-5 shadow-[0_18px_40px_rgba(20,33,61,0.05)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="mono text-xs text-[var(--ink-soft)]">{finding.id}</p>
                      <h3 className="mt-2 text-xl font-black tracking-tight">{finding.title}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityClasses(finding.severity)}`}>
                      {finding.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm dense-copy">{finding.impact_summary}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                      <p className="font-semibold">Proof type</p>
                      <p className="mt-2 dense-copy">{finding.proof_type}</p>
                    </div>
                    <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                      <p className="font-semibold">Verification</p>
                      <p className="mt-2 dense-copy">{titleCase(finding.verification_state)}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="dense-copy">{finding.why_this_matters}</p>
                    <p className="mono text-xs text-[var(--ink-soft)]">
                      Evidence {finding.evidence_file}
                    </p>
                    <p className="mono text-xs text-[var(--ink-soft)]">
                      Patch {finding.patch_file}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <article className="rounded-[24px] bg-white/78 p-6">
                <p className="text-sm dense-copy">
                  Findings will appear here as the backend emits deterministic discovery events.
                </p>
              </article>
            )}
          </div>
        </section>

        <section className="panel rounded-[32px] p-5">
          <SectionHeading
            eyebrow="Final report"
            title={
              audit.status === "completed"
                ? "The audit room has a clean final report state."
                : "Report bundle is assembling behind the live run."
            }
            description="Once the report state lands, the room pivots from live activity into coverage, replay, and merge-readiness language without losing the current audit context."
          />

          <div className="mt-5 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[28px] bg-white/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Decision</p>
                  <p className="mt-2 text-3xl font-black tracking-tight">
                    {audit.report?.safe_to_merge_now ? "Safe to merge" : "In review"}
                  </p>
                </div>
                <span className="rounded-full bg-[rgba(14,165,164,0.14)] px-3 py-1 text-xs font-bold text-[var(--teal)]">
                  seeded demo target
                </span>
              </div>
              <p className="mt-3 text-sm dense-copy">
                {audit.report?.safe_to_merge_summary ??
                  "Merge-readiness language will land once the report bundle is ready."}
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="font-semibold">Audit mode</p>
                  <p className="mt-2">{audit.report?.audit_mode ?? titleCase(audit.mode)}</p>
                </div>
                <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="font-semibold">Replay entries</p>
                  <p className="mt-2">{audit.report?.replay_entries ?? 0}</p>
                </div>
                <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="font-semibold">Started</p>
                  <p className="mt-2">{formatStamp(audit.started_at)}</p>
                </div>
                <div className="rounded-[18px] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="font-semibold">Completed</p>
                  <p className="mt-2">{formatStamp(audit.completed_at)}</p>
                </div>
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-[28px] bg-white/80 p-5">
                <p className="text-sm font-semibold">Coverage notes</p>
                <div className="mt-3 space-y-2 text-sm dense-copy">
                  {audit.coverage?.confidence_notes?.length ? (
                    audit.coverage.confidence_notes.map((note) => <p key={note}>{note}</p>)
                  ) : (
                    <p>Coverage confidence notes will appear with the report bundle.</p>
                  )}
                </div>
              </article>
              <article className="rounded-[28px] bg-white/80 p-5">
                <p className="text-sm font-semibold">Replay-ready notes</p>
                <div className="mt-3 space-y-2 text-sm dense-copy">
                  {audit.report?.replay_ready_notes?.length ? (
                    audit.report.replay_ready_notes.map((note) => <p key={note}>{note}</p>)
                  ) : (
                    <p>Replay notes will appear once evidence and coverage are finalized.</p>
                  )}
                </div>
              </article>
              <article className="rounded-[28px] bg-white/80 p-5">
                <p className="text-sm font-semibold">Score drivers</p>
                <div className="mt-3 space-y-2 text-sm dense-copy">
                  {audit.completion_summary?.highest_score_drivers?.length ? (
                    audit.completion_summary.highest_score_drivers.map((item) => (
                      <p key={item}>{item}</p>
                    ))
                  ) : (
                    audit.score.highlights.map((item) => <p key={item}>{item}</p>)
                  )}
                </div>
              </article>
              <article className="rounded-[28px] bg-white/80 p-5">
                <p className="text-sm font-semibold">Report artifacts</p>
                <div className="mt-3 space-y-2 text-sm dense-copy">
                  <p>{audit.report?.report_path ?? "Report path pending"}</p>
                  <p>{audit.report?.evidence_bundle_path ?? "Evidence bundle pending"}</p>
                  <p>
                    Unsupported areas{" "}
                    {audit.completion_summary?.unsupported_areas.length ??
                      audit.coverage?.unsupported.length ??
                      0}
                  </p>
                </div>
              </article>
            </div>
          </div>

          {error ? (
            <p className="mt-5 rounded-[20px] border border-[rgba(224,93,116,0.28)] bg-[rgba(224,93,116,0.08)] px-4 py-3 text-sm text-[var(--foreground)]">
              {error}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
