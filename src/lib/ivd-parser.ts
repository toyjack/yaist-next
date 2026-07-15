export function parseIvdSequences(raw: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const line of raw.split("\n")) {
    if (line.startsWith("#")) continue;
    const cells = line.split(" ");
    if (cells.length < 4) continue;
    const entryCode = cells[0];
    const ivsCode = cells[1].substring(0, 5);
    const existing = map.get(entryCode);
    if (existing) {
      if (!existing.includes(ivsCode)) existing.push(ivsCode);
    } else {
      map.set(entryCode, [ivsCode]);
    }
  }
  return map;
}
