# Client JS

Browser TypeScript for the bits HTML cannot do. Register at module scope with
`client.module` or `client.element`. The server compiles client files and ships
them only when a host rendered.

> This section will be revisited soon to improve the API. What follows is how it
> works today.

## client.module

Register a client file that runs as a side effect. Call `client.module` at
module scope, not inside a handler or component. Render the returned component
on the page to attach the script.

Client files can import each other. Name them `*_client.ts` and keep them beside
the file that registers them. Import browser APIs from `dashi/client`, not
`dashi`.

The module runs on first page load, when a [RouteSlot](/docs/slots) brings it
in, or after [soft navigation](/docs/soft-navigation).

```tsx clock.tsx
import { client } from "dashi";

const Clock = client.module(new URL("./clock_client.ts", import.meta.url));

export function Page() {
  return (
    <main>
      <Clock />
      <p id="time" />
    </main>
  );
}
```

```ts clock_client.ts
const el = document.getElementById("time");
if (el) {
  el.textContent = new Date().toLocaleTimeString();
}
```

## client.element

Register a custom element. Pass a kebab-case tag and the client file URL. Use
the returned component as the host in JSX and put declarative markup inside.

```tsx copy_button.tsx
import { client } from "dashi";

const CopyButton = client.element(
  "copy-button",
  new URL("./copy_button_client.ts", import.meta.url),
);

export function SnippetToolbar({ id }: { id: string }) {
  return (
    <CopyButton htmlFor={id}>
      <button type="button">copy</button>
    </CopyButton>
  );
}
```

```ts copy_button_client.ts
class CopyButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", this.#copy);
  }

  #copy = () => {
    const id = this.getAttribute("for");
    const source = id === null ? null : document.getElementById(id);
    if (source === null) {
      return;
    }
    void navigator.clipboard.writeText(source.textContent ?? "");
  };
}

customElements.define("copy-button", CopyButton);
```

## How it ships

Dashi compiles registered client files to hashed URLs under `/_dashi/client/`.
The document gets one import map for that graph. A `<script type="module">` is
added only when a host rendered on the page.

Build client hosts inside handler-rendered components. A tree built outside the
handler can land in HTML without the matching module script.

After [soft navigation](/docs/soft-navigation), client modules load with the
swapped HTML.
