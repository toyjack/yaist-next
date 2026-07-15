"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  termAtom,
  sortStyleAtom,
  pasteTypeAtom,
  isSearchingAtom,
} from "@/store/atoms";
import { useSearch } from "@/hooks/useSearch";
import { parseTermHint } from "@/lib/helpers";
import XmlCustomizeModal from "./XmlCustomizeModal";

export default function SearchPanel() {
  const t = useTranslations();
  const [term, setTerm] = useAtom(termAtom);
  const [sortStyle, setSortStyle] = useAtom(sortStyleAtom);
  const [pasteType, setPasteType] = useAtom(pasteTypeAtom);
  const [isSearching] = useAtom(isSearchingAtom);
  const { search, decompose, fetchTermCards } = useSearch();
  const [xmlOpen, setXmlOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTermCards(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement && document.activeElement.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search(term, sortStyle);
  };

  const sortOptions: { key: "byUnicode" | "byStrokes"; label: string }[] = [
    { key: "byUnicode", label: t("option.byunicode") },
    { key: "byStrokes", label: t("option.bystrokecount") },
  ];

  const pasteOptions: { key: "character" | "unicode" | "tei"; label: string }[] = [
    { key: "character", label: t("option.pasteCharacter") },
    { key: "unicode", label: t("option.pasteUnicode") },
    { key: "tei", label: t("option.pasteTemplate") },
  ];

  return (
    <>
      <aside className="w-full md:w-[248px] shrink-0 flex flex-col gap-5 p-6 box-border border-b md:border-b-0 md:border-r border-border">
        <div>
          <label className="block font-serif font-semibold text-sm text-text mb-2">
            {t("label.searchLabel")}
          </label>
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="口土3"
            className="w-full box-border border border-input-border rounded-sm px-2.5 py-2 text-sm bg-card text-text font-serif"
          />
          <div className="mt-1.5 text-[11px] text-text-muted font-mono min-h-[14px]">
            {parseTermHint(term)}
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => decompose(term)}
            className="flex-1 bg-transparent text-text-subtle border border-input-border rounded-sm py-2 text-sm cursor-pointer"
          >
            {t("button.decompose")}
          </button>
          <button
            onClick={() => search(term, sortStyle)}
            disabled={isSearching}
            className="flex-1 bg-accent text-white border-none rounded-sm py-2 text-sm tracking-wide cursor-pointer disabled:opacity-60"
          >
            {isSearching ? "…" : t("button.search")}
          </button>
        </div>

        <div>
          <label className="block font-semibold text-xs text-text-muted mb-2 uppercase tracking-wider">
            {t("label.sortby")}
          </label>
          {sortOptions.map((opt) => (
            <label
              key={opt.key}
              className="flex gap-2 items-center text-sm text-text-subtle py-0.5 cursor-pointer"
            >
              <input
                type="radio"
                name="sortStyle"
                checked={sortStyle === opt.key}
                onChange={() => setSortStyle(opt.key)}
                className="accent-accent"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div>
          <label className="block font-semibold text-xs text-text-muted mb-2 uppercase tracking-wider">
            {t("label.toPaste")}
          </label>
          {pasteOptions.map((opt) => (
            <label
              key={opt.key}
              className="flex gap-2 items-center text-sm text-text-subtle py-0.5 cursor-pointer"
            >
              <input
                type="radio"
                name="pasteType"
                checked={pasteType === opt.key}
                onChange={() => setPasteType(opt.key)}
                className="accent-accent"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <button
            onClick={() => setXmlOpen(true)}
            className="w-full bg-transparent border border-dashed border-input-border text-text-subtle rounded-sm py-2 text-xs cursor-pointer font-mono"
          >
            ⚙ {t("label.customTemplate")}
          </button>
        </div>
      </aside>

      <XmlCustomizeModal isOpen={xmlOpen} onClose={() => setXmlOpen(false)} />
    </>
  );
}
