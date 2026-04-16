import { NextResponse } from "next/server";
import { activityLog } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    count: activityLog.length,
    events: activityLog,
  });
}
