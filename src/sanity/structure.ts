import type { StructureResolver } from "sanity/structure";

/**
 * The sidebar she sees when she signs in.
 *
 * Three items, ordered by how often they get used — events first, because that
 * is the thing that actually changes. Homepage and settings are singletons, so
 * they open straight into the document rather than an empty list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Edit your site")
    .items([
      S.listItem()
        .title("Events")
        .child(
          S.documentTypeList("event")
            .title("Events")
            .defaultOrdering([{ field: "date", direction: "asc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Homepage")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Homepage")),

      S.listItem()
        .title("Donate & contact")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Donate & contact"),
        ),
    ]);
