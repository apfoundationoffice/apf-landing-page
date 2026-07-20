import { Reveal } from "@/components/reveal";

type Verse = { text: string; reference: string };

type ScriptureProps = {
  verse: Verse;
  /** Use on dark/navy backgrounds for legible gold-on-navy styling. */
  onNavy?: boolean;
  className?: string;
  delay?: number;
};

/**
 * A quiet scripture accent — small italic Fraunces with a gold reference.
 *
 * Verses come from the CMS, so the wording and translation are hers to change.
 * The placements stay fixed in the design, so the God-centred structure of the
 * page can't be dismantled by accident.
 */
export function ScriptureBlock({ verse, onNavy = false, className = "", delay }: ScriptureProps) {
  if (!verse?.text) return null;

  return (
    <Reveal
      as="figure"
      delay={delay}
      className={`scripture${onNavy ? " scripture--on-navy" : ""}${className ? ` ${className}` : ""}`}
    >
      <blockquote>{verse.text}</blockquote>
      {verse.reference ? <figcaption>{verse.reference}</figcaption> : null}
    </Reveal>
  );
}
