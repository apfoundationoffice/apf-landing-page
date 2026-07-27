/**
 * Applies the founder's "Final Revisions" (email, Jul 26 2026) to the live
 * Sanity content — the homepage document, site settings, and events.
 *
 * The site reads its text from Sanity, so editing the code fallbacks is not
 * enough; this makes the revisions actually show. Run once, after logging in:
 *
 *   npx sanity login          # one-time browser auth (reuses the seed login)
 *   node scripts/apply-revisions.mjs
 *
 * It PATCHES existing documents (never deletes), and preserves the program
 * photos already in Sanity. Re-running it is safe.
 *
 * Still pending from Unique (placeholders used until she sends them):
 *   - Section photos (hero, why, believe, get-involved, founder headshot)
 *   - The finalized Discipleship "Interest List" Google Form
 *   - The Believe Gathering "Get Involved" form
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projectId = "wbmdk7c6";
const dataset = "production";

/** Read the Sanity CLI's stored credentials so no token is pasted anywhere. */
function readCliToken() {
  const candidates = [
    join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".config", "sanity", "config.json"),
    join(process.env.HOME ?? "", ".config", "sanity", "config.json"),
  ];
  for (const path of candidates) {
    try {
      const raw = JSON.parse(readFileSync(path, "utf8"));
      if (raw?.authToken) return raw.authToken;
    } catch {
      /* try next */
    }
  }
  return process.env.SANITY_AUTH_TOKEN ?? null;
}

