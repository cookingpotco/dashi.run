import { CacheStrategy, serve, staticFile } from "dashi";
import { getDocs } from "./docs/mod.tsx";
import { error, fatal, notFound } from "./errors.tsx";
import { getHome } from "./home/mod.tsx";
import { getEmails, getJoin, postSubmitJoinRequest } from "./join/mod.tsx";
import { RootLayout } from "./root/mod.ts";
import type { AppState } from "./state.ts";
import { getTodoList, postSubmitTodo } from "./todos/mod.tsx";
import { users } from "./users/mod.tsx";

const crawlDir = `${import.meta.dirname}/crawl`;
const crawlCache = {
  strategy: CacheStrategy.Public,
  maxAge: 3600,
};

type SiteBuild = Parameters<typeof serve<AppState>>[0];

export const createSite: SiteBuild = ({ route }) => ({
  layouts: [RootLayout],
  notFound,
  error,
  routes: [
    route("/", { GET: getHome }),
    route("/docs", { GET: getDocs }),
    route("/join", { GET: getJoin, POST: postSubmitJoinRequest }),
    route("/emails", { GET: getEmails }),
    route("/todos", { GET: getTodoList, POST: postSubmitTodo }),
    users,
    route("/health", {
      GET: () =>
        new Response(null, {
          status: 204,
          headers: { "cache-control": "no-store" },
        }),
    }),
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
});

if (import.meta.main) {
  serve(createSite, { fatal, hostname: "0.0.0.0", port: 8000 });
}
