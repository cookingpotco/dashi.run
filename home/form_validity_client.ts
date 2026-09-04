function suppress(event: Event) {
  event.preventDefault();
}

class FormValidity extends HTMLElement {
  connectedCallback() {
    document.addEventListener("invalid", suppress, true);
  }

  disconnectedCallback() {
    document.removeEventListener("invalid", suppress, true);
  }
}

customElements.define("form-validity", FormValidity);
