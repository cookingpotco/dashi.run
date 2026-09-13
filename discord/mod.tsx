import { client, type ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import type { AppState } from "../state.ts";

const DiscordCountdown = client.element(
  "discord-countdown",
  new URL("./countdown_client.ts", import.meta.url),
);

const discordInvite = "https://discord.gg/9CRz82PrQq";

const countdownMarkNoise =
  "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='4'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'%20opacity='0.45'/%3E%3C/svg%3E\")";

function DiscordJoin() {
  return (
    <main className="mx-auto flex w-full max-w-main flex-1 flex-col items-center px-4 pt-16 pb-8 lg:px-6 lg:pb-16">
      <h1 className="mb-6 text-center text-title-compact">
        Join the community
      </h1>
      <DiscordCountdown className="flex w-full flex-1 flex-col items-center">
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
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-40 text-center">
            <span className="relative inline-block text-countdown font-mono leading-none">
              <span
                className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <span
                  className="block h-[3.875rem] w-[7.25rem] -rotate-[5deg] bg-blue/75 blur-[5px] [background-blend-mode:overlay]"
                  style={`background-image: ${countdownMarkNoise}`}
                />
              </span>
              <span data-count className="relative z-10 block">
                3
              </span>
            </span>
          </div>
        </div>
      </DiscordCountdown>
    </main>
  );
}

export function getDiscord(
  { ctx, html }: ReadArgs<{ state: AppState }>,
) {
  ctx.state.seo = {
    title: "Join the community - dashi",
    description: "Taking you to Discord.",
    index: false,
  };
  return html(<DiscordJoin />, { cache: pageCache });
}
