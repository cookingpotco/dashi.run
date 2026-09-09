import gettingStarted from "./content/getting-started.md" with { type: "text" };
import clientJs from "./content/client-js.md" with { type: "text" };
import patches from "./content/patches.md" with { type: "text" };
import routing from "./content/routing.md" with { type: "text" };
import { type ArticleHash, parseMarkdown } from "./parse.tsx";

interface ArticleRow {
  slug: string;
  navTitle: string;
  markdown: string;
}

const rows: ArticleRow[] = [
  {
    slug: "getting-started",
    navTitle: "Getting started",
    markdown: gettingStarted,
  },
  { slug: "routing", navTitle: "Routing", markdown: routing },
  { slug: "patches", navTitle: "Patches", markdown: patches },
  { slug: "client-js", navTitle: "Client JS", markdown: clientJs },
];

export interface Article {
  slug: string;
  navTitle: string;
  title: string;
  hashes: ArticleHash[];
  markdown: string;
}

let articles: Article[] | undefined;
let articlesBySlug: Map<string, Article> | undefined;

function loadArticles(): Article[] {
  if (articles) {
    return articles;
  }
  articles = rows.map((row) => {
    const parsed = parseMarkdown(row.markdown, row.slug);
    return {
      slug: row.slug,
      navTitle: row.navTitle,
      title: parsed.title,
      hashes: parsed.hashes,
      markdown: row.markdown,
    };
  });
  articlesBySlug = new Map(articles.map((article) => [article.slug, article]));
  return articles;
}

export function getArticles(): Article[] {
  return loadArticles();
}

export function getArticleBySlug(slug: string): Article | undefined {
  loadArticles();
  return articlesBySlug!.get(slug);
}

export function adjacentArticles(slug: string): {
  previous?: Article;
  next?: Article;
} {
  const list = loadArticles();
  const index = list.findIndex((article) => article.slug === slug);
  if (index === -1) {
    return {};
  }
  const previous = index > 0 ? list[index - 1] : undefined;
  const next = index < list.length - 1 ? list[index + 1] : undefined;
  return { previous, next };
}
