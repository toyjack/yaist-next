"use client";

import { useAtom, useSetAtom } from "jotai";
import {
  termAtom,
  resultsAtom,
  termCardsAtom,
  isSearchingAtom,
  sortStyleAtom,
} from "@/store/atoms";
import type { CharCardData, SortStyle } from "@/types";

export function useSearch() {
  const [term, setTerm] = useAtom(termAtom);
  const setResults = useSetAtom(resultsAtom);
  const setTermCards = useSetAtom(termCardsAtom);
  const setIsSearching = useSetAtom(isSearchingAtom);
  const [sortStyle, setSortStyle] = useAtom(sortStyleAtom);

  const search = async (query: string, sort?: SortStyle) => {
    const q = query.trim();
    if (!q) return;
    setIsSearching(true);
    setResults([]);

    try {
      const sortParam = sort ?? sortStyle;
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&sort=${sortParam}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.results as CharCardData[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const decompose = async (input: string) => {
    const chars = Array.from(input.trim());
    const firstChar = chars.find((c) => !/\d/.test(c));
    if (!firstChar) return;

    try {
      const res = await fetch(
        `/api/decompose?char=${encodeURIComponent(firstChar)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.components && data.components.length > 0) {
        setTerm(data.components.join(""));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTermCards = async (input: string) => {
    const chars = Array.from(input).filter((c) => !/\d/.test(c));
    if (chars.length === 0) {
      setTermCards([]);
      return;
    }
    try {
      const cards = await Promise.all(
        chars.map(async (c) => {
          const res = await fetch(`/api/char?c=${encodeURIComponent(c)}`);
          if (!res.ok) return null;
          return res.json() as Promise<CharCardData>;
        })
      );
      setTermCards(cards.filter((c): c is CharCardData => c !== null));
    } catch (e) {
      console.error(e);
      setTermCards([]);
    }
  };

  return {
    term,
    setTerm,
    sortStyle,
    setSortStyle,
    search,
    decompose,
    fetchTermCards,
  };
}
