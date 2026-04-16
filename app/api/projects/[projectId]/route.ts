import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/demo-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return NextResponse.json(
      { error: "Project not found in local demo data." },
      { status: 404 },
    );
  }

  return NextResponse.json(project);
}
