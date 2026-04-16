import {
  auditAgentTraces,
  auditCoverage,
  auditCoverageScore,
  auditEvidenceBundle,
  auditManifest,
  auditReplayIndex,
  auditSafeToMerge,
  auditScoreSummary,
} from "@/lib/audit-manifest";
import type { AgentTrace, AuditFinding } from "@/lib/types";
import { DEMO_AUDIT_SEED } from "@/lib/server/config";

export type AuditMode = "normal" | "demo";
export type AuditStatus = "queued" | "running" | "completed" | "failed";

type AuditEventType =
  | "audit.created"
  | "audit.started"
  | "audit.mode.selected"
  | "repo.seeded"
  | "agent.status"
  | "finding.created"
  | "score.updated"
  | "coverage.updated"
  | "report.ready"
  | "audit.completed"
  | "audit.pending";

interface AuditStreamEvent {
  id: string;
  audit_id: string;
  sequence: number;
  type: AuditEventType;
  timestamp: string;
  data: Record<string, unknown>;
}

interface AuditAgentState {
  id: string;
  agent_name: string;
  specialty: string;
  focus: string;
  status: string;
  verification_status: string;
  confidence: string;
  elapsed_ms: number;
  finding_ids: string[];
  evidence_collected: string[];
  files_inspected: string[];
  routes_noticed: string[];
  last_note?: string;
}

interface AuditScoreState {
  before: number;
  current: number;
  delta: number;
  label: string;
  highlights: string[];
}

interface AuditCoverageState {
  summary: string;
  supported: string[];
  partial: string[];
  unsupported: string[];
  coverage_percent?: number;
  verified_findings_count?: number;
  confidence_notes?: string[];
}

interface AuditReportState {
  report_path: string;
  audit_mode: string;
  replay_entries: number;
  replay_generated_at: string;
  evidence_bundle_path: string;
  safe_to_merge_now: boolean;
  safe_to_merge_summary: string;
  replay_ready_notes: string[];
}

interface AuditCompletionSummary {
  headline: string;
  merge_scope: string;
  verified_findings_count: number;
  partial_verification_count: number;
  manual_review_count: number;
  highest_score_drivers: string[];
  unsupported_areas: string[];
}

export interface AuditDetail {
  audit_id: string;
  repo_url: string;
  status: AuditStatus;
  mode: AuditMode;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
  started_at?: string;
  completed_at?: string;
  stream_url: string;
  findings: AuditFinding[];
  finding_count: number;
  agents: AuditAgentState[];
  score: AuditScoreState;
  coverage?: AuditCoverageState;
  report?: AuditReportState;
  completion_summary?: AuditCompletionSummary;
  events_count: number;
}

interface StoredAudit {
  detail: AuditDetail;
  events: AuditStreamEvent[];
  known_finding_ids: Set<string>;
  runner_state: "idle" | "running" | "completed";
}

interface AuditRuntimeState {
  audits: Map<string, StoredAudit>;
  subscribers: Map<string, Set<(event: AuditStreamEvent) => void>>;
  timeouts: Map<string, ReturnType<typeof setTimeout>[]>;
}

interface ScheduledStep {
  after_ms: number;
  run: (audit: StoredAudit) => void;
}

declare global {
  var __trustlayer_audit_runtime__: AuditRuntimeState | undefined;
}

const DEMO_REPORT_PATH = "audit-fixtures/demo-report.md";
const DEMO_EVIDENCE_BUNDLE_PATH = "audit-fixtures/evidence-bundle.json";
const DEMO_AGENT_ORDER = [
  "trace-secrets-agent",
  "trace-webhook-agent",
  "trace-idor-agent",
  "trace-auth-agent",
  "trace-rls-agent",
];
const DEMO_SCORE_STEPS = [67, 72, 78, 83, auditScoreSummary.after.score];

function clone<T>(value: T): T {
  return structuredClone(value);
}

function nowIso(): string {
  return new Date().toISOString();
}

function getAuditStreamUrl(auditId: string): string {
  return `/api/audits/${auditId}/stream`;
}

