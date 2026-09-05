import { type ErrorArgs, serve } from "dashi";
import { error, fatal } from "./errors.tsx";
import { createSite } from "./main.ts";
import type { AppState } from "./state.ts";

function throwError(): never {
  throw new Error("handler-boom");
}

function throwFatal(): never {
  throw new Error("fatal-probe");
}

const server = await serve((cb) => {
  const table = createSite(cb);
  return {
    ...table,
    error: (args: ErrorArgs<AppState>) => {
      if (
        args.thrown instanceof Error && args.thrown.message === "fatal-probe"
      ) {
        throw args.thrown;
      }
      return error(args);
    },
    routes: [
      ...table.routes,
      cb.route("/__probe/error", { GET: throwError }),
      cb.route("/__probe/fatal", { GET: throwFatal }),
    ],
  };
}, {
  fatal,
  hostname: "127.0.0.1",
  port: 0,
  onListen() {},
});

const origin = `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`;

async function get(path: string) {
  const response = await fetch(`${origin}${path}`);
  const body = await response.text();
  return { response, body };
}

Deno.test({
  name: "GET /health returns 204 without chrome",
  async fn() {
    const { response, body } = await get("/health");
    if (response.status !== 204) {
      throw new Error(`expected 204, got ${response.status}`);
    }
    if (body !== "") {
      throw new Error("health response was not empty");
    }
    if (body.includes("go home") || body.includes("Dashi")) {
      throw new Error("health response included site chrome");
    }
    if (response.headers.get("cache-control") !== "no-store") {
      throw new Error("health response was cacheable");
    }
  },
});

Deno.test({
  name: "a missing path returns the notFound page",
  async fn() {
    const { response, body } = await get("/no-such-page");
    if (response.status !== 404) {
      throw new Error(`expected 404, got ${response.status}`);
    }
    if (
      !body.includes(">404<") || !body.includes("That page isn&#39;t here.")
    ) {
      throw new Error("missing notFound copy");
    }
    if (!body.includes("go home") || !body.includes("get started")) {
      throw new Error("missing notFound chrome");
    }
    if (!body.includes("© 2026 Cooking Pot Co.")) {
      throw new Error("missing site footer");
    }
  },
});

Deno.test({
  name: "a thrown handler returns the error page",
  async fn() {
    const { response, body } = await get("/__probe/error");
    if (response.status !== 500) {
      throw new Error(`expected 500, got ${response.status}`);
    }
    if (!body.includes(">500<") || !body.includes("Something went wrong.")) {
      throw new Error("missing error copy");
    }
    if (body.includes("handler-boom")) {
      throw new Error("error page leaked the thrown message");
    }
    if (!body.includes("go home") || !body.includes("get started")) {
      throw new Error("missing error chrome");
    }
  },
});

Deno.test({
  name: "an error-handler crash returns the fatal page",
  async fn() {
    const { response, body } = await get("/__probe/fatal");
    if (response.status !== 500) {
      throw new Error(`expected 500, got ${response.status}`);
    }
    if (
      !body.includes(">500<") ||
      !body.includes("The site couldn&#39;t recover.")
    ) {
      throw new Error("missing fatal copy");
    }
    if (
      body.includes("get started") || body.includes("© 2026 Cooking Pot Co.")
    ) {
      throw new Error("fatal page included site chrome");
    }
    if (!body.includes("go home")) {
      throw new Error("missing fatal home link");
    }
  },
});
