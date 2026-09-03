import { cached, client, type Ctx, patch } from "dashi";
import { Button } from "../components/mod.ts";
import { pageCache } from "../cache.ts";
import { Closer } from "./closer/mod.tsx";
import { EmailCapture } from "./email_capture.tsx";
import { Hero } from "./hero/mod.tsx";
import { SectionBoard } from "./section_board/mod.tsx";

const emails: string[] = [];

const FormValidity = client.element(
  "form-validity",
  new URL("./form_validity_client.ts", import.meta.url),
);

export function Home() {
  return cached(
    <main className="mx-auto flex w-full max-w-main flex-col items-center gap-12 px-4 py-8 lg:gap-16 lg:px-6 lg:pb-16">
      <FormValidity />
      <Hero />
      <div className="flex w-full flex-col items-center gap-8 lg:gap-16">
        <SectionBoard />
        <Closer />
        <EmailCapture />
      </div>
    </main>,
    pageCache,
  );
}

export async function join(ctx: Ctx) {
  const data = await ctx.req.formData();
  const email = data.get("email");
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return [
      patch.replace("#join", <Button type="submit">join</Button>),
    ];
  }
  emails.push(email);
  return [
    patch.replace("#join", <Button success type="submit">JOINED!</Button>),
  ];
}
