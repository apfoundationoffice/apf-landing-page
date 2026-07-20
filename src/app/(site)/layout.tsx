import type { Metadata } from "next";
import { Fraunces, Nunito_Sans, Lora, Open_Sans } from "next/font/google";
import "../globals.css";
import { getSiteSettings } from "@/sanity/content";

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
  title: "Anchored Pathways Foundation — You Are Not Alone",
  description:
    "Anchored Pathways Foundation walks alongside young adults aging out of foster care through mentorship, community, life skills, and faith-based encouragement — helping them move beyond survival and build a life of stability, purpose, and belonging.",
};

const THEMES = new Set(["anchor", "evening", "sand", "christmas"]);
const FONTS = new Set(["warm", "classic"]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

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
      <body>{children}</body>
    </html>
  );
}
