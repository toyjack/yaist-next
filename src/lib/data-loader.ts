import "server-only";
import fs from "fs";
import path from "path";
import { parseIvdSequences } from "./ivd-parser";

interface DataStore {
  idsRaw: string;
  variants: Record<string, string[]>;
  ivdMap: Map<string, string[]>;
  initialized: boolean;
}

const g = globalThis as typeof globalThis & { __yaistStore?: DataStore };

if (!g.__yaistStore) {
  g.__yaistStore = {
    idsRaw: "",
    variants: {},
    ivdMap: new Map(),
    initialized: false,
  };
}

export function getDataStore(): DataStore {
  if (!g.__yaistStore!.initialized) {
    const dir = path.join(process.cwd(), "public");
    g.__yaistStore!.idsRaw = fs.readFileSync(
      path.join(dir, "cjkvi_ids.txt"),
      "utf-8"
    );
    g.__yaistStore!.variants = JSON.parse(
      fs.readFileSync(path.join(dir, "variants.json"), "utf-8")
    );
    g.__yaistStore!.ivdMap = parseIvdSequences(
      fs.readFileSync(path.join(dir, "IVD_Sequences.txt"), "utf-8")
    );
    g.__yaistStore!.initialized = true;
  }
  return g.__yaistStore!;
}
