import { Reveal } from "@/components/reveal";
import { Scripture } from "@/components/scripture";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/icons";
import {
  upcomingEvents,
  formatMonth,
  formatDay,
  formatFullDate,
  type EventItem,
} from "@/lib/events";

function DateBadge({ date, tone }: { date: string; tone?: "on-navy" }) {
  return (
    <span className={`datebadge${tone === "on-navy" ? " datebadge--on-navy" : ""}`} aria-hidden="true">
      <span className="datebadge__month">{formatMonth(date)}</span>
      <span className="datebadge__day">{formatDay(date)}</span>
    </span>
  );
}

function FeaturedEvent({ event }: { event: EventItem }) {
  return (
    <Reveal className="event-feature">
      <div className="event-feature__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.imageAlt} width={600} height={750} />
      </div>
      <div className="event-feature__body">
        <span className="event-feature__flag">Featured</span>
        <h3>{event.title}</h3>
        <ul className="event-meta">
          <li>
            <CalendarIcon />
            <span>
              {formatFullDate(event.date)}
              {event.time ? ` · ${event.time}` : ""}
            </span>
          </li>
          <li>
            <MapPinIcon />
            <span>{event.location}</span>
          </li>
        </ul>
        <p>{event.description}</p>
        <Scripture verse="family" onNavy className="event-feature__scripture" delay={0.1} />
        <a className="btn btn--gold" href={event.signupUrl} target="_blank" rel="noopener">
          {event.signupLabel}
          <ArrowRightIcon />
        </a>
      </div>
    </Reveal>
  );
}

function EventRow({ event, delay }: { event: EventItem; delay: number }) {
  return (
    <Reveal as="article" className="event-row" delay={delay}>
      <DateBadge date={event.date} />
      <div className="event-row__body">
        <h4>{event.title}</h4>
        <ul className="event-meta event-meta--compact">
          <li>
            <CalendarIcon />
            <span>{event.time ?? formatFullDate(event.date)}</span>
          </li>
          <li>
            <MapPinIcon />
            <span>{event.location}</span>
          </li>
        </ul>
        <p>{event.description}</p>
      </div>
      <a className="btn btn--ghost btn--sm event-row__cta" href={event.signupUrl} target="_blank" rel="noopener">
        {event.signupLabel}
      </a>
    </Reveal>
  );
}

export function EventsSection() {
  const events = upcomingEvents();

  // Nothing coming up — the section removes itself rather than showing an
  // empty shell. Better a shorter page than one that looks abandoned.
  if (events.length === 0) return null;

  const featured = events.find((e) => e.featured);
  const rest = events.filter((e) => e !== featured);

  return (
    <section className="section events" id="events">
      <div className="container-apf">
        <Reveal className="sec-head center">
          <span className="eyebrow center">What&rsquo;s coming up</span>
          <h2>Come be part of it.</h2>
          <p className="lead">
            Gatherings, trainings, and program starts — everyone is welcome, and there is always a
            seat for you.
          </p>
        </Reveal>

        {featured ? <FeaturedEvent event={featured} /> : null}

        {rest.length > 0 ? (
          <div className="event-list">
            {rest.map((event, i) => (
              <EventRow key={event.title} event={event} delay={i * 0.08} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
