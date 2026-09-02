import { client } from "dashi";
import { Button } from "../button.tsx";

const COMMAND = "deno add jsr:@cookingpot/dashi";

const Host = client.element(
  "command-snippet",
  new URL("./command_snippet_client.ts", import.meta.url),
);

export function CommandSnippet() {
  return (
    <Host className="flex w-full max-w-[28rem] items-center justify-between rounded-card border-2 border-black bg-code-background p-4 shadow-extra">
      <code data-command className="cursor-text font-mono text-large-code-body">
        {COMMAND}
      </code>
      <Button type="button">copy</Button>
    </Host>
  );
}
