"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { darkModeAtom } from "@/store/atoms";
import ManualModal from "./ManualModal";

const locales = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh-cn", label: "中文" },
];

export default function Navbar() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [manualOpen, setManualOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const switchLocale = (locale: string) => {
    setLangMenuOpen(false);
    setMobileMenuOpen(false);
    router.push(pathname, { locale });
  };

  return (
    <>
      <nav className="flex items-center justify-between gap-3 px-5 py-3.5 bg-bg border-b-2 border-accent sticky top-0 z-50">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="font-serif font-bold text-xl tracking-wide whitespace-nowrap text-text">
            YAIST
          </span>
          {!isNarrow && (
            <span className="text-xs text-text-muted whitespace-nowrap">
              (Yet Another IDS Search Tool) 
            </span>
          )}
        </div>

        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="切换深色模式"
            className="bg-transparent border border-border text-text rounded-sm px-2.5 py-1 text-xs whitespace-nowrap cursor-pointer"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          {!isNarrow && (
            <>
              <div className="relative">
                <span
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="cursor-pointer whitespace-nowrap text-sm text-text-subtle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
</svg>

                </span>
                {langMenuOpen && (
                  <ul className="absolute right-0 top-6 bg-card border border-border p-1.5 w-28 list-none m-0 shadow-lg z-[60]">
                    {locales.map((loc) => (
                      <li
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className="px-2 py-1.5 text-sm cursor-pointer hover:bg-panel"
                      >
                        {loc.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <span
                onClick={() => setManualOpen(true)}
                className="cursor-pointer whitespace-nowrap text-sm text-text-subtle"
              >
                {t("label.manual")}
              </span>
            </>
          )}

          {isNarrow && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-transparent border-none text-2xl text-accent cursor-pointer px-2 py-1"
            >
              ☰
            </button>
          )}
        </div>
      </nav>

      {isNarrow && mobileMenuOpen && (
        <div className="border-b border-border bg-panel px-5 py-3 flex flex-col gap-2.5 text-sm text-text-subtle">
          <span
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="cursor-pointer"
          >
            语言：
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className="ml-1 underline"
              >
                {loc.label}
              </button>
            ))}
          </span>
          <span
            onClick={() => {
              setManualOpen(true);
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer"
          >
            {t("label.manual")}
          </span>
        </div>
      )}

      <ManualModal isOpen={manualOpen} onClose={() => setManualOpen(false)} />
    </>
  );
}
