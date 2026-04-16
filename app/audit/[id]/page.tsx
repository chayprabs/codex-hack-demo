import { LiveAuditRoom } from "@/components/audit/live-audit-room";

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <LiveAuditRoom auditId={id} />;
}

