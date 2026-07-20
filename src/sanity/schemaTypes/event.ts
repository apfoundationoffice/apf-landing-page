import { defineField, defineType } from "sanity";

/**
 * Events shown in "What's coming up".
 *
 * Labels and descriptions are written for a non-technical editor — this is the
 * screen she will use most, so every field says what it does in plain language.
 */
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event name",
      type: "string",
      description: "For example: The Believe Gathering",
      validation: (rule) => rule.required().warning("An event needs a name."),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "dddd, MMMM D, YYYY" },
      description: "The event disappears from the website by itself after this date.",
      validation: (rule) => rule.required().error("Please pick a date — the website needs it to sort and hide events."),
    }),
    defineField({
      name: "time",
      title: "Start time",
      type: "string",
      description: "Optional. For example: 6:00 PM",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "For example: Tulsa, Oklahoma",
      validation: (rule) => rule.required().warning("Adding a location helps people show up."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "A short paragraph about what the event is.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Upload straight from your phone — it gets resized automatically.",
      fields: [
        defineField({
          name: "alt",
          title: "Photo description",
          type: "string",
          description: "Describes the photo for people using a screen reader.",
        }),
      ],
    }),
    defineField({
      name: "signupUrl",
      title: "Sign-up link",
      type: "url",
      description: "Paste the link where people sign up — Eventbrite, a Google form, anything.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).warning("This does not look like a web address."),
    }),
    defineField({
      name: "signupLabel",
      title: "Button words",
      type: "string",
      description: 'What the button says. For example: "Save my seat"',
      initialValue: "Save my seat",
    }),
    defineField({
      name: "featured",
      title: "Make this the main event",
      type: "boolean",
      description: "Gives this event the big photo at the top. Use it for one event at a time.",
      initialValue: false,
    }),
    defineField({
      name: "hidden",
      title: "Hide this event",
      type: "boolean",
      description: "Takes it off the website without deleting it. You can switch it back on later.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "image", featured: "featured", hidden: "hidden" },
    prepare({ title, date, media, featured, hidden }) {
      const when = date
        ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date yet";
      const flags = [featured ? "Main event" : null, hidden ? "Hidden" : null].filter(Boolean).join(" · ");
      return { title, subtitle: flags ? `${when} — ${flags}` : when, media };
    },
  },
  orderings: [
    {
      title: "Date, soonest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
