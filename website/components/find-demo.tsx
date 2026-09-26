"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { HMark } from "@/components/site-header";

type Demo = {
  query: string;
  verdict: string;
  count: string;
  when: string;
  answer: string[];
  tone: "answer" | "partial" | "none";
  steps: string[];
};

const DEMOS: readonly Demo[] = [
  {
    query: "where does the president live?",
    verdict: "answer found",
    count: "1 answer + 1 context",
    when: "Just now",
    answer: ["The Executive Residence sits at 1600 Pennsylvania Avenue NW."],
    tone: "answer",
    steps: ["Split the page into 258 sentences", "Scored 4 windows in one request", "Painted 1 answer, 1 context"],
  },
  {
    query: "how many metro stations are there?",
    verdict: "partially addressed",
    count: "2 context",
    when: "an hour ago",
    answer: ["Metrorail links the quadrants through 27 stations."],
    tone: "partial",
    steps: ["Split the page into 258 sentences", "Verdict landed at 0.34, below the answer floor"],
  },
  {
    query: "what is the refund policy?",
    verdict: "no answer on this page",
    count: "0 matches",
    when: "an hour ago",
    answer: [],
    tone: "none",
    steps: ["Split the page into 258 sentences", "Nothing scored above 0.05", "Left the page untouched"],
  },
];

const TONE: Record<Demo["tone"], { dot: string; chip: string; text: string }> = {
  answer: { dot: "bg-accent", chip: "bg-accent text-white", text: "text-accent" },
  partial: { dot: "bg-[#f59e0b]", chip: "bg-[#f59e0b] text-white", text: "text-[#b45309]" },
  none: { dot: "bg-ink-mute/50", chip: "border border-hairline text-ink-mute", text: "text-ink-mute" },
};

/* ---- sidebar ------------------------------------------------------------ */

const TILES = [
  { tint: "#E1306C", g: "N" },
  { tint: "#4285F4", g: "G" },
  { tint: "#EA4335", g: "F" },
  { tint: "#7B1FA2", g: "S" },
  { tint: "#111111", g: "D" },
  { tint: "#5865F2", g: "C" },
];

