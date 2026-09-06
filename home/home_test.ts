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
