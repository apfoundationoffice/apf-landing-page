/**
 * Patches BOTH the published and draft homePage documents with the correct
 * Google Form links. Run this whenever a Studio publish overwrites the links.
 *
 *   node --use-system-ca scripts/fix-draft-links.mjs
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

async function patchLinks(docId) {
  const doc = await client.getDocument(docId);
  if (!doc) return false;

  const progs = Array.isArray(doc.programs) ? doc.programs : [];
  const updatedPrograms = progs.map((p) => {
    if (/discipleship/i.test(p.tag ?? "") || /discipleship/i.test(p._key ?? "")) {
      return { ...p, buttonUrl: DISCIPLESHIP_FORM };
    }
    return p;
  });

  await client.patch(docId).set({
    programs: updatedPrograms,
    involvedButtonUrl: BELIEVE_FORM,
  }).commit();
  return true;
}

async function main() {
  // Patch published document
  const pub = await patchLinks("homePage");
  console.log(pub ? "✓ published document updated" : "  published document not found");

  // Patch draft document (exists if Unique has unpublished edits open)
  const draft = await patchLinks("drafts.homePage");
  console.log(draft ? "✓ draft document updated" : "  no draft document (nothing to fix)");

  // Also fix the Believe Gathering event on both
  const events = await client.fetch(`*[_id in ["event-believe-gathering", "drafts.event-believe-gathering"]]{_id}`);
  for (const e of events) {
    await client.patch(e._id).set({ signupUrl: BELIEVE_FORM }).commit();
    console.log(`✓ ${e._id} signup URL updated`);
  }

  console.log("\nDone. Links will be correct on the live site within ~60 seconds.");
}

main().catch((e) => { console.error("\nFailed:", e.message); process.exit(1); });
