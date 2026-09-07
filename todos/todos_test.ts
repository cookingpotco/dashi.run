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
    if (body.includes('target="#todo-title"')) {
      throw new Error("check patched the title input");
    }
  },
});

Deno.test({
  name: "POST /todos with an empty title marks the placeholder error-red",
  async fn() {
    const primed = await fetch(`${origin}/todos`);
    await primed.body?.cancel();
    const response = await fetch(`${origin}/todos`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title: "" }),
    });
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes('target="#todo-title"')) {
      throw new Error("missing todo-title patch");
    }
    if (!body.includes("placeholder:text-error")) {
      throw new Error("empty add did not mark the placeholder error-red");
    }
    if (body.includes("todo-3")) {
      throw new Error("empty add appended a row");
    }
  },
});

Deno.test({
  name: "POST /todos with a title appends the row and clears the placeholder",
  async fn() {
    const primed = await fetch(`${origin}/todos`);
    await primed.body?.cancel();
    const response = await fetch(`${origin}/todos`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title: "Write a patch" }),
    });
    const body = await response.text();
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    if (!body.includes("Write a patch")) {
      throw new Error("missing new row title");
    }
    if (!body.includes('target="#todo-title"')) {
      throw new Error("missing todo-title patch");
    }
    if (body.includes("placeholder:text-error")) {
      throw new Error("successful add left the placeholder error-red");
    }
    if (!body.includes("placeholder:text-black")) {
      throw new Error("successful add did not restore the placeholder");
    }
    if (!body.includes('target="#count">2/3<')) {
      throw new Error("count is not 2/3");
    }
  },
});
