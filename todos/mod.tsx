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

function TodoRowInner({ item }: { item: Item }) {
  const mark = item.done ? "bg-green" : "bg-transparent";
  return (
    <>
      <button
        type="submit"
        name="check"
        value={item.id}
        disabled={item.done}
        className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 border-black ${mark}`}
        aria-label={item.done ? "done" : "mark done"}
      />
      <span className="font-mono text-code-title">{item.title}</span>
    </>
  );
}

function TodoRow({ item }: { item: Item }) {
  return (
    <div id={`todo-${item.id}`} className="flex items-center gap-2">
      <TodoRowInner item={item} />
    </div>
  );
}

function CountLabel({ list }: { list: Item[] }) {
  const left = list.filter((item) => !item.done).length;
  return <>{`${left}/${list.length}`}</>;
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
    if (item === undefined || item.done) {
      return [];
    }
    item.done = true;
    return [
      patch.replace(`#todo-${item.id}`, <TodoRowInner item={item} />),
      patch.replace("#count", <CountLabel list={items} />),
    ];
  }
  const title = data.get("title");
  if (typeof title !== "string" || title.trim() === "") {
    return [];
  }
  const item: Item = {
    id: String(nextId++),
    title: title.trim(),
    done: false,
  };
  items.push(item);
  return [
    patch.append("/todos", <TodoRow item={item} />),
    patch.replace("#count", <CountLabel list={items} />),
  ];
}
