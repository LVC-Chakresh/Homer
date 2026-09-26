/**
 * Entrypoint.
 *
 * Bind address: this process holds an API key and accepts page text, so the local default is
 * loopback. A deployed container is the opposite case — a server bound to loopback is simply
 * unreachable, and the platform's port scan fails. So the default follows the environment and
 * `HOST` is an explicit override, rather than being inferred from whether some other variable
 * happened to be set.
 */

import { createJudge } from "./model.ts";
import { JevService } from "./service.ts";
import { createJevServer, VERSION } from "./http.ts";

const port = Number(process.env["PORT"] ?? 8787);
if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`[jev-proxy] PORT is not a valid port number: ${process.env["PORT"] ?? ""}`);
  process.exit(1);
}

// A container is detected by the platform's own marker, or by NODE_ENV=production, which the
// Dockerfile sets. Both mean "reachable", so both get 0.0.0.0. Local dev stays on loopback.
const inContainer =
  process.env["RENDER"] === "1" ||
  process.env["RENDER"] === "true" ||
  process.env["NODE_ENV"] === "production" ||
  process.env["DYNO"] !== undefined;

const host = process.env["HOST"]?.trim() || (inContainer ? "0.0.0.0" : "127.0.0.1");

const { judge, reason } = createJudge();
const service = new JevService({ judge, judgeReason: reason });
const server = createJevServer(service);

server.listen(port, host, () => {
  console.log(`[jev-proxy] v${VERSION} listening on http://${host}:${port}`);
  console.log(`[jev-proxy] judge: ${judge.mode} (${judge.model}) - ${reason}`);
  if (judge.mode === "stub") {
    console.log("[jev-proxy] running the offline stub: answers come from keyword overlap, not Jev");
  }
  console.log(`[jev-proxy] playground: http://${host}:${port}/`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
