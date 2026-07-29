import type { Image } from "sanity";
import { stegaClean } from "next-sanity";
import { imageUrl } from "./client";
import { loadQuery } from "./live";

/**
 * Content for the homepage, read from Sanity with the launch copy as a
 * fallback.
 *
 * The fallbacks matter: if a field is ever cleared by accident, the site keeps
 * rendering the original sentence rather than a blank space. For a site nobody
 * is monitoring day to day, a stale word beats an empty page.
 */

type Verse = { text: string; reference: string };
type Btn = { label: string; url: string };
type Pic = { src: string; alt: string };

export type HomeContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroImage: Pic;
  heroPrimaryButton: Btn;
  heroSecondaryButton: Btn;
  heroBadgeTitle: string;
  heroBadgeSubtitle: string;
  ribbonText: string;
  ribbonReference: string;

  whyEyebrow: string;
  whyHeading: string;
  whyIntro: string;
  whyQuestions: string[];
  whyClosing: string;
  whyImage: Pic;
  whyBadgeTitle: string;
  whyBadgeSubtitle: string;

  programsEyebrow: string;
  programsHeading: string;
  programsIntro: string;
  programs: {
    tag: string;
    title: string;
    description: string;
    pointsIntro?: string;
    points: string[];
    image: Pic;
    buttonLabel: string;
    buttonUrl: string;
  }[];

  eventsEyebrow: string;
  eventsHeading: string;
  eventsIntro: string;

  involvedEyebrow: string;
  involvedHeading: string;
  involvedIntro: string;
  involvedButtonLabel: string;
  involvedButtonUrl: string;
  involvedImage: Pic;
  ways: { title: string; description: string; icon: string }[];

  aboutEyebrow: string;
  aboutQuote: string;
  founderName: string;
  founderTitle: string;
  aboutBody: string;
  missionText: string;
  visionText: string;
  aboutImage: Pic;

  closingHeading: string;
  closingBody: string;
  closingButtonLabel: string;
  closingSecondaryLabel: string;

  footerTagline: string;

  verseHero: Verse;
  verseWhy: Verse;
  verseEvents: Verse;
  verseClosing: Verse;
};

