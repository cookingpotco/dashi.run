import type { ReadArgs } from "dashi";
import { getArticles } from "../docs/mod.tsx";
import { siteOrigin } from "../seo.ts";
import type { AppState } from "../state.ts";

const siteLastmod = new Date().toISOString().slice(0, 10);

export function getSitemap(_args: ReadArgs<{ state: AppState }>) {
  const homeEntry =
    `  <url>\n    <loc>${siteOrigin}/</loc>\n    <lastmod>${siteLastmod}</lastmod>\n  </url>`;
  const docEntries = getArticles().map((article) =>
    `  <url>\n    <loc>${siteOrigin}/docs/${article.slug}</loc>\n    <lastmod>${article.lastmod}</lastmod>\n  </url>`
  ).join("\n");
  const entries = [homeEntry, docEntries].filter(Boolean).join("\n");
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
