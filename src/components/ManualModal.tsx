"use client";

import { useTranslations } from "next-intl";

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManualModal({ isOpen, onClose }: ManualModalProps) {
  const t = useTranslations("manual");
  const tLabel = useTranslations("label");

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[rgba(20,16,12,0.45)] flex items-center justify-center z-[100] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg rounded-sm p-6 w-[480px] max-w-full relative box-border"
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 bg-transparent border-none text-lg cursor-pointer text-text-muted"
        >
          ✕
        </button>
        <h3 className="font-serif font-bold text-[19px] mb-4 text-text">
          {t("title")}
        </h3>

        <div className="text-sm text-text-subtle flex flex-col gap-3">
          <section>
            <div className="font-semibold mb-1 text-accent">{t("searchTitle")}</div>
            <p className="m-0">{t("searchDesc")}</p>
          </section>
          <div className="h-px bg-border" />
          <section>
            <div className="font-semibold mb-1 text-accent">{t("decomposeTitle")}</div>
            <p className="m-0">{t("decomposeDesc")}</p>
          </section>
          <div className="h-px bg-border" />
          <section>
            <div className="font-semibold mb-1 text-accent">{t("ivsTitle")}</div>
            <p className="m-0">{t("ivsDesc")}</p>
          </section>
          <div className="h-px bg-border" />
          <section>
            <div className="font-semibold mb-1 text-accent">{t("pasteTitle")}</div>
            <p className="m-0">{t("pasteDesc")}</p>
          </section>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="bg-accent text-white border-none rounded-sm px-5 py-2 text-sm cursor-pointer"
          >
            {tLabel("ok")}
          </button>
        </div>
      </div>
    </div>
  );
}
