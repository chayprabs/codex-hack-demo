import { NextResponse } from "next/server";
import { auditCoverage, auditManifest, auditScoreSummary } from "@/lib/audit-manifest";
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
  });
}
