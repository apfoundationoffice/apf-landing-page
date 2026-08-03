/**
 * Replaces the Get Involved section photo with the new image.
 *   node --use-system-ca scripts/update-involved-photo.mjs
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
  const file = join(process.env.USERPROFILE ?? "", "Downloads", "Image from iOS.jpg");
  console.log("Uploading new Get Involved photo…");
  const asset = await client.assets.upload("image", readFileSync(file), { filename: "get-involved-hug.jpg" });

  await client.patch("homePage").set({
    involvedImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "A mentor and young adult sharing a warm embrace — a moment of connection and support",
    },
  }).commit();

  console.log("Done. Live site will show the new photo within ~60 seconds.");
}

main().catch((e) => { console.error("\nFailed:", e.message); process.exit(1); });
