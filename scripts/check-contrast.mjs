/**
 * Checks text contrast for every colour theme against WCAG 2.1 AA.
 *
 * The whole reason the dashboard offers preset themes rather than colour
 * pickers is that a free picker lets someone publish unreadable text without
 * knowing. That promise is only worth anything if the presets are actually
 * checked — so this runs over the real token values parsed out of globals.css.
 *
 *   node scripts/check-contrast.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app", "globals.css"),
  "utf8",
);

/**
 * Pull the token block for a selector out of the stylesheet.
 * `after` disambiguates when a selector appears more than once — the brand
 * tokens live in a second `:root`, following shadcn's own.
 */
function tokensFor(selector, after) {
  const from = after ? css.indexOf(after) : 0;
  if (from === -1) throw new Error(`Marker not found: ${after}`);
  const start = css.indexOf(selector, from);
  if (start === -1) throw new Error(`Selector not found: ${selector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const body = css.slice(open + 1, close);
  const tokens = {};
  for (const line of body.split("\n")) {
    const m = line.match(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/);
    if (m) tokens[m[1]] = m[2];
  }
  return tokens;
}

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Every text-on-background pair the design actually renders.
 * `large` marks text at or above ~24px, where AA allows 3:1.
 */
const PAIRS = [
  { name: "body text on page", fg: "--ink", bg: "--ivory", min: 4.5 },
  { name: "soft body text on page", fg: "--ink-soft", bg: "--ivory", min: 4.5 },
  { name: "muted text on page", fg: "--muted-ink", bg: "--ivory", min: 4.5 },
  { name: "headings on page", fg: "--navy", bg: "--ivory", min: 4.5 },
  { name: "eyebrow label on page", fg: "--gold-deep", bg: "--ivory", min: 4.5 },
  { name: "body text on sand", fg: "--ink-soft", bg: "--sand", min: 4.5 },
  { name: "headings on sand", fg: "--navy", bg: "--sand", min: 4.5 },
  { name: "text on navy", fg: "--on-navy", bg: "--navy", min: 4.5 },
  { name: "muted text on navy", fg: "--on-navy-mut", bg: "--navy", min: 4.5 },
  { name: "text on deep navy", fg: "--on-navy", bg: "--navy-deep", min: 4.5 },
  { name: "gold accent on navy (large)", fg: "--gold-soft", bg: "--navy", min: 3 },
  { name: "gold button label", fg: "--navy-deep", bg: "--gold", min: 4.5 },
  { name: "white card text", fg: "--navy", bg: "#ffffff", min: 4.5 },
];

const BRAND_TOKENS_MARKER = "ANCHORED PATHWAYS — DESIGN TOKENS";

const THEMES = [
  ["anchor (default)", null],
  ["evening", '[data-theme="evening"]'],
  ["sand", '[data-theme="sand"]'],
  ["christmas", '[data-theme="christmas"]'],
];

const base = tokensFor(":root {", BRAND_TOKENS_MARKER);
let failures = 0;

for (const [label, selector] of THEMES) {
  const tokens = selector ? { ...base, ...tokensFor(selector) } : base;
  console.log(`\n${label}`);
  for (const pair of PAIRS) {
    const fg = pair.fg.startsWith("#") ? pair.fg : tokens[pair.fg];
    const bg = pair.bg.startsWith("#") ? pair.bg : tokens[pair.bg];
    if (!fg || !bg) {
      console.log(`  ?  ${pair.name} — token missing`);
      failures++;
      continue;
    }
    const r = ratio(fg, bg);
    const ok = r >= pair.min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"} ${pair.name.padEnd(30)} ${r.toFixed(2)}:1 (needs ${pair.min}:1)`,
    );
  }
}

console.log(
  failures === 0
    ? "\nAll themes pass WCAG AA for every text pair.\n"
    : `\n${failures} contrast failure(s).\n`,
);
process.exit(failures === 0 ? 0 : 1);
