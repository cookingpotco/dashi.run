import type { DashiNode } from "dashi/jsx-runtime";
import { CopyButton } from "./copy_button.tsx";

const enum SnippetTone {
  Pink = "pink",
  Green = "green",
}

interface SnippetProps {
  title: string;
  tone: SnippetTone;
  code?: string;
  children?: DashiNode | DashiNode[];
  copyId: string;
}

export function Snippet(
  { title, code, tone, children, copyId }: SnippetProps,
) {
  const header = tone === SnippetTone.Pink ? "bg-pink" : "bg-green";
  const body = tone === SnippetTone.Pink
    ? "bg-code-background"
    : "bg-card-background";
  return (
    <div className="group relative w-full overflow-hidden rounded-card border-2 border-black">
      <div className={`border-b border-black px-4 py-2 ${header}`}>
        <p className="font-mono text-code-title">{title}</p>
      </div>
      <div className={`relative ${body}`}>
        <pre
          id={copyId}
          className="cursor-text overflow-x-auto p-4 font-mono text-code-body"
        >
          {children ?? code}
        </pre>
        <div className="pointer-events-none absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
          <CopyButton htmlFor={copyId} />
        </div>
      </div>
    </div>
  );
}

export function SnippetStack(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

export { SnippetTone };
