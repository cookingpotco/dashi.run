const DESKTOP = "(min-width: 64rem)";

function isControl(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }
  return target.closest(
    "a, button, input, textarea, select, label, pre, code, h2, p, heart-button",
  ) !== null;
}

customElements.define(
  "section-board",
  class extends HTMLElement {
    #media = globalThis.matchMedia(DESKTOP);
    #drag: {
      card: HTMLElement;
      offsetX: number;
      offsetY: number;
    } | null = null;

    connectedCallback() {
      this.#observeSlides();
      this.addEventListener("pointerdown", this.#onDown);
      this.addEventListener("pointermove", this.#onMove);
      this.addEventListener("pointerup", this.#onUp);
      this.addEventListener("pointercancel", this.#onUp);
      this.#media.addEventListener("change", this.#onBreakpoint);
      this.#onBreakpoint();
    }

    disconnectedCallback() {
      this.removeEventListener("pointerdown", this.#onDown);
      this.removeEventListener("pointermove", this.#onMove);
      this.removeEventListener("pointerup", this.#onUp);
      this.removeEventListener("pointercancel", this.#onUp);
      this.#media.removeEventListener("change", this.#onBreakpoint);
    }

    #cards(): HTMLElement[] {
      return [...this.querySelectorAll<HTMLElement>(":scope > [data-slide]")];
    }

    #face(card: HTMLElement): HTMLElement {
      return card.querySelector<HTMLElement>("[data-face]") ?? card;
    }

    #observeSlides() {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const target = entry.target;
            observer.unobserve(target);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                target.dataset.in = "";
              });
            });
          }
        }
      }, { threshold: 0 });
      for (const card of this.#cards()) {
        observer.observe(card);
      }
    }

    #onBreakpoint = () => {
      this.style.cursor = this.#media.matches ? "grab" : "";
      if (!this.#media.matches) {
        for (const card of this.#cards()) {
          card.style.left = "";
          card.style.top = "";
          card.style.zIndex = "";
          delete this.#face(card).dataset.lift;
        }
      }
    };

    #onDown = (event: PointerEvent) => {
      if (!this.#media.matches || this.#drag !== null) {
        return;
      }
      if (isControl(event.target)) {
        return;
      }
      const card = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-slide]")
        : null;
      if (card === null || !this.contains(card)) {
        return;
      }
      const box = card.getBoundingClientRect();
      const board = this.getBoundingClientRect();
      this.#drag = {
        card,
        offsetX: event.clientX - box.left,
        offsetY: event.clientY - box.top,
      };
      card.style.left = `${Math.round(box.left - board.left)}px`;
      card.style.top = `${Math.round(box.top - board.top)}px`;
      card.style.zIndex = "20";
      this.#face(card).dataset.lift = "";
      card.style.cursor = "grabbing";
      this.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    #onMove = (event: PointerEvent) => {
      if (this.#drag === null) {
        return;
      }
      const board = this.getBoundingClientRect();
      this.#drag.card.style.left = `${
        Math.round(event.clientX - board.left - this.#drag.offsetX)
      }px`;
      this.#drag.card.style.top = `${
        Math.round(event.clientY - board.top - this.#drag.offsetY)
      }px`;
    };

    #onUp = () => {
      if (this.#drag === null) {
        return;
      }
      delete this.#face(this.#drag.card).dataset.lift;
      this.#drag.card.style.cursor = "";
      this.#drag = null;
    };
  },
);
