export type HealthTone = "excellent" | "stable" | "watch" | "at-risk";
export type ProjectStatus =
  | "On track"
  | "Needs review"
  | "In delivery"
  | "Queued";

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  team: string;
  location: string;
  initials: string;
  availability: "online" | "focus" | "offline";
}

export interface ChecklistItem {
  label: string;
  done: boolean;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  vertical: string;
  status: ProjectStatus;
  health: HealthTone;
  ownerId: string;
  budget: number;
  spent: number;
  progress: number;
  nextMilestone: string;
  summary: string;
  launchWindow: string;
  squad: string[];
  tags: string[];
  openTasks: number;
  blockers: string[];
  checklist: ChecklistItem[];
  updates: string[];
  resourceHandle?: string;
  clientSpace?: string;
  viewerPolicy?: string;
}

export interface Message {
  id: string;
  senderId: string;
  sentAt: string;
  body: string;
}

export interface MessageThread {
  id: string;
  channel: string;
  topic: string;
  participants: string[];
  projectId?: string;
  unreadCount: number;
  lastMessageAt: string;
  messages: Message[];
}

export interface ActivityEvent {
  id: string;
  actorId: string;
  title: string;
  detail: string;
  kind: "launch" | "task" | "ops" | "quality";
  happenedAt: string;
  projectId?: string;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  environment: "Production mirror" | "Sandbox mirror" | "Internal lane";
  status: "Connected" | "Needs attention" | "Sandbox";
  syncHealth: HealthTone;
  owner: string;
  lastSync: string;
  description: string;
  scopes: string[];
  scenarioHook: string;
}

export interface SettingItem {
  label: string;
  value: string;
  note?: string;
}

export interface SettingSection {
  id: string;
  title: string;
  summary: string;
  status: string;
  items: SettingItem[];
}

export interface AdminSignal {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "Reviewing" | "Closed";
  owner: string;
  updatedAt: string;
  note: string;
}

export interface AuditFinding {
  id: string;
  category: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  impact_summary: string;
  file_paths: string[];
  why_this_matters: string;
  evidence_file: string;
  patch_file: string;
  replay_file: string;
  proof_type: string;
  confidence: string;
  suggested_patch: string;
  verification_summary: string;
  replay_note: string;
  verification_state: string;
  replay_ready: boolean;
  notes_for_demo: string;
}

export interface AdminUtility {
  id: string;
  name: string;
  purpose: string;
  accessLevel: string;
  owner: string;
  keyReference: string;
  reviewStatus: string;
  note: string;
}

export interface ProjectAccessSurface {
  projectId: string;
  resourceHandle: string;
  clientScope: string;
  shareMode: string;
  likelyRoutes: string[];
  narration: string;
  safeControl: string;
}

export interface WebhookLane {
  id: string;
  name: string;
  endpoint: string;
  owner: string;
  verificationMode: string;
  fixtureHeaders: string[];
  recentEvents: string[];
  narration: string;
}

export interface SessionTrustBoundary {
  id: string;
  title: string;
  surface: string;
  trustedInput: string;
  safeRuntimeRule: string;
  scenarioHook: string;
}

export interface ExposureSurface {
  id: string;
  title: string;
  audience: string;
  example: string;
  whyItFeelsReal: string;
  safeNote: string;
}

export interface CoverageBucket {
  label: string;
  count: number;
  areas: string[];
  note: string;
}

export interface TrustScoreBand {
  label: string;
  score: number;
  summary: string;
}

export interface TraceTransition {
  status: string;
  at: string;
  note: string;
}

export interface AgentTrace {
  id: string;
  agent_name: string;
  specialty: string;
  focus: string;
  status: string;
  verification_status: string;
  confidence: string;
  elapsed_ms: number;
  files_inspected: string[];
  routes_noticed: string[];
  candidate_detected: {
    finding_ids: string[];
    summary: string;
  };
  evidence_collected: string[];
  suggested_patch_generated: string;
  status_transitions: TraceTransition[];
}

export interface EvidenceBundle {
  repo: string;
  audit_mode: string;
  frameworks_detected: string[];
  trust_score: {
    before: number;
    current: number;
    delta: number;
    label: string;
  };
  coverage: {
    supported_count: number;
    partial_count: number;
    unsupported_count: number;
    summary: string;
  };
  findings: {
    id: string;
    title: string;
    severity: string;
    verification_status: string;
    replay_ready: boolean;
  }[];
  evidence: {
    id: string;
    type: string;
    path: string;
    note: string;
  }[];
  support_status: {
    supported: string[];
    partial: string[];
    unsupported: string[];
  };
  verification_status: {
    verified_findings_count: number;
    partial_verification_count: number;
    manual_review_count: number;
  };
  replay_ready_notes: string[];
}

export interface ReplayIndexEntry {
  id: string;
  title: string;
  finding_ids: string[];
  mapped_paths: string[];
  pass_looks_like: string;
  verification_mode: "fully verified" | "partially verified" | "manual review only";
  doc: string;
}

export interface SafeToMergeSummary {
  safe_to_merge_now: boolean;
  merge_scope: string;
  summary: string;
  verified_now: string[];
  manual_review_needed: string[];
  unsupported_areas: string[];
  highest_score_drivers: string[];
}

export interface CoverageAwareScore {
  trust_score: {
    before: number;
    after: number;
    delta: number;
  };
  coverage_percent: number;
  supported_area_count: number;
  verified_findings_count: number;
  unsupported_areas: string[];
  confidence_notes: string[];
  before_state: string;
  after_state: string;
}

export type AuditMode = "normal" | "demo";
export type AuditStatus = "queued" | "running" | "completed" | "failed";

export type AuditEventType =
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

export interface AuditAgentState {
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

export interface AuditScoreState {
  before: number;
  current: number;
  delta: number;
  label: string;
  highlights: string[];
}

export interface AuditCoverageState {
  summary: string;
  supported: string[];
  partial: string[];
  unsupported: string[];
  coverage_percent?: number;
  verified_findings_count?: number;
  confidence_notes?: string[];
}

export interface AuditReportState {
  report_path: string;
  audit_mode: string;
  replay_entries: number;
  replay_generated_at: string;
  evidence_bundle_path: string;
  safe_to_merge_now: boolean;
  safe_to_merge_summary: string;
  replay_ready_notes: string[];
}

export interface AuditCompletionSummary {
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

export interface AuditLaunchResponse {
  audit_id: string;
  repo_url: string;
  status: AuditStatus;
  stream_url: string;
  mode: AuditMode;
}

export interface AuditStreamEvent {
  id: string;
  audit_id: string;
  sequence: number;
  type: AuditEventType;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface AuditStreamCompletedEvent {
  audit_id: string;
  status: AuditStatus;
}
