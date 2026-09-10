import { client, RouteSlot } from "dashi";
import { Button } from "../../components/mod.ts";
import { TodoTitle } from "../../todos/mod.tsx";

const PatchesFormHost = client.element(
  "patches-form",
  new URL("./patches_form_client.ts", import.meta.url),
);

const ListPane = client.element(
  "patches-list",
  new URL("./patches_list_client.ts", import.meta.url),
);

export function PatchesForm() {
  return (
    <form
      method="POST"
      action="/todos"
      className="flex h-[15.125rem] w-full flex-col overflow-hidden rounded-card border-2 border-black bg-code-background lg:absolute lg:inset-0 lg:h-auto"
    >
      <div className="flex items-center justify-between gap-2 border-b border-black bg-blue px-4 py-3">
        <PatchesFormHost className="contents">
          <TodoTitle />
        </PatchesFormHost>
        <Button type="submit">ADD</Button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-end px-4">
        <ListPane className="min-h-0 w-full flex-1 overflow-y-auto py-4">
          <RouteSlot
            src="/todos"
            className="flex w-full flex-col gap-4"
          />
        </ListPane>
        <span id="count" className="pb-2 font-mono text-code-small">
          1/2
        </span>
      </div>
    </form>
  );
}
