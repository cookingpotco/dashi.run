import { client } from "dashi";
import { Button } from "./button.tsx";

const Host = client.element(
  "copy-button",
  new URL("./copy_button_client.ts", import.meta.url),
);

export function CopyButton({ htmlFor }: { htmlFor: string }) {
  return (
    <Host htmlFor={htmlFor}>
      <Button type="button">copy</Button>
    </Host>
  );
}
