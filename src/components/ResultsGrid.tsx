"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { sortedResultsAtom, isSearchingAtom, pageSizeAtom } from "@/store/atoms";
import CharCard from "./CharCard";

const PAGE_STEP = 50;

export default function ResultsGrid() {
  const t = useTranslations();
  const [results] = useAtom(sortedResultsAtom);
  const [isSearching] = useAtom(isSearchingAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visible = results.slice(0, pageSize);
  const hasMore = pageSize < results.length;

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

  if (isSearching) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div>
      <div className="divider">
        {t("label.numberOfResults")}
        {results.length}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {visible.map((card) => (
          <CharCard key={card.unicode} card={card} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          <span className="loading loading-dots loading-md"></span>
        </div>
      )}
    </div>
  );
}
