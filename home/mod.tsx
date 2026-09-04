import { cached, client, RouteFragment } from "dashi";
import { pageCache } from "../cache.ts";
import { Closer } from "./closer/mod.tsx";
import { Hero } from "./hero/mod.tsx";
import { SectionBoard } from "./section_board/mod.tsx";

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
        <RouteFragment src="/join" />
      </div>
    </main>,
    pageCache,
  );
}
