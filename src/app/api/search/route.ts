import { NextRequest, NextResponse } from "next/server";
import { enrichChar, searchChars } from "@/lib/enrich";
import type { CharCardData, SortStyle } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");
  const sort = (searchParams.get("sort") as SortStyle) ?? "byUnicode";

  if (!q || q.trim() === "") {
    return NextResponse.json(
      { error: "query required" },
      { status: 400 }
    );
  }

  const charList = searchChars(q.trim());
  const results: CharCardData[] = charList.map(enrichChar);

  if (sort === "byStrokes") {
    results.sort((a, b) => a.strokes - b.strokes);
  } else {
    results.sort((a, b) => (a.char < b.char ? -1 : 1));
  }

  return NextResponse.json({ results, total: results.length, query: q });
}
