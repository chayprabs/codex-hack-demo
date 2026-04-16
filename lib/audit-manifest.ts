import manifestJson from "@/audit-fixtures/manifest.json";
import coverageJson from "@/audit-fixtures/coverage.json";
import evidenceBundleJson from "@/audit-fixtures/evidence-bundle.json";
import repoMapJson from "@/audit-fixtures/repo-map.json";
import replayIndexJson from "@/audit-fixtures/replay/replay-index.json";
import safeToMergeJson from "@/audit-fixtures/safe-to-merge.json";
import scoreCoverageJson from "@/audit-fixtures/score-coverage.json";
import scoreBeforeAfterJson from "@/audit-fixtures/score-before-after.json";
import authAgentJson from "@/audit-fixtures/traces/auth-agent.json";
import idorAgentJson from "@/audit-fixtures/traces/idor-agent.json";
import rlsAgentJson from "@/audit-fixtures/traces/rls-agent.json";
import secretsAgentJson from "@/audit-fixtures/traces/secrets-agent.json";
import webhookAgentJson from "@/audit-fixtures/traces/webhook-agent.json";
import type {
  AgentTrace,
  AuditFinding,
  CoverageAwareScore,
  EvidenceBundle,
  ReplayIndexEntry,
  SafeToMergeSummary,
} from "@/lib/types";

export const auditManifest = manifestJson as {
  repo: string;
  demo_safe: boolean;
  generated_at: string;
  findings: AuditFinding[];
};

export const auditCategories = Array.from(
  new Set(auditManifest.findings.map((finding) => finding.category)),
);

export const auditCoverage = coverageJson as {
  summary: string;
  supported: string[];
  partial: string[];
  unsupported: string[];
  buckets: {
    label: string;
    count: number;
    areas: string[];
    note: string;
  }[];
};

export const auditRepoMap = repoMapJson as {
  repo: string;
  route_groups: string[];
  resources: {
    name: string;
    likely_paths: string[];
    scenarios: string[];
  }[];
};

export const auditScoreSummary = scoreBeforeAfterJson as {
  before: {
    score: number;
    label: string;
    summary: string;
  };
  after: {
    score: number;
    label: string;
    summary: string;
  };
  delta: number;
  highlights: string[];
};

export const auditEvidenceBundle = evidenceBundleJson as EvidenceBundle;

export const auditReplayIndex = replayIndexJson as {
  generated_at: string;
  entries: ReplayIndexEntry[];
};

export const auditSafeToMerge = safeToMergeJson as SafeToMergeSummary;

export const auditCoverageScore = scoreCoverageJson as CoverageAwareScore;

export const auditAgentTraces = [
  rlsAgentJson,
  webhookAgentJson,
  secretsAgentJson,
  idorAgentJson,
  authAgentJson,
] as AgentTrace[];
