import { NextResponse } from "next/server";

const demoSignature = process.env.DEMO_WEBHOOK_SIGNATURE ?? "fixture-safe-demo";

export async function GET() {
  return NextResponse.json({
    mode: "fixture-only",
    acceptsExternalTraffic: false,
    requiredHeaders: {
      "x-demo-source": "fixture-runner",
      "x-demo-signature": demoSignature,
    },
    note: "This route exists for local replay demos only and does not trigger real side effects.",
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("x-demo-signature");
  const source = request.headers.get("x-demo-source");
  const payload = await request.json().catch(() => null);

  if (signature !== demoSignature || source !== "fixture-runner") {
    return NextResponse.json(
      {
        accepted: false,
        reason:
          "Fixture-only route. Requests must come from the local demo replay runner.",
      },
      { status: 403 },
    );
  }

  if (!payload || payload.mode !== "demo-fixture") {
    return NextResponse.json(
      {
        accepted: false,
        reason: "Only deterministic demo-fixture payloads are allowed.",
      },
      { status: 422 },
    );
  }

  return NextResponse.json({
    accepted: true,
    replayedEvent: payload.event ?? "fixture.unknown",
    note: "Processed mock replay without touching external systems.",
  });
}
