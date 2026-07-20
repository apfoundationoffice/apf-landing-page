import { defineField, defineType } from "sanity";

/**
 * Everything that isn't tied to one section of the page: the donate button,
 * how people get in touch, and the sign-up form link used by several buttons.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Donate & contact",
  type: "document",
  groups: [
    { name: "donate", title: "Donate button", default: true },
    { name: "contact", title: "Contact details" },
    { name: "forms", title: "Sign-up form" },
    { name: "look", title: "Colours & fonts" },
  ],
  fields: [
    defineField({
      name: "theme",
      title: "Colour theme",
      type: "string",
      group: "look",
      description:
        "Each option has been checked so the text always stays readable — you cannot pick a combination that breaks the design.",
      options: {
        list: [
          { title: "Anchor navy — the usual look", value: "anchor" },
          { title: "Evening — deeper and quieter", value: "evening" },
          { title: "Warm sand — lighter and softer", value: "sand" },
          { title: "Christmas — evergreen and gold", value: "christmas" },
        ],
        layout: "radio",
      },
      initialValue: "anchor",
    }),
    defineField({
      name: "fontPairing",
      title: "Lettering",
      type: "string",
      group: "look",
      description: "Two pairings, both tested at every screen size.",
      options: {
        list: [
          { title: "Warm — the usual lettering", value: "warm" },
          { title: "Classic — a more traditional feel", value: "classic" },
        ],
        layout: "radio",
      },
      initialValue: "warm",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "look",
      description: "Optional. Leave empty to use the anchor mark.",
    }),

    defineField({
      name: "donateEnabled",
      title: "Show the donate button",
      type: "boolean",
      group: "donate",
      description: "Turn this off to hide the button everywhere on the site.",
      initialValue: true,
    }),
    defineField({
      name: "donateLabel",
      title: "Button words",
      type: "string",
      group: "donate",
      description: 'For example: "Donate now" or "Support us"',
      initialValue: "Donate",
    }),
    defineField({
      name: "donateUrl",
      title: "Where the button goes",
      type: "url",
      group: "donate",
      description:
        "Paste your GoFundMe, PayPal or Givebutter link. To change fundraisers later, just paste a new link here — nothing else needs touching.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).warning("This does not look like a web address."),
    }),

    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactPhone",
      title: "Phone number",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "showAddress",
      title: "Show a mailing address",
      type: "boolean",
      group: "contact",
      initialValue: false,
    }),
    defineField({
      name: "address",
      title: "Mailing address",
      type: "text",
      rows: 3,
      group: "contact",
      hidden: ({ document }) => !document?.showAddress,
    }),

    defineField({
      name: "signupUrl",
      title: "Sign-up form link",
      type: "url",
      group: "forms",
      description:
        "The form people fill in to join the community or a waitlist. Used by the buttons across the site.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).warning("This does not look like a web address."),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Donate & contact" }),
  },
});
