import { NextResponse } from "next/server";
import { getAudit } from "@/lib/server/audit-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ auditId: string }> },
) {
  const { auditId } = await params;
  const audit = getAudit(auditId);

  if (!audit) {
    return NextResponse.json({ error: "Audit not found." }, { status: 404 });
  }

  return NextResponse.json(audit);
}

