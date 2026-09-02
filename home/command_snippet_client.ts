customElements.define(
  "command-snippet",
  class extends HTMLElement {
    connectedCallback() {
      const button = this.querySelector("button");
      const command = this.querySelector("[data-command]");
      if (button === null || command === null) {
        return;
      }
      button.addEventListener("click", () => {
        const text = command.textContent ?? "";
        void navigator.clipboard.writeText(text).then(() => {
          button.textContent = "COPIED";
          button.classList.remove("bg-pink");
          button.classList.add("bg-green");
        });
      });
    }
  },
);
