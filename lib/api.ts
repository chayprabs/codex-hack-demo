import type {
  AuditDetail,
  AuditEventType,
  AuditLaunchResponse,
  AuditStreamCompletedEvent,
  AuditStreamEvent,
} from "@/lib/types";

const AUDIT_EVENT_NAMES: AuditEventType[] = [
  "audit.created",
  "audit.started",
  "audit.mode.selected",
  "repo.seeded",
  "agent.status",
  "finding.created",
  "score.updated",
  "coverage.updated",
  "report.ready",
  "audit.completed",
  "audit.pending",
];

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      payload?.error ?? `Request failed with status ${response.status}.`,
    );
  }

  return payload as T;
}

export async function createDemoAudit(): Promise<AuditLaunchResponse> {
  const response = await fetch("/api/demo-audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseJsonResponse<AuditLaunchResponse>(response);
}

export async function fetchAudit(auditId: string): Promise<AuditDetail> {
  const response = await fetch(`/api/audits/${auditId}`, {
    cache: "no-store",
  });

  return parseJsonResponse<AuditDetail>(response);
}

interface AuditStreamHandlers {
  onAuditEvent: (event: AuditStreamEvent) => void;
  onCompleted?: (event: AuditStreamCompletedEvent) => void;
  onError?: () => void;
}

export function subscribeToAuditStream(
  auditId: string,
  handlers: AuditStreamHandlers,
): () => void {
  const source = new EventSource(`/api/audits/${auditId}/stream`);

  for (const eventName of AUDIT_EVENT_NAMES) {
    source.addEventListener(eventName, (event) => {
      handlers.onAuditEvent(JSON.parse(event.data) as AuditStreamEvent);
    });
  }

  source.addEventListener("stream.completed", (event) => {
    handlers.onCompleted?.(JSON.parse(event.data) as AuditStreamCompletedEvent);
    source.close();
  });

  source.onerror = () => {
    handlers.onError?.();
  };

  return () => {
    source.close();
  };
}
