import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Served from Sanity's CDN — fast, and cheap enough to stay on the free plan.
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

/**
 * Build an image URL at a sensible size. Sanity resizes and re-encodes on the
 * fly, so a full-resolution phone photo never reaches a visitor — this is the
 * whole reason images are worth keeping out of the git repo.
 */
export function imageUrl(source: Image | undefined, width: number, height?: number) {
  if (!source) return undefined;
  let url = builder.image(source).width(width).auto("format").fit("crop");
  if (height) url = url.height(height);
  return url.url();
}
