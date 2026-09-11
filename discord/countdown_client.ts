class DiscordCountdown extends HTMLElement {
  #timer?: ReturnType<typeof setInterval>;

  connectedCallback() {
    const fallback = this.querySelector("[data-fallback]");
    const during = this.querySelector("[data-during]");
    const count = this.querySelector("[data-count]");

    if (fallback instanceof HTMLElement) {
      fallback.hidden = true;
    }

    let n = 3;
    this.#timer = setInterval(() => {
      n -= 1;
      if (count) {
        count.textContent = String(n);
      }
      if (n <= 0) {
        if (this.#timer !== undefined) {
          clearInterval(this.#timer);
          this.#timer = undefined;
        }
        if (during instanceof HTMLElement) {
          during.hidden = true;
        }
        if (fallback instanceof HTMLElement) {
          fallback.hidden = false;
        }
        const link = this.querySelector("a");
        if (link instanceof HTMLAnchorElement) {
          location.assign(link.href);
        }
      }
    }, 1000);
  }

  disconnectedCallback() {
    if (this.#timer !== undefined) {
      clearInterval(this.#timer);
      this.#timer = undefined;
    }
  }
}

customElements.define("discord-countdown", DiscordCountdown);
