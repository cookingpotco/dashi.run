import { group, type ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import { ProfileCard } from "../components/mod.ts";
import type { AppState } from "../seo.ts";
import { UsersLayout } from "./users_layout.tsx";

const enum ProfileName {
  Jorji = "jorji",
  Duck = "duck",
}

const profiles: Record<
  ProfileName,
  { handle: string; photo: string }
> = {
  [ProfileName.Jorji]: {
    handle: "@Jorji",
    photo: "/static/jorji.svg",
  },
  [ProfileName.Duck]: {
    handle: "@LazyDuck",
    photo: "/static/duck.svg",
  },
};

export async function getProfile(
  { ctx, html }: ReadArgs<{ name: string }, AppState>,
) {
  const name = ctx.params.name;
  if (name !== ProfileName.Jorji && name !== ProfileName.Duck) {
    return html(<p>Page not found</p>, { status: 404 });
  }
  if (name === ProfileName.Duck && ctx.isFragment) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  const profile = profiles[name];
  const card = (
    <ProfileCard
      handle={profile.handle}
      photo={profile.photo}
      clickMe={ctx.isFragment}
    />
  );
  if (ctx.isFragment) {
    return html(
      <a href={`/users/${name}`} className="no-underline">{card}</a>,
    );
  }
  return html(card, { cache: pageCache });
}

export const users = group<AppState>("/users", ({ route }) => ({
  layouts: [UsersLayout],
  routes: [
    route("/:name", { GET: getProfile }),
  ],
}));
