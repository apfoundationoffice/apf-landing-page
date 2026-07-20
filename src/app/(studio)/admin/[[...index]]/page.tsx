import type { Metadata, Viewport } from "next";
import { Studio } from "@/components/studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Anchored Pathways — Edit your site",
  // The dashboard should never turn up in search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** The dashboard, served at /admin. */
export default function AdminPage() {
  return <Studio />;
}
