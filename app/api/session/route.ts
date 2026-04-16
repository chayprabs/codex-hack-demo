import { NextResponse } from "next/server";
import { sessionTrustBoundaries } from "@/lib/audit-demo-data";
import { users } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    mode: "fake-local-demo",
    realAuthProvider: false,
    availableUsers: users.map((user) => ({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    })),
    trustBoundaries: sessionTrustBoundaries,
    note: "This route returns persona metadata only. It does not mint real sessions or tokens.",
  });
}
