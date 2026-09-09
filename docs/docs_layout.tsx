import type { LayoutArgs } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import type { AppState } from "../state.ts";
import { adjacentArticles, getArticleBySlug, getArticles } from "./articles.ts";
import { PrevNext } from "./prev_next.tsx";
import { SidebarHash, SidebarItem } from "./sidebar.tsx";

export function DocsLayout({ ctx, children }: LayoutArgs<AppState>): Element {
  const slug = ctx.params.slug;
  const article = getArticleBySlug(slug);
  if (!article) {
    return children;
  }
  const { previous, next } = adjacentArticles(slug);

  return (
    <main className="flex w-full flex-col gap-4 py-6 md:flex-row md:gap-16 md:pt-8 md:pb-16">
      <nav className="w-40 shrink-0">
        <div className="flex flex-col">
          {getArticles().map((entry) => {
            const selected = entry.slug === slug;
            return (
              <div>
                <SidebarItem
                  href={`/docs/${entry.slug}`}
                  selected={selected}
                >
                  {entry.navTitle}
                </SidebarItem>
                {selected && entry.hashes.length > 0 && (
                  <div className="flex flex-col gap-1 pt-1">
                    {entry.hashes.map((hash) => (
                      <SidebarHash
                        href={`/docs/${entry.slug}#${hash.id}`}
                        label={hash.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      <article className="min-w-0 flex-1">
        <div className="flex flex-col gap-0">
          {children}
        </div>
        <PrevNext
          previous={previous
            ? { href: `/docs/${previous.slug}`, label: previous.navTitle }
            : undefined}
          next={next
            ? { href: `/docs/${next.slug}`, label: next.navTitle }
            : undefined}
        />
      </article>
    </main>
  );
}
