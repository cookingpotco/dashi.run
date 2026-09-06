import { serve } from "dashi";
import { createSite } from "../main.ts";

const kvDir = await Deno.makeTempDir();
const kvPath = `${kvDir}/kv`;
Deno.env.set("DASHI_KV_PATH", kvPath);

const server = await serve(createSite, {
  hostname: "127.0.0.1",
  port: 0,
  onListen() {},
});

const origin = `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`;

async function postJoin(email: string) {
  const response = await fetch(`${origin}/join`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email }),
  });
  const body = await response.text();
  return { response, body };
}

Deno.test({
  name: "a valid join email is stored in KV",
  async fn() {
    const email = "friend@example.com";
    const { body } = await postJoin(email);
    if (!body.includes("JOINED!")) {
      throw new Error("missing joined confirmation");
    }
    const kv = await Deno.openKv(kvPath);
    const stored = await kv.get(["emails", email]);
    kv.close();
    if (stored.value === null) {
      throw new Error("email was not written to KV");
    }
  },
});

Deno.test({
  name: "an invalid join email is not stored",
  async fn() {
    const email = "not-an-email";
    await postJoin(email);
    const kv = await Deno.openKv(kvPath);
    const stored = await kv.get(["emails", email]);
    kv.close();
    if (stored.value !== null) {
      throw new Error("invalid email was written to KV");
    }
  },
});

Deno.test({
  name: "GET /emails is a credentialed list of stored addresses",
  async fn() {
    Deno.env.delete("DASHI_EMAILS_USER");
    Deno.env.delete("DASHI_EMAILS_PASSWORD");
    const missing = await fetch(`${origin}/emails`);
    await missing.body?.cancel();
    if (missing.status !== 404) {
      throw new Error(
        `expected 404 without credentials, got ${missing.status}`,
      );
    }

    Deno.env.set("DASHI_EMAILS_USER", "inbox");
    Deno.env.set("DASHI_EMAILS_PASSWORD", "secret");
    const unauthorized = await fetch(`${origin}/emails`);
    await unauthorized.body?.cancel();
    if (unauthorized.status !== 401) {
      throw new Error(`expected 401, got ${unauthorized.status}`);
    }

    await postJoin("listed@example.com");
    const authorized = await fetch(`${origin}/emails`, {
      headers: {
        authorization: `Basic ${btoa("inbox:secret")}`,
      },
    });
    const body = await authorized.text();
    if (authorized.status !== 200) {
      throw new Error(`expected 200, got ${authorized.status}`);
    }
    if (!body.includes("listed@example.com")) {
      throw new Error("missing stored email");
    }
  },
});
