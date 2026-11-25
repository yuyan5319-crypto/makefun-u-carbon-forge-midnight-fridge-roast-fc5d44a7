// Midnight Fridge Roast — writes one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). One line, 1-200 chars, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My fridge locks itself at midnight like a bouncer, and apparently the leftovers are VIPs and I'm not on the list.";

// The gate only accepts 1-200 chars of non-whitespace, on a single line.
// Fail loudly here instead of shipping an entry the scorer would reject.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`roast line must be 1-200 chars, got ${LINE.length}`);
}
if (/\n|\r/.test(LINE) || LINE.trim().length === 0) {
  throw new Error("roast line must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
