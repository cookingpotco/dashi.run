import type { DashiNode } from "dashi/jsx-runtime";

export function ArticleH1(
  { children, id }: { children: DashiNode; id?: string },
) {
  return (
    <h1 id={id} className="pb-6 text-title-compact">
      {children}
    </h1>
  );
}

export function ArticleH2(
  { children, id }: { children: DashiNode; id?: string },
) {
  return (
    <h2 id={id} className="pt-3 pb-2 text-heading-1">
      {children}
    </h2>
  );
}

export function ArticleH3({ children }: { children: DashiNode }) {
  return <h3 className="pt-2 pb-1 text-heading-2">{children}</h3>;
}

export function ArticleP({ children }: { children: DashiNode | DashiNode[] }) {
  return (
    <p className="py-1 text-body-small text-body-text md:text-body">
      {children}
    </p>
  );
}

export function ArticleBlockquote(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return (
    <blockquote className="flex gap-2 py-2">
      <div className="w-1 shrink-0 self-stretch rounded bg-pink" aria-hidden />
      <div className="min-w-0 text-body-small text-body-text md:text-body">
        {children}
      </div>
    </blockquote>
  );
}

export function ArticleUl(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return <ul className="flex flex-col gap-2 py-2">{children}</ul>;
}

export function ArticleUlRow(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return (
    <li className="flex gap-1.5 text-body-small text-body-text md:text-body">
      <span
        aria-hidden
        className="mt-[0.4375rem] size-2.5 shrink-0 bg-pink"
        style="clip-path: polygon(0% 0%, 0% 100%, 100% 50%);"
      />
      <span>{children}</span>
    </li>
  );
}

export function ArticleOl(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return <ol className="flex flex-col gap-2 py-2">{children}</ol>;
}

export function ArticleOlRow(
  { index, children }: { index: number; children: DashiNode | DashiNode[] },
) {
  return (
    <li className="flex gap-1 text-body-small text-body-text md:text-body">
      <span
        className="mt-1.5 flex h-3 w-3 shrink-0 flex-wrap content-start"
        aria-hidden
      >
        {Array.from(
          { length: index },
          () => <span className="size-1.5 bg-pink" />,
        )}
      </span>
      <span>{children}</span>
    </li>
  );
}
