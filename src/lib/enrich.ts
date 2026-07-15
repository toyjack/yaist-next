import "server-only";
import { idsfind, getTotalStrokes, getCjkviIDS } from "idsfind";
import { getDataStore } from "./data-loader";
import {
  char2Unicode,
  getUnicodeBlock,
  getGwSvgUrl,
  getGwPngUrl,
} from "./helpers";
import type { CharCardData } from "@/types";

export function enrichChar(char: string): CharCardData {
  const store = getDataStore();
  const unicode = char2Unicode(char);
  const block = getUnicodeBlock(char);
  const strokes = getTotalStrokes(char) ?? 0;

  let ids = getCjkviIDS(char) ?? "";
  if (!ids) {
    ids = getIdsFromRaw(char, store.idsRaw);
  }

  const variantEntry = store.variants[char];
  const variants: string[] = Array.isArray(variantEntry) ? variantEntry : [];

  const codeHex = unicode.substring(2).toUpperCase();
  const ivsCodes = store.ivdMap.get(codeHex) ?? [];

  return {
    char,
    unicode,
    block,
    strokes,
    ids,
    variants,
    ivsCodes: [...ivsCodes],
    gwSvgUrl: getGwSvgUrl(char),
    gwPngUrl: getGwPngUrl(char),
  };
}

export function getIdsFromRaw(char: string, idsRaw: string): string {
  const temp = idsRaw.indexOf("\t" + char + "\t");
  if (temp === -1) return "";
  const temp2 = idsRaw.indexOf("\n", temp);
  return idsRaw.substring(temp + 3, temp2).trim();
}

export function searchChars(query: string): string[] {
  const raw = idsfind(query) as string[] | undefined;
  if (!raw) return [];
  return Array.from(new Set(raw));
}
