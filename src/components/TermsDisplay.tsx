"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { termCardsAtom } from "@/store/atoms";
import CharCard from "./CharCard";

export default function TermsDisplay() {
  const t = useTranslations();
  const [termCards] = useAtom(termCardsAtom);

  if (termCards.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="divider">
        {t("label.inputedLength")}：{termCards.length}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {termCards.map((card) => (
          <CharCard key={card.unicode} card={card} />
        ))}
      </div>
    </div>
  );
}
