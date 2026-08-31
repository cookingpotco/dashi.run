# Implementing in this repo

You implement Linear issues. The approved plan is the Linear comment that
started you; that and this file are the brief. Skip the `plan-ticket` skill.

## Start

Do not set Linear status. Opening the draft PR on init moves the ticket to
`In Progress`; the GitHub integration handles `In Review` and `Done` after that.

## Done

Follow the `pr-handoff` skill every time you hand the PR back, including after
review follow-up. If that skill is not already available, read
`.cursor/skills/pr-handoff/SKILL.md` and follow it.

Done means the PR is not a draft: CI is green on that push, the GitHub
conversation comment is posted, and `gh pr ready` has taken (`isDraft` is
false). Stay in this run until that is true. Nothing resumes you when checks
finish.

## Tests

This scaffold has none. When behaviour exists, cover it at the layer that
actually runs:

- HTTP (status, headers, HTML bytes / parsed response): in this repo
- Live DOM after JS (custom element upgrade, fetch, swap, History): e2e only if
  client JS exists

**The path that happens.** Drive real inputs through the public surface a user
hits. Do not stub, mock, or stand up a narrower entry point to approximate a
flow whose natural test is further out. If that outer layer is HTTP, add a case
here. If that outer layer is the live document after JS, add e2e. Do not invent
a second harness. Do not export a private helper so a unit test can import it.

**Don't test what never happens.** A situation the product never produces is not
coverage.

**One flow per test.** Cover as much of that flow as will hold. Several asserts
on one input are right; running the same input again for each detail of the
output is not. Unrelated flows stay in separate tests so a failure names the
path and an early assert cannot hide another.

**Black-box.** Assert on what a caller sees (HTML, an HTTP response, a thrown
error). Constructing a `Request` or `Ctx` to call a route handler is a narrower
entry point; if the user hits it over HTTP, the case belongs in an HTTP test.

## Simpler

Prefer the simpler version, even when it repeats a few lines. Do not extract a
helper that is a short, obvious check or a few straightforward lines used once —
inline it until extraction earns its keep. Extract when the code is not obvious,
or when the same non-trivial shape is repeated. A longer or non-obvious body is
a function even at one call site. If the plan specified machinery you then see
is unnecessary, leave it out and list it under **Plan deviations** in the
handoff comment. Leave the Linear plan as it is.

## One way

One way to do a thing. A second API, alias, or overlapping concept has to
justify why it is not the first. If it cannot, it does not ship. Users should
not have to choose, and the codebase should not end up mixed.

`class` and `className` as equivalent props is two ways to set one attribute;
keep one. Overlapping concepts must either collapse or come out with a
distinction no caller can miss.

If the plan specified a twin you then see is the same job, ship the one way and
list it under **Plan deviations**.

A method handler is the resource: JSX, a `Response`, or a helper like
`staticFile(ctx, dir, relative)` called from `{ GET }`. The relative path is the
route param the caller passes in. Middleware is a factory attached on `group()`,
like `cors`. Those are different jobs. Do not turn a handler helper into
middleware to match the other shape, and do not call middleware from inside a
handler to skip the onion.

## Reviews

Code-level feedback arrives as a **submitted** GitHub review. Follow the
`pr-followup` skill. A later `@Cursor` on Linear starts a new agent from `main`,
which cannot see the branch.

## Constraints

Import `dashi` / `dashi/jsx-runtime` / `dashi/client` only. App dependencies are
allowed here (Tailwind, later a markdown parser). Do not path-override `dashi`
onto a framework checkout. Use the Cursor Cloud Agents **v1** REST API if you
touch `scripts/review_followup.ts`; v1 rejects `branchName`.
