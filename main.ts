import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One Word From Grandma: the single word a grandma would text about AI.
// She half-heard "ChatGPT" and typed what stuck.
const WORD = "ChatGippity";

// The gate is strict: exactly one word, 1-30 chars, no whitespace,
// no punctuation tricks. Refuse anything else rather than ship it.
function checkWord(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1-30 chars, got ${word.length}`);
  }
  if (/\s/.test(word) || /[.,!?;:'"()\[\]{}]/.test(word)) {
    throw new Error("word must be a single word with no punctuation tricks");
  }
}

checkWord(WORD);

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
const path = join(outDir, "entry.txt");
writeFileSync(path, WORD, "utf8");
console.log(`wrote ${path} (${WORD.length} chars)`);
