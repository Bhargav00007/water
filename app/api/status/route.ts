// app/status/route.ts
import { NextResponse } from "next/server";

let currentStatus: "on" | "off" = "off"; // default

export async function GET() {
  return NextResponse.json({ status: currentStatus });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const status = body?.status === "on" ? "on" : "off";
    currentStatus = status;
    return NextResponse.json({ status: currentStatus });
  } catch (err) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
