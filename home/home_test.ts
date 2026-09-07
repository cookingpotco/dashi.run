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
  name:
    "GET / Patches form shows four todo rows on mobile and hosts the list pane",
  async fn() {
    const response = await fetch(`${origin}/`);
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes("h-[14.125rem]")) {
      throw new Error("patches form is not tall enough for four rows");
    }
    if (body.includes("h-[10.125rem]")) {
      throw new Error("old two-row patches form height is still present");
    }
    if (!body.includes("lg:absolute lg:inset-0 lg:h-auto")) {
      throw new Error("desktop patches form fill classes are missing");
    }
    if (!body.includes("<patches-list")) {
      throw new Error("missing patches-list host for scroll-after-append");
    }
  },
});
