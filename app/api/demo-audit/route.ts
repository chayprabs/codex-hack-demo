import { NextResponse } from "next/server";
import { getDemoRepoUrl, isCustomDemoRepoUrlConfigured } from "@/lib/server/config";
import { createDemoAudit } from "@/lib/server/audit-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const repoUrl = getDemoRepoUrl();
  const audit = createDemoAudit(repoUrl);
  const openUrl = `/audit/${audit.audit_id}`;

  return NextResponse.json(
    {
      audit_id: audit.audit_id,
      repo_url: audit.repo_url,
      repo_url_source: isCustomDemoRepoUrlConfigured() ? "env" : "safe-default",
      status: audit.status,
      open_url: openUrl,
      stream_url: audit.stream_url,
      mode: audit.mode,
    },
    {
      status: 201,
      headers: {
        Location: `/api/audits/${audit.audit_id}`,
      },
    },
  );
}
