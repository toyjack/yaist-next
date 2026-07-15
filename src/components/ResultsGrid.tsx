"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  sortedResultsAtom,
  isSearchingAtom,
  pageSizeAtom,
  selectModeAtom,
  selectedUnicodesAtom,
} from "@/store/atoms";
import CharCard from "./CharCard";

const PAGE_STEP = 50;
const SKELETON_COUNT = 10;

export default function ResultsGrid() {
  const t = useTranslations();
  const [results] = useAtom(sortedResultsAtom);
  const [isSearching] = useAtom(isSearchingAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [selectMode, setSelectMode] = useAtom(selectModeAtom);
  const [selectedUnicodes, setSelectedUnicodes] = useAtom(selectedUnicodesAtom);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visible = results.slice(0, pageSize);
  const hasMore = pageSize < results.length;
  const selectedSet = new Set(selectedUnicodes);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageSize((prev) => prev + PAGE_STEP);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, setPageSize]);

  const toggleSelectMode = () => {
    setSelectMode((v) => !v);
    setSelectedUnicodes([]);
  };

  const toggleCardSelect = (card: { unicode: string }) => {
    setSelectedUnicodes((prev) => {
      const set = new Set(prev);
      if (set.has(card.unicode)) set.delete(card.unicode);
      else set.add(card.unicode);
      return Array.from(set);
    });
  };

  const bulkCopy = async () => {
    const chars = results
      .filter((c) => selectedSet.has(c.unicode))
      .map((c) => c.char)
      .join("");
    if (chars && navigator.clipboard) {
      await navigator.clipboard.writeText(chars).catch(() => {});
    }
  };

  if (!isSearching && results.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3.5 text-text-muted text-xs mb-3.5 tracking-wide flex-wrap">
        <span className="font-serif text-accent">{t("label.numberOfResults")}</span>
        <div className="flex-1 h-px bg-border min-w-[20px]" />
        {results.length}
        <button
          onClick={toggleSelectMode}
          className="bg-transparent border border-border text-text-subtle rounded-sm px-2.5 py-1 text-[11px] cursor-pointer whitespace-nowrap shrink-0"
        >
          {selectMode ? t("label.exitSelectMode") : t("label.selectMode")}
        </button>
        {selectMode && (
          <>
            <span className="text-[11px] text-text-muted">
              {t("label.selectedCount")} {selectedUnicodes.length}
            </span>
            <button
              onClick={bulkCopy}
              className="bg-accent text-white border-none rounded-sm px-3 py-1 text-[11px] cursor-pointer"
            >
              {t("label.bulkCopy")}
            </button>
          </>
        )}
      </div>

      {isSearching ? (
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(110px,1fr))]">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="yr-skeleton border border-border rounded-sm bg-card h-[170px]"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(110px,1fr))]">
            {visible.map((card) => (
              <CharCard
                key={card.unicode}
                card={card}
                selectMode={selectMode}
                selected={selectedSet.has(card.unicode)}
                onToggleSelect={toggleCardSelect}
              />
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center py-6">
              <span className="text-text-muted text-sm">…</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
