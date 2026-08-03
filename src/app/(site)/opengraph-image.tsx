import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="49" fill="#1e3350"/>
  <path d="M22 76 A32 32 0 1 1 78 76" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <rect x="47.5" y="7" width="5" height="44" rx="1.5" fill="white"/>
  <rect x="36" y="18" width="28" height="5" rx="1.5" fill="white"/>
  <path d="M50 57 C34 47 32 33 38 27 C41 22 47 24 50 30 C53 24 59 22 62 27 C68 33 66 47 50 57Z" fill="white"/>
  <rect x="47.5" y="55" width="5" height="18" rx="1.5" fill="white"/>
  <path d="M47.5 66 C40 71 29 68 26 61 C32 59 41 62 47.5 66Z" fill="white"/>
  <path d="M52.5 66 C60 71 71 68 74 61 C68 59 59 62 52.5 66Z" fill="white"/>
  <path d="M47 71 L50 78 L53 71Z" fill="white"/>
  <circle cx="11" cy="50" r="2.5" fill="white"/>
  <circle cx="89" cy="50" r="2.5" fill="white"/>
</svg>`;

const LOGO_SRC = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1e3350",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "56px",
          padding: "60px 80px",
        }}
      >
        {/* Logo mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} width={220} height={220} alt="" />

        {/* Divider */}
        <div
          style={{
            display: "flex",
            width: 3,
            height: 260,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 2,
            flexShrink: 0,
          }}
        />

        {/* Text stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            gap: "18px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              color: "white",
            }}
          >
            <span>Anchored Pathways</span>
            <span>Foundation</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.45,
            }}
          >
            Faith-based discipleship for foster youth and young adults
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              color: "#c2984a",
              marginTop: 6,
              letterSpacing: "0.5px",
            }}
          >
            anchoredpaths.org
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
