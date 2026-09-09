import type { Element } from "dashi/jsx-runtime";
import { parseMarkdown } from "./parse.tsx";

export function ArticleContent(
  { markdown, slug }: { markdown: string; slug: string },
): Element {
  const { nodes } = parseMarkdown(markdown, slug);
  return <>{nodes}</>;
}