function getRuntimeState(): AuditRuntimeState {
  if (!globalThis.__trustlayer_audit_runtime__) {
    globalThis.__trustlayer_audit_runtime__ = {
      audits: new Map(),
      subscribers: new Map(),
      timeouts: new Map(),
    };
  }

  return globalThis.__trustlayer_audit_runtime__;
}

function getOrderedDemoTraces(): AgentTrace[] {
  const traceMap = new Map(auditAgentTraces.map((trace) => [trace.id, trace]));

  return DEMO_AGENT_ORDER.map((traceId) => traceMap.get(traceId)).filter(
    (trace): trace is AgentTrace => Boolean(trace),
  );
}

function buildInitialDemoAgents(): AuditAgentState[] {
  return getOrderedDemoTraces().map((trace) => ({
    id: trace.id,
    agent_name: trace.agent_name,
    specialty: trace.specialty,
    focus: trace.focus,
    status: "queued",
    verification_status: "pending",
    confidence: trace.confidence,
    elapsed_ms: 0,
    finding_ids: [],
    evidence_collected: [],
    files_inspected: trace.files_inspected,
    routes_noticed: trace.routes_noticed,
  }));
}

function getTraceTransition(
  trace: AgentTrace,
  index: number,
  fallbackStatus: string,
  fallbackNote: string,
) {
  return (
    trace.status_transitions[index] ?? {
      status: fallbackStatus,
      at: "",
      note: fallbackNote,
    }
  );
}

function createStoredAudit(repoUrl: string, mode: AuditMode): StoredAudit {
  const createdAt = nowIso();
  const auditId = `audit_${crypto.randomUUID()}`;

  return {
    detail: {
      audit_id: auditId,
      repo_url: repoUrl,
      status: "queued",
      mode,
      is_demo: mode === "demo",
      created_at: createdAt,
      updated_at: createdAt,
      stream_url: getAuditStreamUrl(auditId),
      findings: [],
      finding_count: 0,
      agents: mode === "demo" ? buildInitialDemoAgents() : [],
      score:
        mode === "demo"
          ? {
              before: auditScoreSummary.before.score,
              current: auditScoreSummary.before.score,
              delta: 0,
              label: auditScoreSummary.before.label,
              highlights: [],
            }
          : {
              before: 0,
              current: 0,
              delta: 0,
              label: "Queued",
              highlights: [],
            },
      coverage:
        mode === "demo"
          ? {
              summary: "Demo audit queued. Deterministic seeded coverage will populate as agent traces complete.",
              supported: [],
              partial: [],
              unsupported: [],
            }
          : undefined,
      report:
        mode === "demo"
          ? {
              report_path: DEMO_REPORT_PATH,
              audit_mode: "seeded-safe-demo-target",
              replay_entries: 0,
              replay_generated_at: auditReplayIndex.generated_at,
              evidence_bundle_path: DEMO_EVIDENCE_BUNDLE_PATH,
              safe_to_merge_now: false,
              safe_to_merge_summary: "Pending deterministic replay bundle.",
              replay_ready_notes: [],
            }
          : undefined,
      events_count: 0,
    },
    events: [],
    known_finding_ids: new Set<string>(),
    runner_state: "idle",
  };
}

function notifySubscribers(auditId: string, event: AuditStreamEvent) {
  const subscribers = getRuntimeState().subscribers.get(auditId);

  if (!subscribers) {
    return;
  }

  for (const subscriber of subscribers) {
    subscriber(event);
  }
}

function appendEvent(
  audit: StoredAudit,
  type: AuditEventType,
  data: Record<string, unknown>,
): AuditStreamEvent {
  const event: AuditStreamEvent = {
    id: `${audit.detail.audit_id}:${audit.events.length + 1}`,
    audit_id: audit.detail.audit_id,
    sequence: audit.events.length + 1,
    type,
    timestamp: nowIso(),
    data,
  };

  audit.events.push(event);
  audit.detail.updated_at = event.timestamp;
  audit.detail.events_count = audit.events.length;
  notifySubscribers(audit.detail.audit_id, event);
  return event;
}

