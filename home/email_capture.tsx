import { Button } from "../components/mod.ts";

export function EmailCapture() {
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
          className="min-w-0 flex-1 bg-transparent font-mono text-large-code-body outline-none placeholder:text-body-text user-invalid:text-error"
        />
        <span id="join">
          <Button type="submit">join</Button>
        </span>
      </div>
    </form>
  );
}
