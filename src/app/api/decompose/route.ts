import { NextRequest, NextResponse } from "next/server";
import { getCjkviIDS } from "idsfind";
import { getDataStore } from "@/lib/data-loader";
import { getIdsFromRaw } from "@/lib/enrich";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const char = searchParams.get("char");

  if (!char || char.trim() === "") {
    return NextResponse.json({ error: "char required" }, { status: 400 });
  }

  const firstChar = Array.from(char.trim())[0];
  if (!firstChar) {
    return NextResponse.json({ error: "invalid char" }, { status: 400 });
  }

  let ids = (getCjkviIDS(firstChar) as string | undefined) ?? "";
  if (!ids) {
    const store = getDataStore();
    ids = getIdsFromRaw(firstChar, store.idsRaw);
  }

  if (!ids) {
    return NextResponse.json(
      { char: firstChar, ids: "", components: [] },
      { status: 200 }
    );
  }

  // Strip IDS operators (⿰-⿿) and bracketed references [[...]]
  const components = Array.from(
    ids.replace(/[\t⿰-⿿]|\[[^\]]+\]/g, "")
  ).filter((c) => c.trim() !== "");

  return NextResponse.json({ char: firstChar, ids, components });
}
