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
    <div className="mb-6">
      <div className="flex items-center gap-3.5 text-text-muted text-xs mb-3.5 tracking-wide">
        <span className="font-serif text-accent">{t("label.inputedLength")}</span>
        <div className="flex-1 h-px bg-border" />
        {termCards.length}
      </div>
      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(110px,1fr))]">
        {termCards.map((card) => (
          <CharCard key={card.unicode} card={card} />
        ))}
      </div>
    </div>
  );
}
