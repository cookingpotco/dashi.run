import type { MiddlewareArgs } from "dashi";
import { siteOrigin } from "./seo.ts";
import type { AppState } from "./state.ts";

export function stripTrailingSlash({ ctx, next }: MiddlewareArgs<AppState>) {
  const { pathname, search } = ctx.url;
  if (pathname !== "/" && pathname.endsWith("/")) {
    const target = `${pathname.slice(0, -1)}${search}`;
    return Response.redirect(new URL(target, siteOrigin), 301);
  }
  return next();
}
