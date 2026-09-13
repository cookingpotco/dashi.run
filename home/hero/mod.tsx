import { CommandSnippet } from "../../components/mod.ts";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-6 pb-8 md:pb-0">
      <p className="rotate-1 rounded-button border-2 border-black bg-yellow px-3 py-1 font-mono text-button uppercase shadow-regular">
        Pure code, zero magic
      </p>
      <h1 className="text-center text-title-compact md:text-title">
        Modern framework <br className="lg:hidden" />
        <span className="relative inline max-md:block">
          <span className="absolute bottom-1.5 left-4 h-3 w-73.75 -rotate-1 bg-yellow lg:hidden md:w-full md:left-0 md:bottom-4" />
          <span className="relative">
            built on
            <br className="hidden lg:block" />{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-2 left-0 hidden h-3 w-full -rotate-1 bg-yellow lg:block" />
              <span className="relative">old ideas.</span>
            </span>
          </span>
        </span>
      </h1>
      <p className="max-w-xl pb-2 text-center text-body-small text-body-text md:max-w-none md:text-body">
        Built for fast, simple server-driven apps. <br className="md:hidden" />
        No runtime dependencies.
      </p>
      <CommandSnippet
        id="install-command"
        command="deno create jsr:@cookingpot/dashi"
      />
    </section>
  );
}
