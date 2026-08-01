/**
 * Updates the three placeholder form links now that Unique has sent the
 * finalized Google Form URLs.
 *
 *   node --use-system-ca scripts/update-links.mjs
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

const DISCIPLESHIP_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfM0q8vemGOgDfeU4BMq2ddcnvhGjzal1yPFYxfTdbhvRr1FQ/viewform?usp=header";

const BELIEVE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSenEdiwR51aQzHl9wFwKePYXtc_z3utKnEk2PV8a-A6hLblEw/viewform?usp=header";

async function main() {
  // 1. Discipleship program button → Google Form
  const home = await client.getDocument("homePage");
  if (!home) { console.error("No homePage document found."); process.exit(1); }

  const progs = Array.isArray(home.programs) ? home.programs : [];
  const updatedPrograms = progs.map((p) => {
    if (/discipleship/i.test(p.tag ?? "") || /discipleship/i.test(p._key ?? "")) {
      return { ...p, buttonUrl: DISCIPLESHIP_FORM };
    }
    return p;
  });

  await client.patch("homePage").set({
    programs: updatedPrograms,
    involvedButtonUrl: BELIEVE_FORM,
  }).commit();
  console.log("✓ Discipleship button → Google Form");
  console.log("✓ Get Involved button → Believe Gathering Google Form");

  // 2. Believe Gathering event signup → Google Form
  const events = await client.fetch(`*[_type == "event" && !hidden]{_id, title}`);
  const believe = events.find((e) => /believe/i.test(e.title ?? ""));
  if (believe) {
    await client.patch(believe._id).set({ signupUrl: BELIEVE_FORM }).commit();
    console.log("✓ Believe Gathering event signup → Google Form");
  } else {
    console.warn("! No visible Believe Gathering event found.");
  }

  console.log("\nDone. Live site will reflect the new links within ~60 seconds.");
}

main().catch((e) => { console.error("\nFailed:", e.message); process.exit(1); });
