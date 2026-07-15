"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { templateAtom } from "@/store/atoms";

interface XmlCustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function XmlCustomizeModal({
  isOpen,
  onClose,
}: XmlCustomizeModalProps) {
  const t = useTranslations();
  const [template, setTemplate] = useAtom(templateAtom);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[rgba(20,16,12,0.45)] flex items-center justify-center z-[100] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg rounded-sm p-6 w-[560px] max-w-full relative box-border"
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 bg-transparent border-none text-lg cursor-pointer text-text-muted"
        >
          ✕
        </button>
        <h3 className="font-serif font-bold text-[19px] mb-4 text-text">
          {t("label.customTemplate")}
        </h3>

        <label className="text-sm text-text-subtle block mb-1.5">
          {t("label.templateField")}
        </label>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full h-[140px] box-border border border-input-border rounded-sm p-2.5 font-mono text-xs mb-4 bg-card text-text"
        />

        <div className="bg-panel border border-border rounded-sm p-3 text-xs text-text-subtle flex flex-col gap-1 mb-4">
          <p className="m-0">{t("help.templateUnicode")}</p>
          <p className="m-0">{t("help.templateIDS")}</p>
          <p className="m-0">{t("help.templateCharacter")}</p>
          <p className="m-0">{t("help.templateGlyphWiki")}</p>
          <p className="m-0">{t("help.templateStandard")}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-accent text-white border-none rounded-sm px-5 py-2 text-sm cursor-pointer"
          >
            {t("label.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
