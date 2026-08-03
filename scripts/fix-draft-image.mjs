/**
 * Copies the involvedImage from the published homePage to the draft,
 * so Unique publishing from Studio doesn't revert the photo.
 *
 *   node --use-system-ca scripts/fix-draft-image.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const token = JSON.parse(
  readFileSync(
    join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".config", "sanity", "config.json"),
    "utf8",
  ),
).authToken;

const client = createClient({
  projectId: "j4qcykkp",
  dataset: "production",
  apiVersion: "2026-07-19",
  token,
  useCdn: false,
});

async function main() {
  const published = await client.getDocument("homePage");
  if (!published?.involvedImage) {
    console.error("No involvedImage found on published document.");
    process.exit(1);
  }

  console.log("Published image ref:", published.involvedImage._ref ?? JSON.stringify(published.involvedImage));

  const draft = await client.getDocument("drafts.homePage");
  if (!draft) {
    console.log("No draft document exists — nothing to fix.");
    return;
  }

  await client.patch("drafts.homePage").set({ involvedImage: published.involvedImage }).commit();
  console.log("✓ Draft document updated with correct photo.");
  console.log("\nDone. The photo will survive Unique's next publish.");
}

main().catch((e) => { console.error("\nFailed:", e.message); process.exit(1); });
