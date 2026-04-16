import { NextResponse } from "next/server";
import {
  auditAgentTraces,
  auditCoverage,
  auditCoverageScore,
  auditEvidenceBundle,
  auditManifest,
  auditSafeToMerge,
  auditScoreSummary,
} from "@/lib/audit-manifest";
import { adminSignals, projects } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    projectCount: projects.length,
    openAdminSignals: adminSignals.filter((signal) => signal.status !== "Closed").length,
    seededFindings: auditManifest.findings.length,
    categories: Array.from(
      new Set(auditManifest.findings.map((finding) => finding.category)),
    ),
    trustScore: auditScoreSummary.after.score,
    coverageSummary: auditCoverage.summary,
    verifiedFindings: auditEvidenceBundle.verification_status.verified_findings_count,
    safeToMergeNow: auditSafeToMerge.safe_to_merge_now,
    traceCount: auditAgentTraces.length,
    coveragePercent: auditCoverageScore.coverage_percent,
  });
}
