"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { nav, site } from "@/data/content";

/** The glassy product frame that sits over the sky and breaks out of the panel. */
export function ProductFrame({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      className="relative z-10 w-full overflow-hidden rounded-[16px] bg-white/60 ring-1 ring-white/50 backdrop-blur-md shadow-[0_2px_6px_rgba(13,15,15,0.04),0_40px_90px_-30px_rgba(13,15,15,0.45)] sm:rounded-[22px]"
    >
      <div className="flex h-12 items-center gap-2.5 border-b border-hairline bg-white/50 px-4">
        <div className="flex shrink-0 gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
            <path d="M5.5 2.5v11" />
          </svg>
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3.5 5.5 8l4.5 4.5" />
          </svg>
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.7-3.9" />
            <path d="M13.5 2v3h-3" />
          </svg>
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
        </span>
        <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-soft">
          Search this page, or ask it something
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-ink-mute sm:block">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="8" r="2.5" />
            <path d="M7.5 8H14M11 5.5v5" />
          </svg>
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export function SiteHeader() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-colors duration-300",
        stuck
          ? "border-b border-hairline bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 w-full items-center justify-between gap-6 pr-4 pl-4 sm:pr-0">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} home`}>
          <HMark className="h-7 w-7 rounded-[8px] text-[13px]" />
          <span className="text-[19px] font-medium tracking-[-0.015em]">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[15px] text-ink-soft transition-colors hover:bg-black/[0.05] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={nav.cta.href}
          className={`pill pill-primary shrink-0 border border-transparent px-3 py-2.5 ${
            stuck ? "" : "pill-over-sky"
          }`}
        >
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}

export function HMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center bg-ink font-semibold text-white ${className}`}
    >
      H
    </span>
  );
}

/** aside.com's section label: accent text with a chevron. */
export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href="#top" className={`label-link ${className}`}>
      {children}
      <Chevron />
    </a>
  );
}

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-[0.85em] w-[0.85em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

/**
 * aside.com's section frame: a full-width bottom hairline, with the content
 * inside a bordered column so the page reads as a stack of boxes. `width`
 * picks the inner padding — narrow sections are inset far more, which is what
 * makes their centred headlines feel narrow.
 */
export function Section({
  id,
  children,
  width = "wide",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  width?: "wide" | "narrow";
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full border-b border-hairline ${className}`}>
      <div
        className={[
          "mx-auto w-full max-w-[1088px] border-x border-hairline",
          width === "narrow"
            ? "px-6 py-16 sm:px-10 md:px-16 md:py-20 xl:px-[264px]"
            : "px-6 py-16 sm:px-10 md:px-14 md:py-20",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
