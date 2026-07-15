import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="p-[18px] text-center border-t border-border text-[11px] text-text-muted">
      <div>
        <a
          href="https://github.com/toyjack"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          {t("label.author")}
        </a>{" "}
        ｜ MIT License ｜{" "}
        <a
          href="https://github.com/toyjack/yaist"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          Source
        </a>
      </div>
      <div className="mt-1">
        <a href="http://chise.org/" target="_blank" rel="noopener noreferrer" className="text-accent">
          CHISE
        </a>
        {" · "}
        <a href="https://glyphwiki.org/" target="_blank" rel="noopener noreferrer" className="text-accent">
          GlyphWiki
        </a>
        {" · "}
        <a href="https://github.com/cjkvi/cjkvi-ids" target="_blank" rel="noopener noreferrer" className="text-accent">
          CJKVI-IDS
        </a>
        {" · "}
        <a href="https://unicode.org/ivd/" target="_blank" rel="noopener noreferrer" className="text-accent">
          Unihan / IVD
        </a>
      </div>
    </footer>
  );
}
