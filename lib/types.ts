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
  status: "Connected" | "Needs attention" | "Sandbox";
  syncHealth: HealthTone;
  owner: string;
  lastSync: string;
  description: string;
  scopes: string[];
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
