"use client";

import { useAtom } from "jotai";
import { pasteTypeAtom, templateAtom } from "@/store/atoms";
import { char2Unicode, getIvsGwSvgUrl, getIvsGwPngUrl, fillTemplate } from "@/lib/helpers";
import type { CharCardData } from "@/types";

interface IvsModalProps {
  card: CharCardData;
  isOpen: boolean;
  onClose: () => void;
}

export default function IvsModal({ card, isOpen, onClose }: IvsModalProps) {
  const [pasteType] = useAtom(pasteTypeAtom);
  const [template] = useAtom(templateAtom);

  if (!isOpen) return null;

  const copyIvs = async (ivs: string) => {
    const xmlid =
      "u" + char2Unicode(card.char).substring(2).toLowerCase() + "-u" + ivs.toLowerCase();
    const charWithIvs = card.char + String.fromCodePoint(parseInt("0x" + ivs, 16));

    let toPaste = "";
    switch (pasteType) {
      case "character":
        toPaste = charWithIvs;
        break;
      case "unicode":
        toPaste = xmlid;
        break;
      case "tei":
        toPaste = fillTemplate(template, {
          unicode: xmlid,
          ids: card.ids,
          char: charWithIvs,
          standard: card.variants.join(""),
          gwSvgUrl: getIvsGwSvgUrl(card.char, ivs),
          gwPngUrl: getIvsGwPngUrl(card.char, ivs),
        });
        break;
    }

    await navigator.clipboard.writeText(toPaste).catch(console.error);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[rgba(20,16,12,0.45)] flex items-center justify-center z-[100] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg rounded-sm p-6 w-[640px] max-w-full relative box-border"
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 bg-transparent border-none text-lg cursor-pointer text-text-muted"
        >
          ✕
        </button>
        <h3 className="font-serif font-bold text-[19px] mb-4 text-text">
          {card.char} 的异体字选择符
        </h3>
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(100px,1fr))]">
          {card.ivsCodes.map((ivs) => (
            <div
              key={ivs}
              onClick={() => copyIvs(ivs)}
              className="border border-border rounded-sm bg-card p-2.5 text-center cursor-pointer"
            >
              <img
                src={getIvsGwSvgUrl(card.char, ivs)}
                alt={`IVS ${ivs}`}
                className="w-full aspect-square object-contain"
                loading="lazy"
              />
              <div className="font-mono text-[10px] text-accent mt-1.5">
                IVS {ivs}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
