"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Chevron } from "@/components/site-header";
import { useRevealGate } from "@/components/reveal";

type Row = { label: string; value: number; note: string; live: boolean };

/** aside.com's benchmark chart: label left, bar middle, value right, hairline rows. */
export function RankChart({ rows }: { rows: readonly Row[] }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(rows[0]?.label ?? null);
  // aside.com leaves headroom above the top bar rather than pinning it to 100%.
  const scaleMax = Math.max(...rows.map((r) => r.value)) * 1.19;

  return (
    <div className="border-t border-hairline">
      {rows.map((row, i) => {
        const isOpen = open === row.label;
        return (
          <div key={row.label} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : row.label)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-4 text-left sm:gap-8"
            >
              <span className="flex w-[132px] shrink-0 items-center gap-2.5 text-[15px] text-ink sm:w-[190px]">
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-[7px] text-[11px] font-semibold ${
                    row.live ? "bg-ink text-white" : "bg-[#f4f4f5] text-ink-mute"
                  }`}
                >
                  {row.label.slice(0, 1)}
                </span>
                <span className="truncate">{row.label}</span>
              </span>

              <span className="relative h-6 min-w-0 flex-1">
                <motion.span
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: reduced ? 0 : 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: reduced ? 0 : i * 0.08,
                  }}
                  style={{ originX: 0, width: `${(row.value / scaleMax) * 100}%` }}
                  className={`absolute inset-y-0 left-0 rounded-[5px] ${
                    row.live ? "bg-accent" : "bg-[#e4e4e7]"
                  }`}
                />
              </span>

              <span className="flex shrink-0 items-center gap-2">
                <span
                  className={`font-mono text-[14px] tabular-nums ${row.live ? "text-ink" : "text-ink-soft"}`}
                >
                  {row.value.toFixed(2)}
                </span>
                <Chevron
                  className={`h-3.5 w-3.5 text-ink-mute transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-4 pl-0 text-[14px] text-ink-soft sm:pl-[222px]">{row.note}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** aside.com's app-icon wall, rebuilt as page-block chips. */
export function CapabilityWall({
  items,
}: {
  items: readonly { label: string; glyph: string; tint: string }[];
}) {
  const reduced = useReducedMotion();
  const { ref, show } = useRevealGate<HTMLUListElement>();

  return (
    <ul ref={ref} className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
      {items.map((item, i) => (
        <motion.li
          key={item.label}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center gap-2.5 rounded-[14px] bg-[#f7f7f8] px-2 py-5 text-center"
        >
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-[12px] text-[15px] font-semibold text-white"
            style={{ backgroundColor: item.tint }}
          >
            {item.glyph}
          </span>
          <span className="text-[11.5px] leading-tight text-ink-soft">{item.label}</span>
        </motion.li>
      ))}
    </ul>
  );
}
