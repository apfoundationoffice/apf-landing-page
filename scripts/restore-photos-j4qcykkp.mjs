/**
 * Restores Unique's photo package into the NEW Sanity project (j4qcykkp)
 * after the project switch left it with the original stock photos.
 * Content-only change — no code deploy needed.
 *   node --use-system-ca scripts/restore-photos-j4qcykkp.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const token = JSON.parse(
  readFileSync(join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".config", "sanity", "config.json"), "utf8"),
).authToken;

const client = createClient({
  projectId: "j4qcykkp",
  dataset: "production",
  apiVersion: "2026-07-19",
  token,
  useCdn: false,
});

const DIR = join(process.env.USERPROFILE ?? "", "Downloads", "APF-Website-Photo-Package");

async function upload(file) {
  const asset = await client.assets.upload("image", readFileSync(join(DIR, file)), { filename: file });
  return asset._id;
}
const img = (assetId, alt) => ({ _type: "image", asset: { _type: "reference", _ref: assetId }, alt });

async function main() {
  console.log("Uploading 7 images to j4qcykkp…");
  const hero = await upload("01-homepage-hero-1200x1500.png");
  const disc = await upload("02-discipleship-program-1280x800.png");
  const life = await upload("03-life-stability-program-1280x800.png");
  const believe = await upload("04-believe-gathering-1200x1500.png");
  const involved = await upload("05-get-involved-1200x1500.png");
  const founder = await upload("06-founder-about-1200x1200.png");
  const logo = await upload("07-apf-logo-transparent-400px.png");
  console.log("  uploaded");

  await client
    .patch("homePage")
    .set({
      heroImage: img(hero, "A diverse group of young adults joining hands together, smiling — a hopeful, welcoming moment"),
      involvedImage: img(involved, "A woman warmly embracing a young adult in a comforting, supportive moment"),
      aboutImage: img(founder, "The founder of Anchored Pathways Foundation wearing the foundation shirt, beside a warmly lit Christmas tree"),
      'programs[_key=="discipleship"].image': img(disc, "A young woman on a video call with her small group, an open Bible on the table in front of her"),
      'programs[_key=="bridge"].image': img(life, "A mentor and young adults working together around a table on plans, goals, and life skills"),
    })
    .commit();
  console.log("  homepage photos set");

  await client
    .patch("event-believe-gathering")
    .set({ image: img(believe, "The Believe Gathering — a warm, candlelit Christmas banquet in navy and gold, with 'You are seen, you are loved, you belong here' banners") })
    .commit();
  console.log("  event photo set");

  await client.patch("siteSettings").set({ logo: img(logo, "Anchored Pathways Foundation") }).commit();
  console.log("  logo set");

  console.log("\nDone. Live site will show the new photos within ~60 seconds.");
}

main().catch((e) => { console.error("\nFailed:", e.message); process.exit(1); });
