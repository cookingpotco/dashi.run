customElements.define(
  "heart-button",
  class extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", this.#shoot);
      this.addEventListener("keydown", this.#onKey);
    }

    disconnectedCallback() {
      this.removeEventListener("click", this.#shoot);
      this.removeEventListener("keydown", this.#onKey);
    }

    #onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      this.#shoot();
    };

    #shoot = () => {
      const template = this.querySelector("template");
      if (template === null) {
        return;
      }
      const origin = this.getBoundingClientRect();
      const x = origin.left + origin.width / 2;
      const y = origin.top + origin.height / 2;
      for (let i = 0; i < 10; i++) {
        const heart = template.content.firstElementChild?.cloneNode(true);
        if (!(heart instanceof HTMLElement)) {
          return;
        }
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 100;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.marginLeft = "-0.5rem";
        heart.style.marginTop = "-0.4375rem";
        document.body.append(heart);
        requestAnimationFrame(() => {
          heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance
          }px)`;
          heart.style.opacity = "0";
        });
        setTimeout(() => heart.remove(), 750);
      }
    };
  },
);
