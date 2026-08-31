import { CacheStrategy, serve, staticFile } from "dashi";
import { error, fatal, notFound } from "./errors.tsx";
import { home } from "./home/mod.tsx";
import { RootLayout } from "./root_layout.tsx";

if (import.meta.main) {
  serve(({ route }) => ({
    layouts: [RootLayout],
    notFound,
    error,
    routes: [
      home,
      route("/static/:file", {
        GET: (ctx) =>
          staticFile(ctx, `${import.meta.dirname}/static`, ctx.params.file, {
            strategy: CacheStrategy.Immutable,
          }),
      }),
      route("/assets/:file", {
        GET: (ctx) =>
          staticFile(ctx, `${import.meta.dirname}/assets`, ctx.params.file, {
            strategy: CacheStrategy.Public,
            maxAge: 3600,
          }),
      }),
    ],
  }), { fatal });
}