function findAgentState(audit: StoredAudit, trace: AgentTrace): AuditAgentState {
  const existing = audit.detail.agents.find((agent) => agent.id === trace.id);

  if (existing) {
    return existing;
  }

  const agent: AuditAgentState = {
    id: trace.id,
    agent_name: trace.agent_name,
    specialty: trace.specialty,
    focus: trace.focus,
    status: "queued",
    verification_status: "pending",
    confidence: trace.confidence,
    elapsed_ms: 0,
    finding_ids: [],
    evidence_collected: [],
    files_inspected: trace.files_inspected,
    routes_noticed: trace.routes_noticed,
  };

  audit.detail.agents.push(agent);
  return agent;
}

function applyAgentTransition(audit: StoredAudit, trace: AgentTrace, status: string, note: string) {
  const agent = findAgentState(audit, trace);

  agent.status = status;
  agent.last_note = note;
  agent.elapsed_ms = trace.elapsed_ms;

  if (status === "completed") {
    agent.verification_status = trace.verification_status;
    agent.evidence_collected = clone(trace.evidence_collected);
    agent.finding_ids = clone(trace.candidate_detected.finding_ids);
  }

  appendEvent(audit, "agent.status", {
    agent_id: trace.id,
    agent_name: trace.agent_name,
    specialty: trace.specialty,
    status,
    note,
    confidence: trace.confidence,
    finding_ids: trace.candidate_detected.finding_ids,
  });
}

function emitNewFindings(audit: StoredAudit, trace: AgentTrace) {
  const findings = auditManifest.findings.filter((finding) =>
    trace.candidate_detected.finding_ids.includes(finding.id),
  );

  for (const finding of findings) {
    if (audit.known_finding_ids.has(finding.id)) {
      continue;
    }

    audit.known_finding_ids.add(finding.id);
    audit.detail.findings.push(clone(finding));
    audit.detail.finding_count = audit.detail.findings.length;

    appendEvent(audit, "finding.created", {
      source_agent: trace.agent_name,
      finding,
    });
  }
}

function applyScore(audit: StoredAudit, nextScore: number, highlights: string[]) {
  audit.detail.score.current = nextScore;
  audit.detail.score.delta = nextScore - audit.detail.score.before;
  audit.detail.score.label =
    nextScore >= auditScoreSummary.after.score
      ? auditScoreSummary.after.label
      : "In review";
  audit.detail.score.highlights = highlights;

  appendEvent(audit, "score.updated", {
    before: audit.detail.score.before,
    current: nextScore,
    delta: audit.detail.score.delta,
    label: audit.detail.score.label,
    highlights,
  });
}

function applyCoverage(audit: StoredAudit) {
  audit.detail.coverage = {
    summary: auditCoverage.summary,
    supported: clone(auditCoverage.supported),
    partial: clone(auditCoverage.partial),
    unsupported: clone(auditCoverage.unsupported),
    coverage_percent: auditCoverageScore.coverage_percent,
    verified_findings_count: auditCoverageScore.verified_findings_count,
    confidence_notes: clone(auditCoverageScore.confidence_notes),
  };

  appendEvent(audit, "coverage.updated", {
    coverage: audit.detail.coverage,
  });
}

function applyReport(audit: StoredAudit) {
  audit.detail.report = {
    report_path: DEMO_REPORT_PATH,
    audit_mode: auditEvidenceBundle.audit_mode,
    replay_entries: auditReplayIndex.entries.length,
    replay_generated_at: auditReplayIndex.generated_at,
    evidence_bundle_path: DEMO_EVIDENCE_BUNDLE_PATH,
    safe_to_merge_now: auditSafeToMerge.safe_to_merge_now,
    safe_to_merge_summary: auditSafeToMerge.summary,
    replay_ready_notes: clone(auditEvidenceBundle.replay_ready_notes),
  };

  appendEvent(audit, "report.ready", {
    report_path: audit.detail.report.report_path,
    replay_entries: audit.detail.report.replay_entries,
    evidence_bundle: {
      audit_mode: auditEvidenceBundle.audit_mode,
      verified_findings_count:
        auditEvidenceBundle.verification_status.verified_findings_count,
      partial_verification_count:
        auditEvidenceBundle.verification_status.partial_verification_count,
      manual_review_count:
        auditEvidenceBundle.verification_status.manual_review_count,
    },
    safe_to_merge: auditSafeToMerge,
  });
}

