import { group, type ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import { NotFound } from "../errors.tsx";
import { siteOrigin } from "../seo.ts";
import type { AppState } from "../state.ts";
import { getArticleBySlug } from "./articles.ts";
import { ArticleContent } from "./article_content.tsx";
import { DocsLayout } from "./docs_layout.tsx";

export { getArticles } from "./articles.ts";

export function getDocs(_args: ReadArgs<{ state: AppState }>) {
  return Response.redirect(new URL("/docs/introduction", siteOrigin), 301);
}

export function getArticle(
  { ctx, html }: ReadArgs<{ state: AppState; params: { slug: string } }>,
) {
  const article = getArticleBySlug(ctx.params.slug);
  if (!article) {
    ctx.state.seo = {
      title: "404 - dashi",
      description: "That page isn't here.",
      index: false,
    };
    return html(<NotFound />, { status: 404 });
  }
  ctx.state.seo = {
    title: `${article.title} - Docs - dashi`,
    description: article.description,
    index: true,
  };
  return html(
    <ArticleContent markdown={article.markdown} slug={ctx.params.slug} />,
    { cache: pageCache },
  );
}

export const docsArticles = group<AppState>("/docs", ({ route }) => ({
  layouts: [DocsLayout],
  routes: [
    route("/:slug", { GET: getArticle }),
  ],
}));
