import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Scripture } from "@/components/scripture";
import { EventsSection } from "@/components/events-section";
import {
  AnchorIcon,
  ArrowRightIcon,
  CheckIcon,
  HeartIcon,
  UsersIcon,
  BuildingIcon,
  GiveIcon,
} from "@/components/icons";

const JOTFORM_URL = "https://form.jotform.com/260375246247055";

const WHY_QUESTIONS = [
  "Where will I live?",
  "How do I manage money?",
  "Who can I trust?",
  "What is my purpose?",
  "Who is walking with me?",
];

const DISCIPLESHIP_POINTS = [
  "Faith-based mentorship",
  "Identity development",
  "Community connection",
  "Purpose discovery",
  "Encouraging conversations",
  "Personal growth",
];

const BRIDGE_POINTS = [
  "Housing readiness",
  "Employment prep",
  "Education pathways",
  "Financial literacy",
  "Life skills",
  "Goal setting",
];

const WAYS = [
  {
    icon: UsersIcon,
    title: "Become a Mentor",
    body: "Walk alongside a young adult with consistency and care.",
  },
  {
    icon: HeartIcon,
    title: "Volunteer",
    body: "Give your time and gifts to events and programs.",
  },
  {
    icon: BuildingIcon,
    title: "Partner as an Org",
    body: "Align your organization with the mission.",
  },
  {
    icon: GiveIcon,
    title: "Give Financially",
    body: "Fund stability, mentorship, and the Believe Gathering.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ======================= HERO ======================= */}
        <section className="hero">
          <div className="container-apf">
            <div className="hero__grid">
              <div className="hero__copy">
                <Reveal as="span" className="eyebrow">
                  You are not alone
                </Reveal>
                <Reveal as="h1" className="hero__title">
                  Hope<span className="accent">.</span>
                </Reveal>
                <Reveal as="p" className="hero__sub">
                  Helping emancipated foster youth move beyond survival — and build a life of
                  stability, purpose, and belonging.
                </Reveal>
                <Reveal as="p" className="hero__desc">
                  Anchored Pathways Foundation walks alongside young adults aging out of foster care
                  through mentorship, community, life skills, and faith-based discipleship — a strong
                  foundation for the future they were created for.
                </Reveal>
                <Reveal className="hero__buttons btn-row">
                  <a className="btn btn--gold" href="#join">
                    Join the Community
                    <ArrowRightIcon />
                  </a>
                  <a className="btn btn--ghost" href="#involved">
                    Support the Mission
                  </a>
                </Reveal>
                <Scripture verse="anchor" className="hero__verse" delay={0.1} />
              </div>

              <Reveal className="hero__media">
                <div className="hero__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/community.jpg"
                    alt="A diverse group of young adults lying close together on a blanket, laughing"
                    width={800}
                    height={1000}
                    fetchPriority="high"
                  />
                </div>
                <div className="hero__badge" aria-hidden="true">
                  <span className="dot">
                    <HeartIcon />
                  </span>
                  <span>
                    <b>Belonging</b>
                    <span className="badge-sub">Your story is still being written</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* tagline ribbon */}
        <div className="ribbon">
          <div className="container-apf">
            <p>
              &ldquo;You are not alone. <b>Your story is still being written.</b>&rdquo;
            </p>
          </div>
        </div>

        {/* ======================= THE WHY ======================= */}
        <section className="section why" id="why">
          <div className="container-apf">
            <div className="why__grid">
              <div className="why__copy">
                <Reveal as="span" className="eyebrow">
                  The Why
                </Reveal>
                <Reveal as="h2" className="why__title">
                  Adulthood shouldn&rsquo;t begin alone.
                </Reveal>
                <Reveal as="p" className="lead" style={{ marginTop: "1rem" }}>
                  Every year, young adults leave the foster care system facing adulthood without the
                  consistent support, guidance, and community many of their peers rely on. Many
                  navigate questions like&hellip;
                </Reveal>

                <div className="qwrap">
                  {WHY_QUESTIONS.map((q, i) => (
                    <Reveal className="qcard" key={q} delay={i * 0.08}>
                      <span className="qmark">?</span>
                      <p>{q}</p>
                    </Reveal>
                  ))}
                </div>

                <Reveal as="p" className="why__close">
                  At Anchored Pathways, we believe stability begins with more than resources — it
                  begins with <b>relationship, identity, and knowing you are not alone.</b>
                </Reveal>

                <Scripture verse="future" className="why__scripture" delay={0.1} />
              </div>

              <Reveal className="why__media">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/reflection.jpg"
                    alt="A young woman journaling by a sunlit window with a coffee and a book"
                    width={600}
                    height={720}
                  />
                </div>
                <div className="stat" aria-hidden="true">
                  <b>More than survival</b>
                  <span>Stability, identity &amp; purpose</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ======================= PROGRAMS ======================= */}
        <section className="section programs" id="programs">
          <div className="container-apf">
            <Reveal className="sec-head center">
              <span className="eyebrow center">What We Do</span>
              <h2>One Mission. Two Pathways.</h2>
              <p className="lead">
                Anchored Pathways Foundation supports emancipated foster youth through two programs
                designed to meet both practical and personal needs.
              </p>
            </Reveal>

            <div className="prog-grid">
              <Reveal as="article" className="pcard">
                <div className="pcard__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/mentorship.jpg"
                    alt="Two people talking over coffee at a wooden cafe table"
                    width={640}
                    height={400}
                  />
                  <span className="pcard__tag">Discipleship Program</span>
                </div>
                <div className="pcard__body">
                  <h3>Discover Identity. Build Community. Walk in Purpose.</h3>
                  <p>
                    A voluntary, faith-based cohort experience created for emancipated foster youth
                    seeking encouragement, mentorship, and spiritual growth. Through guided
                    conversations, community, and mentorship, participants explore identity, healing,
                    purpose, and their story through the foundation of faith.
                  </p>
                  <ul className="plist">
                    {DISCIPLESHIP_POINTS.map((point) => (
                      <li key={point}>
                        <CheckIcon />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a className="btn btn--ghost" href="#join">
                    Join the Discipleship Waitlist
                  </a>
                </div>
              </Reveal>

              <Reveal as="article" className="pcard">
                <div className="pcard__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/goals.jpg"
                    alt="Overhead view of hands writing goals in a planner beside coffee"
                    width={640}
                    height={400}
                  />
                  <span className="pcard__tag">The Bridge Program</span>
                </div>
                <div className="pcard__body">
                  <h3>Practical Support for the Journey Into Independence.</h3>
                  <p>
                    The Bridge Program provides practical support and guidance as young adults
                    transition from foster care into adulthood. Through mentorship, resources, and
                    life-skills development, participants receive support as they build stability and
                    confidence.
                  </p>
                  <ul className="plist">
                    {BRIDGE_POINTS.map((point) => (
                      <li key={point}>
                        <CheckIcon />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a className="btn btn--ghost" href="#join">
                    Join the Bridge Program Waitlist
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ======================= EVENTS ======================= */}
        <EventsSection />

        {/* ======================= GET INVOLVED ======================= */}
        <section className="section involved" id="involved">
          <div className="container-apf">
            <div className="involved__grid">
              <Reveal className="involved__media">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/walking.jpg"
                    alt="Three friends walking arm in arm, laughing together outdoors"
                    width={600}
                    height={750}
                  />
                </div>
              </Reveal>
              <div className="involved__copy">
                <Reveal as="span" className="eyebrow">
                  Get Involved
                </Reveal>
                <Reveal as="h2" className="involved__title">
                  Help Build the Bridge.
                </Reveal>
                <Reveal as="p" className="lead" style={{ marginTop: "1rem" }}>
                  It takes a community to help a young adult move beyond survival. There&rsquo;s a
                  place for you in this story.
                </Reveal>

                <div className="ways">
                  {WAYS.map(({ icon: Icon, title, body }, i) => (
                    <Reveal className="way" key={title} delay={i * 0.08}>
                      <span className="way__icon">
                        <Icon />
                      </span>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </Reveal>
                  ))}
                </div>

                <Reveal className="btn-row" style={{ marginTop: "1.8rem" }}>
                  <a className="btn btn--gold" href="#join">
                    Get Connected
                    <ArrowRightIcon />
                  </a>
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
                  <img
                    src="/images/friendship.jpg"
                    alt="Two young adults laughing together in warm, golden evening light"
                    width={600}
                    height={600}
                  />
                </div>
              </Reveal>
              <div className="about__copy">
                <Reveal as="span" className="eyebrow">
                  Our Story
                </Reveal>
                <Reveal as="blockquote">
                  <span className="q">&ldquo;</span>Anchored Pathways exists to help young adults move
                  beyond survival — and discover stability, identity, and purpose.
                  <span className="q">&rdquo;</span>
                </Reveal>
                <Reveal as="cite">
                  Unique Evans
                  <span>Founder &amp; former foster youth</span>
                </Reveal>
                <Reveal as="p" className="about__body">
                  Founded by Unique Evans, who understands firsthand the journey of transitioning
                  from foster care into adulthood. After experiencing both the challenges and the
                  power of faith, community, and support, Unique created Anchored Pathways to help
                  others build a strong foundation for their future.
                </Reveal>

                <div className="mv">
                  <Reveal>
                    <h4>Our Mission</h4>
                    <p>
                      To support emancipated foster youth as they build lasting stability through
                      mentorship, life skills, community, and faith-based encouragement.
                    </p>
                  </Reveal>
                  <Reveal>
                    <h4>Our Vision</h4>
                    <p>
                      A generation of young adults who leave foster care knowing they are supported,
                      equipped, and created with purpose.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= FINAL CTA ======================= */}
        <section className="section final" id="join">
          <div className="container-apf stack">
            <Reveal>
              <AnchorIcon className="final__anchor" aria-hidden="true" />
            </Reveal>
            <Reveal as="h2">Ready for More Than Survival?</Reveal>
            <Reveal as="p">
              Take the first step. Complete the form to join the community, request a program
              waitlist, or partner with the mission — and someone will walk with you from here.
            </Reveal>
            <Reveal className="btn-row">
              <a className="btn btn--gold" href={JOTFORM_URL} target="_blank" rel="noopener">
                Complete the Form
                <ArrowRightIcon />
              </a>
              <a className="btn btn--ghost-navy" href="#involved">
                Support the Mission
              </a>
            </Reveal>
            <Scripture verse="presence" className="final__verse" delay={0.1} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
