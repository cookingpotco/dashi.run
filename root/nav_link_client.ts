function current(href: string, path: string): boolean {
  const dest = new URL(href, location.href).pathname;
  if (dest === "/") {
    return path === "/";
  }
  return path === dest || path.startsWith(`${dest}/`);
}

class NavLink extends HTMLElement {
  connectedCallback() {
    const a = this.querySelector("a");
    if (!(a instanceof HTMLAnchorElement)) {
      return;
    }
    if (current(a.href, location.pathname)) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  }
}

customElements.define("nav-link", NavLink);
