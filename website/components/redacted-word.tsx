"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function RedactedWord({ word, bars = 9 }: { word: string; bars?: number }) {
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  return (
    <button
      type="button"
      onClick={() => setShown((s) => !s)}
      aria-label={shown ? `Hidden word: ${word}. Activate to hide it again.` : `Reveal the hidden word`}
      className="relative inline-block translate-y-[-0.06em] cursor-pointer pl-1 align-baseline"
    >
      <span className="invisible" aria-hidden="true">
        {word}
      </span>
      {shown ? (
        <motion.span
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 text-ink"
        >
          {word}
        </motion.span>
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-between gap-[2px] pl-1"
        >          {Array.from({ length: bars }, (_, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { scaleY: 0.2, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : i * 0.035, ease: [0.16, 1, 0.3, 1] }}
              className="h-[0.72em] w-[0.17em] rounded-[1px] bg-ink"
            />
          ))}
        </span>
      )}
    </button>
  );
}