function Sidebar() {
  return (
    <aside className="hidden w-[236px] shrink-0 flex-col border-r border-hairline bg-white/65 backdrop-blur-md lg:flex">
      <div className="grid grid-cols-3 gap-2 p-4 pb-2">
        {TILES.map((t, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="grid h-[52px] place-items-center rounded-[9px] bg-gradient-to-b from-white to-[#e9edf1] shadow-[0_1px_2px_rgba(13,15,15,0.08)]"
          >
            <span
              className="grid h-[22px] w-[22px] place-items-center rounded-[6px] text-[10px] font-bold text-white"
              style={{ backgroundColor: t.tint }}
            >
              {t.g}
            </span>
          </span>
        ))}
      </div>

      <div className="px-4 pt-3">
        <p className="text-[13px] text-ink-soft">Bookmarks</p>
        <ul className="mt-1.5 space-y-0.5">
          {["Ctrl+F cheatsheet", "Reading list", "Spec notes"].map((item) => (
            <li key={item} className="flex items-center gap-2.5 rounded-md px-1 py-1 text-[13.5px] text-ink">
              <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-[4px] bg-ink/10">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-ink/45" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 px-4">
        <p className="text-[13px] text-ink-soft">Chats</p>
        <ul className="mt-1.5 space-y-0.5">
          {DEMOS.map((d, i) => (
            <li
              key={d.query}
              className="flex items-center gap-2 rounded-md px-1 py-1 text-[13.5px] text-ink"
            >
              <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] bg-ink/[0.07] font-mono text-[8px] text-ink-soft">
                {i + 1}
              </span>
              <span className="truncate">{d.query}</span>
            </li>
          ))}
          <li className="px-1 py-1 text-[13.5px] text-ink-soft">Show all</li>
        </ul>
      </div>

      <div className="mt-5 px-4">
        <p className="text-[13px] text-ink-soft">Tabs</p>
        <ul className="mt-1.5 space-y-0.5">
          <li className="px-1 py-1 text-[13.5px] text-ink-soft">+ New Tab</li>
        </ul>
      </div>
    </aside>
  );
}

/* ---- main --------------------------------------------------------------- */

function ResultCards({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {DEMOS.map((d, i) => {
        const tone = TONE[d.tone];
        const isActive = i === active;
        return (
          <button
            key={d.query}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={isActive}
            className={[
              "group relative flex h-[188px] flex-col overflow-hidden rounded-[10px] bg-white p-4 text-left transition-all duration-300",
              isActive
                ? "shadow-[0_0_0_1.5px_var(--color-accent),0_10px_28px_-14px_rgba(13,15,15,0.3)]"
                : "shadow-[0_0_0_1px_rgb(0_0_0/0.07)] hover:shadow-[0_0_0_1px_rgb(0_0_0/0.14)]",
            ].join(" ")}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="truncate text-[11.5px] text-ink-mute">{d.when}</span>
              <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
            </span>
            <span className="mt-1.5 line-clamp-2 text-[14px] leading-snug font-medium text-ink">
              {d.query}
            </span>

            {d.answer.length > 0 ? (
              <span className="mt-2.5 line-clamp-3 block text-[12px] leading-snug text-ink-soft">
                {d.answer[0]}
              </span>
            ) : (
              <span className="mt-2.5 flex flex-1 items-center justify-center">
                <span className="rounded-[7px] border border-dashed border-hairline-strong px-3 py-2.5 text-center text-[11.5px] leading-snug text-ink-mute">
                  Nothing painted.
                  <br />
                  The page was left alone.
                </span>
              </span>
            )}

            <span className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {d.tone === "answer" ? (
                <>
                  <span className={`rounded-full px-2 py-[3px] font-mono text-[9.5px] leading-none ${tone.chip}`}>
                    1 answer
                  </span>
                  <span className="rounded-full bg-accent/15 px-2 py-[3px] font-mono text-[9.5px] leading-none text-accent">
                    1 context
                  </span>
                </>
              ) : d.tone === "partial" ? (
                <span className={`rounded-full px-2 py-[3px] font-mono text-[9.5px] leading-none ${tone.chip}`}>
                  2 context
                </span>
              ) : (
                <span className={`rounded-full px-2 py-[3px] font-mono text-[9.5px] leading-none ${tone.chip}`}>
                  0 matches
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function FindDemo() {
  const [demo, setDemo] = useState({ index: 0, typed: 0 });
  const reduced = useReducedMotion();

  const d = DEMOS[demo.index];
  const typed = reduced ? d.query.length : Math.min(demo.typed, d.query.length);
  const searching = !reduced && demo.typed < d.query.length;
  const done = typed >= d.query.length;

  useEffect(() => {
    if (reduced) return;
    if (demo.typed >= d.query.length) return;
    const id = setTimeout(
      () => setDemo((p) => ({ ...p, typed: p.typed + 1 })),
      demo.typed === 0 ? 900 : 26,
    );
    return () => clearTimeout(id);
  }, [demo.typed, d.query.length, reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setDemo((p) => ({ index: (p.index + 1) % DEMOS.length, typed: 0 })),
      7400,
    );
    return () => clearTimeout(id);
  }, [demo.index, reduced]);

  return (
    <div className="flex min-h-[600px]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col bg-white/80">
        {/* Deliberately empty, like the reference: logo watermark, then content below. */}
        <div className="grid flex-1 place-items-center pt-10">
          <HMark className="h-[68px] w-[68px] rounded-[18px] text-[30px] opacity-[0.07]" />
        </div>

        <div className="px-6 pt-6 pb-7 sm:px-8">
          <div className="flex items-center gap-2 rounded-full border border-hairline bg-white px-3 py-2 shadow-[0_1px_2px_rgba(13,15,15,0.04)]">
            <HMark className="h-[22px] w-[22px] shrink-0 rounded-[7px] text-[11px]" />
            <span className="sr-only">Homer find bar, semantic find</span>
            <span className="min-w-0 flex-1 truncate text-[14px] text-ink">
              {d.query.slice(0, typed)}
              {!done ? (
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="ml-px inline-block h-[14px] w-px translate-y-px bg-ink"
                />
              ) : null}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              {searching ? (
                <motion.span
                  key="s"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#e4e4e7] border-t-ink"
                  aria-hidden="true"
                />
              ) : (
                <motion.span
                  key="c"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 rounded-md bg-[#f4f4f5] px-2 py-1 text-[11.5px] leading-none whitespace-nowrap text-[#52525b]"
                >
                  {d.count}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[12px] text-ink-soft">
            <span className="font-mono text-[10.5px] text-ink-mute">Ctrl F</span>
            <span>to open anywhere</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${TONE[d.tone].dot}`} />
              <span className={TONE[d.tone].text}>{d.verdict}</span>
            </span>
          </div>

          <div className="mt-7">
            <h4 className="text-[15px] font-medium text-ink">Recent searches</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {DEMOS.map((item, i) => (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => setDemo({ index: i, typed: 0 })}
                  aria-pressed={i === demo.index}
                  className={[
                    "rounded-full border px-2.5 py-1 text-[11.5px] transition-colors duration-200",
                    i === demo.index
                      ? "border-hairline-strong bg-ink text-white"
                      : "border-hairline bg-white text-ink-soft hover:border-hairline-strong hover:text-ink",
                  ].join(" ")}
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>

          <ResultCards active={demo.index} onSelect={(i) => setDemo({ index: i, typed: 0 })} />
        </div>

        <p aria-live="polite" className="sr-only">
          {d.verdict}. {d.count}.
        </p>
      </div>
    </div>
  );
}
