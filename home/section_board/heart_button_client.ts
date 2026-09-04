class HeartButton extends HTMLElement {
  #button: HTMLButtonElement | null = null;

  #onClick = () => {
    this.#shoot();
  };

  connectedCallback() {
    const button = this.querySelector("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    this.#button = button;
    button.addEventListener("click", this.#onClick);
  }

  disconnectedCallback() {
    this.#button?.removeEventListener("click", this.#onClick);
    this.#button = null;
  }

  #shoot() {
    const template = this.querySelector("template");
    const origin = this.#button?.getBoundingClientRect();
    if (template === null || origin === undefined) {
      return;
    }
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
  }
}

customElements.define("heart-button", HeartButton);
