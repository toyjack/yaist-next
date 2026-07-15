export function fixedCharCodeAt(str: string, idx: number = 0): number | false {
  const code = str.charCodeAt(idx);
  if (0xd800 <= code && code <= 0xdbff) {
    const hi = code;
    const low = str.charCodeAt(idx + 1);
    if (isNaN(low)) {
      throw new Error("High surrogate not followed by low surrogate in fixedCharCodeAt()");
    }
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
  }
  if (0xdc00 <= code && code <= 0xdfff) {
    return false;
  }
  return code;
}

export function charCode2Unicode(charCode: number): string {
  return "U+" + charCode.toString(16).toUpperCase();
}

export function char2Unicode(char: string): string {
  const code = fixedCharCodeAt(char, 0);
  if (code === false) return "";
  return charCode2Unicode(code);
}

export function getUnicodeBlock(char: string): string {
  const blocks = [
    { name: "CJK", start: "U+4E00", end: "U+9FFC" },
    { name: "Ext. A", start: "U+3400", end: "U+4DBF" },
    { name: "Ext. B", start: "U+20000", end: "U+2A6DD" },
    { name: "Ext. C", start: "U+2A700", end: "U+2B734" },
    { name: "Ext. D", start: "U+2B740", end: "U+2B81D" },
    { name: "Ext. E", start: "U+2B820", end: "U+2CEA1" },
    { name: "Ext. F", start: "U+2CEB0", end: "U+2EBE0" },
    { name: "Ext. G", start: "U+30000", end: "U+3134A" },
    { name: "Ext. H", start: "U+31350", end: "U+323AF" },
    { name: "Ext. I", start: "U+2EBF0", end: "U+2EE5F" },
    { name: "Ext. J", start: "U+323B0", end: "U+3347F" },
  ];
  const charPoint = fixedCharCodeAt(char);
  if (charPoint === false) return "Unknown";
  for (const block of blocks) {
    const start = parseInt(block.start.substring(2), 16);
    const end = parseInt(block.end.substring(2), 16);
    if (charPoint >= start && charPoint <= end) {
      return block.name;
    }
  }
  return "Unknown";
}

export function getGwPngUrl(char: string): string {
  const code = "u" + char2Unicode(char).substring(2).toLowerCase();
  return "https://glyphwiki.org/glyph/" + code + ".png";
}

export function getGwSvgUrl(char: string): string {
  const code = "u" + char2Unicode(char).substring(2).toLowerCase();
  return "https://glyphwiki.org/glyph/" + code + ".svg";
}

export function convertCodePoints(str: string): string[] {
  return Array.from(str).map((char) => {
    return (char.codePointAt(0) ?? 0).toString(16);
  });
}

export function getIvsGwSvgUrl(char: string, ivsCode: string): string {
  const baseCode = "u" + char2Unicode(char).substring(2).toLowerCase();
  const ivsHex = ivsCode.toLowerCase();
  return `https://glyphwiki.org/glyph/${baseCode}-u${ivsHex}.svg`;
}

export function getIvsGwPngUrl(char: string, ivsCode: string): string {
  const baseCode = "u" + char2Unicode(char).substring(2).toLowerCase();
  const ivsHex = ivsCode.toLowerCase();
  return `https://glyphwiki.org/glyph/${baseCode}-u${ivsHex}.png`;
}

export const DEFAULT_TEMPLATE = `<glyph xml:id="[[unicode]]">
    <mapping type="IDS">[[IDS]]</mapping>
    <mapping type="Unicode">[[character]]</mapping>
    <mapping type="alt">[[standard]]</mapping>
    <figure>
        <graphic url="[[GlyphWikiSVG]]"/>
    </figure>
</glyph>
`;

export function fillTemplate(
  template: string,
  data: {
    unicode: string;
    ids: string;
    char: string;
    standard: string;
    gwSvgUrl: string;
    gwPngUrl: string;
  }
): string {
  return template
    .replace(/\[\[unicode\]\]/g, data.unicode.replace("U+", "u").toLowerCase())
    .replace(/\[\[IDS\]\]/g, data.ids)
    .replace(/\[\[character\]\]/g, data.char)
    .replace(/\[\[standard\]\]/g, data.standard)
    .replace(/\[\[GlyphWikiSVG\]\]/g, data.gwSvgUrl)
    .replace(/\[\[GlyphWikiPNG\]\]/g, data.gwPngUrl);
}
