import { client, type Ctx, patch, RouteFragment } from "dashi";
import { Button } from "../button.tsx";
import { CommandSnippet } from "./command_snippet.tsx";
import { HeartButton } from "./heart_button.tsx";
import { LoadingCard } from "./loading_card.tsx";
import { Point, PointColor } from "./point.tsx";
import { Section } from "./section.tsx";
import { SectionBoard } from "./section_board.tsx";
import { Snippet, SnippetStack, SnippetTone } from "./snippet.tsx";

const emails: string[] = [];

const FormValidity = client.module(
  new URL("./form_client.ts", import.meta.url),
);

function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-6 pb-8 md:pb-0">
      <p className="rotate-1 rounded-button border-2 border-black bg-yellow px-3 py-1 font-mono text-button uppercase shadow-regular">
        Pure code, zero magic
      </p>
      <h1 className="flex flex-col items-center text-center">
        <span className="hidden text-title md:block">
          Modern framework built on
        </span>
        <span className="text-title-compact md:hidden">Modern framework</span>
        <span className="relative hidden md:block">
          <span className="absolute bottom-2 left-0 h-3 w-full -rotate-1 bg-yellow" />
          <span className="relative text-title">old ideas.</span>
        </span>
        <span className="text-title-compact md:hidden">
          built on old ideas.
        </span>
      </h1>
      <p className="max-w-xl pb-2 text-center text-body-small text-body-text md:max-w-none md:text-body">
        Built for composable pages that drive precise updates through the
        server.
      </p>
      <CommandSnippet />
    </section>
  );
}

function PatchesForm() {
  return (
    <form
      method="POST"
      action="/todos"
      className="flex h-[10.125rem] w-full flex-col overflow-hidden rounded-card border-2 border-black bg-code-background has-[:user-invalid]:border-error lg:absolute lg:inset-0 lg:h-auto"
    >
      <div className="flex items-center justify-between gap-2 border-b border-black bg-blue px-4 py-3">
        <input
          name="title"
          required
          placeholder="Something to do..."
          className="min-w-0 flex-1 cursor-text bg-transparent font-mono text-code-title outline-none placeholder:text-black"
        />
        <Button type="submit">ADD</Button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-end px-4">
        <div className="min-h-0 w-full flex-1 overflow-y-auto py-4">
          <RouteFragment
            src="/todos"
            className="flex w-full flex-col gap-4"
          />
        </div>
        <span id="count" className="pb-2 font-mono text-code-small">
          1/2
        </span>
      </div>
    </form>
  );
}

function Closer() {
  return (
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      <Point
        label="Small"
        description="Small API with no runtime dependencies"
        color={PointColor.Pink}
        rotate="-rotate-[4deg]"
      />
      <Point
        label="Caching"
        description="Each page and fragment is cached on its own"
        color={PointColor.Yellow}
        rotate="rotate-[5deg]"
      />
      <Point
        label="Navigation"
        description="Soft navigation with in-place document swaps"
        color={PointColor.Green}
        rotate="rotate-[3deg]"
      />
      <Point
        label="SSR"
        description="HTML first, for SEO, LCP, and link previews"
        color={PointColor.Blue}
        rotate="-rotate-[2deg]"
      />
      <Point
        label="Standards"
        description="Built on web standards, not a parallel stack"
        color={PointColor.Green}
        rotate="rotate-[3deg]"
      />
      <Point
        label="Layouts"
        description="Wrap paths with layouts and middleware"
        color={PointColor.Pink}
        rotate="-rotate-[4deg]"
      />
    </div>
  );
}

function EmailCapture() {
  return (
    <form
      method="POST"
      action="/"
      className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-center"
    >
      <p className="text-center text-body lg:text-left">
        If you made it this far, you must be interested.
      </p>
      <div className="flex w-full max-w-[22.375rem] items-center gap-4 rounded-card border-2 border-black bg-code-background p-4 shadow-extra has-[:user-invalid]:border-error lg:w-[22.375rem]">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent font-mono text-large-code-body outline-none placeholder:text-body-text"
        />
        <span id="join">
          <Button type="submit">join</Button>
        </span>
      </div>
    </form>
  );
}

export function Home() {
  return (
    <main className="mx-auto flex w-full max-w-main flex-col items-center gap-12 px-4 py-8 lg:gap-16 lg:px-6 lg:pb-16">
      <FormValidity />
      <Hero />
      <div className="flex w-full flex-col items-center gap-8 lg:gap-16">
        <SectionBoard>
          <Section
            badge="01"
            title="JSX to plain old HTML"
            description="JSX is precompiled and transformed into plain HTML strings, no hydration, no abstraction. Just hypertext."
            rotate="-rotate-[1deg]"
            slide="left"
            top="lg:top-3"
            equal
            left={
              <Snippet
                title="page.tsx"
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
            title="Fragments"
            description="A fragment is a route. Compose pages through eager or lazy server-rendered components that drive precise updates."
            rotate="rotate-[1deg]"
            slide="right"
            top="lg:top-[28.6875rem]"
            left={
              <SnippetStack>
                <Snippet
                  title="userRoute.tsx"
                  tone={SnippetTone.Pink}
                  code={`export async function UserProfile(ctx: Ctx) {
  const user = await service.getUser(ctx);
  return (
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
            badge="03"
            title="Patches"
            description="A patch is HTML aimed at a fragment or an element. A form POST can return several, and the page updates in place."
            rotate="-rotate-[0.5deg]"
            slide="left"
            top="lg:top-[62.75rem]"
            fill
            left={
              <Snippet
                title="postTodo.tsx"
                tone={SnippetTone.Pink}
                code={`export async function addTodo(ctx: Ctx) {
  const { todo } = ctx.state;
  const count = await service.addTodo(todo);
  return [
    patch.append("/todos", <Todo data={todo} />),
    patch.replace("#count", <Count c={count} />),
  ];
}`}
              />
            }
            right={<PatchesForm />}
          />
          <Section
            badge="04"
            title="Client JS"
            description="Progressive enhancement by design. Add client-side logic only where needed using TS and standard Web APIs."
            rotate="rotate-[0.75deg]"
            slide="right"
            top="lg:top-[91.9375rem]"
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
        </SectionBoard>
        <Closer />
        <EmailCapture />
      </div>
    </main>
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
