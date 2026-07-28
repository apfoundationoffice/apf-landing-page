import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";

/**
 * Presentation calls this to turn on Draft Mode so the editor can preview
 * unpublished changes. It validates the request against Sanity using the read
 * token, so it can't be triggered by a random visitor.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
