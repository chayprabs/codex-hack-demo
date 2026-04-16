import { NextResponse } from "next/server";
import { messageThreads } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    count: messageThreads.length,
    threads: messageThreads,
  });
}
