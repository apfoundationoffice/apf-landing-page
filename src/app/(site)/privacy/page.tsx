import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getHomeContent, getSiteSettings } from "@/sanity/content";

export const metadata = {
  title: "Privacy Policy — Anchored Pathways Foundation",
};

export default async function PrivacyPage() {
  const [content, settings] = await Promise.all([getHomeContent(), getSiteSettings()]);

  return (
    <>
      <SiteHeader settings={settings} />
      <main className="privacy-page">
        <div className="container-apf">
          <h1>Privacy Policy</h1>
          <p className="privacy-date">Effective date: August 1, 2026</p>

          <p>
            Anchored Pathways Foundation (&ldquo;APF,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) is committed to protecting the privacy of everyone who visits this
            website or interacts with our programs. This policy explains what information we collect,
            how we use it, and how we protect it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect personal information only when you voluntarily provide it through our program
            interest and event sign-up forms. This may include your name, email address, phone number,
            and any other information you choose to share. We do not collect information about you
            automatically when you browse this website.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Respond to inquiries and program interest submissions</li>
            <li>Communicate updates about APF programs, events, and resources</li>
            <li>Coordinate volunteer, partner, and donor relationships</li>
            <li>Improve our programs and services</li>
          </ul>
          <p>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>

          <h2>Third-Party Services</h2>
          <p>
            This website uses the following third-party services to collect form submissions and
            process donations. Each service has its own privacy policy that governs how your
            information is handled:
          </p>
          <ul>
            <li>
              <strong>JotForm</strong> — used for general sign-up and contact forms.{" "}
              <a href="https://www.jotform.com/privacy/" target="_blank" rel="noopener noreferrer">
                JotForm Privacy Policy
              </a>
            </li>
            <li>
              <strong>Google Forms</strong> — used for program interest and event registration forms.{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>GoFundMe</strong> — used to process donations on behalf of APF.{" "}
              <a href="https://www.gofundme.com/en-us/c/privacy" target="_blank" rel="noopener noreferrer">
                GoFundMe Privacy Policy
              </a>
            </li>
          </ul>
          <p>
            When you click a link to one of these services, you leave the APF website and their
            privacy policies apply.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal information only as long as necessary to fulfill the purpose for which
            it was collected or as required by applicable law. If you would like your information
            removed from our records, please contact us at the email below.
          </p>

          <h2>Children&rsquo;s Privacy</h2>
          <p>
            This website is not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has submitted information to us,
            please contact us so we can remove it.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request a copy of the personal information we hold about you</li>
            <li>Ask us to correct inaccurate information</li>
            <li>Request that we delete your information</li>
            <li>Opt out of future communications at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at the email address below.</p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or how your information is
            handled, please contact us at:{" "}
            <a href="mailto:support@anchoredpaths.org">support@anchoredpaths.org</a>
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            effective date at the top of this page. We encourage you to review this page periodically.
          </p>
        </div>
      </main>
      <SiteFooter content={content} settings={settings} />
    </>
  );
}
