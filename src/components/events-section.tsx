import { Reveal } from "@/components/reveal";
import { ScriptureBlock } from "@/components/scripture";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/icons";
import { getUpcomingEvents, formatMonth, formatDay, formatFullDate, type EventItem } from "@/lib/events";
import type { HomeContent } from "@/sanity/content";

function DateBadge({ date }: { date: string }) {
  return (
    <span className="datebadge" aria-hidden="true">
      <span className="datebadge__month">{formatMonth(date)}</span>
      <span className="datebadge__day">{formatDay(date)}</span>
    </span>
  );
}

function EventMetaList({ event, compact }: { event: EventItem; compact?: boolean }) {
  return (
    <ul className={`event-meta${compact ? " event-meta--compact" : ""}`}>
      <li>
        <CalendarIcon />
        <span>
          {compact && event.time ? event.time : formatFullDate(event.date)}
          {!compact && event.time ? ` · ${event.time}` : ""}
        </span>
      </li>
      {event.location ? (
        <li>
          <MapPinIcon />
          <span>{event.location}</span>
        </li>
      ) : null}
    </ul>
  );
}

function FeaturedEvent({ event, verse }: { event: EventItem; verse: HomeContent["verseEvents"] }) {
  return (
    <Reveal className="event-feature">
      {event.image ? (
        <div className="event-feature__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.imageAlt} width={600} height={750} />
        </div>
      ) : null}
      <div className="event-feature__body">
        <span className="event-feature__flag">Featured</span>
        <h3>{event.title}</h3>
        <EventMetaList event={event} />
        <p>{event.description}</p>
        <ScriptureBlock verse={verse} onNavy className="event-feature__scripture" delay={0.1} />
        {event.signupUrl ? (
          <a className="btn btn--gold" href={event.signupUrl} target="_blank" rel="noopener">
            {event.signupLabel}
            <ArrowRightIcon />
          </a>
        ) : null}
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
        <EventMetaList event={event} compact />
        <p>{event.description}</p>
      </div>
      {event.signupUrl ? (
        <a
          className="btn btn--ghost btn--sm event-row__cta"
          href={event.signupUrl}
          target="_blank"
          rel="noopener"
        >
          {event.signupLabel}
        </a>
      ) : null}
    </Reveal>
  );
}

export async function EventsSection({ content }: { content: HomeContent }) {
  const events = await getUpcomingEvents();

  // Nothing coming up — the section removes itself rather than showing an
  // empty shell.
  if (events.length === 0) return null;

  const featured = events.find((e) => e.featured);
  const rest = events.filter((e) => e !== featured);

  return (
    <section className="section events" id="events">
      <div className="container-apf">
        <Reveal className="sec-head center">
          <span className="eyebrow center">{content.eventsEyebrow}</span>
          <h2>{content.eventsHeading}</h2>
          <p className="lead">{content.eventsIntro}</p>
        </Reveal>

        {featured ? <FeaturedEvent event={featured} verse={content.verseEvents} /> : null}

        {rest.length > 0 ? (
          <div className="event-list">
            {rest.map((event, i) => (
              <EventRow key={`${event.title}-${event.date}`} event={event} delay={i * 0.08} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
