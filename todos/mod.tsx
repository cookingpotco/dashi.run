import { type Ctx, patch } from "dashi";

interface Item {
  id: string;
  title: string;
  done: boolean;
}

function seed(): Item[] {
  return [
    { id: "1", title: "Already done", done: false },
    { id: "2", title: "Already done", done: true },
  ];
}

let items = seed();
let nextId = 3;

function TodoCheck({ item }: { item: Item }) {
  const mark = item.done ? "bg-green" : "bg-transparent";
  const done = item.done ? "line-through decoration-2" : "";
  return (
    <button
      type="submit"
      name="check"
      value={item.id}
      formNoValidate
      className="flex w-full cursor-pointer items-center gap-2 bg-transparent p-0 text-left"
    >
      <span
        className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 border-black ${mark}`}
      />
      <span className={`font-mono text-code-title ${done}`}>{item.title}</span>
    </button>
  );
}

function TodoRow({ item }: { item: Item }) {
  return (
    <div id={`todo-${item.id}`}>
      <TodoCheck item={item} />
    </div>
  );
}

function CountLabel({ list }: { list: Item[] }) {
  const left = list.filter((item) => !item.done).length;
  return (
    <span id="count" className="pb-2 font-mono text-code-small">
      {`${left}/${list.length}`}
    </span>
  );
}

function countPatch() {
  return patch.replace("#count", <CountLabel list={items} />);
}

export function list() {
  items = seed();
  nextId = 3;
  return (
    <>
      {items.map((item) => <TodoRow item={item} />)}
    </>
  );
}

export async function write(ctx: Ctx) {
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
  const item: Item = {
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
