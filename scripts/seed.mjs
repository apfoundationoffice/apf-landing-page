/**
 * Seeds the Sanity dataset with the site's launch content.
 *
 * Run once, after `npx sanity login`:
 *   node scripts/seed.mjs
 *
 * Safe to re-run: documents are created with fixed IDs and `createIfNotExists`,
 * so this will never overwrite an edit made in the dashboard.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const projectId = "wbmdk7c6";
const dataset = "production";

/** Read the CLI's stored credentials so no token has to be pasted anywhere. */
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

async function uploadImage(relPath, alt) {
  const buffer = readFileSync(join(root, relPath));
  const asset = await client.assets.upload("image", buffer, {
    filename: relPath.split("/").pop(),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

const IMAGES = {
  hero: ["public/images/community.jpg", "A diverse group of young adults lying close together on a blanket, laughing"],
  why: ["public/images/reflection.jpg", "A young woman journaling by a sunlit window with a coffee and a book"],
  about: ["public/images/friendship.jpg", "Two young adults laughing together in warm, golden evening light"],
  mentorship: ["public/images/mentorship.jpg", "Two people talking over coffee at a wooden cafe table"],
  goals: ["public/images/goals.jpg", "Overhead view of hands writing goals in a planner beside coffee"],
  celebration: ["public/images/celebration.jpg", "A joyful graduate in cap and gown blowing celebratory confetti"],
};

const SIGNUP = "https://form.jotform.com/260375246247055";

async function main() {
  console.log("Uploading photos…");
  const img = {};
  for (const [key, [path, alt]] of Object.entries(IMAGES)) {
    img[key] = await uploadImage(path, alt);
    console.log(`  ${key}`);
  }

  console.log("Creating homepage…");
  await client.createIfNotExists({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "You are not alone",
    heroHeadline: "Hope",
    heroSubheadline:
      "Helping emancipated foster youth move beyond survival — and build a life of stability, purpose, and belonging.",
    heroDescription:
      "Anchored Pathways Foundation walks alongside young adults aging out of foster care through mentorship, community, life skills, and faith-based discipleship — a strong foundation for the future they were created for.",
    heroImage: img.hero,
    heroPrimaryButton: { label: "Join the Community", url: "#join" },
    heroSecondaryButton: { label: "Support the Mission", url: "#involved" },
    heroBadgeTitle: "Belonging",
    heroBadgeSubtitle: "Your story is still being written",
    ribbonText: "You are not alone. Your story is still being written.",

    whyEyebrow: "The Why",
    whyHeading: "Adulthood shouldn’t begin alone.",
    whyIntro:
      "Every year, young adults leave the foster care system facing adulthood without the consistent support, guidance, and community many of their peers rely on. Many navigate questions like…",
    whyQuestions: [
      "Where will I live?",
      "How do I manage money?",
      "Who can I trust?",
      "What is my purpose?",
      "Who is walking with me?",
    ],
    whyClosing:
      "At Anchored Pathways, we believe stability begins with more than resources — it begins with relationship, identity, and knowing you are not alone.",
    whyImage: img.why,
    whyBadgeTitle: "More than survival",
    whyBadgeSubtitle: "Stability, identity & purpose",

    programsEyebrow: "What We Do",
    programsHeading: "One Mission. Two Pathways.",
    programsIntro:
      "Anchored Pathways Foundation supports emancipated foster youth through two programs designed to meet both practical and personal needs.",
    programs: [
      {
        _type: "object",
        _key: "discipleship",
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
        image: img.mentorship,
        buttonLabel: "Join the Discipleship Waitlist",
        buttonUrl: "#join",
      },
      {
        _type: "object",
        _key: "bridge",
        tag: "The Bridge Program",
        title: "Practical Support for the Journey Into Independence.",
        description:
          "The Bridge Program provides practical support and guidance as young adults transition from foster care into adulthood. Through mentorship, resources, and life-skills development, participants receive support as they build stability and confidence.",
        points: [
          "Housing readiness",
          "Employment prep",
          "Education pathways",
          "Financial literacy",
          "Life skills",
          "Goal setting",
        ],
        image: img.goals,
        buttonLabel: "Join the Bridge Program Waitlist",
        buttonUrl: "#join",
      },
    ],

    eventsEyebrow: "What’s coming up",
    eventsHeading: "Come be part of it.",
    eventsIntro:
      "Gatherings, trainings, and program starts — everyone is welcome, and there is always a seat for you.",

    involvedEyebrow: "Get Involved",
    involvedHeading: "Help Build the Bridge.",
    involvedIntro:
      "It takes a community to help a young adult move beyond survival. There’s a place for you in this story.",
    involvedButtonLabel: "Get Connected",
    ways: [
      { _type: "object", _key: "mentor", title: "Become a Mentor", description: "Walk alongside a young adult with consistency and care.", icon: "users" },
      { _type: "object", _key: "volunteer", title: "Volunteer", description: "Give your time and gifts to events and programs.", icon: "heart" },
      { _type: "object", _key: "partner", title: "Partner as an Org", description: "Align your organization with the mission.", icon: "building" },
      { _type: "object", _key: "give", title: "Give Financially", description: "Fund stability, mentorship, and the Believe Gathering.", icon: "give" },
    ],

    aboutEyebrow: "Our Story",
    aboutQuote:
      "Anchored Pathways exists to help young adults move beyond survival — and discover stability, identity, and purpose.",
    founderName: "Unique Evans",
    founderTitle: "Founder & former foster youth",
    aboutBody:
      "Founded by Unique Evans, who understands firsthand the journey of transitioning from foster care into adulthood. After experiencing both the challenges and the power of faith, community, and support, Unique created Anchored Pathways to help others build a strong foundation for their future.",
    missionText:
      "To support emancipated foster youth as they build lasting stability through mentorship, life skills, community, and faith-based encouragement.",
    visionText:
      "A generation of young adults who leave foster care knowing they are supported, equipped, and created with purpose.",
    aboutImage: img.about,

    closingHeading: "Ready for More Than Survival?",
    closingBody:
      "Take the first step. Complete the form to join the community, request a program waitlist, or partner with the mission — and someone will walk with you from here.",
    closingButtonLabel: "Complete the Form",
    closingSecondaryLabel: "Support the Mission",

    footerTagline:
      "Walking alongside young adults aging out of foster care — toward stability, purpose, and belonging.",

    verseHero: { text: "We have this hope as an anchor for the soul, firm and secure.", reference: "Hebrews 6:19" },
    verseWhy: {
      text: "“For I know the plans I have for you,” declares the Lord, “plans to give you hope and a future.”",
      reference: "Jeremiah 29:11",
    },
    verseEvents: { text: "God sets the lonely in families.", reference: "Psalm 68:6" },
    verseClosing: { text: "He will never leave you nor forsake you.", reference: "Deuteronomy 31:6" },
  });

  console.log("Creating settings…");
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    donateEnabled: false,
    donateLabel: "Donate",
    donateUrl: "",
    contactEmail: "",
    contactPhone: "",
    showAddress: false,
    signupUrl: SIGNUP,
  });

  console.log("Creating events…");
  const events = [
    {
      _id: "event-believe-gathering",
      title: "The Believe Gathering",
      date: "2026-12-19",
      time: "6:00 PM",
      location: "Tulsa, Oklahoma",
      description:
        "A Christmas experience created for young adults who have aged out of foster care. More than an event — it is a reminder that they are seen, valued, and not forgotten. Holiday meal, table families, encouraging speakers, and gifts.",
      image: img.celebration,
      signupLabel: "Save my seat",
      featured: true,
    },
    {
      _id: "event-bridge-orientation",
      title: "Bridge Program — Fall Cohort Orientation",
      date: "2026-09-12",
      time: "10:00 AM",
      location: "Tulsa, Oklahoma",
      description:
        "An introduction to The Bridge Program for incoming participants — meet your mentors, walk through what the season looks like, and ask anything.",
      image: img.goals,
      signupLabel: "Join the waitlist",
      featured: false,
    },
    {
      _id: "event-mentor-training",
      title: "Mentor Training Morning",
      date: "2026-08-23",
      time: "9:00 AM",
      location: "Tulsa, Oklahoma",
      description:
        "For anyone considering walking alongside a young adult. No experience needed — just a willingness to show up consistently.",
      image: img.mentorship,
      signupLabel: "Sign me up",
      featured: false,
    },
  ];

  for (const e of events) {
    await client.createIfNotExists({ _type: "event", signupUrl: SIGNUP, hidden: false, ...e });
    console.log(`  ${e.title}`);
  }

  console.log("\nDone. Open /admin to see it.");
}

main().catch((err) => {
  console.error("\nSeeding failed:", err.message);
  process.exit(1);
});
