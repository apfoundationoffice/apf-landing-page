"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../sanity.config";

/**
 * Client boundary for the admin dashboard.
 *
 * The config import lives here rather than in the route so that Sanity never
 * enters the server component graph — under React Server Components resolution
 * some of its dependencies resolve to server-only builds that lack the exports
 * Sanity expects, which breaks the build.
 */
export function Studio() {
  return <NextStudio config={config} />;
}
