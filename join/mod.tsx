import { patch, type ReadArgs, type WriteArgs } from "dashi";
import { Button } from "../components/mod.ts";

const emails: string[] = [];

export function getJoin({ html }: ReadArgs) {
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

export async function postSubmitJoinRequest({ ctx, patches }: WriteArgs) {
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
  emails.push(email);
  return patches([
    patch.replace("#join", <Button success type="submit">JOINED!</Button>),
  ]);
}
