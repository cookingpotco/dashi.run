import type { ErrorArgs, FatalArgs, NotFoundArgs } from "dashi";
import type { AppState } from "./state.ts";

export function notFound({ html }: NotFoundArgs<AppState>) {
  return html(
    <p>
      Page not found
    </p>,
  );
}

export function error({ thrown, html }: ErrorArgs<AppState>) {
  const message = thrown instanceof Error ? thrown.message : "Unknown error";
  return html(
    <p>
      {message}
    </p>,
  );
}

export function fatal({ html }: FatalArgs) {
  return html(
    <html>
      <body>Something went wrong</body>
    </html>,
  );
}
