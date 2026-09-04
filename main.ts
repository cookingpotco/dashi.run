import { CacheStrategy, serve, staticFile } from "dashi";
import { error, fatal, notFound } from "./errors.tsx";
import { getHome } from "./home/mod.tsx";
import { getJoin, postSubmitJoinRequest } from "./join/mod.tsx";
import { RootLayout } from "./root/mod.ts";
import { getTodoList, postSubmitTodo } from "./todos/mod.tsx";
import { users } from "./users/mod.tsx";

if (import.meta.main) {
  serve(({ route }) => ({
    layouts: [RootLayout],
    notFound,
    error,
    routes: [
      route("/", { GET: getHome }),
      route("/join", { GET: getJoin, POST: postSubmitJoinRequest }),
      route("/todos", { GET: getTodoList, POST: postSubmitTodo }),
      users,
      route("/static/:file", {
        GET: ({ ctx }) =>
          staticFile(ctx, `${import.meta.dirname}/static`, ctx.params.file, {
            strategy: CacheStrategy.Immutable,
          }),
      }),
      route("/generated/:file", {
        GET: ({ ctx }) =>
          staticFile(ctx, `${import.meta.dirname}/generated`, ctx.params.file, {
            strategy: CacheStrategy.Immutable,
          }),
      }),
    ],
  }), { fatal });
}
