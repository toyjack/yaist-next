import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-8 text-xs">
      <div>
        <p>
          Author:{" "}
          <a
            href="https://github.com/toyjack"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("label.author")}
          </a>{" "}
          | MIT License |{" "}
          <a
            href="https://github.com/toyjack/yaist"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
        <p className="text-base-content/60">
          Data:{" "}
          <a href="http://chise.org/" className="link" target="_blank" rel="noopener noreferrer">CHISE</a>
          {" | "}
          <a href="https://glyphwiki.org/" className="link" target="_blank" rel="noopener noreferrer">GlyphWiki</a>
          {" | "}
          <a href="https://github.com/cjkvi/cjkvi-ids" className="link" target="_blank" rel="noopener noreferrer">CJKVI-IDS</a>
          {" | "}
          <a href="https://unicode.org/ivd/" className="link" target="_blank" rel="noopener noreferrer">Unihan / IVD</a>
        </p>
        <p className="text-base-content/50">
          Supported by University of Tokyo Historiographical Institute
        </p>
      </div>
    </footer>
  );
}
