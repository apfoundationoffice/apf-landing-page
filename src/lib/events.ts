import { client, imageUrl } from "@/sanity/client";

export type EventItem = {
  title: string;
  /** ISO date (YYYY-MM-DD). Drives sorting and auto-hiding of past events. */
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  signupUrl: string;
  signupLabel: string;
  featured?: boolean;
};

/**
 * Launch content, used once to seed the dashboard. After seeding, events are
 * managed entirely in Sanity — this array is not read by the site.
 */
export const SEED_EVENTS = [
  {
    title: "The Believe Gathering",
    date: "2026-12-19",
    time: "6:00 PM",
    location: "Tulsa, Oklahoma",
    description:
      "A Christmas experience created for young adults who have aged out of foster care. More than an event — it is a reminder that they are seen, valued, and not forgotten. Holiday meal, table families, encouraging speakers, and gifts.",
    image: "public/images/celebration.jpg",
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
    image: "public/images/goals.jpg",
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
    image: "public/images/mentorship.jpg",
    imageAlt: "Two people talking over coffee at a wooden cafe table",
    signupUrl: "https://form.jotform.com/260375246247055",
    signupLabel: "Sign me up",
  },
];

/**
 * Upcoming, visible events in date order.
 *
 * Past events and hidden events are filtered out in the query itself, so the
 * page never has to think about them. If nothing is coming up the section
 * removes itself — better a shorter page than one that looks abandoned.
 */
export async function getUpcomingEvents(): Promise<EventItem[]> {
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate(),
  ).padStart(2, "0")}`;

  const query = `*[_type == "event" && hidden != true && date >= $today] | order(date asc){
    title, date, time, location, description, image, signupUrl, signupLabel, featured
  }`;

  try {
    const rows = await client.fetch<Record<string, any>[]>(query, { today: todayIso }); // eslint-disable-line @typescript-eslint/no-explicit-any
    return (rows ?? []).map((r) => ({
      title: r.title ?? "",
      date: r.date,
      time: r.time,
      location: r.location ?? "",
      description: r.description ?? "",
      image: imageUrl(r.image, 900) ?? "",
      imageAlt: r.image?.alt ?? "",
      signupUrl: r.signupUrl ?? "",
      signupLabel: r.signupLabel || "Find out more",
      featured: r.featured ?? false,
    }));
  } catch {
    return [];
  }
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
