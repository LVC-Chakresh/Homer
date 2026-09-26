import { ArrowRight, Download, Lock, ShieldCheck } from "lucide-react";

import { FindDemo } from "@/components/find-demo";
import { CapabilityWall, RankChart } from "@/components/panels";
import { RedactedWord } from "@/components/redacted-word";
import { Enter, Reveal, RevealGroup } from "@/components/reveal";
import { Chevron, HMark, ProductFrame, Section, SectionLabel, SiteHeader } from "@/components/site-header";
import {
  LayeredPanels,
  MiniAnswer,
  MiniBudget,
  MiniHits,
  MiniKey,
  MiniNothing,
  MiniPermissions,
  MiniQuery,
} from "@/components/ui-mini";
import {
  capability,
  closer,
  control,
  footer,
  intro,
  install,
  keys,
  privacy,
  proxy,
  ranking,
  showcase,
  site,
} from "@/data/content";

const WASHES = {
  rose: "linear-gradient(180deg,#f9cede 0%,#fbe4ef 42%,#fdf3f7 100%)",
  sky: "linear-gradient(180deg,#c6e6f8 0%,#dceffb 46%,#f2f9fe 100%)",
  mint: "linear-gradient(180deg,#cdeadb 0%,#ddf3e8 46%,#f1fbf5 100%)",
} as const;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {site.skipLink}
      </a>

      {/* Hero: a tall sky panel inset from the page, with the product frame
          breaking out of its lower third. Geometry mirrors aside.com: panel
          16px inset, frame pulled up so 64px of clear sky sits between the
          CTA and the frame. */}
      <div id="top" className="px-4 pt-4">
        <div className="sky relative h-[620px] overflow-hidden rounded-3xl sm:h-[760px] lg:h-[880px] xl:h-[973px]">
          <div className="relative z-20">
            <SiteHeader />
          </div>

          <div className="px-6 pt-[65px] text-center sm:px-10">
            <Enter as="p">
              <a href="#why" className="hero-pill">
                {site.heroPill}
                <Chevron />
              </a>
            </Enter>
            <Enter as="h1" delay={0.06} className="h1 mx-auto mt-4 max-w-[18ch] text-balance">
              {site.promise}
            </Enter>
            <Enter delay={0.18} className="mt-8">
              <a href="#install" className="pill pill-primary pill-lg pill-over-sky">
                <Download size={15} aria-hidden="true" />
                {site.primaryAction}
              </a>
            </Enter>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-[280px] w-full max-w-[1128px] sm:-mt-[380px] lg:-mt-[480px] xl:-mt-[572px]">
          <ProductFrame>
            <FindDemo />
          </ProductFrame>
        </div>
        <div className="h-24 sm:h-28" aria-hidden="true" />
      </div>

      <main id="main">
        {/* Introducing */}
        <Section id="why">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-20">
            <Reveal as="div">
              <SectionLabel>{intro.label}</SectionLabel>
            </Reveal>
            <RevealGroup className="max-w-[62ch] space-y-8">
              <Reveal as="p" className="text-[20px] leading-[1.45] text-pretty">
                <span className="font-medium text-ink">{intro.lead}</span>{" "}
                <span className="text-ink-soft">{intro.body}</span>
              </Reveal>
              <Reveal as="p" className="text-[20px] leading-[1.45] text-pretty">
                <span className="font-medium text-ink">{intro.secondLead}</span>{" "}
                <span className="text-ink-soft">{intro.secondBody}</span>
              </Reveal>
            </RevealGroup>
          </div>
        </Section>

        {/* Capability wall */}
        <Section id="product">
          <div className="text-center">
            <Reveal as="div" className="flex justify-center">
              <SectionLabel>{capability.label}</SectionLabel>
            </Reveal>
            <Reveal as="h2" className="h2 mx-auto mt-5 max-w-[20ch] text-balance">
              {capability.headline}
            </Reveal>
          </div>
          <Reveal as="p" className="prose-soft mt-6 max-w-[58ch] text-pretty lg:ml-[16%]">
            {capability.support}
          </Reveal>
          <Reveal className="mt-12">
            <CapabilityWall items={capability.items} />
          </Reveal>

          <Reveal as="p" className="prose-soft mt-12 max-w-[58ch] text-pretty lg:ml-[16%]">
            {showcase.support}
          </Reveal>

          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
            {showcase.cards.map((card) => (
              <Reveal key={card.title}>
                <article className="group">
                  <div className="relative">
                    <div
                      className="h-[104px] rounded-t-[12px] transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ backgroundImage: WASHES[card.tone] }}
                    />
                    {/* The prompt pill straddles the gradient and the screenshot below it. */}
                    <p className="absolute bottom-0 left-4 z-10 inline-block max-w-[88%] -translate-y-1/2 rounded-[9px] bg-white px-3 py-2 text-[13px] leading-snug font-medium text-ink shadow-[0_2px_10px_-2px_rgba(13,15,15,0.18)]">
                      {card.prompt}
                    </p>
                  </div>
                  <div className="h-[252px] overflow-hidden rounded-b-[12px] bg-[#f7f7f8] px-4 pt-8 pb-4">
                    <div className="overflow-hidden rounded-[9px] bg-white shadow-[0_1px_3px_rgba(13,15,15,0.07)] ring-1 ring-hairline">
                      {card.tone === "rose" ? (
                        <MiniQuery query={card.prompt} />
                      ) : card.tone === "sky" ? (
                        <MiniAnswer />
                      ) : (
                        <MiniNothing />
                      )}
                    </div>
                  </div>
                </article>
                <p className="mt-4 text-[15px] leading-[1.55] text-ink-soft text-pretty">
                  <span className="font-medium text-ink">{card.title}</span> {card.body}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>

        {/* Ranking chart */}
        <Section id="ranking">
          <div className="max-w-[62ch]">
            <Reveal as="h2" className="h2 text-balance">
              {ranking.headline}
            </Reveal>
            <Reveal as="p" className="prose-soft mt-5 text-pretty">
              {ranking.support}{" "}
              <a href="#control" className="text-accent underline decoration-accent/50 underline-offset-4">
                {ranking.link}
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <RankChart rows={ranking.rows} />
          </Reveal>
        </Section>

        {/* Shortcuts */}
        {/* Shortcuts */}
        <Section id="shortcuts">
          <div className="max-w-[62ch]">
            <Reveal as="h2" className="h2 text-balance">
              {keys.headline}
            </Reveal>
            <Reveal as="p" className="prose-soft mt-5 text-pretty">
              {keys.support}
            </Reveal>
            <Reveal as="p" className="prose-soft mt-5 text-[14px] text-pretty">
              {keys.note}
            </Reveal>
          </div>

          <div className="mt-14 grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <Reveal as="p" className="max-w-[30ch] rounded-[10px] bg-[#f4f4f5] px-4 py-3 text-[15px] leading-snug text-ink">
              {keys.prompt}
            </Reveal>
            <Reveal amount={0.2}>
              <LayeredPanels />
            </Reveal>
          </div>

          <RevealGroup as="ul" className="mt-16 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {keys.rows.map((row, i) => {
              const showAlt = row.alt.length > 0;
              return (
                <Reveal
                  as="li"
                  key={`${row.action}-${i}`}
                  className="flex items-center justify-between gap-4 border-t border-hairline pt-3.5"
                >
                  <span className="text-[14px] leading-snug text-ink-soft">{row.action}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {row.keys.map((k) => (
                      <kbd key={k} className="kbd">
                        {k}
                      </kbd>
                    ))}
                    {showAlt ? (
                      <>
                        <span className="mx-0.5 text-[10px] text-ink-mute">or</span>
                        {row.alt.map((k) => (
                          <kbd key={k} className="kbd">
                            {k}
                          </kbd>
                        ))}
                      </>
                    ) : null}
                  </span>
                </Reveal>
              );
            })}
          </RevealGroup>
        </Section>

        {/* Privacy */}
        <Section id="privacy">
          <div className="text-center">
            <Reveal as="div" className="flex justify-center">
              <SectionLabel>{privacy.label}</SectionLabel>
            </Reveal>
            <Reveal as="h2" className="h2 mx-auto mt-5 max-w-[24ch] text-balance">
              {privacy.headlineLead} <RedactedWord word={privacy.redactedWord} />.
            </Reveal>
            <Reveal as="p" className="prose-soft mx-auto mt-6 max-w-[58ch] text-pretty">
              {privacy.support}
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {privacy.cards.map((card) => (
              <Reveal key={card.title}>
                <article className="card flex h-full flex-col justify-between gap-10 bg-white p-6">
                  <div>
                    <h3 className="text-[16px] font-medium text-ink">{card.title}</h3>
                    <p className="prose-soft mt-2 text-[14.5px] text-pretty">{card.body}</p>
                  </div>
                  <p className="font-mono text-[11px] text-ink-mute">{card.meta}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {privacy.rows.map((row) => (
              <Reveal key={row.title} className="border-t border-hairline pt-5">
                <h3 className="text-[15px] font-medium text-ink">{row.title}</h3>
                <p className="prose-soft mt-2 max-w-[44ch] text-[14px] text-pretty">{row.body}</p>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 rounded-card border border-hairline bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={17} className="text-accent" aria-hidden="true" />
              <h3 className="text-[15px] font-medium text-ink">{privacy.notClaimed.title}</h3>
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {privacy.notClaimed.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[14px] leading-[1.55] text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-mute"
                  />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* Proxy: left copy, right dark panel bleeding to the container's right edge */}
        <Section id="proxy">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="max-w-[46ch] self-center">
              <Reveal as="p" className="text-[20px] leading-[1.3] font-medium text-ink">
                {proxy.kicker}
              </Reveal>
              <Reveal as="p" className="h2-muted mt-3 text-balance">
                {proxy.headline}
              </Reveal>
              <Reveal as="p" className="prose-soft mt-5 text-pretty">
                {proxy.body}
              </Reveal>
              <Reveal as="p" className="mt-6">
                <a
                  href="#install"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f4f5] px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececee]"
                >
                  {proxy.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </Reveal>
              <RevealGroup as="ul" className="mt-10 space-y-7">
                {proxy.rows.map((row) => (
                  <Reveal as="li" key={row.title}>
                    <h3 className="text-[15px] font-medium text-ink">{row.title}</h3>
                    <p className="prose-soft mt-1.5 text-[14px] text-pretty">{row.body}</p>
                  </Reveal>
                ))}
              </RevealGroup>
            </div>

            <Reveal amount={0.15} className="lg:-mr-24">
              <div className="vault relative h-full overflow-hidden rounded-[14px] p-7 sm:p-9">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Lock size={14} className="text-accent" aria-hidden="true" />
                  <span className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
                    request path
                  </span>
                </div>
                <ol className="mt-6 space-y-5">
                  {proxy.path.map((node, i) => (
                    <li key={node.step} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={
                            i === proxy.path.length - 1
                              ? "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] text-white"
                              : "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-[10px] text-white/70"
                          }
                        >
                          {node.step}
                        </span>
                        {i < proxy.path.length - 1 ? (
                          <span className="mt-1 w-px flex-1 bg-white/12" aria-hidden="true" />
                        ) : null}
                      </div>
                      <div className="pb-1">
                        <p className="text-[14px] font-medium text-white">{node.name}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-white/45">
                          {node.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 border-t border-white/10 pt-4 text-[12.5px] leading-snug text-white/40">
                  {proxy.note}
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Control */}
        <Section id="control">
          <div className="text-center">
            <Reveal as="div" className="flex justify-center">
              <SectionLabel>{control.label}</SectionLabel>
            </Reveal>
            <Reveal as="h2" className="h2 mx-auto mt-5 max-w-[20ch] text-balance">
              {control.headline}
            </Reveal>
            <Reveal as="p" className="prose-soft mx-auto mt-6 max-w-[58ch] text-pretty">
              {control.support}
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {control.cards.map((card) => (
              <Reveal key={card.title}>
                <article>
                  <div className="grid h-[288px] place-items-center overflow-hidden rounded-[12px] bg-[#f7f7f8] p-6">
                    <ControlGlyph title={card.title} />
                  </div>                  <p className="mt-4 text-[15px] leading-[1.55] text-ink-soft text-pretty">
                    <span className="font-medium text-ink">{card.title}</span> {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>

        {/* Install */}
        <Section id="install">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-20">
            <div className="max-w-[40ch] self-center">
              <Reveal as="p" className="text-[20px] leading-[1.3] font-medium text-ink">
                {install.kicker}
              </Reveal>
              <Reveal as="p" className="h2-muted mt-3 text-balance">
                {install.headline}
              </Reveal>
            </div>
            <RevealGroup as="ol" className="grid gap-8 sm:grid-cols-3">
              {install.steps.map((step, i) => (
                <Reveal as="li" key={step.title} className="border-t border-hairline pt-5">
                  <p className="font-mono text-[11px] text-ink-mute">0{i + 1}</p>
                  <h3 className="mt-3 text-[15px] font-medium text-ink">{step.title}</h3>
                  <p className="prose-soft mt-2 text-[14px] text-pretty">{step.body}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </Section>

        {/* Closer */}
        <div className="shell py-20 sm:py-28">
          <Reveal amount={0.15}>
            <div className="relative overflow-hidden rounded-[16px] bg-[radial-gradient(118%_92%_at_50%_112%,#1d4ed8_0%,#2563eb_13%,#3b82f6_29%,#5ea3f8_45%,#8cc2fb_61%,#bcd9fb_76%,#dceafd_89%,#f1f6fe_100%)] px-6 py-24 text-center sm:px-10 sm:py-32">
              <div className="dot-field pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <h2 className="h2 mx-auto max-w-[20ch] text-balance">{closer.headline}</h2>
                <a href="#top" className="pill pill-primary pill-lg mt-9">
                  <Download size={15} aria-hidden="true" />
                  {closer.cta}
                </a>
                <p className="mt-6 text-[13px] text-white/80">{closer.meta}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-b border-hairline">
        <div className="shell py-16 sm:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <HMark className="h-7 w-7 rounded-[8px] text-[13px]" />
                <span className="text-[19px] font-medium tracking-[-0.015em]">{site.name}</span>
              </div>
              <p className="prose-soft mt-4 max-w-[34ch] text-[14px] text-pretty">{footer.blurb}</p>
            </div>

            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[14px] font-medium text-ink">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-ink-mute">{footer.legal}</p>
            <p className="text-[13px] text-ink-mute">
              Built for Chromium 120+.{" "}
              <a href="#install" className="text-accent hover:underline">
                Install
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function ControlGlyph({ title }: { title: string }) {
  if (title.startsWith("Local")) return <MiniPermissions />;
  if (title.startsWith("Bounded")) return <MiniBudget />;
  if (title.startsWith("Six")) return <MiniHits />;
  return <MiniKey />;
}
