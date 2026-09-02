import { cached, NavigationRoot, type WrapperCtx } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import { pageCache } from "./cache.ts";
import { SiteFooter } from "./site_footer.tsx";
import { SiteHeader } from "./site_header.tsx";
import styles from "./styles.json" with { type: "json" };

export function RootLayout(
  ctx: WrapperCtx,
  children: Element,
) {
  return cached(
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
      <body>
        <SiteHeader path={ctx.url.pathname} />
        <NavigationRoot className="block">{children}</NavigationRoot>
        <SiteFooter />
      </body>
    </html>,
    pageCache,
  );
}
