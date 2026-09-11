import {
  CommandSnippet,
  highlightCode,
  Snippet,
  SnippetTone,
} from "../components/mod.ts";
import type { Element } from "dashi/jsx-runtime";
import { marked, type Token, type Tokens } from "marked";
import {
  ArticleBlockquote,
  ArticleH1,
  ArticleH2,
  ArticleH3,
  ArticleOl,
  ArticleOlRow,
  ArticleP,
  ArticleUl,
  ArticleUlRow,
} from "./article.tsx";

export interface ArticleHash {
  id: string;
  label: string;
}

export interface ParsedArticle {
  title: string;
  hashes: ArticleHash[];
  nodes: Element[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingText(tokens: Token[]): string {
  let text = "";
  for (const token of tokens) {
    if (token.type === "text") {
      text += token.text;
      continue;
    }
    if ("tokens" in token && token.tokens !== undefined) {
      text += headingText(token.tokens);
    }
  }
  return text;
}

function parseFenceMeta(
  lang: string | undefined,
): { language: string; title?: string } {
  if (lang === undefined || lang.trim() === "") {
    throw new Error("Fenced code blocks require a language");
  }
  const parts = lang.trim().split(/\s+/);
  const language = parts[0];
  const title = parts.slice(1).join(" ");
  return { language, title: title === "" ? undefined : title };
}

function renderInline(tokens: Token[]): Element[] {
  const nodes: Element[] = [];
  for (const token of tokens) {
    switch (token.type) {
      case "text":
        if ("tokens" in token && token.tokens !== undefined) {
          nodes.push(...renderInline(token.tokens));
          break;
        }
        nodes.push(token.text as Element);
        break;
      case "strong":
        nodes.push(
          <strong className="font-extrabold">
            {renderInline(token.tokens ?? [])}
          </strong>,
        );
        break;
      case "em":
        nodes.push(
          <em className="italic">{renderInline(token.tokens ?? [])}</em>,
        );
        break;
      case "codespan":
        nodes.push(
          <code className="font-mono text-error">{`\`${token.text}\``}</code>,
        );
        break;
      case "link": {
        const external = /^[a-z][a-z0-9+.-]*:/i.test(token.href);
        nodes.push(
          <a
            href={token.href}
            className="text-body-text underline decoration-blue decoration-[12%]"
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {renderInline(token.tokens ?? [])}
          </a>,
        );
        break;
      }
      case "br":
        nodes.push(<br />);
        break;
      default:
        throw new Error(`Unsupported inline token: ${token.type}`);
    }
  }
  return nodes;
}

function renderListItem(item: Tokens.ListItem): Element[] {
  const nodes: Element[] = [];
  for (const token of item.tokens) {
    if (token.type === "paragraph") {
      nodes.push(...renderInline(token.tokens ?? []));
      continue;
    }
    if (token.type === "text") {
      nodes.push(...renderInline([token]));
      continue;
    }
    throw new Error(`Unsupported list item token: ${token.type}`);
  }
  return nodes;
}

function renderBlockquote(tokens: Token[]): Element[] {
  const nodes: Element[] = [];
  for (const token of tokens) {
    if (token.type === "paragraph") {
      nodes.push(...renderInline(token.tokens ?? []));
      continue;
    }
    if (token.type === "text") {
      nodes.push(...renderInline([token]));
      continue;
    }
    throw new Error(`Unsupported blockquote token: ${token.type}`);
  }
  return nodes;
}

export function parseMarkdown(markdown: string, slug: string): ParsedArticle {
  const tokens = marked.lexer(markdown);
  const nodes: Element[] = [];
  const hashes: ArticleHash[] = [];
  let title = "";
  let fenceIndex = 0;

  for (const token of tokens) {
    switch (token.type) {
      case "space":
        break;
      case "heading": {
        const text = headingText(token.tokens ?? []);
        if (token.depth === 1) {
          title = text;
          nodes.push(<ArticleH1>{text}</ArticleH1>);
          break;
        }
        if (token.depth === 2) {
          const id = slugify(text);
          hashes.push({ id, label: text });
          nodes.push(<ArticleH2 id={id}>{text}</ArticleH2>);
          break;
        }
        if (token.depth === 3) {
          nodes.push(<ArticleH3>{text}</ArticleH3>);
          break;
        }
        throw new Error(`Unsupported heading depth: ${token.depth}`);
      }
      case "paragraph":
        nodes.push(<ArticleP>{renderInline(token.tokens ?? [])}</ArticleP>);
        break;
      case "blockquote":
        nodes.push(
          <ArticleBlockquote>
            {renderBlockquote(token.tokens ?? [])}
          </ArticleBlockquote>,
        );
        break;
      case "list": {
        if (token.ordered) {
          if (token.items.length > 4) {
            throw new Error("Ordered lists support at most four items");
          }
          nodes.push(
            <ArticleOl>
              {token.items.map((item: Tokens.ListItem, index: number) => (
                <ArticleOlRow index={index + 1}>
                  {renderListItem(item)}
                </ArticleOlRow>
              ))}
            </ArticleOl>,
          );
          break;
        }
        nodes.push(
          <ArticleUl>
            {token.items.map((item: Tokens.ListItem) => (
              <ArticleUlRow>{renderListItem(item)}</ArticleUlRow>
            ))}
          </ArticleUl>,
        );
        break;
      }
      case "code": {
        const { language, title: fenceTitle } = parseFenceMeta(token.lang);
        const copyId = `docs-fence-${slug}-${fenceIndex}`;
        fenceIndex += 1;
        if (language === "bash") {
          nodes.push(
            <div className="py-2">
              <CommandSnippet
                command={token.text.trimEnd()}
                id={copyId}
                className="max-w-none"
              />
            </div>,
          );
          break;
        }
        if (fenceTitle === undefined) {
          throw new Error(
            `Fenced code blocks for ${language} require a title after the language`,
          );
        }
        nodes.push(
          <div className="py-2">
            <Snippet title={fenceTitle} tone={SnippetTone.Green}>
              {highlightCode(token.text.trimEnd())}
            </Snippet>
          </div>,
        );
        break;
      }
      default:
        throw new Error(`Unsupported markdown token: ${token.type}`);
    }
  }

  if (title === "") {
    throw new Error("Article markdown must include an h1");
  }

  return { title, hashes, nodes };
}
