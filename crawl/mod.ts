import type { ReadArgs } from "dashi";
import { getArticles } from "../docs/articles.ts";
import { siteOrigin } from "../seo.ts";
import type { AppState } from "../state.ts";

export function getSitemap(_args: ReadArgs<{ state: AppState }>) {
  const urls = [
    `${siteOrigin}/`,
    ...getArticles().map((article) => `${siteOrigin}/docs/${article.slug}`),
  ];
  const entries = urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries}\n` +
    `</urlset>\n`;
  return new Response(body, {
    headers: {
      "content-type": "application/xml",
      "cache-control": "public, max-age=3600",
    },
  });
}
