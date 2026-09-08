class PatchesList extends HTMLElement {
  #observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement && node.id.startsWith("todo-")) {
          this.scrollTop = this.scrollHeight;
          return;
        }
      }
    }
  });

  connectedCallback() {
    this.#observer.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }
}

customElements.define("patches-list", PatchesList);
