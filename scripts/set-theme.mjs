/**
 * Dev helper: flip the site's theme and lettering without opening the
 * dashboard. Handy for eyeballing all four themes quickly.
 *
 *   node scripts/set-theme.mjs christmas classic
 *   node scripts/set-theme.mjs anchor warm      (back to the house style)
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const cfgPath = join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".config", "sanity", "config.json");
const token = JSON.parse(readFileSync(cfgPath, "utf8")).authToken;

const client = createClient({
  projectId: "wbmdk7c6",
  dataset: "production",
  apiVersion: "2026-07-19",
  token,
  useCdn: false,
});

const [theme = "anchor", fontPairing = "warm"] = process.argv.slice(2);

await client.patch("siteSettings").set({ theme, fontPairing }).commit();
console.log(`theme=${theme}  lettering=${fontPairing}`);
