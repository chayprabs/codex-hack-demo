import { NextResponse } from "next/server";
import { integrations } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    count: integrations.length,
    integrations,
    note: "All integrations are mocked. No external provider calls are made.",
  });
}
