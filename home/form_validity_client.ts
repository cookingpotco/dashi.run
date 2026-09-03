function suppress(event: Event) {
  event.preventDefault();
}

customElements.define(
  "form-validity",
  class extends HTMLElement {
    connectedCallback() {
      document.addEventListener("invalid", suppress, true);
    }

    disconnectedCallback() {
      document.removeEventListener("invalid", suppress, true);
    }
  },
);
