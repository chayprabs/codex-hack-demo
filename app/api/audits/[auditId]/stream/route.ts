import {
  getAudit,
  getAuditEvents,
  isTerminalStatus,
  subscribeToAudit,
} from "@/lib/server/audit-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

function toSseChunk(eventName: string, payload: unknown, id?: number): Uint8Array {
  const lines = [];

  if (typeof id === "number") {
    lines.push(`id: ${id}`);
  }

  lines.push(`event: ${eventName}`);
  lines.push(`data: ${JSON.stringify(payload)}`);

  return encoder.encode(`${lines.join("\n")}\n\n`);
}

function toComment(comment: string): Uint8Array {
  return encoder.encode(`: ${comment}\n\n`);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ auditId: string }> },
) {
  const { auditId } = await params;
  const audit = getAudit(auditId);

  if (!audit) {
    return new Response(JSON.stringify({ error: "Audit not found." }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const lastEventIdHeader = request.headers.get("last-event-id");
  const afterSequence = Number.parseInt(lastEventIdHeader ?? "0", 10);
  const historicalEvents = getAuditEvents(
    auditId,
    Number.isNaN(afterSequence) ? 0 : afterSequence,
  ) ?? [];

  let unsubscribe = () => {};
  let heartbeat: ReturnType<typeof setInterval> | undefined;
  let closed = false;

  const closeStream = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (closed) {
      return;
    }

    closed = true;

    if (heartbeat) {
      clearInterval(heartbeat);
    }

    unsubscribe();
    controller.close();
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(toComment("connected"));

      for (const event of historicalEvents) {
        controller.enqueue(toSseChunk(event.type, event, event.sequence));
      }

      if (isTerminalStatus(audit.status)) {
        controller.enqueue(
          toSseChunk("stream.completed", {
            audit_id: audit.audit_id,
            status: audit.status,
          }),
        );
        closeStream(controller);
        return;
      }

      unsubscribe = subscribeToAudit(auditId, (event) => {
        controller.enqueue(toSseChunk(event.type, event, event.sequence));

        if (event.type === "audit.completed") {
          controller.enqueue(
            toSseChunk("stream.completed", {
              audit_id: auditId,
              status: "completed",
            }),
          );
          closeStream(controller);
        }
      });

      heartbeat = setInterval(() => {
        controller.enqueue(toComment("keep-alive"));
      }, 15000);
    },
    cancel() {
      if (heartbeat) {
        clearInterval(heartbeat);
      }

      unsubscribe();
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "X-Accel-Buffering": "no",
    },
  });
}

