import type { ErrorArgs, FatalArgs, NotFoundArgs } from "dashi";
import { Button } from "./components/mod.ts";
import type { AppState } from "./state.ts";
import styles from "./styles.json" with { type: "json" };

function ErrorWell({ code, message }: { code: string; message: string }) {
  return (
    <main className="mx-auto flex w-full max-w-main flex-1 flex-col items-center justify-center gap-6 px-4 py-8 lg:px-6 lg:pb-16">
      <p className="font-mono text-status-compact lg:text-status">{code}</p>
      <p className="text-center text-body-small text-body-text lg:text-body">
        {message}
      </p>
      <a href="/" className="no-underline">
        <Button>go home</Button>
      </a>
    </main>
  );
}

export function notFound({ ctx, html }: NotFoundArgs<AppState>) {
  ctx.state.seo = {
    title: "404 — Dashi",
    description: "That page isn't here.",
    index: false,
  };
  return html(<ErrorWell code="404" message="That page isn't here." />);
}

export function error({ ctx, html }: ErrorArgs<AppState>) {
  ctx.state.seo = {
    title: "500 — Dashi",
    description: "Something went wrong.",
    index: false,
  };
  return html(<ErrorWell code="500" message="Something went wrong." />);
}

export function fatal({ html }: FatalArgs) {
  return html(
    <html lang="en">
      <head>
        <title>500 — Dashi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link
          rel="icon"
          href="/static/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="preload"
          href="/static/plus-jakarta-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/static/jetbrains-mono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link rel="stylesheet" href={styles.href} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ErrorWell code="500" message="The site couldn't recover." />
      </body>
    </html>,
  );
}