export const DEFAULT_CONTENT: HomeContent = {
  heroEyebrow: "A place to belong. A path forward.",
  heroHeadline: "Beyond Survival",
  heroSubheadline: "",
  heroDescription:
    "Anchored Pathways Foundation walks alongside young adults ages 17–25 navigating life after foster care through mentorship, practical life-stability support, community, and optional faith-based discipleship.",
  heroImage: {
    src: "/images/community.jpg",
    alt: "Diverse young adults, around ages 18–24, connecting naturally in a warm, relaxed setting",
  },
  heroPrimaryButton: { label: "Explore Our Programs", url: "#programs" },
  heroSecondaryButton: { label: "Support the Mission", url: "https://gofund.me/05c1de4c8" },
  heroBadgeTitle: "",
  heroBadgeSubtitle: "",
  ribbonText: "A cord of three strands is not quickly broken.",
  ribbonReference: "Ecclesiastes 4:12",

  whyEyebrow: "The Why",
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
  whyImage: {
    src: "/images/reflection.jpg",
    alt: "Diverse young adults, around ages 18–24, reflecting connection and community",
  },
  whyBadgeTitle: "Beyond Survival",
  whyBadgeSubtitle: "Stronger together. Prepared for what’s next.",

  programsEyebrow: "What We Do",
  programsHeading: "One Mission. Two Pathways.",
  programsIntro:
    "Every young adult needs both practical support and a strong foundation. APF offers two pathways designed to help young adults build stability, grow in faith, discover their purpose, and thrive after foster care.",
  programs: [
    {
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
      image: {
        src: "/images/mentorship.jpg",
        alt: "Two people talking over coffee at a wooden cafe table",
      },
      buttonLabel: "Join the Discipleship Interest List",
      // TODO: swap to the finalized Discipleship Google Form when Unique sends it.
      buttonUrl: "https://form.jotform.com/260375246247055",
    },
    {
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
      image: {
        src: "/images/goals.jpg",
        alt: "Overhead view of hands writing goals in a planner beside coffee",
      },
      buttonLabel: "Get Connected",
      buttonUrl: "https://form.jotform.com/260375246247055",
    },
  ],

  eventsEyebrow: "Believe Gathering 2026",
  eventsHeading: "There’s a Place for You.",
  eventsIntro:
    "Attend, volunteer, refer a young adult, or partner with us to create a Christmas experience rooted in celebration, connection, and belonging.",

  involvedEyebrow: "Get Involved",
  involvedHeading: "Help Build the Bridge.",
  involvedIntro:
    "Whether you want to volunteer, connect a young adult, partner through your organization, or give financially, there is a meaningful way for you to support young adults beyond foster care.",
  involvedButtonLabel: "Get Involved",
  involvedButtonUrl: "",
  involvedImage: {
    src: "/images/walking.jpg",
    alt: "Three friends walking arm in arm, laughing together outdoors",
  },
  ways: [
    {
      title: "Refer a Young Adult",
      description: "Connect a young adult ages 17–25 impacted by foster care with APF.",
      icon: "users",
    },
    {
      title: "Volunteer",
      description: "Use your time, skills, and gifts to support our gatherings and programs.",
      icon: "heart",
    },
    {
      title: "Partner with APF",
      description: "Collaborate through referrals, resources, services, or sponsorship.",
      icon: "building",
    },
    {
      title: "Give Financially",
      description: "Help fund the Believe Gathering, essential resources, and future programs.",
      icon: "give",
    },
  ],

  aboutEyebrow: "Our Story",
  aboutQuote:
    "I know what it feels like to leave foster care and face adulthood without support. God gave purpose to the hardest parts of my story. Anchored Pathways is my yes so other young adults do not have to walk that road alone.",
  founderName: "Unique Evans",
  founderTitle: "Founder and Former Foster Youth",
  aboutBody:
    "After entering foster care at age 10 and later emancipating from the system, Unique Evans knows firsthand how overwhelming it can be to enter adulthood without stable guidance, practical support, or a dependable community. But her story did not end with survival. Through faith, trusted relationships, and the grace of God, she discovered the power of being seen, supported, and reminded of who she is. God used her journey to birth the vision for Anchored Pathways Foundation. APF is committed to walking alongside young adults ages 17–25 who have aged out or emancipated from foster care, connecting them with the mentorship, life skills, essential resources, spiritual encouragement, and genuine community they need to build stable lives and walk boldly in their God-given purpose.",
  missionText:
    "To equip young adults ages 17–25 who have aged out or emancipated from foster care with mentorship, life skills, essential resources, community, and voluntary faith-based support as they build stability and independence.",
  visionText:
    "A generation of young adults moving beyond survival, secure in their identity, supported by community, equipped for adulthood, and confidently walking in their God-given purpose.",
  aboutImage: {
    src: "/images/friendship.jpg",
    alt: "Portrait of Unique Evans, Founder of Anchored Pathways Foundation",
  },

  closingHeading: "Ready for More Than Survival?",
  closingBody:
    "Take the first step. Complete the form to join the community, request a program waitlist, or partner with the mission — and someone will walk with you from here.",
  closingButtonLabel: "Complete the Form",
  closingSecondaryLabel: "Support the Mission",

  footerTagline:
    "Walking alongside young adults aging out of foster care — toward stability, purpose, and belonging.",

  verseHero: {
    text: "We have this hope as an anchor for the soul, firm and secure.",
    reference: "Hebrews 6:19",
  },
  verseWhy: {
    text: "“For I know the plans I have for you,” declares the Lord, “plans to give you hope and a future.”",
    reference: "Jeremiah 29:11",
  },
  verseEvents: { text: "God sets the lonely in families.", reference: "Psalm 68:6" },
  verseClosing: { text: "He will never leave you nor forsake you.", reference: "Deuteronomy 31:6" },
};

