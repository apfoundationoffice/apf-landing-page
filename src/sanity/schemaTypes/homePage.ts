import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * All homepage content.
 *
 * The two-tier idea lives here. Almost everything on this page is written once
 * and never touched again, so putting sixty-five boxes on one screen would make
 * the dashboard intimidating for no benefit. Instead:
 *
 *   "Everyday"  — the handful of fields she actually changes, shown first
 *   "Advanced"  — the set-once content, split into collapsed sections
 */

const photo = (name: string, title: string, description: string, group = "everyday") =>
  defineField({
    name,
    title,
    type: "image",
    group,
    options: { hotspot: true },
    description,
    fields: [
      defineField({
        name: "alt",
        title: "Photo description",
        type: "string",
        description: "Describes the photo for people using a screen reader.",
      }),
    ],
  });

const verse = (name: string, title: string, where: string) =>
  defineField({
    name,
    title,
    type: "object",
    group: "everyday",
    fieldset: "scripture",
    description: where,
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "text", title: "Verse", type: "text", rows: 3 }),
      defineField({ name: "reference", title: "Reference", type: "string", description: "For example: Hebrews 6:19" }),
    ],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "everyday", title: "Everyday", default: true },
    { name: "advanced", title: "Advanced" },
  ],
  fieldsets: [
    { name: "scripture", title: "Bible verses", options: { collapsible: true, collapsed: true } },
    { name: "heroAdv", title: "Hero", options: { collapsible: true, collapsed: true } },
    { name: "whyAdv", title: "The why", options: { collapsible: true, collapsed: true } },
    { name: "programsAdv", title: "Programs", options: { collapsible: true, collapsed: true } },
    { name: "eventsAdv", title: "Events heading", options: { collapsible: true, collapsed: true } },
    { name: "involvedAdv", title: "Get involved", options: { collapsible: true, collapsed: true } },
    { name: "aboutAdv", title: "About", options: { collapsible: true, collapsed: true } },
    { name: "closingAdv", title: "Closing section", options: { collapsible: true, collapsed: true } },
    { name: "footerAdv", title: "Footer", options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    /* ---------------- EVERYDAY ---------------- */
    defineField({
      name: "heroSubheadline",
      title: "Opening sentence",
      type: "text",
      rows: 3,
      group: "everyday",
      description: "The large sentence under the word Hope.",
    }),
    defineField({
      name: "heroDescription",
      title: "Opening paragraph",
      type: "text",
      rows: 4,
      group: "everyday",
      description: "The smaller paragraph underneath it.",
    }),
    photo("heroImage", "Hero photo", "The big photo at the top of the page."),
    photo("whyImage", "The why photo", "The photo beside “Adulthood shouldn’t begin alone.”"),
    photo("involvedImage", "Get involved photo", "The photo beside “Help Build the Bridge.”"),
    photo("aboutImage", "Founder photo", "The photo beside the founder’s story."),

    defineField({
      name: "heroPrimaryButton",
      title: "Main button",
      type: "object",
      group: "everyday",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "label", title: "Button words", type: "string" }),
        defineField({ name: "url", title: "Where it goes", type: "string", description: "A web address, or #join to scroll to the form." }),
      ],
    }),
    defineField({
      name: "heroSecondaryButton",
      title: "Second button",
      type: "object",
      group: "everyday",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "label", title: "Button words", type: "string" }),
        defineField({ name: "url", title: "Where it goes", type: "string" }),
      ],
    }),

    verse("verseHero", "Verse at the top", "Shown under the buttons in the hero."),
    verse("verseWhy", "Verse in “The why”", "Shown after the closing sentence of that section."),
    verse("verseEvents", "Verse in the main event", "Shown inside the featured event card."),
    verse("verseClosing", "Verse at the bottom", "Shown under the final buttons."),

    /* ---------------- ADVANCED: HERO ---------------- */
    defineField({ name: "heroEyebrow", title: "Small text above the headline", type: "string", group: "advanced", fieldset: "heroAdv" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "advanced", fieldset: "heroAdv", description: "The single large word at the top." }),
    defineField({ name: "heroBadgeTitle", title: "Photo badge title", type: "string", group: "advanced", fieldset: "heroAdv" }),
    defineField({ name: "heroBadgeSubtitle", title: "Photo badge subtitle", type: "string", group: "advanced", fieldset: "heroAdv" }),
    defineField({ name: "ribbonText", title: "Tagline band", type: "string", group: "advanced", fieldset: "heroAdv", description: "The quote on the navy strip under the hero." }),
    defineField({ name: "ribbonReference", title: "Tagline band — verse reference", type: "string", group: "advanced", fieldset: "heroAdv", description: "The small reference under the tagline, e.g. Ecclesiastes 4:12. Clear it to hide the reference." }),

    /* ---------------- ADVANCED: THE WHY ---------------- */
    defineField({ name: "whyEyebrow", title: "Small text above the heading", type: "string", group: "advanced", fieldset: "whyAdv" }),
    defineField({ name: "whyHeading", title: "Heading", type: "string", group: "advanced", fieldset: "whyAdv" }),
    defineField({ name: "whyIntro", title: "Intro paragraph", type: "text", rows: 4, group: "advanced", fieldset: "whyAdv" }),
    defineField({
      name: "whyQuestions",
      title: "Questions",
      type: "array",
      group: "advanced",
      fieldset: "whyAdv",
      description: "The list of questions young adults face. Drag to reorder.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "whyClosing", title: "Closing sentence", type: "text", rows: 3, group: "advanced", fieldset: "whyAdv" }),
    defineField({ name: "whyBadgeTitle", title: "Photo badge title", type: "string", group: "advanced", fieldset: "whyAdv" }),
    defineField({ name: "whyBadgeSubtitle", title: "Photo badge subtitle", type: "string", group: "advanced", fieldset: "whyAdv" }),

    /* ---------------- ADVANCED: PROGRAMS ---------------- */
    defineField({ name: "programsEyebrow", title: "Small text above the heading", type: "string", group: "advanced", fieldset: "programsAdv" }),
    defineField({ name: "programsHeading", title: "Heading", type: "string", group: "advanced", fieldset: "programsAdv" }),
    defineField({ name: "programsIntro", title: "Intro paragraph", type: "text", rows: 3, group: "advanced", fieldset: "programsAdv" }),
    defineField({
      name: "programs",
      title: "Programs",
      type: "array",
      group: "advanced",
      fieldset: "programsAdv",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Label on the photo", type: "string" }),
            defineField({ name: "title", title: "Program title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
            defineField({
              name: "pointsIntro",
              title: "Line above the bullets",
              type: "string",
              description: 'Optional, e.g. "Participants receive support with:". Clear it to hide.',
            }),
            defineField({
              name: "points",
              title: "Bullet points",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Photo description", type: "string" })],
            }),
            defineField({ name: "buttonLabel", title: "Button words", type: "string" }),
            defineField({ name: "buttonUrl", title: "Where the button goes", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "tag", media: "image" } },
        }),
      ],
    }),

    /* ---------------- ADVANCED: EVENTS HEADING ---------------- */
    defineField({ name: "eventsEyebrow", title: "Small text above the heading", type: "string", group: "advanced", fieldset: "eventsAdv" }),
    defineField({ name: "eventsHeading", title: "Heading", type: "string", group: "advanced", fieldset: "eventsAdv" }),
    defineField({ name: "eventsIntro", title: "Intro paragraph", type: "text", rows: 3, group: "advanced", fieldset: "eventsAdv", description: "The events themselves are managed under Events in the sidebar." }),

    /* ---------------- ADVANCED: GET INVOLVED ---------------- */
    defineField({ name: "involvedEyebrow", title: "Small text above the heading", type: "string", group: "advanced", fieldset: "involvedAdv" }),
    defineField({ name: "involvedHeading", title: "Heading", type: "string", group: "advanced", fieldset: "involvedAdv" }),
    defineField({ name: "involvedIntro", title: "Intro paragraph", type: "text", rows: 3, group: "advanced", fieldset: "involvedAdv" }),
    defineField({
      name: "ways",
      title: "Ways to help",
      type: "array",
      group: "advanced",
      fieldset: "involvedAdv",
      description: "The four cards. The icons are part of the design and stay as they are.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "People", value: "users" },
                  { title: "Heart", value: "heart" },
                  { title: "Building", value: "building" },
                  { title: "Giving", value: "give" },
                ],
                layout: "dropdown",
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({ name: "involvedButtonLabel", title: "Button words", type: "string", group: "advanced", fieldset: "involvedAdv" }),
    defineField({
      name: "involvedButtonUrl",
      title: "Button link",
      type: "url",
      group: "advanced",
      fieldset: "involvedAdv",
      description:
        "Where the Get Involved button goes — paste a form link (JotForm, Google Form, etc.). Leave empty to use the general Sign-up form link.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).warning("This does not look like a web address."),
    }),

    /* ---------------- ADVANCED: ABOUT ---------------- */
    defineField({ name: "aboutEyebrow", title: "Small text above the quote", type: "string", group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "aboutQuote", title: "Pull quote", type: "text", rows: 3, group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "founderName", title: "Founder name", type: "string", group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "founderTitle", title: "Founder title", type: "string", group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "aboutBody", title: "Story paragraph", type: "text", rows: 5, group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "missionText", title: "Our mission", type: "text", rows: 4, group: "advanced", fieldset: "aboutAdv" }),
    defineField({ name: "visionText", title: "Our vision", type: "text", rows: 4, group: "advanced", fieldset: "aboutAdv" }),

    /* ---------------- ADVANCED: CLOSING ---------------- */
    defineField({ name: "closingHeading", title: "Heading", type: "string", group: "advanced", fieldset: "closingAdv" }),
    defineField({ name: "closingBody", title: "Paragraph", type: "text", rows: 4, group: "advanced", fieldset: "closingAdv" }),
    defineField({ name: "closingButtonLabel", title: "Main button words", type: "string", group: "advanced", fieldset: "closingAdv" }),
    defineField({ name: "closingSecondaryLabel", title: "Second button words", type: "string", group: "advanced", fieldset: "closingAdv" }),

    /* ---------------- ADVANCED: FOOTER ---------------- */
    defineField({ name: "footerTagline", title: "Footer sentence", type: "text", rows: 3, group: "advanced", fieldset: "footerAdv" }),
  ],

  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
