"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  /** Stagger offset in seconds, applied as the animation delay. */
  delay?: number;
  style?: React.CSSProperties;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * One-shot fade-up on scroll into view. Purely decorative: the resting
 * state is fully visible, and the `in` class (which triggers the keyframe)
 * is only ever added client-side — so content is never hidden without JS.
 * `delay` staggers grouped items; the delay lives in a CSS variable so the
 * hidden pre-animation state only ever exists once JS has added `in`.
 */
export function Reveal({ as, className = "", delay, style, children, ...rest }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const mergedStyle: React.CSSProperties = delay
    ? { ...style, ["--reveal-delay" as string]: `${delay}s` }
    : (style ?? {});
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
