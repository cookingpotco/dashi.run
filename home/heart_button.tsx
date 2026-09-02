import { client } from "dashi";

const Host = client.element(
  "heart-button",
  new URL("./heart_button_client.ts", import.meta.url),
);

export function HeartButton() {
  return (
    <Host>
      <button
        type="button"
        className="inline-flex cursor-pointer flex-col items-center rounded-section border-2 border-black bg-pink px-4 py-4 shadow-extra transition duration-150 ease-out active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <span className="font-mono text-heading-1">CLICK ME</span>
        <span className="font-mono text-code-small">(if you dare)</span>
      </button>
    </Host>
  );
}