function completeDemoAudit(audit: StoredAudit) {
  audit.detail.status = "completed";
  audit.detail.completed_at = nowIso();
  audit.detail.updated_at = audit.detail.completed_at;
  audit.detail.completion_summary = {
    headline: auditSafeToMerge.summary,
    merge_scope: auditSafeToMerge.merge_scope,
    verified_findings_count:
      auditEvidenceBundle.verification_status.verified_findings_count,
    partial_verification_count:
      auditEvidenceBundle.verification_status.partial_verification_count,
    manual_review_count: auditEvidenceBundle.verification_status.manual_review_count,
    highest_score_drivers: clone(auditSafeToMerge.highest_score_drivers),
    unsupported_areas: clone(auditSafeToMerge.unsupported_areas),
  };

  appendEvent(audit, "audit.completed", {
    finding_count: audit.detail.finding_count,
    score: audit.detail.score,
    completion_summary: audit.detail.completion_summary,
    replay_ready_notes: auditEvidenceBundle.replay_ready_notes,
  });
}

function buildDemoExecutionPlan(): ScheduledStep[] {
  const traces = getOrderedDemoTraces();
  const steps: ScheduledStep[] = [
    {
      after_ms: 150,
      run: (audit) => {
        audit.detail.status = "running";
        audit.detail.started_at = nowIso();
        appendEvent(audit, "audit.started", {
          mode: "demo",
          seed: DEMO_AUDIT_SEED,
          note: "Deterministic demo runner claimed this audit.",
        });
      },
    },
    {
      after_ms: 250,
      run: (audit) => {
        appendEvent(audit, "repo.seeded", {
          repo_url: audit.detail.repo_url,
          seed: DEMO_AUDIT_SEED,
          repo_fingerprint: auditManifest.repo,
          strategy: "fixture-backed replay",
          expected_findings: auditManifest.findings.length,
        });
      },
    },
  ];

  traces.forEach((trace, index) => {
    const queuedTransition = getTraceTransition(
      trace,
      0,
      "queued",
      `Queued ${trace.agent_name} for deterministic demo coverage.`,
    );
    const scanningTransition = getTraceTransition(
      trace,
      1,
      "scanning",
      `Scanning seeded fixtures for ${trace.agent_name}.`,
    );
    const evidenceTransition = getTraceTransition(
      trace,
      2,
      "evidence-linked",
      `Linked seeded evidence for ${trace.agent_name}.`,
    );
    const completedTransition = getTraceTransition(
      trace,
      3,
      "completed",
      `Completed seeded review for ${trace.agent_name}.`,
    );

    steps.push(
      {
        after_ms: 180,
        run: (audit) => {
          applyAgentTransition(audit, trace, queuedTransition.status, queuedTransition.note);
        },
      },
      {
        after_ms: 220,
        run: (audit) => {
          applyAgentTransition(
            audit,
            trace,
            scanningTransition.status,
            scanningTransition.note,
          );
        },
      },
      {
        after_ms: 220,
        run: (audit) => {
          applyAgentTransition(
            audit,
            trace,
            evidenceTransition.status,
            evidenceTransition.note,
          );
          emitNewFindings(audit, trace);
        },
      },
      {
        after_ms: 180,
        run: (audit) => {
          applyAgentTransition(
            audit,
            trace,
            completedTransition.status,
            completedTransition.note,
          );
        },
      },
    );

    if (index < DEMO_SCORE_STEPS.length) {
      steps.push({
        after_ms: 160,
        run: (audit) => {
          applyScore(
            audit,
            DEMO_SCORE_STEPS[index],
            auditScoreSummary.highlights.slice(0, Math.min(index + 1, auditScoreSummary.highlights.length)),
          );
        },
      });
    }
  });

  steps.push(
    {
      after_ms: 220,
      run: (audit) => {
        applyCoverage(audit);
      },
    },
    {
      after_ms: 180,
      run: (audit) => {
        applyReport(audit);
      },
    },
    {
      after_ms: 180,
      run: (audit) => {
        completeDemoAudit(audit);
      },
    },
  );

  return steps;
}

