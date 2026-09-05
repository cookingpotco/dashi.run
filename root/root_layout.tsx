import { type LayoutArgs, NavigationRoot } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import styles from "../styles.json" with { type: "json" };
import { SiteFooter } from "./site_footer.tsx";
import { SiteHeader } from "./site_header.tsx";

export function RootLayout({ ctx, children }: LayoutArgs): Element {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Dashi Web Framework</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <SiteHeader path={ctx.url.pathname} />
        <NavigationRoot className="block grow">{children}</NavigationRoot>
        <SiteFooter />
      </body>
    </html>
  );
}
