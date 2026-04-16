import manifestJson from "@/audit-fixtures/manifest.json";
import coverageJson from "@/audit-fixtures/coverage.json";
import repoMapJson from "@/audit-fixtures/repo-map.json";
import scoreBeforeAfterJson from "@/audit-fixtures/score-before-after.json";
import type { AuditFinding } from "@/lib/types";

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
