import { CacheStrategy, serve, staticFile } from "dashi";
import { error, fatal, notFound } from "./errors.tsx";
import { Home } from "./home/mod.tsx";
import { Join, submit } from "./join/mod.tsx";
import { RootLayout } from "./root/mod.ts";
import { list, write } from "./todos/mod.tsx";
import { users } from "./users/mod.tsx";

if (import.meta.main) {
  serve(({ route }) => ({
    layouts: [RootLayout],
    notFound,
    error,
    routes: [
      route("/", { GET: Home }),
      route("/join", { GET: Join, POST: submit }),
      route("/todos", { GET: list, POST: write }),
      users,
      route("/static/:file", {
        GET: (ctx) =>
          staticFile(ctx, `${import.meta.dirname}/static`, ctx.params.file, {
            strategy: CacheStrategy.Immutable,
          }),
      }),
      route("/generated/:file", {
        GET: (ctx) =>
          staticFile(ctx, `${import.meta.dirname}/generated`, ctx.params.file, {
            strategy: CacheStrategy.Immutable,
          }),
      }),
    ],
  }), { fatal });
}
