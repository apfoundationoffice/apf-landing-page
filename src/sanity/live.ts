import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { apiVersion, dataset, projectId } from "./env";

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
