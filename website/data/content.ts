export const site = {
  name: "Homer",
  heroPill: "Semantic find, built in",
  promise: "The answer is on the page. The keywords aren't.",
  support:
    "Homer searches web pages by meaning. Ask in plain English and it marks the one passage on screen that answers you.",
  primaryAction: "Add to Chrome",
  skipLink: "Skip to content",
} as const;

export const nav = {
  links: [
    { href: "#why", label: "Why" },
    { href: "#ranking", label: "Ranking" },
    { href: "#shortcuts", label: "Shortcuts" },
    { href: "#privacy", label: "Privacy" },
    { href: "#install", label: "Install" },
  ],
  cta: { href: "#install", label: "Add to Chrome" },
} as const;

export const intro = {
  label: "Introducing Homer 1",
  // aside.com sets the opening sentence dark and lets the rest run gray.
  lead: "Browser find is a string matcher.",
  body: "The page rarely uses your words. A privacy policy says “Executive Residence”, a manual says “no-go zones”, a spec says “1600 Pennsylvania Avenue”. You know the answer is there. Ctrl+F cannot see it.",
  secondLead: "Homer reads the page as sentences instead.",
  secondBody:
    "It sends those sentences with your question and takes back a ranking. One passage is marked as the answer, a few more are kept as context, and when the page does not contain the answer it says so and leaves the text alone.",
} as const;

export const capability = {
  label: "Unlimited meaning",
  headline: "Any idea on the page, Homer can find.",
  support:
    "Homer does not need your query to appear in the page. It needs the page to mean what you asked, and it reads every block a page is built from, not just the paragraphs.",
  items: [
    { label: "Headings", glyph: "H", tint: "#2563eb" },
    { label: "Paragraphs", glyph: "P", tint: "#0d9488" },
    { label: "List items", glyph: "L", tint: "#7c3aed" },
    { label: "Table cells", glyph: "T", tint: "#ea580c" },
    { label: "Captions", glyph: "C", tint: "#0891b2" },
    { label: "Quotes", glyph: "Q", tint: "#c026d3" },
    { label: "Preformatted", glyph: "‹›", tint: "#475569" },
    { label: "Details", glyph: "D", tint: "#65a30d" },
    { label: "Code", glyph: "{}", tint: "#dc2626" },
    { label: "Nav labels", glyph: "N", tint: "#4f46e5" },
    { label: "Footnotes", glyph: "F", tint: "#b45309" },
    { label: "Summaries", glyph: "S", tint: "#0f766e" },
  ],
} as const;

export const showcase = {
  support:
    "The bar sits in the corner, the page stays readable, and the highlights are paint rather than edits to the document.",
  cards: [
    {
      title: "Question in",
      body: "Type the way you would ask a person. Questions and bare topics both work, so Homer never asks you to classify what you typed.",
      prompt: "where does the president live?",
      tone: "rose" as const,
    },
    {
      title: "Passage out",
      body: "The strongest match is marked as the answer and scrolled to. Related sentences stay available as context so you can check the reasoning.",
      prompt: "the Executive Residence at 1600 Pennsylvania Avenue",
      tone: "sky" as const,
    },
    {
      title: "Nothing painted",
      body: "A weak match is never promoted. When the page does not address your question the count reads zero and no text is highlighted at all.",
      prompt: "no answer on this page",
      tone: "mint" as const,
    },
  ],
} as const;

export const ranking = {
  headline: "The ranking that admits when it is wrong.",
  support:
    "A ranking model always produces a winner, even for a page that contains nothing relevant. Homer asks a second, separate question per window of the page and refuses to paint anything when the answer is no.",
  link: "See how the windows work",
  rows: [
    {
      label: "Homer",
      value: 0.87,
      note: "Answered. One sentence marked, the rest left as context.",
      live: true,
    },
    {
      label: "Keyword overlap",
      value: 0.19,
      note: "Pages that paraphrase the question score near zero on overlap alone.",
      live: false,
    },
    {
      label: "First match wins",
      value: 0.34,
      note: "Takes the earliest text hit whether or not it means what you asked.",
      live: false,
    },
  ],
} as const;

export const keys = {
  headline: "Knows what you were looking for.",
  support:
    "Homer takes over the find bar you are already used to and stays out of the way everywhere else. Keystrokes inside inputs, textareas, and editors are never intercepted.",
  link: "All the shortcuts",
  prompt: "refund policy for digital purchases",
  rows: [
    { keys: ["Ctrl", "F"], alt: ["⌘", "F"], action: "Open Homer" },
    { keys: ["Ctrl", "⇧", "F"], alt: ["⌘", "⇧", "F"], action: "Open when takeover is off" },
    { keys: ["Enter"], alt: [], action: "Next match" },
    { keys: ["⇧", "Enter"], alt: [], action: "Previous match" },
    { keys: ["F3"], alt: [], action: "Next, browser find suppressed" },
    { keys: ["Esc"], alt: [], action: "Close and clear highlights" },
  ],
  note: "Native find is left alone on Google Docs, Notion, vscode.dev, and github.dev. Both that list and a never-send list are editable from the popup.",
} as const;

