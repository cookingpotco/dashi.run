customElements.define(
  "copy-button",
  class extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", this.#copy);
    }

    disconnectedCallback() {
      this.removeEventListener("click", this.#copy);
    }

    #copy = () => {
      const id = this.getAttribute("for");
      if (id === null) {
        return;
      }
      const source = document.getElementById(id);
      const button = this.querySelector("button");
      if (source === null || button === null) {
        return;
      }
      void navigator.clipboard.writeText(source.textContent ?? "").then(() => {
        button.textContent = "COPIED";
        button.classList.remove("bg-pink");
        button.classList.add("bg-green");
      });
    };
  },
);
