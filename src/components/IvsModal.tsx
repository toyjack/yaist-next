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
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {card.ivsCodes.map((ivs) => (
            <div
              key={ivs}
              className="card card-bordered cursor-pointer hover:bg-base-200 transition-colors"
              onClick={() => copyIvs(ivs)}
            >
              <figure className="p-2">
                <img
                  src={getIvsGwSvgUrl(card.char, ivs)}
                  alt={`IVS ${ivs}`}
                  className="w-full aspect-square object-contain"
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-2 pt-0">
                <p className="text-xs text-center text-base-content/70">
                  IVS: {ivs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}
