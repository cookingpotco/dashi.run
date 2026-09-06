import { serve } from "dashi";
import { createSite } from "../main.ts";

const server = await serve(createSite, {
  hostname: "127.0.0.1",
  port: 0,
  onListen() {},
});

const origin = `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`;

Deno.test({
  name: "the stylesheet hides the navigation-root focus ring",
  async fn() {
    const page = await fetch(`${origin}/`);
    const html = await page.text();
    if (!html.includes("<navigation-root")) {
      throw new Error("home is missing the soft-nav host");
    }
    const href = html.match(/href="(\/generated\/styles-[^"]+\.css)"/)?.[1];
    if (href === undefined) {
      throw new Error("missing hashed stylesheet");
    }
    const css = await (await fetch(`${origin}${href}`)).text();
    if (!/navigation-root[\s,{][^}]*outline:\s*none/.test(css)) {
      throw new Error("navigation-root is missing outline: none");
    }
  },
});