export type SiteSettings = {
  donateEnabled: boolean;
  donateLabel: string;
  donateUrl: string;
  contactEmail: string;
  contactPhone: string;
  showAddress: boolean;
  address: string;
  signupUrl: string;
  theme: string;
  fontPairing: string;
  logo?: Pic;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  donateEnabled: true,
  donateLabel: "Support Our Mission",
  donateUrl: "https://gofund.me/05c1de4c8",
  contactEmail: "support@anchoredpaths.org",
  contactPhone: "",
  showAddress: false,
  address: "",
  signupUrl: "https://form.jotform.com/260375246247055",
  theme: "anchor",
  fontPairing: "warm",
};

/* ------------------------------------------------------------------ */

/** Treat null, undefined and empty string as "not set". */
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

function pickImage(source: Image | undefined, alt: string | undefined, fallback: Pic, width: number): Pic {
  const url = imageUrl(source, width);
  return url ? { src: url, alt: pick(alt, fallback.alt) } : fallback;
}

/**
 * Text used exactly as stored. When the homepage document exists, an empty
 * value means the editor deliberately removed it — so we must NOT substitute a
 * fallback, or clearing a field (e.g. deleting a scripture) would silently
 * restore the original. The document-level fallback in getHomeContent still
 * covers the real disaster case (Sanity missing or unreachable).
 */
function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

/**
 * Like str(), but strips Visual Editing's invisible marker characters. Use for
 * any value that isn't shown as plain text — URLs, emails, phone numbers, and
 * lookup keys (theme, icon) — because those markers break links, `new Date()`,
 * and key matching. In published mode there are no markers, so this is a no-op.
 */
function clean(v: unknown): string {
  return stegaClean(str(v));
}

function verseRaw(raw: { text?: string; reference?: string } | undefined): Verse {
  return { text: str(raw?.text), reference: str(raw?.reference) };
}

function pickBtn(raw: { label?: string; url?: string } | undefined, fallback: Btn): Btn {
  // Label is visible text (keep it editable); the URL is not shown, so clean it.
  return { label: pick(raw?.label, fallback.label), url: stegaClean(pick(raw?.url, fallback.url)) };
}

const HOME_QUERY = `*[_type == "homePage"][0]`;
const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

type RawHome = Record<string, unknown> | null;

