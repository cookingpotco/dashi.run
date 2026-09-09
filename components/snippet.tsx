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
}

export function Snippet(
  { title, code, tone, children }: SnippetProps,
) {
  const copyId = crypto.randomUUID();
  const header = tone === SnippetTone.Pink ? "bg-pink" : "bg-green";
  return (
    <div className="relative w-full overflow-hidden rounded-card border-2 border-black">
      <div className={`border-b border-black px-4 py-2 ${header}`}>
        <p className="font-mono text-code-title">{title}</p>
      </div>
      <div className="relative bg-code-background">
        <pre
          id={copyId}
          className="cursor-text overflow-x-auto p-4 font-mono text-code-body"
        >
          {children ?? code}
        </pre>
        <div className="absolute right-4 bottom-4">
          <CopyButton htmlFor={copyId} />
        </div>
      </div>
    </div>
  );
}

export { SnippetTone };
