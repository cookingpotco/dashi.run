import { cached, type Ctx, group } from "dashi";
import { pageCache } from "../cache.ts";
import { ProfileCard } from "./profile_card.tsx";
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

export async function Profile(ctx: Ctx<{ name: string }>) {
  const name = ctx.params.name;
  if (name !== ProfileName.Jorji && name !== ProfileName.Duck) {
    return <p>Page not found</p>;
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
    return <a href={`/users/${name}`} className="no-underline">{card}</a>;
  }
  return cached(card, pageCache);
}

export const users = group("/users", ({ route }) => ({
  layouts: [UsersLayout],
  routes: [
    route("/:name", { GET: Profile }),
  ],
}));
