"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { pasteTypeAtom, templateAtom } from "@/store/atoms";
import { char2Unicode, fillTemplate } from "@/lib/helpers";
import IvsModal from "./IvsModal";
import type { CharCardData } from "@/types";

interface CharCardProps {
  card: CharCardData;
  selectMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (card: CharCardData) => void;
}

export default function CharCard({
  card,
  selectMode = false,
  selected = false,
  onToggleSelect,
}: CharCardProps) {
  const t = useTranslations();
  const [pasteType] = useAtom(pasteTypeAtom);
  const [template] = useAtom(templateAtom);
  const [ivsOpen, setIvsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (selectMode) {
      onToggleSelect?.(card);
      return;
    }

    let toPaste = "";
    switch (pasteType) {
      case "character":
        toPaste = card.char;
        break;
      case "unicode":
        toPaste = card.unicode;
        break;
      case "tei":
        toPaste = fillTemplate(template, {
          unicode: card.unicode,
          ids: card.ids,
          char: card.char,
          standard: card.variants.join(""),
          gwSvgUrl: card.gwSvgUrl,
          gwPngUrl: card.gwPngUrl,
        });
        break;
    }

    await navigator.clipboard.writeText(toPaste).catch(console.error);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const unicodeHex = char2Unicode(card.char).substring(2).toLowerCase();

  return (
    <>
      <div
        onClick={() => selectMode && onToggleSelect?.(card)}
        className={`border rounded-sm bg-card flex flex-col cursor-pointer relative ${
          selected ? "border-2 border-accent" : "border-border"
        }`}
      >
        {selectMode && (
          <div
            className="absolute top-1.5 left-1.5 w-[18px] h-[18px] rounded-[3px] border-[1.5px] border-accent z-[2] flex items-center justify-center text-[11px] text-white"
            style={{ background: selected ? "var(--color-accent)" : "transparent" }}
          >
            {selected ? "✓" : ""}
          </div>
        )}
        <div
          onClick={copyToClipboard}
          title={t("message.copied")}
          className="p-3.5 flex items-center justify-center bg-panel relative"
        >
          <span className="font-serif text-[44px] text-text leading-none">
            {card.char}
          </span>
          {copied && (
            <div className="absolute inset-0 flex items-center justify-center bg-panel/95">
              <span className="bg-[#5C6B4F] text-white text-[11px] px-2.5 py-1 rounded-sm">
                {t("message.copied")}
              </span>
            </div>
          )}
        </div>
        <div className="px-3 py-2.5 border-t border-border flex flex-col gap-0.5">
          <a
            href={`https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=${unicodeHex}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => selectMode && e.preventDefault()}
            className="font-mono text-[11px] text-accent"
          >
            {card.unicode}
          </a>
          <span className="text-[10px] text-text-muted">{card.block}</span>
          <span className="text-[11px] text-text-subtle">
            {t("label.totalStrokes")} {card.strokes} ｜ {t("label.relatedChar")}{" "}
            {card.variants.length > 0 ? card.variants.join("") : "X"}
          </span>
        </div>
        {card.ivsCodes.length > 0 && !selectMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIvsOpen(true);
            }}
            className="border-t border-border bg-transparent py-1.5 text-[11px] text-accent cursor-pointer font-mono"
          >
            IVS
          </button>
        )}
      </div>

      {ivsOpen && (
        <IvsModal
          card={card}
          isOpen={ivsOpen}
          onClose={() => setIvsOpen(false)}
        />
      )}
    </>
  );
}
