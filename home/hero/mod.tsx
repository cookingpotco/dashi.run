import { CommandSnippet } from "../../components/mod.ts";

export const heroSubtitle = "Built for fast, simple server-driven apps.";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-6 pb-8 md:pb-0">
      <p className="rotate-1 rounded-button border-2 border-black bg-yellow px-3 py-1 font-mono text-button uppercase shadow-regular">
        Pure code, zero magic
      </p>
      <h1 className="text-center text-title-compact md:text-title">
        <span className="block md:inline">Modern framework</span>
        <span className="relative mx-auto block w-fit md:mx-0 md:inline-block md:w-auto">
          <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow md:hidden" />
          <span className="relative z-10 whitespace-nowrap md:whitespace-normal">
            built on <br className="hidden md:block" />
            <span className="relative inline md:inline-block">
              <span className="absolute bottom-2 left-0 -z-10 hidden h-3 w-full -rotate-1 bg-yellow md:block" />
              <span className="relative z-10">old ideas.</span>
            </span>
          </span>
        </span>
      </h1>
      <p className="max-w-xl pb-2 text-center text-body-small text-body-text md:max-w-none md:text-body">
        {heroSubtitle}
      </p>
      <CommandSnippet
        id="install-command"
        command="deno create jsr:@cookingpot/dashi"
      />
    </section>
  );
}
