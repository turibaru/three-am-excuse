// The wallet speaks for itself: this file only carries its line to the output folder.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// A hardware wallet never trusts the room it woke up in, so neither do we: the entry is read next to this script, never from wherever the caller happens to stand.
const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8");

// The gate only accepts one line, 1 to 200 characters, with real words in it.
if (line.trim().length === 0 || line.length > 200) {
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
// The output folder gets the line exactly as written, byte for byte.
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
