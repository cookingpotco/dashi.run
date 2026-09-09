import { CopyButton } from "./copy_button.tsx";

export function CommandSnippet(
  { command, id, className = "max-w-[28rem]" }: {
    command: string;
    id: string;
    className?: string;
  },
) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-card border-2 border-black bg-code-background p-4 shadow-extra ${className}`}
    >
      <code
        id={id}
        className="min-w-0 flex-1 cursor-text font-mono text-large-code-body whitespace-pre-wrap"
      >
        {command}
      </code>
      <CopyButton htmlFor={id} />
    </div>
  );
}
