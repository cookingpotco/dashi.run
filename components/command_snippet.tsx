import { CopyButton } from "./copy_button.tsx";

export function CommandSnippet({ command }: { command: string }) {
  return (
    <div className="flex w-full max-w-[28rem] items-center justify-between rounded-card border-2 border-black bg-code-background p-4 shadow-extra">
      <code
        id="install-command"
        className="cursor-text font-mono text-large-code-body"
      >
        {command}
      </code>
      <CopyButton htmlFor="install-command" />
    </div>
  );
}
