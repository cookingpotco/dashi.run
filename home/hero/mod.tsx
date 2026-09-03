import { CommandSnippet } from "../../components/mod.ts";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-6 pb-8 md:pb-0">
      <p className="rotate-1 rounded-button border-2 border-black bg-yellow px-3 py-1 font-mono text-button uppercase shadow-regular">
        Pure code, zero magic
      </p>
      <h1 className="flex flex-col items-center text-center">
        <span className="hidden text-title md:block">
          Modern framework built on
        </span>
        <span className="text-title-compact md:hidden">Modern framework</span>
        <span className="relative hidden md:block">
          <span className="absolute bottom-2 left-0 h-3 w-full -rotate-1 bg-yellow" />
          <span className="relative text-title">old ideas.</span>
        </span>
        <span className="text-title-compact md:hidden">
          built on old ideas.
        </span>
      </h1>
      <p className="max-w-xl pb-2 text-center text-body-small text-body-text md:max-w-none md:text-body">
        Built for composable pages that drive precise updates through the
        server.
      </p>
      <CommandSnippet command="deno add jsr:@cookingpot/dashi" />
    </section>
  );
}
