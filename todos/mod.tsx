import { patch, type ReadArgs, type WriteArgs } from "dashi";
import { TodoCheck, type TodoItem, TodoRow } from "./item.tsx";

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
  return patch.replace("#count", <>{`${left}/${items.length}`}</>);
}

export function getTodoList({ html }: ReadArgs) {
  items = seed();
  nextId = 3;
  return html(
    <>
      {items.map((item) => <TodoRow item={item} />)}
    </>,
  );
}

export async function postSubmitTodo({ ctx, patches }: WriteArgs) {
  const data = await ctx.req.formData();
  const check = data.get("check");
  if (typeof check === "string") {
    const item = items.find((row) => row.id === check);
    if (item === undefined) {
      return patches([countPatch()]);
    }
    if (!item.done) {
      item.done = true;
    }
    return patches([
      patch.replace(`#todo-${item.id}`, <TodoCheck item={item} />),
      countPatch(),
    ]);
  }
  const title = data.get("title");
  if (typeof title !== "string" || title.trim() === "") {
    return patches([countPatch()]);
  }
  const item: TodoItem = {
    id: String(nextId++),
    title: title.trim(),
    done: false,
  };
  items.push(item);
  return patches([
    patch.append("/todos", <TodoRow item={item} />),
    countPatch(),
  ]);
}
