# APF Landing Page

Single-page site for **Anchored Pathways Foundation**, a faith-rooted nonprofit
walking alongside young adults aging out of foster care.

> "You are not alone. Your story is still being written."

## Status

**Phase 1 of 6 complete** — the page is built with content hardcoded. The admin
dashboard (so the content can be edited without a developer) is not wired up yet.

| Phase | |
|---|---|
| 1. Page built, Resources removed, Events added | ✅ done |
| 2. Sanity dashboard + content model | next |
| 3. Themes (4 palettes, 2 font pairings) | |
| 4. Deploy to Netlify | |
| 5. Accounts moved into the client's name | |
| 6. Handoff — guide, screen recording, walkthrough | |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

One page, nine sections. Every nav tab is an in-page anchor — clicking scrolls
rather than loading a new page.

`Hero → Scripture ribbon → The Why → Programs → Events → Get Involved → About → Final CTA → Footer`

- `src/app/page.tsx` — composes the sections
- `src/components/events-section.tsx` — the events section
- `src/lib/events.ts` — event data and date helpers
- `src/components/scripture.tsx` — all verses live here, so the translation
  can be swapped in one place
- `src/app/globals.css` — brand design tokens and all section styles

## Events

Events sort by date and **hide themselves once they pass**, so the page never
shows a stale event. One event can be `featured`, which gives it the large navy
treatment at the top of the section. Setting `hidden: true` takes an event down
without deleting it. If nothing is upcoming, the whole section disappears.

The fields in `src/lib/events.ts` map one-to-one onto the CMS fields planned for
phase 2, so the content model moves across unchanged.

## Brand

- **Palette:** Deep Navy `#1e3350`, Ivory `#fbf7ef`, Warm Sand `#ece1ce`,
  Soft Taupe `#c9b89c`, Soft Gold `#c2984a`
- **Type:** Fraunces (headings) + Nunito Sans (body), self-hosted via `next/font`
- **Motif:** the anchor — Hebrews 6:19, "we have this hope as an anchor for the soul"

## Accessibility

Deliberate, and worth preserving:

- Content is always visible without JavaScript. The scroll reveal only *adds* a
  fade-up; nothing is left at `opacity: 0`.
- `prefers-reduced-motion` is respected throughout.
- Decorative SVGs are `aria-hidden`; interactive controls carry labels.
- The palette passes contrast — which is why the CMS will expose tested theme
  presets rather than free colour pickers.

## Related repos

- `anchored-pathways` — the original static HTML site
- `anchored-pathways-web` — the first React migration
- `anchored-pathways-2.0` — React plus scripture and motion; this project's design source
