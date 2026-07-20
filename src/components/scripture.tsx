import { Reveal } from "@/components/reveal";

/**
 * Scripture verses used across the site. Wording is NIV — kept in ONE place
 * so the translation (or the verses themselves) can be swapped in a single edit.
 */
export const VERSES = {
  anchor: {
    text: "We have this hope as an anchor for the soul, firm and secure.",
    ref: "Hebrews 6:19",
  },
  future: {
    text: "“For I know the plans I have for you,” declares the Lord, “plans to give you hope and a future.”",
    ref: "Jeremiah 29:11",
  },
  family: {
    text: "God sets the lonely in families.",
    ref: "Psalm 68:6",
  },
  presence: {
    text: "He will never leave you nor forsake you.",
    ref: "Deuteronomy 31:6",
  },
} as const;

type VerseKey = keyof typeof VERSES;

type ScriptureProps = {
  verse: VerseKey;
  /** Use on dark/navy backgrounds for legible gold-on-navy styling. */
  onNavy?: boolean;
  className?: string;
  delay?: number;
};

export function Scripture({ verse, onNavy = false, className = "", delay }: ScriptureProps) {
  const { text, ref } = VERSES[verse];
  return (
    <Reveal
      as="figure"
      delay={delay}
      className={`scripture${onNavy ? " scripture--on-navy" : ""}${className ? ` ${className}` : ""}`}
    >
      <blockquote>{text}</blockquote>
      <figcaption>{ref}</figcaption>
    </Reveal>
  );
}
