export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wbmdk7c6";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned so future API changes can't alter how the live site renders. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-19";
