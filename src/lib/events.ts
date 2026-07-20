/**
 * Events shown in the "What's coming up" section.
 *
 * These fields map one-to-one onto what Unique will edit in the admin
 * dashboard later, so the content model can move to the CMS unchanged.
 */
export type EventItem = {
  /** Event name, e.g. "The Believe Gathering" */
  title: string;
  /** ISO date (YYYY-MM-DD). Drives sorting and auto-hiding of past events. */
  date: string;
  /** Free text, e.g. "6:00 PM" — optional. */
  time?: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Wherever she's collecting sign-ups: Eventbrite, a Google form, JotForm. */
  signupUrl: string;
  signupLabel: string;
  /** One event gets the large treatment at the top of the section. */
  featured?: boolean;
  /** Hide without deleting. */
  hidden?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    title: "The Believe Gathering",
    date: "2026-12-19",
    time: "6:00 PM",
    location: "Tulsa, Oklahoma",
    description:
      "A Christmas experience created for young adults who have aged out of foster care. More than an event — it is a reminder that they are seen, valued, and not forgotten. Holiday meal, table families, encouraging speakers, and gifts.",
    image: "/images/celebration.jpg",
    imageAlt: "A joyful graduate in cap and gown blowing celebratory confetti",
    signupUrl: "https://form.jotform.com/260375246247055",
    signupLabel: "Save my seat",
    featured: true,
  },
  {
    title: "Bridge Program — Fall Cohort Orientation",
    date: "2026-09-12",
    time: "10:00 AM",
    location: "Tulsa, Oklahoma",
    description:
      "An introduction to The Bridge Program for incoming participants — meet your mentors, walk through what the season looks like, and ask anything.",
    image: "/images/goals.jpg",
    imageAlt: "Overhead view of hands writing goals in a planner beside coffee",
    signupUrl: "https://form.jotform.com/260375246247055",
    signupLabel: "Join the waitlist",
  },
  {
    title: "Mentor Training Morning",
    date: "2026-08-23",
    time: "9:00 AM",
    location: "Tulsa, Oklahoma",
    description:
      "For anyone considering walking alongside a young adult. No experience needed — just a willingness to show up consistently.",
    image: "/images/mentorship.jpg",
    imageAlt: "Two people talking over coffee at a wooden cafe table",
    signupUrl: "https://form.jotform.com/260375246247055",
    signupLabel: "Sign me up",
  },
];

/** Midnight today, so an event stays listed through the whole of its own day. */
function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Visible, still-upcoming events in date order. Past events drop off on their
 * own — nothing ages a nonprofit site faster than a stale event on the homepage.
 */
export function upcomingEvents(events: EventItem[] = EVENTS): EventItem[] {
  const today = startOfToday();
  return events
    .filter((e) => !e.hidden)
    .filter((e) => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatMonth(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "short" });
}

export function formatDay(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { day: "numeric" });
}

export function formatFullDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
