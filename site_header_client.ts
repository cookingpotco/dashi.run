function current(href: string, path: string): boolean {
  const dest = new URL(href, location.href).pathname;
  if (dest === "/") {
    return path === "/";
  }
  return path === dest || path.startsWith(`${dest}/`);
}

function sync() {
  const path = location.pathname;
  for (const a of document.querySelectorAll("header nav a[href]")) {
    if (!(a instanceof HTMLAnchorElement)) {
      continue;
    }
    if (current(a.href, path)) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  }
}

const push = history.pushState;
history.pushState = function (
  this: History,
  ...args: Parameters<History["pushState"]>
) {
  const result = push.apply(this, args);
  sync();
  return result;
};

const replace = history.replaceState;
history.replaceState = function (
  this: History,
  ...args: Parameters<History["replaceState"]>
) {
  const result = replace.apply(this, args);
  sync();
  return result;
};

globalThis.addEventListener("popstate", sync);
sync();
