import { NextResponse } from "next/server";
import { projects } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    count: projects.length,
    projects,
  });
}
