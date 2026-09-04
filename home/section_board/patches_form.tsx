import { RouteFragment } from "dashi";
import { Button } from "../../components/mod.ts";

export function PatchesForm() {
  return (
    <form
      method="POST"
      action="/todos"
      className="flex h-[10.125rem] w-full flex-col overflow-hidden rounded-card border-2 border-black bg-code-background has-[:user-invalid]:border-error lg:absolute lg:inset-0 lg:h-auto"
    >
      <div className="flex items-center justify-between gap-2 border-b border-black bg-blue px-4 py-3">
        <input
          name="title"
          required
          placeholder="Something to do..."
          className="min-w-0 flex-1 cursor-text bg-transparent font-mono text-code-title outline-none placeholder:text-black user-invalid:text-error"
        />
        <Button type="submit">ADD</Button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-end px-4">
        <div className="min-h-0 w-full flex-1 overflow-y-auto py-4">
          <RouteFragment
            src="/todos"
            className="flex w-full flex-col gap-4"
          />
        </div>
        <span id="count" className="pb-2 font-mono text-code-small">
          1/2
        </span>
      </div>
    </form>
  );
}
