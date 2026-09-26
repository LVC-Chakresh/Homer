"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";

type Margin = NonNullable<
  Parameters<typeof useInView>[1]
>["margin"];
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll reveals must never be able to strand content at opacity 0. If the page
 * is rendered without ordinary scrolling (an iframe, a restored scroll offset, a
 * flung scrollbar) IntersectionObserver can report "not intersecting" forever and
 * the section stays invisible. So every reveal has a fail-safe: after RESCUE_MS
 * anything plausibly on screen is shown regardless of what the observer thinks.
 */
const RESCUE_MS = 1200;

function useRescue(ref: React.RefObject<HTMLElement | null>) {
  const [rescued, setRescued] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.top < vh * 2 && r.bottom > -vh) setRescued(true);
    }, RESCUE_MS);
    return () => clearTimeout(id);
  }, [ref]);

  return rescued;
}

/**
 * Shared gate for any scroll-triggered animation. Returns `true` once the
 * element should be visible, whether IntersectionObserver said so or the
 * fail-safe sweep rescued it.
 */
export function useRevealGate<T extends HTMLElement>(options?: {
  amount?: number;
  margin?: Margin;
}) {
  const { amount = 0.1, margin = "0px 0px 12% 0px" } = options ?? {};
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount, margin });
  const rescued = useRescue(ref);
  return { ref, show: inView || rescued };
}

function useContainer(): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: {},
    shown: {
      transition: { staggerChildren: reduced ? 0 : 0.075, delayChildren: 0.04 },
    },
  };
}

function useItem(): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.7, ease: EASE },
    },
  };
}

/** Staggers its children as the block scrolls into view. */
export function RevealGroup({
  children,
  className,
  amount = 0.1,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const MotionTag = motion[Tag];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px 12% 0px" });
  const rescued = useRescue(ref);

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={useContainer()}
      initial="hidden"
      animate={inView || rescued ? "shown" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

/** A single block that rises into place. */
export function Reveal({
  children,
  className,
  amount = 0.1,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "p" | "h2" | "li" | "span" | "section" | "header" | "article";
}) {
  const MotionTag = motion[Tag];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px 12% 0px" });
  const rescued = useRescue(ref);

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={useItem()}
      initial="hidden"
      animate={inView || rescued ? "shown" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

/** Fires once on mount. Used above the fold. */
export function Enter({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h1" | "span";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
