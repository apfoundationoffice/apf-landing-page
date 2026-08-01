import { AnchorIcon } from "@/components/icons";
import type { HomeContent, SiteSettings } from "@/sanity/content";

export function SiteFooter({
  content,
  settings,
}: {
  content: HomeContent;
  settings: SiteSettings;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-apf">
        <div className="footer__top">
          <div className="footer__brandcol">
            <a className="brand" href="#top" aria-label="Anchored Pathways Foundation home">
              {settings.logo?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="brand__logo" src={settings.logo.src} alt={settings.logo.alt} />
              ) : (
                <>
                  <span className="brand__mark" aria-hidden="true">
                    <AnchorIcon />
                  </span>
                  <span className="brand__name">
                    Anchored Pathways<small>Foundation</small>
                  </span>
                </>
              )}
            </a>
            <p>{content.footerTagline}</p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#programs">Our Programs</a></li>
              <li><a href="#events">Believe Gathering</a></li>
              <li><a href="#foundation">Mission and Vision</a></li>
            </ul>
          </div>
          <div>
            <h5>Take Action</h5>
            <ul>
              <li><a href="#involved">Get Involved</a></li>
              {settings.donateEnabled && settings.donateUrl ? (
                <li>
                  <a href={settings.donateUrl} target="_blank" rel="noopener">
                    Support Our Mission
                  </a>
                </li>
              ) : null}
              {settings.contactEmail ? (
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent(
                      "General Inquiry — Anchored Pathways Foundation",
                    )}`}
                  >
                    Contact Us
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; {year} Anchored Pathways Foundation. All rights reserved.</span>
          <span>Beyond Survival.</span>
        </div>
      </div>
    </footer>
  );
}