const token = readCliToken();
if (!token) {
  console.error("No Sanity credentials found. Run:  npx sanity login");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-07-19", token, useCdn: false });

const SIGNUP = "https://form.jotform.com/260375246247055";
const GOFUNDME = "https://gofund.me/05c1de4c8";
// TODO: replace these two once Unique sends the finalized forms.
const DISCIPLESHIP_FORM = SIGNUP; // finalized Discipleship Interest List (Google Form)
const BELIEVE_FORM = SIGNUP; // Believe Gathering "Get Involved" form

async function main() {
  const home = await client.getDocument("homePage");
  if (!home) {
    console.error("No 'homePage' document found. Run scripts/seed.mjs first.");
    process.exit(1);
  }

  // Preserve the program photos and keys already in Sanity; only change text.
  const progs = Array.isArray(home.programs) ? home.programs : [];
  const disc = progs[0] ?? {};
  const life = progs[1] ?? {};

  const programs = [
    {
      _type: "object",
      _key: disc._key ?? "discipleship",
      tag: "Discipleship Program",
      title: "Discover Identity. Build Community. Walk in Purpose.",
      description:
        "A voluntary, faith-based cohort experience created for emancipated foster youth seeking encouragement, mentorship, and spiritual growth. Through guided conversations, community, and mentorship, participants explore identity, healing, purpose, and their story through the foundation of faith.",
      points: [
        "Faith-based mentorship",
        "Identity development",
        "Community connection",
        "Purpose discovery",
        "Encouraging conversations",
        "Personal growth",
      ],
      buttonLabel: "Join the Discipleship Interest List",
      buttonUrl: DISCIPLESHIP_FORM,
      ...(disc.image ? { image: disc.image } : {}),
    },
    {
      _type: "object",
      _key: life._key ?? "life-stability",
      tag: "Life Stability Program",
      title: "Build Stability. Gain Confidence. Grow in Community.",
      description:
        "The Anchored Pathways Life Stability Program helps young adults prepare for independent adulthood after foster care. Through hands-on workshops, mentorship, essential resources, retreats, and family-style gatherings, participants receive practical support to secure housing, build income, pursue education or entrepreneurship, manage everyday responsibilities, and create a stable future—with a community beside them along the way.",
      pointsIntro: "Participants receive support with:",
      points: [
        "Housing readiness and household essentials",
        "Employment, income-building, and interview preparation",
        "College, career, and entrepreneurship planning",
        "Everyday living skills and financial confidence",
        "Food, transportation, and other stability needs",
        "Retreats, gatherings, mentorship, and community",
      ],
      buttonLabel: "Get Connected",
      buttonUrl: SIGNUP,
      ...(life.image ? { image: life.image } : {}),
    },
  ];

  const homePatch = {
    // Hero
    heroEyebrow: "A place to belong. A path forward.",
    heroHeadline: "Beyond Survival",
    heroSubheadline: "",
    heroDescription:
      "Anchored Pathways Foundation walks alongside young adults ages 17–25 navigating life after foster care through mentorship, practical life-stability support, community, and optional faith-based discipleship.",
    heroPrimaryButton: { label: "Explore Our Programs", url: "#programs" },
    heroSecondaryButton: { label: "Support the Mission", url: GOFUNDME },
    heroBadgeTitle: "",
    heroBadgeSubtitle: "",
    ribbonText: "A cord of three strands is not quickly broken.",
    ribbonReference: "Ecclesiastes 4:12",

    // The Why
    whyHeading: "Aging Out Shouldn’t Mean Figuring It Out Alone.",
    whyIntro:
      "Aging out can bring immediate decisions about housing, income, education, transportation, and everyday responsibilities. Without consistent guidance, even basic steps toward independence can become overwhelming.",
    whyQuestions: [
      "Where will I live?",
      "How can I earn money and build steady income?",
      "How do I prepare for college, a career, or entrepreneurship?",
      "What do I need to successfully live on my own?",
      "How can I grow in my walk with God and live confidently according to biblical principles?",
    ],
    whyClosing:
      "APF helps young adults prepare for adulthood through life-skills workshops, housing-readiness support, career and education preparation, essential resources, mentorship, and biblical guidance. We help them strengthen their faith, build confidence, and discover their God-given purpose.",
    whyBadgeTitle: "Beyond Survival",
    whyBadgeSubtitle: "Stronger together. Prepared for what’s next.",

    // Programs
    programsIntro:
      "Every young adult needs both practical support and a strong foundation. APF offers two pathways designed to help young adults build stability, grow in faith, discover their purpose, and thrive after foster care.",
    programs,

    // Events section headings
    eventsEyebrow: "Believe Gathering 2026",
    eventsHeading: "There’s a Place for You.",
    eventsIntro:
      "Attend, volunteer, refer a young adult, or partner with us to create a Christmas experience rooted in celebration, connection, and belonging.",

    // Get Involved
    involvedIntro:
      "Whether you want to volunteer, connect a young adult, partner through your organization, or give financially, there is a meaningful way for you to support young adults beyond foster care.",
    involvedButtonLabel: "Get Involved",
    ways: [
      { _type: "object", _key: "refer", title: "Refer a Young Adult", description: "Connect a young adult ages 17–25 impacted by foster care with APF.", icon: "users" },
      { _type: "object", _key: "volunteer", title: "Volunteer", description: "Use your time, skills, and gifts to support our gatherings and programs.", icon: "heart" },
      { _type: "object", _key: "partner", title: "Partner with APF", description: "Collaborate through referrals, resources, services, or sponsorship.", icon: "building" },
      { _type: "object", _key: "give", title: "Give Financially", description: "Help fund the Believe Gathering, essential resources, and future programs.", icon: "give" },
    ],

    // Our Story
    aboutQuote:
      "I know what it feels like to leave foster care and face adulthood without support. God gave purpose to the hardest parts of my story. Anchored Pathways is my yes so other young adults do not have to walk that road alone.",
    founderName: "Unique Evans",
    founderTitle: "Founder and Former Foster Youth",
    aboutBody:
      "After entering foster care at age 10 and later emancipating from the system, Unique Evans knows firsthand how overwhelming it can be to enter adulthood without stable guidance, practical support, or a dependable community. But her story did not end with survival. Through faith, trusted relationships, and the grace of God, she discovered the power of being seen, supported, and reminded of who she is. God used her journey to birth the vision for Anchored Pathways Foundation. APF is committed to walking alongside young adults ages 17–25 who have aged out or emancipated from foster care, connecting them with the mentorship, life skills, essential resources, spiritual encouragement, and genuine community they need to build stable lives and walk boldly in their God-given purpose.",

    // Our Foundation (Mission & Vision)
    missionText:
      "To equip young adults ages 17–25 who have aged out or emancipated from foster care with mentorship, life skills, essential resources, community, and voluntary faith-based support as they build stability and independence.",
    visionText:
      "A generation of young adults moving beyond survival, secure in their identity, supported by community, equipped for adulthood, and confidently walking in their God-given purpose.",

    // Footer
    footerTagline:
      "Walking alongside young adults ages 17–25 who have aged out or emancipated from foster care as they build stability, discover purpose, and find belonging.",

    // Scripture that now anchors the Foundation section
    verseHero: { text: "We have this hope as an anchor for the soul, firm and secure.", reference: "Hebrews 6:19" },
  };

  await client.patch("homePage").set(homePatch).commit();
  console.log("✓ homepage text updated");

  await client
    .patch("siteSettings")
    .set({
      donateEnabled: true,
      donateLabel: "Support Our Mission",
      donateUrl: GOFUNDME,
      contactEmail: "support@anchoredpaths.org",
    })
    .commit();
  console.log("✓ settings: GoFundMe (05c1de4c8) + contact email");

  // Events — feature only the Believe Gathering; hide the rest (reversible).
  const events = await client.fetch(`*[_type == "event"]{_id, title, featured}`);
  const believe =
    events.find((e) => /believe/i.test(e.title || "")) ?? events.find((e) => e.featured);

  if (believe) {
    await client
      .patch(believe._id)
      .set({
        title: "Believe Gathering 2026",
        date: "2026-12-12",
        time: "To be announced",
        location: "Dallas, Texas",
        signupLabel: "Get Involved",
        signupUrl: BELIEVE_FORM,
        featured: true,
        hidden: false,
      })
      .commit();
    console.log("✓ Believe Gathering updated (Dec 12 2026 · Dallas · TBA)");
  } else {
    console.warn("! No Believe Gathering event found to feature.");
  }

  for (const e of events) {
    if (believe && e._id === believe._id) continue;
    await client.patch(e._id).set({ hidden: true }).commit();
    console.log(`  · hidden: ${e.title}`);
  }

  console.log("\nAll revisions applied. Reload the site (npm run dev) or /admin to see them.");
  console.log(
    "Still pending from Unique: section photos, the Discipleship Google Form, and the Believe Gathering 'Get Involved' form.",
  );
}

main().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});
