import { NextRequest, NextResponse } from "next/server";
import { enrichChar } from "@/lib/enrich";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const c = searchParams.get("c");

  if (!c || c.trim() === "") {
    return NextResponse.json({ error: "c required" }, { status: 400 });
  }

  const firstChar = Array.from(c.trim())[0];
  if (!firstChar) {
    return NextResponse.json({ error: "invalid char" }, { status: 400 });
  }

  const data = enrichChar(firstChar);
  return NextResponse.json(data);
}
