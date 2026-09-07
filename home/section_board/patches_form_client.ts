class PatchesForm extends HTMLElement {
  #onInput = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.id !== "todo-title") {
      return;
    }
    target.classList.remove("placeholder:text-error");
    target.classList.add("placeholder:text-black");
  };

  connectedCallback() {
    this.addEventListener("input", this.#onInput);
  }

  disconnectedCallback() {
    this.removeEventListener("input", this.#onInput);
  }
}

customElements.define("patches-form", PatchesForm);
