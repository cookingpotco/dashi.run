import type { DashiNode } from "dashi/jsx-runtime";

const enum SnippetTone {
  Pink = "pink",
  Green = "green",
}

interface SnippetProps {
  title: string;
  code: string;
  tone: SnippetTone;
}

export function Snippet({ title, code, tone }: SnippetProps) {
  const header = tone === SnippetTone.Pink ? "bg-pink" : "bg-green";
  const body = tone === SnippetTone.Pink
    ? "bg-code-background"
    : "bg-card-background";
  return (
    <div className="w-full overflow-hidden rounded-card border-2 border-black">
      <div className={`border-b border-black px-4 py-2 ${header}`}>
        <p className="font-mono text-code-title">{title}</p>
      </div>
      <pre className={`overflow-x-auto p-4 font-mono text-code-body ${body}`}>
        {code}
      </pre>
    </div>
  );
}

export function SnippetStack(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

export { SnippetTone };
