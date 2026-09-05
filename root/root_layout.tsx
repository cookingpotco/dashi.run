import { type LayoutArgs, NavigationRoot } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import { defaultTitle, siteOrigin } from "../seo.ts";
import type { AppState } from "../state.ts";
import styles from "../styles.json" with { type: "json" };
import { SiteFooter } from "./site_footer.tsx";
import { SiteHeader } from "./site_header.tsx";

export function RootLayout({ ctx, children }: LayoutArgs<AppState>): Element {
  const seo = ctx.state.seo;
  const title = seo?.title ?? defaultTitle;
  const description = seo?.description;
  const index = seo?.index ?? false;
  const canonical = `${siteOrigin}${ctx.url.pathname}`;
  const image = `${siteOrigin}/static/og.png`;

  return (
    <html lang="en" className="overflow-x-hidden scrollbar-gutter-stable">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {description !== undefined && (
          <meta name="description" content={description} />
        )}
        {index === false && <meta name="robots" content="noindex" />}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dashi" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={canonical} />
        {description !== undefined && (
          <meta property="og:description" content={description} />
        )}
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="2000" />
        <meta property="og:image:height" content="1000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cookingpotco" />
        <meta name="twitter:title" content={title} />
        {description !== undefined && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:image" content={image} />
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
        <SiteHeader path={ctx.url.pathname} />
        <NavigationRoot className="flex grow flex-col">
          {children}
        </NavigationRoot>
        <SiteFooter />
      </body>
    </html>
  );
}
