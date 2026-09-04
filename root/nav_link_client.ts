function current(href: string, path: string): boolean {
  const dest = new URL(href, location.href).pathname;
  if (dest === "/") {
    return path === "/";
  }
  return path === dest || path.startsWith(`${dest}/`);
}

const listeners = new Set<() => void>();
const push = history.pushState;
const replace = history.replaceState;
let wrapped = false;

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function wrap() {
  if (wrapped) {
    return;
  }
  wrapped = true;
  history.pushState = function (
    this: History,
    ...args: Parameters<History["pushState"]>
  ) {
    const result = push.apply(this, args);
    emit();
    return result;
  };
  history.replaceState = function (
    this: History,
    ...args: Parameters<History["replaceState"]>
  ) {
    const result = replace.apply(this, args);
    emit();
    return result;
  };
  globalThis.addEventListener("popstate", emit);
}

function unwrap() {
  if (listeners.size > 0 || !wrapped) {
    return;
  }
  history.pushState = push;
  history.replaceState = replace;
  globalThis.removeEventListener("popstate", emit);
  wrapped = false;
}

customElements.define(
  "nav-link",
  class extends HTMLElement {
    #sync = () => {
      const a = this.querySelector("a");
      if (!(a instanceof HTMLAnchorElement)) {
        return;
      }
      if (current(a.href, location.pathname)) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    };

    connectedCallback() {
      wrap();
      listeners.add(this.#sync);
      this.#sync();
    }

    disconnectedCallback() {
      listeners.delete(this.#sync);
      unwrap();
    }
  },
);
