import type { LayoutArgs } from "dashi";
import type { Element } from "dashi/jsx-runtime";
import type { AppState } from "../seo.ts";

const enum ProfileName {
  Jorji = "jorji",
  Duck = "duck",
}

interface ProfileCopy {
  about: string;
  posts: [[string, string], [string, string]];
}

const copy: Record<ProfileName, ProfileCopy> = {
  [ProfileName.Jorji]: {
    about: "Jorji builds pages out of routes.",
    posts: [
      ["A fragment is just a URL", "The card on the homepage is this page."],
      [
        "Cached independently",
        "If I load on my own, I can be cached by myself!",
      ],
    ],
  },
  [ProfileName.Duck]: {
    about: "A duck who fetched in after you scrolled.",
    posts: [
      ["Waited for the fold", 'lazy="visible" held the fallback until here.'],
      ["Hello from /users/duck", "Thanks for scrolling."],
    ],
  },
};

export function UsersLayout({ ctx, children }: LayoutArgs<AppState>): Element {
  const name = ctx.params.name;
  if (name !== ProfileName.Jorji && name !== ProfileName.Duck) {
    return children;
  }
  const profile = copy[name];
  return (
    <div className="mx-auto flex w-full max-w-main flex-col items-center gap-10 px-4 py-8">
      {children}
      <section className="flex w-full max-w-md flex-col gap-3">
        <h1 className="text-heading-1">About</h1>
        <p className="text-body text-body-text">{profile.about}</p>
      </section>
      <section className="flex w-full max-w-md flex-col gap-4">
        <h2 className="text-heading-1">Posts</h2>
        <div className="rounded-card border-2 border-black bg-card-background p-4 shadow-regular">
          <p className="font-mono text-code-title">{profile.posts[0][0]}</p>
          <p className="text-body-small text-body-text">
            {profile.posts[0][1]}
          </p>
        </div>
        <div className="rounded-card border-2 border-black bg-card-background p-4 shadow-regular">
          <p className="font-mono text-code-title">{profile.posts[1][0]}</p>
          <p className="text-body-small text-body-text">
            {profile.posts[1][1]}
          </p>
        </div>
      </section>
    </div>
  );
}
