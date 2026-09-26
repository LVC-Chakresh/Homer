/* Miniature UI surfaces used inside the marketing cards. They are deliberately
   detailed: at card size, grey skeleton bars read as placeholders, while real
   labels, avatars and rows read as screenshots. Type is kept at 9–11px so the
   surfaces stay legible once the card is ~240px wide. */

const T = {
  line: "bg-ink/[0.13]",
  soft: "bg-ink/[0.07]",
  hair: "border-hairline",
};

const CARD = "rounded-[9px] bg-white shadow-[0_1px_3px_rgba(13,15,15,0.08)] ring-1 ring-hairline";
const LABEL = "font-mono text-[8.5px] tracking-[0.1em] text-ink-mute uppercase";
const VALUE = "font-mono text-[9.5px] text-ink";
const NUM = "font-mono text-[8.5px] text-ink-mute";

function Avatar({ tint, initial }: { tint: string; initial: string }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[8px] font-bold text-white"
      style={{ backgroundColor: tint }}
    >
      {initial}
    </span>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2 border-b ${T.hair} px-3 py-2 last:border-b-0`}>
      {children}
    </div>
  );
}

/* ---- showcase card 1: the query being typed ---------------------------- */

export function MiniQuery({ query }: { query: string }) {
  const shown = query.slice(0, 24);
  return (
    <div className="space-y-3 p-3">
      <div
        className={`flex items-center gap-2 rounded-full border ${T.hair} bg-white px-2.5 py-1.5`}
      >
        <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-[5px] bg-ink" />
        <span className="truncate text-[10px] text-ink">{shown}</span>
        <span
          aria-hidden="true"
          className="ml-auto h-3 w-3 shrink-0 rounded-full border-2 border-[#e4e4e7] border-t-ink"
        />
      </div>
      <div className="space-y-2">
        {[92, 84, 96, 71, 88, 64].map((w, i) => (
          <span
            key={i}
            className={`block h-[6px] rounded-full ${T.line}`}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        <span className="rounded-full bg-[#f4f4f5] px-2 py-1 font-mono text-[8.5px] text-ink-mute">
          reading the page
        </span>
        <span className={NUM}>258 sentences</span>
      </div>
    </div>
  );
}

/* ---- showcase card 2: answer + context painted ------------------------- */

export function MiniAnswer() {
  return (
    <div className="space-y-1.5 p-3">
      <p className="rounded-[4px] bg-ink/[0.08] px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        The seat of government has occupied the same river bend since 1790.
      </p>
      <p className="rounded-[4px] bg-accent px-1.5 py-1 text-[9.5px] leading-[1.5] font-medium text-white">
        The Executive Residence sits at 1600 Pennsylvania Avenue NW.
      </p>
      <p className="rounded-[4px] bg-accent/15 px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        The grounds cover 82 acres and include the Oval Office.
      </p>
      <p className="rounded-[4px] bg-ink/[0.08] px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        Metrorail links the quadrants through 27 stations.
      </p>
      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
        <span className="rounded-full bg-accent px-2 py-1 font-mono text-[8.5px] text-white">
          1 answer
        </span>
        <span className="rounded-full bg-accent/15 px-2 py-1 font-mono text-[8.5px] text-accent">
          1 context
        </span>
      </div>
    </div>
  );
}

/* ---- showcase card 3: nothing painted ---------------------------------- */

export function MiniNothing() {
  return (
    <div className="space-y-1.5 p-3">
      <p className="rounded-[4px] px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        The seat of government has occupied the same river bend since 1790.
      </p>
      <p className="rounded-[4px] px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        The Executive Residence sits at 1600 Pennsylvania Avenue NW.
      </p>
      <p className="rounded-[4px] px-1.5 py-1 text-[9.5px] leading-[1.5] text-ink-soft">
        Metrorail links the quadrants through 27 stations.
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-1.5">
        <span className={`rounded-full border ${T.hair} px-2 py-1 font-mono text-[8.5px] text-ink-mute`}>
          0 matches
        </span>
        <span className="text-[9px] text-ink-mute">page untouched</span>
      </div>
    </div>
  );
}

/* ---- control card: permission panel ------------------------------------ */

export function MiniPermissions() {
  return (
    <div className="w-full space-y-2">
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>manifest permissions</p>
        </div>
        <div className="p-2.5">
          {[
            { k: "storage", on: true },
            { k: "tabs", on: true },
            { k: "activeTab", on: true },
            { k: "history", on: false },
            { k: "downloads", on: false },
          ].map((p) => (
            <div key={p.k} className="flex items-center justify-between py-[5px]">
              <span className={`font-mono text-[10px] ${p.on ? "text-ink" : "text-ink-mute"}`}>
                {p.k}
              </span>
              <span
                className={`h-3 w-3 rounded-full ${p.on ? "bg-accent" : "bg-ink/15"}`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- control card: state budget ---------------------------------------- */

export function MiniBudget() {
  return (
    <div className="w-full space-y-2">
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>state budget</p>
          <p className={`mt-1 ${VALUE} whitespace-nowrap`}>61,204 / 100,000</p>
        </div>
        <div className="p-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
            <span className="block h-full w-[61%] rounded-full bg-accent" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className={NUM}>258 blocks</span>
            <span className={NUM}>1 pass</span>
            <span className={NUM}>$0.0026</span>
          </div>
        </div>
      </div>
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>per query</p>
        </div>
        <div className="space-y-1.5 p-3">
          {[
            { l: "Input tokens", v: "15,301", w: "100%" },
            { l: "Output tokens", v: "free", w: "0%" },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-2">
              <span className="w-[70px] shrink-0 text-[9.5px] text-ink-mute">{r.l}</span>
              <span className="h-1.5 flex-1 rounded-full bg-ink/10">
                <span
                  className={`block h-full rounded-full ${r.w === "0%" ? "bg-transparent" : "bg-accent/50"}`}
                  style={{ width: r.w }}
                />
              </span>
              <span className="w-[38px] shrink-0 text-right font-mono text-[9.5px] text-ink-soft">
                {r.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- control card: hit budget ------------------------------------------ */

export function MiniHits() {
  return (
    <div className="w-full space-y-2">
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>highlights painted</p>
        </div>
        <div className="space-y-2 p-3">
          {[
            { w: "100%", c: "bg-accent", t: "answer" },
            { w: "72%", c: "bg-accent/30", t: "context" },
            { w: "58%", c: "bg-accent/30", t: "context" },
            { w: "41%", c: "bg-accent/30", t: "context" },
            { w: "30%", c: "bg-accent/30", t: "context" },
            { w: "18%", c: "border border-dashed border-ink/15", t: "unused" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`h-2.5 rounded-[4px] ${s.c}`} style={{ width: s.w }} />
              <span className={NUM}>{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- control card: the proxy key --------------------------------------- */

export function MiniKey() {
  return (
    <div className="w-full space-y-2">
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>TYPESAFE_API_KEY</p>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-[6px] bg-[#f4f4f5] px-2.5 py-2">
            <span className="font-mono text-[10px] tracking-[0.14em] text-ink-mute">
              ••••••••••••••••
            </span>
            <span aria-hidden="true" className="ml-auto text-ink-mute">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="7" width="10" height="6.5" rx="1.4" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-[9.5px] leading-snug text-ink-mute">
              held in your proxy,
              <br />
              not the extension
            </span>
          </div>
        </div>
      </div>
      <div className={CARD}>
        <div className="border-b border-hairline px-3 py-2">
          <p className={LABEL}>request</p>
        </div>
        <div className="space-y-1.5 p-3">
          {[
            { l: "from the browser", v: "sentences only", c: "text-ink" },
            { l: "through", v: "service worker", c: "text-ink-soft" },
            { l: "to the model", v: "your key", c: "text-ink-soft" },
          ].map((r) => (
            <div key={r.l} className="flex items-center justify-between gap-2">
              <span className="text-[9.5px] text-ink-mute">{r.l}</span>
              <span className={`text-[9.5px] ${r.c}`}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- the "prompt chip + overlapping panels" section --------------------- */

export function LayeredPanels() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] pb-6">
      {/* back panel */}
      <div
        className={`absolute top-10 left-0 w-[58%] overflow-hidden ${CARD} opacity-95`}
      >
        <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <span className="ml-1 text-[10px] font-medium text-ink">History</span>
        </div>
        <div className="space-y-2 p-2.5">
          {["Opening the policy page", "Reading the refund table", "Back to the pricing page"].map(
            (t, i) => (
              <div key={t} className="flex items-center gap-2">
                <Avatar tint={["#7B1FA2", "#2563eb", "#0d9488"][i]} initial="A" />
                <span className="truncate text-[9.5px] text-ink-soft">{t}</span>
                <span className={`ml-auto ${NUM}`}>{i + 1}h</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* front panel, overlapping */}
      <div
        className={`relative ml-auto w-[80%] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_-12px_rgba(13,15,15,0.28)] ring-1 ring-hairline`}
      >
        <div className="border-b border-hairline px-4 py-3">
          <p className="text-[10.5px] leading-[1.45] text-ink">
            The answer is on the page, in different words. Homer sent the sentences and your
            question together, and the ranking came back with one clear winner.
          </p>
        </div>
        <div className="space-y-2 p-3">
          {[
            { t: "Split 258 sentences into 2 windows", m: "0.02s" },
            { t: "Asked which block answers, and whether any does", m: "0.61s" },
            { t: "Painted 1 answer and 1 context span", m: "0.01s" },
          ].map((s, i) => (
            <div key={s.t} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-accent/12 text-[8px] font-bold text-accent"
              >
                {i + 1}
              </span>
              <span className="truncate text-[10px] text-ink-soft">{s.t}</span>
              <span className={`ml-auto shrink-0 ${NUM}`}>{s.m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-hairline px-3 py-2">
          <span className="rounded-full bg-accent px-2 py-1 font-mono text-[8.5px] text-white">
            answered
          </span>
          <span className={NUM}>0.87</span>
        </div>
      </div>

      {/* tooltip */}
      <div className="absolute top-0 left-[4%] z-10 w-[54%] rounded-[8px] bg-ink px-3 py-2.5 text-white shadow-[0_8px_20px_-8px_rgba(13,15,15,0.5)]">
        <p className="text-[9.5px] leading-[1.4]">
          You typed <span className="font-medium">refund policy</span>. The page says
          &ldquo;returns&rdquo; and &ldquo;chargeback&rdquo;.
        </p>
      </div>
    </div>
  );
}

/* ---- generic list rows used by the shortcut section --------------------- */

export function MiniQueryList() {
  return (
    <div className={`overflow-hidden ${CARD}`}>
      <Row>
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
        <span className="truncate text-[10px] text-ink">where does the president live?</span>
        <span className="ml-auto font-mono text-[8.5px] text-accent">answered</span>
      </Row>
      <Row>
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f59e0b]" />
        <span className="truncate text-[10px] text-ink">how many metro stations?</span>
        <span className="ml-auto font-mono text-[8.5px] text-[#b45309]">partial</span>
      </Row>
      <Row>
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink/20" />
        <span className="truncate text-[10px] text-ink">what is the refund policy?</span>
        <span className="ml-auto font-mono text-[8.5px] text-ink-mute">absent</span>
      </Row>
    </div>
  );
}
