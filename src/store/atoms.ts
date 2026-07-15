"use client";

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DEFAULT_TEMPLATE } from "@/lib/helpers";
import type { CharCardData, SortStyle, PasteType } from "@/types";

export const termAtom = atom("");
export const resultsAtom = atom<CharCardData[]>([]);
export const termCardsAtom = atom<CharCardData[]>([]);
export const sortStyleAtom = atom<SortStyle>("byUnicode");
export const isSearchingAtom = atom(false);

export const pasteTypeAtom = atomWithStorage<PasteType>(
  "yaist-pasteType",
  "character"
);
export const templateAtom = atomWithStorage<string>(
  "yaist-template",
  DEFAULT_TEMPLATE
);

export const sortedResultsAtom = atom((get) => {
  const results = get(resultsAtom);
  const sort = get(sortStyleAtom);
  if (sort === "byStrokes") {
    return [...results].sort((a, b) => a.strokes - b.strokes);
  }
  return [...results].sort((a, b) => (a.char < b.char ? -1 : 1));
});
