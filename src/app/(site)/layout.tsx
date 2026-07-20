import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Anchored Pathways Foundation — You Are Not Alone",
  description:
    "Anchored Pathways Foundation walks alongside young adults aging out of foster care through mentorship, community, life skills, and faith-based encouragement — helping them move beyond survival and build a life of stability, purpose, and belonging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
