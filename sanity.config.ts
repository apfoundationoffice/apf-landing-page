import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

/** Singletons — one of each, so they shouldn't be creatable or deletable. */
const SINGLETONS = new Set(["homePage", "siteSettings"]);

export default defineConfig({
  name: "apf",
  title: "Anchored Pathways",
  basePath: "/admin",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "create new" menu — there should only
    // ever be one homepage, and an accidental second one is confusing to undo.
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType)),
  },

  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({ action }) => action !== "unpublish" && action !== "delete" && action !== "duplicate")
        : prev,
  },

  plugins: [
    structureTool({ structure }),
    // Side-by-side live preview with click-to-edit. Same-origin, so the preview
    // is this same deployment; it flips Draft Mode on via the enable route.
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
