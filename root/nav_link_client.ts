function current(href: string, path: string): boolean {
  const dest = new URL(href, location.href).pathname;
  if (dest === "/") {
    return path === "/";
  }
  return path === dest || path.startsWith(`${dest}/`);
}

class NavLink extends HTMLElement {
  #onNavigated = () => {
    this.#sync(location.pathname);
  };

  connectedCallback() {
    this.#sync(location.pathname);
    document.addEventListener("dashi:navigated", this.#onNavigated);
  }

  disconnectedCallback() {
    document.removeEventListener("dashi:navigated", this.#onNavigated);
  }

  #sync(path: string) {
    const a = this.querySelector("a");
    if (!(a instanceof HTMLAnchorElement)) {
      return;
    }
    if (current(a.href, path)) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  }
}

customElements.define("nav-link", NavLink);
