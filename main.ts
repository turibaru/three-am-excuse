// The wallet speaks for itself: this file only carries its line to the output folder.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Nothing here is invented at runtime: the words on disk are the whole entry, and this script only carries them along.

// A hardware wallet never trusts the room it woke up in, so neither do we: the entry is read next to this script, never from wherever the caller happens to stand.
const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8");

// The gate only accepts one line, 1 to 200 characters, with real words in it.
// An empty line says nothing and an overlong line says too much — either way there is nothing worth delivering.
if (line.trim().length === 0 || line.length > 200) {
  process.exit(1);
}

// The destination comes from the environment when one is given, and falls back to a plain folder named output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
// The output folder gets the line exactly as written, byte for byte.
// What lands in the output folder is the same line, untouched — no trimming, no rewording, no extra newline.
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
