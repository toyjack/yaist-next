export interface CharCardData {
  char: string;
  unicode: string;
  block: string;
  strokes: number;
  ids: string;
  variants: string[];
  ivsCodes: string[];
  gwSvgUrl: string;
  gwPngUrl: string;
}

export type PasteType = "character" | "unicode" | "tei";
export type SortStyle = "byUnicode" | "byStrokes";

export interface SearchResponse {
  results: CharCardData[];
  total: number;
  query: string;
}

export interface DecomposeResponse {
  char: string;
  ids: string;
  components: string[];
}
