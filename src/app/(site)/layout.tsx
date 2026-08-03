import type { Metadata } from "next";
import { Fraunces, Nunito_Sans, Lora, Open_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "../globals.css";
import { getSiteSettings } from "@/sanity/content";
import { SanityLive } from "@/sanity/live";

/* The "warm" pairing — the default look. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

/* The "classic" pairing — a more traditional feel. */
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anchoredpaths.org"),
  title: "Anchored Pathways Foundation | Support After Foster Care",
  description:
    "Anchored Pathways Foundation supports young adults ages 17–25 preparing to age out or who have aged out of foster care through mentorship, life skills, practical resources, community, and voluntary faith-based discipleship.",
  openGraph: {
    title: "Anchored Pathways Foundation",
    description:
      "Supporting young adults ages 17–25 preparing to age out or who have aged out of foster care through mentorship, life skills, practical resources, community, and voluntary faith-based discipleship.",
    url: "https://anchoredpaths.org/",
    siteName: "Anchored Pathways Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchored Pathways Foundation",
    description:
      "Supporting young adults ages 17–25 preparing to age out or who have aged out of foster care through mentorship, life skills, practical resources, community, and voluntary faith-based discipleship.",
  },
};

const THEMES = new Set(["anchor", "evening", "sand", "christmas"]);
const FONTS = new Set(["warm", "classic"]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const { isEnabled: isDraft } = await draftMode();

  // Only ever emit a known value — an unrecognised one from the CMS should
  // fall back to the house style rather than leave the page unthemed.
  const theme = THEMES.has(settings.theme) ? settings.theme : "anchor";
  const font = FONTS.has(settings.fontPairing) ? settings.fontPairing : "warm";

  return (
    <html
      lang="en"
      data-theme={theme}
      data-font={font}
      className={`${fraunces.variable} ${nunitoSans.variable} ${lora.variable} ${openSans.variable}`}
    >
      <body>
        {children}
        <SanityLive />
        {isDraft ? <VisualEditing /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Anchored Pathways Foundation",
              url: "https://anchoredpaths.org",
              logo: "https://anchoredpaths.org/opengraph-image",
              description:
                "Supporting young adults ages 17–25 preparing to age out or who have aged out of foster care through mentorship, life skills, practical resources, community, and voluntary faith-based discipleship.",
              sameAs: ["https://www.instagram.com/anchoredpathways"],
            }),
          }}
        />
      </body>
    </html>
  );
}
