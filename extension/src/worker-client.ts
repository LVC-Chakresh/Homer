/**
 * Content-script ↔ service-worker contract.
 *
 * The content script never calls the proxy itself. A page's own Content-Security-Policy can
 * forbid `fetch` to localhost from the page context, while the service worker sends from
 * the extension origin with `host_permissions` to match. So every model call goes through
 * the worker, and the worker is deliberately just a forwarder: it holds no judgement
 * state of its own, only the proxy URL it reads from settings.
 */

import type {
  HealthResponse,
  JudgeAdsRequest,
  JudgeAdsResponse,
  SearchRequest,
  SearchResponse,
} from "../shared/wire.ts";

export type WorkerRequest =
  | { readonly type: "jev:judge-ads"; readonly request: JudgeAdsRequest }
  | { readonly type: "jev:search"; readonly request: SearchRequest };

export type WorkerEnvelope =
  | { readonly ok: true; readonly payload: JudgeAdsResponse | SearchResponse | HealthResponse }
  | { readonly ok: false; readonly message: string };

function isEnvelope(value: unknown): value is WorkerEnvelope {
  return typeof value === "object" && value !== null && "ok" in value;
}

const WORKER_WAKE_RETRIES = 2;
const WORKER_WAKE_BACKOFF_MS = 120;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** True only for the "worker is asleep and did not answer" transport race. */
function isWorkerAsleep(message: string): boolean {
  return (
    message.includes("Could not establish connection") ||
    message.includes("Receiving end does not exist") ||
    message.includes("message port closed")
  );
}

/** A judgement request of exactly one kind, so the value and its type stay together. */
export type JudgeAdsMessage = Extract<WorkerRequest, { type: "jev:judge-ads" }>;
export type SearchMessage = Extract<WorkerRequest, { type: "jev:search" }>;

async function sendWorkerMessage(message: WorkerRequest): Promise<unknown> {
  if (typeof chrome !== "undefined" && !chrome.runtime?.id) {
    throw new Error("Extension reloaded. Please refresh this page (Ctrl+R).");
  }

  // Manifest V3 terminates an idle service worker after ~30s. A message sent while it is
  // waking is rejected with "Could not establish connection. Receiving end does not exist."
  // even though the worker is healthy and about to register its listener. That is a
  // transport race, not a failure, so it is worth a bounded retry. Everything else — an
  // invalidated context, a proxy error — is terminal and must surface immediately.
  const lastError: unknown[] = [];
  for (let attempt = 0; attempt <= WORKER_WAKE_RETRIES; attempt += 1) {
    if (attempt > 0) await delay(WORKER_WAKE_BACKOFF_MS * attempt);
    try {
      return await chrome.runtime.sendMessage(message);
    } catch (cause) {
      const msg = cause instanceof Error ? cause.message : String(cause);
      if (
        msg.includes("Extension context invalidated") ||
        (typeof chrome !== "undefined" && !chrome.runtime?.id)
      ) {
        throw new Error("Extension reloaded. Please refresh this page (Ctrl+R).");
      }
      if (!isWorkerAsleep(msg)) throw cause;
      lastError.push(cause);
    }
  }
  throw new Error(
    "the extension background did not wake up. Reload it in chrome://extensions, then refresh this page.",
    { cause: lastError[lastError.length - 1] },
  );
}

/** The ads judgement call, unwrapped. */
export async function judgeAdsViaWorker(message: JudgeAdsMessage): Promise<JudgeAdsResponse> {
  const raw = await sendWorkerMessage(message);
  if (!isEnvelope(raw)) {
    throw new Error("the companion did not answer; it may have been restarted mid-request");
  }
  if (!raw.ok) throw new Error(raw.message);
  if (!("verdicts" in raw.payload)) {
    throw new Error("the companion answered with the wrong payload shape");
  }
  return raw.payload;
}

/** The semantic search call, unwrapped. */
export async function searchViaWorker(message: SearchMessage): Promise<SearchResponse> {
  const raw = await sendWorkerMessage(message);
  if (!isEnvelope(raw)) {
    throw new Error("the companion did not answer; it may have been restarted mid-request");
  }
  if (!raw.ok) throw new Error(raw.message);
  if (!("hits" in raw.payload)) {
    throw new Error("the companion answered with the wrong payload shape");
  }
  return raw.payload;
}
