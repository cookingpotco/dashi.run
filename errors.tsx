import type { ErrorArgs, FatalArgs, NotFoundArgs } from "dashi";

export function notFound({ html }: NotFoundArgs) {
  return html(
    <p>
      Page not found
    </p>,
  );
}

export function error({ thrown, html }: ErrorArgs) {
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
