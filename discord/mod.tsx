import { client, type ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import type { AppState } from "../state.ts";

const DiscordCountdown = client.element(
  "discord-countdown",
  new URL("./countdown_client.ts", import.meta.url),
);

const discordInvite = "https://discord.gg/9CRz82PrQq";

function DiscordJoin() {
  return (
    <DiscordCountdown className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-main flex-1 flex-col items-center px-4 pt-16 pb-8 lg:px-6 lg:pb-16">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center text-title-compact">Join the community</h1>
          <p
            data-during
            className="text-center text-body-small lg:text-body"
          >
            Taking you to Discord in...
          </p>
          <p
            data-fallback
            className="text-center text-body-small lg:text-body"
          >
            If nothing happened,{" "}
            <a
              href={discordInvite}
              className="font-bold no-underline hover:underline"
            >
              click here
            </a>
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-40 text-center">
            <div
              className="absolute top-[-0.25rem] left-1/2 h-[3.875rem] w-[7.25rem] -translate-x-1/2 bg-blue/75"
              aria-hidden
            />
            <span
              data-count
              className="relative z-10 text-countdown font-mono"
            >
              3
            </span>
          </div>
        </div>
      </main>
    </DiscordCountdown>
  );
}

export function getDiscord(
  { ctx, html }: ReadArgs<{ state: AppState }>,
) {
  ctx.state.seo = {
    title: "Join the community / Dashi",
    description: "Taking you to Discord.",
    index: false,
  };
  return html(<DiscordJoin />, { cache: pageCache });
}
