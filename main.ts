import { CacheStrategy, serve, staticFile } from "dashi";
import { getDocs } from "./docs/mod.tsx";
import { error, fatal, notFound } from "./errors.tsx";
import { getHome } from "./home/mod.tsx";
import { getJoin, postSubmitJoinRequest } from "./join/mod.tsx";
import { RootLayout } from "./root/mod.ts";
import type { AppState } from "./seo.ts";
import { getTodoList, postSubmitTodo } from "./todos/mod.tsx";
import { users } from "./users/mod.tsx";

const crawlDir = `${import.meta.dirname}/crawl`;
const crawlCache = {
  strategy: CacheStrategy.Public,
  maxAge: 3600,
};

if (import.meta.main) {
  serve<AppState>(({ route }) => ({
    layouts: [RootLayout],
    notFound,
    error,
    routes: [
      route("/", { GET: getHome }),
      route("/docs", { GET: getDocs }),
      route("/join", { GET: getJoin, POST: postSubmitJoinRequest }),
      route("/todos", { GET: getTodoList, POST: postSubmitTodo }),
      users,
      route("/robots.txt", {
        GET: ({ ctx }) => staticFile(ctx, crawlDir, "robots.txt", crawlCache),
      }),
      route("/sitemap.xml", {
        GET: ({ ctx }) => staticFile(ctx, crawlDir, "sitemap.xml", crawlCache),
      }),
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
