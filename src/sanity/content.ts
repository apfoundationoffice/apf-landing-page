import type { Image } from "sanity";
import { client, imageUrl } from "./client";

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
  heroEyebrow: "You are not alone",
  heroHeadline: "Hope",
  heroSubheadline:
    "Helping emancipated foster youth move beyond survival — and build a life of stability, purpose, and belonging.",
  heroDescription:
    "Anchored Pathways Foundation walks alongside young adults aging out of foster care through mentorship, community, life skills, and faith-based discipleship — a strong foundation for the future they were created for.",
  heroImage: {
    src: "/images/community.jpg",
    alt: "A diverse group of young adults lying close together on a blanket, laughing",
  },
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
  whyImage: {
    src: "/images/reflection.jpg",
    alt: "A young woman journaling by a sunlit window with a coffee and a book",
  },
  whyBadgeTitle: "More than survival",
  whyBadgeSubtitle: "Stability, identity & purpose",

  programsEyebrow: "What We Do",
  programsHeading: "One Mission. Two Pathways.",
  programsIntro:
    "Anchored Pathways Foundation supports emancipated foster youth through two programs designed to meet both practical and personal needs.",
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
      buttonLabel: "Join the Discipleship Waitlist",
      buttonUrl: "#join",
    },
    {
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
      image: {
        src: "/images/goals.jpg",
        alt: "Overhead view of hands writing goals in a planner beside coffee",
      },
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
    {
      title: "Become a Mentor",
      description: "Walk alongside a young adult with consistency and care.",
      icon: "users",
    },
    { title: "Volunteer", description: "Give your time and gifts to events and programs.", icon: "heart" },
    { title: "Partner as an Org", description: "Align your organization with the mission.", icon: "building" },
    {
      title: "Give Financially",
      description: "Fund stability, mentorship, and the Believe Gathering.",
      icon: "give",
    },
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
  aboutImage: {
    src: "/images/friendship.jpg",
    alt: "Two young adults laughing together in warm, golden evening light",
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
};

export const DEFAULT_SETTINGS: SiteSettings = {
  donateEnabled: false,
  donateLabel: "Donate",
  donateUrl: "",
  contactEmail: "",
  contactPhone: "",
  showAddress: false,
  address: "",
  signupUrl: "https://form.jotform.com/260375246247055",
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

function pickVerse(raw: { text?: string; reference?: string } | undefined, fallback: Verse): Verse {
  return {
    text: pick(raw?.text, fallback.text),
    reference: pick(raw?.reference, fallback.reference),
  };
}

function pickBtn(raw: { label?: string; url?: string } | undefined, fallback: Btn): Btn {
  return { label: pick(raw?.label, fallback.label), url: pick(raw?.url, fallback.url) };
}

const HOME_QUERY = `*[_type == "homePage"][0]`;
const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

type RawHome = Record<string, unknown> | null;

export async function getHomeContent(): Promise<HomeContent> {
  let raw: RawHome = null;
  try {
    raw = await client.fetch<RawHome>(HOME_QUERY);
  } catch {
    // Sanity unreachable — fall through to the launch copy rather than 500.
    return DEFAULT_CONTENT;
  }
  if (!raw) return DEFAULT_CONTENT;

  const d = DEFAULT_CONTENT;
  const r = raw as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    heroEyebrow: pick(r.heroEyebrow, d.heroEyebrow),
    heroHeadline: pick(r.heroHeadline, d.heroHeadline),
    heroSubheadline: pick(r.heroSubheadline, d.heroSubheadline),
    heroDescription: pick(r.heroDescription, d.heroDescription),
    heroImage: pickImage(r.heroImage, r.heroImage?.alt, d.heroImage, 900),
    heroPrimaryButton: pickBtn(r.heroPrimaryButton, d.heroPrimaryButton),
    heroSecondaryButton: pickBtn(r.heroSecondaryButton, d.heroSecondaryButton),
    heroBadgeTitle: pick(r.heroBadgeTitle, d.heroBadgeTitle),
    heroBadgeSubtitle: pick(r.heroBadgeSubtitle, d.heroBadgeSubtitle),
    ribbonText: pick(r.ribbonText, d.ribbonText),

    whyEyebrow: pick(r.whyEyebrow, d.whyEyebrow),
    whyHeading: pick(r.whyHeading, d.whyHeading),
    whyIntro: pick(r.whyIntro, d.whyIntro),
    whyQuestions: pick(r.whyQuestions, d.whyQuestions),
    whyClosing: pick(r.whyClosing, d.whyClosing),
    whyImage: pickImage(r.whyImage, r.whyImage?.alt, d.whyImage, 700),
    whyBadgeTitle: pick(r.whyBadgeTitle, d.whyBadgeTitle),
    whyBadgeSubtitle: pick(r.whyBadgeSubtitle, d.whyBadgeSubtitle),

    programsEyebrow: pick(r.programsEyebrow, d.programsEyebrow),
    programsHeading: pick(r.programsHeading, d.programsHeading),
    programsIntro: pick(r.programsIntro, d.programsIntro),
    programs:
      Array.isArray(r.programs) && r.programs.length > 0
        ? r.programs.map((p: any, i: number) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
            const fb = d.programs[i] ?? d.programs[0];
            return {
              tag: pick(p.tag, fb.tag),
              title: pick(p.title, fb.title),
              description: pick(p.description, fb.description),
              points: pick(p.points, fb.points),
              image: pickImage(p.image, p.image?.alt, fb.image, 800),
              buttonLabel: pick(p.buttonLabel, fb.buttonLabel),
              buttonUrl: pick(p.buttonUrl, fb.buttonUrl),
            };
          })
        : d.programs,

    eventsEyebrow: pick(r.eventsEyebrow, d.eventsEyebrow),
    eventsHeading: pick(r.eventsHeading, d.eventsHeading),
    eventsIntro: pick(r.eventsIntro, d.eventsIntro),

    involvedEyebrow: pick(r.involvedEyebrow, d.involvedEyebrow),
    involvedHeading: pick(r.involvedHeading, d.involvedHeading),
    involvedIntro: pick(r.involvedIntro, d.involvedIntro),
    involvedButtonLabel: pick(r.involvedButtonLabel, d.involvedButtonLabel),
    ways:
      Array.isArray(r.ways) && r.ways.length > 0
        ? r.ways.map((w: any, i: number) => ({  // eslint-disable-line @typescript-eslint/no-explicit-any
            title: pick(w.title, d.ways[i]?.title ?? ""),
            description: pick(w.description, d.ways[i]?.description ?? ""),
            icon: pick(w.icon, d.ways[i]?.icon ?? "heart"),
          }))
        : d.ways,

    aboutEyebrow: pick(r.aboutEyebrow, d.aboutEyebrow),
    aboutQuote: pick(r.aboutQuote, d.aboutQuote),
    founderName: pick(r.founderName, d.founderName),
    founderTitle: pick(r.founderTitle, d.founderTitle),
    aboutBody: pick(r.aboutBody, d.aboutBody),
    missionText: pick(r.missionText, d.missionText),
    visionText: pick(r.visionText, d.visionText),
    aboutImage: pickImage(r.aboutImage, r.aboutImage?.alt, d.aboutImage, 700),

    closingHeading: pick(r.closingHeading, d.closingHeading),
    closingBody: pick(r.closingBody, d.closingBody),
    closingButtonLabel: pick(r.closingButtonLabel, d.closingButtonLabel),
    closingSecondaryLabel: pick(r.closingSecondaryLabel, d.closingSecondaryLabel),

    footerTagline: pick(r.footerTagline, d.footerTagline),

    verseHero: pickVerse(r.verseHero, d.verseHero),
    verseWhy: pickVerse(r.verseWhy, d.verseWhy),
    verseEvents: pickVerse(r.verseEvents, d.verseEvents),
    verseClosing: pickVerse(r.verseClosing, d.verseClosing),
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  let raw: RawHome = null;
  try {
    raw = await client.fetch<RawHome>(SETTINGS_QUERY);
  } catch {
    return DEFAULT_SETTINGS;
  }
  if (!raw) return DEFAULT_SETTINGS;

  const s = DEFAULT_SETTINGS;
  const r = raw as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    donateEnabled: r.donateEnabled ?? s.donateEnabled,
    donateLabel: pick(r.donateLabel, s.donateLabel),
    donateUrl: pick(r.donateUrl, s.donateUrl),
    contactEmail: pick(r.contactEmail, s.contactEmail),
    contactPhone: pick(r.contactPhone, s.contactPhone),
    showAddress: r.showAddress ?? s.showAddress,
    address: pick(r.address, s.address),
    signupUrl: pick(r.signupUrl, s.signupUrl),
  };
}
