import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "./env";
import { client } from "./client";

/**
 * Live content + Visual Editing.
 *
 * `sanityFetch` replaces plain `client.fetch`: on the public site it returns
 * published content (no overlays); inside the Presentation tool, with Draft
 * Mode on, it returns drafts and embeds the field metadata that powers
 * click-to-edit. `<SanityLive />` streams updates so a publish appears without
 * a rebuild.
 *
 * The read token is only needed to preview *unpublished* drafts. Without it the
 * public site is unaffected and Presentation still shows published content —
 * so a missing token degrades gracefully rather than breaking anything.
 */
const token = process.env.SANITY_API_READ_TOKEN;

const liveClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // Tells the overlay where the Studio lives, so "click to edit" opens /admin.
  stega: { studioUrl: "/admin" },
});

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  browserToken: token,
  serverToken: token,
});

/**
 * The one fetch the whole site uses.
 *
 * - In Draft Mode (an editor previewing in Presentation): use sanityFetch, so
 *   drafts show and the click-to-edit metadata is present.
 * - On the public site: a plain time-based fetch that revalidates every 60s.
 *   This is the fix for "published changes never appear" — sanityFetch caches
 *   published content indefinitely and only refreshes it while a browser tab is
 *   open and subscribed via SanityLive, so on a low-traffic site a publish could
 *   sit invisible forever. A time window refreshes reliably with no open tab.
 */
export async function loadQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const { data } = await sanityFetch({ query, params });
    return data as T;
  }
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}
