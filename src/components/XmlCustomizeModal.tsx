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
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">{t("label.customTemplate")}</h3>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">{t("label.templateField")}</span>
          </label>
          <textarea
            className="textarea textarea-bordered font-mono text-sm h-48"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </div>

        <div className="bg-base-200 rounded p-3 text-xs space-y-1 mb-4">
          <p>{t("help.templateUnicode")}</p>
          <p>{t("help.templateIDS")}</p>
          <p>{t("help.templateCharacter")}</p>
          <p>{t("help.templateGlyphWiki")}</p>
          <p>{t("help.templateStandard")}</p>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            {t("label.save")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
