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
}

export default function CharCard({ card }: CharCardProps) {
  const t = useTranslations();
  const [pasteType] = useAtom(pasteTypeAtom);
  const [template] = useAtom(templateAtom);
  const [ivsOpen, setIvsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
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
      <div className="card card-bordered bg-base-100 shadow-sm hover:shadow-md transition-shadow">
        <figure
          className="cursor-pointer p-2 relative"
          onClick={copyToClipboard}
          title={t("message.copied")}
        >
          <img
            src={card.gwSvgUrl}
            alt={card.char}
            className="w-full aspect-square object-contain"
            loading="lazy"
          />
          {copied && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100/80 rounded">
              <span className="badge badge-success text-xs">
                {t("message.copied")}
              </span>
            </div>
          )}
        </figure>
        <div className="card-body p-2 gap-1">
          <div className="flex items-center gap-2">
            <span className="text-3xl leading-none">{card.char}</span>
            <div className="flex flex-col text-xs">
              <a
                href={`https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=${unicodeHex}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary font-mono"
              >
                {card.unicode}
              </a>
              <span className="text-base-content/60">{card.block}</span>
            </div>
          </div>
          <div className="text-xs text-base-content/80">
            {t("label.totalStrokes")}：{card.strokes}
          </div>
          <div className="text-xs text-base-content/80">
            {t("label.relatedChar")}：
            {card.variants.length > 0 ? card.variants.join("") : "X"}
          </div>
        </div>
        {card.ivsCodes.length > 0 && (
          <div className="card-footer border-t border-base-200">
            <button
              className="btn btn-ghost btn-xs w-full"
              onClick={() => setIvsOpen(true)}
            >
              IVS
            </button>
          </div>
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
