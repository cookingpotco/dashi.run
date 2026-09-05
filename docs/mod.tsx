import type { ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import { Button } from "../components/mod.ts";

export function getDocs({ html }: ReadArgs) {
  return html(
    <main className="mx-auto flex w-full max-w-main flex-col items-center gap-6 px-4 py-8 lg:px-6 lg:pb-16">
      <p className="rotate-1 rounded-button border-2 border-black bg-yellow px-3 py-1 font-mono text-button uppercase shadow-regular">
        Coming soon
      </p>
      <p className="text-center text-body-small text-body-text lg:text-body">
        For now, check out the{" "}
        <a
          href="https://github.com/cookingpotco/dashi"
          className="font-bold no-underline hover:underline"
        >
          README on GitHub
        </a>
        .
      </p>
      <a href="/" className="no-underline">
        <Button>go home</Button>
      </a>
    </main>,
    { cache: pageCache },
  );
}