function startDemoAuditRunner(audit: StoredAudit) {
  const runtime = getRuntimeState();
  const auditId = audit.detail.audit_id;
  const steps = buildDemoExecutionPlan();
  let totalDelay = 0;
  const handles: ReturnType<typeof setTimeout>[] = [];

  for (const step of steps) {
    totalDelay += step.after_ms;
    handles.push(
      setTimeout(() => {
        const storedAudit = runtime.audits.get(auditId);

        if (!storedAudit) {
          return;
        }

        step.run(storedAudit);
      }, totalDelay),
    );
  }

  handles.push(
    setTimeout(() => {
      const storedAudit = runtime.audits.get(auditId);

      if (storedAudit) {
        storedAudit.runner_state = "completed";
      }

      runtime.timeouts.delete(auditId);
    }, totalDelay + 25),
  );

  runtime.timeouts.set(auditId, handles);
}

function startNormalAuditRunner(audit: StoredAudit) {
  audit.detail.status = "queued";
  appendEvent(audit, "audit.pending", {
    mode: "normal",
    note: "Normal audits are reserved for the live agent pipeline. Demo seeding is disabled for this audit.",
  });
  audit.runner_state = "completed";
}

function startAuditRunner(audit: StoredAudit) {
  if (audit.runner_state !== "idle") {
    return;
  }

  audit.runner_state = "running";

  if (audit.detail.mode === "demo") {
    startDemoAuditRunner(audit);
    return;
  }

  startNormalAuditRunner(audit);
}

export function createDemoAudit(repoUrl: string): AuditDetail {
  const runtime = getRuntimeState();
  const audit = createStoredAudit(repoUrl, "demo");

  runtime.audits.set(audit.detail.audit_id, audit);

  appendEvent(audit, "audit.created", {
    mode: "demo",
    is_demo: true,
    repo_url: repoUrl,
  });
  appendEvent(audit, "audit.mode.selected", {
    mode: "demo",
    seed: DEMO_AUDIT_SEED,
    trace_count: audit.detail.agents.length,
    seeded_findings: auditManifest.findings.length,
  });

  startAuditRunner(audit);
  return clone(audit.detail);
}

export function createNormalAudit(repoUrl: string): AuditDetail {
  const runtime = getRuntimeState();
  const audit = createStoredAudit(repoUrl, "normal");

  runtime.audits.set(audit.detail.audit_id, audit);
  appendEvent(audit, "audit.created", {
    mode: "normal",
    is_demo: false,
    repo_url: repoUrl,
  });

  startAuditRunner(audit);
  return clone(audit.detail);
}

export function getAudit(auditId: string): AuditDetail | undefined {
  const audit = getRuntimeState().audits.get(auditId);
  return audit ? clone(audit.detail) : undefined;
}

export function getAuditEvents(
  auditId: string,
  afterSequence = 0,
): AuditStreamEvent[] | undefined {
  const audit = getRuntimeState().audits.get(auditId);

  if (!audit) {
    return undefined;
  }

  return audit.events
    .filter((event) => event.sequence > afterSequence)
    .map((event) => clone(event));
}

export function subscribeToAudit(
  auditId: string,
  listener: (event: AuditStreamEvent) => void,
): () => void {
  const runtime = getRuntimeState();
  const subscribers = runtime.subscribers.get(auditId) ?? new Set();

  subscribers.add(listener);
  runtime.subscribers.set(auditId, subscribers);

  return () => {
    const nextSubscribers = runtime.subscribers.get(auditId);

    if (!nextSubscribers) {
      return;
    }

    nextSubscribers.delete(listener);

    if (nextSubscribers.size === 0) {
      runtime.subscribers.delete(auditId);
    }
  };
}

export function isTerminalStatus(status: AuditStatus): boolean {
  return status === "completed" || status === "failed";
}
