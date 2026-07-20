"use client";

import { useEffect, useState } from "react";
import { AnchorIcon, MenuIcon } from "@/components/icons";
import type { SiteSettings } from "@/sanity/content";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#events", label: "Events" },
  { href: "#involved", label: "Get Involved" },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Anchored Pathways Foundation home">
      <span className="brand__mark" aria-hidden="true">
        <AnchorIcon />
      </span>
      <span className="brand__name">
        Anchored Pathways<small>Foundation</small>
      </span>
    </a>
  );
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showDonate = settings.donateEnabled && Boolean(settings.donateUrl);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="header">
      <div className="container-apf">
        <nav className="nav" aria-label="Primary">
          <Brand />

          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav__cta">
            {showDonate ? (
              <a className="btn btn--gold btn--sm" href={settings.donateUrl} target="_blank" rel="noopener">
                {settings.donateLabel}
              </a>
            ) : (
              <a className="btn btn--gold btn--sm" href="#join">
                Join the Community
              </a>
            )}
            <button
              className="nav__toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {showDonate ? (
          <a
            className="btn btn--gold"
            href={settings.donateUrl}
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
          >
            {settings.donateLabel}
          </a>
        ) : (
          <a className="btn btn--gold" href="#join" onClick={() => setMenuOpen(false)}>
            Join the Community
          </a>
        )}
      </div>
    </header>
  );
}
