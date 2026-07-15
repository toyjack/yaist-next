"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { sortedResultsAtom, isSearchingAtom } from "@/store/atoms";
import CharCard from "./CharCard";

export default function ResultsGrid() {
  const t = useTranslations();
  const [results] = useAtom(sortedResultsAtom);
  const [isSearching] = useAtom(isSearchingAtom);

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
        {results.map((card) => (
          <CharCard key={card.unicode} card={card} />
        ))}
      </div>
    </div>
  );
}
