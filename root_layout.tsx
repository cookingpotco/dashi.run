import type { WrapperCtx } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import styles from "./styles.json" with { type: "json" };

export function RootLayout(
  _ctx: WrapperCtx,
  children: Element,
): Element {
  return (
    <html>
      <head>
        <title>Dashi Web Framework</title>
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
        {children}
      </body>
    </html>
  );
}
