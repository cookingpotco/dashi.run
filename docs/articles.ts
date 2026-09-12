import introduction from "./content/introduction.md" with { type: "text" };
import gettingStarted from "./content/getting-started.md" with { type: "text" };
import jsx from "./content/jsx.md" with { type: "text" };
import routing from "./content/routing.md" with { type: "text" };
import handlers from "./content/handlers.md" with { type: "text" };
import { type ArticleHash, parseMarkdown } from "./parse.tsx";

interface ArticleRow {
  slug: string;
  navTitle: string;
  description: string;
  markdown: string;
}

const rows: ArticleRow[] = [
  {
    slug: "introduction",
    navTitle: "Introduction",
    description: "A server-first Deno framework. JSX is precompiled to HTML.",
    markdown: introduction,
  },
  {
    slug: "getting-started",
    navTitle: "Getting started",
    description: "Create a Dashi app and run the dev server.",
    markdown: gettingStarted,
  },
  {
    slug: "jsx",
    navTitle: "JSX",
    description:
      "JSX is precompiled to static HTML. Types from dashi/jsx-runtime.",
    markdown: jsx,
  },
  {
    slug: "routing",
    navTitle: "Routing",
    description: "The table: serve(), route(), group(), and typed params.",
    markdown: routing,
  },
  {
    slug: "handlers",
    navTitle: "Handlers",
    description: "Read and write handlers: html(), patches(), and ctx.",
    markdown: handlers,
  },
];

export interface Article {
  slug: string;
  navTitle: string;
  title: string;
  description: string;
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
      description: row.description,
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
