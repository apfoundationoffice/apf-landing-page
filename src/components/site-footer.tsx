import { AnchorIcon } from "@/components/icons";

const JOTFORM_URL = "https://form.jotform.com/260375246247055";

export function SiteFooter() {
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
            <p>
              Walking alongside young adults aging out of foster care — toward stability, purpose,
              and belonging.
            </p>
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
            <h5>Take a Step</h5>
            <ul>
              <li><a href="#join">Join the Community</a></li>
              <li><a href="#join">Join a Waitlist</a></li>
              <li><a href="#involved">Become a Mentor</a></li>
              <li>
                <a href={JOTFORM_URL} target="_blank" rel="noopener">
                  Get Connected
                </a>
              </li>
            </ul>
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
