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
 * Launch / fallback events. Sanity is the source of truth once it holds events;
 * until it's populated (or if it's unreachable) the site renders these so the
 * section doesn't vanish. Only the Believe Gathering is featured for now — other
 * programs and dates are not finalized yet.
 */
export const SEED_EVENTS: EventItem[] = [
  {
    title: "Believe Gathering 2026",
    date: "2026-12-12",
    time: "To be announced",
    location: "Dallas, Texas",
    description:
      "A Christmas experience created for young adults who have aged out of foster care — a holiday meal, table families, encouraging speakers, and gifts. More than an event; a reminder that you are seen, valued, and not forgotten.",
    image: "/images/celebration.jpg",
    imageAlt: "A joyful young person celebrating, blowing a handful of confetti toward the camera",
    signupUrl: "https://form.jotform.com/260375246247055",
    signupLabel: "Get Involved",
    featured: true,
  },
];

/** Upcoming, visible fallback events in date order. */
function fallbackEvents(todayIso: string): EventItem[] {
  return SEED_EVENTS.filter((e) => e.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date));
}

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
    const mapped = (rows ?? []).map((r) => ({
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
    return mapped.length > 0 ? mapped : fallbackEvents(todayIso);
  } catch (err) {
    console.error("[sanity] events fetch failed:", (err as Error)?.message, (err as Error)?.cause ?? "");
    return fallbackEvents(todayIso);
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
