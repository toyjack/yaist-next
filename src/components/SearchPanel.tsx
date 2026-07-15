"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  termAtom,
  sortStyleAtom,
  pasteTypeAtom,
  isSearchingAtom,
} from "@/store/atoms";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPanel() {
  const t = useTranslations();
  const [term, setTerm] = useAtom(termAtom);
  const [sortStyle, setSortStyle] = useAtom(sortStyleAtom);
  const [pasteType, setPasteType] = useAtom(pasteTypeAtom);
  const [isSearching] = useAtom(isSearchingAtom);
  const { search, decompose, fetchTermCards } = useSearch();

  useEffect(() => {
    fetchTermCards(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search(term, sortStyle);
  };

  return (
    <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto p-4 border-r border-base-200 bg-base-50 space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">
            {t("label.searchLabel")}
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered input-sm"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="口土3"
        />
      </div>

      <div className="flex gap-2">
        <button
          className="btn btn-error btn-sm flex-1"
          onClick={() => decompose(term)}
        >
          {t("button.decompose")}
        </button>
        <button
          className="btn btn-primary btn-sm flex-1"
          onClick={() => search(term, sortStyle)}
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            t("button.search")
          )}
        </button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">{t("label.sortby")}</span>
        </label>
        {(["byUnicode", "byStrokes"] as const).map((val) => (
          <label key={val} className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              name="sortStyle"
              className="radio radio-sm"
              value={val}
              checked={sortStyle === val}
              onChange={() => setSortStyle(val)}
            />
            <span className="label-text">
              {val === "byUnicode"
                ? t("option.byunicode")
                : t("option.bystrokecount")}
            </span>
          </label>
        ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">{t("label.toPaste")}</span>
        </label>
        {(["character", "unicode", "tei"] as const).map((val) => (
          <label key={val} className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              name="pasteType"
              className="radio radio-sm"
              value={val}
              checked={pasteType === val}
              onChange={() => setPasteType(val)}
            />
            <span className="label-text">
              {val === "character"
                ? t("option.pasteCharacter")
                : val === "unicode"
                ? t("option.pasteUnicode")
                : t("option.pasteTemplate")}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
