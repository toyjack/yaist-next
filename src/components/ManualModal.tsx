"use client";

import { useTranslations } from "next-intl";

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManualModal({ isOpen, onClose }: ManualModalProps) {
  const t = useTranslations("manual");

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">{t("title")}</h3>

        <div className="space-y-4 text-sm">
          <section>
            <h4 className="font-semibold mb-1">{t("searchTitle")}</h4>
            <p className="text-base-content/80">{t("searchDesc")}</p>
          </section>
          <div className="divider my-2"></div>
          <section>
            <h4 className="font-semibold mb-1">{t("decomposeTitle")}</h4>
            <p className="text-base-content/80">{t("decomposeDesc")}</p>
          </section>
          <div className="divider my-2"></div>
          <section>
            <h4 className="font-semibold mb-1">{t("ivsTitle")}</h4>
            <p className="text-base-content/80">{t("ivsDesc")}</p>
          </section>
          <div className="divider my-2"></div>
          <section>
            <h4 className="font-semibold mb-1">{t("pasteTitle")}</h4>
            <p className="text-base-content/80">{t("pasteDesc")}</p>
          </section>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
}
