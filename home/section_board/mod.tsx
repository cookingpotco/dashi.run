import { client, RouteFragment } from "dashi";
import { LoadingCard } from "../../components/mod.ts";
import { HeartButton } from "./heart_button.tsx";
import { PatchesForm } from "./patches_form.tsx";
import { Section, SectionMark } from "./section.tsx";
import { Snippet, SnippetStack, SnippetTone } from "./snippet.tsx";

const Host = client.element(
  "section-board",
  new URL("./section_board_client.ts", import.meta.url),
);

const dots =
  "background-image: repeating-radial-gradient(circle, var(--color-black) 0 0.075rem, transparent 0.075rem 0.75rem); background-size: 0.75rem 0.75rem; clip-path: inset(0 round 1.5rem)";

export function SectionBoard() {
  return (
    <Host className="relative flex w-full flex-col items-center gap-8 lg:block lg:h-[164.875rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 lg:-inset-x-12 lg:-top-6 lg:-bottom-6"
        style={dots}
      />
      <Section
        badge="01"
        title="JSX to plain old HTML"
        description="JSX is precompiled and transformed into plain HTML strings, no hydration, no abstraction. Just hypertext."
        rotate="rotate-[1deg]"
        slide="right"
        top="lg:top-[1.6875rem]"
        equal
        left={
          <Snippet
            title="component.tsx"
            tone={SnippetTone.Pink}
            code={`export function Hello() {
  return (
    <div className="greeting">
      <h1>Hello, World</h1>
    </div>
  );
}`}
          />
        }
        right={
          <Snippet
            title="output.html"
            tone={SnippetTone.Green}
            code={`<div class="greeting">
  <h1>Hello, World</h1>
</div>`}
          />
        }
      />
      <Section
        badge="02"
        title="Pages are just handlers"
        description={
          <>
            A page is a GET handler that returns{" "}
            <span className="text-error">`Response`</span>, same as JSON, one
            helper seals HTML.
          </>
        }
        rotate="-rotate-[1.2deg]"
        slide="left"
        top="lg:top-[29.625rem]"
        equal
        mark={SectionMark.Versus}
        left={
          <Snippet
            title="page.tsx"
            tone={SnippetTone.Green}
            code={`export function getPage({ html }): Response {
  return html(
    <main>
      <PageContent />
    </main>
  );
}`}
          />
        }
        right={
          <Snippet
            title="jsonEndpoint.ts"
            tone={SnippetTone.Pink}
            code={`export function getJson(): Response {
  return Response.json({ ok: true });
}`}
          />
        }
      />
      <Section
        badge="03"
        title="Fragments"
        description="A fragment is a route. Compose pages through eager or lazy server-rendered UI."
        rotate="rotate-[1.2deg]"
        slide="right"
        top="lg:top-[59.75rem]"
        left={
          <SnippetStack>
            <Snippet
              title="userRoute.tsx"
              tone={SnippetTone.Pink}
              code={`export async function UserProfile({ ctx, html }) {
  const user = await service.getUser(ctx);
  return html(
    <User userData={user} />
  );
}`}
            />
            <Snippet
              title="home.tsx"
              tone={SnippetTone.Green}
              code={`<RouteFragment src="/users/USER_ID" />
<RouteFragment src="/users/USER_ID" lazy />`}
            />
          </SnippetStack>
        }
        right={
          <div className="flex w-[18rem] gap-4 overflow-visible">
            <RouteFragment src="/users/jorji" />
            <RouteFragment
              src="/users/duck"
              lazy="visible"
              fallback={<LoadingCard />}
            />
          </div>
        }
      />
      <Section
        badge="04"
        title="Patches"
        description="A patch is HTML aimed at a fragment or an element. A form POST can return several, and the page updates in place."
        rotate="-rotate-[0.5deg]"
        slide="left"
        top="lg:top-[93.8125rem]"
        fill
        left={
          <Snippet
            title="postTodo.tsx"
            tone={SnippetTone.Pink}
            code={`export async function addTodo({ ctx, patches }) {
  const { todo } = ctx.state;
  const count = await service.addTodo(todo);
  return patches([
    patch.append("/todos", <Todo data={todo} />),
    patch.replace("#count", <Count c={count} />),
  ]);
}`}
          />
        }
        right={<PatchesForm />}
      />
      <Section
        badge="05"
        title="Client JS"
        description="Progressive enhancement by design. Add client-side logic only where needed using TS and standard Web APIs."
        rotate="rotate-[0.75deg]"
        slide="right"
        top="lg:top-[124.1875rem]"
        left={
          <SnippetStack>
            <Snippet
              title="page.tsx"
              tone={SnippetTone.Pink}
              code={`const HeartButton = client.element("heart-button", new URL(...));
export function Page() {
...
  <HeartButton />
...
}`}
            />
            <Snippet
              title="heart_client.ts"
              tone={SnippetTone.Green}
              code={`// Native custom elements!
customElements.define(
  "heart-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.addEventListener("click", shootHearts);
    }
  },
);`}
            />
          </SnippetStack>
        }
        right={<HeartButton />}
      />
    </Host>
  );
}
