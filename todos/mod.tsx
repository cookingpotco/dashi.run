import { patch, type ReadArgs, type WriteArgs } from "dashi";
import type { AppState } from "../state.ts";
import { TodoCheck, type TodoItem, TodoRow, TodoTitle } from "./item.tsx";

export { TodoTitle } from "./item.tsx";

function seed(): TodoItem[] {
  return [
    { id: "1", title: "Clicking me sends a patch", done: false },
    { id: "2", title: "No client side JS written", done: true },
  ];
}

let items = seed();
let nextId = 3;

function countPatch() {
  const left = items.filter((item) => !item.done).length;
  return patch.update("#count", <>{`${left}/${items.length}`}</>);
}

export function getTodoList(
  { html }: ReadArgs<{ state: AppState }>,
) {
  items = seed();
  nextId = 3;
  return html(
    <div id="todos" className="flex w-full flex-col gap-4">
      {items.map((item) => <TodoRow item={item} />)}
    </div>,
  );
}

export async function postSubmitTodo(
  { ctx, patches }: WriteArgs<{ state: AppState }>,
) {
  const data = await ctx.req.formData();
  const check = data.get("check");
  if (typeof check === "string") {
    const item = items.find((row) => row.id === check);
    if (item === undefined) {
      return patches([countPatch()]);
    }
    item.done = !item.done;
    return patches([
      patch.update(`#todo-${item.id}`, <TodoCheck item={item} />),
      countPatch(),
    ]);
  }
  const title = data.get("title");
  if (typeof title !== "string" || title.trim() === "") {
    return patches([
      patch.replace("#todo-title", <TodoTitle error />),
      countPatch(),
    ]);
  }
  const item: TodoItem = {
    id: String(nextId++),
    title: title.trim(),
    done: false,
  };
  items.push(item);
  return patches([
    patch.append("#todos", <TodoRow item={item} />),
    patch.replace("#todo-title", <TodoTitle />),
    countPatch(),
  ]);
}
