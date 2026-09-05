import { patch, type ReadArgs, type WriteArgs } from "dashi";
import { Button } from "../components/mod.ts";
import type { AppState } from "../state.ts";

function openEmailsKv() {
  return Deno.openKv(
    Deno.env.get("DASHI_KV_PATH") ?? `${import.meta.dirname}/.kv`,
  );
}

export function getJoin({ html }: ReadArgs<{ state: AppState }>) {
  return html(
    <form
      method="POST"
      action="/join"
      className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-center"
    >
      <p className="text-center text-body lg:text-left">
        If you made it this far, you must be interested.
      </p>
      <div className="flex w-full max-w-[22.375rem] items-center gap-4 rounded-card border-2 border-black bg-code-background p-4 shadow-extra has-[:user-invalid]:border-error lg:w-[22.375rem]">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent font-mono text-large-code-body outline-none placeholder:text-body-text user-invalid:text-error"
        />
        <span id="join">
          <Button type="submit">join</Button>
        </span>
      </div>
    </form>,
  );
}

export async function postSubmitJoinRequest(
  { ctx, patches }: WriteArgs<{ state: AppState }>,
) {
  const data = await ctx.req.formData();
  const email = data.get("email");
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return patches([
      patch.replace("#join", <Button type="submit">join</Button>),
    ]);
  }
  const kv = await openEmailsKv();
  try {
    await kv.set(["emails", email], { email, at: Date.now() });
  } finally {
    kv.close();
  }
  return patches([
    patch.replace("#join", <Button success type="submit">JOINED!</Button>),
  ]);
}

export async function getEmails({ ctx }: ReadArgs<{ state: AppState }>) {
  const user = Deno.env.get("DASHI_EMAILS_USER");
  const password = Deno.env.get("DASHI_EMAILS_PASSWORD");
  if (
    user === undefined || user === "" ||
    password === undefined || password === ""
  ) {
    return new Response(null, { status: 404 });
  }
  const header = ctx.req.headers.get("authorization");
  let permitted = false;
  if (header !== null && header.startsWith("Basic ")) {
    const decoded = atob(header.slice("Basic ".length));
    const colon = decoded.indexOf(":");
    if (
      colon !== -1 &&
      decoded.slice(0, colon) === user &&
      decoded.slice(colon + 1) === password
    ) {
      permitted = true;
    }
  }
  if (!permitted) {
    return new Response(null, {
      status: 401,
      headers: {
        "www-authenticate": 'Basic realm="emails"',
        "cache-control": "no-store",
      },
    });
  }
  const kv = await openEmailsKv();
  const lines: string[] = [];
  try {
    for await (const entry of kv.list({ prefix: ["emails"] })) {
      const value = entry.value;
      if (
        value === null ||
        typeof value !== "object" ||
        !("email" in value) ||
        typeof value.email !== "string"
      ) {
        continue;
      }
      if ("at" in value && typeof value.at === "number") {
        lines.push(`${value.email}\t${new Date(value.at).toISOString()}`);
      } else {
        lines.push(value.email);
      }
    }
  } finally {
    kv.close();
  }
  lines.sort();
  const body = lines.length === 0 ? "" : `${lines.join("\n")}\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}
