"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import ManualModal from "./ManualModal";
import XmlCustomizeModal from "./XmlCustomizeModal";

const locales = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh-cn", label: "中文" },
];

export default function Navbar() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [manualOpen, setManualOpen] = useState(false);
  const [xmlOpen, setXmlOpen] = useState(false);

  const switchLocale = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <>
      <nav className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-md">
        <div className="navbar-start">
          <span className="font-bold text-sm md:text-base truncate">
            YAIST
          </span>
          <span className="hidden md:inline ml-2 text-xs opacity-70">
            Yet Another IDS Search Tool
          </span>
        </div>
        <div className="navbar-end gap-1">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              Lang
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-32 z-50"
            >
              {locales.map((loc) => (
                <li key={loc.code}>
                  <button onClick={() => switchLocale(loc.code)}>
                    {loc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setXmlOpen(true)}
          >
            {t("label.changeTemplate")}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setManualOpen(true)}
          >
            {t("label.manual")}
          </button>
        </div>
      </nav>

      <ManualModal isOpen={manualOpen} onClose={() => setManualOpen(false)} />
      <XmlCustomizeModal isOpen={xmlOpen} onClose={() => setXmlOpen(false)} />
    </>
  );
}
