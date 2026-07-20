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
              <span className="brand__mark" aria-hidden="true">
                <AnchorIcon />
              </span>
              <span className="brand__name">
                Anchored Pathways<small>Foundation</small>
              </span>
            </a>
            <p>{content.footerTagline}</p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#why">The Why</a></li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul>
              <li>
                <a href={settings.signupUrl} target="_blank" rel="noopener">
                  Join the Community
                </a>
              </li>
              {settings.contactEmail ? (
                <li>
                  <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
                </li>
              ) : null}
              {settings.contactPhone ? (
                <li>
                  <a href={`tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`}>{settings.contactPhone}</a>
                </li>
              ) : null}
              {settings.donateEnabled && settings.donateUrl ? (
                <li>
                  <a href={settings.donateUrl} target="_blank" rel="noopener">
                    {settings.donateLabel}
                  </a>
                </li>
              ) : null}
            </ul>
            {settings.showAddress && settings.address ? (
              <p style={{ whiteSpace: "pre-line" }}>{settings.address}</p>
            ) : null}
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; {year} Anchored Pathways Foundation. You are not alone.</span>
          <span>Your story is still being written.</span>
        </div>
      </div>
    </footer>
  );
}