export async function getHomeContent(): Promise<HomeContent> {
  let raw: RawHome = null;
  try {
    raw = await loadQuery<RawHome>(HOME_QUERY);
  } catch (err) {
    // Sanity unreachable — fall through to the launch copy rather than 500.
    // Log it: a silent fallback looks identical to "content not saved", which
    // is impossible to diagnose from the outside.
    console.error("[sanity] homepage fetch failed:", (err as Error)?.message, (err as Error)?.cause ?? "");
    return DEFAULT_CONTENT;
  }
  if (!raw) return DEFAULT_CONTENT;

  const d = DEFAULT_CONTENT;
  const r = raw as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  // The document exists, so its values are authoritative — text is taken
  // exactly as stored (empty = the editor removed it). Images and buttons keep
  // a fallback because a missing photo breaks the layout and an empty link
  // breaks navigation, and neither is something the editor sets out to "delete".
  return {
    heroEyebrow: str(r.heroEyebrow),
    heroHeadline: str(r.heroHeadline),
    heroSubheadline: str(r.heroSubheadline),
    heroDescription: str(r.heroDescription),
    heroImage: pickImage(r.heroImage, r.heroImage?.alt, d.heroImage, 900),
    heroPrimaryButton: pickBtn(r.heroPrimaryButton, d.heroPrimaryButton),
    heroSecondaryButton: pickBtn(r.heroSecondaryButton, d.heroSecondaryButton),
    heroBadgeTitle: str(r.heroBadgeTitle),
    heroBadgeSubtitle: str(r.heroBadgeSubtitle),
    ribbonText: str(r.ribbonText),
    ribbonReference: str(r.ribbonReference),

    whyEyebrow: str(r.whyEyebrow),
    whyHeading: str(r.whyHeading),
    whyIntro: str(r.whyIntro),
    whyQuestions: Array.isArray(r.whyQuestions) ? r.whyQuestions : [],
    whyClosing: str(r.whyClosing),
    whyImage: pickImage(r.whyImage, r.whyImage?.alt, d.whyImage, 700),
    whyBadgeTitle: str(r.whyBadgeTitle),
    whyBadgeSubtitle: str(r.whyBadgeSubtitle),

    programsEyebrow: str(r.programsEyebrow),
    programsHeading: str(r.programsHeading),
    programsIntro: str(r.programsIntro),
    programs:
      Array.isArray(r.programs) && r.programs.length > 0
        ? r.programs.map((p: any, i: number) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
            const fb = d.programs[i] ?? d.programs[0];
            return {
              tag: str(p.tag),
              title: str(p.title),
              description: str(p.description),
              pointsIntro: str(p.pointsIntro),
              points: Array.isArray(p.points) ? p.points : [],
              image: pickImage(p.image, p.image?.alt, fb.image, 800),
              buttonLabel: str(p.buttonLabel),
              buttonUrl: stegaClean(pick(p.buttonUrl, fb.buttonUrl)),
            };
          })
        : d.programs,

    eventsEyebrow: str(r.eventsEyebrow),
    eventsHeading: str(r.eventsHeading),
    eventsIntro: str(r.eventsIntro),

    involvedEyebrow: str(r.involvedEyebrow),
    involvedHeading: str(r.involvedHeading),
    involvedIntro: str(r.involvedIntro),
    involvedButtonLabel: str(r.involvedButtonLabel),
    involvedButtonUrl: clean(r.involvedButtonUrl),
    involvedImage: pickImage(r.involvedImage, r.involvedImage?.alt, d.involvedImage, 700),
    ways:
      Array.isArray(r.ways) && r.ways.length > 0
        ? r.ways.map((w: any) => ({  // eslint-disable-line @typescript-eslint/no-explicit-any
            title: str(w.title),
            description: str(w.description),
            icon: clean(w.icon) || "heart",
          }))
        : d.ways,

    aboutEyebrow: str(r.aboutEyebrow),
    aboutQuote: str(r.aboutQuote),
    founderName: str(r.founderName),
    founderTitle: str(r.founderTitle),
    aboutBody: str(r.aboutBody),
    missionText: str(r.missionText),
    visionText: str(r.visionText),
    aboutImage: pickImage(r.aboutImage, r.aboutImage?.alt, d.aboutImage, 700),

    closingHeading: str(r.closingHeading),
    closingBody: str(r.closingBody),
    closingButtonLabel: str(r.closingButtonLabel),
    closingSecondaryLabel: str(r.closingSecondaryLabel),

    footerTagline: str(r.footerTagline),

    verseHero: verseRaw(r.verseHero),
    verseWhy: verseRaw(r.verseWhy),
    verseEvents: verseRaw(r.verseEvents),
    verseClosing: verseRaw(r.verseClosing),
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  let raw: RawHome = null;
  try {
    raw = await loadQuery<RawHome>(SETTINGS_QUERY);
  } catch {
    return DEFAULT_SETTINGS;
  }
  if (!raw) return DEFAULT_SETTINGS;

  const s = DEFAULT_SETTINGS;
  const r = raw as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Every field here feeds an attribute, a link, or a lookup — none is visible
  // text — so all are stega-cleaned. donateLabel is the exception (it shows on
  // the button), so it keeps its markers for click-to-edit.
  return {
    donateEnabled: r.donateEnabled ?? s.donateEnabled,
    donateLabel: pick(r.donateLabel, s.donateLabel),
    donateUrl: clean(r.donateUrl) || s.donateUrl,
    contactEmail: clean(r.contactEmail) || s.contactEmail,
    contactPhone: clean(r.contactPhone) || s.contactPhone,
    showAddress: r.showAddress ?? s.showAddress,
    address: pick(r.address, s.address),
    signupUrl: clean(r.signupUrl) || s.signupUrl,
    theme: clean(r.theme) || s.theme,
    fontPairing: clean(r.fontPairing) || s.fontPairing,
    logo: r.logo ? { src: imageUrl(r.logo, 240) ?? "", alt: "Anchored Pathways Foundation" } : undefined,
  };
}
