customElements.define(
  "heart-button",
  class extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => this.#shoot());
    }

    #shoot() {
      const origin = this.getBoundingClientRect();
      const x = origin.left + origin.width / 2;
      const y = origin.top + origin.height / 2;
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 100;
        const heart = document.createElement("img");
        heart.src = "/static/heart.svg";
        heart.alt = "";
        heart.width = 16;
        heart.height = 14;
        heart.style.cssText =
          `position:fixed;left:${x}px;top:${y}px;width:1rem;height:0.875rem;margin-left:-0.5rem;margin-top:-0.4375rem;pointer-events:none;z-index:50;transition:transform 0.7s ease-out,opacity 0.7s ease-out;opacity:1;`;
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
  },
);
