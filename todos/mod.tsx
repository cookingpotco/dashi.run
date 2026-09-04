import { type Ctx, patch } from "dashi";
import { TodoCheck, type TodoItem, TodoRow } from "./item.tsx";

function seed(): TodoItem[] {
  return [
    { id: "1", title: "Already done", done: false },
    { id: "2", title: "Already done", done: true },
  ];
}

let items = seed();
let nextId = 3;

function countPatch() {
  const left = items.filter((item) => !item.done).length;
  return patch.replace("#count", <>{`${left}/${items.length}`}</>);
}

export function getTodoList() {
  items = seed();
  nextId = 3;
  return (
    <>
      {items.map((item) => <TodoRow item={item} />)}
    </>
  );
}

export async function postSubmitTodo(ctx: Ctx) {
  const data = await ctx.req.formData();
  const check = data.get("check");
  if (typeof check === "string") {
    const item = items.find((row) => row.id === check);
    if (item === undefined) {
      return [countPatch()];
    }
    if (!item.done) {
      item.done = true;
    }
    return [
      patch.replace(`#todo-${item.id}`, <TodoCheck item={item} />),
      countPatch(),
    ];
  }
  const title = data.get("title");
  if (typeof title !== "string" || title.trim() === "") {
    return [countPatch()];
  }
  const item: TodoItem = {
    id: String(nextId++),
    title: title.trim(),
    done: false,
  };
  items.push(item);
  return [
    patch.append("/todos", <TodoRow item={item} />),
    countPatch(),
  ];
}
