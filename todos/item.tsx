export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
}

export function TodoCheck({ item }: { item: TodoItem }) {
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

export function TodoRow({ item }: { item: TodoItem }) {
  return (
    <div id={`todo-${item.id}`}>
      <TodoCheck item={item} />
    </div>
  );
}
