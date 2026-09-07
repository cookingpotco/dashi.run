import { serve } from "dashi";
import { createSite } from "../main.ts";

const server = await serve(createSite, {
  hostname: "127.0.0.1",
  port: 0,
  onListen() {},
});

const origin = `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`;

Deno.test({
  name: "POST /todos on a done seed row unchecks it and counts 2/2",
  async fn() {
    const primed = await fetch(`${origin}/todos`);
    await primed.body?.cancel();
    const response = await fetch(`${origin}/todos`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ check: "2" }),
    });
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes('target="#todo-2"')) {
      throw new Error("missing todo-2 patch");
    }
    if (
      body.includes('line-through decoration-2">No client side JS written<')
    ) {
      throw new Error("todo-2 is still checked");
    }
    if (!body.includes(">No client side JS written<")) {
      throw new Error("missing todo-2 title");
    }
    if (!body.includes('target="#count">2/2<')) {
      throw new Error("count is not 2/2");
    }
  },
});
