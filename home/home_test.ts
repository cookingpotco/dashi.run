import { serve } from "dashi";
import { createSite } from "../main.ts";

const server = await serve(createSite, {
  hostname: "127.0.0.1",
  port: 0,
  onListen() {},
});

const origin = `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`;
const subtitle = "Built for fast, simple server-driven apps.";

Deno.test({
  name: "GET / uses the short hero subtitle for the page and meta description",
  async fn() {
    const response = await fetch(`${origin}/`);
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes(`>${subtitle}<`)) {
      throw new Error("missing hero subtitle");
    }
    if (
      !body.includes(`<meta name="description" content="${subtitle}">`) ||
      !body.includes(`<meta property="og:description" content="${subtitle}">`)
    ) {
      throw new Error("missing matching SEO description");
    }
    if (body.includes("composable pages")) {
      throw new Error("old subtitle is still present");
    }
  },
});

Deno.test({
  name: "GET / paints both seed todos unchecked and 2/2",
  async fn() {
    const response = await fetch(`${origin}/`);
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes('id="todo-2"')) {
      throw new Error("missing todo-2");
    }
    if (
      body.includes('line-through decoration-2">No client side JS written<')
    ) {
      throw new Error("todo-2 is still checked");
    }
    if (!body.includes(">No client side JS written<")) {
      throw new Error("missing todo-2 title");
    }
    if (!body.includes('id="count"') || !body.includes(">2/2<")) {
      throw new Error("count is not 2/2");
    }
    if (body.includes(">1/2<")) {
      throw new Error("old 1/2 count is still present");
    }
  },
});