export const privacy = {
  label: "What crosses the boundary",
  headlineLead: "Sentences that",
  redactedWord: "leave",
  support:
    "Search needs the page. It does not need the page's markup, your history, or your account. Here is the whole list of what Homer asks for.",
  cards: [
    {
      title: "Three permissions",
      body: "storage, tabs, activeTab. No browsing history, no downloads, no clipboard.",
      meta: "manifest.json",
    },
    {
      title: "Structured text only",
      body: "Sentences go out with ids and word counts. Raw DOM and markup never cross the wire.",
      meta: "POST /v1/search",
    },
    {
      title: "The key stays put",
      body: "The ranking key lives in the proxy process, never in the extension bundle.",
      meta: "server/src",
    },
  ],
  rows: [
    {
      title: "A never-send list",
      body: "Add hostnames in the popup and their page text is never transmitted. Matching is by substring, so one entry covers subdomains.",
    },
    {
      title: "Paint, don't rewrite",
      body: "Highlights use the browser's own highlight API. No text nodes are split and cleanup is a single delete call.",
    },
    {
      title: "Shadow DOM isolation",
      body: "The find bar lives in a closed shadow root, so the host page's stylesheet cannot restyle it.",
    },
    {
      title: "A number you can read",
      body: "Input tokens are billed at $0.042 per million and output is free. The popup shows the running total.",
    },
  ],
  notClaimed: {
    title: "What Homer does not do",
    items: [
      "It is not published to the Chrome Web Store. You load the build unpacked.",
      "It has no mobile version and no verified matrix beyond Chromium 120 and up.",
      "It does not block ads, and it does not read pages you have excluded.",
      "There is no hosted demo. The proxy is yours to run and yours to pay for.",
    ],
  },
} as const;

export const proxy = {
  kicker: "The proxy",
  headline: "The key never enters the browser.",
  body: "A key shipped inside an extension is a key you cannot take back. Homer ships none. The extension talks to a small proxy you run, and the proxy is the only thing holding the credential.",
  cta: "How the proxy works",
  rows: [
    {
      title: "Held in your process",
      body: "The ranking key is read from your environment at startup and never leaves the machine it runs on.",
    },
    {
      title: "Bound to loopback",
      body: "The server refuses to expose itself on a routable interface unless you deliberately set HOST.",
    },
  ],
  path: [
    { step: "01", name: "Extension", detail: "Splits the page into sentences inside the tab" },
    { step: "02", name: "Service worker", detail: "Forwards the request and holds no state" },
    { step: "03", name: "Your proxy", detail: "Holds the ranking key, adds the cache" },
    { step: "04", name: "Model", detail: "Answers which sentence, and whether any does" },
  ],
  note: "Repeated queries are served from a local cache, which costs no upstream request and no money.",
} as const;

export const control = {
  label: "Privacy and control",
  headline: "Bounded enough to read the real page.",
  support:
    "Homer runs on your machine, holds the page to a hard budget, and refuses to mark anything it is not confident about.",
  cards: [
    {
      title: "Local by default",
      body: "Extension, proxy, and cache all run on your machine. Nothing is shared with a model provider you did not choose.",
    },
    {
      title: "Bounded by budget",
      body: "The page is capped at 100k characters and 2,000 blocks. Longer articles are trimmed and the count says so.",
    },
    {
      title: "Six hits, hard stop",
      body: "One answer plus at most five context highlights. A weak match is never promoted to fill the budget.",
    },
    {
      title: "Bring your own key",
      body: "Nothing works without a key you supply. There is no shared pool and no anonymous tier.",
    },
  ],
} as const;

export const install = {
  kicker: "Install",
  headline: "Three steps, no build tools.",
  steps: [
    {
      title: "Load the build",
      body: "Open chrome://extensions, turn on Developer mode, and select the extension/dist folder. No Node, no bundler.",
    },
    {
      title: "Run your proxy",
      body: "Start the server with your ranking key. It binds to localhost and keeps the credential in its own process.",
    },
    {
      title: "Press Ctrl+F",
      body: "Homer takes the find bar from there. Ask the page something in your own words.",
    },
  ],
} as const;

export const closer = {
  headline: "Ask in your own words. Start today.",
  cta: "Add to Chrome",
  meta: "Free and open source. Bring your own ranking key.",
} as const;

export const footer = {
  blurb:
    "Homer finds text on web pages by meaning rather than exact string matches. A Chromium extension and a small proxy.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#why" },
        { label: "Ranking", href: "#ranking" },
        { label: "Shortcuts", href: "#shortcuts" },
        { label: "Privacy", href: "#privacy" },
      ],
    },
    {
      title: "Install",
      links: [
        { label: "Add to Chrome", href: "#install" },
        { label: "Run the proxy", href: "#install" },
        { label: "Point at your own", href: "#install" },
      ],
    },
    {
      title: "Under the hood",
      links: [
        { label: "Windows and verdicts", href: "#ranking" },
        { label: "What crosses the wire", href: "#privacy" },
        { label: "The request path", href: "#proxy" },
      ],
    },
    {
      title: "Limits",
      links: [
        { label: "No store listing", href: "#privacy" },
        { label: "No mobile", href: "#privacy" },
        { label: "No ad blocking", href: "#privacy" },
      ],
    },
  ],
  legal: "Chromium 120 and up. Runs on the ranking key you supply.",
} as const;
