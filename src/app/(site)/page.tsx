import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ScriptureBlock } from "@/components/scripture";
import { EventsSection } from "@/components/events-section";
import { getHomeContent, getSiteSettings } from "@/sanity/content";
import {
  ArrowRightIcon,
  CheckIcon,
  HeartIcon,
  UsersIcon,
  BuildingIcon,
  GiveIcon,
} from "@/components/icons";

/**
 * Rebuild at most once a minute, so a publish reaches the live site within a
 * couple of minutes without a webhook needing to be wired up and maintained.
 */
export const revalidate = 60;

const WAY_ICONS = {
  users: UsersIcon,
  heart: HeartIcon,
  building: BuildingIcon,
  give: GiveIcon,
} as const;

export default async function Home() {
  const [content, settings] = await Promise.all([getHomeContent(), getSiteSettings()]);

  return (
    <>
      <SiteHeader settings={settings} />

      <main id="top">
        {/* ======================= HERO ======================= */}
        <section className="hero">
          <div className="container-apf">
            <div className="hero__grid">
              <div className="hero__copy">
                <Reveal as="span" className="eyebrow">
                  {content.heroEyebrow}
                </Reveal>
                <Reveal as="h1" className="hero__title">
                  {content.heroHeadline}
                  <span className="accent">.</span>
                </Reveal>
                <Reveal as="p" className="hero__desc">
                  {content.heroDescription}
                </Reveal>
                <Reveal className="hero__buttons btn-row">
                  <a className="btn btn--gold" href={content.heroPrimaryButton.url}>
                    {content.heroPrimaryButton.label}
                    <ArrowRightIcon />
                  </a>
                  <a className="btn btn--ghost" href={content.heroSecondaryButton.url}>
                    {content.heroSecondaryButton.label}
                  </a>
                </Reveal>
              </div>

              <Reveal className="hero__media">
                <div className="hero__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.heroImage.src}
                    alt={content.heroImage.alt}
                    width={800}
                    height={1000}
                    fetchPriority="high"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* tagline ribbon */}
        <div className="ribbon">
          <div className="container-apf">
            <p>&ldquo;{content.ribbonText}&rdquo;</p>
            {content.ribbonReference ? <cite className="ribbon__ref">{content.ribbonReference}</cite> : null}
          </div>
        </div>

        {/* ======================= THE WHY ======================= */}
        <section className="section why" id="why">
          <div className="container-apf">
            <div className="why__grid">
              <div className="why__copy">
                <Reveal as="span" className="eyebrow">
                  {content.whyEyebrow}
                </Reveal>
                <Reveal as="h2" className="why__title">
                  {content.whyHeading}
                </Reveal>
                <Reveal as="p" className="lead" style={{ marginTop: "1rem" }}>
                  {content.whyIntro}
                </Reveal>

                <div className="qwrap">
                  {content.whyQuestions.map((q, i) => (
                    <Reveal className="qcard" key={q} delay={i * 0.08}>
                      <span className="qmark">?</span>
                      <p>{q}</p>
                    </Reveal>
                  ))}
                </div>

                <Reveal as="p" className="why__close">
                  {content.whyClosing}
                </Reveal>
              </div>

              <Reveal className="why__media">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.whyImage.src} alt={content.whyImage.alt} width={600} height={720} />
                </div>
                <div className="stat" aria-hidden="true">
                  <b>{content.whyBadgeTitle}</b>
                  <span>{content.whyBadgeSubtitle}</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ======================= PROGRAMS ======================= */}
        <section className="section programs" id="programs">
          <div className="container-apf">
            <Reveal className="sec-head center">
              <span className="eyebrow center">{content.programsEyebrow}</span>
              <h2>{content.programsHeading}</h2>
              <p className="lead">{content.programsIntro}</p>
            </Reveal>

            <div className="prog-grid">
              {content.programs.map((program, i) => (
                <Reveal as="article" className="pcard" key={program.title} delay={i * 0.1}>
                  <div className="pcard__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={program.image.src} alt={program.image.alt} width={640} height={400} />
                    <span className="pcard__tag">{program.tag}</span>
                  </div>
                  <div className="pcard__body">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    {program.pointsIntro ? <p className="plist-intro">{program.pointsIntro}</p> : null}
                    <ul className="plist">
                      {program.points.map((point) => (
                        <li key={point}>
                          <CheckIcon />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a className="btn btn--ghost" href={program.buttonUrl}>
                      {program.buttonLabel}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= EVENTS ======================= */}
        <EventsSection content={content} />

        {/* ======================= GET INVOLVED ======================= */}
        <section className="section involved" id="involved">
          <div className="container-apf">
            <div className="involved__grid">
              <Reveal className="involved__media">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.involvedImage.src}
                    alt={content.involvedImage.alt}
                    width={600}
                    height={750}
                  />
                </div>
              </Reveal>
              <div className="involved__copy">
                <Reveal as="span" className="eyebrow">
                  {content.involvedEyebrow}
                </Reveal>
                <Reveal as="h2" className="involved__title">
                  {content.involvedHeading}
                </Reveal>
                <Reveal as="p" className="lead" style={{ marginTop: "1rem" }}>
                  {content.involvedIntro}
                </Reveal>

                <div className="ways">
                  {content.ways.map((way, i) => {
                    const Icon = WAY_ICONS[way.icon as keyof typeof WAY_ICONS] ?? HeartIcon;
                    return (
                      <Reveal className="way" key={way.title} delay={i * 0.08}>
                        <span className="way__icon">
                          <Icon />
                        </span>
                        <h4>{way.title}</h4>
                        <p>{way.description}</p>
                      </Reveal>
                    );
                  })}
                </div>

                <Reveal className="btn-row" style={{ marginTop: "1.8rem" }}>
                  <a
                    className="btn btn--gold"
                    href={content.involvedButtonUrl || settings.signupUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    {content.involvedButtonLabel}
                    <ArrowRightIcon />
                  </a>
                  {settings.donateEnabled && settings.donateUrl ? (
                    <a className="btn btn--ghost" href={settings.donateUrl} target="_blank" rel="noopener">
                      {settings.donateLabel}
                    </a>
                  ) : null}
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= ABOUT / FOUNDER ======================= */}
        <section className="section about" id="about">
          <div className="container-apf">
            <div className="about__grid">
              <Reveal className="about__media">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.aboutImage.src} alt={content.aboutImage.alt} width={600} height={600} />
                </div>
              </Reveal>
              <div className="about__copy">
                <Reveal as="span" className="eyebrow">
                  {content.aboutEyebrow}
                </Reveal>
                <Reveal as="blockquote">
                  <span className="q">&ldquo;</span>
                  {content.aboutQuote}
                  <span className="q">&rdquo;</span>
                </Reveal>
                <Reveal as="cite">
                  {content.founderName}
                  <span>{content.founderTitle}</span>
                </Reveal>
                <Reveal as="p" className="about__body">
                  {content.aboutBody}
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= OUR FOUNDATION — MISSION & VISION ======================= */}
        <section className="section foundation" id="foundation">
          <div className="container-apf">
            <Reveal className="sec-head center">
              <span className="eyebrow center">Our Foundation</span>
              <h2>Our Mission. Our Vision.</h2>
            </Reveal>
            <ScriptureBlock verse={content.verseHero} className="foundation__verse" delay={0.1} />
            <div className="mv-cards">
              <Reveal className="mv-card">
                <h3>Our Mission</h3>
                <p>{content.missionText}</p>
              </Reveal>
              <Reveal className="mv-card" delay={0.08}>
                <h3>Our Vision</h3>
                <p>{content.visionText}</p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter content={content} settings={settings} />
    </>
  );
}
